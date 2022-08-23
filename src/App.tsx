import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ru } from "date-fns/locale";

//import Header from './components/Header/Header';
import Management from "./components/Management/Management";
import Points from "./components/Points/Points";
import StatisticsNew from "./components/Statistics/StatisticsNew";
import StatisticsArchive from "./components/Statistics/StatisticsArchive";

import { Tflight } from "./interfaceMNG.d";
import { XctrlInfo } from "./interfaceGl.d";
import { RegionInfo } from "./interfaceGl.d";
import { Statistic } from "./interfaceStat.d";

import { styleApp02, styleMod, styleBoxFormInt } from "./AppStyle";
import { styleBatMenu, styleModalMenu, styleInt01 } from "./AppStyle";
import { styleImpServis, styleInp, styleDatePicker } from "./AppStyle";

let flagWS = true;
let WS: any = null;
let regionGlob: number = 0;
let massRegion: Array<number> = [];
let massNameRegion: Array<string> = [];

let pointsEtalonXctrl: XctrlInfo[];
let flagEtalonInf = true;

const MakeDate = (tekData: Date) => {
  let SMes = tekData.getMonth() + 1;
  let sDate = tekData.getFullYear() + "-";
  if (SMes < 10) sDate = sDate + "0";
  sDate = sDate + SMes + "-" + tekData.getDate();
  return sDate;
};

let formSett = MakeDate(new Date());
let formSettToday = MakeDate(new Date());
let formSettOld = MakeDate(new Date());
let interval = 0;
let tekIdNow = 0;

const App = () => {
  const [pointsXctrl, setPointsXctrl] = React.useState<Array<XctrlInfo>>([]);
  const [pointsReg, setPointsReg] = React.useState<RegionInfo>(
    {} as RegionInfo
  );
  const [isOpenInf, setIsOpenInf] = React.useState(false);
  const [pointsTfl, setPointsTfl] = React.useState<Array<Tflight>>([]);
  const [isOpenDev, setIsOpenDev] = React.useState(false);
  const [pointsSt, setPointsSt] = React.useState<Array<Statistic>>([]);
  const [pointsOldSt, setPointsOldSt] = React.useState<Array<Statistic>>([]);
  const [isOpenSt, setIsOpenSt] = React.useState(false);
  const [isOpenOldSt, setIsOpenOldSt] = React.useState(false);
  const [bsLogin, setBsLogin] = React.useState("");
  const [valueDate, setValueDate] = React.useState<Date | null>(
    new Date(formSett)
  );
  const [value, setValue] = React.useState("1");
  const [trigger, setTrigger] = React.useState(true);

  const handleClose = () => {
    window.close();
  };

  const EndSeans = () => {
    let soob = "В Арм-е Технолога системы работает пользователь " + bsLogin;
    return (
      <>
        {bsLogin !== "" && (
          <>
            <Box sx={styleMod}>
              <Box sx={{ textAlign: "center", fontSize: 16, color: "red" }}>
                <b>{soob}</b>
              </Box>
              <Box sx={{ color: "background.paper" }}>Pusto</Box>
              <Box sx={{ textAlign: "center" }}>
                <Button
                  sx={styleBatMenu}
                  variant="contained"
                  onClick={handleClose}
                >
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
            onClick={() => handleCloseModal(massRegion[i])}
          >
            <b>{massNameRegion[i]}</b>
          </Button>
        );
      }
      return resStr;
    };

    if (isOpenInf && regionGlob === 0) {
      for (let key in pointsReg) {
        if (!isNaN(Number(key))) {
          // ключ - символьное число
          massRegion.push(Number(key));
          massNameRegion.push(pointsReg[key]);
          if (pointsReg[key].length > dlStrMenu)
            dlStrMenu = pointsReg[key].length;
        }
      }
      regionGlob = massRegion[0];
    }

    const styleModal = {
      position: "relative",
      bottom: "-48vh",
      marginLeft: "60vh",
      transform: "translate(-50%, -50%)",
      width: (dlStrMenu + 8) * 10,
      bgcolor: "background.paper",
      border: "2px solid #000",
      borderColor: "primary.main",
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
            <Box sx={{ textAlign: "center" }}>Выбор региона:</Box>
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
          console.log("Points новая запись i=", i);
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

  const SetStatisticsInterval = (statPoints: any) => {
    console.log("SSSSStatPoints:", statPoints);
    if (!interval) interval = statPoints[0].Statistics[0].TLen;
  };

  const host =
    "wss://" +
    window.location.host +
    window.location.pathname +
    "W" +
    window.location.search;

  if (flagWS) {
    WS = new WebSocket(host);
    flagWS = false;
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
      //console.log('пришло:', data);
      switch (allData.type) {
        case "getDevices":
          console.log("data_getDevices:", data);
          setPointsTfl(data.tflight ?? []);
          setIsOpenDev(true);
          break;
        case "xctrlInfo":
          console.log("data_xctrlInfo:", data);
          setPointsXctrl(data.xctrlInfo ?? []);
          if (regionGlob === 0) setPointsReg(data.regionInfo ?? []);
          setIsOpenInf(true);
          break;
        case "getStatistics":
          console.log("data_NewStatistics:", data);
          SetStatisticsInterval(data.statistics);
          setPointsSt(data.statistics ?? []);
          setIsOpenSt(true);
          break;
        case "getOldStatistics":
          formSettOld = formSett;
          console.log("DATA_OLDSTATistics:", formSettOld, data);
          setPointsOldSt(data.statistics ?? []);
          setIsOpenOldSt(true);
          break;
        case "busy":
          setBsLogin(data.login);
          break;
        default:
          console.log("data_default:", data);
      }
    };
  }, []);

  UpdateXctrl(); // разноска обновлений Xctrl

  const SetId = (newId: number, intervalId: number) => {
    tekIdNow = newId;
    interval = intervalId;
    console.log("!!!!!!tekIdNow:", tekIdNow, interval);
  };

  const InputNewDate = () => {
    const InputDate = () => {
      const handleChangeDP = (event: any) => {
        formSett = MakeDate(event);
        //console.log("ВВЕДЕНО:", formSett, formSettOld, formSettToday);
        if (formSett === formSettToday) {
          setValue("3");
          //console.log("ПЕРЕХОД В СТАТИСТИКУ");
        } else {
          //console.log("ПЕРЕХОД В АРХИВ");
          if (formSett !== formSettOld) {
            //console.log("ПЕРЕХОД В НОВЫЙ АРХИВ");
            setIsOpenOldSt(false);
            setPointsOldSt([]);
          }
          setValue("4");
        }
        setValueDate(event);
      };

      return (
        <Box sx={styleDatePicker}>
          <LocalizationProvider locale={ru} dateAdapter={AdapterDateFns}>
            <DatePicker
              views={["day"]}
              value={valueDate}
              inputFormat="dd-MM-yyyy"
              InputProps={{ style: { fontSize: 14 } }}
              onChange={handleChangeDP}
              renderInput={(params) => (
                <TextField {...params} helperText={null} />
              )}
            />
          </LocalizationProvider>
        </Box>
      );
    };

    let dat = ["5", "10", "15", "30", "60"];
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
    // const [currency, setCurrency] = React.useState(massKey[0]);
    const [currency, setCurrency] = React.useState(interval.toString());

    const InputInterval = () => {
      const handleChangeInt = (event: any) => {
        setCurrency(event.target.value);
        interval = Number(massDat[Number(event.target.value)]);
        console.log("setCurrency:", interval, event.target.value, currency);
        setTrigger(!trigger);
      };

      const handleKey = (event: any) => {
        if (event.key === "Enter") event.preventDefault();
      };

      return (
        <Box component="form" sx={styleBoxFormInt}>
          <TextField
            select
            size="small"
            onKeyPress={handleKey} //отключение Enter
            value={currency}
            onChange={handleChangeInt}
            InputProps={{ style: { fontSize: 14 } }}
            variant="standard"
            color="secondary"
          >
            {currencies.map((option: any) => (
              <MenuItem
                key={option.value}
                value={option.value}
                sx={{ fontSize: 14 }}
              >
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      );
    };

    return (
      <>
        <Grid item container sx={{ border: 0, width: "150px" }}>
          <Grid item xs={7} sx={{ border: 0, textAlign: "right" }}>
            Интервал:
          </Grid>
          <Grid item xs={5}>
            <Box sx={styleInt01}>
              <InputInterval />
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
      <Button
        sx={styleApp02}
        variant="contained"
        onClick={() => setValue(mode)}
      >
        <b>{soob}</b>
      </Button>
    );
  };

  return (
    <>
      <EndSeans />
      {regionGlob === 0 && isOpenInf && <BeginSeans />}
      <Box sx={{ width: "98.8%", typography: "body2" }}>
        <TabContext value={value}>
          <Box sx={{ marginLeft: 0.5, backgroundColor: "#F1F5FB" }}>
            <Stack direction="row">
              {bsLogin === "" && <>{ButtonMenu("1", "Управление")}</>}
              {bsLogin === "" && <>{ButtonMenu("2", "Характерные точки")}</>}
              {bsLogin === "" && <>{ButtonMenu("3", "Статистика")}</>}
              {bsLogin === "" && Number(value) > 2 && <InputNewDate />}
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
                  func={SetId}
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
              />
            )}
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default App;

//const [points, setPointsonKeyDown] = React.useState<XctrlInfo>({} as XctrlInfo);
// const [points, setPoints] = React.useState<Array<XctrlInfo>>([]);
// const [isOpen, setIsOpen] = React.useState(false);
{
  /* <Grid item container>
  <Grid item xs={4}>
    <Button variant="contained" sx={styleInt02} onClick={() => setInterval(5)}>
      5мин
    </Button>
  </Grid>
  <Grid item xs={4}>
    <Button variant="contained" sx={styleInt02}>
      10мин
    </Button>
  </Grid>
  <Grid item xs={4}>
    <Button variant="contained" sx={styleInt02}>
      15мин
    </Button>
  </Grid>
</Grid>; */
}
// const styleInt02 = {
//   fontSize: 12,
//   border: 1,
//   maxHeight: "21px",
//   minHeight: "21px",
//   maxWidth: "70px",
//   minWidth: "70px",
//   backgroundColor: "#F1F3F4",
//   color: "black",
//   textTransform: "unset !important",
// };
