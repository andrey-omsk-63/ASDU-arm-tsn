import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import PointsLevel2BazaDiogram from "./PointsLevel2BazaDiogram";

import { styleXTG00, styleXTG01, styleXTG011 } from "./PointsLevel2BazaStyle";
import { styleXTG021, styleXTG02, styleXTG03 } from "./PointsLevel2BazaStyle";
import { styleXTG04, styleXTG05, styleBut01 } from "./PointsLevel2BazaStyle";
import { styleBut02, styleModalEnd, styleBut03 } from "./PointsLevel2BazaStyle";
import { styleSetInf, styleInpKnop } from "./PointsLevel2BazaStyle";

import { XctrlInfo } from "../../../interfaceGl.d";

let nomStr = 0;
let flagSave = false;
let flagEdit = true;
let flagExit = false;

let xtPropsOld = -1;
let crossRoadOld = -1;

let pointsTemp: any = null;

const PointsLevel2Baza = (props: {
  open: boolean;
  ws: WebSocket;
  xctrll: XctrlInfo[];
  xtt: number;
  value: string;
  crossroad: number;
}) => {
  const xtProps = props.xtt;
  const pointsEt = props.xctrll[xtProps];
  const crossRoad = props.crossroad;

  console.log("Пришло",xtProps,crossRoad,props.xctrll);
  console.log("pointsEt",pointsEt);

 
  const [openSetName, setOpenSetName] = React.useState(false);
  const [openSetStr, setOpenSetStr] = React.useState(false);
  const [points, setPoints] = React.useState(pointsEt);

  console.log("xtProps",xtProps,pointsEt);
  console.log("points",crossRoad, pointsEt.xctrls[crossRoad]);

  const [formName, setFormName] = React.useState(
    pointsEt.xctrls[crossRoad].name
  );
  const [trigger, setTrigger] = React.useState(false);

  // if (pointsTemp !== pointsEt) {
  //   console.log("Смена ХТ");
  //   nomStr = 0;
  //   flagSave = false;
  //   flagEdit = true;
  //   flagExit = false;
  //   pointsTemp = pointsEt;
  //   setTrigger(!trigger)
  // }

  if (xtPropsOld !== xtProps || crossRoadOld !== crossRoad) {
    console.log("Смена ХТttt");
    xtPropsOld = xtProps;
    crossRoadOld = crossRoad;
    nomStr = 0;
    flagSave = false;
    flagEdit = true;
    flagExit = false;
    pointsTemp = pointsEt;
    setFormName(pointsEt.xctrls[crossRoad].name)
    setPoints(pointsEt)

  }


  const handleKey = (event: any) => {
    if (event.key === "Enter") event.preventDefault();
  };

  const SetName = () => {
    const [valuen, setValuen] = React.useState(formName);

    const handleChange = (event: any) => {
      let form = event.target.value.trimStart(); // удаление пробелов в начале строки
      setValuen(form);
    };

    const handleClose = () => {
      let pointRab = points;
      pointRab.xctrls[props.crossroad].name = valuen;
      setPoints(pointRab);
      setFormName(valuen);
      setOpenSetName(false);
      flagSave = true;
      console.log("formName", formName);
    };

    const handleCloseClinch = () => {
      setOpenSetName(false);
    };

    return (
      <Modal open={openSetName} onClose={handleCloseClinch} hideBackdrop>
        <Box sx={styleSetInf}>
          <Button sx={styleModalEnd} onClick={handleCloseClinch}>
            <b>&#10006;</b>
          </Button>

          <Box sx={{ textAlign: "center" }}>
            <Box
              sx={{
                "& > :not(style)": { m: 1, width: "27ch", bgcolor: "#FFFBE5" },
              }}
            >
              <TextField
                size="small"
                onKeyPress={handleKey} //отключение Enter
                inputProps={{ style: { fontSize: 14 } }}
                value={valuen}
                onChange={handleChange}
                variant="standard"
              />
            </Box>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Button sx={styleInpKnop} variant="contained" onClick={handleClose}>
              <b>Сохранить</b>
            </Button>
          </Box>
        </Box>
      </Modal>
    );
  };

  const SetStr = (props: { nom: number }) => {
    let elem = points.xctrls[crossRoad].StrategyB[props.nom];
    const [valuen1, setValuen1] = React.useState(elem.xleft);
    const [valuen2, setValuen2] = React.useState(elem.xright);
    const [valuen3, setValuen3] = React.useState(elem.pkl);
    const [valuen4, setValuen4] = React.useState(elem.pks);
    const [valuen5, setValuen5] = React.useState(elem.pkr);
    const [valuen6, setValuen6] = React.useState(elem.vleft);
    const [valuen7, setValuen7] = React.useState(elem.vright);
    const [valuen8, setValuen8] = React.useState(elem.desc);

    const handleClose = () => {
      setOpenSetStr(false);
    };

    const handleCloseStr = () => {
      let pointRab = points;
      pointRab.xctrls[crossRoad].StrategyB[props.nom].xleft = valuen1;
      pointRab.xctrls[crossRoad].StrategyB[props.nom].xright = valuen2;
      pointRab.xctrls[crossRoad].StrategyB[props.nom].pkl = valuen3;
      pointRab.xctrls[crossRoad].StrategyB[props.nom].pks = valuen4;
      pointRab.xctrls[crossRoad].StrategyB[props.nom].pkr = valuen5;
      pointRab.xctrls[crossRoad].StrategyB[props.nom].vleft = valuen6;
      pointRab.xctrls[crossRoad].StrategyB[props.nom].vright = valuen7;
      pointRab.xctrls[crossRoad].StrategyB[props.nom].desc = valuen8;
      setPoints(pointRab);
      flagSave = true;
      setOpenSetStr(false);
    };

    const handleChange1 = (event: any) => {
      let form = Number(event.target.value.trimStart()); // удаление пробелов в начале строки
      if (form) setValuen1(Math.abs(form));
    };

    const handleChange2 = (event: any) => {
      let form = Number(event.target.value.trimStart()); // удаление пробелов в начале строки
      if (form) setValuen2(Math.abs(form));
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
      let form = Number(event.target.value.trimStart()); // удаление пробелов в начале строки
      if (form) setValuen6(Math.abs(form));
    };

    const handleChange7 = (event: any) => {
      let form = Number(event.target.value.trimStart()); // удаление пробелов в начале строки
      if (form) setValuen7(Math.abs(form));
    };

    const handleChange8 = (event: any) => {
      let form = event.target.value.trimStart(); // удаление пробелов в начале строки
      setValuen8(form);
    };

    const Inputer = (name: string, argum: any, handleChange: any) => {
      return (
        <Grid container>
          <Grid item xs={4.5}>
            {name}
          </Grid>
          <Grid item xs>
            <Box
              sx={{ "& > :not(style)": { width: "12ch", bgcolor: "#FFFBE5" } }}
            >
              <TextField
                size="small"
                onKeyPress={handleKey} //отключение Enter
                inputProps={{ style: { fontSize: 15 } }}
                value={argum}
                onChange={handleChange}
                variant="standard"
              />
            </Box>
          </Grid>
        </Grid>
      );
    };

    return (
      <Modal open={openSetStr} onClose={handleClose} hideBackdrop>
        <Box sx={styleSetInf}>
          <Button sx={styleModalEnd} onClick={handleClose}>
            <b>&#10006;</b>
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Номер записи <b> {props.nom} </b>
          </Typography>
          {Inputer("Прямой", valuen1, handleChange1)}
          {Inputer("Обратный", valuen2, handleChange2)}
          {Inputer("КСП", valuen3, handleChange3)}
          {Inputer("КСС", valuen4, handleChange4)}
          {Inputer("КСО", valuen5, handleChange5)}
          {Inputer("Луч П", valuen6, handleChange6)}
          {Inputer("Луч О", valuen7, handleChange7)}
          {Inputer("Описание", valuen8, handleChange8)}
          <Box sx={{ textAlign: "center" }}>
            <Button
              sx={styleInpKnop}
              variant="contained"
              onClick={handleCloseStr}
            >
              <b>Сохранить</b>
            </Button>
          </Box>
        </Box>
      </Modal>
    );
  };

  const SetOpenSetName = () => {
    setOpenSetName(true);
  };

  const SetOpenSetStr = (nom: number) => {
    nomStr = nom;
    setOpenSetStr(true);
  };

  const PointsLevel2BazaTab1 = () => {
    let name = formName.slice(0, 29);

    return (
      <Grid container sx={{ height: "15.5vh" }}>
        <Grid item xs={12} sx={{ border: 0 }}>
          <Grid container item>
            <Grid item xs={3.5}>
              <Box sx={{ fontSize: 10.5, marginTop: 0.5 }}>
                <b>Наименование ХТ</b> <br /> <br />
                <b>Максимум прямого</b> <br /> <br />
                <b>Максимум обратного</b>
              </Box>
            </Grid>
            <Grid item xs>
              <Box sx={{ marginTop: 0.2, fontSize: 11, border: 0 }}>
                {!flagEdit && (
                  <Button
                    sx={styleBut01}
                    variant="contained"
                    onClick={() => SetOpenSetName()}
                  >
                    <b>{name}</b>
                  </Button>
                )}
                {flagEdit && <b>{name}</b>}
                <br /> <br />
                {points.xctrls[props.crossroad].left} <br /> <br />
                {points.xctrls[props.crossroad].right}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const ConclHeader = (xss: number, elem: string, styleXX: any) => {
    return (
      <Grid item xs={xss} sx={styleXX}>
        <b>{elem}</b>
      </Grid>
    );
  };

  const ConclStr = (xss: number, elem: any, styleXX: any) => {
    return (
      <Grid item xs={xss} sx={styleXX}>
        {elem}
      </Grid>
    );
  };

  const PointsLevel2BazaTab2Header = () => {
    return (
      <Grid container>
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
      <Grid container>
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

    console.log('1points:',crossRoad,points.xctrls)
    console.log('1pointsEt:',pointsEt.xctrls)

    for (let i = 0; i < points.xctrls[crossRoad].StrategyB.length; i++) {
      let elem = points.xctrls[crossRoad].StrategyB[i];
      resStr.push(
        <Grid key={i} container item xs={12}>
          <Grid xs={1.3} item sx={styleXTG011}>
            {!flagEdit && (
              <Button
                sx={styleBut02}
                variant="contained"
                onClick={() => SetOpenSetStr(i)}
              >
                {i}
              </Button>
            )}
            {flagEdit && <Box sx={{ p: 0.3 }}>{i}</Box>}
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

    for (let i = 0; i < points.xctrls[props.crossroad].Calculates.length; i++) {
      let elem = points.xctrls[props.crossroad].Calculates[i];
      resStr.push(
        <Grid key={i} container item xs={12}>
          <Grid container item xs={12}>
            <Grid xs={0.5} item sx={styleXTG01}>
              {i}
            </Grid>
            {ConclStr(1.75, elem.region, styleXTG01)}
            {ConclStr(1.75, elem.area, styleXTG01)}
            {ConclStr(2, elem.id, styleXTG01)}
            {ConclStr(3, elem.chanL[0], styleXTG01)}
            {ConclStr(3, elem.chanR[0], styleXTG00)}
          </Grid>
        </Grid>
      );
    }
    return resStr;
  };

  const StartEdit = () => {
    flagExit = true;
    flagEdit = false;
    setTrigger(!trigger);
  };

  const StopEdit = () => {
    flagExit = false;
    flagEdit = true;
    flagSave = false;
    setTrigger(!trigger);
  };

  const SaveEdit = () => {
    const handleSend = () => {
      if (props.ws !== null) {
        if (props.ws.readyState === WebSocket.OPEN) {
          props.ws.send(JSON.stringify({ type: "changeXctrl", data: points }));
        } else {
          setTimeout(() => {
            handleSend();
          }, 1000);
        }
      }
    };
    handleSend();
    flagExit = false;
    flagEdit = true;
    flagSave = false;
    setTrigger(!trigger);
  };

  return (
    <>
      {props.value === "1" && (
        <>
          {flagSave && (
            <Grid container item>
              <Grid item xs={6}></Grid>
              <Grid item xs={3} sx={styleXTG05}>
                <Button
                  sx={styleBut03}
                  variant="contained"
                  onClick={() => SaveEdit()}
                >
                  <b>Сохранить изменения</b>
                </Button>
              </Grid>
            </Grid>
          )}

          {flagEdit && (
            <Grid container item>
              <Grid item xs={9}></Grid>
              <Grid item xs={3} sx={styleXTG05}>
                <Button
                  sx={styleBut03}
                  variant="contained"
                  onClick={() => StartEdit()}
                >
                  <b>Редактирование</b>
                </Button>
              </Grid>
            </Grid>
          )}

          {flagExit && (
            <Grid container item>
              <Grid item xs={9}></Grid>
              <Grid item xs={3} sx={styleXTG05}>
                <Button
                  sx={styleBut03}
                  variant="contained"
                  onClick={() => StopEdit()}
                >
                  <b>Выйти без изменения</b>
                </Button>
              </Grid>
            </Grid>
          )}

          <Stack direction="row">
            <Grid item xs={4} sx={{ height: "86.5vh", border: 0 }}>
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
                xctrll={props.xctrll}
                xtt={xtProps}
                crossroad={props.crossroad}
              />
            </Grid>
          </Stack>
          {openSetName && <SetName />}
          {openSetStr && <SetStr nom={nomStr} />}
        </>
      )}
    </>
  );
};

export default PointsLevel2Baza;
