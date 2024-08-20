import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { maskpointCreate, statsaveCreate } from "./../../redux/actions";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import PointsMainScrGrid1 from "./grid/PointsMainScrGrid1";
import PointsMainScrGrid2 from "./grid/PointsMainScrGrid2";
import PointsMainScrGrid3 from "./grid/PointsMainScrGrid3";

import { styleXt02, styleXt03, styleXt06 } from "./grid/PointsGridStyle";
import { styleXt04, styleXt05 } from "./grid/PointsGridStyle";

import { TimeStr, WorkMenuEditMain } from "../../AppServiceFunctions";
import { SendHandleSend } from "../../AppServiceFunctions";

import { XctrlInfo } from "../../interfaceGl.d";

let flagSave = false;
let flagEdit = true;
let flagExit = false;

let xtPropsOld = -1;

const PointsMainScr = (props: {
  open: boolean;
  ws: WebSocket;
  xctrll: XctrlInfo[];
  xtt: number;
  setPoint: Function;
  calc: boolean;
  calcDeb: boolean;
}) => {
  //== Piece of Redux ======================================
  let maskpoint = useSelector((state: any) => {
    const { maskpointReducer } = state;
    return maskpointReducer.maskpoint;
  });
  let datestat = useSelector((state: any) => {
    const { statsaveReducer } = state;
    return statsaveReducer.datestat;
  });
  //console.log("maskpoint_PointsMainScr:", maskpoint);
  const dispatch = useDispatch();
  //========================================================
  const xtProps = props.xtt;
  let pointsEt = JSON.parse(JSON.stringify(props.xctrll[xtProps]));
  const points = JSON.parse(JSON.stringify(props.xctrll[xtProps]));

  const [trigger, setTrigger] = React.useState(false);

  if (xtPropsOld !== xtProps) {
    xtPropsOld = xtProps;
    flagSave = false;
    flagEdit = true;
    flagExit = false;

    maskpoint.pointForRedax = pointsEt;
    maskpoint.newXt = false;
    maskpoint.savePoint = false;
    maskpoint.redaxPoint = true;
    dispatch(maskpointCreate(maskpoint));
  }

  let resStr1 = "Выключен";
  let resStr2 = "Выключенo";

  if (props.open) {
    if (points.switch) resStr1 = "Включён";
    if (points.release) resStr2 = "Включeнo";
  }

  let rachet = points.pkcalc > 0 ? "Расчёт выполнен" : "Расчёт не возможен";
  let yellowSoob = points.yellow.make ? "Выключен" : "Включён";

  let uprBP = "Управление по ВР";
  if (points.pknow > 0) uprBP = "Выбран план №" + points.pknow.toString();

  const HeaderMainScr = () => {
    return (
      <>
        <Grid item xs={12} sx={styleXt06}>
          Расчёт ХТ
        </Grid>
        <Grid item xs={12} sx={styleXt02}>
          <Grid container sx={{ fontSize: 15 }}>
            <Grid item xs={9.6} sx={{ border: 0 }}>
              <Box sx={{ display: "inline-block" }}>
                <b>Расчёт ХТ </b>&nbsp;
                {resStr1} &nbsp;<b> Управление</b>&nbsp;&nbsp;
                {resStr2}&nbsp;&nbsp;
                <b>Время {TimeStr(points.time)}</b>
                &nbsp;&nbsp;&nbsp;{rachet}&nbsp;&nbsp;<b>{uprBP}</b>
              </Box>
            </Grid>
            <Grid item xs={2.4} sx={{ fontSize: 14, color: "#5B1080" }}>
              <Box sx={{ textAlign: "right" }}>
                <b>{yellowSoob}</b> c <b>{TimeStr(points.yellow.start)}</b>
                {" до "}
                <b>{TimeStr(points.yellow.stop)}</b>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  };

  const StatusQuo = () => {
    xtPropsOld = -1;
    flagExit = false;
    flagEdit = true;
    maskpoint.redaxPoint = true;
    flagSave = false;
    maskpoint.savePoint = false;
    maskpoint.redaxPoint = true;
    dispatch(maskpointCreate(maskpoint));
    //==================================================================
    datestat.needSave = false;
    dispatch(statsaveCreate(datestat));
    //==================================================================
    setTrigger(!trigger);
  };

  const StartEdit = () => {
    pointsEt = points;
    flagExit = true;
    flagEdit = false;
    maskpoint.redaxPoint = false;
    maskpoint.savePoint = true;
    dispatch(maskpointCreate(maskpoint));
    //==================================================================
    //datestat.needSave = true;
    //dispatch(statsaveCreate(datestat));
    //==================================================================
    setTrigger(!trigger);
  };

  const StopEdit = () => {
    maskpoint.pointForRedax = pointsEt;
    StatusQuo();
  };

  const SaveEdit = () => {
    SendHandleSend(props.ws, maskpoint.pointForRedax); // прокидываем изменения на сервер
    props.setPoint(maskpoint.pointForRedax); // прокидываем изменения в App
    pointsEt = maskpoint.pointForRedax;
    StatusQuo();
  };

  const SetTrigger = () => {
    setTrigger(!trigger);
  };

  return (
    <>
      <Box sx={{ marginTop: -3, marginLeft: -3, marginRight: -3 }}>
        {(maskpoint.savePoint || flagSave) && datestat.needSave && (
          <>{WorkMenuEditMain(6, "Сохранить изменения", SaveEdit)}</>
        )}
        {(maskpoint.redaxPoint || flagEdit) && !datestat.needSave && (
          <>{WorkMenuEditMain(9, "Редактирование", StartEdit)}</>
        )}
        {flagExit && (
          <>{WorkMenuEditMain(9, "Выйти без cохранения", StopEdit)}</>
        )}
        <Grid container>
          {HeaderMainScr()}
          <Grid item xs={12} sx={styleXt03}>
            <Box sx={{ marginRight: -1.5 }}>
              <Grid container>
                <Grid item xs={4} sx={styleXt04}>
                  <PointsMainScrGrid1
                    open={props.open}
                    xctrll={props.xctrll}
                    xtt={xtProps}
                    calc={props.calc}
                    calcDeb={props.calcDeb}
                  />
                </Grid>
                <Grid item xs={4} sx={styleXt05}>
                  <PointsMainScrGrid2
                    open={props.open}
                    xtt={xtProps}
                    trigger={SetTrigger}
                  />
                </Grid>
                <Grid item xs sx={styleXt04}>
                  <PointsMainScrGrid3
                    open={props.open}
                    xtt={xtProps}
                    trigger={SetTrigger}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PointsMainScr;
