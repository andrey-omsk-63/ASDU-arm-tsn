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
import { Statistic } from './interfaceStat.d';

const App = () => {
  const [pointsXctrl, setPointsXctrl] = React.useState<Array<XctrlInfo>>([]);
  const [isOpenInf, setIsOpenInf] = React.useState(false);
  const [pointsTfl, setPointsTfl] = React.useState<Array<Tflight>>([]);
  const [isOpenDev, setIsOpenDev] = React.useState(false);
  const [pointsSt, setPointsSt] = React.useState<Array<Statistic>>([]);
  const [isOpenSt, setIsOpenSt] = React.useState(false);

  const host = 'wss://' + window.location.host + window.location.pathname + 'W' + window.location.search;
  const WS = React.useRef(new WebSocket(host));
  //const WS = new WebSocket(host);

  React.useEffect(() => {
    WS.current.onopen = function (event) {

      console.log('WS.current.onopen:', event);
    };

    WS.current.onclose = function (event) {

      console.log('WS.current.onclose:', event);
    };

    WS.current.onerror = function (event) {

      console.log('WS.current.onerror:', event);
    };

    WS.current.onmessage = function (event) {

      let allData = JSON.parse(event.data);
      let data = allData.data;
      switch (allData.type) {
        case 'xctrlInfo':
          setPointsXctrl(data.xctrlInfo ?? []);
          setIsOpenInf(true);

          break;
        case 'getDevices':
          setPointsTfl(data.tflight ?? []);
          setIsOpenDev(true);

          break;
        case 'getStatistics':
          setPointsSt(data.statistics ?? []);
          setIsOpenSt(true);

          break;
        default:
          console.log('data_default:', data);
      }
    };
  }, [host]);

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

  const [value, setValue] = React.useState('1');
  //console.log('Точки pointsXctrl:', pointsXctrl);
  //console.log('Упр_pointsTfl2:', isOpenDev, pointsTfl);
  //console.log('Стат_pointsSt:', isOpenSt, pointsSt);

  return (
    <>
      <Box sx={{ border: 0, width: '98.5%', typography: 'body2' }}>
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
            <Statistics open={isOpenSt} ws={WS} points={pointsSt} />
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
