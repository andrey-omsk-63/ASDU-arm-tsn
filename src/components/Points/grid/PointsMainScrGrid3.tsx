import * as React from "react";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

import { Inputer, SaveFunc } from "../../../AppServiceFunctions";
import { SendHandleSend } from "../../../AppServiceFunctions";

import { styleXTGl02, styleXTGl021, styleBut02 } from "./PointsGridStyle";
import { styleModalEnd, styleSetInf, styleInpArg } from "./PointsGridStyle";

import { XctrlInfo } from "../../../interfaceGl.d";

let nomStr = 0;

const PointsMainScrGrid3 = (props: {
  open: boolean;
  ws: WebSocket;
  xctrll: XctrlInfo[];
  xtt: number;
}) => {
  const xtProps = props.xtt;
  const points = props.xctrll[xtProps];
  const ws = props.ws;

  const [openSetStr, setOpenSetStr] = React.useState(false);

  const HeaderMainScrGrid3 = () => {
    return (
      <Grid container item xs={12}>
        <Grid xs={1.5} item sx={styleXTGl02}>
          <b>№</b>
        </Grid>
        <Grid xs={3.5} item sx={styleXTGl02}>
          <b>« 0 »</b>
        </Grid>
        <Grid xs={3.5} item sx={styleXTGl02}>
          <b>« 1 »</b>
        </Grid>
        <Grid xs={3.5} item sx={styleXTGl021}>
          <b>« 2 »</b>
        </Grid>
      </Grid>
    );
  };

  const SetStr = (props: { nom: number }) => {
    const [valuen1, setValuen1] = React.useState(points.prioryty[props.nom][0]);
    const [valuen2, setValuen2] = React.useState(points.prioryty[props.nom][1]);
    const [valuen3, setValuen3] = React.useState(points.prioryty[props.nom][2]);

    const handleClose = () => {
      setOpenSetStr(false);
    };

    const handleCloseStr = () => {
      points.prioryty[props.nom][0] = valuen1;
      points.prioryty[props.nom][1] = valuen2;
      points.prioryty[props.nom][2] = valuen3;
      SendHandleSend(ws, points); // прокидываем изменения на сервер
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

    return (
      <Modal open={openSetStr} onClose={handleClose} hideBackdrop>
        <Box sx={styleSetInf}>
          <Button sx={styleModalEnd} onClick={handleClose}>
            <b>&#10006;</b>
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Номер записи <b> {props.nom + 1} </b>
          </Typography>{" "}
          <br />
          {Inputer("« 0 »", valuen1, handleChange1, styleInpArg)}
          {Inputer("« 1 »", valuen2, handleChange2, styleInpArg)}
          {Inputer("« 1 »", valuen3, handleChange3, styleInpArg)}
          {SaveFunc(handleCloseStr)}
        </Box>
      </Modal>
    );
  };

  const SetOpenSetStr = (nom: number) => {
    nomStr = nom;
    setOpenSetStr(true);
  };

  const StrokaMainScrGrid3 = () => {
    let resStr = [];
    for (let i = 0; i < points.prioryty.length; i++) {
      let bordBott = 1;
      if (i === points.prioryty.length - 1) bordBott = 0;
      const styleXTG03 = {
        borderRight: 1,
        borderBottom: bordBott,
        borderColor: "primary.main",
        padding: 0.7,
        textAlign: "center",
      };

      const styleXTG033 = {
        borderBottom: bordBott,
        borderColor: "primary.main",
        padding: 0.7,
        textAlign: "center",
      };

      resStr.push(
        <Grid key={i} container item xs={12} sx={{ fontSize: 14 }}>
          <Grid xs={1.5} item sx={styleXTG03}>
            <Button
              sx={styleBut02}
              variant="contained"
              onClick={() => SetOpenSetStr(i)}
            >
              {i + 1}
            </Button>
          </Grid>
          <Grid xs={3.5} item sx={styleXTG03}>
            {points.prioryty[i][0]}
          </Grid>
          <Grid xs={3.5} item sx={styleXTG03}>
            {points.prioryty[i][1]}
          </Grid>
          <Grid xs={3.5} item sx={styleXTG033}>
            {points.prioryty[i][2]}
          </Grid>
        </Grid>
      );
    }
    return resStr;
  };

  return (
    <Grid item sx={{ fontSize: 14.5, margin: -1 }}>
      <HeaderMainScrGrid3 />
      {props.open && <>{StrokaMainScrGrid3()}</>}
      {openSetStr && <SetStr nom={nomStr} />}
    </Grid>
  );
};

export default PointsMainScrGrid3;
