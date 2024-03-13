import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { statsaveCreate } from "../../redux/actions";

import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import StatisticXTNew from "./StatisticXTNew";

import { styleStError } from "../../AppStyle";

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
    if (pointsAdd.length > 0) {
      for (let i = 0; i < pointsAdd.length; i++) {
        pointsEtalon.push(pointsAdd[i]);
        massInterval.push(pointsAddInterval[i]);
        massIntervalEt.push(pointsAddInterval[i]);
      }
    }
  }

  //console.log("window.innerWidth:", window.innerWidth);

  const styleSt2 = {
    width: window.innerWidth - 21,
    fontSize: 12,
    marginTop: "-2vh",
    marginLeft: -2.4,
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
      for (let i = 0; i < pointsEtalon.length; i++) {
        const styleSt1 = {
          fontSize: 14.5,
          maxHeight: "20px",
          minHeight: "20px",
          bgcolor: "#BAE186", // тёмно-салатовый
          border: "1px solid #000",
          borderColor: "#93D145", // ярко-салатовый
          boxShadow: "6px -6px 6px  #d4d4d4",
          color: "black",
          marginRight: 1,
          padding: "1px 0px 1px 0px",
          textShadow: "1px 1px 1px rgba(0,0,0,0.3)",
        };
        const styleSt11 = {
          fontSize: 13.5,
          maxHeight: "20px",
          minHeight: "20px",
          bgcolor: "#E6F5D6", // светло-салатовый
          border: "1px solid #000",
          borderColor: "#d4d4d4", // серый
          boxShadow: 2,
          color: "black",
          marginRight: 1,
          padding: "1px 0px 1px 0px",
        };
        labl =
          pointsEtalon[i].area +
          ":" +
          pointsEtalon[i].subarea +
          ":" +
          pointsEtalon[i].id;
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
        for (let i = 0; i < pointsEtalon[value].Statistics.length; i++) {
          if (pointsEtalon[value].Statistics[i].Datas === null) clinch = true;
        }
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
              sx={{ maxHeight: "20px", minHeight: "20px", marginTop: 0 }}
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
          <>
            {clinch && (
              <Box sx={styleStError}>
                <h1>Некорректная структура статистики по данному ХТ</h1>
              </Box>
            )}
          </>
        </>
      )}
    </>
  );
};

export default StatisticsNew;
