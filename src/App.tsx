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
import ButtonMenu from "./AppButtonMenu";
import AppWriteToAllFileForXT from "./AppWriteToAllFileForXT";

import { Tflight } from "./interfaceMNG.d";
import { XctrlInfo } from "./interfaceGl.d";
import { Statistic } from "./interfaceStat.d";
import { RegionInfo } from "./interfaceGl.d";

import { MakeInterval, WriteToCsvFileForStat } from "./AppServiceFunctions";
import { DispatchXctrl, SendSocketDevices } from "./AppServiceFunctions";
import { InputerDate, MakeDate, InputerOk } from "./AppServiceFunctions";
import { PunktMenuSaveFile } from "./AppServiceFunctions";

import { styleImpServis, styleInp, styleInt01 } from "./AppStyle";
import { styleImpBlock, styleBoxTabContext, styleInt02 } from "./AppStyle";

import { Priority } from "./AppConst"; // приоритет доступа ко всем функциям АРМ-а при отладке
import { StatOnly } from "./AppConst"; // работа только в статистике при отладке

import { dataStatNow } from "./NullStatNow";

export interface Stater {
  area: number;
  id: number;
  data: string;
  time: string;
  TLen: number;
  stat: Array<any>;
  tekArea: number;
  tekSubarea: number;
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
  tekSubarea: 0,
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

export let debug = false; // режим отладки или демо
export let WS: any = null; // WebSocket
export let PRIORITY: boolean = true; // приоритет доступа ко всем функциям АРМ-а

let flagOpenWS = true;

let flagOpenDebug = true;
let pointsEtalonXctrl: XctrlInfo[];
let flagEtalonInf = true;
export let pointsTFL: Tflight[];

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

let update = true;
let updateDevice = true;

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
  const [openErrLog, setOpenErrLog] = React.useState(false);
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
            pointsEtalonXctrl[j] = JSON.parse(JSON.stringify(pointsXctrl[i]));
          }
        }
        if (newRecord)
          pointsAdd.push(JSON.parse(JSON.stringify(pointsXctrl[i])));
      }
      if (pointsAdd.length > 0) {
        console.log("OБНОВИЛСЯ эталон Изменилось количество ХТ");
        for (let i = 0; i < pointsAdd.length; i++)
          pointsEtalonXctrl.push(pointsAdd[i]);
      }
    }
    if (isOpenInf && flagEtalonInf) {
      pointsEtalonXctrl = JSON.parse(JSON.stringify(pointsXctrl)); // получен первый WS
      console.log("Cоздан эталон", pointsEtalonXctrl);
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

  const SetModeStat = () => {
    setValue("3");
    setValueDate(dayjs(formSett));
    tekValue = "3";
  };

  let host = "wss://" + window.location.host + window.location.pathname;
  host += "W" + window.location.search;
  if (flagOpenWS) {
    WS = new WebSocket(host);
    flagOpenWS = false;
    if (
      WS.url.slice(0, 20) === "wss://localhost:3000" ||
      WS.url.slice(0, 27) === "wss://andrey-omsk-63.github"
    ) {
      debug = true; // режим отладки или DEMO-режим
      if (StatOnly) {
        setBsLogin("!!!");
        SetModeStat();
      } else PRIORITY = Priority;
    } else {
      let mass = WS.url.split("/");
      if (StatOnly || mass[mass.length - 1].slice(0, 10) !== "charPoints") {
        setBsLogin("!!!");
        SetModeStat();
      } else if (mass[mass.length - 2] !== "TechAutomatic") PRIORITY = false;
    }
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
      switch (allData.type) {
        case "getDevices":
          console.log("Пришло tflight:", data.tflight); // =================================
          setPointsTfl(data.tflight ?? []);
          pointsTFL = data.tflight ?? [];
          !isOpenDev && setIsOpenDev(true);
          updateDevice = !updateDevice;
          break;
        case "dispatch":
          console.log("Пришло dispatch:", data.msg);
          if (data.status) {
            pointsEtalonXctrl = DispatchXctrl(data, pointsEtalonXctrl);
            updateDevice = !updateDevice; // для обновления строки состояния в ManagementRightGrid
            setPointsXctrl(pointsEtalonXctrl);
            setTrigger(!trigger);
          }
          break;
        case "xctrlInfo":
          let d = new Date();
          let h = d.getHours();
          console.log("xctrlInfo:", h, d.getMinutes(), data.xctrlInfo);
          setPointsXctrl(data.xctrlInfo ?? []);
          if (regionGlob === 0) setPointsReg(data.regionInfo ?? []);
          update = !update; // для обновдения точек в графиках
          !isOpenInf && setIsOpenInf(true);
          break;
        case "getStatisticsList":
          if (data.dates)
            for (let i = 0; i < data.dates.length; i++)
              massGoodDate.push(data.dates[i].slice(0, 10));
          break;
        case "getStatistics":
          setPointsSt(data.statistics ?? []);
          let st = dataStatNow.data.statistics;
          if (data.statistics) st = data.statistics;
          SetStatisticsIntervalNow(st);
          nullNewStatistics = false;
          !isOpenSt && setIsOpenSt(true);
          break;
        case "getOldStatistics":
          //console.log("getOldStatistics:", data); // =================================
          setPointsOldSt(data.statistics ?? []);
          let stOld = dataStatNow.data.statistics;
          if (data.statistics) stOld = data.statistics;
          SetStatisticsIntervalOld(stOld);
          nullOldStatistics = false;
          !isOpenOldSt && setIsOpenOldSt(true);
          break;
        case "getCalculation":
          datestat.result = data.results;
          datestat.xttData = formSett;
          dispatch(statsaveCreate(datestat));
          setCalculate(!calculate);
          break;
        case "busy":
          console.log("BUSY:", data); // =================================
          setBsLogin(data.login);
          if (data.login) {
            SetModeStat();
            setOpenErrLog(true);
          }
          break;
        case "close":
          window.close();
          break;
        default:
          console.log("data_default:", allData.type, data);
      }
    };
  }, [
    trigger,
    calculate,
    datestat,
    dispatch,
    regionGlob,
    isOpenInf,
    isOpenDev,
    isOpenSt,
    isOpenOldSt,
  ]);

  if (debug && flagOpenDebug) {
    console.log("РЕЖИМ ОТЛАДКИ!!! ");
    let road =
      window.location.origin.slice(0, 22) === "https://localhost:3000"
        ? "https://localhost:3000/"
        : "./";
    axios.get(road + "otladkaPoints.json").then(({ data }) => {
      setPointsTfl(data.data.tflight);
      pointsTFL = data.data.tflight ?? [];
      setIsOpenDev(true);
    });
    axios.get(road + "otladkaXctrl.json").then(({ data }) => {
      setPointsXctrl(data.data.xctrlInfo ?? []);
      if (regionGlob === 0) setPointsReg(data.data.regionInfo ?? []);
      if (data.data.xctrlInfo !== null) {
        maskPoint.pointForRedax = data.data.xctrlInfo[0];
        dispatch(maskpointCreate(maskpoint));
      }
      setIsOpenInf(true);
    });
    axios.get(road + "otladkaStatNow.json").then(({ data }) => {
      setPointsSt(data.data.statistics);
      dispatch(statsaveCreate(datestat));
      SetStatisticsIntervalNow(data.data.statistics);
      setIsOpenSt(true);
    });
    axios.get(road + "otladkaStatOld.json").then(({ data }) => {
      formSettOld = formSett;
      setPointsOldSt(data.data.statistics);
      SetStatisticsIntervalOld(data.data.statistics);
      setIsOpenOldSt(true);
    });
    axios.get(road + "otladkaXctrll.json").then(({ data }) => {
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
        } else inpDate = false;
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
              } else SetStatisticsIntervalOld(pointsOldSt);
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
    } else if (formSett !== formSettToday)
      dat = MakeInterval(massIntervalOldStart[tekIdOld]);

    let massKey = [];
    let massDat: any = [];
    const currencies: any = [];
    for (let key in dat) {
      massKey.push(key);
      massDat.push(dat[key]);
    }
    for (let i = 0; i < massKey.length; i++)
      currencies.push({ value: massKey[i], label: massDat[i] });
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
        } else massIntervalNow[tekIdNow] = interval;
      }
      setTrigger(!trigger);
    };

    return (
      <>
        {props.mode !== 0 && ( // работает только в статистике
          <>
            {PunktMenuSaveFile(SetValue, tekValue)}
            <Grid item container sx={{ width: "120px" }}>
              <Grid item xs={7} sx={styleInt02}>
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
      } else masRab.push(pointsXctrl[i]);
    }
    setPointsXctrl(masRab);
  };

  const SetSaveXT = (mode: boolean) => {
    if (saveXt !== mode) setSaveXT((saveXt = mode));
  };

  const ContentContext = () => {
    return (
      <Box sx={styleBoxTabContext}>
        {!bsLogin && (
          <ButtonMenu
            mode={"1"}
            soob={"Управление"}
            SetValue={SetValue}
            tekValue={tekValue}
          />
        )}
        {!bsLogin && (
          <ButtonMenu
            mode={"2"}
            soob={"Характерные точки"}
            SetValue={SetValue}
            tekValue={tekValue}
          />
        )}
        <ButtonMenu
          mode={"3"}
          soob={"Статистика"}
          SetValue={SetValue}
          tekValue={tekValue}
        />
        {!bsLogin && value === "2" && saveXT && (
          <ButtonMenu
            mode={"7"}
            soob={"⇩"}
            SetValue={SetValue}
            tekValue={tekValue}
          />
        )}
        {value === "2" && <InputNewDateInterval mode={0} />}
        {value === "3" && isOpenSt && <InputNewDateInterval mode={1} />}
        {value === "4" && isOpenOldSt && !nullOldStatistics && (
          <InputNewDateInterval mode={1} />
        )}
      </Box>
    );
  };

  UpdateXctrl(); // разноска обновлений Xctrl

  return (
    <>
      {openErrLog && (
        <EndSeans bsLogin={bsLogin} setOpen={setOpenErrLog} reg={regionGlob} />
      )}
      {regionGlob === 0 && isOpenInf && (
        <BeginSeans pointsReg={pointsReg} SetRegion={setRegionGlob} />
      )}
      {!openErrLog && (
        <>
          {write && <AppWriteToAllFileForXT setOpen={setWrite} />}
          <Box sx={{ width: "98.8%" }}>
            <TabContext value={value}>
              {ContentContext()}
              <TabPanel value="1">
                {WS !== null && regionGlob !== 0 && (
                  <Management
                    open={isOpenDev}
                    points={pointsTfl}
                    xctrll={pointsEtalonXctrl}
                    region={String(regionGlob)}
                    update={updateDevice}
                  />
                )}
              </TabPanel>
              <TabPanel value="2">
                {WS !== null && regionGlob !== 0 && (
                  <Points
                    open={isOpenInf}
                    xctrll={pointsEtalonXctrl}
                    region={String(regionGlob)}
                    setPoint={SetPointsXctrl}
                    saveXt={SetSaveXT}
                    date={formSett}
                    calc={calculate}
                    update={update}
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
