import * as React from 'react';
import Grid from '@mui/material/Grid';
//import Button from "@mui/material/Button";

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { XctrlInfo } from '../../../interfaceGl.d';

let xtPropsOld = -1;
let crossRoadOld = -1;
let pointsOld: any = [];

const PointsLevel2AreaDiogram = (props: {
  xctrll: XctrlInfo[];
  xtt: number;
  crossroad: number;
}) => {
  const xtProps = props.xtt;
  const points = props.xctrll[xtProps];
  const crRoad = props.crossroad;

  console.log('Пришло Graf', props.xctrll);

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

  const [openLoader, setOpenLoader] = React.useState(true);

  let dlMas = points.xctrls[crRoad].StrategyA.length;
  const horizon = points.xctrls[crRoad].right;
  const vertical = points.xctrls[crRoad].left;
  const axisHorizon = horizon * 1;
  const steepHorizon = 12 / axisHorizon;
  const axisVertical = vertical * 1;
  // const steepVertical = 84.4 / axisVertical;
  const steepVertical = 86.4 / axisVertical;
  let matrix: string[][] = [[]];
  let scale = 2;

  let coler = 'red';
  let colerOld = '';
  let masStr = [];
  let masCol = [];
  let colBl = 0;

  if (xtPropsOld !== xtProps || crossRoadOld !== crRoad || pointsOld !== points) {
    xtPropsOld = xtProps;
    crossRoadOld = crRoad;
    pointsOld = points;
    setOpenLoader(true);
  }

  const PointsXt112Comp1Tab4 = () => {
    let resStr = [];
    let resSps = [];

    MakeMatrix();

    const PointsXt112Comp1Tab4StrOptim = (j: number) => {
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
          coorPointY = points.xctrls[crRoad].StrategyA[ij].xleft;
          coorPointX = points.xctrls[crRoad].StrategyA[ij].xright;
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
        matrix[j].push(coler);
      }
    }

    matrix = matrix.filter(function (el) {
      return el != null; //избавляемся от пустых значений
    });
    matrix.reverse(); //переворачиваем матрицу
  };
  //============ Dinama =====================================================
  const handleClose = () => {
    setOpenLoader(false);
  };

  const styleBackdrop = {
    color: '#fff',
    zIndex: (theme: any) => theme.zIndex.drawer + 1,
  };

  const Output = () => {
    //React.useEffect(() => {
    setTimeout(() => {
      setOpenLoader(false);
    }, 100);
    //}, []);
  };

  const Dinama = () => {
    return (
      <Backdrop sx={styleBackdrop} open={openLoader} onClick={handleClose}>
        <CircularProgress color="inherit" size={548} />
      </Backdrop>
    );
  };
  //=========================================================================

  if (openLoader) Output();

  return (
    <Grid item container xs={12}>
      {openLoader && <Dinama />}
      {!openLoader && <>{PointsXt112Comp1Tab4()}</>}
    </Grid>
  );
};

export default PointsLevel2AreaDiogram;
