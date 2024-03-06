import * as React from "react";
import { useSelector } from "react-redux";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import PointsLevel2Baza from "./grid/PointsLevel2Baza";
import PointsLevel2Area from "./grid/PointsLevel2Area";
import PointsLevel2Calc from "./grid/PointsLevel2Calc";

import { MakeDate } from "../../AppServiceFunctions";

import { styleXTl201 } from "./grid/PointsGridStyle";
import { stylePLevel06, stylePLevel07 } from "./grid/PointsGridStyle";

import { XctrlInfo } from "../../interfaceGl.d";

// Диспеспетчер меню второго уровня (вертикального)
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
  update: boolean;
}) => {
  //== Piece of Redux =======================================
  let datestat = useSelector((state: any) => {
    const { statsaveReducer } = state;
    return statsaveReducer.datestat;
  });
  //===========================================================
  //console.log("MenuLevel2:", props.xctrll);

  props.saveXt(false);
  const xtProps = props.xtt;
  const [value, setValue] = React.useState("1");
  const [tekValue, setTekValue] = React.useState("1");

  const SetValue = (mode: string) => {
    setValue(mode);
    setTekValue(mode);
  };

  const ButtonMenu = (mode: string, soob: any) => {
    let illum = mode === tekValue ? stylePLevel06 : stylePLevel07;

    return (
      <Button sx={illum} onClick={() => SetValue(mode)}>
        <b>{soob}</b>
      </Button>
    );
  };

  const PointsMenuLevel2Menu = () => {
    return (
      <Box sx={styleXTl201}>
        {ButtonMenu("1", "Базовые")}
        {ButtonMenu("2", "Oбласти")}
        {ButtonMenu("3", "Расчёт")}
      </Box>
    );
  };

  React.useEffect(() => {
    if (datestat.xttData !== MakeDate(new Date())) setValue("3");
  }, [datestat.xttData]);

  return (
    <Box sx={{ marginTop: "-2vh", marginLeft: -3.5, marginRight: -2 }}>
      <Grid container>
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
                update={props.update}
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
                update={props.update}
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
                update={props.update}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PointsMenuLevel2;
