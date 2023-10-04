import * as React from "react";
import Grid from "@mui/material/Grid";
//import Box from '@mui/material/Box';
//import Button from "@mui/material/Button";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { OutputPict, PictInfoBox } from "../../../AppServiceFunctions";

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
}) => {
  const xtProps = props.xtt;
  const points = props.xctrll[xtProps];
  const crRoad = props.crossroad;
  const namer = points.xctrls[props.crossroad].name;
  const pointer = points.results;

  const colorsGraf = [
    "#d6bf36", // хаки
    "Turquoise",
    "#c0de7c", // средне зелёный

    "#e1e69d", // салатовый
    "#ffd5dc", // розовый
    "#ceffff", // светло голубой

    "#badbad", // светло зелёный
    "#d8aa9e", // светло кирпичный
    "#c5c6ff", //светло фиолетовый

    "purple",
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
  console.log("!!!:", points.xctrls[crRoad]);

  const horizon = points.xctrls[crRoad].right;
  const vertical = points.xctrls[crRoad].left;
  const steepHorizon = 12 / horizon;
  const steepVertical = 85.6 / vertical;
  let matrix: string[][] = [[]];
  let scale = points.xctrls[crRoad].StrategyA.length > 4 ? 2 : 1;

  let coler = "red";
  let colerOld = "";
  let masStr = [];
  let masCol = [];
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
        //if (coler === "blue") console.log("2blue", i, j);
        matrix[j].push(coler);
      }
    }
    matrix = matrix.filter(function (el) {
      return el != null; //избавляемся от пустых значений
    });
    matrix.reverse(); //переворачиваем матрицу
  };

  const PointsXt112Comp1Tab4 = () => {
    let resStr = [];
    let resSps = [];

    MakeMatrix();

    const PointsXt112Comp1Tab4StrOptim = (j: number) => {
      resStr = [];
      coler = "red";
      colerOld = matrix[j / scale][0 / scale];
      masStr = [];
      masCol = [];
      colBl = 0;

      for (let i = 0; i < horizon; i += scale) {
        coler = matrix[j / scale][i / scale];
        //if (coler === 'blue') console.log("1blue");
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
              height: String(steepVertical * scale) + "vh",
              borderRadius: 3,
            }}
          ></Grid>
        );
      }
      return resStr;
    };

    for (let j = 0; j < vertical; j += scale) {
      resSps.push(
        <Grid key={j} item container>
          {PointsXt112Comp1Tab4StrOptim(j)}
        </Grid>
      );
    }
    return resSps;
  };
  //============ OutputerPict ===============================================
  const PictInfo = (idx: number, pv: number, ph: number) => {
    phGl = ph;
    pvGl = pv;
    IDX = idx;
    setPictInfo(true);
    //e.preventDefault(); // чтобы страница не перезагружалась !!!!!!
  };

  const OutputerPict = () => {
    let resStrr = [];
    if (pointer !== null) {
      if (pointer[namer]) {
        for (let i = 0; i < pointer[namer].length; i++) {
          let prpv = vertical / 100;
          let pv = 100 - pointer[namer][i].Value[0] / prpv;
          let prph = horizon / 100;
          let ph = pointer[namer][i].Value[1] / prph;
          let flagEnd = i === pointer[namer].length - 1 ? true : false;
          resStrr.push(
            <>
              <Grid key={i} item container>
                {OutputPict(i, pv, ph, PictInfo, flagEnd)}
              </Grid>
            </>
          );
        }
      }
    }
    return resStrr;
  };
  //============ Dinama =====================================================
  const handleClose = () => {
    setOpenLoader(false);
  };

  const styleBackdrop = {
    color: "#fff",
    marginLeft: window.innerWidth * 0.274 + "px",
    marginRight: "1.7vh",
    marginTop: 11,
    marginBottom: "4vh",
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
        <CircularProgress color="inherit" size={212} />
      </Backdrop>
    );
  };
  //=========================================================================

  if (openLoader) Output();

  return (
    <Grid item container sx={{ position: "relative" }} xs={12}>
      {openLoader && <Dinama />}
      {!openLoader && (
        <>
          {PointsXt112Comp1Tab4()}
          {OutputerPict()}
          {pictInfo && (
            <>
              {PictInfoBox(
                pvGl,
                phGl,
                pointer[namer][IDX],
                setPictInfo,
                points.xctrls[crRoad],
                0
              )}
            </>
          )}
        </>
      )}
    </Grid>
  );
};

export default PointsLevel2AreaDiogram;
