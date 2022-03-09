import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
//import Modal from '@mui/material/Modal';

//import axios from 'axios';
//import Header from './components/Header/Header';
import Management from './components/Management/Management';
import Points from './components/Points/Points';
import Statistics from './components/Statistics/Statistics';

import { Tflight } from './interfaceMNG.d';

import { XctrlInfo } from './interfaceGl.d';

import { Statistic } from './interfaceStat.d';

let flagWS = true;
let WS: any = null;

const App = () => {
  const styleApp01 = {
    fontSize: 14,
    marginRight: 1,
    width: '12%',
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
    width: '20%',
    backgroundColor: '#F1F3F4',
    color: 'black',
    textTransform: 'unset !important',
  };

  // const styleAppExit = {
  //   fontSize: 14,
  //   marginLeft: 'auto',
  //   marginRight: 0,
  //   maxHeight: '21px',
  //   minHeight: '21px',
  //   width: '9%',
  //   backgroundColor: '#F1F3F4',
  //   color: 'black',
  //   textTransform: 'unset !important',
  // };

  const styleMod = {
    position: 'absolute',
    top: '22.8%',
    left: '47.7%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderColor: 'red',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  };

  const styleBatMenu = {
    fontSize: 14,
    backgroundColor: '#F1F3F4',
    color: 'red',
    marginTop: 1,
    textTransform: 'unset !important',
  };

  const handleClose = () => {
    window.close();
  };

  const EndSeans = () => {
    let soob = 'В Арм-е Технолога системы работает пользователь ' + bsLogin;
    return (
      <>
        {bsLogin !== '' && (
          <>
            <Box sx={styleMod}>
              <Box sx={{ textAlign: 'center', fontSize: 16, color: 'red' }}>
                <b>{soob}</b>
              </Box>
              <Box sx={{ color: 'background.paper' }}>Pusto</Box>
              <Box sx={{ textAlign: 'center' }}>
                <Button sx={styleBatMenu} variant="contained" onClick={handleClose}>
                  <b>Выход</b>
                </Button>
              </Box>
            </Box>
          </>
        )}
      </>
    );
  };

  const [pointsXctrl, setPointsXctrl] = React.useState<Array<XctrlInfo>>([]);
  const [isOpenInf, setIsOpenInf] = React.useState(false);
  const [pointsTfl, setPointsTfl] = React.useState<Array<Tflight>>([]);
  const [isOpenDev, setIsOpenDev] = React.useState(false);
  const [pointsSt, setPointsSt] = React.useState<Array<Statistic>>([]);
  const [isOpenSt, setIsOpenSt] = React.useState(false);
  const [bsLogin, setBsLogin] = React.useState('');

  const host =
    'wss://' + window.location.host + window.location.pathname + 'W' + window.location.search;
  // let WS: React.MutableRefObject<WebSocket> = {};
  //const WS: any = React.useRef(new WebSocket('wss://ws.kraken.com/'));
  //const WS = React.useRef(new WebSocket('wss://ws.kraken.com/'));
  if (flagWS) {
    WS = new WebSocket(host);
    flagWS = false;
  }

  React.useEffect(() => {
    WS.onopen = function (event: any) {
      console.log('WS.current.onopen:', event);
    };

    WS.onclose = function (event: any) {
      console.log('WS.current.onclose:', event);
    };

    WS.onerror = function (event: any) {
      console.log('WS.current.onerror:', event);
    };

    WS.onmessage = function (event: any) {
      let allData = JSON.parse(event.data);
      let data = allData.data;
      switch (allData.type) {
        case 'getDevices':
          setPointsTfl(data.tflight ?? []);
          setIsOpenDev(true);
          break;
        case 'xctrlInfo':
          //console.log('data_xctrlInfo:', data);
          setPointsXctrl(data.xctrlInfo ?? []);
          setIsOpenInf(true);
          break;
        case 'getStatistics':
          setPointsSt(data.statistics ?? []);
          setIsOpenSt(true);
          break;
        case 'busy':
          setBsLogin(data.login);
          break;
        default:
          console.log('data_default:', data);
      }
    };
  }, []);

  const [value, setValue] = React.useState('1');

  return (
    <>
      <EndSeans />
      <Box sx={{ width: '98.8%', typography: 'body2' }}>
        <TabContext value={value}>
          <Box sx={{ marginLeft: 0.5, backgroundColor: '#F1F5FB' }}>
            <Stack direction="row">
              {bsLogin === '' && (
                <Button sx={styleApp01} variant="contained" onClick={() => setValue('1')}>
                  <b>Управление</b>
                </Button>
              )}
              {bsLogin === '' && (
                <Button sx={styleApp02} variant="contained" onClick={() => setValue('2')}>
                  <b>Характерные точки</b>
                </Button>
              )}
              {bsLogin === '' && (
                <Button sx={styleApp01} variant="contained" onClick={() => setValue('3')}>
                  <b>Статистика</b>
                </Button>
              )}
              {/* {bsLogin === '' && (
                <Button sx={styleAppExit} variant="contained" onClick={handleClose}>
                  <b>Выход</b>
                </Button>
              )} */}
              {/* <Header /> */}
            </Stack>
          </Box>
          <TabPanel value="1">
            {WS !== null && (
              <>
                <Management open={isOpenDev} ws={WS} points={pointsTfl} xctrll={pointsXctrl} />
              </>
            )}
          </TabPanel>
          <TabPanel value="2">
            {WS !== null && (
              <>
                <Points open={isOpenInf} ws={WS} xctrll={pointsXctrl} />
              </>
            )}
          </TabPanel>
          <TabPanel value="3">
            {WS !== null && (
              <>
                <Statistics open={isOpenSt} ws={WS} points={pointsSt} />
              </>
            )}
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default App;

//const [points, setPoints] = React.useState<XctrlInfo>({} as XctrlInfo);

// const [points, setPoints] = React.useState<Array<XctrlInfo>>([]);
// const [isOpen, setIsOpen] = React.useState(false);
