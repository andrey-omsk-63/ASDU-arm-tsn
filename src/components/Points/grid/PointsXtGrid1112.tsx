import * as React from 'react';
import Grid from '@mui/material/Grid';

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

const PointsXtGrid1112 = (props: {open: boolean, xctrl: Welcome1}) => {
  let resStr = [];

  const styleXTG02 = {
    borderRight: 1,
    borderBottom: 1,
    borderColor: 'primary.main',
    padding: 1,
    textAlign: 'center',
    backgroundColor: '#C0C0C0',
  };

  const styleXTG03 = {
    borderRight: 1,
    borderBottom: 1,
    borderColor: 'primary.main',
    padding: 1,
    textAlign: 'center',
  };

  const styleXTG04 = {
    borderRight: 0,
    borderColor: 'primary.main',
    margin: -1,
  };

  const HeaderPXG1112 = () => {
    return (
      <Grid item container xs={12}>
        <Grid item xs={1.5} sx={styleXTG02}>
          <b>№</b>
        </Grid>
        <Grid item xs={5.25} sx={styleXTG02}>
          <b>КС на ДК</b>
        </Grid>
        <Grid item xs={5.25} sx={styleXTG02}>
          <b>ПК</b>
        </Grid>
      </Grid>
    );
  };

  const StrokaPXG1112 = () => {
    resStr = [];

    for (let i = 0; i < props.xctrl.ext.length; i++) {
      resStr.push(
        <Grid key={Math.random()} container item xs={12}>
          <Grid key={Math.random()} xs={1.5} item sx={styleXTG03}>
            {i + 1}
          </Grid>
          <Grid key={Math.random()} xs={5.25} item sx={styleXTG03}>
            {props.xctrl.ext[i][0]}
          </Grid>
          <Grid key={Math.random()} xs={5.25} item sx={styleXTG03}>
            {props.xctrl.ext[i][1]}
          </Grid>
        </Grid>,
      );
    }
    return resStr;
  };

  return (
    <Grid item sx={styleXTG04}>
      <HeaderPXG1112 />
      {props.open && <div>{StrokaPXG1112()}</div>}
    </Grid>
  );
};

export default PointsXtGrid1112;
