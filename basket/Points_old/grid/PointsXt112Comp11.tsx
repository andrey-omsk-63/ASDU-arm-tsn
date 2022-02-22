import * as React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import { XctrlInfo } from '../../../interfaceGl.d';

const PointsXt112Comp11 = (props: { xctrll: XctrlInfo[]; xtt: number; crossroad: number }) => {
  const xtProps = props.xtt;
  const points = props.xctrll[xtProps];
  const crRoad = props.crossroad;

  const colorsGraf = [
    'orange',
    'Turquoise',
    'YellowGreen',

    'Yellow',
    'Pink',
    'Aqua',

    'Lime',
    'Tomato',
    'teal',

    'purple',
    'RosyBrown',
    'Coral',

    'Olive',
    'Magenta',
    'DarkGray',

    'RoyalBlue',
    'SpringGreen',
    'Violet',
  ];

  const styleXTG02 = {
    fontSize: 12.5,
    maxHeight: '15px',
    minHeight: '15px',
    backgroundColor: '#F1F3F4',
    color: 'black',
    marginRight: 1,
    textTransform: 'unset !important',
  };

  const [value, setValue] = React.useState(0);

  let dlMas = points.xctrls[crRoad].StrategyB.length;
  const horizon = points.xctrls[crRoad].StrategyB[dlMas - 1].xright;
  const vertical = points.xctrls[crRoad].StrategyB[dlMas - 1].xleft;
  const axisHorizon = horizon * 1;
  const steepHorizon = 12 / axisHorizon;
  const axisVertical = vertical * 1;
  const steepVertical = 84.4 / axisVertical;

  let matrix: string[][] = [[]];

  let scale: number = 5;
  let coler = 'red';
  let colerOld = '';
  let masStr = [];
  let masCol = [];
  let colBl = 0;

  const PointsXt112Comp1Tab4 = () => {
    let resStr = [];
    let resSps = [];

    if (value > 1) scale = 2;

    MakeMatrix();

    const PointsXt112Comp1Tab4Str = (j: number) => {
      resStr = [];
      coler = 'red';
      colerOld = matrix[j / scale][0 / scale];
      masStr = [];
      masCol = [];
      colBl = 0;

      for (let i = 0; i < horizon; i += scale) {
        coler = matrix[j / scale][i / scale];
        if (coler === colerOld) {
          colBl++;
        } else {
          masStr.push(colBl);
          masCol.push(colerOld);
          colBl = 1;
          colerOld = coler;
        }
      }
      masStr.push(colBl);
      masCol.push(coler);

      for (let i = 0; i < masStr.length; i++) {
        resStr.push(
          <Grid
            key={i}
            xs={steepHorizon * scale * masStr[i]}
            item
            sx={{
              backgroundColor: masCol[i],
              height: String(steepVertical * scale) + 'vh',
            }}></Grid>,
        );
      }
      return resStr;
    };

    for (let j = 0; j < vertical; j += scale) {
      resSps.push(
        <Grid key={j} item container sx={{ border: 0 }}>
          {PointsXt112Comp1Tab4Str(j)}
        </Grid>,
      );
    }
    return resSps;
  };

  const MakeMatrix = () => {
    let ratio = 0;
    let luchP = 1;
    let luchO = 1;
    let coler = 'red';
    let i = 0;
    let j = 0;

    const MakeMatrixColor = (num: number) => {
      luchP = points.xctrls[crRoad].StrategyB[num].vleft;
      luchO = points.xctrls[crRoad].StrategyB[num].vright;
      ratio =
        points.xctrls[crRoad].StrategyB[num].xright / points.xctrls[crRoad].StrategyB[num].xleft;
      coler = colorsGraf[num * 3];
      if (luchP !== 1 || luchO !== 1) {
        if (i < j * luchO * ratio) coler = colorsGraf[num * 3 + 1];
        if (i >= j * luchP * ratio) coler = colorsGraf[num * 3 + 2];
      }
    };

    for (j = 0; j < vertical; j += scale) {
      matrix[j] = [];

      for (i = 0; i < horizon; i += scale) {
        if (
          dlMas >= 1 &&
          points.xctrls[crRoad].StrategyB[0].xright >= i &&
          points.xctrls[crRoad].StrategyB[0].xleft >= j
        ) {
          MakeMatrixColor(0);
        } else {
          if (
            dlMas >= 2 &&
            points.xctrls[crRoad].StrategyB[1].xright >= i &&
            points.xctrls[crRoad].StrategyB[1].xleft >= j
          ) {
            MakeMatrixColor(1);
          } else {
            if (
              dlMas >= 3 &&
              points.xctrls[crRoad].StrategyB[2].xright >= i &&
              points.xctrls[crRoad].StrategyB[2].xleft >= j
            ) {
              MakeMatrixColor(2);
            } else {
              if (
                dlMas >= 4 &&
                points.xctrls[crRoad].StrategyB[3].xright >= i &&
                points.xctrls[crRoad].StrategyB[3].xleft >= j
              ) {
                MakeMatrixColor(3);
              } else {
                if (
                  dlMas >= 5 &&
                  points.xctrls[crRoad].StrategyB[4].xright >= i &&
                  points.xctrls[crRoad].StrategyB[4].xleft >= j
                ) {
                  MakeMatrixColor(4);
                } else {
                  if (
                    dlMas >= 6 &&
                    points.xctrls[crRoad].StrategyB[5].xright >= i &&
                    points.xctrls[crRoad].StrategyB[5].xleft >= j
                  ) {
                    MakeMatrixColor(5);
                  }
                }
              }
            }
          }
        }
        matrix[j].push(coler);
      }
    }
    matrix = matrix.filter(function (el) {
      //избавляемся от пустых значений
      return el != null;
    });
    matrix.reverse(); //переворачиваем матрицу
  };

  return (
    <Grid item container xs={12}>
      <Button sx={styleXTG02} variant="contained" onClick={() => setValue(1)}>
        <b>Построить диаграмму быстро</b>
      </Button>
      <Button sx={styleXTG02} variant="contained" onClick={() => setValue(2)}>
        <b>Диаграмма в высоком качестве</b>
      </Button>

      <>{value > 0 && <>{PointsXt112Comp1Tab4()}</>}</>
    </Grid>
  );
};

export default PointsXt112Comp11;
