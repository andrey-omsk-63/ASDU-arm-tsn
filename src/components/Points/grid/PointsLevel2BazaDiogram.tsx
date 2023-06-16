import * as React from 'react';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { XctrlInfo } from '../../../interfaceGl.d';

let xtPropsOld = -1;
let crossRoadOld = -1;
let pointsOld: any = [];

const PointsLevel2BazaDiogram = (props: {
  xctrll: XctrlInfo[];
  xtt: number;
  crossroad: number;
}) => {
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

  const [openLoader, setOpenLoader] = React.useState(true);

  let dlMas = points.xctrls[crRoad].StrategyB.length;
  const horizon = points.xctrls[crRoad].StrategyB[dlMas - 1].xright;
  const vertical = points.xctrls[crRoad].StrategyB[dlMas - 1].xleft;
  const axisHorizon = horizon;
  const steepHorizon = 12 / axisHorizon;
  const axisVertical = vertical;
  const steepVertical = 86.4 / axisVertical;
  const dlBlok = (window.innerWidth / 12.55) * 8;

  let matrix: string[][] = [[]];

  let scale: number = 1;
  let coler = 'red';
  let colerOld = '';
  let masStr: any = [];
  let masCol: any = [];
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

    const MakeMatrix = () => {
      let ratio = 0;
      let luchP = 1;
      let luchO = 1;
      let coler = 'red';
      let i = 0;
      let j = 0;

      const MakeMatrixColor = (num: number) => {
        luchO = points.xctrls[crRoad].StrategyB[num].vleft;
        luchP = points.xctrls[crRoad].StrategyB[num].vright;
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
        return el != null; //избавляемся от пустых значений
      });
      matrix.reverse(); //переворачиваем матрицу
    };

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

    MakeMatrix();
    for (let j = 0; j < vertical; j += scale) {
      resSps.push(
        <Grid key={j} item container sx={{ border: 0 }}>
          {PointsXt112Comp1Tab4Str(j)}
        </Grid>,
      );
    }

    return resSps;
  };

  const PointInfoStr = () => {
    let resStr = [];
    let lengStrategyB = points.xctrls[crRoad].StrategyB.length;

    for (let i = 0; i < lengStrategyB; i++) {
      let vl01 = vertical / points.xctrls[crRoad].StrategyB[i].xleft;
      let mt01 = '-' + 86.3 / vl01 + 'vh';
      let hl01 = horizon / points.xctrls[crRoad].StrategyB[i].xright;
      let ml01 = dlBlok / hl01 - 73 + 'px';
      let title =
        points.xctrls[crRoad].StrategyB[i].xleft + 'x' + points.xctrls[crRoad].StrategyB[i].xright;

      const stylePointInf = {
        fontSize: 10.5,
        position: 'absolute',
        marginTop: mt01,
        marginLeft: ml01,
        textAlign: 'right',
        width: '69px',
      };

      resStr.push(
        <Grid key={i} item sx={stylePointInf}>
          <b>{title}</b>
        </Grid>,
      );
    }
    return resStr;
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
    setTimeout(() => {
      setOpenLoader(false);
    }, 100);
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

  const OutputPict = (pv: number, ph: number) => {
    const styleBox = {
      position: 'absolute',
      left: ph + '%', // 27.2
      top: pv + '%', //7.7
      width: 7,
      height: 7,
      bgcolor: 'white',
      borderRadius: 2,
    };

    return <Box sx={styleBox}></Box>;
  };

  return (
    <>
      <Grid container sx={{ position: 'relative' }}>
        {openLoader && <Dinama />}
        {!openLoader && <>{PointsXt112Comp1Tab4()}</>}
        {OutputPict(50, 20)}
        {OutputPict(50, 40)}
        {OutputPict(20, 60)}
      </Grid>
      {!openLoader && <>{PointInfoStr()}</>}
    </>
  );
};

export default PointsLevel2BazaDiogram;
