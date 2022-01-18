package xcontrol

import (
	"encoding/json"
	"github.com/ruraomsk/TLServer/logger"
	"github.com/ruraomsk/ag-server/pudge"
	"math"
	"sort"
)

//State описание xctrs
type State struct {
	Region      int                     `json:"region"`
	Area        int                     `json:"area"`
	SubArea     int                     `json:"subarea"`
	Switch      bool                    `json:"switch"`  //true призводим расчет нового плана
	Release     bool                    `json:"release"` //true выполняем план
	UseStrategy bool                    `json:"use"`     //true выполняем стратегию А иначе стратегия B
	Yellow      Yellow                  `json:"yellow"`  //Управление интервалом времени ЖМ
	Step        int                     `json:"step"`    //Время цикла для данного подрайона
	LastTime    int                     `json:"ltime"`   //Последний расчет характерной точки
	PKCalc      int                     `json:"pkcalc"`  //Посчитанный ПК
	PKNow       int                     `json:"pknow"`   //Текущий ПК
	PKLast      int                     `json:"pklast"`  //Предыдущий ПК
	Status      []string                `json:"status"`  //Состояние расчетов и итоги проверки
	Xctrls      []Xctrl                 `json:"xctrls"`
	External    [12][2]int              `json:"ext"`
	Prioryty    [4][3]int               `json:"prioryty"`
	Time        int                     `json:"time"` //Внутреннее время
	Results     map[string][]LineResult `json:"results"`
	Devices     []int                   `json:"devices"`
}
type Yellow struct {
	Make        bool `json:"make"`  //true если исполнять
	StartMinute int  `json:"start"` //Начало интервала в минутах
	StopMinute  int  `json:"stop"`  //Конец интервала в минутах
}
type Xctrl struct {
	Name       string       `json:"name"`
	Left       int          `json:"left"`  //Максимум для прямого направления
	Right      int          `json:"right"` //Максимум для обратного направления
	Status     []string     `json:"status"`
	StrategyA  []StrategyA  //Правила перехода по схеме А (области)
	StrategyB  []StrategyB  //Правила перехода по схеме B (лучи)
	Calculates []Calculates //Правила расчета характерной точки

}
type ExtDay struct {
	Pk          int
	StartMinute int `json:"start"` //Начало интервала в минутах
	StopMinute  int `json:"stop"`  //Конец интервала в минутах
}
//StrategyB описание стратегии
type StrategyB struct {
	XLeft       int     `json:"xleft"`  //Интенсивность в прямом направлении
	XRight      int     `json:"xright"` //Интенсивность в обратном направлении
	VLeft       float32 `json:"vleft"`  //Луч левый
	VRight      float32 `json:"vright"` //Луч правый
	PKL         int     `json:"pkl"`    // Назначенный план прямой
	PKS         int     `json:"pks"`    // Назначенный план средний
	PKR         int     `json:"pkr"`    // Назначенный план обратный
	Description string  `json:"desc"`   //Описание
}

//StrategyA описание стратегии
type StrategyA struct {
	XLeft       int    `json:"xleft"`  //Некое число для центра области
	XRight      int    `json:"xright"` //Некое число для центра области
	PK          int    `json:"pk"`     // Назначенный план
	Description string `json:"desc"`   //Описание
}

//Calculates расчет одной позиции точки
type Calculates struct {
	Region int   `json:"region"`
	Area   int   `json:"area"`
	ID     int   `json:"id"`    //Перекресток по которому принимается решение
	ChanL  []int `json:"chanL"` //Номера каналов по статистике прямой направление
	ChanR  []int `json:"chanR"` //Номера каналов по статистике обратное направление
}

type key struct {
	Region  int `json:"region"`
	Area    int `json:"area"`
	SubArea int `json:"subarea"`
}

func (x *Xctrl) getPlanB(left, right int) int {
	if right == 0 {
		right = 1
	}
	if left == 0 {
		left = 1
	}
	f := float32(right) / float32(left)
	plan := 0
	for _, st := range x.StrategyB {
		if left <= st.XLeft && right <= st.XRight {
			c0 := 0
			c1 := 0
			c2 := 0
			if f <= st.VLeft {
				c0++
			}
			if f >= st.VRight {
				c2++
			}
			if f > st.VLeft && f < st.VRight {
				c1++
			}
			plan = st.PKS
			if c0 > c1 && c0 > c2 {
				plan = st.PKL
			}
			if c2 > c0 && c2 > c1 {
				plan = st.PKR
			}
			return plan
		}
	}
	return 0
}
func (x *Xctrl) getPlanA(left, right int) int {
	plan := 0
	dist := uint64(math.MaxInt64)
	for _, ar := range x.StrategyA {
		ld := left - ar.XLeft
		rd := right - ar.XRight
		d := (uint64(ld) * uint64(ld)) + (uint64(rd) * uint64(rd))
		if d < dist {
			dist = d
			plan = ar.PK
		}
	}
	return plan
}
func (x *Xctrl) calculate(estate *ExtState) {
	//logger.Info.Printf("Расчитываем %d %d %d для %d:%d", estate.State.Region, estate.State.Area, estate.State.SubArea, estate.Time/60, estate.Time%60)
	result := estate.State.Results[x.Name]
	for i, r := range result {
		start := 0
		if i != 0 {
			start = result[i-1].Time
		}
		for _, c := range x.Calculates {
			good := true
			left := 0
			right := 0
			reg := pudge.Region{Region: c.Region, Area: c.Area, ID: c.ID}
			for _, l := range c.ChanL {
				if l <= 0 {
					continue
				}
				ll, g := mainTable.getInfo(reg, l, start, r.Time)
				if !g {
					good = false
				}
				left += ll
			}
			for _, rt := range c.ChanR {
				if rt <= 0 {
					continue
				}
				rr, g := mainTable.getInfo(reg, rt, start, r.Time)
				if !g {
					good = false
				}
				right += rr
			}
			r.Good = good
			r.Value[0] = left * (60 / estate.State.Step)
			r.Value[1] = right * (60 / estate.State.Step)
			if r.Good {
				if estate.State.UseStrategy {
					r.Value[2] = x.getPlanB(r.Value[0], r.Value[1])
				} else {
					r.Value[2] = x.getPlanA(r.Value[0], r.Value[1])
				}
			} else {
				r.Value[2] = 0
			}
			result[i] = r
			if r.Time == estate.State.Time {
				if !r.Good {
					logger.Info.Printf("Для %d %d %d нет данных на %d:%d", c.Region, c.Area, c.ID, r.Time/60, r.Time%60)
				} else {
					logger.Info.Printf("Для %d %d %d есть данные на %d:%d", c.Region, c.Area, c.ID, r.Time/60, r.Time%60)

				}
				return
			}
		}
	}
	return
}


func listStates() string {
	res := new(ListTables)
	res.List = make([]pudge.Region, 0)
	for _, x := range stats {
		r := pudge.Region{Area: x.State.Area, Region: x.State.Region, ID: x.State.SubArea}
		res.List = append(res.List, r)
	}
	sort.Slice(res.List, func(i, j int) bool {
		if res.List[i].Region != res.List[j].Region {
			return res.List[i].Region < res.List[j].Region
		}
		if res.List[i].Area != res.List[j].Area {
			return res.List[i].Area < res.List[j].Area
		}
		return res.List[i].ID < res.List[j].ID
	})
	result, err := json.Marshal(res)
	if err != nil {
		logger.Error.Println(err.Error())
	}
	return string(result)
}
func getState(region pudge.Region) string {
	for _, s := range stats {
		if s.State.Region == region.Region && s.State.Area == region.Area && s.State.SubArea == region.ID {
			result, err := json.Marshal(s.State)
			if err != nil {
				logger.Error.Println(err.Error())
				return "{}"
			}
			return string(result)
		}
	}
	return "{}"
}
func getData(region pudge.Region, name string) string {
	for _, s := range stats {
		if s.State.Region == region.Region && s.State.Area == region.Area && s.State.SubArea == region.ID {
			r, is := s.State.Results[name]
			if !is {
				logger.Error.Printf("Нет такого %v %s", region, name)
				return "{}"
			}
			result, err := json.Marshal(r)
			if err != nil {
				logger.Error.Println(err.Error())
				return "{}"
			}
			//logger.Info.Println(string(result))
			return "{\"datas\":" + string(result) + "}"
		}
	}
	return "{}"
}
