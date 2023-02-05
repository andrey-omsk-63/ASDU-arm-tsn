import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import PointsLevel2Baza from './grid/PointsLevel2Baza';
import PointsLevel2Area from './grid/PointsLevel2Area';
import PointsLevel2Calc from './grid/PointsLevel2Calc';

import { XctrlInfo } from '../../interfaceGl.d';

const PointsMenuLevel2 = (props: {
  open: boolean;
  ws: WebSocket;
  xctrll: XctrlInfo[];
  xtt: number;
  crossroad: number;
  setPoint: Function;
  saveXt: Function;
  calc: boolean;
  calcDeb: boolean;
}) => {
  props.saveXt(false);
  const xtProps = props.xtt;
  const [value, setValue] = React.useState('1');

  const PointsMenuLevel2Menu = () => {
    const styleXTG01 = {
      width: '70%',
      height: '84vh',
      marginTop: 2.5,
      marginLeft: -3,
      marginRight: -61,
      border: 0,
    };

    const styleXTG02 = {
      fontSize: 12.5,
      maxHeight: '21px',
      minHeight: '21px',
      transform: 'rotate(270deg)',
      backgroundColor: '#E9F5D8',
      color: 'black',
      marginBottom: 6.5,
      textTransform: 'unset !important',
    };

    return (
      <Box sx={styleXTG01}>
        <Stack sx={{ marginLeft: 1 }} direction="column">
          <Button sx={styleXTG02} variant="contained" onClick={() => setValue('1')}>
            <b>Базовые</b>
          </Button>
          <Button sx={styleXTG02} variant="contained" onClick={() => setValue('2')}>
            <b>Oбласти</b>
          </Button>
          <Button sx={styleXTG02} variant="contained" onClick={() => setValue('3')}>
            <b>Расчёт</b>
          </Button>
        </Stack>
      </Box>
    );
  };

  return (
    <Box sx={{ marginTop: -2, marginLeft: -3.5, marginRight: -2 }}>
      <Grid container item>
        <Grid item xs={12}>
          <Grid container item>
            <Grid item xs={0.4}>
              <PointsMenuLevel2Menu />
            </Grid>

            <Grid item xs>
              <Grid item xs={12}>
                {value === '1' && (
                  <PointsLevel2Baza
                    open={props.open}
                    ws={props.ws}
                    xctrll={props.xctrll}
                    xtt={xtProps}
                    crossroad={props.crossroad}
                    setPoint={props.setPoint}
                  />
                )}
                {value === '2' && (
                  <PointsLevel2Area
                    open={props.open}
                    ws={props.ws}
                    xctrll={props.xctrll}
                    xtt={xtProps}
                    crossroad={props.crossroad}
                    setPoint={props.setPoint}
                  />
                )}
                {value === '3' && (
                  <PointsLevel2Calc
                    open={props.open}
                    xctrll={props.xctrll}
                    xtt={xtProps}
                    crossroad={props.crossroad}
                    saveXt={props.saveXt}
                    calc={props.calc}
                    calcDeb={props.calcDeb}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PointsMenuLevel2;
