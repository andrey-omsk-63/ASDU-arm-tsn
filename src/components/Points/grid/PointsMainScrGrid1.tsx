import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { XctrlInfo } from '../../../interfaceGl.d';

const PointsMainScrGrid1 = (props: { open: boolean; xctrll: XctrlInfo[]; xtt: number }) => {

  const xtProps = props.xtt;
  const points = props.xctrll[xtProps];
  let resStr = [];

  const styleXTG02 = {
    borderRight: 1,
    borderBottom: 1,
    borderColor: 'primary.main',
    padding: 0.7,
    textAlign: 'center',
    backgroundColor: '#C0C0C0',
  };

  const styleXTG03 = {
    borderRight: 1,
    borderBottom: 1,
    borderColor: 'primary.main',
    padding: 0.7,
    textAlign: 'center',
  };

  const styleXTG04 = {
    borderRight: 0,
    borderColor: 'primary.main',
    margin: -1,
  };

  const HeaderMainScrGrid1 = () => {
    return (
      <Grid item container xs={12}>
        <Grid item xs={2} sx={styleXTG02}></Grid>
        <Grid item xs={3} sx={styleXTG02}>
          <b>КС на ДК</b>
        </Grid>
        <Grid item xs={3} sx={styleXTG02}>
          <b>ПК</b>
        </Grid>
        <Grid item xs={4} sx={styleXTG02}>
          <b>Качество</b>
        </Grid>
      </Grid>
    );
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

  const StrokaMainScrGrid1 = () => {
    resStr = [];
    
    if (points.results !== null) {
      if (Object.keys(points.results).length > 0) {
        for (let i = 0; i < points.results.result.length; i++) {
          let kakchectvo = '';
          if (!points.results.result[i].Good) kakchectvo = 'н/д';
          resStr.push(
            <Grid key={i} container xs={12} item>
              <Grid xs={2} item sx={styleXTG03}>
                {TimeStr(points.results.result[i].Time)}
              </Grid>
              <Grid xs={3} item sx={styleXTG03}>
                {points.results.result[i].Value[0]}
              </Grid>
              <Grid xs={3} item sx={styleXTG03}>
                {points.results.result[i].Value[1]}
              </Grid>
              <Grid xs={4} item sx={styleXTG03}>
                {kakchectvo}
              </Grid>
            </Grid>,
          );
        }
      }
    }

    return resStr;
  };

  return (
    <Grid item sx={styleXTG04}>
      <Box sx={{ marginRight: 0.74, border: 0 }}>
        <HeaderMainScrGrid1 />
      </Box>
      <Box sx={{ overflowX: 'auto', height: '73vh' }}>
        {props.open && <div>{StrokaMainScrGrid1()}</div>}
      </Box>
    </Grid>
  );
};

export default PointsMainScrGrid1;
