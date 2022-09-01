import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ru } from 'date-fns/locale';

import axios from 'axios';

import Management from './components/Management/Management';
import Points from './components/Points/Points';
import StatisticsNew from './components/Statistics/StatisticsNew';
import StatisticsArchive from './components/Statistics/StatisticsArchive';
import EndSeans from './AppEndSeans';
import InputInterval from './AppInpInerval';

import { Tflight } from './interfaceMNG.d';
import { XctrlInfo } from './interfaceGl.d';
import { RegionInfo } from './interfaceGl.d';
import { Statistic } from './interfaceStat.d';

//import { styleModal } from "./AppStyle";
import { styleModalMenu, styleInt01, styleApp02 } from './AppStyle';
import { styleImpServis, styleInp, styleDatePicker } from './AppStyle';
import { MakeInterval } from './AppServiceFunctions';

let flagOpenWS = true;
let WS: any = null;

let debug = false;
let flagOpenDebug = true;

let regionGlob: number = 0;
let massRegion: Array<number> = [];
let massNameRegion: Array<string> = [];

let pointsEtalonXctrl: XctrlInfo[];
let flagEtalonInf = true;

const MakeDate = (tekData: Date) => {
  let SMes = tekData.getMonth() + 1;
  let sDate = tekData.getFullYear() + '-';
  if (SMes < 10) sDate = sDate + '0';
  sDate = sDate + SMes + '-' + tekData.getDate();
  return sDate;
};

let formSett = MakeDate(new Date());
let formSettToday = MakeDate(new Date());
let formSettOld = MakeDate(new Date());
let interval = 0;
let tekIdNow = 0;
let tekIdOld = 0;

let massIntervalNow: any = [];
let massIntervalOld: any = [];
let massIntervalNowStart: any = [];
let massIntervalOldStart: any = [];

const App = () => {
  const [pointsXctrl, setPointsXctrl] = React.useState<Array<XctrlInfo>>([]);
  const [pointsReg, setPointsReg] = React.useState<RegionInfo>({} as RegionInfo);
  const [isOpenInf, setIsOpenInf] = React.useState(false);
  const [pointsTfl, setPointsTfl] = React.useState<Array<Tflight>>([]);
  const [isOpenDev, setIsOpenDev] = React.useState(false);
  const [pointsSt, setPointsSt] = React.useState<Array<Statistic>>([]);
  const [pointsOldSt, setPointsOldSt] = React.useState<Array<Statistic>>([]);
  const [isOpenSt, setIsOpenSt] = React.useState(false);
  const [isOpenOldSt, setIsOpenOldSt] = React.useState(false);
  const [bsLogin, setBsLogin] = React.useState('');
  const [valueDate, setValueDate] = React.useState<Date | null>(new Date(formSett));
  const [value, setValue] = React.useState('1');
  const [trigger, setTrigger] = React.useState(true);

  const [open, setOpen] = React.useState(true);

  const handleCloseModal = (numer: number) => {
    regionGlob = numer;
    setOpen(false);
  };

  const BeginSeans = () => {
    let dlStrMenu = 0;

    const styleModal = {
      position: 'relative',
      bottom: '-48vh',
      marginLeft: '60vh',
      transform: 'translate(-50%, -50%)',
      width: dlStrMenu,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      borderColor: 'primary.main',
      borderRadius: 2,
      boxShadow: 24,
      p: 3,
    };

    if (isOpenInf && regionGlob === 0) {
      for (let key in pointsReg) {
        if (!isNaN(Number(key))) {
          // ключ - символьное число
          massRegion.push(Number(key));
          massNameRegion.push(pointsReg[key]);
          if (pointsReg[key].length > dlStrMenu) dlStrMenu = pointsReg[key].length;
        }
      }
      regionGlob = massRegion[0];
      dlStrMenu = (dlStrMenu + 8) * 10;
    }

    if (massRegion.length === 1) {
      handleCloseModal(massRegion[0]);
    }

    const SpisRegion = () => {
      let resStr = [];
      for (let i = 0; i < massRegion.length; i++) {
        resStr.push(
          <Button
            key={i}
            sx={styleModalMenu}
            variant="contained"
            onClick={() => handleCloseModal(massRegion[i])}>
            <b>{massNameRegion[i]}</b>
          </Button>,
        );
      }
      return resStr;
    };

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

  const UpdateXctrl = () => {
    if (isOpenInf && !flagEtalonInf) {
      let pointsAdd = []; // разноска обновлений Xctrl
      let newRecord = true;
      for (let i = 0; i < pointsXctrl.length; i++) {
        newRecord = true;
        for (let j = 0; j < pointsEtalonXctrl.length; j++) {
          if (
            pointsXctrl[i].subarea === pointsEtalonXctrl[j].subarea &&
            pointsXctrl[i].region === pointsEtalonXctrl[j].region &&
            pointsXctrl[i].area === pointsEtalonXctrl[j].area
          ) {
            newRecord = false;
            pointsEtalonXctrl[j] = pointsXctrl[i];
            //console.log('Points обновилась запись i=', i);
          }
        }
        if (newRecord) {
          console.log('Points новая запись i=', i);
          pointsAdd.push(pointsXctrl[i]);
        }
      }
      if (pointsAdd.length > 0) {
        for (let i = 0; i < pointsAdd.length; i++) {
          pointsEtalonXctrl.push(pointsAdd[i]);
        }
      }
    }
    if (isOpenInf && flagEtalonInf) {
      pointsEtalonXctrl = pointsXctrl; // получен первый WS
      flagEtalonInf = false;
    }
  };

  const SetStatisticsIntervalNow = (points: any) => {
    for (let i = 0; i < points.length; i++) {
      massIntervalNow.push(points[i].Statistics[0].TLen);
      massIntervalNowStart.push(points[i].Statistics[0].TLen);
      if (!i) interval = massIntervalNow[0];
    }
  };

  const SetStatisticsIntervalOld = (points: any) => {
    massIntervalOld = [];
    for (let i = 0; i < points.length; i++) {
      massIntervalOld.push(points[i].Statistics[0].TLen);
      massIntervalOldStart.push(points[i].Statistics[0].TLen);
      if (!i) interval = massIntervalOld[0];
    }
    tekIdOld = 0;
    formSettOld = formSett;
    console.log('@@@@@@', formSettOld, tekIdOld, massIntervalOld);
  };

  const host =
    'wss://' + window.location.host + window.location.pathname + 'W' + window.location.search;

  if (flagOpenWS) {
    WS = new WebSocket(host);
    flagOpenWS = false;
    if (WS.url === 'wss://localhost:3000/W') debug = true;
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
          console.log('data_getDevices:', data);
          setPointsTfl(data.tflight ?? []);
          setIsOpenDev(true);
          break;
        case 'xctrlInfo':
          console.log('data_xctrlInfo:', data);
          setPointsXctrl(data.xctrlInfo ?? []);
          if (regionGlob === 0) setPointsReg(data.regionInfo ?? []);
          setIsOpenInf(true);
          break;
        case 'getStatistics':
          console.log('data_NewStatistics:', data);
          SetStatisticsIntervalNow(data.statistics);
          setPointsSt(data.statistics ?? []);
          setIsOpenSt(true);
          break;
        case 'getOldStatistics':
          //formSettOld = formSett;
          console.log('DATA_OLDSTATistics:', formSettOld, data);
          SetStatisticsIntervalOld(data.statistics);
          setPointsOldSt(data.statistics ?? []);
          setIsOpenOldSt(true);
          break;
        case 'busy':
          setBsLogin(data.login);
          break;
        default:
          console.log('data_default:', data);
      }
    };
  }, []);

  if (debug && flagOpenDebug) {
    console.log('РЕЖИМ ОТЛАДКИ!!!');
    //let dateMNG: any = dataMNG.data.xctrlInfo; // xctrlInfo
    regionGlob = 1;
    const ipAdress: string = 'http://localhost:3000/otladkaMNG.json';
    axios.get(ipAdress).then(({ data }) => {
      console.log('data:', data.data.xctrlInfo);
      setPointsXctrl(data.data.xctrlInfo);
      setIsOpenInf(true);
    });
    axios.get('http://localhost:3000/otladkaPoints.json').then(({ data }) => {
      setPointsTfl(data.data.tflight);
      setIsOpenDev(true);
    });
    axios.get('http://localhost:3000/otladkaStatNow.json').then(({ data }) => {
      SetStatisticsIntervalNow(data.data.statistics);
      setPointsSt(data.data.statistics);
      setIsOpenSt(true);
    });
    axios.get('http://localhost:3000/otladkaStatOld.json').then(({ data }) => {
      formSettOld = formSett;
      SetStatisticsIntervalOld(data.data.statistics);
      setPointsOldSt(data.data.statistics);
      setIsOpenOldSt(true);
    });

    flagOpenDebug = false;
  }

  const SetIdNow = (newId: number, intervalId: number) => {
    tekIdNow = newId;
    interval = intervalId;
    console.log('Пришло_SetIdNow:', tekIdNow, interval);
    setTrigger(!trigger);
  };

  const SetIdOld = (newId: number, intervalId: number) => {
    tekIdOld = newId;
    interval = intervalId;
    console.log('Пришло_SetIdOld:', tekIdOld, interval);
    setTrigger(!trigger);
  };

  const InputNewDate = () => {
    const InputDate = () => {
      const handleChangeDP = (event: any) => {
        formSett = MakeDate(event);
        console.log('ВВЕДЕНО:', formSett, formSettOld, formSettToday);
        if (formSett === formSettToday) {
          interval = massIntervalNow[tekIdNow];
          setValue('3');
          console.log('ПЕРЕХОД В СТАТИСТИКУ');
        } else {
          console.log('ПЕРЕХОД В АРХИВ', tekIdOld, massIntervalOld);
          interval = massIntervalOld[tekIdOld];

          if (formSett !== formSettOld) {
            console.log('ПЕРЕХОД В НОВЫЙ АРХИВ', debug);
            if (!debug) {
              setPointsOldSt([]);
              setIsOpenOldSt(false);
            } else {
              SetStatisticsIntervalOld(pointsOldSt);
            }
          }
          setValue('4');
        }
        setValueDate(event);
        setTrigger(!trigger);
      };

      return (
        <Box sx={styleDatePicker}>
          <LocalizationProvider adapterLocale={ru} dateAdapter={AdapterDateFns}>
            <DatePicker
              views={['day']}
              value={valueDate}
              inputFormat="dd-MM-yyyy"
              InputProps={{ style: { fontSize: 14 } }}
              onChange={handleChangeDP}
              renderInput={(params: any) => <TextField {...params} helperText={null} />}
            />
          </LocalizationProvider>
        </Box>
      );
    };

    // console.log("massIntervalNow:", tekIdNow, massIntervalNow);
    console.log('######:', value, tekIdOld, formSett, formSettToday);
    let dat = MakeInterval(massIntervalNowStart[tekIdNow]);
    if (value === '4') {
      dat = MakeInterval(massIntervalOldStart[tekIdOld]);
    } else {
      if (formSett !== formSettToday) {
        dat = MakeInterval(massIntervalOldStart[tekIdOld]);
      }
    }
    //let dat = MakeInterval(massIntervalNow[tekIdNow]);

    console.log('DAT:', dat);

    let massKey = [];
    let massDat: any = [];
    const currencies: any = [];
    for (let key in dat) {
      massKey.push(key);
      massDat.push(dat[key]);
    }
    for (let i = 0; i < massKey.length; i++) {
      let maskCurrencies = {
        value: '',
        label: '',
      };
      maskCurrencies.value = massKey[i];
      maskCurrencies.label = massDat[i];
      currencies.push(maskCurrencies);
    }
    console.log('!!!!!!interval:', interval, massIntervalNow[tekIdNow]);
    //interval = massIntervalNow[tekIdNow];

    const [currency, setCurrency] = React.useState(massKey[massDat.indexOf(interval.toString())]);

    const handleChangeInt = (event: any) => {
      setCurrency(event.target.value);
      interval = Number(massDat[Number(event.target.value)]);

      if (value === '4') {
        massIntervalOld[tekIdOld] = interval;
      } else {
        if (formSett !== formSettToday) {
          massIntervalOld[tekIdOld] = interval;
        } else {
          massIntervalNow[tekIdNow] = interval;
        }
      }

      console.log('&&&SetCurrency:', interval, event.target.value, currency);
      console.log('&&&&&&:', massIntervalNow, massIntervalOld);
      setTrigger(!trigger);
    };

    return (
      <>
        <Grid item container sx={{ border: 0, width: '150px' }}>
          <Grid item xs={7} sx={{ border: 0, textAlign: 'right' }}>
            Интервал:
          </Grid>
          <Grid item xs={5}>
            <Box sx={styleInt01}>
              <InputInterval curr={currencies} cur={currency} func={handleChangeInt} />
            </Box>
          </Grid>
        </Grid>
        <Box sx={styleImpServis}>
          <Grid item container>
            <Grid item xs sx={styleInp}>
              <InputDate />
            </Grid>
          </Grid>
        </Box>
      </>
    );
  };

  const ButtonMenu = (mode: string, soob: string) => {
    return (
      <Button sx={styleApp02} variant="contained" onClick={() => setValue(mode)}>
        <b>{soob}</b>
      </Button>
    );
  };

  UpdateXctrl(); // разноска обновлений Xctrl

  return (
    <>
      <EndSeans bsLogin={bsLogin} />
      {regionGlob === 0 && isOpenInf && <BeginSeans />}
      <Box sx={{ width: '98.8%', typography: 'body2' }}>
        <TabContext value={value}>
          <Box sx={{ marginLeft: 0.5, backgroundColor: '#F1F5FB' }}>
            <Stack direction="row">
              {!bsLogin && <>{ButtonMenu('1', 'Управление')}</>}
              {!bsLogin && <>{ButtonMenu('2', 'Характерные точки')}</>}
              {!bsLogin && <>{ButtonMenu('3', 'Статистика')}</>}
              {!bsLogin && Number(value) > 2 && isOpenSt && <InputNewDate />}
            </Stack>
          </Box>
          <TabPanel value="1">
            {WS !== null && regionGlob !== 0 && (
              <Management
                open={isOpenDev}
                ws={WS}
                points={pointsTfl}
                xctrll={pointsXctrl}
                region={String(regionGlob)}
              />
            )}
          </TabPanel>
          <TabPanel value="2">
            {WS !== null && regionGlob !== 0 && (
              <Points
                open={isOpenInf}
                ws={WS}
                xctrll={pointsEtalonXctrl}
                region={String(regionGlob)}
              />
            )}
          </TabPanel>
          <TabPanel value="3">
            {WS !== null &&
              regionGlob !== 0 &&
              // formSettOld === formSettToday && (
              formSett === formSettToday && (
                <StatisticsNew
                  open={isOpenSt}
                  ws={WS}
                  points={pointsSt}
                  region={String(regionGlob)}
                  date={formSett}
                  interval={interval}
                  func={SetIdNow}
                />
              )}
            {WS !== null && regionGlob !== 0 && formSett !== formSettToday && (
              <StatisticsArchive
                open={true}
                ws={WS}
                points={pointsOldSt}
                region={String(regionGlob)}
                date={formSett}
                interval={interval}
                func={SetIdOld}
              />
            )}
          </TabPanel>
          <TabPanel value="4">
            {WS !== null && regionGlob !== 0 && (
              <StatisticsArchive
                open={isOpenOldSt}
                ws={WS}
                points={pointsOldSt}
                region={String(regionGlob)}
                date={formSett}
                interval={interval}
                func={SetIdOld}
              />
            )}
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default App;
