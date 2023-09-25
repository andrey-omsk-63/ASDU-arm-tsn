import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { statsaveCreate } from "../../redux/actions";

import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import StatisticXTArchive from "./StatisticXTArchive";

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
  //console.log('pointsOld:', props.points);
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
    width: 850,
    fontSize: 12,
    marginTop: '-2vh',
    marginLeft: -7.6,
    marginRight: -7,
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
    return <h2>На текущюю дату данных по статистике НЕТ</h2>;
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
          fontSize: 13.5,
          maxHeight: "20px",
          minHeight: "20px",
          bgcolor: "#BAE186", // тёмно-салатовый
          border: "1px solid #000",
          borderColor: "#93D145", // ярко-салатовый
          //borderRadius: 1,
          boxShadow: 6,
          color: "black",
          marginRight: 0.5,
        };
        const styleSt11 = {
          fontSize: 13.5,
          maxHeight: "20px",
          minHeight: "20px",
          bgcolor: "#E6F5D6", // светло-салатовый
          border: "1px solid #000",
          borderColor: "#d4d4d4", // серый
          //borderRadius: 1,
          boxShadow: 2,
          color: "black",
          marginRight: 0.5,
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

  if (isOpen && pointsEtalon.length !== 0 && tekValue !== value)
    setValue(tekValue);

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
          <>
            {clinch && <h2>Некорректная структура статистики по данному ХТ</h2>}
          </>
        </>
      )}
    </>
  );
};

export default StatisticsArchive;
//эту
