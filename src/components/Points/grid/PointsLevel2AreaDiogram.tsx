import * as React from "react";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { OutputPict, PictInfoBox } from "../../../AppServiceFunctions";

import { PointInfoDirStyle, PointInfoDirRotStyle } from "./PointsGridStyle";
import { styleBackdropArea } from "./PointsGridStyle";

import { XctrlInfo } from "../../../interfaceGl.d";
//import { styleBoxFormInt } from "../../../AppStyle";

let xtPropsOld = -1;
let crossRoadOld = -1;
let pointsOld: any = [];

let phGl = -1;
let pvGl = -1;
let IDX = -1;

const PointsLevel2AreaDiogram = (props: {
  xctrll: XctrlInfo[];
  xtt: number;
  crossroad: number;
  update: boolean;
}) => {
  const xtProps = props.xtt;
  const points = props.xctrll[xtProps];
  const crRoad = props.crossroad;
  const namer = points.xctrls[props.crossroad].name;
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
    "#c5c6ff", // светло фиолетовый

    "purple", // фиолетовый
    "RosyBrown",
    "#ff8199", // красно розовый

    "Olive",
    "Magenta",
    "DarkGray",

    "RoyalBlue",
    "SpringGreen",
    "Violet",
  ];

  const [openLoader, setOpenLoader] = React.useState(true);
  const [pictInfo, setPictInfo] = React.useState(false);

  const horizon = points.xctrls[crRoad].right;
  const vertical = points.xctrls[crRoad].left;
  const steepHorizon = 12 / horizon;
  const steepVertical = 85.6 / vertical;
  let matrix: string[][] = [[]];
  let scale = points.xctrls[crRoad].StrategyA.length > 4 ? 2 : 1;
  scale = horizon > 999 || vertical > 999 ? 4 : scale;

  let coler = "red";
  let colerOld = "";
  let masStr: any = [];
  let masCol: any = [];
  let colBl = 0;

  if (
    xtPropsOld !== xtProps ||
    crossRoadOld !== crRoad ||
    pointsOld !== points
  ) {
    xtPropsOld = xtProps; // сменился ХТ
    crossRoadOld = crRoad;
    pointsOld = points;
    setPictInfo(false);
    setOpenLoader(true);
  }

  const MakeMatrix = () => {
    let pStA = points.xctrls[crRoad].StrategyA;

    for (let j = 0; j < vertical + 1; j += scale) {
      matrix[j] = [];
      for (let i = 0; i < horizon + 1; i += scale) {
        let coler = "red";
        let mass = [];
        let flag = true;
        for (let k = 0; k < pStA.length; k++) {
          let coorPointY = pStA[k].xleft;
          let coorPointX = pStA[k].xright;
          let kvx = (i - coorPointX) ** 2;
          let kvy = (j - coorPointY) ** 2;
          if (coorPointY === j && coorPointX === i) {
            coler = "blue";
            flag = false;
          }
          mass.push(kvx + kvy);
        }
        if (flag) coler = colorsGraf[mass.indexOf(Math.min.apply(null, mass))];
        matrix[j].push(coler);
      }
    }
    matrix = matrix.filter(function (el) {
      return el != null; //избавляемся от пустых значений
    });
    matrix.reverse(); //переворачиваем матрицу
  };

  const PointsXt112Comp1Tab4StrOptim = (j: number) => {
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
            borderRadius: 3,
          };
          return <Grid key={idx} xs={xss} item sx={stylePict}></Grid>;
        })}
      </>
    );
  };

  const PointsXt112Comp1Tab4 = () => {
    MakeMatrix();
    let resSps = [];

    for (let j = 0; j < vertical; j += scale) {
      resSps.push(
        <Grid key={j} container>
          {PointsXt112Comp1Tab4StrOptim(j)}
        </Grid>
      );
    }
    return resSps;
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
    } else {
      PuskBalloon();
    }
  };

  const OutputerPict = (update: boolean) => {
    let resStrr = [];
    if (pointer !== null) {
      if (pointer[namer]) {
        let I = 0;
        for (let i = 0; i < pointer[namer].length; i++)
          if (pointer[namer][i].Value[0] || pointer[namer][i].Value[1]) I = i;
        for (let i = 0; i < pointer[namer].length; i++) {
          let prpv = vertical / 100;
          let pv = 100 - pointer[namer][i].Value[0] / prpv;
          let prph = horizon / 100;
          let ph = pointer[namer][i].Value[1] / prph;
          let flagEnd = i === I ? true : false;
          if (pointer[namer][i].Value[0] || pointer[namer][i].Value[1]) {
            resStrr.push(
              <>
                <Grid key={i} container>
                  {OutputPict(i, pv, ph, PictInfo, setPictInfo, flagEnd)}
                </Grid>
              </>
            );
          }
        }
      }
    }
    return resStrr;
  };

  const PointInfoStr = () => {
    let resStr: any = [];
    const dlBlok = (window.innerWidth / 12.55) * 9;
    let elem = points.xctrls[props.crossroad].Calculates;
    let stylePointInf1 = PointInfoDirRotStyle("5.2vh", "-67px", 17);
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
      </Grid>
    );
    let ml01 = dlBlok - 129 + "px";
    let stylePointInf2 = PointInfoDirStyle("84.2vh", ml01, 16);
    resStr.push(
      <Grid key={Math.random()} item sx={stylePointInf2}>
        Обратный {"["}
        <b>{mass2}</b>
        {"]"}
      </Grid>
    );

    return resStr;
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
      <Backdrop sx={styleBackdropArea} open={openLoader} onClick={handleClose}>
        <CircularProgress color="inherit" size={212} />
      </Backdrop>
    );
  };
  //=========================================================================

  if (openLoader) Output();

  return (
    <>
      <Grid item container sx={{ position: "relative" }} xs={12}>
        {openLoader && <Dinama />}
        {!openLoader && (
          <>
            {PointsXt112Comp1Tab4()}
            {OutputerPict(props.update)}
            {pictInfo && (
              <>
                {PictInfoBox(
                  pvGl,
                  phGl,
                  pointer[namer][IDX],
                  points.xctrls[crRoad],
                  0,
                  points
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

export default PointsLevel2AreaDiogram;
