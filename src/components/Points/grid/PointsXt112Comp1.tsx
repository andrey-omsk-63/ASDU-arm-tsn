import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import PointsXt112Comp11 from './PointsXt112Comp11';

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

const PointsXt112Comp1 = (props: {open: boolean, xctrl: Welcome1, value: string, crossroad: number}) => {
  const styleXTG00 = {
    fontSize: 11,
    borderBottom: 1,
    borderColor: 'primary.main',
    padding: 0.3,
    textAlign: 'center',
  };

  const styleXTG01 = {
    fontSize: 11,
    borderRight: 1,
    borderBottom: 1,
    borderColor: 'primary.main',
    padding: 0.3,
    textAlign: 'center',
  };

  const styleXTG021 = {
    fontSize: 11,
    //borderRight: 1,
    borderBottom: 1,
    borderColor: 'primary.main',
    padding: 0.2,
    textAlign: 'center',
    backgroundColor: '#C0C0C0',
  };

  const styleXTG02 = {
    fontSize: 11,
    borderRight: 1,
    borderBottom: 1,
    borderColor: 'primary.main',
    padding: 0.2,
    textAlign: 'center',
    backgroundColor: '#C0C0C0',
  };

  const styleXTG03 = {
    marginTop: 0.5,
    border: 1,
    height: '35.5vh',
    borderRadius: 1,
    borderColor: 'primary.main',
  };

  const styleXTG04 = {
    //height: '84.4vh',
    border: 1,
    marginLeft: 0.5,
    borderRadius: 1,
    borderColor: 'primary.main',
  };

  const PointsXt112Comp1Tab1 = () => {
    return (
      <Grid container sx={{ height: '14.5vh' }}>
        <Grid item xs={12} sx={{ border: 0 }}>
          <Grid container item>
            <Grid item xs={5.5} sx={{ marginTop: 0, border: 0 }}>
              <Box sx={{ fontSize: 11, marginLeft: 1, marginTop: 0.5, border: 0 }}>
                <div>
                  <b>Наименование ХТ</b>
                </div>
                <p>
                  <b>Максимум прямого</b>
                </p>
                <div>
                  <b>Максимум обратного</b>
                </div>
                <p> 950:439</p>
              </Box>
            </Grid>
            <Grid item xs sx={{ marginTop: 0, border: 0 }}>
              <Box sx={{ marginTop: 0.5, fontSize: 11, border: 0 }}>
                <div>{props.xctrl.xctrls[props.crossroad].name}</div>
                <p>{props.xctrl.xctrls[props.crossroad].left}</p>
                <div>{props.xctrl.xctrls[props.crossroad].right}</div>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const PointsXt112Comp1Tab2Header = () => {
    return (
      <Grid container item xs={12}>
        <Grid xs={0.5} item sx={styleXTG02}></Grid>
        <Grid xs={2} item sx={styleXTG02}>
          <b>Прямой</b>
        </Grid>
        <Grid xs={2} item sx={styleXTG02}>
          <b>Обратный</b>
        </Grid>
        <Grid xs={1} item sx={styleXTG02}>
          <b>КСП</b>
        </Grid>
        <Grid xs={1} item sx={styleXTG02}>
          <b>КСС</b>
        </Grid>
        <Grid xs={1} item sx={styleXTG02}>
          <b>КСО</b>
        </Grid>
        <Grid xs={1} item sx={styleXTG02}>
          <b>Луч П</b>
        </Grid>
        <Grid xs={1} item sx={styleXTG02}>
          <b>Луч О</b>
        </Grid>
        <Grid xs={2.5} item sx={styleXTG021}>
          <b>Описание</b>
        </Grid>
      </Grid>
    );
  };

  const PointsXt112Comp1Tab2Stroka = () => {
    let resStr = [];

    for (let i = 0; i < props.xctrl.xctrls[props.crossroad].StrategyB.length; i++) {
      resStr.push(
        <Grid key={Math.random()} container item xs={12}>
          <Grid key={Math.random()} xs={0.5} item sx={styleXTG01}>
            {i}
          </Grid>
          <Grid key={Math.random()} xs={2} item sx={styleXTG01}>
            {props.xctrl.xctrls[props.crossroad].StrategyB[i].xleft}
          </Grid>
          <Grid key={Math.random()} xs={2} item sx={styleXTG01}>
            {props.xctrl.xctrls[props.crossroad].StrategyB[i].xright}
          </Grid>
          <Grid key={Math.random()} xs={1} item sx={styleXTG01}>
            {props.xctrl.xctrls[props.crossroad].StrategyB[i].pkl}
          </Grid>
          <Grid key={Math.random()} xs={1} item sx={styleXTG01}>
            {props.xctrl.xctrls[props.crossroad].StrategyB[i].pks}
          </Grid>
          <Grid key={Math.random()} xs={1} item sx={styleXTG01}>
            {props.xctrl.xctrls[props.crossroad].StrategyB[i].pkr}
          </Grid>
          <Grid key={Math.random()} xs={1} item sx={styleXTG01}>
            {props.xctrl.xctrls[props.crossroad].StrategyB[i].vleft}
          </Grid>
          <Grid key={Math.random()} xs={1} item sx={styleXTG01}>
            {props.xctrl.xctrls[props.crossroad].StrategyB[i].vright}
          </Grid>
          <Grid key={Math.random()} xs={2.5} item sx={styleXTG00}>
            {props.xctrl.xctrls[props.crossroad].StrategyB[i].desc}
          </Grid>
        </Grid>,
      );
    }
    return resStr;
  };

  const PointsXt112Comp1Tab3Header = () => {
    return (
      <Grid container item xs={12}>
        <Grid xs={0.5} item sx={styleXTG02}></Grid>
        <Grid xs={1.75} item sx={styleXTG02}>
          <b>Регион</b>
        </Grid>
        <Grid xs={1.75} item sx={styleXTG02}>
          <b>Район</b>
        </Grid>
        <Grid xs={2} item sx={styleXTG02}>
          <b>Перекрёсток</b>
        </Grid>
        <Grid xs={3} item sx={styleXTG02}>
          <b>Номера каналов прямого</b>
        </Grid>
        <Grid xs={3} item sx={styleXTG021}>
          <b>Номера каналов обратного</b>
        </Grid>
      </Grid>
    );
  };

  const PointsXt112Comp1Tab3Stroka = () => {
    let resStr = [];

    for (let i = 0; i < props.xctrl.xctrls[props.crossroad].Calculates.length; i++) {
      resStr.push(
        <Grid key={Math.random()} container item xs={12}>
          <Grid container item xs={12}>
            <Grid key={Math.random()} xs={0.5} item sx={styleXTG01}>
              {i}
            </Grid>
            <Grid key={Math.random()} xs={1.75} item sx={styleXTG01}>
              {props.xctrl.xctrls[props.crossroad].Calculates[i].region}
            </Grid>
            <Grid key={Math.random()} xs={1.75} item sx={styleXTG01}>
              {props.xctrl.xctrls[props.crossroad].Calculates[i].area}
            </Grid>
            <Grid key={Math.random()} xs={2} item sx={styleXTG01}>
              {props.xctrl.xctrls[props.crossroad].Calculates[i].id}
            </Grid>
            <Grid key={Math.random()} xs={3} item sx={styleXTG01}>
              {props.xctrl.xctrls[props.crossroad].Calculates[i].chanL[0]}
            </Grid>
            <Grid key={Math.random()} xs={3} item sx={styleXTG00}>
              {props.xctrl.xctrls[props.crossroad].Calculates[i].chanR[0]}
            </Grid>
          </Grid>
        </Grid>,
      );
    }
    return resStr;
  };

  return (
    <div>
      {props.value === '1' && (
        <Stack direction="row">
          <Grid item xs={4} sx={{ height: '86.5vh', border: 0 }}>
            <PointsXt112Comp1Tab1 />
            <Grid container>
              <Grid item xs={12} sx={styleXTG03}>
                <PointsXt112Comp1Tab2Header />
                {PointsXt112Comp1Tab2Stroka()}
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} sx={styleXTG03}>
                <PointsXt112Comp1Tab3Header />
                {PointsXt112Comp1Tab3Stroka()}
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs sx={styleXTG04}>
            <Grid container>
              <PointsXt112Comp11 xctrl={props.xctrl} crossroad={props.crossroad} />
            </Grid>
          </Grid>
        </Stack>
      )}
    </div>
  );
};

export default PointsXt112Comp1;
