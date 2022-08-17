import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

//import axios from 'axios';

import StatisticXTNew from "./StatisticXTNew";

import { Statistic } from "../../interfaceStat.d";

let tekValue = 0;
let pointsEtalon: Statistic[];
let flagEtalon = true;

const StatisticsNew = (props: {
  open: boolean;
  ws: WebSocket;
  points: Statistic[];
  region: string;
}) => {
  //console.log('PoinsSt:', props.open, props.points, props.ws);

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
  }, [props.ws, reGion]);

  if (isOpen && flagEtalon) {
    pointsEtalon = points;
    flagEtalon = false;
    points = [];
  }

  if (isOpen && !flagEtalon) {
    let pointsAdd = [];
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
      }
    }
    //console.log('pointsAdd:', pointsAdd);
    if (pointsAdd.length > 0) {
      for (let i = 0; i < pointsAdd.length; i++) {
        pointsEtalon.push(pointsAdd[i]);
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

  const [value, setValue] = React.useState(tekValue);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    tekValue = newValue;
  };

  const SpisXT = () => {
    let resSps: any = [];
    let labl: string = "";

    if (pointsEtalon.length === 0) {
      resSps.push(
        <Box key={1} sx={styleSt1}>
          Нет данных по ХТ
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
          <Box
            sx={{
              maxWidth: 850,
              fontSize: 12,
              marginTop: -2,
              marginLeft: -3,
              marginRight: -7,
            }}
          >
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
              />
            )}
          </>
        </>
      )}
    </>
  );
};

export default StatisticsNew;
