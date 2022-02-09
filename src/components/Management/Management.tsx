import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import ManagementLeftGrid from './grid/ManagLeftGrid';

import { Tflight } from '../../interfaceMNG.d';

let pointsEtalon: Tflight[];
let flagEtalon = true; 

const Management = (props: { open: boolean; ws: React.MutableRefObject<WebSocket>; points: Tflight[] }) => {

  //console.log('PoinsMG:', props.open, props.points)

  let isOpen = props.open;
  let points = props.points
  
  React.useEffect(() => {

    const handleSend = () => {
      if (props.ws.current.readyState === WebSocket.OPEN) {
        props.ws.current.send(JSON.stringify({ "type": "getDevices", "region": "1" }))
      } else {
        setTimeout(() => { handleSend() }, 1000)
      }
      console.log('отработал send');
    };

    handleSend()
    //isOpen = true;
  }, [props.ws]);

  if (isOpen && flagEtalon) {
    pointsEtalon = points;
    flagEtalon = false;
  }

console.log('Etalon:', pointsEtalon, 'new:', points)

  return (
    <Box sx={{ fontSize: 12, marginTop: -3, marginLeft: -1, marginRight: -6 }}>
      <Grid container sx={{ border: 1, marginLeft: -3 }}>
        {isOpen && <div><ManagementLeftGrid open={isOpen} tflightt={points} /></div>}
      </Grid>
    </Box>
  );
};

export default Management;

//const ipAdress: string = 'http://localhost:3000/getAreaOtl.json';



