import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

import PointsLevel2BazaDiogram from "./PointsLevel2BazaDiogram";

import { XctrlInfo } from "../../../interfaceGl.d";

let nomStr = 0;
let flagSave = false;

const PointsLevel2Baza = (props: {
  open: boolean;
  xctrll: XctrlInfo[];
  xtt: number;
  value: string;
  crossroad: number;
}) => {
  const xtProps = props.xtt;
  const points = props.xctrll[xtProps];
  const crossRoad = props.crossroad;

  const styleXTG00 = {
    fontSize: 11,
    borderBottom: 1,
    borderColor: "primary.main",
    padding: 0.3,
    textAlign: "center",
  };

  const styleXTG01 = {
    fontSize: 11,
    borderRight: 1,
    borderBottom: 1,
    borderColor: "primary.main",
    padding: 0.3,
    textAlign: "center",
  };

  const styleXTG011 = {
    fontSize: 11,
    borderRight: 1,
    borderBottom: 1,
    borderColor: "primary.main",
    //padding: 0.3,
    textAlign: "center",
  };

  const styleXTG021 = {
    fontSize: 11,
    //borderRight: 1,
    borderBottom: 1,
    borderColor: "primary.main",
    //padding: 0.1,
    textAlign: "center",
    backgroundColor: "#C0C0C0",
  };

  const styleXTG02 = {
    fontSize: 11,
    borderRight: 1,
    borderBottom: 1,
    borderColor: "primary.main",
    //padding: 0.1,
    textAlign: "center",
    backgroundColor: "#C0C0C0",
  };

  const styleXTG03 = {
    marginTop: 0.5,
    border: 1,
    height: "35.5vh",
    borderRadius: 1,
    borderColor: "primary.main",
  };

  const styleXTG04 = {
    //height: '84.4vh',
    height: "86.5vh",
    border: 1,
    marginLeft: 0.5,
    borderRadius: 1,
    borderColor: "primary.main",
  };

  const styleXTG05 = {
    marginTop: -3.0,
    height: "3vh",
    textAlign: "right",
  };

  const styleBut01 = {
    fontSize: 10,
    marginTop: -0.5,
    maxHeight: "21px",
    minHeight: "21px",
    maxWidth: "193px",
    minWidth: "193px",
    backgroundColor: "#FFFBE5",
    color: "black",
    textTransform: "unset !important",
  };

  const styleBut02 = {
    fontSize: 11,
    maxHeight: "21px",
    minHeight: "21px",
    //maxWidth: "1px",
    //minWidth: "1px",
    maxWidth: "2%",
    minWidth: "2%",
    backgroundColor: "#FFFBE5",
    color: "black",
    textTransform: "unset !important",
  };

  const styleBut03 = {
    fontSize: 13.5,
    marginTop: -0.5,
    maxHeight: "21px",
    minHeight: "21px",
    maxWidth: "193px",
    minWidth: "193px",
    backgroundColor: "#FFFBE5",
    color: "black",
    textTransform: "unset !important",
  };

  const styleModalEnd = {
    position: "absolute",
    top: "0%",
    left: "auto",
    right: "-0%",
    height: "21px",
    maxWidth: "2%",
    minWidth: "2%",
    color: "black",
  };

  const styleSetInf = {
    position: "absolute",
    marginTop: "15vh",
    marginLeft: "24vh",
    width: 340,
    bgcolor: "background.paper",
    border: "3px solid #000",
    borderColor: "primary.main",
    borderRadius: 2,
    boxShadow: 24,
    p: 1.5,
  };

  const [openSetName, setOpenSetName] = React.useState(false);
  const [openSetStr, setOpenSetStr] = React.useState(false);

  const SetName = () => {
    const handleClose = () => {
      setOpenSetName(false);
    };

    return (
      <Modal open={openSetName} onClose={handleClose} hideBackdrop>
        <Box sx={styleSetInf}>
          <Button sx={styleModalEnd} onClick={handleClose}>
            <b>&#10006;</b>
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            <b>{points.xctrls[props.crossroad].name}</b>
          </Typography>
        </Box>
      </Modal>
    );
  };

  const SetStr = (props: { nom: number }) => {
    const handleClose = () => {
      setOpenSetStr(false);
    };

    return (
      <Modal open={openSetStr} onClose={handleClose} hideBackdrop>
        <Box sx={styleSetInf}>
          <Button sx={styleModalEnd} onClick={handleClose}>
            <b>&#10006;</b>
          </Button>

          <Typography sx={{ textAlign: "center" }}>
            <b>
              Прямой {points.xctrls[crossRoad].StrategyB[props.nom].xleft}<br/>
              Обратный {points.xctrls[crossRoad].StrategyB[props.nom].xright}<br/>
              КСП {points.xctrls[crossRoad].StrategyB[props.nom].pkl}<br/>
              КСС {points.xctrls[crossRoad].StrategyB[props.nom].pks}<br/>
              КСО {points.xctrls[crossRoad].StrategyB[props.nom].pkr}<br/>
              Луч П <br/>
              Луч О <br/>
              Описание
            </b>
          </Typography>
        </Box>
      </Modal>
    );
  };

  const SetOpenSetName = () => {
    setOpenSetName(true);
    flagSave = true;
  };

  const PointsLevel2BazaTab1 = () => {
    return (
      <Grid container sx={{ height: "14.5vh" }}>
        <Grid item xs={12} sx={{ border: 0 }}>
          <Grid container item>
            <Grid item xs={3.9}>
              <Box sx={{ fontSize: 10.5, marginTop: 0.5 }}>
                <div>
                  <b>Наименование ХТ</b>
                </div>
                <p>
                  <b>Максимум прямого</b>
                </p>
                <div>
                  <b>Максимум обратного</b>
                </div>
              </Box>
            </Grid>
            <Grid item xs>
              <Box sx={{ marginTop: 0.5, fontSize: 11, border: 0 }}>
                <Button
                  sx={styleBut01}
                  variant="contained"
                  onClick={() => SetOpenSetName()}
                >
                  <b>{points.xctrls[props.crossroad].name}</b>
                </Button>
                <p>{points.xctrls[props.crossroad].left}</p>
                <div>{points.xctrls[props.crossroad].right}</div>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const PointsLevel2BazaTab2Header = () => {
    return (
      <Grid container item xs={12}>
        <Grid xs={1.3} item sx={styleXTG02}>
          <b>№</b>
        </Grid>
        <Grid xs={1.8} item sx={styleXTG02}>
          <b>Прямой</b>
        </Grid>
        <Grid xs={1.8} item sx={styleXTG02}>
          <b>Обратный</b>
        </Grid>
        <Grid xs={1} item sx={styleXTG02}>
          <b>КСП</b>
        </Grid>
        <Grid xs={1} item sx={styleXTG02}>
          <b>КСС</b>
        </Grid>
        <Grid xs={1} item sx={styleXTG02}>
          <b>КСО</b>
        </Grid>
        <Grid xs={1} item sx={styleXTG02}>
          <b>Луч П</b>
        </Grid>
        <Grid xs={1} item sx={styleXTG02}>
          <b>Луч О</b>
        </Grid>
        <Grid xs={2.1} item sx={styleXTG021}>
          <b>Описание</b>
        </Grid>
      </Grid>
    );
  };

  const SetOpenSetStr = (nom: number) => {
    nomStr = nom;
    setOpenSetStr(true);
    flagSave = true;
  };

  const PointsLevel2BazaTab2Stroka = () => {
    let resStr = [];

    for (let i = 0; i < points.xctrls[props.crossroad].StrategyB.length; i++) {
      resStr.push(
        <Grid key={i} container item xs={12}>
          <Grid xs={1.3} item sx={styleXTG011}>
            <Button
              sx={styleBut02}
              variant="contained"
              onClick={() => SetOpenSetStr(i)}
            >
              {i}
            </Button>
          </Grid>
          <Grid xs={1.8} item sx={styleXTG01}>
            {points.xctrls[props.crossroad].StrategyB[i].xleft}
          </Grid>
          <Grid xs={1.8} item sx={styleXTG01}>
            {points.xctrls[props.crossroad].StrategyB[i].xright}
          </Grid>
          <Grid xs={1} item sx={styleXTG01}>
            {points.xctrls[props.crossroad].StrategyB[i].pkl}
          </Grid>
          <Grid xs={1} item sx={styleXTG01}>
            {points.xctrls[props.crossroad].StrategyB[i].pks}
          </Grid>
          <Grid xs={1} item sx={styleXTG01}>
            {points.xctrls[props.crossroad].StrategyB[i].pkr}
          </Grid>
          <Grid xs={1} item sx={styleXTG01}>
            {points.xctrls[props.crossroad].StrategyB[i].vleft}
          </Grid>
          <Grid xs={1} item sx={styleXTG01}>
            {points.xctrls[props.crossroad].StrategyB[i].vright}
          </Grid>
          <Grid xs={2.1} item sx={styleXTG00}>
            {points.xctrls[props.crossroad].StrategyB[i].desc}
          </Grid>
        </Grid>
      );
    }
    return resStr;
  };

  const PointsLevel2BazaTab3Header = () => {
    return (
      <Grid container item xs={12}>
        <Grid xs={0.5} item sx={styleXTG02}></Grid>
        <Grid xs={1.75} item sx={styleXTG02}>
          <b>Регион</b>
        </Grid>
        <Grid xs={1.75} item sx={styleXTG02}>
          <b>Район</b>
        </Grid>
        <Grid xs={2} item sx={styleXTG02}>
          <b>Перекрёсток</b>
        </Grid>
        <Grid xs={3} item sx={styleXTG02}>
          <b>Номера каналов прямого</b>
        </Grid>
        <Grid xs={3} item sx={styleXTG021}>
          <b>Номера каналов обратного</b>
        </Grid>
      </Grid>
    );
  };

  const PointsLevel2BazaTab3Stroka = () => {
    let resStr = [];

    for (let i = 0; i < points.xctrls[props.crossroad].Calculates.length; i++) {
      resStr.push(
        <Grid key={i} container item xs={12}>
          <Grid container item xs={12}>
            <Grid key={Math.random()} xs={0.5} item sx={styleXTG01}>
              {i}
            </Grid>
            <Grid xs={1.75} item sx={styleXTG01}>
              {points.xctrls[props.crossroad].Calculates[i].region}
            </Grid>
            <Grid xs={1.75} item sx={styleXTG01}>
              {points.xctrls[props.crossroad].Calculates[i].area}
            </Grid>
            <Grid xs={2} item sx={styleXTG01}>
              {points.xctrls[props.crossroad].Calculates[i].id}
            </Grid>
            <Grid xs={3} item sx={styleXTG01}>
              {points.xctrls[props.crossroad].Calculates[i].chanL[0]}
            </Grid>
            <Grid xs={3} item sx={styleXTG00}>
              {points.xctrls[props.crossroad].Calculates[i].chanR[0]}
            </Grid>
          </Grid>
        </Grid>
      );
    }
    return resStr;
  };

  return (
    <>
      {props.value === "1" && (
        <>
          {flagSave && (
            <Grid container item>
              <Grid item xs={9}></Grid>
              <Grid item xs={3} sx={styleXTG05}>
                <Button sx={styleBut03} variant="contained">
                  <b>Сохранить изменения</b>
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
              <Grid container>
                <PointsLevel2BazaDiogram
                  xctrll={props.xctrll}
                  xtt={xtProps}
                  crossroad={props.crossroad}
                />
              </Grid>
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
