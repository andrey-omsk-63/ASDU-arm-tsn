import * as React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import PointsXt112Comp21 from './PointsXt112Comp21';

import { XctrlInfo } from '../../../interfaceGl.d';

const PointsXt112Comp2 = (props: {
  open: boolean;
  xctrll: XctrlInfo[];
  xtt: number;
  value: string;
  crossroad: number;
}) => {
  const xtProps = props.xtt;
  const points = props.xctrll[xtProps];

  const styleXTG011 = {
    fontSize: 11,
    borderBottom: 1,
    borderColor: 'primary.main',
    padding: 0.2,
    textAlign: 'center',
  };

  const styleXTG01 = {
    fontSize: 11,
    borderRight: 1,
    borderBottom: 1,
    borderColor: 'primary.main',
    padding: 0.2,
    textAlign: 'center',
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
    border: 1,
    height: '86.5vh',
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

  const PointsXt112Comp2Tab1Header = () => {
    return (
      <Grid container item xs={12}>
        <Grid xs={2} item sx={styleXTG02}>
          <b>КС</b>
        </Grid>
        <Grid xs={3} item sx={styleXTG02}>
          <b>Прямой</b>
        </Grid>
        <Grid xs={3.5} item sx={styleXTG02}>
          <b>Обратный</b>
        </Grid>
        <Grid xs={3.5} item sx={styleXTG02}>
          <b>Описание</b>
        </Grid>
      </Grid>
    );
  };

  const PointsXt112Comp2Tab1Stroka = () => {
    let resStr = [];

    for (let i = 0; i < points.xctrls[props.crossroad].StrategyA.length; i++) {
      resStr.push(
        <Grid key={Math.random()} container item xs={12}>
          <Grid key={Math.random()} xs={2} item sx={styleXTG01}>
            {points.xctrls[props.crossroad].StrategyA[i].pk}
          </Grid>
          <Grid key={Math.random()} xs={3} item sx={styleXTG01}>
            {points.xctrls[props.crossroad].StrategyA[i].xleft}
          </Grid>
          <Grid key={Math.random()} xs={3.5} item sx={styleXTG01}>
            {points.xctrls[props.crossroad].StrategyA[i].xright}
          </Grid>

          <Grid key={Math.random()} xs={3.5} item sx={styleXTG011}>
            {points.xctrls[props.crossroad].StrategyA[i].desc}
          </Grid>
        </Grid>,
      );
    }
    return resStr;
  };

  return (
    <>
      {props.value === '2' && (
        <Stack direction="row">
          <Grid item xs={3} sx={{ height: '86.5vh', border: 0 }}>
            <Grid container>
              <Grid item xs={12} sx={styleXTG03}>
                <PointsXt112Comp2Tab1Header />
                {PointsXt112Comp2Tab1Stroka()}
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs sx={styleXTG04}>
            <Grid container>
              <PointsXt112Comp21 xctrll={props.xctrll} xtt={xtProps} crossroad={props.crossroad} />
            </Grid>
          </Grid>
        </Stack>
      )}
    </>
  );
};

export default PointsXt112Comp2;
