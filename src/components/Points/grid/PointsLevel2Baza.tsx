import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { maskpointCreate } from "./../../../redux/actions";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import PointsLevel2BazaDiogram from "./PointsLevel2BazaDiogram";

import { TimeStr, BoxTextField, Inputer } from "../../../AppServiceFunctions";
import { WorkMenuEdit, ButtRec, ConclStr } from "../../../AppServiceFunctions";
import { SendHandleSend, ConclHeader } from "../../../AppServiceFunctions";
import { InputTimeAndMode, SaveFunc } from "../../../AppServiceFunctions";
import { Grider, BadInput, handleKey } from "../../../AppServiceFunctions";

import { styleXTG00, styleXTG01, styleXTG011 } from "./PointsGridStyle";
import { styleXTG021, styleXTG02, styleXTG03 } from "./PointsGridStyle";
import { styleXTG04, styleBoxForm, styleBut021 } from "./PointsGridStyle";
import { styleBut02, styleModalEnd } from "./PointsGridStyle";
import { styleSetInf, styleSetInff } from "./PointsGridStyle";
import { styleInpName, styleXTGHeader } from "./PointsGridStyle";
import { styleInpArg, styleInpTime } from "./PointsGridStyle";

import { XctrlInfo } from "../../../interfaceGl.d";

let nomStr = 0;
let nomIllum = -1;
let flagSave = false;
let flagEdit = true;
let flagExit = false;

let xtPropsOld = -1;
let crossRoadOld = -1;

let pointsTemp: any = null;
let formTemp = "";
let leftTemp = 0;
let rightTemp = 0;
let pointRab: any = null;
let pointGraf: XctrlInfo[] = [];
let soobError = "";

const PointsLevel2Baza = (props: {
  open: boolean;
  ws: WebSocket;
  xctrll: XctrlInfo[];
  xtt: number;
  crossroad: number;
  setPoint: any;
  update: boolean;
}) => {
  console.log("PointsLevel2Baza: пришло", props.update);
  //== Piece of Redux =======================================
  let maskpoint = useSelector((state: any) => {
    const { maskpointReducer } = state;
    return maskpointReducer.maskpoint;
  });
  //console.log("maskpoint_Baza:", maskpoint);
  const dispatch = useDispatch();
  //===========================================================
  const xtProps = props.xtt;
  let pointsEt = props.xctrll[xtProps];
  const crossRoad = props.crossroad;
  const xctrLl = props.xctrll;

  const [openSetName, setOpenSetName] = React.useState(false);
  const [openSetStr, setOpenSetStr] = React.useState(false);
  const [points, setPoints] = React.useState(pointsEt);
  const [formName, setFormName] = React.useState(
    pointsEt.xctrls[crossRoad].name
  );
  const [maxLeft, setMaxLeft] = React.useState(pointsEt.xctrls[crossRoad].left);
  const [maxRight, setMaxRight] = React.useState(
    pointsEt.xctrls[crossRoad].right
  );
  const [yellow, setYellow] = React.useState(pointsEt.yellow.make);
  const [tmStart, setTmStart] = React.useState(pointsEt.yellow.start);
  const [tmStop, setTmStop] = React.useState(pointsEt.yellow.stop);
  const [trigger, setTrigger] = React.useState(false);

  if (xtPropsOld !== xtProps || crossRoadOld !== crossRoad) {
    pointGraf = props.xctrll;
    xtPropsOld = xtProps;
    crossRoadOld = crossRoad;
    nomStr = 0;
    nomIllum = -1;
    flagSave = false;
    flagEdit = true;
    flagExit = false;
    pointsTemp = pointsEt;
    console.log("pointsEt:", pointsEt);
    setFormName(pointsEt.xctrls[crossRoad].name);
    setMaxLeft(pointsEt.xctrls[crossRoad].left);
    setMaxRight(pointsEt.xctrls[crossRoad].right);
    setTmStart(pointsEt.yellow.start);
    setTmStop(pointsEt.yellow.stop);
    setYellow(pointsEt.yellow.make);
    setPoints(pointsEt);

    if (maskpoint.newXt) {
      maskpoint.pointForRedax = pointsEt;
      maskpoint.newXt = false;
      maskpoint.savePoint = false;
      maskpoint.redaxPoint = true;
      dispatch(maskpointCreate(maskpoint));
    }
  } else {
    if (!maskpoint.redaxPoint && flagEdit) {
      pointsEt = maskpoint.pointForRedax; // Start
      pointsTemp = pointsEt;
      flagExit = true;
      flagEdit = false;
    } else {
      if (maskpoint.redaxPoint && !flagEdit) {
        setPoints(pointsTemp); // Stop
        flagExit = false;
        flagEdit = true;
        flagSave = false;
      } else {
        pointGraf = props.xctrll;
        console.log('ОБНОВЛЕНИЕ Baza pointGraf ============') //============
      }
    }
  }

  const RemakePointGraf = (pointRab: any) => {
    pointGraf = [];
    for (let i = 0; i < xctrLl.length; i++) {
      if (
        xctrLl[i].region === points.region &&
        xctrLl[i].area === points.area &&
        xctrLl[i].subarea === points.subarea
      ) {
        pointGraf.push(pointRab);
      } else {
        pointGraf.push(xctrLl[i]);
      }
    }
  };

  const SetName = () => {
    let yell = yellow ? 1 : 0;
    let elem = maskpoint.pointForRedax.xctrls[crossRoad].StrategyB;
    let minLeft = elem[elem.length - 1].xleft;
    let minRight = elem[elem.length - 1].xright;
    const [valuen1, setValuen1] = React.useState(formName);
    const [valuen2, setValuen2] = React.useState(maxLeft);
    const [valuen3, setValuen3] = React.useState(maxRight);
    const [valuen4, setValuen4] = React.useState(yell);
    const [valuen5, setValuen5] = React.useState(TimeStr(tmStart).slice(0, 2));
    const [valuen6, setValuen6] = React.useState(TimeStr(tmStart).slice(3, 5));
    const [valuen7, setValuen7] = React.useState(TimeStr(tmStop).slice(0, 2));
    const [valuen8, setValuen8] = React.useState(TimeStr(tmStop).slice(3, 5));
    const [badInput, setBadInput] = React.useState(false);

    const EvilInput = (form: number, min: number) => {
      if (form < min) {
        soobError = "Вводимое значение не должно быть меньше " + min;
        setBadInput(true);
        return false;
      }
      return true;
    };

    const hChange1 = (event: any) => {
      let form = event.target.value.trimStart(); // удаление пробелов в начале строки
      setValuen1(form);
    };

    const hChange2 = (event: any) => {
      let form = Number(event.target.value.trimStart()); // удаление пробелов в начале строки
      form && setValuen2(Math.abs(form));
    };

    const hBlur2 = () => {
      !EvilInput(valuen2, minLeft) && setValuen2(maxLeft);
    };

    const hChange3 = (event: any) => {
      let form = Number(event.target.value.trimStart()); // удаление пробелов в начале строки
      form && setValuen3(Math.abs(form));
    };

    const hBlur3 = () => {
      !EvilInput(valuen3, minRight) && setValuen3(maxRight);
    };

    const handleChange5 = (event: any) => {
      let form = event.target.value.trimStart(); // удаление пробелов в начале строки
      if (Number(form) < 24) setValuen5(Math.abs(form).toString());
    };

    const handleChange6 = (event: any) => {
      let form = event.target.value.trimStart(); // удаление пробелов в начале строки
      if (Number(form) < 60) setValuen6(Math.abs(form).toString());
    };

    const handleChange7 = (event: any) => {
      let form = event.target.value.trimStart(); // удаление пробелов в начале строки
      if (Number(form) < 24) setValuen7(Math.abs(form).toString());
    };

    const handleChange8 = (event: any) => {
      let form = event.target.value.trimStart(); // удаление пробелов в начале строки
      if (Number(form) < 60) setValuen8(Math.abs(form).toString());
    };

    const handleClose = () => {
      let rend = false;
      let pointRab = JSON.parse(JSON.stringify(maskpoint.pointForRedax));
      if (
        pointRab.xctrls[props.crossroad].name !== valuen1 ||
        pointRab.xctrls[props.crossroad].left !== valuen2
      )
        rend = true;
      pointRab.xctrls[props.crossroad].name = valuen1;
      pointRab.xctrls[props.crossroad].left = valuen2;
      pointRab.xctrls[props.crossroad].right = valuen3;
      let yell = true;
      if (!valuen4) yell = false;
      pointRab.yellow.make = yell;
      let timeStart = Number(valuen5) * 60 + Number(valuen6);
      pointRab.yellow.start = timeStart;
      let timeStop = Number(valuen7) * 60 + Number(valuen8);
      //if (timeStop < timeStart) timeStop = timeStart; //!!!!!!
      pointRab.yellow.stop = timeStop;
      setPoints(pointRab);
      maskpoint.pointForRedax = pointRab;

      console.log("###:", pointRab);

      pointsEt = pointRab;
      setFormName(valuen1);
      setMaxLeft(valuen2);
      setMaxRight(valuen3);
      setYellow(yell);
      setTmStart(timeStart);
      setTmStop(timeStop);
      setOpenSetName(false);
      rend && RemakePointGraf(pointRab);
      flagSave = true;
      maskpoint.savePoint = true;
      dispatch(maskpointCreate(maskpoint));
    };

    const handleCloseEnd = () => {
      setOpenSetName(false);
    };

    const handleCloseClinch = (event: any, reason: string) => {
      reason === "escapeKeyDown" && handleCloseEnd();
    };

    const InputerMode = () => {
      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrency(Number(event.target.value));
        setValuen4(Number(event.target.value));
      };

      let dat = ["Выкл", "Вкл"];
      let massKey = [];
      let massDat: any[] = [];
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

      const [currency, setCurrency] = React.useState(valuen4);

      return (
        <Box component="form" sx={styleBoxForm}>
          <TextField
            select
            size="small"
            onKeyPress={handleKey} //отключение Enter
            value={currency}
            onChange={handleChange}
            InputProps={{ disableUnderline: true, style: { fontSize: 14 } }}
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

    const hBlur = () => {};

    const FuncStart = () => {
      return (
        <Box sx={styleInpTime}>
          {BoxTextField(valuen5, handleChange5, hBlur)}
          {" : "}
          {BoxTextField(valuen6, handleChange6, hBlur)}
        </Box>
      );
    };

    const FuncStop = () => {
      return (
        <Box sx={styleInpTime}>
          {BoxTextField(valuen7, handleChange7, hBlur)}
          {" : "}
          {BoxTextField(valuen8, handleChange8, hBlur)}
        </Box>
      );
    };

    return (
      <Modal open={openSetName} onClose={handleCloseClinch}>
        <>
          <Box sx={styleSetInff}>
            <Button sx={styleModalEnd} onClick={handleCloseEnd}>
              <b>&#10006;</b>
            </Button>
            {Inputer("Наименование ХТ", valuen1, hChange1, hBlur, styleInpName)}
            {Inputer(
              "Максимум прямого",
              valuen2,
              hChange2,
              hBlur2,
              styleInpArg
            )}
            {Inputer(
              "Максимум обратного",
              valuen3,
              hChange3,
              hBlur3,
              styleInpArg
            )}
            {InputTimeAndMode("Работа по НК и СК", InputerMode)}
            {InputTimeAndMode("Начало", FuncStart)}
            {InputTimeAndMode("Конец", FuncStop)}
            {SaveFunc(handleClose)}
          </Box>
          {badInput && <>{BadInput(badInput, setBadInput, soobError)}</>}
        </>
      </Modal>
    );
  };

  const SetStr = (props: { nom: number }) => {
    let StrB = maskpoint.pointForRedax.xctrls[crossRoad].StrategyB;
    let elem = StrB[props.nom];
    let max1 = props.nom < StrB.length - 1 ? StrB[props.nom + 1].xleft : 0;
    let max2 = props.nom < StrB.length - 1 ? StrB[props.nom + 1].xright : 0;
    let min1 = props.nom ? StrB[props.nom - 1].xleft : 0;
    let min2 = props.nom ? StrB[props.nom - 1].xright : 0;
    const [valuen1, setValuen1] = React.useState(elem.xleft);
    const [valuen2, setValuen2] = React.useState(elem.xright);
    const [valuen3, setValuen3] = React.useState(elem.pkl);
    const [valuen4, setValuen4] = React.useState(elem.pks);
    const [valuen5, setValuen5] = React.useState(elem.pkr);
    const [valuen6, setValuen6] = React.useState(elem.vleft);
    const [valuen7, setValuen7] = React.useState(elem.vright);
    const [valuen8, setValuen8] = React.useState(elem.desc);
    const [badInput, setBadInput] = React.useState(false);

    const handleCloseEnd = () => {
      setOpenSetStr(false);
    };

    const handleClose = (event: any, reason: string) => {
      reason === "escapeKeyDown" && handleCloseEnd();
    };

    const handleCloseStr = () => {
      pointRab = JSON.parse(JSON.stringify(maskpoint.pointForRedax));
      pointRab.xctrls[crossRoad].StrategyB[props.nom].xleft = valuen1;
      pointRab.xctrls[crossRoad].StrategyB[props.nom].xright = valuen2;
      pointRab.xctrls[crossRoad].StrategyB[props.nom].pkl = valuen3;
      pointRab.xctrls[crossRoad].StrategyB[props.nom].pks = valuen4;
      pointRab.xctrls[crossRoad].StrategyB[props.nom].pkr = valuen5;
      pointRab.xctrls[crossRoad].StrategyB[props.nom].vleft = Number(valuen6);
      pointRab.xctrls[crossRoad].StrategyB[props.nom].vright = Number(valuen7);
      pointRab.xctrls[crossRoad].StrategyB[props.nom].desc = valuen8;

      if (
        props.nom ===
        maskpoint.pointForRedax.xctrls[crossRoad].StrategyB.length - 1
      ) {
        if (pointRab.xctrls[crossRoad].left < valuen1) {
          pointRab.xctrls[crossRoad].left = valuen1;
          setMaxLeft(valuen1);
        }
        if (pointRab.xctrls[crossRoad].right < valuen2) {
          pointRab.xctrls[crossRoad].right = valuen2;
          setMaxRight(valuen2);
        }
      }
      setPoints(pointRab);
      maskpoint.pointForRedax = pointRab;
      RemakePointGraf(pointRab);
      flagSave = true;
      maskpoint.savePoint = true;
      dispatch(maskpointCreate(maskpoint));
      setOpenSetStr(false);
    };

    const EvilInput = (form: number, max: number, min: number) => {
      if ((max && form >= max) || form <= min) {
        let soob1 = max ? " больше " + max + " и " : "";
        soobError =
          "Вводимое значение не должно быть " + soob1 + "меньше " + min;
        setBadInput(true);
        return false;
      }
      return true;
    };

    const handleChange1 = (event: any) => {
      let form = Number(event.target.value.trimStart()); // удаление пробелов в начале строки
      form && setValuen1(Math.abs(form));
    };

    const hBlur1 = () => {
      !EvilInput(valuen1, max1, min1) && setValuen1(elem.xleft);
    };

    const handleChange2 = (event: any) => {
      let form = Number(event.target.value.trimStart()); // удаление пробелов в начале строки
      form && setValuen2(Math.abs(form));
    };

    const hBlur2 = () => {
      !EvilInput(valuen2, max2, min2) && setValuen2(elem.xright);
    };

    const handleChange3 = (event: any) => {
      let form = Number(event.target.value.trimStart()); // удаление пробелов в начале строки
      if (form) setValuen3(Math.abs(form));
    };

    const handleChange4 = (event: any) => {
      let form = Number(event.target.value.trimStart()); // удаление пробелов в начале строки
      if (form) setValuen4(Math.abs(form));
    };

    const handleChange5 = (event: any) => {
      let form = Number(event.target.value.trimStart()); // удаление пробелов в начале строки
      if (form) setValuen5(Math.abs(form));
    };

    const handleChange6 = (event: any) => {
      let form = event.target.value.trimStart(); // удаление пробелов в начале строки
      setValuen6(form);
    };

    const handleChange7 = (event: any) => {
      let form = event.target.value.trimStart(); // удаление пробелов в начале строки
      setValuen7(form);
    };

    const handleChange8 = (event: any) => {
      let form = event.target.value.trimStart(); // удаление пробелов в начале строки
      setValuen8(form);
    };

    const hBlur = () => {};

    return (
      <Modal open={openSetStr} onClose={handleClose} hideBackdrop={false}>
        <>
          <Box sx={styleSetInf}>
            <Button sx={styleModalEnd} onClick={handleCloseEnd}>
              <b>&#10006;</b>
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              Номер записи <b> {props.nom} </b>
            </Typography>
            <br />
            {Inputer("Прямой", valuen1, handleChange1, hBlur1, styleInpArg)}
            {Inputer("Обратный", valuen2, handleChange2, hBlur2, styleInpArg)}
            {Inputer("КСП", valuen3, handleChange3, hBlur, styleInpArg)}
            {Inputer("КСС", valuen4, handleChange4, hBlur, styleInpArg)}
            {Inputer("КСО", valuen5, handleChange5, hBlur, styleInpArg)}
            {Inputer("Луч П", valuen6, handleChange6, hBlur, styleInpArg)}
            {Inputer("Луч О", valuen7, handleChange7, hBlur, styleInpArg)}
            {Inputer("Описание", valuen8, handleChange8, hBlur, styleInpArg)}
            {SaveFunc(handleCloseStr)}
          </Box>
          {badInput && <>{BadInput(badInput, setBadInput, soobError)}</>}
        </>
      </Modal>
    );
  };

  const SetOpenSetName = () => {
    setOpenSetName(true);
  };

  const SetOpenSetStr = (nom: number) => {
    nomStr = nomIllum = nom;
    setOpenSetStr(true);
  };

  const PointsLevel2BazaTab1 = () => {
    let name = formName.slice(0, 29);
    let yellowSoob = "Выкл с ";
    //====================================================================
    if (maskpoint.pointForRedax.yellow.make) yellowSoob = "Вкл с ";
    yellowSoob +=
      TimeStr(maskpoint.pointForRedax.yellow.start) +
      " до " +
      TimeStr(maskpoint.pointForRedax.yellow.stop);
    let rec1 = maskpoint.pointForRedax.xctrls[props.crossroad].left;
    let rec2 = maskpoint.pointForRedax.xctrls[props.crossroad].right;

    return (
      <Grid container sx={{ height: "19.5vh" }}>
        <Grid item xs={4.3}>
          <Grid container sx={{ fontSize: 10.7, marginTop: 0.4 }}>
            {Grider("Наименование ХТ", 0, true)}
            {Grider("Максимум прямого", 2, true)}
            {Grider("Максимум обратного", 2, true)}
            {Grider("Работа по НК и СК", 2, true)}
          </Grid>
        </Grid>
        <Grid item xs>
          <Grid container sx={{ marginTop: 0.4, fontSize: 11 }}>
            {flagEdit && (
              <>
                {Grider(name, 0, false)}
                {Grider(rec1, 2, false)}
                {Grider(rec2, 2, false)}
                {Grider(yellowSoob, 2, false)}
              </>
            )}
            {!flagEdit && (
              <>
                {Grider(ButtRec(name, SetOpenSetName), 0, false)}
                {Grider(ButtRec(rec1, SetOpenSetName), 2, false)}
                {Grider(ButtRec(rec2, SetOpenSetName), 2, false)}
                {Grider(ButtRec(yellowSoob, SetOpenSetName), 2, false)}
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const PointsLevel2BazaTab2Header = () => {
    return (
      <Grid container sx={styleXTGHeader}>
        {ConclHeader(1.3, "№", styleXTG02)}
        {ConclHeader(1.8, "Прямой", styleXTG02)}
        {ConclHeader(1.8, "Обратный", styleXTG02)}
        {ConclHeader(1, "КСП", styleXTG02)}
        {ConclHeader(1, "КСС", styleXTG02)}
        {ConclHeader(1, "КСО", styleXTG02)}
        {ConclHeader(1, "Луч П", styleXTG02)}
        {ConclHeader(1, "Луч О", styleXTG02)}
        {ConclHeader(2.1, "Описание", styleXTG021)}
      </Grid>
    );
  };

  const PointsLevel2BazaTab3Header = () => {
    return (
      <Grid container sx={styleXTGHeader}>
        <Grid xs={0.5} item sx={styleXTG02}></Grid>
        {ConclHeader(1.75, "Регион", styleXTG02)}
        {ConclHeader(1.75, "Район", styleXTG02)}
        {ConclHeader(2, "Перекрёсток", styleXTG02)}
        {ConclHeader(3, "Номера каналов прямого", styleXTG02)}
        {ConclHeader(3, "Номера каналов обратного", styleXTG021)}
      </Grid>
    );
  };

  const PointsLevel2BazaTab2Stroka = () => {
    let resStr = [];
    let elemm = maskpoint.pointForRedax.xctrls[crossRoad].StrategyB;

    for (let i = 0; i < elemm.length; i++) {
      let elem = elemm[i];
      let illum = nomIllum === i ? styleBut021 : styleBut02;
      resStr.push(
        <Grid key={i} container item xs={12}>
          <Grid xs={1.3} item sx={styleXTG011}>
            {!flagEdit && (
              <Button sx={illum} onClick={() => SetOpenSetStr(i)}>
                {i + 1}
              </Button>
            )}
            {flagEdit && <Box sx={{ p: 0.35 }}>{i + 1}</Box>}
          </Grid>
          {ConclStr(1.8, elem.xleft, styleXTG01)}
          {ConclStr(1.8, elem.xright, styleXTG01)}
          {ConclStr(1, elem.pkl, styleXTG01)}
          {ConclStr(1, elem.pks, styleXTG01)}
          {ConclStr(1, elem.pkr, styleXTG01)}
          {ConclStr(1, elem.vleft, styleXTG01)}
          {ConclStr(1, elem.vright, styleXTG01)}
          {ConclStr(2.1, elem.desc, styleXTG00)}
        </Grid>
      );
    }
    return resStr;
  };

  const PointsLevel2BazaTab3Stroka = () => {
    let resStr = [];
    let elemm = maskpoint.pointForRedax.xctrls[props.crossroad].Calculates;
    for (let i = 0; i < elemm.length; i++) {
      let elem = elemm[i];
      resStr.push(
        <Grid key={i} container item xs={12}>
          <Grid xs={0.5} item sx={styleXTG01}>
            {i + 1}
          </Grid>
          {ConclStr(1.75, elem.region, styleXTG01)}
          {ConclStr(1.75, elem.area, styleXTG01)}
          {ConclStr(2, elem.id, styleXTG01)}
          {ConclStr(3, elem.chanL[0], styleXTG01)}
          {ConclStr(3, elem.chanR[0], styleXTG00)}
        </Grid>
      );
    }
    return resStr;
  };

  const StartEdit = () => {
    formTemp = formName;
    leftTemp = maxLeft;
    rightTemp = maxRight;
    pointsEt = points;
    pointsTemp = pointsEt;
    flagExit = true;
    flagEdit = false;
    maskpoint.redaxPoint = false;
    dispatch(maskpointCreate(maskpoint));
    setTrigger(!trigger);
  };

  const StopEdit = () => {
    setFormName(formTemp);
    setMaxLeft(leftTemp);
    setMaxRight(rightTemp);
    setPoints(pointsTemp);
    maskpoint.pointForRedax = props.xctrll[xtProps];
    pointGraf = JSON.parse(JSON.stringify(props.xctrll));
    flagExit = false;
    flagEdit = true;
    maskpoint.redaxPoint = true;
    flagSave = false;
    maskpoint.savePoint = false;
    dispatch(maskpointCreate(maskpoint));
    setTrigger(!trigger);
  };

  const SaveEdit = () => {
    SendHandleSend(props.ws, maskpoint.pointForRedax); // прокидываем изменения на сервер
    props.setPoint(maskpoint.pointForRedax); // прокидываем изменения в App
    flagExit = false;
    flagEdit = true;
    maskpoint.redaxPoint = true;
    flagSave = false;
    maskpoint.savePoint = false;
    dispatch(maskpointCreate(maskpoint));
    pointsTemp = JSON.parse(JSON.stringify(maskpoint.pointForRedax));
    pointsEt = maskpoint.pointForRedax;
    setTrigger(!trigger);
  };

  return (
    <>
      {(maskpoint.savePoint || flagSave) && (
        <>{WorkMenuEdit(6, "Сохранить изменения", SaveEdit)}</>
      )}
      {(maskpoint.redaxPoint || flagEdit) && (
        <>{WorkMenuEdit(9, "Редактирование", StartEdit)}</>
      )}
      {flagExit && <>{WorkMenuEdit(9, "Выйти без сохранения", StopEdit)}</>}

      <Stack direction="row">
        <Grid item xs={4} sx={{ height: "85.8vh", border: 0 }}>
          <PointsLevel2BazaTab1 />
          <Grid container>
            <Grid item xs={12} sx={styleXTG03}>
              <PointsLevel2BazaTab2Header />
              {PointsLevel2BazaTab2Stroka()}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sx={styleXTG03}>
              <PointsLevel2BazaTab3Header />
              {PointsLevel2BazaTab3Stroka()}
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs sx={styleXTG04}>
          <PointsLevel2BazaDiogram
            xctrll={pointGraf}
            xtt={xtProps}
            crossroad={props.crossroad}
            update={props.update}
          />
        </Grid>
      </Stack>
      {openSetName && <SetName />}
      {openSetStr && <SetStr nom={nomStr} />}
    </>
  );
};

export default PointsLevel2Baza;

//=== сортировка массива ===
// pointRab.xctrls[crossRoad].StrategyB.sort(function (a: any, b: any) {
//   let af = a.xleft;
//   let bf = b.xleft;
//   let as = a.xright;
//   let bs = b.xright;
//   if (af === bf) {
//     return as < bs ? -1 : as > bs ? 1 : 0;
//   } else {
//     return af < bf ? -1 : 1;
//   }
// });
//==========================
