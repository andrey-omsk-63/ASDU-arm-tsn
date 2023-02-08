import * as React from "react";
import { useSelector } from "react-redux";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import PointsLevel2Baza from "./grid/PointsLevel2Baza";
import PointsLevel2Area from "./grid/PointsLevel2Area";
import PointsLevel2Calc from "./grid/PointsLevel2Calc";

import { MakeDate } from "../../AppServiceFunctions";

import { styleXTl201, styleXTl202 } from "./grid/PointsGridStyle";

import { XctrlInfo } from "../../interfaceGl.d";

const PointsMenuLevel2 = (props: {
  open: boolean;
  ws: WebSocket;
  xctrll: XctrlInfo[];
  xtt: number;
  crossroad: number;
  setPoint: Function;
  saveXt: Function;
  calc: boolean;
  calcDeb: boolean;
}) => {
  //== Piece of Redux =======================================
  let datestat = useSelector((state: any) => {
    const { statsaveReducer } = state;
    return statsaveReducer.datestat;
  });
  //===========================================================
  //console.log("MenuLevel2:", datestat.xttData);

  props.saveXt(false);
  const xtProps = props.xtt;
  const [value, setValue] = React.useState("1");

  const PointsMenuLevel2Menu = () => {
    return (
      <Box sx={styleXTl201}>
        <Stack sx={{ marginLeft: 1 }} direction="column">
          <Button
            sx={styleXTl202}
            variant="contained"
            onClick={() => setValue("1")}
          >
            <b>Базовые</b>
          </Button>
          <Button
            sx={styleXTl202}
            variant="contained"
            onClick={() => setValue("2")}
          >
            <b>Oбласти</b>
          </Button>
          <Button
            sx={styleXTl202}
            variant="contained"
            onClick={() => setValue("3")}
          >
            <b>Расчёт</b>
          </Button>
        </Stack>
      </Box>
    );
  };

  React.useEffect(() => {
    if (datestat.xttData !== MakeDate(new Date())) setValue("3");
  }, [datestat.xttData]);

  return (
    <Box sx={{ marginTop: -2, marginLeft: -3.5, marginRight: -2 }}>
      <Grid container item>
        <Grid item xs={12}>
          <Grid container item>
            <Grid item xs={0.4}>
              {datestat.xttData === MakeDate(new Date()) && (
                <PointsMenuLevel2Menu />
              )}
            </Grid>

            <Grid item xs>
              <Grid item xs={12}>
                {value === "1" && datestat.xttData === MakeDate(new Date()) && (
                  <PointsLevel2Baza
                    open={props.open}
                    ws={props.ws}
                    xctrll={props.xctrll}
                    xtt={xtProps}
                    crossroad={props.crossroad}
                    setPoint={props.setPoint}
                  />
                )}
                {value === "2" && datestat.xttData === MakeDate(new Date()) && (
                  <PointsLevel2Area
                    open={props.open}
                    ws={props.ws}
                    xctrll={props.xctrll}
                    xtt={xtProps}
                    crossroad={props.crossroad}
                    setPoint={props.setPoint}
                  />
                )}
                {value === "3" && (
                  <PointsLevel2Calc
                    open={props.open}
                    ws={props.ws}
                    xctrll={props.xctrll}
                    xtt={xtProps}
                    crossroad={props.crossroad}
                    saveXt={props.saveXt}
                    calc={props.calc}
                    calcDeb={props.calcDeb}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PointsMenuLevel2;
