import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import PointsMainScrGrid1 from './grid/PointsMainScrGrid1';
import PointsMainScrGrid2 from './grid/PointsMainScrGrid2';
import PointsMainScrGrid3 from './grid/PointsMainScrGrid3';

import { XctrlInfo } from '../../interfaceGl.d';

const PointsMainScr = (props: { open: boolean; xctrll: XctrlInfo[]; xtt: number }) => {
  const xtProps = props.xtt;
  const points = props.xctrll[xtProps];

  const styleXt02 = {
    border: 1,
    borderRadius: 1,
    borderColor: 'primary.main',
    padding: 1,
    marginLeft: 0.5,
    marginRight: 1,
  };

  const styleXt03 = {
    padding: 1,
    margin: 0.5,
    marginTop: 0,
    border: 0,
  };

  const styleXt04 = {
    border: 1,
    borderRadius: 1,
    borderColor: 'primary.main',
    padding: 1,
    margin: 1,
    marginTop: -0.5,
    marginLeft: -1,
    height: '69%',
  };

  const styleXt05 = {
    border: 1,
    borderRadius: 1,
    borderColor: 'primary.main',
    padding: 1,
    margin: 1,
    marginTop: -0.5,
    marginLeft: -0.5,
    marginRight: 1.5,
    height: '69%',
  };

  const TimeStr = (tim: number) => {
    let timLiner = '';
    let hour = Math.trunc(tim / 60);
    let min = tim % 60;

    if (hour < 10) timLiner = '0';
    timLiner += hour.toString();
    timLiner += ':';
    if (min < 10) timLiner += '0';
    timLiner += min.toString();
    return timLiner;
  };

  let resStr1 = 'Выключен';
  let resStr2 = 'Выключенo';

  if (props.open) {
    if (points.switch) resStr1 = 'Включён';
    if (points.release) resStr2 = 'Включeнo';
  }

  return (
    // <Box sx={{ border: 1, marginTop: -3, marginLeft: -3, marginRight: 3 }}>
    <Box sx={{ border: 0, marginTop: -3, marginLeft: -3, marginRight: -3 }}>
      <Grid container item sx={{ margin: 0, border: 0 }}>
        <Grid item xs>
          <Grid container>
            <Grid item xs={12} sx={{ margin: 1, marginLeft: 1 }}>
              Расчёт ХТ
            </Grid>

            <Grid item xs={12} sx={styleXt02}>
              <Box sx={{ display: 'inline-block' }}>
                <b>Расчёт ХТ </b>&nbsp;
                {resStr1} &nbsp;<b> Управление</b>&nbsp;&nbsp;
                {resStr2}
                &nbsp;
                <b>
                  &nbsp; Время&nbsp;
                  {TimeStr(points.time)} &nbsp;
                </b>
                &nbsp;&nbsp;Расчёт не возможен&nbsp;&nbsp;
                <b>Управление по ВР</b>
              </Box>
            </Grid>

            <Grid item xs={12} sx={styleXt03}>
              <Grid item>
                <Box sx={{ marginRight: -1.5 }}>
                  <Grid container>
                    <Grid item xs={4} sx={styleXt04}>
                      <PointsMainScrGrid1 open={props.open} xctrll={props.xctrll} xtt={xtProps} />
                    </Grid>
                    <Grid item xs={4} sx={styleXt05}>
                      <PointsMainScrGrid2 open={props.open} xctrll={props.xctrll} xtt={xtProps} />
                    </Grid>
                    <Grid item xs sx={styleXt04}>
                      <PointsMainScrGrid3 open={props.open} xctrll={props.xctrll} xtt={xtProps} />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PointsMainScr;
