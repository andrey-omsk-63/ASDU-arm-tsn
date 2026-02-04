import * as React from "react";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { OutputPict, PictInfoBox } from "../../../AppServiceFunctions";

import { PointInfoStrStyle, PointInfoDirStyle } from "./PointsGridStyle";
import { PointInfoDirRotStyle, styleBackdropBaza } from "./PointsGridStyle";

import { XctrlInfo } from "../../../interfaceGl.d";

let xtPropsOld = -1;
let crossRoadOld = -1;
let pointsOld: any = [];

let phGl = -1;
let pvGl = -1;
let IDX = -1;
let massRatio: Array<number> = [];
let pictinfo = false;

const PointsLevel2BazaDiogram = (props: {
  xctrll: XctrlInfo[];
  xtt: number;
  crossroad: number;
  update: boolean;
}) => {
  const points = props.xctrll[props.xtt];
  const crRoad = props.crossroad;
  //const pointsXctrls = points.xctrls[crRoad];
  const namer = points.xctrls[crRoad].name;
  const pointer = points.results;

  const colorsGraf = [
    "#d6bf36", // хаки
    "Turquoise", // бирюзовый
    "#c0de7c", // средне зелёный

    "#e1e69d", // салатовый
    "#ffd5dc", // розовый
    "#ceffff", // светло голубой

    "#badbad", // светло зелёный
    "#d8aa9e", // светло кирпичный
    "#c5c6ff", // светло фиолетовый/голубой

    "#cd9eca", // светло фиолетовый
    "#c8a1a1", // розово-коричневый
    "#ffadba", // красно розовый

    "Olive",
    "Magenta",
    "DarkGray",

    "RoyalBlue",
    "SpringGreen",
    "Violet",
  ];

  const [openLoader, setOpenLoader] = React.useState(false);

  let dlMas = points.xctrls[crRoad].StrategyB.length;
  const horizonLimit = points.xctrls[crRoad].StrategyB[dlMas - 1].xright;
  const verticalLimit = points.xctrls[crRoad].StrategyB[dlMas - 1].xleft;
  const horizon = points.xctrls[crRoad].right;
  const vertical = points.xctrls[crRoad].left;

  const steepHorizon = 12 / horizon;
  const steepVertical = 85.9 / vertical;
  const dlBlok = (window.innerWidth / 12.55) * 8;

  let matrix: string[][] = [[]];
  let scale = horizon > 999 || vertical > 999 ? 4 : 1;
  let coler = "red";
  let colerOld = "";
  let masStr: any = [];
  let masCol: any = [];
  let colBl = 0;

  massRatio = [];
  for (let i = 0; i < dlMas; i++) {
    let vert = points.xctrls[crRoad].StrategyB[i].xleft; // прямое
    let hor = points.xctrls[crRoad].StrategyB[i].xright; // обратное
    massRatio.push(vert / hor);
  }

  if (
    xtPropsOld !== props.xtt ||
    crossRoadOld !== crRoad ||
    pointsOld !== points
  ) {
    xtPropsOld = props.xtt;
    crossRoadOld = crRoad;
    pointsOld = points;
    setOpenLoader(true);
    pictinfo = false;
  }

  const [pictInfo, setPictInfo] = React.useState(pictinfo);

  const MakeMatrix = () => {
    let ratio = 0;
    let luchP = 1;
    let luchO = 1;
    let coler = "red";
    let pStB = points.xctrls[crRoad].StrategyB;

    const MakeMatrixColor = (num: number, i: number, j: number) => {
      luchO = pStB[num].vleft * massRatio[num];
      luchP = pStB[num].vright * massRatio[num];
      ratio = pStB[num].xright / pStB[num].xleft;
      coler = colorsGraf[pStB[num].pks];
      if (i < j * luchO * ratio) coler = colorsGraf[pStB[num].pkl];
      if (i >= j * luchP * ratio) coler = colorsGraf[pStB[num].pkr];
    };

    for (let j = 0; j < vertical; j += scale) {
      matrix[j] = [];
      for (let i = 0; i < horizon; i += scale) {
        if (dlMas >= 1 && pStB[0].xright >= i && pStB[0].xleft >= j) {
          MakeMatrixColor(0, i, j);
        } else {
          if (dlMas >= 2 && pStB[1].xright >= i && pStB[1].xleft >= j) {
            MakeMatrixColor(1, i, j);
          } else {
            if (dlMas >= 3 && pStB[2].xright >= i && pStB[2].xleft >= j) {
              MakeMatrixColor(2, i, j);
            } else {
              if (dlMas >= 4 && pStB[3].xright >= i && pStB[3].xleft >= j) {
                MakeMatrixColor(3, i, j);
              } else {
                if (dlMas >= 5 && pStB[4].xright >= i && pStB[4].xleft >= j) {
                  MakeMatrixColor(4, i, j);
                } else {
                  if (dlMas >= 6 && pStB[5].xright >= i && pStB[5].xleft >= j)
                    MakeMatrixColor(5, i, j);
                }
              }
            }
          }
        }
        if (i > horizonLimit || j > verticalLimit) coler = "#F1F5FB"; // светло серый
        matrix[j].push(coler);
      }
    }
    matrix = matrix.filter(function (el) {
      return el != null; //избавляемся от пустых значений
    });
    matrix.reverse(); //переворачиваем матрицу
  };

  const PointsXt112Comp1Tab4Str = (j: number) => {
    coler = "red";
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

    return (
      <>
        {masStr.map((masstr: any, idx: number) => {
          let xss = steepHorizon * scale * masstr;
          const stylePict = {
            backgroundColor: masCol[idx],
            height: String(steepVertical * scale) + "vh",
          };
          return <Grid key={idx} xs={xss} item sx={stylePict}></Grid>;
        })}
      </>
    );
  };

  const PointsXt112Comp1Tab4 = (update: boolean) => {
    MakeMatrix();
    let resSps = [];

    for (let j = 0; j < vertical; j += scale) {
      resSps.push(
        <Grid key={j} container>
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
      let mt01 = "-" + 86.3 / vl01 + "vh";
      let hl01 = horizon / points.xctrls[crRoad].StrategyB[i].xright;
      let ml01 = dlBlok / hl01 - 67 + "px";
      let title =
        points.xctrls[crRoad].StrategyB[i].xleft +
        "x" +
        points.xctrls[crRoad].StrategyB[i].xright;

      let stylePointInf0 = PointInfoStrStyle(mt01, ml01);

      resStr.push(
        <Grid key={i} item sx={stylePointInf0}>
          <b>{title}</b>
        </Grid>,
      );
    }
    let elem = points.xctrls[crRoad].Calculates;
    let stylePointInf1 = PointInfoDirRotStyle("-80.5vh", "-67px", 17);
    let ml01 = dlBlok - 130 + "px";
    let stylePointInf2 = PointInfoDirStyle("-1.6vh", ml01, 16);
    let mass1 = "";
    let mass2 = "";
    for (let i = 0; i < elem.length; i++) {
      if (!i) {
        mass1 = elem[i].chanL[0].toString();
        mass2 = elem[i].chanR[0].toString();
      } else {
        mass1 += "," + elem[i].chanL[0].toString();
        mass2 += "," + elem[i].chanR[0].toString();
      }
    }
    resStr.push(
      <Grid key={Math.random()} item sx={stylePointInf1}>
        <Box sx={{ fontWeight: 500 }}>
          Прямой {"["}
          <b>{mass1}</b>
          {"]"}
        </Box>
      </Grid>,
    );
    resStr.push(
      <Grid key={Math.random()} item sx={stylePointInf2}>
        Oбратный {"["}
        <b>{mass2}</b>
        {"]"}
      </Grid>,
    );

    return resStr;
  };
  //============ OutputerPict ===============================================
  const PictInfo = (idx: number, pv: number, ph: number) => {
    const PuskBalloon = () => {
      phGl = ph;
      pvGl = pv;
      IDX = idx;
      setPictInfo(true);
    };

    if (pictInfo) {
      setPictInfo(false);
      setTimeout(() => {
        PuskBalloon();
      }, 10);
    } else PuskBalloon();
  };

  const OutputerPict = (update: boolean) => {
    let resStrr = [];
    if (pointer !== null) {
      if (pointer[namer]) {
        let I = 0;
        for (let i = 0; i < pointer[namer].length; i++)
          if (pointer[namer][i].Value[0] || pointer[namer][i].Value[1]) I = i;
        let prpv = vertical / 100;
        let prph = horizon / 100;
        for (let i = 0; i < pointer[namer].length; i++) {
          let pv = 100 - pointer[namer][i].Value[0] / prpv;
          let ph = pointer[namer][i].Value[1] / prph;
          let flagEnd = i === I ? true : false;
          if (pointer[namer][i].Value[0] || pointer[namer][i].Value[1])
            resStrr.push(
              <Grid key={i} container>
                {OutputPict(i, pv, ph, PictInfo, setPictInfo, flagEnd)}
              </Grid>,
            );
        }
      }
    }
    return resStrr;
  };
  //============ Dinama =====================================================
  const handleClose = () => setOpenLoader(false);

  const Output = () => {
    setTimeout(() => {
      setOpenLoader(false);
    }, 1000);
  };

  const Dinama = () => {
    return (
      <Backdrop sx={styleBackdropBaza} open={openLoader} onClick={handleClose}>
        <CircularProgress color="inherit" size={212} />
      </Backdrop>
    );
  };
  //=========================================================================

  openLoader && Output();

  return (
    <>
      <Grid container sx={{ height: "85.8vh", position: "relative" }}>
        {openLoader && <Dinama key={Math.random()} />}
        {!openLoader && (
          <>
            {PointsXt112Comp1Tab4(props.update)}
            {OutputerPict(props.update)}
            {pictInfo && (
              <>
                {PictInfoBox(
                  pvGl,
                  phGl,
                  pointer[namer][IDX],
                  points.xctrls[crRoad],
                  1,
                  points,
                )}
              </>
            )}
          </>
        )}
      </Grid>
      {!openLoader && <>{PointInfoStr()}</>}
    </>
  );
};

export default PointsLevel2BazaDiogram;
