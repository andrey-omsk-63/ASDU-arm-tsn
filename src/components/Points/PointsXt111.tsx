import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import PointsXtGrid1111 from './grid/PointsXtGrid1111';
import PointsXtGrid1112 from './grid/PointsXtGrid1112';
import PointsXtGrid1114 from './grid/PointsXtGrid1114';

export interface Welcome1 {
  ext:      Array<number[]>;
  use:      boolean;
  area:     number;
  step:     number;
  time:     number;
  ltime:    number;
  pknow:    number;
  pkcalc:   number;
  pklast:   number;
  region:   number;
  status:   any[];
  switch:   boolean;
  xctrls:   Xctrl[];
  yellow:   Yellow;
  devices:  number[];
  release:  boolean;
  results:  { [key: string]: Result[] };
  subarea:  number;
  prioryty: Array<number[]>;
}

export interface Result {
  Good:  boolean;
  Time:  number;
  Value: number[];
}

export interface Xctrl {
  left:       number;
  name:       string;
  right:      number;
  status:     any[];
  StrategyA:  StrategyA[];
  StrategyB:  StrategyB[];
  Calculates: Calculate[];
}

export interface Calculate {
  id:     number;
  area:   number;
  chanL:  number[];
  chanR:  number[];
  region: number;
}

export interface StrategyA {
  pk:     number;
  desc:   string;
  xleft:  number;
  xright: number;
}

export interface StrategyB {
  pkl:    number;
  pkr:    number;
  pks:    number;
  desc:   string;
  vleft:  number;
  xleft:  number;
  vright: number;
  xright: number;
}

export interface Yellow {
  make:  boolean;
  stop:  number;
  start: number;
}

const PointsXt111 = (props: {open: boolean, xctrl: Welcome1}) => {
  const styleXt02 = {
    border: 1,
    borderRadius: 1,
    borderColor: 'primary.main',
    padding: 1,
    margin: 1,
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
    marginTop: -1.5,
    marginLeft: -0.5,
    height: '80vh',
  };

  const styleXt05 = {
    border: 1,
    borderRadius: 1,
    borderColor: 'primary.main',
    padding: 1,
    margin: 1,
    marginTop: -1.5,
    marginLeft: -0.5,
    marginRight: 1.5,
    height: '80vh',
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
    if (props.xctrl.switch) resStr1 = 'Включён';
    if (props.xctrl.release) resStr2 = 'Включeнo';
  }

  return (
    <Box sx={{ marginTop: -3, marginLeft: -3, marginRight: 3 }}>
      <Grid container item sx={{ margin: -1, border: 0 }}>
        <Grid item xs>
          <Grid container>
            <Grid item xs={12} sx={{ margin: 1, marginBottom: -1, marginLeft: 1 }}>
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
                  {TimeStr(props.xctrl.time)} &nbsp;
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
                      <PointsXtGrid1111 open={props.open} xctrl={props.xctrl} />
                    </Grid>
                    <Grid item xs={4} sx={styleXt05}>
                      <PointsXtGrid1112 open={props.open} xctrl={props.xctrl} />
                    </Grid>
                    <Grid item xs sx={styleXt04}>
                      <PointsXtGrid1114 open={props.open} xctrl={props.xctrl} />
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

export default PointsXt111;
