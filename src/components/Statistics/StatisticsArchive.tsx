import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { statsaveCreate } from "../../redux/actions";

import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import StatisticXTArchive from "./StatisticXTArchive";

import { styleStError } from "../../AppStyle";

import { Statistic } from "../../interfaceStat.d";
//import { Tflight } from '../../interfaceMNG.d';

let tekValue = 0;
let pointsEtalon: Statistic[];
let flagEtalon = true;
let massInterval: any = [];

let oldDate = "";

const StatisticsArchive = (props: {
  open: boolean;
  ws: WebSocket;
  points: Statistic[];
  region: string;
  date: string;
  interval: number;
  func: any;
  //pointsTfl: Tflight[];
}) => {
  console.log("pointsOld:", props.points);
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
  if (oldDate !== props.date) flagEtalon = true;

  React.useEffect(() => {
    const handleSend = () => {
      if (props.ws !== null && oldDate !== props.date) {
        if (props.ws.readyState === WebSocket.OPEN) {
          props.ws.send(
            JSON.stringify({ type: "stopDevices", region: reGion })
          );
          props.ws.send(
            JSON.stringify({ type: "stopStatistics", region: reGion })
          );
          props.ws.send(
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
  }, [reGion, props.date, props.ws]);

  if (isOpen && flagEtalon) {
    pointsEtalon = points;
    flagEtalon = false;
    massInterval = [];
    for (let i = 0; i < points.length; i++) {
      massInterval.push(points[i].Statistics[0].TLen);
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
  } else {
    if (massInterval.length) massInterval[tekValue] = props.interval;
  }

  const styleSt2 = {
    //border: 1,
    // width: 850,
    width: window.innerWidth - 21,
    fontSize: 12,
    marginTop: "-2vh",
    marginLeft: -2.4,
    //marginRight: -7,
  };

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
        <Box key={1}>
          <h2>Нет данных по статистике</h2>
        </Box>
      );
    } else {
      for (let i = 0; i < pointsEtalon.length; i++) {
        const styleSt1 = {
          fontSize: 14.1,
          maxHeight: "22px",
          minHeight: "22px",
          bgcolor: "#BAE186", // тёмно-салатовый
          border: "1px solid #000",
          borderColor: "#93D145", // ярко-салатовый
          boxShadow: "4px -6px 6px #d4d4d4",
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
        let val = tekValue !== value ? tekValue : value;
        for (let i = 0; i < pointsEtalon[val].Statistics.length; i++)
          if (pointsEtalon[val].Statistics[i].Datas === null) clinch = true;
      }
    }
    return clinch;
  };

  if (isOpen && pointsEtalon.length !== 0 && tekValue !== value)
    setValue(tekValue);

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
            <StatisticXTArchive
              open={isOpen}
              statist={pointsEtalon}
              areaid={value}
              date={props.date}
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

export default StatisticsArchive;
//эту
