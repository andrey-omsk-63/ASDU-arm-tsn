import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import PointsXt112Comp1 from './grid/PointsXt112Comp1';
import PointsXt112Comp2 from './grid/PointsXt112Comp2';
import PointsXt112Comp3 from './grid/PointsXt112Comp3';

import { XctrlInfo } from '../../interfaceGl.d';

const PointsMenuLevel02 = (props: {
  open: boolean;
  xctrll: XctrlInfo[];
  xtt: number;
  crossroad: number;
}) => {
  const xtProps = props.xtt;
  //const points = props.xctrll[xtProps];
  const [value, setValue] = React.useState('1');

  const PointsXt112Menu = () => {
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
      backgroundColor: '#F1F3F4',
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
    <Box sx={{ border: 0, marginTop: -2, marginLeft: -3.5, marginRight: -3 }}>
      <Grid container item sx={{ border: 0 }}>
        <Grid item xs={12}>
          <Grid container item>
            <Grid item xs={0.4} sx={{ border: 0 }}>
              <PointsXt112Menu />
            </Grid>

            <Grid item xs sx={{ border: 0 }}>
              <Grid item xs={12}>
                <PointsXt112Comp1
                  open={props.open}
                  xctrll={props.xctrll}
                  xtt={xtProps}
                  value={value}
                  crossroad={props.crossroad}
                />
                <PointsXt112Comp2
                  open={props.open}
                  xctrll={props.xctrll}
                  xtt={xtProps}
                  value={value}
                  crossroad={props.crossroad}
                />
                <PointsXt112Comp3
                  open={props.open}
                  xctrll={props.xctrll}
                  xtt={xtProps}
                  value={value}
                  crossroad={props.crossroad}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PointsMenuLevel02;
