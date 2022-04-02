import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Modal from '@mui/material/Modal';

//import axios from 'axios';
//import Header from './components/Header/Header';
import Management from './components/Management/Management';
import Points from './components/Points/Points';
import Statistics from './components/Statistics/Statistics';

import { Tflight } from './interfaceMNG.d';

import { XctrlInfo } from './interfaceGl.d';
import { RegionInfo } from './interfaceGl.d';

import { Statistic } from './interfaceStat.d';

let flagWS = true;
let WS: any = null;
let regionGlob: number = 0;
let massRegion: Array<number> = [];
let massNameRegion: Array<string> = [];

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
  const styleApp99 = {
    fontSize: 14,
    marginRight: 1,
    maxHeight: '21px',
    minHeight: '21px',
    width: '20%',
    backgroundColor: '#F1F3F4',
    color: 'red',
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

  const styleModalMenu = {
    fontSize: 14,
    maxHeight: '20px',
    minHeight: '20px',
    backgroundColor: '#F1F3F4',
    color: 'black',
    marginRight: 1,
    marginTop: 2,
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

  const [open, setOpen] = React.useState(true);

  const handleCloseModal = (numer: number) => {
    regionGlob = numer;
    setOpen(false);
  };

  const BeginSeans = () => {
    let dlStrMenu = 0;

    const SpisRegion = () => {
      let resStr = [];
      for (let i = 0; i < massRegion.length; i++) {
        resStr.push(
          <Button
            key={i}
            sx={styleModalMenu}
            variant="contained"
            onClick={() => handleCloseModal(massRegion[i])}>
            {/* <b>{massRegion[i]}&nbsp;-&nbsp;{massNameRegion[i]}</b> */}
            <b>{massNameRegion[i]}</b>
          </Button>,
        );
      }
      return resStr;
    };

    if (isOpenInf && regionGlob === 0) {
      for (let i = 0; i < pointsXctrl.length; i++) {
        let flag = true;
        for (let j = 0; j < massRegion.length; j++) {
          if (pointsXctrl[i].region === massRegion[j]) flag = false;
        }
        if (flag) massRegion.push(pointsXctrl[i].region);
      }
      massRegion.sort();
      regionGlob = massRegion[0];

      console.log('massRegion:', massRegion);
      console.log('pointsReg:', pointsReg);

      if (massNameRegion.length === 0) {
        for (let i = 0; i < massRegion.length; i++) {
          let strMenu = pointsReg[massRegion[i].toString() as keyof RegionInfo];
          massNameRegion.push(strMenu);
          if (strMenu?.length > dlStrMenu) dlStrMenu = strMenu.length;
        }
      }
    }

    const styleModal = {
      position: 'relative',
      bottom: '-48vh',
      marginLeft: '60vh',
      transform: 'translate(-50%, -50%)',
      width: (dlStrMenu + 8) * 10,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      borderColor: 'primary.main',
      borderRadius: 2,
      boxShadow: 24,
      p: 3,
    };

    if (massRegion.length === 1) {
      handleCloseModal(massRegion[0]);
    }

    return (
      <Modal open={open}>
        <Box sx={styleModal}>
          <Stack direction="column">
            <Box sx={{ textAlign: 'center' }}>Выбор региона:</Box>
            {/* <Box sx={{ overflowX: 'auto', height: '36vh' }}>{SpisRegion()}</Box> */}
            {SpisRegion()}
          </Stack>
        </Box>
      </Modal>
    );
  };

  const [pointsXctrl, setPointsXctrl] = React.useState<Array<XctrlInfo>>([]);
  const [pointsReg, setPointsReg] = React.useState<RegionInfo>({} as RegionInfo);
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
      //console.log('пришло:', data);
      switch (allData.type) {
        case 'getDevices':
          setPointsTfl(data.tflight ?? []);
          setIsOpenDev(true);
          break;
        case 'xctrlInfo':
          //console.log('data_xctrlInfo:', data);
          setPointsXctrl(data.xctrlInfo ?? []);
          if (regionGlob === 0) setPointsReg(data.regionInfo ?? []);
          setIsOpenInf(true);
          break;
        case 'getStatistics':
          console.log('data_statistics:', data);
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
      {regionGlob === 0 && isOpenInf && <BeginSeans />}
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
              {bsLogin === '' && (
                <Button sx={styleApp99} variant="contained" onClick={() => setValue('4')}>
                  <b>Не нажимать!</b>
                </Button>
              )}
            </Stack>
          </Box>
          <TabPanel value="1">
            {WS !== null && regionGlob !== 0 && (
              <>
                <Management
                  open={isOpenDev}
                  ws={WS}
                  points={pointsTfl}
                  xctrll={pointsXctrl}
                  region={String(regionGlob)}
                />
              </>
            )}
          </TabPanel>
          <TabPanel value="2">
            {WS !== null && regionGlob !== 0 && (
              <>
                <Points open={isOpenInf} ws={WS} xctrll={pointsXctrl} region={String(regionGlob)} />
              </>
            )}
          </TabPanel>
          <TabPanel value="3">
            {WS !== null && regionGlob !== 0 && (
              <>
                <Statistics open={isOpenSt} ws={WS} points={pointsSt} region={String(regionGlob)} />
              </>
            )}
          </TabPanel>
          <TabPanel value="4">
            {WS !== null && regionGlob !== 0 && (
              <>
                <Statistics open={isOpenSt} ws={WS} points={pointsSt} region={String(regionGlob)} />
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

// {bsLogin === '' && (
//   <Button sx={styleAppExit} variant="contained" onClick={handleClose}>
//     <b>Выход</b>
//   </Button>
// )}
// <Header />
