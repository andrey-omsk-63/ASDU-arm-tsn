import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import ManagementLeftGrid from './grid/ManagLeftGrid';

//import axios from 'axios';

import { Tflight } from '../../interfaceMNG.d';

const Management = (props: { open: boolean; ws: WebSocket; points: Tflight[] }) => {


  console.log('PoinsMG:', props.open, props.points)

  const [points, setPoints] = React.useState<Array<Tflight>>([]);
  //const [isOpen, setIsOpen] = React.useState(false);
  let isOpen = false;
  //const ipAdress: string = 'http://localhost:3000/getAreaOtl.json';

  React.useEffect(() => {
    console.log('ещё не отработал send:', isOpen, props.ws)

    const handleSend = () => {
      if (props.ws.readyState === WebSocket.OPEN) {
        props.ws.send(JSON.stringify({ "type": "getDevices", "region": "1" }))
        console.log('отработал send:', props.ws)
      } else {
        // Queue a retry
        console.log('не отработал send:')
        setTimeout(() => { handleSend() }, 1000)
        
      }
    };

    handleSend()
    //props.ws.send(JSON.stringify({ "type": "getDevices", "region": "1" }))
    isOpen = true;
    console.log('отработал send:', props.ws)

    // axios.get(ipAdress).then(({ data }) => {
    //   setPoints(data.data.tflight);
    //   setIsOpen(true);
    // });
  }, [props.ws]);

  return (
    <Box sx={{ fontSize: 12, marginTop: -3, marginLeft: -1, marginRight: -6 }}>
      <Grid container sx={{ marginLeft: -3 }}>
        <ManagementLeftGrid open={isOpen} tflightt={points} />

      </Grid>
    </Box>
  );
};

export default Management;
