import * as React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

export interface Welcome1 {
  ext: Array<number[]>;
  use: boolean;
  area: number;
  step: number;
  time: number;
  ltime: number;
  pknow: number;
  pkcalc: number;
  pklast: number;
  region: number;
  status: any[];
  switch: boolean;
  xctrls: Xctrl[];
  yellow: Yellow;
  devices: number[];
  release: boolean;
  results: { [key: string]: Result[] };
  subarea: number;
  prioryty: Array<number[]>;
}

export interface Result {
  Good: boolean;
  Time: number;
  Value: number[];
}

export interface Xctrl {
  left: number;
  name: string;
  right: number;
  status: any[];
  StrategyA: StrategyA[];
  StrategyB: StrategyB[];
  Calculates: Calculate[];
}

export interface Calculate {
  id: number;
  area: number;
  chanL: number[];
  chanR: number[];
  region: number;
}

export interface StrategyA {
  pk: number;
  desc: string;
  xleft: number;
  xright: number;
}

export interface StrategyB {
  pkl: number;
  pkr: number;
  pks: number;
  desc: string;
  vleft: number;
  xleft: number;
  vright: number;
  xright: number;
}

export interface Yellow {
  make: boolean;
  stop: number;
  start: number;
}

const PointsXt112Comp21 = (props: { xctrl: Welcome1; crossroad: number }) => {
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
    fontSize: 11,
    maxHeight: '15px',
    minHeight: '15px',
    backgroundColor: '#F1F3F4',
    color: 'black',
    marginRight: 1,
  };

  const [value, setValue] = React.useState(0);

  let dlMas = props.xctrl.xctrls[crRoad].StrategyA.length;
  const horizon = props.xctrl.xctrls[crRoad].right;
  const vertical = props.xctrl.xctrls[crRoad].left;
  const axisHorizon = horizon * 1;
  const steepHorizon = 12 / axisHorizon;
  const axisVertical = vertical * 1;
  const steepVertical = 84.4 / axisVertical;
  let matrix: string[][] = [[]];
  let scale = 5;

  let coler = 'red';
  //let colerOld = [];
  let colerOld = '';
  let masStr = [];
  let masCol = [];
  let colBl = 0;

  const PointsXt112Comp1Tab4 = () => {
    let resStr = [];
    let resSps = [];

    if (value > 1) scale = 2;

    MakeMatrix();

    const PointsXt112Comp1Tab4StrOptim = (j:number) => {
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
        <Grid key={j} item container>
          {PointsXt112Comp1Tab4StrOptim(j)}
        </Grid>,
      );
    }
    return resSps;
  };

  const MakeMatrix = () => {
    let coler = 'white';

    let coorPointX = 0;
    let coorPointY = 0;

    for (let j = 0; j < vertical; j += scale) {
      matrix[j] = [];

      for (let i = 0; i < horizon; i += scale) {
        coler = 'LightCyan';
        let mass = [];
        let flag = true;

        for (let ij = 0; ij < dlMas; ij++) {
          coorPointY = props.xctrl.xctrls[crRoad].StrategyA[ij].xleft;
          coorPointX = props.xctrl.xctrls[crRoad].StrategyA[ij].xright;
          if (coorPointY === j && coorPointX === i) {
            coler = 'black';
            flag = false;
          }
          let kvx = (i - coorPointX) ** 2;
          let kvy = (j - coorPointY) ** 2;
          mass.push(kvx + kvy);
        }
        if (flag) {
          coler = colorsGraf[mass.indexOf(Math.min.apply(null, mass))];
        }
        // if (coler === 'black' && scale === 2) {
        //   matrix[j].push(coler);
        // }
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

export default PointsXt112Comp21;
