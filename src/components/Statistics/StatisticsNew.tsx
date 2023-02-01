import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { statsaveCreate } from "../../redux/actions";

import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

//import axios from 'axios';

import StatisticXTNew from "./StatisticXTNew";

import { Statistic } from "../../interfaceStat.d";
//import { Tflight } from "../../interfaceMNG.d";

let tekValue = 0;
let pointsEtalon: Statistic[];
let flagEtalon = true;
let massInterval: any = [];
let massIntervalEt: any = [];

const StatisticsNew = (props: {
  open: boolean;
  ws: WebSocket;
  points: Statistic[];
  region: string;
  date: string;
  interval: number;
  func: any;
  //pointsTfl: Tflight[];
}) => {
  console.log("points:", props.points);
  // console.log('pointsTfl:', props.pointsTfl);
  //== Piece of Redux ======================================
  // let maskpoint = useSelector((state: any) => {
  //   const { maskpointReducer } = state;
  //   return maskpointReducer.maskpoint;
  // });
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
      if (props.ws !== null) {
        if (props.ws.readyState === WebSocket.OPEN) {
          props.ws.send(
            JSON.stringify({ type: "stopDevices", region: reGion })
          );
          props.ws.send(
            JSON.stringify({ type: "getStatistics", region: reGion })
          );
        } else {
          setTimeout(() => {
            handleSend();
          }, 1000);
        }
      }
    };
    handleSend();
    //console.log("ОТРАБОТАЛ useEFFECT ОСНОВНОЙ");
  }, [props.ws, reGion]);

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
  } else {
    if (massInterval.length) massInterval[tekValue] = props.interval;
    //console.log("PROPS.massInterval", massInterval);
  }

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
          //console.log('Stat совподение записей i=', i, 'j=', j);
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
    //console.log('pointsAdd:', pointsAdd);
    if (pointsAdd.length > 0) {
      for (let i = 0; i < pointsAdd.length; i++) {
        pointsEtalon.push(pointsAdd[i]);
        massInterval.push(pointsAddInterval[i]);
        massIntervalEt.push(pointsAddInterval[i]);
      }
    }
  }

  const styleSt1 = {
    fontSize: 13.5,
    maxHeight: "20px",
    minHeight: "20px",
    backgroundColor: "#F1F3F4",
    color: "black",
    marginRight: 0.5,
  };

  const styleSt2 = {
    width: 850,
    fontSize: 12,
    marginTop: -2,
    marginLeft: -3,
    marginRight: -7,
  };

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
    return <Box sx={styleSt1}>На текущюю дату данных по статистике НЕТ</Box>;
  };

  const SpisXT = () => {
    let resSps: any = [];
    let labl: string = "";

    if (pointsEtalon.length === 0) {
      resSps.push(
        <Box key={1} sx={styleSt1}>
          Нет данных по статистике
        </Box>
      );
    } else {
      for (let i = 0; i < pointsEtalon.length; i++) {
        // let sub = '0';
        // for (let j = 0; j < props.pointsTfl.length; j++) {
        //   if (
        //     Number(props.pointsTfl[j].region.num) === pointsEtalon[i].region &&
        //     Number(props.pointsTfl[j].area.num) === pointsEtalon[i].area &&
        //     props.pointsTfl[j].ID === pointsEtalon[i].id
        //   )
        //     sub = props.pointsTfl[j].subarea.toString();
        // }
        // labl = pointsEtalon[i].area + ':' + sub + ':' + pointsEtalon[i].id;
        labl =
          pointsEtalon[i].area +
          ":" +
          pointsEtalon[i].subarea +
          ":" +
          pointsEtalon[i].id;
        resSps.push(<Tab key={i} sx={styleSt1} label={labl} />);
      }
    }
    return resSps;
  };

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
              scrollButtons={true}
              allowScrollButtonsMobile
            >
              {SpisXT()}
            </Tabs>
          </Box>
          <>
            {pointsEtalon.length > 0 && (
              <StatisticXTNew
                open={isOpen}
                statist={pointsEtalon}
                areaid={value}
                interval={massInterval[tekValue]}
              />
            )}
          </>
        </>
      )}
    </>
  );
};

export default StatisticsNew;
