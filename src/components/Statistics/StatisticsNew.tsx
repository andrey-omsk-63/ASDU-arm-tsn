import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { statsaveCreate } from "../../redux/actions";

import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { WS } from "../../App";

import StatisticXTNew from "./StatisticXTNew";

import { NameVertex } from "../../AppServiceFunctions";

import { styleSt1, styleSt11, styleSt2 } from "./StatisticXTStyle";
import { styleStError } from "../../AppStyle";

import { Statistic } from "../../interfaceStat.d";

let tekValue = 0;
let pointsEtalon: Statistic[];
let flagEtalon = true;
let massInterval: any = [];
let massIntervalEt: any = [];

const StatisticsNew = (props: {
  open: boolean;
  points: Statistic[];
  region: string;
  date: string;
  interval: number;
  func: any;
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
      massInterval.push(points[i].Statistics[0].TLen);
      massIntervalEt.push(points[i].Statistics[0].TLen);
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

  const [value, setValue] = React.useState(tekValue);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    tekValue = newValue;
    datestat.tekArea = pointsEtalon[tekValue].area;
    datestat.tekId = pointsEtalon[tekValue].id;
    dispatch(statsaveCreate(datestat));
    props.func(tekValue, massInterval[tekValue]);
  };

  const handleChangeNull = () => {
    return (
      <Box sx={styleStError}>
        <h1>На текущюю дату данных по статистике НЕТ</h1>
      </Box>
    );
  };

  const SpisXT = () => {
    let resSps: any = [];
    let labl: string = "";

    if (pointsEtalon.length === 0) {
      resSps.push(
        <Box key={1} sx={styleStError}>
          <h1>Нет данных по статистике</h1>
        </Box>
      );
    } else {
      //console.log("###:", pointsEtalon, pointsTFL);

      for (let i = 0; i < pointsEtalon.length; i++) {
        let pEt = pointsEtalon[i];
        let nameId = NameVertex(pEt.area, pEt.subarea, pEt.id);

        console.log("Name:", i, nameId);

        labl = pEt.area + ":" + pEt.subarea + ":" + pEt.id;
        let illum = value === i ? styleSt1 : styleSt11;
        resSps.push(<Tab key={i} sx={illum} label={labl} />);
      }
    }
    return resSps;
  };

  const CheckClinch = () => {
    let clinch = false;
    if (!flagEtalon) {
      if (pointsEtalon.length === 0) {
        clinch = true;
      } else {
        let val = tekValue !== value ? tekValue : value;
        for (let i = 0; i < pointsEtalon[val].Statistics.length; i++)
          if (pointsEtalon[val].Statistics[i].Datas === null) clinch = true;
      }
    }
    return clinch;
  };

  let clinch = CheckClinch();

  return (
    <>
      {isOpen && pointsEtalon.length === 0 && <>{handleChangeNull()} </>}
      {isOpen && pointsEtalon.length !== 0 && (
        <>
          <Box sx={styleSt2}>
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
          {pointsEtalon.length > 0 && !clinch && (
            <StatisticXTNew
              open={isOpen}
              statist={pointsEtalon}
              areaid={value}
              interval={massInterval[tekValue]}
            />
          )}
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

export default StatisticsNew;
