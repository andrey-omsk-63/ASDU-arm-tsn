import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

//import axios from 'axios';

import StatisticXTArchive from "./StatisticXTArchive";

import { Statistic } from "../../interfaceStat.d";

let tekValue = 0;
let pointsEtalon: Statistic[];
let flagEtalon = true;
let massInterval: any = [];
//let massIntervalEt: any = [];

let oldDate = "";

const StatisticsArchive = (props: {
  open: boolean;
  ws: WebSocket;
  points: Statistic[];
  region: string;
  date: string;
  interval: number;
  func: any;
}) => {
  console.log(
    "!!!PoinsStArchive:",
    props.open,
    props.date,
    oldDate,
    props.points,
    props.interval
  );

  let isOpen = props.open;
  let points = props.points;
  let reGion = props.region;
  //let tekDate = oldDate;
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
    console.log('2StatisticsArchive_пересчёт')
    pointsEtalon = points;
    flagEtalon = false;
    massInterval = [];
    for (let i = 0; i < points.length; i++) {
      massInterval.push(points[i].Statistics[0].TLen);
      //massIntervalEt.push(points[i].Statistics[0].TLen);
    }
    console.log("OLDmassInterval", massInterval, points);
    points = [];
    tekValue = 0;
  }
   else {
    console.log('3StatisticsArchive_пересчёт',isOpen ,flagEtalon,massInterval)
    if (massInterval.length) massInterval[tekValue] = props.interval;
    console.log('1StatisticsArchive_пересчёт',isOpen ,flagEtalon,massInterval)
  
  }
  console.log("PROPS.OLDmassInterval", massInterval);

  const styleSt1 = {
    fontSize: 13.5,
    maxHeight: "20px",
    minHeight: "20px",
    backgroundColor: "#F1F3F4",
    color: "black",
    marginRight: 0.5,
  };

  const styleSt2 = {
    maxWidth: 850,
    minWidth: 850,
    fontSize: 12,
    marginTop: -2,
    marginLeft: -3,
    marginRight: -7,
  };

  const [value, setValue] = React.useState(tekValue);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    tekValue = newValue;
    props.func(tekValue, massInterval[tekValue]);
    console.log("Old_ПЕРЕДАЛ:", tekValue, massInterval[tekValue]);
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
        labl =
          pointsEtalon[i].area.toString() + ":" + pointsEtalon[i].id.toString();
        resSps.push(<Tab key={i} sx={styleSt1} label={labl} />);
      }
    }
    return resSps;
  };

  return (
    <>
      {isOpen && (
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
              <StatisticXTArchive
                open={isOpen}
                statist={pointsEtalon}
                areaid={value}
                date={props.date}
                interval={massInterval[tekValue]}
              />
            )}
          </>
        </>
      )}
    </>
  );
};

export default StatisticsArchive;
