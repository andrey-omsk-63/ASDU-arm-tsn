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

// export interface busy {
//   type: string;
//   data: Data;
// }

// export interface Data {
//   login: string;
// }

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

  const styleMod = {
    position: 'absolute',
    top: '22.8%',
    left: '47.7%',
    transform: 'translate(-50%, -50%)',
    width: 164,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 1,
  };

  const styleBatMenu = {
    fontSize: 12.9,
    backgroundColor: '#F1F3F4',
    color: 'black',
    marginTop: 1,
  };

  const handleClose = () => {
    //setOpenMod(false);
    window.close();
  };

  const EndSeans = () => {
    return (
      <>
        {bsLogin === '' && (
          <>
            <Box sx={styleMod}>
              <h1>Работает&nbsp;{bsLogin}</h1>

              <Button sx={styleBatMenu} variant="contained" onClick={handleClose}>
                Выход
              </Button>
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

  // const EndSeans = () => {
  //   console.log('data_busy4:', bsLogin);

  // }

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
          console.log('data_xctrlInfo:', data);
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

  if (bsLogin !== '') {
    let soob = 'В Арм-е Технолога системы работает ' + bsLogin;
    alert(soob);
    //window.close();
  }

  return (
    <>
      <Box sx={{ width: '98.5%', typography: 'body2' }}>
        <TabContext value={value}>
          <Box sx={{ marginLeft: 0.5, backgroundColor: '#F1F5FB' }}>
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
              <EndSeans />
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

//
//
// import React, { useState, useRef, useEffect, useCallback } from "react";

// const AppWs = () => {
//     const [isPaused, setIsPaused] = useState(false);
//     const [data, setData] = useState(null);
//     const [status, setStatus] = useState("");
//     const ws = useRef(null);

//     useEffect(() => {
//         if (!isPaused) {
//             ws.current = new WebSocket("wss://ws.kraken.com/"); // создаем ws соединение
//             ws.current.onopen = () => setStatus("Соединение открыто");  // callback на ивент открытия соединения
//             ws.current.onclose = () => setStatus("Соединение закрыто"); // callback на ивент закрытия соединения

//             gettingData();
//         }

//         return () => ws.current.close(); // кода меняется isPaused - соединение закрывается
//     }, [ws, isPaused]);

//     const gettingData = useCallback(() => {
//         if (!ws.current) return;

//         ws.current.onmessage = e => {                //подписка на получение данных по вебсокету
//             if (isPaused) return;
//             const message = JSON.parse(e.data);
//             setData(message);
//         };
//     }, [isPaused]);

//     return (
//         <>
//             {!!data &&
//                 <div>
//                     <div>
//                         <h2>{status}</h2>
//                         <p>{`connection ID: ${data?.connectionID}`}</p>
//                         <p>{`event: ${data?.event}`}</p>
//                         <p>{`status: ${data?.status}`}</p>
//                         <p>{`version: ${data?.version}`}</p>
//                     </div>
//                     <button onClick={() => {
//                         ws.current.close();
//                         setIsPaused(!isPaused)
//                     }}>{!isPaused ? 'Остановить соединение' : 'Открыть соединение' }</button>
//                 </div>
//             }
//         </>
//     )
// }

// export default AppWs;
