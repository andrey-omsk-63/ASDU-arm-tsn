import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { maskpointCreate } from "./../../../redux/actions";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

import { Inputer, SaveFunc } from "../../../AppServiceFunctions";

import { styleXTGl02, styleXTGl021, styleBut02 } from "./PointsGridStyle";
import { styleModalEnd, styleSetInf, styleInpArg } from "./PointsGridStyle";

import { XctrlInfo } from "../../../interfaceGl.d";

let nomStr = 0;
let flagEdit = true;
let xtPropsOld = -1;

const PointsMainScrGrid2 = (props: {
  open: boolean;
  xctrll: XctrlInfo[];
  xtt: number;
  trigger: Function;
}) => {
  //== Piece of Redux =======================================
  let maskpoint = useSelector((state: any) => {
    const { maskpointReducer } = state;
    return maskpointReducer.maskpoint;
  });
  const dispatch = useDispatch();
  //===========================================================
  const xtProps = props.xtt;
  const points = maskpoint.pointForRedax;

  const [openSetStr, setOpenSetStr] = React.useState(false);
  const [valuen1, setValuen1] = React.useState(0);
  const [valuen2, setValuen2] = React.useState(0);

  if (xtPropsOld !== xtProps) {
    xtPropsOld = xtProps;
    flagEdit = true;
  } else {
    if (!maskpoint.redaxPoint && flagEdit) {
      flagEdit = false; // Start
    } else {
      if (maskpoint.redaxPoint && !flagEdit) {
        flagEdit = true; // Stop
      }
    }
  }

  const HeaderMainScrGrid2 = () => {
    return (
      <Grid item container xs={12}>
        <Grid item xs={1.5} sx={styleXTGl02}>
          <b>№</b>
        </Grid>
        <Grid item xs={5.25} sx={styleXTGl02}>
          <b>КС на ДК</b>
        </Grid>
        <Grid item xs={5.25} sx={styleXTGl021}>
          <b>ПК</b>
        </Grid>
      </Grid>
    );
  };

  const SetStr = (nom: number) => {
    const handleClose = () => {
      setOpenSetStr(false);
    };

    const handleCloseStr = () => {
      points.ext[nom][0] = valuen1;
      points.ext[nom][1] = valuen2;
      maskpoint.pointForRedax.ext[nom][0] = valuen1;
      maskpoint.pointForRedax.ext[nom][1] = valuen2;
      maskpoint.savePoint = true;
      dispatch(maskpointCreate(maskpoint));
      setOpenSetStr(false);
      props.trigger();
    };

    const handleChange1 = (event: any) => {
      let form = Number(event.target.value.trimStart()); // удаление пробелов в начале строки
      if (form) setValuen1(Math.abs(form));
    };

    const handleChange2 = (event: any) => {
      let form = Number(event.target.value.trimStart()); // удаление пробелов в начале строки
      if (form) setValuen2(Math.abs(form));
    };

    return (
      <Modal open={openSetStr} onClose={handleClose} hideBackdrop>
        <Box sx={styleSetInf}>
          <Button sx={styleModalEnd} onClick={handleClose}>
            <b>&#10006;</b>
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Номер записи <b> {nom + 1} </b>
          </Typography>{" "}
          <br />
          {Inputer("КС на ДК", valuen1, handleChange1, styleInpArg)}
          {Inputer("ПК", valuen2, handleChange2, styleInpArg)}
          {SaveFunc(handleCloseStr)}
        </Box>
      </Modal>
    );
  };

  const SetOpenSetStr = (nom: number) => {
    nomStr = nom;
    setValuen1(points.ext[nom][0]);
    setValuen2(points.ext[nom][1]);
    setOpenSetStr(true);
  };

  const StrokaMainScrGrid2 = () => {
    let resStr = [];
    for (let i = 0; i < points.ext.length; i++) {
      let bordBott = 1;
      if (i === points.ext.length - 1) bordBott = 0;
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
            {!flagEdit && (
              <Button
                sx={styleBut02}
                variant="contained"
                onClick={() => SetOpenSetStr(i)}
              >
                {i + 1}
              </Button>
            )}
            {flagEdit && <Box sx={{ p: 0.2 }}>{i + 1}</Box>}
          </Grid>
          <Grid xs={5.25} item sx={styleXTG03}>
            {points.ext[i][0]}
          </Grid>
          <Grid xs={5.25} item sx={styleXTG033}>
            {points.ext[i][1]}
          </Grid>
        </Grid>
      );
    }
    return resStr;
  };

  return (
    <Grid item sx={{ fontSize: 14.5, margin: -1 }}>
      <HeaderMainScrGrid2 />
      {props.open && <>{StrokaMainScrGrid2()}</>}
      {openSetStr && <> {SetStr(nomStr)}</>}
    </Grid>
  );
};

export default PointsMainScrGrid2;
