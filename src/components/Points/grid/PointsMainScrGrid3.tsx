import * as React from 'react';
import Grid from '@mui/material/Grid';

import { XctrlInfo } from '../../../interfaceGl.d';

const PointsMainScrGrid3 = (props: { open: boolean; xctrll: XctrlInfo[]; xtt: number }) => {
  const xtProps = props.xtt;
  const points = props.xctrll[xtProps];
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

  const HeaderMainScrGrid3 = () => {
    return (
      <Grid container item xs={12}>
        <Grid xs={1.5} item sx={styleXTG02}>
          <b>№</b>
        </Grid>
        <Grid xs={3.5} item sx={styleXTG02}>
          <b>0</b>
        </Grid>
        <Grid xs={3.5} item sx={styleXTG02}>
          <b>1</b>
        </Grid>
        <Grid xs={3.5} item sx={styleXTG02}>
          <b>2</b>
        </Grid>
      </Grid>
    );
  };

  const StrokaMainScrGrid3 = () => {
    resStr = [];

    for (let i = 0; i < points.prioryty.length; i++) {
      resStr.push(
        <Grid key={Math.random()} container item xs={12}>
          <Grid key={Math.random()} xs={1.5} item sx={styleXTG03}>
            {i + 1}
          </Grid>
          <Grid key={Math.random()} xs={3.5} item sx={styleXTG03}>
            {points.prioryty[i][0]}
          </Grid>
          <Grid key={Math.random()} xs={3.5} item sx={styleXTG03}>
            {points.prioryty[i][1]}
          </Grid>
          <Grid key={Math.random()} xs={3.5} item sx={styleXTG03}>
            {points.prioryty[i][2]}
          </Grid>
        </Grid>,
      );
    }
    return resStr;
  };

  return (
    <Grid key={Math.random()} item sx={styleXTG04}>
      <HeaderMainScrGrid3 />
      {props.open && <div>{StrokaMainScrGrid3()}</div>}
    </Grid>
  );
};

export default PointsMainScrGrid3;
