import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { maskpointCreate } from "./../../../redux/actions";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import PointsLevel2AreaDiogram from "./PointsLevel2AreaDiogram";

import { BadInput } from "../../../AppServiceFunctions";

import { styleSetInf, styleModalEnd, styleXTGHeader } from "./PointsGridStyle";
import { styleInpArg, styleInpKnop, styleBut021 } from "./PointsGridStyle";
import { styleXTG05, styleBut02, styleBut03 } from "./PointsGridStyle";
import { styleXTG00, styleXTG01, styleXTG021 } from "./PointsGridStyle";
import { styleXTG02, styleXTG035, styleXTG045 } from "./PointsGridStyle";
import {  styleXTG101 } from "../../../AppStyle";

import { XctrlInfo } from "../../../interfaceGl.d";

let nomStr = -1;
let nomIllum = -1;
let flagSave = false;
let flagEdit = true;
let flagExit = false;

let xtPropsOld = -1;
let crossRoadOld = -1;
let soobError = "";

let pointsTemp: any = null;
let pointRab: any = null;
let pointGraf: XctrlInfo[] = [];

const PointsLevel2Area = (props: {
  open: boolean;
  ws: WebSocket;
  xctrll: XctrlInfo[];
  xtt: number;
  crossroad: number;
  setPoint: any;
  update: boolean;
}) => {
  //== Piece of Redux =======================================
  let maskpoint = useSelector((state: any) => {
    const { maskpointReducer } = state;
    return maskpointReducer.maskpoint;
  });
  //console.log("maskpoint_Area:", flagEdit, maskpoint);
  const dispatch = useDispatch();
  //===========================================================
  const xtProps = props.xtt;
  let pointsEt = props.xctrll[xtProps];
  const crossRoad = props.crossroad;
  const xctrLl = props.xctrll;

  const [openSetStr, setOpenSetStr] = React.useState(false);
  const [points, setPoints] = React.useState(pointsEt);
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
    pointsTemp = JSON.parse(JSON.stringify(pointsEt));
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
      pointsTemp = JSON.parse(JSON.stringify(pointsEt));
      flagExit = true;
      flagEdit = false;
    } else {
      if (maskpoint.redaxPoint && !flagEdit) {
        console.log("2");
        setPoints(pointsTemp); // Stop
        flagExit = false;
        flagEdit = true;
        flagSave = false;
      }  else {
        pointGraf = props.xctrll;
        console.log('ОБНОВЛЕНИЕ Area pointGraf') //============
      }
    }
  }

  const handleKey = (event: any) => {
    if (event.key === "Enter") event.preventDefault();
  };

  const Inputer = (
    name: string,
    argum: any,
    hChange: any,
    hBlur: any,
    styleX: any
  ) => {
    return (
      <Grid container sx={{ fontSize: 15 }}>
        <Grid item xs={5} sx={{ marginTop: 1 }}>
          {name}
        </Grid>
        <Grid item xs sx={{ marginTop: 0 }}>
          <Box sx={styleX}>
            <TextField
              size="small"
              onKeyPress={handleKey} //отключение Enter
              InputProps={{ disableUnderline: true, style: { fontSize: 14 } }}
              value={argum}
              onChange={hChange}
              onBlur={hBlur}
              variant="standard"
            />
          </Box>
        </Grid>
      </Grid>
    );
  };

  const SetStr = (props: { nom: number }) => {
    let StrA = maskpoint.pointForRedax.xctrls[crossRoad].StrategyA;
    let elem = StrA[props.nom];
    let max1 = props.nom < StrA.length - 1 ? StrA[props.nom + 1].xleft : 0;
    let max2 = props.nom < StrA.length - 1 ? StrA[props.nom + 1].xright : 0;
    let min1 = props.nom ? StrA[props.nom - 1].xleft : 0;
    let min2 = props.nom ? StrA[props.nom - 1].xright : 0;
    const [valuen1, setValuen1] = React.useState(elem.xleft);
    const [valuen2, setValuen2] = React.useState(elem.xright);
    const [valuen3, setValuen3] = React.useState(elem.desc);
    const [badInput, setBadInput] = React.useState(false);

    const handleClose = () => {
      setOpenSetStr(false);
    };

    const handleCloseEnd = (event: any, reason: string) => {
      if (reason === "escapeKeyDown") handleClose();
    };

    const handleCloseStr = (mode: number) => {
      pointRab = JSON.parse(JSON.stringify(maskpoint.pointForRedax));
      pointRab.xctrls[crossRoad].StrategyA[props.nom].xleft = valuen1;
      pointRab.xctrls[crossRoad].StrategyA[props.nom].xright = valuen2;
      pointRab.xctrls[crossRoad].StrategyA[props.nom].desc = valuen3;
      setPoints(pointRab);
      maskpoint.pointForRedax = pointRab;
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
      flagSave = true;
      maskpoint.savePoint = true;
      dispatch(maskpointCreate(maskpoint));
      setOpenSetStr(false);
      setTrigger(!trigger);
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
      //EvilInput(form, max1, min1) && form && setValuen1(Math.abs(form));
      form && setValuen1(Math.abs(form));
    };

    const hBlur1 = () => {
      !EvilInput(valuen1, max1, min1) && setValuen1(elem.xleft);
    };

    const handleChange2 = (event: any) => {
      let form = Number(event.target.value.trimStart()); // удаление пробелов в начале строки
      //EvilInput(form, max2, min2) && form && setValuen2(Math.abs(form));
      form && setValuen2(Math.abs(form));
    };

    const hBlur2 = () => {
      !EvilInput(valuen2, max2, min2) && setValuen2(elem.xright);
    };

    const handleChange3 = (event: any) => {
      let form = event.target.value.trimStart(); // удаление пробелов в начале строки
      setValuen3(form);
    };

    const hBlur = () => {};

    return (
      <Modal open={openSetStr} onClose={handleCloseEnd} hideBackdrop={false}>
        <>
          <Box sx={styleSetInf}>
            <Button sx={styleModalEnd} onClick={() => handleClose()}>
              <b>&#10006;</b>
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              КС <b> &nbsp;{elem.pk} </b>
            </Typography>{" "}
            <br />
            {Inputer("Прямой", valuen1, handleChange1, hBlur1, styleInpArg)}
            {Inputer("Обратный", valuen2, handleChange2, hBlur2, styleInpArg)}
            {Inputer("Описание", valuen3, handleChange3, hBlur, styleInpArg)}
            <Box sx={{ textAlign: "center", marginTop: 1 }}>
              <Button sx={styleInpKnop} onClick={() => handleCloseStr(0)}>
                <b>Сохранить</b>
              </Button>
            </Box>
          </Box>
          {badInput && <>{BadInput(badInput, setBadInput, soobError)}</>}
        </>
      </Modal>
    );
  };

  const SetOpenSetStr = (nom: number) => {
    nomStr = nom;
    nomIllum = nom;
    setOpenSetStr(true);
  };

  const PointsLevel2AreaTab1Header = () => {
    return (
      <Grid container sx={styleXTGHeader}>
        <Grid item xs={2} sx={styleXTG02}>
          <b>КС</b>
        </Grid>
        <Grid item xs={3} sx={styleXTG02}>
          <b>Прямой</b>
        </Grid>
        <Grid item xs={3.5} sx={styleXTG02}>
          <b>Обратный</b>
        </Grid>
        <Grid item xs={3.5} sx={styleXTG021}>
          <b>Описание</b>
        </Grid>
      </Grid>
    );
  };

  const PointsLevel2AreaTab1Stroka = () => {
    let resStr = [];
    let elemm = maskpoint.pointForRedax.xctrls[props.crossroad].StrategyA;

    for (let i = 0; i < elemm.length; i++) {
      let elem = elemm[i].pk;
      let illum = nomIllum === i ? styleBut021 : styleBut02;
      resStr.push(
        <Grid key={i} container>
          <Grid xs={2} item sx={styleXTG01}>
            {!flagEdit && (
              <Button sx={illum} onClick={() => SetOpenSetStr(i)}>
                {elem}
              </Button>
            )}
            {flagEdit && (
              <Box sx={{ p: 0.2 }}>
                <Box sx={styleXTG101}>{elem}</Box>
              </Box>
            )}
          </Grid>
          <Grid xs={3} item sx={styleXTG01}>
            {elemm[i].xleft}
          </Grid>
          <Grid xs={3.5} item sx={styleXTG01}>
            {elemm[i].xright}
          </Grid>
          <Grid xs={3.5} item sx={styleXTG00}>
            {elemm[i].desc}
          </Grid>
        </Grid>
      );
    }
    return resStr;
  };

  const StartEdit = (mode: number) => {
    pointsEt = points;
    pointsTemp = JSON.parse(JSON.stringify(pointsEt));
    flagExit = true;
    flagEdit = false;
    maskpoint.redaxPoint = false;
    dispatch(maskpointCreate(maskpoint));
    setTrigger(!trigger);
  };

  const StopEdit = (mode: number) => {
    console.log("StopEdit", mode);
    setPoints(pointsTemp);
    maskpoint.pointForRedax = props.xctrll[xtProps];
    pointGraf = props.xctrll;
    flagExit = false;
    flagEdit = true;
    maskpoint.redaxPoint = true;
    flagSave = false;
    maskpoint.savePoint = false;
    dispatch(maskpointCreate(maskpoint));
    setTrigger(!trigger);
  };

  const SaveEdit = (mode: number) => {
    const handleSend = () => {
      if (props.ws !== null) {
        if (props.ws.readyState === WebSocket.OPEN) {
          props.ws.send(
            JSON.stringify({
              type: "changeXctrl",
              data: maskpoint.pointForRedax,
            })
          );
        } else {
          setTimeout(() => {
            handleSend();
          }, 1000);
        }
      }
    };
    handleSend(); // прокидываем изменения на сервер
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
        <Grid container>
          <Grid item xs={6}></Grid>
          <Grid item xs={3} sx={styleXTG05}>
            <Button sx={styleBut03} onClick={() => SaveEdit(2)}>
              <b>Сохранить изменения</b>
            </Button>
          </Grid>
        </Grid>
      )}

      {(maskpoint.redaxPoint || flagEdit) && (
        <Grid container>
          <Grid item xs={9}></Grid>
          <Grid item xs={3} sx={styleXTG05}>
            <Button sx={styleBut03} onClick={() => StartEdit(1)}>
              <b>Редактирование</b>
            </Button>
          </Grid>
        </Grid>
      )}

      {flagExit && (
        <Grid container>
          <Grid item xs={9}></Grid>
          <Grid item xs={3} sx={styleXTG05}>
            <Button sx={styleBut03} onClick={() => StopEdit(1)}>
              <b>Выйти без cохранения</b>
            </Button>
          </Grid>
        </Grid>
      )}

      <Stack direction="row">
        <Grid item xs={3} sx={{ height: "85.8vh", border: 0 }}>
          <Grid container sx={{ height: "20vh" }}></Grid>
          <Grid container>
            <Grid item xs={12} sx={styleXTG035}>
              {PointsLevel2AreaTab1Header()}
              {PointsLevel2AreaTab1Stroka()}
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs sx={styleXTG045}>
          <Grid container>
            <PointsLevel2AreaDiogram
              xctrll={pointGraf}
              xtt={xtProps}
              crossroad={props.crossroad}
              update={props.update}
            />
          </Grid>
        </Grid>
      </Stack>
      {openSetStr && <SetStr nom={nomStr} />}
    </>
  );
};

export default PointsLevel2Area;
