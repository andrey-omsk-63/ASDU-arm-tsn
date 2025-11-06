import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { maskpointCreate } from "./../../../redux/actions";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

import PointsLevel2AreaDiogram from "./PointsLevel2AreaDiogram";

import { BadInput, Inputer, Grider } from "../../../AppServiceFunctions";

import { WS } from "../../../App";

import { styleSetInf, styleModalEnd, styleXTGHeader } from "./PointsGridStyle";
import { styleInpArg, styleInpKnop, styleBut021 } from "./PointsGridStyle";
import { styleXTG05, styleBut02, styleBut03 } from "./PointsGridStyle";
import { styleXTG00, styleXTG01, styleXTG021 } from "./PointsGridStyle";
import { styleXTG02, styleXTG035, styleXTG045 } from "./PointsGridStyle";
import { styleXTG101 } from "../../../AppStyle";

import { XctrlInfo } from "../../../interfaceGl.d";

import { PRIORITY } from "../../../App";

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
let HAVE = 0;

const PointsLevel2Area = (props: {
  open: boolean;
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
        setPoints(pointsTemp); // Stop
        flagExit = false;
        flagEdit = true;
        flagSave = false;
      } else pointGraf = props.xctrll;
    }
  }

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

    const handleClose = () => setOpenSetStr(false);

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
        } else pointGraf.push(xctrLl[i]);
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
      form && setValuen1(Math.abs(form));
      HAVE++;
    };

    const hBlur1 = () => {
      !EvilInput(valuen1, max1, min1) && setValuen1(elem.xleft);
      HAVE++;
    };

    const handleChange2 = (event: any) => {
      let form = Number(event.target.value.trimStart()); // удаление пробелов в начале строки
      form && setValuen2(Math.abs(form));
      HAVE++;
    };

    const hBlur2 = () => {
      !EvilInput(valuen2, max2, min2) && setValuen2(elem.xright);
      HAVE++;
    };

    const handleChange3 = (event: any) => {
      let form = event.target.value.trimStart(); // удаление пробелов в начале строки
      setValuen3(form);
      HAVE++;
    };

    const hBlur = () => {};

    return (
      <Modal open={openSetStr} onClose={handleCloseEnd} hideBackdrop={false}>
        <>
          <Box sx={styleSetInf}>
            <Button sx={styleModalEnd} onClick={() => handleClose()}>
              <b>&#10006;</b>
            </Button>
            <Typography sx={{ color: "#5B1080", textAlign: "center" }}>
              <em>
                КС <b> &nbsp;{elem.pk} </b>
              </em>
            </Typography>
            <br />
            {Inputer("Прямой", valuen1, handleChange1, hBlur1, styleInpArg)}
            {Inputer("Обратный", valuen2, handleChange2, hBlur2, styleInpArg)}
            {Inputer("Описание", valuen3, handleChange3, hBlur, styleInpArg)}
            {HAVE > 0 ? (
              <Box sx={{ textAlign: "center", marginTop: 1 }}>
                <Button sx={styleInpKnop} onClick={() => handleCloseStr(0)}>
                  <b>Сохранить</b>
                </Button>
              </Box>
            ) : (
              <Box sx={{ marginTop: 2, height: "21px" }}></Box>
            )}
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
    HAVE = 0;
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
    let elemm = maskpoint.pointForRedax.xctrls[props.crossroad].StrategyA;

    return elemm.map((elemn: any, idx: number) => {
      let elem = elemn.pk;
      let illum = nomIllum === idx ? styleBut021 : styleBut02;
      return (
        <Grid key={idx} container sx={{ cursor: "default" }}>
          <Grid xs={2} item sx={styleXTG01}>
            {!flagEdit && (
              <Button sx={illum} onClick={() => SetOpenSetStr(idx)}>
                {elem}
              </Button>
            )}
            {flagEdit && (
              <Box sx={{ p: 0.35 }}>
                <Box sx={styleXTG101}>{elem}</Box>
              </Box>
            )}
          </Grid>
          <Grid xs={3} item sx={styleXTG01}>
            {elemn.xleft}
          </Grid>
          <Grid xs={3.5} item sx={styleXTG01}>
            {elemn.xright}
          </Grid>
          <Grid xs={3.5} item sx={styleXTG00}>
            {elemn.desc}
          </Grid>
        </Grid>
      );
    });
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
      if (WS !== null) {
        if (WS.readyState === WebSocket.OPEN) {
          WS.send(
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
          <Grid container sx={{ height: "20vh", cursor: "default" }}>
            <Grid item xs={4.3}>
              <Grid container sx={{ fontSize: 10.7, marginTop: 0.4 }}>
                {Grider("Наименование ХТ", 0, true)}
              </Grid>
            </Grid>
            <Grid item xs>
              <Grid container sx={{ marginTop: 0.4, fontSize: 11 }}>
                {Grider(pointsEt.xctrls[crossRoad].name, 0, false)}
              </Grid>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sx={styleXTG035}>
              {PointsLevel2AreaTab1Header()}
              {PointsLevel2AreaTab1Stroka()}
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs sx={styleXTG045}>
          {PRIORITY && (
            <PointsLevel2AreaDiogram
              xctrll={pointGraf}
              xtt={xtProps}
              crossroad={props.crossroad}
              update={props.update}
            />
          )}
        </Grid>
      </Stack>
      {openSetStr && <SetStr nom={nomStr} />}
    </>
  );
};

export default PointsLevel2Area;
