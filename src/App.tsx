import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { maskpointCreate, statsaveCreate } from './redux/actions';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TabPanel from '@mui/lab/TabPanel';
import TextField from '@mui/material/TextField';
import TabContext from '@mui/lab/TabContext';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/ru';

import { CalendarPickerSkeleton } from '@mui/x-date-pickers/CalendarPickerSkeleton';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import Badge from '@mui/material/Badge';

import dayjs, { Dayjs } from 'dayjs';
import axios from 'axios';

import Management from './components/Management/Management';
import Points from './components/Points/Points';
import StatisticsNew from './components/Statistics/StatisticsNew';
import StatisticsArchive from './components/Statistics/StatisticsArchive';
import EndSeans from './AppEndSeans';
import InputInterval from './AppInpInerval';

import { Tflight } from './interfaceMNG.d';
import { XctrlInfo } from './interfaceGl.d';
import { Statistic } from './interfaceStat.d';
import { RegionInfo } from './interfaceGl.d';

import { styleModalMenu, styleInt01 } from './AppStyle';
import { styleImpServis, styleInp, styleDatePicker } from './AppStyle';
import { styleInpOk, styleButOk, styleImpBlock } from './AppStyle';

import { MakeInterval, WriteToCsvFile } from './AppServiceFunctions';
import { SendSocketgetStatisticsList } from './AppServiceFunctions';

import { dataStatNow } from './NullStatNow';

const MakeDate = (tekData: Date) => {
  let ddd = new Date(tekData.toString());
  let SMes = ddd.getMonth() + 1;
  let sDate = ddd.getFullYear() + '-';
  let sDay = ddd.getDate();
  if (SMes < 10) sDate = sDate + '0';
  sDate += SMes + '-';
  if (sDay < 10) sDate += '0';
  sDate += sDay;
  return sDate;
};

export interface Stater {
  area: number;
  id: number;
  data: string;
  time: string;
  TLen: number;
  stat: Array<any>;
  tekArea: number;
  tekId: number;
  xtSave: boolean;
}

export let dateStat: Stater = {
  area: 0,
  id: 0,
  data: MakeDate(new Date()),
  time: '24:00',
  TLen: 0,
  stat: [],
  tekArea: 0,
  tekId: 0,
  xtSave: false,
};

export interface Pointer {
  newXt: boolean;
  redaxPoint: boolean;
  savePoint: boolean;
  pointForRedax: any;
}

export let maskPoint: Pointer = {
  newXt: true,
  redaxPoint: true,
  savePoint: false,
  pointForRedax: [],
};

let flagOpenWS = true;
let WS: any = null;

let debug = false;
let flagOpenDebug = true;

let regionGlob: number = 0;
let massRegion: Array<number> = [];
let massNameRegion: Array<string> = [];

let pointsEtalonXctrl: XctrlInfo[];
let flagEtalonInf = true;

const date = new Date();
const tekYear = date.getFullYear();
let formSett = MakeDate(date);
let formSettToday = MakeDate(date);
let formSettOld = MakeDate(date);

let eventInp: any = null;
let inpDate = false;

let interval = 5;
let tekIdNow = 0;
let tekIdOld = 0;

let massIntervalNow: any = [];
let massIntervalOld: any = [1, 5, 10, 15, 30, 60];
let massIntervalNowStart: any = [];
let massIntervalOldStart: any = [1, 5, 10, 15, 30, 60];
let nullOldStatistics = false;
let nullNewStatistics = false;

let massGoodDate: Array<string> = [];

const App = () => {
  //== Piece of Redux ======================================
  let maskpoint = useSelector((state: any) => {
    const { maskpointReducer } = state;
    return maskpointReducer.maskpoint;
  });
  let datestat = useSelector((state: any) => {
    const { statsaveReducer } = state;
    return statsaveReducer.datestat;
  });
  const dispatch = useDispatch();
  //========================================================
  const [pointsXctrl, setPointsXctrl] = React.useState<Array<XctrlInfo>>([]);
  const [pointsReg, setPointsReg] = React.useState<RegionInfo>({} as RegionInfo);
  const [isOpenInf, setIsOpenInf] = React.useState(false);
  const [pointsTfl, setPointsTfl] = React.useState<Array<Tflight>>([]);
  const [isOpenDev, setIsOpenDev] = React.useState(false);
  //const [pointsSt, setPointsSt] = React.useState<Array<Statistic>>([]);
  const [pointsSt, setPointsSt] = React.useState<Array<any>>([]);
  const [pointsOldSt, setPointsOldSt] = React.useState<Array<Statistic>>([]);
  const [isOpenSt, setIsOpenSt] = React.useState(false);
  const [isOpenOldSt, setIsOpenOldSt] = React.useState(false);
  const [bsLogin, setBsLogin] = React.useState('');
  // const [valueDate, setValueDate] = React.useState<Date | null>(
  //   new Date(formSett)
  // );
  //let initialValue = dayjs(formSett);
  const [valueDate, setValueDate] = React.useState<Dayjs | null>(null);
  const [value, setValue] = React.useState('1');
  const [trigger, setTrigger] = React.useState(true);
  const [saveXT, setSaveXT] = React.useState(false);

  const [open, setOpen] = React.useState(true);

  const handleCloseModal = (numer: number) => {
    regionGlob = numer;
    SendSocketgetStatisticsList(debug, WS, regionGlob.toString());
    setOpen(false);
  };

  const BeginSeans = () => {
    let dlStrMenu = 0;

    if (isOpenInf && regionGlob === 0) {
      for (let key in pointsReg) {
        if (!isNaN(Number(key))) {
          massRegion.push(Number(key)); // ключ - символьное число
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

    const styleModal = {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: dlStrMenu,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      borderColor: 'primary.main',
      borderRadius: 4,
      boxShadow: 24,
      p: 3,
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
    if (!nullOldStatistics) {
      massIntervalOld = [];
      massIntervalOldStart = [];
      for (let i = 0; i < points.length; i++) {
        massIntervalOld.push(points[i].Statistics[0].TLen);
        massIntervalOldStart.push(points[i].Statistics[0].TLen);
        if (!i) interval = massIntervalOld[0];
      }
      tekIdOld = 0;
      formSettOld = formSett;
    }
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
        case 'getStatisticsList':
          for (let i = 0; i < data.dates.length; i++) {
            massGoodDate.push(data.dates[i].slice(0, 10));
          }
          break;
        case 'getStatistics':
          console.log('data_NewStatistics:', data);
          setPointsSt(data.statistics ?? []);
          // SetStatisticsIntervalNow(data.statistics ?? []);
          let st = dataStatNow.data.statistics;
          if (data.statistics) st = data.statistics;
          SetStatisticsIntervalNow(st);
          nullNewStatistics = false;
          setIsOpenSt(true);
          break;
        case 'getOldStatistics':
          console.log('data_OLDSTATistics:', formSettOld, data);
          setPointsOldSt(data.statistics ?? []);
          //SetStatisticsIntervalOld(data.statistics ?? []);
          let stOld = dataStatNow.data.statistics;
          if (data.statistics) stOld = data.statistics;
          SetStatisticsIntervalOld(stOld);
          nullOldStatistics = false;
          //if (!data.statistics) nullOldStatistics = true;
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
    console.log('РЕЖИМ ОТЛАДКИ!!! ');
    regionGlob = 1;
    axios.get('http://localhost:3000/otladkaPoints.json').then(({ data }) => {
      setPointsTfl(data.data.tflight);
      setIsOpenDev(true);
    });
    const ipAdress: string = 'http://localhost:3000/otladkaXctrl.json';
    //const ipAdress: string = "http://localhost:3000/otladkaGlob.json";
    axios.get(ipAdress).then(({ data }) => {
      setPointsXctrl(data.data.xctrlInfo);
      if (regionGlob === 0) setPointsReg(data.data.regionInfo ?? []);
      maskPoint.pointForRedax = data.data.xctrlInfo[0];
      dispatch(maskpointCreate(maskpoint));
      setIsOpenInf(true);
    });
    axios.get('http://localhost:3000/otladkaStatNow.json').then(({ data }) => {
      setPointsSt(data.data.statistics);
      dispatch(statsaveCreate(datestat));
      // SetStatisticsIntervalNow([]);   // костыль для отладки
      let st = dataStatNow.data.statistics;
      if (data.statistics) st = data.statistics;
      SetStatisticsIntervalNow(st);
      // setPointsSt([]);
      setIsOpenSt(true);
    });
    axios.get('http://localhost:3000/otladkaStatOld.json').then(({ data }) => {
      formSettOld = formSett;
      setPointsOldSt(data.data.statistics);
      let st = dataStatNow.data.statistics;
      if (data.statistics) st = data.statistics;
      SetStatisticsIntervalOld(st);
      setIsOpenOldSt(true);
    });
    //SetStatisticsIntervalOld([]);
    flagOpenDebug = false;
  }

  const SetIdNow = (newId: number, intervalId: number) => {
    tekIdNow = newId;
    interval = intervalId;
    if (tekIdNow < 0) {
      nullNewStatistics = true;
      tekIdNow = 0;
    }
    setTrigger(!trigger);
  };

  const SetIdOld = (newId: number, intervalId: number) => {
    tekIdOld = newId;
    if (intervalId) interval = intervalId;
    setTrigger(!trigger);
  };

  const InputNewDateInterval = () => {
    const InputOk = () => {
      if (eventInp <= date) {
        formSett = MakeDate(eventInp);
        if (formSett === formSettToday) {
          interval = massIntervalNow[tekIdNow];
          SetValue('3');
        } else {
          interval = massIntervalOld[tekIdOld];
          nullOldStatistics = false;
          //console.log("ПЕРЕХОД В АРХИВ", interval, tekIdOld, massIntervalOld);
          if (!massIntervalOld.length) {
            massIntervalOld = [1, 5, 10, 15, 30, 60];
            interval = 5;
          }
          if (formSett !== formSettOld) {
            //console.log("ПЕРЕХОД В НОВЫЙ АРХИВ", debug);
            if (!debug) {
              setPointsOldSt([]);
              setIsOpenOldSt(false);
            } else {
              SetStatisticsIntervalOld(pointsOldSt);
            }
          }
          SetValue('4');
        }
        setValueDate(eventInp);
      } else {
        alert('Введённая дата ещё не наступила!!!');
        setValueDate(dayjs(formSett));
      }
      inpDate = false;
      setTrigger(!trigger);
    };

    const InputDate = () => {
      let dat = valueDate;
      const handleChangeDP = (event: any) => {
        let god = new Date(event.toString()).getFullYear();
        if (event.toString() !== 'Invalid Date' && tekYear - god <= 5) {
          //console.log("event OK");
          eventInp = event;
          inpDate = true;
          setValueDate(eventInp);
        } else {
          //console.log("event No");
          inpDate = false;
          setValueDate(dat);
          setTrigger(!trigger);
        }
      };

      return (
        <Box sx={styleDatePicker}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ru'}>
            <DatePicker
              views={['day']}
              value={valueDate}
              inputFormat="DD-MM-YYYY"
              InputProps={{ style: { fontSize: 14 } }}
              onChange={handleChangeDP}
              renderInput={(params: any) => <TextField {...params} />}
              renderLoading={() => <CalendarPickerSkeleton />}
              renderDay={(day, _value, DayComponentProps) => {
                const isSelected =
                  !DayComponentProps.outsideCurrentMonth &&
                  massGoodDate.indexOf(MakeDate(day)) >= 0;
                return (
                  <Badge
                    key={day.toString()}
                    overlap="circular"
                    badgeContent={isSelected ? '👍' : undefined}>
                    <PickersDay {...DayComponentProps} />
                  </Badge>
                );
              }}
            />
          </LocalizationProvider>
        </Box>
      );
    };

    let dat = MakeInterval(massIntervalNowStart[tekIdNow]);
    if (value === '4') {
      dat = MakeInterval(massIntervalOldStart[tekIdOld]);
    } else {
      if (formSett !== formSettToday) {
        dat = MakeInterval(massIntervalOldStart[tekIdOld]);
      }
    }

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

    if (!interval) interval = 5;

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
      setTrigger(!trigger);
    };

    return (
      <>
        <Grid item container sx={{ marginRight: 0.3, width: '140px' }}>
          <Grid item xs sx={{ textAlign: 'left' }}>
            {ButtonMenu('5', 'Сохр.в файл')}
          </Grid>
        </Grid>

        <Grid item container sx={{ border: 0, width: '120px' }}>
          <Grid item xs={7} sx={{ textAlign: 'left' }}>
            Интервал:
          </Grid>
          <Grid item xs={5}>
            <Box sx={styleInt01}>
              <InputInterval curr={currencies} cur={currency} func={handleChangeInt} />
            </Box>
          </Grid>
        </Grid>

        <Grid item container sx={styleImpBlock}>
          <Grid item xs={2.3} sx={styleInpOk}>
            {inpDate && (
              <Button sx={styleButOk} variant="contained" onClick={() => InputOk()}>
                Да
              </Button>
            )}
          </Grid>
          <Grid item xs sx={styleImpServis}>
            <Box sx={styleInp}>
              <InputDate />
            </Box>
          </Grid>
        </Grid>
      </>
    );
  };

  const SetValue = (mode: string) => {
    if (mode === '5') {
      WriteToCsvFile(datestat);
    } else {
      if (mode === '3') {
        formSett = formSettToday;
        interval = massIntervalNow[tekIdNow];
        setValueDate(dayjs(formSett));
      }
      setValue(mode);
    }
  };

  const ButtonMenu = (mode: string, soob: string) => {
    const styleApp02 = {
      fontSize: 14,
      marginRight: 1,
      minWidth: (soob.length + 10) * 6.5,
      maxWidth: (soob.length + 10) * 6.5,
      maxHeight: '21px',
      minHeight: '21px',
      backgroundColor: '#E9F5D8',
      color: 'black',
      textTransform: 'unset !important',
    };

    return (
      <Button sx={styleApp02} variant="contained" onClick={() => SetValue(mode)}>
        <b>{soob}</b>
      </Button>
    );
  };

  const SetPointsXctrl = (points: any) => {
    let masRab: Array<XctrlInfo> = [];
    for (let i = 0; i < pointsXctrl.length; i++) {
      if (
        pointsXctrl[i].region === points.region &&
        pointsXctrl[i].area === points.area &&
        pointsXctrl[i].subarea === points.subarea
      ) {
        masRab.push(points);
      } else {
        masRab.push(pointsXctrl[i]);
      }
    }
    setPointsXctrl(masRab);
  };

  const SetSaveXT = (mode: boolean) => {
    setSaveXT(mode);
  };

  UpdateXctrl(); // разноска обновлений Xctrl

  console.log('saveXT:', saveXT);

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
              {!bsLogin && value === '2' && saveXT && <>{ButtonMenu('7', 'Сохр.в файл')}</>}
              {!bsLogin && value === '3' && isOpenSt && <InputNewDateInterval />}
              {!bsLogin && value === '4' && isOpenOldSt && !nullOldStatistics && (
                <InputNewDateInterval />
              )}
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
                setPoint={SetPointsXctrl}
                saveXt={SetSaveXT}
              />
            )}
          </TabPanel>
          <TabPanel value="3">
            {WS !== null &&
              regionGlob !== 0 &&
              formSett === formSettToday &&
              !nullNewStatistics && (
                <StatisticsNew
                  open={isOpenSt}
                  ws={WS}
                  points={pointsSt}
                  region={String(regionGlob)}
                  date={formSett}
                  interval={interval}
                  func={SetIdNow}
                  pointsTfl={pointsTfl}
                />
              )}
            {WS !== null &&
              regionGlob !== 0 &&
              !nullOldStatistics &&
              formSett !== formSettToday && (
                <StatisticsArchive
                  open={true}
                  ws={WS}
                  points={pointsOldSt}
                  region={String(regionGlob)}
                  date={formSett}
                  interval={interval}
                  func={SetIdOld}
                  pointsTfl={pointsTfl}
                />
              )}
          </TabPanel>
          <TabPanel value="4">
            {WS !== null && regionGlob !== 0 && !nullOldStatistics && (
              <StatisticsArchive
                open={isOpenOldSt}
                ws={WS}
                points={pointsOldSt}
                region={String(regionGlob)}
                date={formSett}
                interval={interval}
                func={SetIdOld}
                pointsTfl={pointsTfl}
              />
            )}
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default App;
