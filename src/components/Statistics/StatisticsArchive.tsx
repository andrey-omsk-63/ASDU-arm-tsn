import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { statsaveCreate } from "../../redux/actions";

import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import StatisticXTArchive from "./StatisticXTArchive";

import { NameVertex, MakeDateRus } from "../../AppServiceFunctions";
import { SendSocketgetStatisticsList } from "../../AppServiceFunctions";

import { WS } from "../../App";

import { styleSt1, styleSt11, styleSt2 } from "./StatisticXTStyle";
import { styleHint } from "./StatisticXTStyle";
import { styleStError } from "../../AppStyle";

import { Statistic } from "../../interfaceStat.d";

let tekValue = 0;
let pointsEtalon: Statistic[];
let flagEtalon = true;
let massInterval: any = [];
export let head = "";
let nameHint = "";

let oldDate = "";

const StatisticsArchive = (props: {
  open: boolean;
  points: Statistic[];
  region: string;
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
  let reGion = props.region;

  React.useEffect(() => {
    const handleSend = () => {
      if (WS !== null && oldDate !== props.date) {
        if (WS.readyState === WebSocket.OPEN) {
          WS.send(JSON.stringify({ type: "stopDevices", region: reGion }));
          WS.send(JSON.stringify({ type: "stopStatistics", region: reGion }));
          WS.send(
            JSON.stringify({
              type: "getOldStatistics",
              region: reGion,
              date: new Date(props.date).toISOString(),
            })
          );
        } else {
          setTimeout(() => {
            handleSend();
          }, 1000);
        }
      }
    };
    handleSend();
    oldDate = props.date;
    flagEtalon = true;
  }, [reGion, props.date]);

  if (isOpen && flagEtalon) {
    pointsEtalon = points;
    flagEtalon = false;

    // datestat.tekArea = points[tekValue].area;
    // datestat.tekSubarea = points[tekValue].subarea;
    // datestat.tekId = points[tekValue].id;
    // dispatch(statsaveCreate(datestat));

    massInterval = [];
    for (let i = 0; i < points.length; i++) {
      let rec1 = points[i].Statistics ? points[i].Statistics[0].TLen : 5;
      massInterval.push(rec1);
    }
    points = [];
    tekValue = 0;

    if (datestat.tekArea && datestat.tekId) {
      for (let i = 0; i < pointsEtalon.length; i++) {
        if (
          pointsEtalon[i].area === datestat.tekArea &&
          pointsEtalon[i].id === datestat.tekId
        )
          tekValue = i;
      }
    }
  } else if (massInterval.length) massInterval[tekValue] = props.interval;

  if (datestat.tekArea && datestat.tekId && pointsEtalon) {
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

  const [value, setValue] = React.useState(tekValue);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    tekValue = newValue;
    datestat.tekArea = pointsEtalon[tekValue].area;
    datestat.tekSubarea = pointsEtalon[tekValue].subarea;
    datestat.tekId = pointsEtalon[tekValue].id;
    dispatch(statsaveCreate(datestat));
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
          "По выбраному перекрёстку на " +
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
    if (!flagEtalon) {
      if (pointsEtalon.length === 0) {
        clinch = true;
      } else {
        let val = tekValue !== value ? tekValue : value;
        if (pointsEtalon[val].Statistics) {
          for (let i = 0; i < pointsEtalon[val].Statistics.length; i++)
            if (pointsEtalon[val].Statistics[i].Datas === null) clinch = true;
        }
      }
    }
    if (clinch) {
      datestat.stat = [];
      dispatch(statsaveCreate(datestat));
    }
    return clinch;
  };

  if (isOpen && pointsEtalon.length !== 0 && tekValue !== value)
    setValue(tekValue);

  let clinch = CheckClinch();

  const StatisticsOutput = () => {
    datestat.area = pointsEtalon[value].area;
    datestat.id = pointsEtalon[value].id;
    dispatch(statsaveCreate(datestat));
    props.funcGoodDate();

    return (
      <>
        {pointsEtalon.length > 0 && !clinch && (
          <StatisticXTArchive
            open={isOpen}
            statist={pointsEtalon}
            areaid={value}
            date={props.date}
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
            <Box sx={styleStError}>
              <h1>Некорректная структура статистики по данному ХТ</h1>
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default StatisticsArchive;
