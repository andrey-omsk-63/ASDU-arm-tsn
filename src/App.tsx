import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { maskpointCreate, statsaveCreate } from "./redux/actions";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";

import "dayjs/locale/ru";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";

import Management from "./components/Management/Management";
import Points from "./components/Points/Points";
import StatisticsNew from "./components/Statistics/StatisticsNew";
import StatisticsArchive from "./components/Statistics/StatisticsArchive";
import BeginSeans from "./AppBeginSeans";
import EndSeans from "./AppEndSeans";
import InputInterval from "./AppInpInerval";
import AppWriteToAllFileForXT from "./AppWriteToAllFileForXT";

import { Tflight } from "./interfaceMNG.d";
import { XctrlInfo } from "./interfaceGl.d";
import { Statistic } from "./interfaceStat.d";
import { RegionInfo } from "./interfaceGl.d";

import { styleImpServis, styleInp, styleInt01 } from "./AppStyle";
import { styleImpBlock, styleBoxTabContext } from "./AppStyle";

import { MakeInterval, WriteToCsvFileForStat } from "./AppServiceFunctions";
import { ButtonMenu } from "./AppServiceFunctions";
import { InputerDate, MakeDate, InputerOk } from "./AppServiceFunctions";
import { PunktMenuSaveFile } from "./AppServiceFunctions";

import { dataStatNow } from "./NullStatNow";

export interface Stater {
  area: number;
  id: number;
  data: string;
  time: string;
  TLen: number;
  stat: Array<any>;
  tekArea: number;
  tekId: number;
  xtCsv: string;
  xtTxt: string;
  xtGraf: any;
  xtName: string;
  xttData: string;
  xtt: number;
  result: Array<any>;
  needSave: boolean;
}

export let dateStat: Stater = {
  area: 0,
  id: 0,
  data: MakeDate(new Date()),
  time: "24:00",
  TLen: 0,
  stat: [],
  tekArea: 0,
  tekId: 0,
  xtCsv: "",
  xtTxt: "",
  xtGraf: null,
  xtName: "",
  xttData: "ccc",
  xtt: -1,
  result: [],
  needSave: false,
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
let saveXt = false;

let massIntervalNow: any = [];
let massIntervalOld: any = [1, 5, 10, 15, 30, 60];
let massIntervalNowStart: any = [];
let massIntervalOldStart: any = [1, 5, 10, 15, 30, 60];
let nullOldStatistics = false;
let nullNewStatistics = false;
let massGoodDate: Array<string> = [];
let tekValue = "1";

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
  const [pointsReg, setPointsReg] = React.useState<RegionInfo>(
    {} as RegionInfo
  );
  const [regionGlob, setRegionGlob] = React.useState(0);
  const [isOpenInf, setIsOpenInf] = React.useState(false);
  const [pointsTfl, setPointsTfl] = React.useState<Array<Tflight>>([]);
  const [isOpenDev, setIsOpenDev] = React.useState(false);
  const [pointsSt, setPointsSt] = React.useState<Array<any>>([]);
  const [pointsOldSt, setPointsOldSt] = React.useState<Array<Statistic>>([]);
  const [isOpenSt, setIsOpenSt] = React.useState(false);
  const [isOpenOldSt, setIsOpenOldSt] = React.useState(false);
  const [bsLogin, setBsLogin] = React.useState("");
  const [valueDate, setValueDate] = React.useState<Dayjs | null>(null);
  const [value, setValue] = React.useState("1");
  const [trigger, setTrigger] = React.useState(true);
  const [saveXT, setSaveXT] = React.useState(false);
  const [write, setWrite] = React.useState(false);
  const [openSetErrLog, setOpenSetErrLog] = React.useState(false);
  const [calculate, setCalculate] = React.useState(true);

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
        if (newRecord) pointsAdd.push(pointsXctrl[i]);
      }
      if (pointsAdd.length > 0) {
        for (let i = 0; i < pointsAdd.length; i++)
          pointsEtalonXctrl.push(pointsAdd[i]);
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

  let host = "wss://" + window.location.host + window.location.pathname;
  host += "W" + window.location.search;
  if (flagOpenWS) {
    WS = new WebSocket(host);
    flagOpenWS = false;
    if (WS.url === "wss://localhost:3000/W") debug = true;
  }

  React.useEffect(() => {
    WS.onopen = function (event: any) {
      console.log("WS.current.onopen:", event);
    };
    WS.onclose = function (event: any) {
      console.log("WS.current.onclose:", event);
    };
    WS.onerror = function (event: any) {
      console.log("WS.current.onerror:", event);
    };
    WS.onmessage = function (event: any) {
      let allData = JSON.parse(event.data);
      let data = allData.data;
      //console.log("пришло:", allData.type, data);
      switch (allData.type) {
        case "getDevices":
          setPointsTfl(data.tflight ?? []);
          setIsOpenDev(true);
          break;
        case "xctrlInfo":
          setPointsXctrl(data.xctrlInfo ?? []);
          if (regionGlob === 0) setPointsReg(data.regionInfo ?? []);
          console.log("xctrlInfo:", data.xctrlInfo);
          setIsOpenInf(true);
          break;
        case "getStatisticsList":
          if (data.dates) {
            for (let i = 0; i < data.dates.length; i++) {
              massGoodDate.push(data.dates[i].slice(0, 10));
            }
          }
          break;
        case "getStatistics":
          setPointsSt(data.statistics ?? []);
          let st = dataStatNow.data.statistics;
          if (data.statistics) st = data.statistics;
          SetStatisticsIntervalNow(st);
          nullNewStatistics = false;
          setIsOpenSt(true);
          break;
        case "getOldStatistics":
          setPointsOldSt(data.statistics ?? []);
          let stOld = dataStatNow.data.statistics;
          if (data.statistics) stOld = data.statistics;
          SetStatisticsIntervalOld(stOld);
          nullOldStatistics = false;
          setIsOpenOldSt(true);
          break;
        case "getCalculation":
          datestat.result = data.results;
          datestat.xttData = formSett;
          dispatch(statsaveCreate(datestat));
          setCalculate(!calculate);
          break;
        case "busy":
          setBsLogin(data.login);
          if (data.login) {
            setValue("3");
            setValueDate(dayjs(formSett));
            setOpenSetErrLog(true);
            tekValue = "3";
          }
          break;
        case "close":
          window.close();
          break;
        default:
          console.log("data_default:", allData.data);
      }
    };
  }, [calculate, datestat, dispatch, regionGlob]);

  if (debug && flagOpenDebug) {
    console.log("РЕЖИМ ОТЛАДКИ!!! ");
    axios.get("http://localhost:3000/otladkaPoints.json").then(({ data }) => {
      setPointsTfl(data.data.tflight);
      setIsOpenDev(true);
    });
    const ipAdress: string = "http://localhost:3000/otladkaXctrl.json";
    axios.get(ipAdress).then(({ data }) => {
      setPointsXctrl(data.data.xctrlInfo ?? []);
      if (regionGlob === 0) setPointsReg(data.data.regionInfo ?? []);
      if (data.data.xctrlInfo !== null) {
        maskPoint.pointForRedax = data.data.xctrlInfo[0];
        dispatch(maskpointCreate(maskpoint));
      }
      setIsOpenInf(true);
    });
    axios.get("http://localhost:3000/otladkaStatNow.json").then(({ data }) => {
      setPointsSt(data.data.statistics);
      dispatch(statsaveCreate(datestat));
      let st = dataStatNow.data.statistics;
      if (data.statistics) st = data.statistics;
      SetStatisticsIntervalNow(st);
      setIsOpenSt(true);
    });
    axios.get("http://localhost:3000/otladkaStatOld.json").then(({ data }) => {
      formSettOld = formSett;
      setPointsOldSt(data.data.statistics);
      let st = dataStatNow.data.statistics;
      if (data.statistics) st = data.statistics;
      SetStatisticsIntervalOld(st);
      setIsOpenOldSt(true);
    });
    axios.get("http://localhost:3000/otladkaXctrll.json").then(({ data }) => {
      console.log("getCalculation:", data.data.results);
      datestat.result = data.data.results;
      dispatch(statsaveCreate(datestat));
    });
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

  const InputDate = () => {
    const InputDat = React.useMemo(() => {
      let goodDate = massGoodDate;
      if (value === "2") goodDate = [];
      const handleChangeDP = (event: any) => {
        let god = new Date(event.toString()).getFullYear();
        if (event.toString() !== "Invalid Date" && tekYear - god <= 5) {
          eventInp = event;
          inpDate = true;
          setValueDate(eventInp);
        } else {
          inpDate = false;
        }
      };
      return <>{InputerDate(valueDate, handleChangeDP, goodDate)}</>;
    }, []);
    return InputDat;
  };

  const InputNewDateInterval = (props: { mode: number }) => {
    const InputOk = () => {
      if (eventInp <= date) {
        formSett = MakeDate(eventInp);
        if (props.mode) {
          if (formSett === formSettToday) {
            interval = massIntervalNow[tekIdNow];
            SetValue("3");
          } else {
            interval = massIntervalOld[tekIdOld]; //console.log("ПЕРЕХОД В АРХИВ");
            nullOldStatistics = false;
            if (!massIntervalOld.length) {
              massIntervalOld = [1, 5, 10, 15, 30, 60];
              interval = 5;
            }
            if (formSett !== formSettOld) {
              if (!debug) {
                setPointsOldSt([]); //console.log("ПЕРЕХОД В НОВЫЙ АРХИВ");
                setIsOpenOldSt(false);
              } else {
                SetStatisticsIntervalOld(pointsOldSt);
              }
            }
            SetValue("4");
          }
        }
        setValueDate(eventInp);
      } else {
        alert("Введённая дата ещё не наступила!!!");
        setValueDate(dayjs(formSett));
      }
      inpDate = false;
      setTrigger(!trigger);
    };

    let dat = MakeInterval(massIntervalNowStart[tekIdNow]);
    if (value === "4") {
      dat = MakeInterval(massIntervalOldStart[tekIdOld]);
    } else {
      if (formSett !== formSettToday)
        dat = MakeInterval(massIntervalOldStart[tekIdOld]);
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
        value: "",
        label: "",
      };
      maskCurrencies.value = massKey[i];
      maskCurrencies.label = massDat[i];
      currencies.push(maskCurrencies);
    }

    if (!interval) interval = 5;
    const [currency, setCurrency] = React.useState(
      massKey[massDat.indexOf(interval.toString())]
    );

    const ChangeInt = (event: any) => {
      setCurrency(event.target.value);
      interval = Number(massDat[Number(event.target.value)]);
      if (value === "4") {
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
        {props.mode !== 0 && ( // работает только в статистике
          <>
            {PunktMenuSaveFile(SetValue, tekValue)}
            <Grid item container sx={{ width: "120px" }}>
              <Grid item xs={7} sx={{ textAlign: "left" }}>
                Интервал:
              </Grid>
              <Grid item xs={5}>
                <Box sx={styleInt01}>
                  <InputInterval
                    curr={currencies}
                    cur={currency}
                    func={ChangeInt}
                  />
                </Box>
              </Grid>
            </Grid>
          </>
        )}

        <Grid item container sx={styleImpBlock}>
          {InputerOk(inpDate, InputOk)}
          <Grid item xs sx={styleImpServis}>
            <Box sx={styleInp}>{InputDate()}</Box>
          </Grid>
        </Grid>
      </>
    );
  };

  const SetValue = (mode: string) => {
    switch (mode) {
      case "1":
        setValue(mode);
        tekValue = mode;
        break;
      case "2":
        formSett = formSettToday;
        datestat.xttData = MakeDate(new Date());
        dispatch(statsaveCreate(datestat));
        setValueDate(dayjs(formSett));
        setValue(mode);
        tekValue = mode;
        break;
      case "3":
        formSett = formSettToday;
        interval = massIntervalNow[tekIdNow];
        setValueDate(dayjs(formSett));
        setValue(mode);
        tekValue = mode;
        break;
      case "5":
        WriteToCsvFileForStat(datestat);
        break;
      case "7":
        setWrite(true);
        break;
      default:
        setValue(mode);
    }
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
    if (saveXt !== mode) {
      saveXt = mode;
      setSaveXT(mode);
    }
  };

  UpdateXctrl(); // разноска обновлений Xctrl

  return (
    <>
      {openSetErrLog && (
        <EndSeans bsLogin={bsLogin} setOpen={setOpenSetErrLog} />
      )}
      {regionGlob === 0 && isOpenInf && (
        <BeginSeans ws={WS} pointsReg={pointsReg} SetRegion={setRegionGlob} />
      )}
      {!openSetErrLog && (
        <>
          {write && <AppWriteToAllFileForXT setOpen={setWrite} />}
          <Box sx={{ width: "98.8%" }}>
            <TabContext value={value}>
              <Box sx={styleBoxTabContext}>
                {!bsLogin && (
                  <>{ButtonMenu("1", "Управление", SetValue, tekValue)}</>
                )}
                {!bsLogin && (
                  <>
                    {ButtonMenu("2", "Характерные точки", SetValue, tekValue)}
                  </>
                )}
                {ButtonMenu("3", "Статистика", SetValue, tekValue)}
                {!bsLogin && value === "2" && saveXT && (
                  <>{ButtonMenu("7", "Сохр.в файл", SetValue, tekValue)}</>
                )}
                {value === "2" && <InputNewDateInterval mode={0} />}
                {value === "3" && isOpenSt && <InputNewDateInterval mode={1} />}
                {value === "4" && isOpenOldSt && !nullOldStatistics && (
                  <InputNewDateInterval mode={1} />
                )}
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
                    date={formSett}
                    calc={calculate}
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
                  />
                )}
              </TabPanel>
            </TabContext>
          </Box>
        </>
      )}
    </>
  );
};

export default App;
