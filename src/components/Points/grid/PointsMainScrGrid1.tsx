import * as React from 'react';
import {
  //useDispatch,
  useSelector,
} from 'react-redux';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { XctrlInfo } from '../../../interfaceGl.d';

import { MakeDate, MakeDateRus, TimeStr } from '../../../AppServiceFunctions';

const PointsMainScrGrid1 = (props: {
  open: boolean;
  xctrll: XctrlInfo[];
  xtt: number;
  calc: boolean;
  calcDeb: boolean;
}) => {
  console.log('CalcDeb:', props.calcDeb);
  //== Piece of Redux =======================================
  let datestat = useSelector((state: any) => {
    const { statsaveReducer } = state;
    return statsaveReducer.datestat;
  });
  //const dispatch = useDispatch();
  //===========================================================
  const xtProps = props.xtt;
  const points = props.xctrll[xtProps];

  let pointRec = points.results;

  console.log('DATS', datestat.xttData, datestat);

  if (datestat.xttData !== MakeDate(new Date())) pointRec = datestat.result;

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
    fontSize: 14.5,
    borderRight: 0,
    borderColor: 'primary.main',
    margin: -1,
  };

  const styleXTG05 = {
    fontSize: 11,
    borderRight: 1,
    borderColor: 'primary.main',
    backgroundColor: '#E5E5E5',
    textAlign: 'center',
  };

  MakeDateRus(MakeDate(new Date()));

  const HeaderMainScrGrid1 = () => {
    return (
      <>
        <Grid container>
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
        <Grid item container>
          {pointRec !== null && datestat.xttData !== MakeDate(new Date()) && (
            <Grid item xs={12} sx={styleXTG05}>
              {MakeDateRus(datestat.xttData)}
            </Grid>
          )}
        </Grid>
      </>
    );
  };

  const StrokaMainScrGrid1 = () => {
    resStr = [];

    if (pointRec !== null) {
      if (Object.keys(pointRec).length > 0) {
        for (let i = 0; i < pointRec.result.length; i++) {
          let kakchectvo = '';
          if (!pointRec.result[i].Good) kakchectvo = 'н/д';
          resStr.push(
            <Grid key={i} container xs={12} item>
              <Grid xs={2} item sx={styleXTG03}>
                {TimeStr(pointRec.result[i].Time)}
              </Grid>
              <Grid xs={3} item sx={styleXTG03}>
                {pointRec.result[i].Value[0]}
              </Grid>
              <Grid xs={3} item sx={styleXTG03}>
                {pointRec.result[i].Value[1]}
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
      <Box sx={{ fontSize: 14, overflowX: 'auto', height: '72vh' }}>
        {props.open && <div>{StrokaMainScrGrid1()}</div>}
      </Box>
    </Grid>
  );
};

export default PointsMainScrGrid1;
