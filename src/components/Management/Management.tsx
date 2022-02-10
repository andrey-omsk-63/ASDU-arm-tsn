import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import ManagementLeftGrid from './grid/ManagLeftGrid';

import { Tflight } from '../../interfaceMNG.d';

let pointsEtalon: Tflight[];
let flagEtalon = true;

const Management = (props: {
  open: boolean;
  //ws: React.MutableRefObject<WebSocket>;
  ws: WebSocket;
  points: Tflight[];
}) => {

  //console.log('PoinsMG:', props.open, props.points);

  let isOpen = props.open;
  let points = props.points;

  React.useEffect(() => {
    const handleSend = () => {
      // if (props.ws.current.readyState === WebSocket.OPEN) {
      //   props.ws.current.send(JSON.stringify({ type: 'getDevices', region: '1' }));
      if (props.ws.readyState === WebSocket.OPEN) {
        props.ws.send(JSON.stringify({ type: 'getDevices', region: '1' }));
      } else {
        setTimeout(() => {
          handleSend();
        }, 1000);
      }
      console.log('отработал send');
    };

    handleSend();
  }, []);

  //console.log('Etalon0:', pointsEtalon, 'new:', points);
  //console.log('isOpen:', isOpen, 'flagEtalon:', flagEtalon);

  if (isOpen && flagEtalon) {
    pointsEtalon = points;
    flagEtalon = false;
    points = [];
  }

  console.log('Etalon1:', pointsEtalon, 'new:', points);

  if (isOpen && !flagEtalon) {
    for (let i = 0; i < points.length; i++) {
      //console.log("i=", i, points.length)
      for (let j = 0; j < pointsEtalon.length; j++) {
        if (
          points[i].ID === pointsEtalon[j].ID &&
          points[i].region.num === pointsEtalon[j].region.num &&
          points[i].area.num === pointsEtalon[j].area.num &&
          points[i].subarea === pointsEtalon[j].subarea
        ) {
          console.log('совподение записей i=', i, 'j=', j);
          pointsEtalon[j] = points[i];
        }
      }
    }
  }

  console.log('Etalon2:', pointsEtalon, 'new:', points);

  return (
    <Box sx={{ fontSize: 12, marginTop: -3, marginLeft: -1, marginRight: -6 }}>
      <Grid container sx={{ border: 0, marginLeft: -3 }}>
        {isOpen && (
          <>
            <ManagementLeftGrid open={isOpen} tflightt={pointsEtalon} />
          </>
        )}
      </Grid>
    </Box>
  );
};

export default Management;

//const ipAdress: string = 'http://localhost:3000/getAreaOtl.json';
