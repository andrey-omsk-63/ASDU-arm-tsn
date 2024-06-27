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
import { styleXTGHeader } from "./PointsGridStyle";
import { styleXTG101 } from "../../../AppStyle";

let nomStr = 0;
let flagEdit = true;
let xtPropsOld = -1;
let nomIllum = -1;

const PointsMainScrGrid2 = (props: {
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

  if (xtPropsOld !== xtProps) {
    xtPropsOld = xtProps;
    flagEdit = true;
    nomIllum = -1;
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
      <>
        <Grid container sx={styleXTGHeader}>
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
      points.ext[nom][0] = valuen1;
      points.ext[nom][1] = valuen2;
      maskpoint.pointForRedax.ext[nom][0] = valuen1;
      maskpoint.pointForRedax.ext[nom][1] = valuen2;
      maskpoint.savePoint = true;
      dispatch(maskpointCreate(maskpoint));
      //==================================================================
      datestat.needSave = true;
      dispatch(statsaveCreate(datestat));
      //==================================================================
      setOpenSetStr(false);
      props.trigger();
    };

    const handleChange1 = (event: any) => {
      let form = Number(event.target.value.trimStart()); // удаление пробелов в начале строки
      form && setValuen1(Math.abs(form));
    };

    const handleChange2 = (event: any) => {
      let form = Number(event.target.value.trimStart()); // удаление пробелов в начале строки
      form && setValuen2(Math.abs(form));
    };

    const hBlur = () => {};

    return (
      <Modal open={openSetStr} onClose={handleClose} hideBackdrop={false}>
        <Box sx={styleSetInf}>
          <Button sx={styleModalEnd} onClick={handleClose}>
            <b>&#10006;</b>
          </Button>
          <Typography sx={{ color: "#5B1080", textAlign: "center" }}>
            Номер записи <b> {nom + 1} </b>
          </Typography>{" "}
          <br />
          {Inputer("КС на ДК", valuen1, handleChange1, hBlur, styleInpArg)}
          {Inputer("ПК", valuen2, handleChange2, hBlur, styleInpArg)}
          {SaveFunc(handleCloseStr)}
        </Box>
      </Modal>
    );
  };

  const SetOpenSetStr = (nom: number) => {
    nomStr = nom;
    nomIllum = nom;
    setValuen1(points.ext[nom][0]);
    setValuen2(points.ext[nom][1]);
    setOpenSetStr(true);
  };

  const StrokaMainScrGrid2 = () => {
    let resStr = [];
    for (let i = 0; i < points.ext.length; i++) {
      let bordBott = "1px solid #d4d4d4"; // серый
      if (i === points.ext.length - 1) bordBott = "0px solid #d4d4d4"; // серый
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

      let illum = nomIllum === i ? styleBut021 : styleBut02;

      resStr.push(
        <Grid key={i} container item xs={12} sx={{ fontSize: 14 }}>
          <Grid xs={1.5} item sx={styleXTG03}>
            {!flagEdit && (
              <Button sx={illum} onClick={() => SetOpenSetStr(i)}>
                {i + 1}
              </Button>
            )}
            {flagEdit && (
              <Box sx={{ p: 0.2 }}>
                <Box sx={styleXTG101}>{i + 1}</Box>
              </Box>
            )}
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
    <Grid item sx={styleXTGrid}>
      <HeaderMainScrGrid2 />
      {props.open && <>{StrokaMainScrGrid2()}</>}
      {openSetStr && <> {SetStr(nomStr)}</>}
    </Grid>
  );
};

export default PointsMainScrGrid2;
