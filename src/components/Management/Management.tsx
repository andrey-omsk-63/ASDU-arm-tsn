import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import ManagementLeftGrid from './grid/ManagLeftGrid';

import { Tflight } from '../../interfaceMNG.d';
import { XctrlInfo } from '../../interfaceGl.d';

//import axios from 'axios';

let pointsEtalon: Tflight[];
let flagEtalon = true;

const Management = (props: {
  open: boolean;
  ws: WebSocket;
  points: Tflight[];
  xctrll: XctrlInfo[];
}) => {
  //console.log('PoinsMG:', props.open, props.points);

  // const [points, setPoints] = React.useState<Array<Tflight>>([]);
  // const [isOpen, setIsOpen] = React.useState(false);

  // const ipAdress: string = 'http://localhost:3000/getAreaOtl.json';
  // React.useEffect(() => {
  //   axios.get(ipAdress).then(({ data }) => {
  //     console.log('eee', data.data.tflight);
  //     setPoints(data.data.tflight);
  //     setIsOpen(true);
  //   });
  // }, [ipAdress]);

  //console.log('dddd', points, isOpen);

  let isOpen = props.open;
  let points = props.points;
  let pointsAdd: Tflight[] = [];

  if (!isOpen) {
    pointsEtalon = [];
    flagEtalon = true;
  }

  React.useEffect(() => {
    const handleSendOpen = () => {
      if (props.ws !== null) {
        if (props.ws.readyState === WebSocket.OPEN) {
          props.ws.send(JSON.stringify({ type: 'stopStatistics', region: '1' }));
          props.ws.send(JSON.stringify({ type: 'getDevices', region: '1' }));
        } else {
          setTimeout(() => {
            handleSendOpen();
          }, 1000);
        }
      }
    };
    handleSendOpen();
  }, [props.ws]);


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

        //console.log('points[i]',i,points[i])
        //console.log('pointsEtalon[j]',j,pointsEtalon[j])
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
    //console.log('pointsAdd:', pointsAdd);
    if (pointsAdd.length > 0) {
      for (let i = 0; i < pointsAdd.length; i++) {
        pointsEtalon.push(pointsAdd[i])
      }
    }
  }

  //console.log('Etalon2:', pointsEtalon, 'new:', points);

  return (
    <Box sx={{ fontSize: 12, marginTop: -3, marginLeft: -3, marginRight: -5 }}>
      <Grid container sx={{ border: 0, marginLeft: 0 }}>
        {isOpen && (
          <>
            {/* <ManagementLeftGrid open={isOpen} tflightt={points} /> */}
            <ManagementLeftGrid open={isOpen} ws={props.ws} tflightt={pointsEtalon} xctrll={props.xctrll} />
          </>
        )}
      </Grid>
    </Box>
  );
};

export default Management;
