import * as React from "react";

import { Stater } from "./App";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { CalendarPickerSkeleton } from "@mui/x-date-pickers/CalendarPickerSkeleton";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import Badge from "@mui/material/Badge";
import { BiSolidDownload } from "react-icons/bi";

import ButtonMenu from "./AppButtonMenu";

import { styleDatePicker, styleModalMenu } from "./AppStyle";
import { styleInpOk, styleButOk } from "./AppStyle";
import { styleModalEnd } from "./components/Points/grid/PointsGridStyle";

import { XctrlInfo } from "./interfaceGl.d";

export const handleKey = (event: any) => {
  if (event.key === "Enter") event.preventDefault();
};

export const MakeDate = (tekData: Date) => {
  let ddd = new Date(tekData.toString());
  let SMes = ddd.getMonth() + 1;
  let sDate = ddd.getFullYear() + "-";
  let sDay = ddd.getDate();
  if (SMes < 10) sDate = sDate + "0";
  sDate += SMes + "-";
  if (sDay < 10) sDate += "0";
  sDate += sDay;
  return sDate;
};

export const MakeDateRus = (dat: string) => {
  let rusDat = dat.slice(8) + "-" + dat.slice(5, 7);
  rusDat += "-" + dat.slice(0, 4);
  return rusDat;
};

export const MakeInterval = (mode: number) => {
  let dat: any = [];
  switch (mode) {
    case 1:
      dat = ["1", "5", "10", "15", "30", "60"];
      break;
    case 5:
      dat = ["5", "10", "15", "30", "60"];
      break;
    case 10:
      dat = ["10", "20", "30", "60"];
      break;
    case 15:
      dat = ["15", "30", "60"];
      break;
    case 20:
      dat = ["20", "60"];
      break;
    default:
      //console.log("В БД некорректный интервал");
      dat = ["1", "5", "10", "15", "30", "60"];
  }
  return dat;
};

export const OldButtonMenu = (
  mode: string,
  soob: string,
  SetValue: Function,
  tekValue: string,
  hint: boolean,
  setHint: Function
) => {
  let dlSoob = soob !== "⇩" ? (soob.length + 10) * 6.5 : 33;
  const styleApp02 = {
    fontSize: 14.5,
    marginRight: "3px",
    minWidth: dlSoob,
    maxWidth: dlSoob,
    height: "22px",
    bgcolor: "#BAE186", // тёмно-салатовый
    border: "1px solid #000",
    borderColor: "#93D145", // ярко-салатовый
    borderRadius: 1,
    color: "black",
    textTransform: "unset !important",
    boxShadow: 8,
    textAlign: "center",
  };

  const styleApp021 = {
    fontSize: 14,
    marginRight: "3px",
    minWidth: dlSoob,
    maxWidth: dlSoob,
    minHeight: "21px",
    maxHeight: "21px",
    bgcolor: "#E6F5D6", // светло-салатовый
    border: "1px solid #000",
    borderColor: "#d4d4d4", // серый
    borderRadius: 1,
    color: "black",
    textTransform: "unset !important",
    boxShadow: 1,
    textAlign: "center",
  };

  // const [hint, setHint] = React.useState(false);

  const TurnOnHint = () => {
    soob === "⇩" && setHint(true);
  };

  const TurnOffHint = () => {
    soob === "⇩" && setHint(false);
  };

  let illum = mode === tekValue ? styleApp02 : styleApp021;

  return (
    <>
      <Button
        sx={illum}
        onClick={() => SetValue(mode)}
        onMouseEnter={() => TurnOnHint()}
        onMouseLeave={() => TurnOffHint()}
      >
        {soob === "⇩" ? <BiSolidDownload /> : <b>{soob}</b>}
      </Button>
      {hint && (
        <Box
          sx={{
            position: "absolute",
            left: "38.2%",
            top: "0.4%",
            fontSize: 11,
            color: "#969696",
          }}
        >
          Сохранить
        </Box>
      )}
    </>
  );
};

export const InputerOk = (inpDate: boolean, InputOk: Function) => {
  return (
    <Grid item xs={2.3} sx={styleInpOk}>
      {inpDate && (
        <Button sx={styleButOk} onClick={() => InputOk()}>
          Да
        </Button>
      )}
    </Grid>
  );
};

export const MenuSpisRegion = (
  region: any,
  nameRegion: string,
  handleCloseModal: Function
) => {
  return (
    <Button
      key={Math.random()}
      sx={styleModalMenu}
      onClick={() => handleCloseModal(region)}
    >
      <b>{nameRegion}</b>
    </Button>
  );
};

export const PunktMenuSaveFile = (SetValue: Function, tekValue: string) => {
  return (
    <Grid
      item
      container
      sx={{ marginTop: -0.25, marginRight: 0.3, width: "140px" }}
    >
      <Grid item xs sx={{ textAlign: "left" }}>
        {/* {ButtonMenu("5", "⇩", SetValue, tekValue, hint, setHint)} */}
        <ButtonMenu
          mode={"5"}
          soob={"⇩"}
          SetValue={SetValue}
          tekValue={tekValue}
        />
      </Grid>
    </Grid>
  );
};

export const WriteToCsvFileForStat = (datestat: Stater) => {
  const element = document.createElement("a");
  let textFile = "";
  for (let i = 0; i < datestat.stat.length; i++) {
    textFile += datestat.stat[i].Hour + ";";
    textFile += datestat.stat[i].Min + ";";
    for (let j = 0; j < datestat.stat[i].Datas.length; j++) {
      textFile += datestat.stat[i].Datas[j].in;
      if (j + 1 !== datestat.stat[i].Datas.length) textFile += ";";
    }
    textFile += "\n";
  }
  const file = new Blob([textFile], { type: "text/plain" });
  element.href = URL.createObjectURL(file);
  let nameFile = datestat.area + "." + datestat.id + " ";
  nameFile += datestat.data + " " + datestat.time + ".csv";
  element.download = nameFile;
  document.body.appendChild(element); // Required for this to work in FireFox
  element.click();
  // const dataURI = "data:text/plain;base64," + encodeBase64("Hello World!");
  // saveAs(dataURI, "test.txt");
};

export const InputerDate = (
  valueDate: any,
  handleChangeDP: any,
  massGoodDate: any
) => {
  const color = "#6F139B"; // сиреневый

  return (
    <Box sx={styleDatePicker}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"ru"}>
        <DatePicker
          views={["day"]}
          value={valueDate}
          inputFormat="DD-MM-YYYY"
          InputProps={{ style: { fontSize: 14 } }}
          onChange={handleChangeDP}
          renderInput={(params: any) => (
            <TextField sx={{ svg: { color }, input: { color } }} {...params} />
          )}
          renderLoading={() => <CalendarPickerSkeleton />}
          renderDay={(day, _value, DayComponentProps) => {
            const isSelected =
              !DayComponentProps.outsideCurrentMonth &&
              massGoodDate.indexOf(MakeDate(day)) >= 0;
            return (
              <Badge
                key={day.toString()}
                overlap="circular"
                //color="secondary" // сиреневый фон
                color="success" // зелёный фон
                badgeContent={isSelected ? "👍" : undefined}
              >
                <PickersDay {...DayComponentProps} />
              </Badge>
            );
          }}
        />
      </LocalizationProvider>
    </Box>
  );
};

export const SendSocketgetStatisticsList = (
  debug: boolean,
  ws: WebSocket,
  region: string
) => {
  console.log("getStatisticsList:", region);
  const handleSendOpen = () => {
    if (!debug) {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(
          JSON.stringify({
            type: "getStatisticsList",
            region,
          })
        );
      } else {
        setTimeout(() => {
          handleSendOpen();
        }, 1000);
      }
    }
  };
  handleSendOpen();
};

export const DispatchXctrl = (data: any, pointsEtalon: XctrlInfo[]) => {
  let pointsEtalonXctrl = pointsEtalon;
  for (let i = 0; i < pointsEtalonXctrl.length; i++) {
    if (
      data.msg.subarea === pointsEtalonXctrl[i].subarea &&
      Number(data.msg.region) === pointsEtalonXctrl[i].region &&
      Number(data.msg.area) === pointsEtalonXctrl[i].area
    ) {
      switch (data.msg.param) {
        case 0:
          pointsEtalonXctrl[i].release = false;
          break;
        case 1:
          pointsEtalonXctrl[i].release = true;
          break;
        case 2:
          pointsEtalonXctrl[i].switch = false;
          break;
        case 3:
          pointsEtalonXctrl[i].switch = true;
      }
    }
  }
  return pointsEtalonXctrl;
};
//=== PointsLevel2Baza =============================
export const TimeStr = (tim: number) => {
  let timLiner = "";
  let hour = Math.trunc(tim / 60);
  let min = tim % 60;
  if (hour < 10) timLiner = "0";
  timLiner += hour.toString();
  timLiner += ":";
  if (min < 10) timLiner += "0";
  timLiner += min.toString();
  return timLiner;
};

export const BadInput = (
  badInput: boolean,
  handleCloseEnd: Function,
  soobError: string
) => {
  const styleSetPoint = {
    outline: "none",
    position: "absolute",
    left: "50%",
    top: "63%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "1px solid #fff",
    //borderColor: "red",
    borderRadius: 1,
    boxShadow: 24,
    textAlign: "center",
    p: 1,
  };

  const handleClose = () => {
    handleCloseEnd(false);
  };

  const CloseEnd = (event: any, reason: string) => {
    if (reason === "escapeKeyDown") handleClose();
  };

  return (
    <Modal open={badInput} onClose={CloseEnd} hideBackdrop={true}>
      <Box sx={styleSetPoint}>
        <Button sx={styleModalEnd} onClick={() => handleClose()}>
          <b>&#10006;</b>
        </Button>
        <Typography variant="h6" sx={{ color: "red" }}>
          ⚠️Предупреждение
        </Typography>
        <Box sx={{ marginTop: 0.5 }}>
          <Box sx={{ marginBottom: 1.2 }}>{soobError}</Box>
        </Box>
      </Box>
    </Modal>
  );
};

export const BoxTextField = (argum: any, hChange: any, hBlur: any) => {
  return (
    <TextField
      size="small"
      onKeyPress={handleKey} //отключение Enter
      InputProps={{ disableUnderline: true }}
      inputProps={{
        style: { cursor: "pointer", paddingLeft: 2, fontSize: 14 },
      }}
      value={argum}
      onChange={hChange}
      onBlur={hBlur}
      variant="standard"
    />
  );
};

export const Inputer = (
  name: string,
  argum: any,
  hChange: any,
  hBlur: any,
  styleX: any
) => {
  return (
    <Grid container sx={{ fontSize: 15 }}>
      <Grid item xs={5} sx={{ marginTop: 0.5 }}>
        {name}
      </Grid>
      <Grid item xs>
        <Box sx={styleX}>{BoxTextField(argum, hChange, hBlur)}</Box>
      </Grid>
    </Grid>
  );
};

export const WorkMenuEdit = (xss: number, soob: string, servisFunc: any) => {
  const styleBut03 = {
    fontSize: 13.5,
    marginTop: -2,
    maxHeight: "21px",
    minHeight: "21px",
    maxWidth: "193px",
    minWidth: "193px",
    bgcolor: "#E6F5D6", // светло-салатовый
    border: "1px solid #000",
    borderColor: "#d4d4d4", // серый
    borderRadius: 1,
    boxShadow: 6,
    color: "black",
    textTransform: "unset !important",
  };

  const styleXTG05 = {
    marginTop: -3.0,
    height: "3vh",
    textAlign: "right",
  };

  return (
    <Grid container item>
      <Grid item xs={xss}></Grid>
      <Grid item xs={3} sx={styleXTG05}>
        <Button sx={styleBut03} onClick={() => servisFunc()}>
          <b>{soob}</b>
        </Button>
      </Grid>
    </Grid>
  );
};

export const ButtRec = (rec: any, func: any) => {
  const styleBut01 = {
    fontSize: 10,
    marginTop: -0.3,
    maxHeight: "15px",
    minHeight: "15px",
    maxWidth: "205px",
    minWidth: "205px",
    bgcolor: "#E6F5D6", // светло-салатовый
    border: "1px solid #000",
    borderColor: "#d4d4d4", // серый
    borderRadius: 1,
    boxShadow: 4,
    color: "black",
    textTransform: "unset !important",
  };

  return (
    <Button sx={styleBut01} onClick={() => func()}>
      <b>{rec}</b>
    </Button>
  );
};

export const ConclHeader = (xss: number, elem: string, styleXX: any) => {
  return (
    <Grid item xs={xss} sx={styleXX}>
      <b>{elem}</b>
    </Grid>
  );
};

export const ConclStr = (xss: number, elem: any, styleXX: any) => {
  return (
    <Grid item xs={xss} sx={styleXX}>
      {elem}
    </Grid>
  );
};

export const InputTimeAndMode = (soob: string, func: any) => {
  return (
    <Grid container sx={{ marginTop: 0.5, fontSize: 15 }}>
      <Grid item xs={5}>
        {soob}
      </Grid>
      <Grid item xs>
        {func()}
      </Grid>
    </Grid>
  );
};

export const SaveFunc = (func: any) => {
  const styleInpKnop = {
    color: "black",
    marginTop: 1,
    maxHeight: "21px",
    minHeight: "21px",
    padding: "2px 8px 0px 8px",
    bgcolor: "#E6F5D6", // светло-салатовый
    border: "1px solid#d4d4d4", // серый
    borderRadius: 1,
    boxShadow: 6,
    textAlign: "center",
    textTransform: "unset !important",
  };

  return (
    <Box sx={{ marginTop: 1, textAlign: "center" }}>
      <Button sx={styleInpKnop} onClick={func}>
        <b>Сохранить</b>
      </Button>
    </Box>
  );
};

export const SendHandleSend = (ws: any, mask: any) => {
  const handleSendOpen = () => {
    if (ws !== null) {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(
          JSON.stringify({
            type: "changeXctrl",
            data: mask,
          })
        );
      } else {
        setTimeout(() => {
          handleSendOpen();
        }, 1000);
      }
    }
  };
  handleSendOpen();
};

export const Grider = (soob: any, sdvig: number, fat: boolean) => {
  return (
    <>
      {fat && (
        <Grid
          item
          xs={12}
          sx={{ textShadow: "1px 1px 2px rgba(0,0,0,0.3)", marginTop: sdvig }}
        >
          <b>{soob}</b>
        </Grid>
      )}
      {!fat && (
        <Grid item xs={12} sx={{ marginTop: sdvig }}>
          {soob}
        </Grid>
      )}
    </>
  );
};
//=== PointsMainScr ================================
export const WorkMenuEditMain = (
  xss: number,
  soob: string,
  servisFunc: any
) => {
  const styleBut03 = {
    fontSize: 13.5,
    marginTop: 4,
    maxHeight: "21px",
    minHeight: "21px",
    maxWidth: "193px",
    minWidth: "193px",
    color: "black",
    bgcolor: "#E6F5D6", // светло-салатовый
    border: "1px solid #000",
    borderColor: "#d4d4d4", // серый
    borderRadius: 1,
    boxShadow: 6,
    textTransform: "unset !important",
  };

  const styleXTG05 = {
    marginTop: -3.3,
    height: "3vh",
    textAlign: "right",
    paddingRight: 1,
  };

  return (
    <Grid container>
      <Grid item xs={xss}></Grid>
      <Grid item xs={3} sx={styleXTG05}>
        <Button sx={styleBut03} onClick={() => servisFunc()}>
          <b>{soob}</b>
        </Button>
      </Grid>
    </Grid>
  );
};
//=== Points =======================================
export const SendSocketOldDateXt = (
  ws: any,
  date: any,
  pointsEtalon: any,
  tekValue: number
) => {
  console.log(
    "SendSocketOldDateXt",
    date,
    pointsEtalon[tekValue].region,
    pointsEtalon[tekValue].area,
    pointsEtalon[tekValue].subarea
  );
  const handleSendOpen = () => {
    if (ws !== null) {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(
          JSON.stringify({
            type: "getCalculation",
            date: new Date(date).toISOString(),
            region: pointsEtalon[tekValue].region,
            area: pointsEtalon[tekValue].area,
            subarea: pointsEtalon[tekValue].subarea,
          })
        );
      } else {
        setTimeout(() => {
          handleSendOpen();
        }, 1000);
      }
    }
  };
  handleSendOpen();
};
//=== PointsLevel2BazaDiogram ======================
export const OutputPict = (
  idx: number,
  pv: number,
  ph: number,
  PictInfo: Function,
  setPictInfo: Function,
  flagEnd: boolean
) => {
  const styleBox = {
    position: "absolute",
    //left: ph - 0.7 + '%', // 27.2
    //top: pv - 0.4 + '%', //7.7
    left: ph - 0.8 + "%",
    top: pv - 1.2 + "%",
    maxWidth: 5,
    minWidth: 5,
    maxHeight: 5,
    minHeight: 5,
    color: "black",
    borderRadius: 1,
  };

  let soob = flagEnd ? "🔴" : "●";

  return (
    <Button
      sx={styleBox}
      onMouseEnter={() => PictInfo(idx, pv, ph)}
      //onClick={() => PictInfo(idx, pv, ph)}
      onMouseLeave={() => setPictInfo(false)}
    >
      {soob}
    </Button>
  );
};

export const PictInfoBox = (
  pvGl: number,
  phGl: number,
  pointer: any,
  point: any,
  mode: number,
  POINT: any
) => {
  console.log("POINTER:", pointer);
  let snos = mode ? 1000 : 850;
  let sdvigH = (window.innerWidth - snos) * 0.012;
  let sdvigV = pvGl < 50 ? 0 : 15;
  let numArea = 0;
  let pk = 0;
  if (mode) {
    let num = 1; // Диограмма лучей
    let pStB = point.StrategyB;
    for (let i = 0; i < pStB.length; i++) {
      if (pointer.Value[0] > pStB[i].xright || pointer.Value[1] > pStB[i].xleft)
        num = i + 2;
    }
    let luchO = pStB[num - 1].vleft;
    let luchP = pStB[num - 1].vright;
    let ratio = pStB[num - 1].xright / pStB[num - 1].xleft;
    numArea = pStB[num - 1].pks;
    if (luchP !== 1 || luchO !== 1) {
      if (pointer.Value[1] < pointer.Value[0] * luchO * ratio)
        numArea = pStB[num - 1].pkl;
      if (pointer.Value[1] > pointer.Value[0] * luchP * ratio)
        numArea = pStB[num - 1].pkr;
    }
    for (let i = 0; i < POINT.ext.length; i++) {
      if (POINT.ext[i][0] === pointer.Value[2]) pk = POINT.ext[i][1];
    }
  } else {
    let pStA = point.StrategyA; // Диограмма областей
    numArea = -1;
    let area = [1, 2, 3, 4, 5, 6, 7, 8, 9.1, 11, 12];
    let mass = [];
    for (let i = 0; i < pStA.length; i++) {
      let coorPointY = pStA[i].xleft;
      let coorPointX = pStA[i].xright;
      let kvx = (pointer.Value[0] - coorPointX) ** 2;
      let kvy = (pointer.Value[1] - coorPointY) ** 2;
      mass.push(kvx + kvy);
    }
    numArea = area[mass.indexOf(Math.min.apply(null, mass))];
  }

  let NumArea = mode ? pointer.Value[2] + " (" + pk + ")" : numArea;
  let KS = mode ? "КС (ПК)" : "КС";

  const styleBoxGl = {
    position: "absolute",
    left: phGl - 24 + sdvigH + "%",
    top: pvGl - sdvigV + "%",
    width: 145,
    height: 96,
    bgcolor: "background.paper",
    border: "1px solid #fff",
    borderRadius: 1,
    boxShadow: 24,
    p: 1,
  };

  return (
    <Box sx={styleBoxGl}>
      <Grid container sx={{ fontSize: 12.9, marginTop: 0.25 }}>
        <Grid item xs={8}>
          <Grid container>
            {Grider("Время", 0, true)}
            {Grider("Прямой", 1, true)}
            {Grider("Обратный", 1, true)}
            {Grider(KS, 1, true)}
          </Grid>
        </Grid>
        <Grid item xs>
          <Grid container>
            {Grider(TimeStr(pointer.Time), 0, false)}
            {Grider(pointer.Value[0], 1, false)}
            {Grider(pointer.Value[1], 1, false)}
            {Grider(NumArea, 1, false)}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
//=== StatisticXTNew ===============================

export const KnobBatCl = (setValue: Function) => {
  const styleBattonCl = {
    fontSize: 10.1,
    backgroundColor: "#E9F5D8", // светло-салатовый
    color: "red",
    height: "18px",
    maxWidth: "5vh",
    minWidth: "5vh",
    textTransform: "unset !important",
    border: "1px solid #d4d4d4", // серый
    borderRadius: 1,
    boxShadow: 6,
  };

  return (
    <Button sx={styleBattonCl} onClick={() => setValue("17")}>
      <b>Чистка</b>
    </Button>
  );
};
//==================================================
