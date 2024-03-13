import * as React from "react";
import { useSelector } from "react-redux";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import { XctrlInfo } from "../../../interfaceGl.d";

import { MakeDate, MakeDateRus, TimeStr } from "../../../AppServiceFunctions";

import { styleXTG102, styleXTG103, styleXTGHeader } from "./PointsGridStyle";
import { styleXTG104, styleXTG105 } from "./PointsGridStyle";
import { styleXTG101 } from "../../../AppStyle";

const PointsMainScrGrid1 = (props: {
  open: boolean;
  xctrll: XctrlInfo[];
  xtt: number;
  calc: boolean;
  calcDeb: boolean;
}) => {
  //== Piece of Redux =======================================
  let datestat = useSelector((state: any) => {
    const { statsaveReducer } = state;
    return statsaveReducer.datestat;
  });
  //const dispatch = useDispatch();
  //===========================================================
  const xtProps = props.xtt;
  const points = props.xctrll[xtProps];

  let pointRec = points.results;

  if (datestat.xttData !== MakeDate(new Date())) pointRec = datestat.result;

  let resStr = [];

  MakeDateRus(MakeDate(new Date()));

  const HeaderMainScrGrid1 = () => {
    return (
      <>
        <Grid container sx={styleXTGHeader}>
          <Grid item xs={2} sx={styleXTG102}></Grid>
          <Grid item xs={3} sx={styleXTG102}>
            <b>КС на ДК</b>
          </Grid>
          <Grid item xs={3} sx={styleXTG102}>
            <b>ПК</b>
          </Grid>
          <Grid item xs={4} sx={styleXTG102}>
            <b>Качество</b>
          </Grid>
        </Grid>
        <Grid item container>
          {pointRec !== null && datestat.xttData !== MakeDate(new Date()) && (
            <Grid item xs={12} sx={styleXTG105}>
              {MakeDateRus(datestat.xttData)}
            </Grid>
          )}
        </Grid>
      </>
    );
  };

  const StrokaMainScrGrid1 = () => {
    resStr = [];

    if (pointRec !== null) {
      if (Object.keys(pointRec).length > 0) {
        for (let i = 0; i < pointRec.result.length; i++) {
          let kakchectvo = "";
          if (!pointRec.result[i].Good) kakchectvo = "н/д";
          resStr.push(
            <Grid key={i} container xs={12} item>
              <Grid xs={2} item sx={styleXTG103}>
                <Box sx={styleXTG101}>{TimeStr(pointRec.result[i].Time)}</Box>
              </Grid>
              <Grid xs={3} item sx={styleXTG103}>
                {pointRec.result[i].Value[0]}
              </Grid>
              <Grid xs={3} item sx={styleXTG103}>
                {pointRec.result[i].Value[1]}
              </Grid>
              <Grid xs={4} item sx={styleXTG103}>
                {kakchectvo}
              </Grid>
            </Grid>
          );
        }
      }
    }
    return resStr;
  };

  return (
    <Grid item sx={styleXTG104}>
      <HeaderMainScrGrid1 />
      <Box sx={{ fontSize: 14, overflowX: "auto", height: "72.5vh" }}>
        {props.open && <>{StrokaMainScrGrid1()}</>}
      </Box>
    </Grid>
  );
};

export default PointsMainScrGrid1;
