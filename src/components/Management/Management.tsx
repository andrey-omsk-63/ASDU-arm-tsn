import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import ManagementLeftGrid from './grid/ManagLeftGrid';

import { Tflight } from '../../interfaceMNG.d';
import { XctrlInfo } from '../../interfaceGl.d';

let pointsEtalon: Tflight[];
let flagEtalon = true;

const Management = (props: {
  open: boolean;
  ws: WebSocket;
  points: Tflight[];
  xctrll: XctrlInfo[];
  region: string;
}) => {
  let isOpen = props.open;
  let points = props.points;
  let pointsAdd: Tflight[] = [];
  let reGion = props.region;

  let pointsGl = props.xctrll;
  let pointsXctrll = pointsGl.filter((pointsGl) => pointsGl.region === Number(reGion));
  // console.log('pointsGl:', pointsGl)
  // console.log('pointsXctrll:', pointsXctrll)

  if (!isOpen) {
    pointsEtalon = [];
    flagEtalon = true;
  }

  React.useEffect(() => {
    const handleSendOpen = () => {
      if (props.ws !== null) {
        if (props.ws.readyState === WebSocket.OPEN) {
          props.ws.send(JSON.stringify({ type: 'stopStatistics', region: reGion }));
          props.ws.send(JSON.stringify({ type: 'getDevices', region: reGion }));
        } else {
          setTimeout(() => {
            handleSendOpen();
          }, 1000);
        }
      }
    };
    handleSendOpen();
  }, [props.ws, reGion]);

  if (isOpen && flagEtalon) {
    pointsEtalon = points;
    flagEtalon = false;
    points = [];
  }

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
          //console.log('MNG совподение записей i=', i, 'j=', j);
          newRecord = false;
          pointsEtalon[j] = points[i];
        }
      }
      if (newRecord) {
        console.log('MNG новая запись i=', i);
        pointsAdd.push(points[i]);
      }
    }
    if (pointsAdd.length > 0) {
      for (let i = 0; i < pointsAdd.length; i++) {
        pointsEtalon.push(pointsAdd[i]);
      }
    }
  }

  return (
    <Box sx={{ fontSize: 12, marginTop: -3, marginLeft: -3, marginRight: -5 }}>
      <Grid container sx={{ border: 0, marginLeft: 0 }}>
        {isOpen && (
          <>
            <ManagementLeftGrid
              open={isOpen}
              ws={props.ws}
              tflightt={pointsEtalon}
              xctrll={pointsXctrll}
            />
          </>
        )}
      </Grid>
    </Box>
  );
};

export default Management;
