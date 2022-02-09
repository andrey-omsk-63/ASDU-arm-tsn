import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';

//import axios from 'axios';
//import Header from './components/Header/Header';
import Management from './components/Management/Management';
import Points from './components/Points/Points';
import Statistics from './components/Statistics/Statistics';

import { XctrlInfo } from './interfaceGl.d';
import { Tflight } from './interfaceMNG.d';



const App = () => {

  //let pointsXctrl: XctrlInfo[] = [];
  const [pointsXctrl, setPointsXctrl] = React.useState<Array<XctrlInfo>>([]);
  //let pointsTfl: Tflight[]= [];
  const [pointsTfl, setPointsTfl] = React.useState<Array<Tflight>>([]);
  //let isOpenInf = false;
  const [isOpenInf, setIsOpenInf] = React.useState(false);
  //let isOpenDev = false;
  const [isOpenDev, setIsOpenDev] = React.useState(false);

  const host = 'wss://' + window.location.host + window.location.pathname + 'W' + window.location.search
 
  const WS = React.useRef(new WebSocket(host))

  React.useEffect(() => {
    WS.current.onopen = function (event) {
      console.log(event);
    };

    WS.current.onclose = function (event) {
      console.log(event);
    };

    WS.current.onerror = function (event) {
      console.log(event);
    };

    WS.current.onmessage = function (event) {
      let allData = JSON.parse(event.data);
      let data = allData.data;
      switch (allData.type) {
        case 'xctrlInfo':
          setPointsXctrl(data.xctrlInfo ?? [])
          setIsOpenInf(true);
          console.log('pointsXctrl1:', pointsXctrl);
          break;
        case 'getDevices':
          setPointsTfl(data.tflight ?? []);
          setIsOpenDev(true);
          //console.log('pointsTfl1:', pointsTfl);
          break;
        default:
          console.log('data_default:', data);
      }
    };
  }, [host]);

  const styleApp01 = {
    fontSize: 14,
    marginRight: 1,
    width: '12vh',
    maxHeight: '21px',
    minHeight: '21px',
    backgroundColor: '#F1F3F4',
    color: 'black',
    textTransform: 'unset !important',
  };

  const styleApp02 = {
    fontSize: 14,
    marginRight: 1,
    maxHeight: '21px',
    minHeight: '21px',
    width: '24vh',
    backgroundColor: '#F1F3F4',
    color: 'black',
    textTransform: 'unset !important',
  };

  const [value, setValue] = React.useState('1');
  //console.log('pointsXctrl2:', pointsXctrl);
  //console.log('pointsTfl2:', isOpenDev, pointsTfl);

  return (
    <>
      <Box sx={{ typography: 'body2' }}>
        <TabContext value={value}>
          <Box sx={{ marginLeft: 0.2, backgroundColor: '#F1F5FB' }}>
            <Stack direction="row">
              <Button sx={styleApp01} variant="contained" onClick={() => setValue('1')}>
                <b>Управление</b>
              </Button>

              <Button sx={styleApp02} variant="contained" onClick={() => setValue('2')}>
                <b>Характерные точки</b>
              </Button>

              <Button sx={styleApp01} variant="contained" onClick={() => setValue('3')}>
                <b>Статистика</b>
              </Button>
              {/* <Header /> */}
            </Stack>
          </Box>
          <TabPanel value="1">
            <Management open={isOpenDev} ws={WS} points={pointsTfl} />
          </TabPanel>
          <TabPanel value="2">
            <Points open={isOpenInf} xctrll={pointsXctrl} />
          </TabPanel>
          <TabPanel value="3">
            <Statistics />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default App;

 // const WS = new WebSocket('wss://192.168.115.134:4443/user/MMM/charPointsW')
  // const WS = new WebSocket('wss://192.168.115.134:4443/user/Andrey_omsk/charPointsW');

//const [points, setPoints] = React.useState<XctrlInfo>({} as XctrlInfo);

// const [points, setPoints] = React.useState<Array<XctrlInfo>>([]);
// const [isOpen, setIsOpen] = React.useState(false);

//const ipAdress: string = 'http://localhost:3000/otladkaGlob.json';

// React.useEffect(() => {
//   axios.get(ipAdress).then(({ data }) => {
//     setPoints(data.data.xctrlInfo);
//     setIsOpen(true);
//   });
// }, [ipAdress]);
