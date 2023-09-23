import * as React from 'react';
import { useSelector } from 'react-redux';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import PointsLevel2Baza from './grid/PointsLevel2Baza';
import PointsLevel2Area from './grid/PointsLevel2Area';
import PointsLevel2Calc from './grid/PointsLevel2Calc';

import { MakeDate } from '../../AppServiceFunctions';

import {
  styleXTl201,
  //styleXTl202
} from './grid/PointsGridStyle';

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
  //== Piece of Redux =======================================
  let datestat = useSelector((state: any) => {
    const { statsaveReducer } = state;
    return statsaveReducer.datestat;
  });
  //===========================================================
  //console.log("MenuLevel2:", datestat.xttData);

  props.saveXt(false);
  const xtProps = props.xtt;
  const [value, setValue] = React.useState('1');
  const [tekValue, setTekValue] = React.useState('1');

  const SetValue = (mode: string) => {
    setValue(mode);
    setTekValue(mode);
  };

  const ButtonMenu = (mode: string, soob: any) => {
    const styleXTl202 = {
      fontSize: 12.5,
      maxHeight: '21px',
      minHeight: '21px',
      transform: 'rotate(270deg)',
      bgcolor: '#BAE186', // тёмно-салатовый
      border: '1px solid #000',
      borderColor: '#93D145', // ярко-салатовый
      borderRadius: 1,
      boxShadow: 6,
      color: 'black',
      marginBottom: 6.5,
      textTransform: 'unset !important',
    };

    const styleXTl203 = {
      fontSize: 12.5,
      maxHeight: '21px',
      minHeight: '21px',
      transform: 'rotate(270deg)',
      bgcolor: '#E6F5D6', // светло-салатовый
      border: '1px solid #000',
      borderColor: '#d4d4d4', // серый
      borderRadius: 1,
      boxShadow: 2,
      color: 'black',
      marginBottom: 6.5,
      textTransform: 'unset !important',
    };

    let illum = mode === tekValue ? styleXTl202 : styleXTl203;

    return (
      <Button sx={illum} onClick={() => SetValue(mode)}>
        <b>{soob}</b>
      </Button>
    );
  };

  const PointsMenuLevel2Menu = () => {
    return (
      <Box sx={styleXTl201}>
        <Stack sx={{ marginLeft: 1 }} direction="column">
          {ButtonMenu('1', 'Базовые')}
          {ButtonMenu('2', 'Oбласти')}
          {ButtonMenu('3', 'Расчёт')}
        </Stack>
      </Box>
    );
  };

  React.useEffect(() => {
    if (datestat.xttData !== MakeDate(new Date())) setValue('3');
  }, [datestat.xttData]);

  return (
    <Box sx={{ marginTop: '-2vh', marginLeft: -3.5, marginRight: -2 }}>
      <Grid container item>
        <Grid item xs={0.4}>
          {datestat.xttData === MakeDate(new Date()) && <PointsMenuLevel2Menu />}
        </Grid>

        <Grid item xs>
          <Grid item xs={12}>
            {value === '1' && datestat.xttData === MakeDate(new Date()) && (
              <PointsLevel2Baza
                open={props.open}
                ws={props.ws}
                xctrll={props.xctrll}
                xtt={xtProps}
                crossroad={props.crossroad}
                setPoint={props.setPoint}
              />
            )}
            {value === '2' && datestat.xttData === MakeDate(new Date()) && (
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
                ws={props.ws}
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
    </Box>
  );
};

export default PointsMenuLevel2;
