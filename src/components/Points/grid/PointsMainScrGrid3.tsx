import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { maskpointCreate, statsaveCreate } from "./../../../redux/actions";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

import { Inputer, SaveFunc } from "../../../AppServiceFunctions";
import { MakeDate, MakeDateRus } from "../../../AppServiceFunctions";

import { styleXTGl02, styleXTGl021, styleBut02 } from "./PointsGridStyle";
import { styleModalEnd, styleSetInf, styleInpArg } from "./PointsGridStyle";
import { styleXTGl05, styleBut021, styleXTGrid } from "./PointsGridStyle";
import { styleXTGHeader, styleXTGl06 } from "./PointsGridStyle";
import { styleXTG101 } from "../../../AppStyle";

let nomStr = 0;
let flagEdit = true;
let xtPropsOld = -1;
let nomIllum = -1;
let HAVE = 0;

const PointsMainScrGrid3 = (props: {
  open: boolean;
  xtt: number;
  trigger: Function;
}) => {
  //== Piece of Redux =======================================
  let maskpoint = useSelector((state: any) => {
    const { maskpointReducer } = state;
    return maskpointReducer.maskpoint;
  });
  let datestat = useSelector((state: any) => {
    const { statsaveReducer } = state;
    return statsaveReducer.datestat;
  });
  const dispatch = useDispatch();
  //===========================================================
  const xtProps = props.xtt;
  const points = maskpoint.pointForRedax;

  const [openSetStr, setOpenSetStr] = React.useState(false);
  const [valuen1, setValuen1] = React.useState(0);
  const [valuen2, setValuen2] = React.useState(0);
  const [valuen3, setValuen3] = React.useState(0);

  if (xtPropsOld !== xtProps) {
    xtPropsOld = xtProps;
    flagEdit = true;
    nomIllum = -1;
  } else {
    if (!maskpoint.redaxPoint && flagEdit) {
      flagEdit = false; // Start
    } else if (maskpoint.redaxPoint && !flagEdit) flagEdit = true; // Stop
  }

  const HeaderMainScrGrid3 = () => {
    return (
      <>
        <Grid container sx={styleXTGHeader}>
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
        <Grid item container>
          {datestat.xttData !== MakeDate(new Date()) && (
            <Grid item xs={12} sx={styleXTGl05}>
              {MakeDateRus(MakeDate(new Date()))}
            </Grid>
          )}
        </Grid>
      </>
    );
  };

  const SetStr = (nom: number) => {
    const handleClose = () => {
      setOpenSetStr(false);
    };

    const handleCloseStr = () => {
      points.prioryty[nom][0] = valuen1;
      points.prioryty[nom][1] = valuen2;
      points.prioryty[nom][2] = valuen3;
      maskpoint.pointForRedax.prioryty[nom][0] = valuen1;
      maskpoint.pointForRedax.prioryty[nom][1] = valuen2;
      maskpoint.pointForRedax.prioryty[nom][2] = valuen3;
      datestat.needSave = true;
      dispatch(statsaveCreate(datestat));
      maskpoint.savePoint = true;
      dispatch(maskpointCreate(maskpoint));
      setOpenSetStr(false);
      props.trigger();
    };

    const handleChange1 = (event: any) => {
      let form = Number(event.target.value.trimStart()); // удаление пробелов в начале строки
      form && setValuen1(Math.abs(form));
      HAVE++;
    };

    const handleChange2 = (event: any) => {
      let form = Number(event.target.value.trimStart()); // удаление пробелов в начале строки
      form && setValuen2(Math.abs(form));
      HAVE++;
    };

    const handleChange3 = (event: any) => {
      let form = Number(event.target.value.trimStart()); // удаление пробелов в начале строки
      form && setValuen3(Math.abs(form));
      HAVE++;
    };

    const hBlur = () => {};

    return (
      <Modal open={openSetStr} onClose={handleClose} hideBackdrop={false}>
        <Box sx={styleSetInf}>
          <Button sx={styleModalEnd} onClick={handleClose}>
            <b>&#10006;</b>
          </Button>
          <Typography sx={styleXTGl06}>
            Номер записи <b> {nom + 1} </b>
          </Typography>{" "}
          <br />
          {Inputer("« 0 »", valuen1, handleChange1, hBlur, styleInpArg)}
          {Inputer("« 1 »", valuen2, handleChange2, hBlur, styleInpArg)}
          {Inputer("« 2 »", valuen3, handleChange3, hBlur, styleInpArg)}
          {HAVE > 0 ? (
            <>{SaveFunc(handleCloseStr)}</>
          ) : (
            <Box sx={{ marginTop: 2, height: "21px" }}></Box>
          )}
        </Box>
      </Modal>
    );
  };

  const SetOpenSetStr = (nom: number) => {
    nomStr = nom;
    nomIllum = nom;
    HAVE = 0;
    setValuen1(points.prioryty[nom][0]);
    setValuen2(points.prioryty[nom][1]);
    setValuen3(points.prioryty[nom][2]);
    setOpenSetStr(true);
  };

  const StrokaMainScrGrid3 = () => {
    return points.prioryty.map(
      (pointsPrioryty: any, idx: number, array: any) => {
        let bordBott = "1px solid #d4d4d4"; // серый
        if (idx === array.length - 1) bordBott = "0px solid #d4d4d4"; // серый
        const styleXTG03 = {
          borderRight: "1px solid #d4d4d4",
          borderBottom: bordBott,
          padding: 0.7,
          textAlign: "center",
        };

        const styleXTG033 = {
          borderBottom: bordBott,
          padding: 0.7,
          textAlign: "center",
        };

        let illum = nomIllum === idx ? styleBut021 : styleBut02;

        return (
          <Grid key={idx} container sx={{ cursor: "default", fontSize: 14 }}>
            <Grid xs={1.5} item sx={styleXTG03}>
              {!flagEdit ? (
                <Button sx={illum} onClick={() => SetOpenSetStr(idx)}>
                  {idx + 1}
                </Button>
              ) : (
                <Box sx={{ p: 0.2 }}>
                  <Box sx={styleXTG101}>{idx + 1}</Box>
                </Box>
              )}
            </Grid>
            <Grid xs={3.5} item sx={styleXTG03}>
              {pointsPrioryty[0]}
            </Grid>
            <Grid xs={3.5} item sx={styleXTG03}>
              {pointsPrioryty[1]}
            </Grid>
            <Grid xs={3.5} item sx={styleXTG033}>
              {pointsPrioryty[2]}
            </Grid>
          </Grid>
        );
      }
    );
  };

  return (
    <Grid item sx={styleXTGrid}>
      <HeaderMainScrGrid3 />
      {props.open && <>{StrokaMainScrGrid3()}</>}
      {openSetStr && <> {SetStr(nomStr)}</>}
    </Grid>
  );
};

export default PointsMainScrGrid3;
