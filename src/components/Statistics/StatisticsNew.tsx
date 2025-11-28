import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { statsaveCreate } from "../../redux/actions";

import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { WS, RegionGlob } from "../../App";

import StatisticXTNew from "./StatisticXTNew";

import { NameVertex, MakeDateRus } from "../../AppServiceFunctions";
import { SendSocketgetStatisticsList } from "../../AppServiceFunctions";

//import { massKeyGoodDate } from "../../App"; // массив ключей area-id для 'хороших дат'

import { styleSt1, styleSt11, styleSt2 } from "./StatisticXTStyle";
import { styleHint } from "./StatisticXTStyle";
import { styleStError } from "../../AppStyle";

import { Statistic } from "../../interfaceStat.d";

let tekValue = 0;
let pointsEtalon: Statistic[];
let flagEtalon = true;
let massInterval: any = [];
let massIntervalEt: any = [];
export let head = "";

let nameHint = "";
let clinchAr = 0;
let clinchSu = 0;
let clinchId = 0;

const StatisticsNew = (props: {
  open: boolean;
  points: Statistic[];
  date: string;
  interval: number;
  func: any;
  funcGoodDate: any;
}) => {
  //== Piece of Redux ======================================
  let datestat = useSelector((state: any) => {
    const { statsaveReducer } = state;
    return statsaveReducer.datestat;
  });
  const dispatch = useDispatch();
  //========================================================
  let isOpen = props.open;
  let points = props.points;
  let reGion = RegionGlob.toString();

  React.useEffect(() => {
    const handleSend = () => {
      if (WS !== null) {
        if (WS.readyState === WebSocket.OPEN) {
          WS.send(JSON.stringify({ type: "stopDevices", region: reGion }));
          WS.send(JSON.stringify({ type: "getStatistics", region: reGion }));
        } else {
          setTimeout(() => {
            handleSend();
          }, 1000);
        }
      }
    };
    handleSend();
  }, [reGion]);

  if (isOpen && flagEtalon) {
    pointsEtalon = points;
    flagEtalon = false;
    for (let i = 0; i < points.length; i++) {
      let rec1 = points[i].Statistics ? points[i].Statistics[0].TLen : 5;
      massInterval.push(rec1);
      massIntervalEt.push(rec1);
    }
    if (!massInterval.length) {
      massInterval.push(5);
      massIntervalEt.push(5);
    }
    points = [];
  } else if (massInterval.length) massInterval[tekValue] = props.interval;

  if (isOpen && !flagEtalon) {
    let pointsAdd = [];
    let pointsAddInterval = [];
    let newRecord = true;
    for (let i = 0; i < points.length; i++) {
      newRecord = true;
      for (let j = 0; j < pointsEtalon.length; j++) {
        if (
          points[i].id === pointsEtalon[j].id &&
          points[i].region === pointsEtalon[j].region &&
          points[i].area === pointsEtalon[j].area
        ) {
          newRecord = false;
          pointsEtalon[j] = points[i];
        }
      }
      if (newRecord) {
        console.log("Stat новая запись i=", i);
        pointsAdd.push(points[i]);
        pointsAddInterval.push(points[i].Statistics[0].TLen);
      }
    }
    if (pointsAdd.length > 0) {
      for (let i = 0; i < pointsAdd.length; i++) {
        pointsEtalon.push(pointsAdd[i]);
        massInterval.push(pointsAddInterval[i]);
        massIntervalEt.push(pointsAddInterval[i]);
      }
    }
  }

  if (datestat.tekArea && datestat.tekId) {
    tekValue = 0;
    for (let i = 0; i < pointsEtalon.length; i++) {
      if (
        pointsEtalon[i].area === datestat.tekArea &&
        pointsEtalon[i].id === datestat.tekId
      )
        tekValue = i;
    }
  }

  // отправка запросов на получение 'хороших дат' для каждого id
  for (let i = 0; i < points.length; i++) {
    let areaSt = points[i].area.toString();
    let idSt = points[i].id.toString();
    let have = 0;
    for (let j = 0; j < datestat.massKey.length; j++) {
      let arr = datestat.massKey[j].split(",");
      if (areaSt === arr[0] && idSt === arr[1]) have++;
    }
    if (!have) {
      datestat.massKey.push(areaSt + "," + idSt);
      SendSocketgetStatisticsList(areaSt, idSt); // запрос на получение 'хороших дат' для данного id
      dispatch(statsaveCreate(datestat));
    }
  }

  if (!datestat.id) tekValue = 0; // начать по новой
  const [value, setValue] = React.useState(tekValue);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    tekValue = newValue;
    datestat.tekArea = datestat.area = pointsEtalon[tekValue].area;
    datestat.tekSubarea = datestat.subarea = pointsEtalon[tekValue].subarea;
    datestat.tekId = datestat.id = pointsEtalon[tekValue].id;
    dispatch(statsaveCreate(datestat));
    props.funcGoodDate();
    props.func(tekValue, massInterval[tekValue]);
  };

  const ErrorMessage = (soob: string) => {
    return (
      <Box sx={styleStError}>
        <h1>{soob}</h1>
      </Box>
    );
  };

  const handleChangeNull = () => {
    datestat.stat = [];
    dispatch(statsaveCreate(datestat));

    return (
      <>
        {ErrorMessage(
          "По перекрёстку " +
            datestat.area +
            ":" +
            datestat.subarea +
            ":" +
            datestat.id +
            " на " +
            MakeDateRus(props.date) +
            " данных по статистике НЕТ"
        )}
      </>
    );
  };

  const MainMenu = () => {
    const [hint, setHint] = React.useState(false);

    const SetHint = (i: number, mode: boolean) => {
      let pEt = pointsEtalon[i];
      nameHint = NameVertex(pEt.area, pEt.subarea, pEt.id);
      setHint(mode);
    };

    const SpisXT = () => {
      let resSps: any = [];
      let labl: string = "";
      head = "";

      if (pointsEtalon.length === 0) {
        resSps.push(<>{handleChangeNull}</>);
      } else {
        for (let i = 0; i < pointsEtalon.length; i++) {
          let pEt = pointsEtalon[i];
          let nameId = NameVertex(pEt.area, pEt.subarea, pEt.id);
          let alive = pEt.Statistics ? "black" : "red";
          let illum = value === i ? styleSt1(alive) : styleSt11(alive);
          if (value === i) head = nameId + " за " + MakeDateRus(props.date);
          labl = pEt.area + ":" + pEt.subarea + ":" + pEt.id;
          resSps.push(
            <Tab
              key={i}
              sx={illum}
              label={labl}
              onMouseEnter={() => SetHint(i, true)}
              onMouseLeave={() => SetHint(i, false)}
            />
          );
        }
      }
      return resSps;
    };

    return (
      <>
        <Box sx={styleSt2}>
          {hint && <Box sx={styleHint}>{nameHint}</Box>}
          <Tabs
            sx={{ maxHeight: "20px", minHeight: "20px" }}
            value={value}
            onChange={handleChange}
            variant="scrollable"
            textColor="inherit"
            scrollButtons={true}
            allowScrollButtonsMobile
            TabIndicatorProps={{ sx: { backgroundColor: "#93D145" } }}
          >
            {SpisXT()}
          </Tabs>
        </Box>
        <Box sx={{ height: "12px" }}></Box>
      </>
    );
  };

  const CheckClinch = () => {
    let clinch = false;
    let val = tekValue !== value ? tekValue : value;
    if (!flagEtalon) {
      if (pointsEtalon.length === 0) {
        clinch = true;
      } else {
        if (pointsEtalon[val].Statistics) {
          for (let i = 0; i < pointsEtalon[val].Statistics.length; i++)
            if (pointsEtalon[val].Statistics[i].Datas === null) clinch = true;
        }
      }
    }
    if (clinch) {
      datestat.stat = [];
      dispatch(statsaveCreate(datestat));
      clinchAr = !datestat.id ? pointsEtalon[val].area : datestat.area;
      clinchSu = !datestat.id ? pointsEtalon[val].subarea : datestat.subarea;
      clinchId = !datestat.id ? pointsEtalon[val].id : datestat.id;
    }
    return clinch;
  };

  let clinch = CheckClinch();

  const StatisticsOutput = () => {
    return (
      <>
        {pointsEtalon.length > 0 && !clinch && (
          <StatisticXTNew
            open={isOpen}
            statist={pointsEtalon}
            areaid={value}
            interval={massInterval[tekValue]}
          />
        )}
      </>
    );
  };

  return (
    <>
      {isOpen && pointsEtalon.length === 0 && <>{handleChangeNull()} </>}
      {isOpen && pointsEtalon.length !== 0 && (
        <>
          <MainMenu />
          <>
            {pointsEtalon[value].Statistics === null ? (
              <>{handleChangeNull()}</>
            ) : (
              <>{StatisticsOutput()}</>
            )}
          </>
          {clinch && (
            <>
              {ErrorMessage(
                "Некорректная структура статистики по перекрёстку " +
                  clinchAr +
                  ":" +
                  clinchSu +
                  ":" +
                  clinchId
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default StatisticsNew;
