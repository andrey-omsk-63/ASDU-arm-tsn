import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import PointsLevel2BazaDiogram from './PointsLevel2BazaDiogram';

import { XctrlInfo } from '../../../interfaceGl.d';

const PointsLevel2Baza = (props: {
  open: boolean;
  xctrll: XctrlInfo[];
  xtt: number;
  value: string;
  crossroad: number;
}) => {
  const xtProps = props.xtt;
  const points = props.xctrll[xtProps];

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
    height: '86.5vh',
    border: 1,
    marginLeft: 0.5,
    borderRadius: 1,
    borderColor: 'primary.main',
  };

  const PointsLevel2BazaTab1 = () => {
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
                {/* <p> 950:439</p> */}
              </Box>
            </Grid>
            <Grid item xs sx={{ marginTop: 0, border: 0 }}>
              <Box sx={{ marginTop: 0.5, fontSize: 11, border: 0 }}>
                <div>{points.xctrls[props.crossroad].name}</div>
                <p>{points.xctrls[props.crossroad].left}</p>
                <div>{points.xctrls[props.crossroad].right}</div>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const PointsLevel2BazaTab2Header = () => {
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

  const PointsLevel2BazaTab2Stroka = () => {
    let resStr = [];

    for (let i = 0; i < points.xctrls[props.crossroad].StrategyB.length; i++) {
      resStr.push(
        <Grid key={Math.random()} container item xs={12}>
          <Grid key={Math.random()} xs={0.5} item sx={styleXTG01}>
            {i}
          </Grid>
          <Grid key={Math.random()} xs={2} item sx={styleXTG01}>
            {points.xctrls[props.crossroad].StrategyB[i].xleft}
          </Grid>
          <Grid key={Math.random()} xs={2} item sx={styleXTG01}>
            {points.xctrls[props.crossroad].StrategyB[i].xright}
          </Grid>
          <Grid key={Math.random()} xs={1} item sx={styleXTG01}>
            {points.xctrls[props.crossroad].StrategyB[i].pkl}
          </Grid>
          <Grid key={Math.random()} xs={1} item sx={styleXTG01}>
            {points.xctrls[props.crossroad].StrategyB[i].pks}
          </Grid>
          <Grid key={Math.random()} xs={1} item sx={styleXTG01}>
            {points.xctrls[props.crossroad].StrategyB[i].pkr}
          </Grid>
          <Grid key={Math.random()} xs={1} item sx={styleXTG01}>
            {points.xctrls[props.crossroad].StrategyB[i].vleft}
          </Grid>
          <Grid key={Math.random()} xs={1} item sx={styleXTG01}>
            {points.xctrls[props.crossroad].StrategyB[i].vright}
          </Grid>
          <Grid key={Math.random()} xs={2.5} item sx={styleXTG00}>
            {points.xctrls[props.crossroad].StrategyB[i].desc}
          </Grid>
        </Grid>,
      );
    }
    return resStr;
  };

  const PointsLevel2BazaTab3Header = () => {
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

  const PointsLevel2BazaTab3Stroka = () => {
    let resStr = [];

    for (let i = 0; i < points.xctrls[props.crossroad].Calculates.length; i++) {
      resStr.push(
        <Grid key={Math.random()} container item xs={12}>
          <Grid container item xs={12}>
            <Grid key={Math.random()} xs={0.5} item sx={styleXTG01}>
              {i}
            </Grid>
            <Grid key={Math.random()} xs={1.75} item sx={styleXTG01}>
              {points.xctrls[props.crossroad].Calculates[i].region}
            </Grid>
            <Grid key={Math.random()} xs={1.75} item sx={styleXTG01}>
              {points.xctrls[props.crossroad].Calculates[i].area}
            </Grid>
            <Grid key={Math.random()} xs={2} item sx={styleXTG01}>
              {points.xctrls[props.crossroad].Calculates[i].id}
            </Grid>
            <Grid key={Math.random()} xs={3} item sx={styleXTG01}>
              {points.xctrls[props.crossroad].Calculates[i].chanL[0]}
            </Grid>
            <Grid key={Math.random()} xs={3} item sx={styleXTG00}>
              {points.xctrls[props.crossroad].Calculates[i].chanR[0]}
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
            <PointsLevel2BazaTab1 />
            <Grid container>
              <Grid item xs={12} sx={styleXTG03}>
                <PointsLevel2BazaTab2Header />
                {PointsLevel2BazaTab2Stroka()}
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} sx={styleXTG03}>
                <PointsLevel2BazaTab3Header />
                {PointsLevel2BazaTab3Stroka()}
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs sx={styleXTG04}>
            <Grid container>
              <PointsLevel2BazaDiogram
                xctrll={props.xctrll}
                xtt={xtProps}
                crossroad={props.crossroad}
              />
            </Grid>
          </Grid>
        </Stack>
      )}
    </div>
  );
};

export default PointsLevel2Baza;
