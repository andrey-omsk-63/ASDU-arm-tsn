import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { statsaveCreate } from "./../../redux/actions";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import ManagementLeftGrid from "./grid/ManagLeftGrid";

import { debug, WS, RegionGlob } from "../../App";

import { Tflight } from "../../interfaceMNG.d";
import { XctrlInfo } from "../../interfaceGl.d";

let pointsEtalon: Tflight[] = [];
let pointsXctrlEtalon: XctrlInfo[] = [];
let flagEtalon = true;

const Management = (props: {
  open: boolean;
  points: Tflight[];
  xctrll: XctrlInfo[];
  //region: string;
  update: boolean;
}) => {
  //== Piece of Redux =======================================
  let datestat = useSelector((state: any) => {
    const { statsaveReducer } = state;
    return statsaveReducer.datestat;
  });
  const dispatch = useDispatch();
  //===========================================================
  let isOpen = props.open;
  let points = props.points;
  let pointsAdd: Tflight[] = [];
  let reGion = RegionGlob.toString();

  let pointsGl = props.xctrll;
  let pointsXctrll: any = [];

  if (pointsGl !== null) {
    pointsXctrll = pointsGl.filter(
      (pointsGl) => pointsGl.region === Number(reGion)
    );
  }

  if (isOpen) pointsXctrlEtalon = pointsXctrll; // замена проверки обновления Xctrl - проверка теперь в App

  React.useEffect(() => {
    const handleSendOpen = () => {
      if (WS !== null) {
        if (WS.readyState === WebSocket.OPEN) {
          WS.send(JSON.stringify({ type: "stopStatistics", region: reGion }));
          WS.send(
            JSON.stringify({ type: "stopOldStatistics", region: reGion })
          );
          WS.send(JSON.stringify({ type: "getDevices", region: reGion }));
        } else {
          setTimeout(() => {
            handleSendOpen();
          }, 1000);
        }
      }
    };
    if (!debug) handleSendOpen();
  }, [reGion]);

  if (isOpen && flagEtalon) {
    if (points.length) {
      pointsEtalon = points;
      flagEtalon = false;
      points = [];
      pointsXctrlEtalon = pointsXctrll;
    }
  }
  // разноска обновлений Tflight
  if (isOpen && !flagEtalon) {
    pointsAdd = [];
    let newRecord = true;
    for (let i = 0; i < points.length; i++) {
      newRecord = true;
      for (let j = 0; j < pointsEtalon.length; j++) {
        if (
          points[i].ID === pointsEtalon[j].ID &&
          points[i].region.num === pointsEtalon[j].region.num &&
          points[i].area.num === pointsEtalon[j].area.num &&
          points[i].subarea === pointsEtalon[j].subarea
        ) {
          newRecord = false;
          pointsEtalon[j] = points[i];
        }
      }
      if (newRecord) {
        console.log("MNG новая запись i=", i);
        pointsAdd.push(points[i]);
      }
    }
    if (pointsAdd.length > 0)
      for (let i = 0; i < pointsAdd.length; i++)
        pointsEtalon.push(pointsAdd[i]);
    //else console.log("OБНОВИЛСЯ эталон Device");

    datestat.id = 0; // для статистики
    dispatch(statsaveCreate(datestat));

    // разноска обновлений Xctrl
    // let pointsAddd = [];
    // newRecord = true;
    // for (let i = 0; i < pointsXctrll.length; i++) {
    //   newRecord = true;
    //   for (let j = 0; j < pointsXctrlEtalon.length; j++) {
    //     if (
    //       pointsXctrll[i].subarea === pointsXctrlEtalon[j].subarea &&
    //       pointsXctrll[i].region === pointsXctrlEtalon[j].region &&
    //       pointsXctrll[i].area === pointsXctrlEtalon[j].area
    //     ) {
    //       newRecord = false;
    //       pointsXctrlEtalon[j] = pointsXctrll[i];
    //     }
    //   }
    //   if (newRecord) {
    //     console.log('MNG новая запись i=', i);
    //     pointsAddd.push(pointsXctrll[i]);
    //   }
    // }
    // if (pointsAdd.length > 0) {
    //   for (let i = 0; i < pointsAdd.length; i++) {
    //     pointsXctrlEtalon.push(pointsAddd[i]);
    //   }
    // }
  }

  return (
    <Box sx={{ fontSize: 12, marginTop: -3, marginLeft: -3, marginRight: -5 }}>
      <Grid container sx={{ border: 0, marginLeft: 0 }}>
        {isOpen && !flagEtalon && (
          <>
            <ManagementLeftGrid
              open={isOpen}
              tflightt={pointsEtalon}
              xctrll={pointsXctrlEtalon}
            />
          </>
        )}
      </Grid>
    </Box>
  );
};

export default Management;
