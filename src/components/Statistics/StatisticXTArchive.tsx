import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { statsaveCreate } from "./../../redux/actions";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { Statistic } from "../../interfaceStat.d";

import { KnobBatCl, OptionsForLine } from "../../AppServiceFunctions";

import { head } from "./StatisticsArchive";

import { colorsGraf, styleSt02 } from "./StatisticXTStyle";
import { styleSt04, styleSt05, styleStatMain } from "./StatisticXTStyle";
import { styleSt06, styleHeader03, styleHeader033 } from "./StatisticXTStyle";
import { styleBatton02, styleBatton01 } from "./StatisticXTStyle";
import { styleBackdrop } from "./StatisticXTStyle";
import { styleXTG101 } from "../../AppStyle";

import { Chart as ChartJS, CategoryScale } from "chart.js";
import { LinearScale, PointElement } from "chart.js";
import { LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export interface GrafGlob {
  dataGraf: DataGraf[];
}

export interface DataGraf {
  id: number;
  labels: string[];
  datasets: Datasets[];
}

export interface Datasets {
  label: string;
  data: number[];
  borderWidth: number;
  borderColor: string;
  backgroundColor: string;
  pointRadius: number;
}

const labels: string[] = [];
let massId: any = [];
let canal: number[] = [];
let oldAreaid = -1;
let oldInterval = -1;
let numIdInMas = 0;
let intervalGraf = [
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
];
let colorStat = "#E6EEF5"; // голубой
let oldDate = "";

let needMakeMatrix = false;
let resStr: any = [];
let matrix: any = [];
let MATRIX: any = [];
let kakchestvo = " ";

const StatisticXTArchive = (props: {
  open: boolean;
  statist: Statistic[];
  areaid: number;
  date: string;
  interval: number;
}) => {
  //== Piece of Redux ======================================
  let datestat = useSelector((state: any) => {
    const { statsaveReducer } = state;
    return statsaveReducer.datestat;
  });
  const dispatch = useDispatch();
  //========================================================
  const isOpen = props.open;
  const points = props.statist;
  const areaId = props.areaid;
  const interval = props.interval;

  let colChanel = 0;
  const [value, setValue] = React.useState("0");
  const [openLoader, setOpenLoader] = React.useState(false);
  const [trigger, setTrigger] = React.useState(true);
  const printRef = React.useRef(null);

  const ZeroLabelsCanal = () => {
    canal = [];
    while (labels.length > 0) labels.pop(); // labels = [];
  };

  const ZeroMassIdCanal = () => {
    massId[numIdInMas].datasets = [];
    massId[numIdInMas].lbl = [];
    massId[numIdInMas].canall = [];
    ZeroLabelsCanal();
  };

  if (oldDate !== props.date) {
    ZeroLabelsCanal();
    //while (labels.length > 0) labels.pop(); // labels = [];
    massId = [];
    oldAreaid = -1;
    numIdInMas = 0;
    oldDate = props.date;
  }

  if (isOpen) {
    if (oldAreaid < 0) {
      //начало работы (первый вход)
      massId.push({ id: areaId, canall: [], lbl: [], labels, datasets: [] });
      canal = [];
    }
    if (oldAreaid !== areaId) {
      //сменился ID
      let nomInMas = -1;
      for (let i = 0; i < massId.length; i++) {
        if (massId[i].id === areaId) {
          nomInMas = i;
          break;
        }
      }
      ZeroLabelsCanal();
      if (nomInMas < 0) {
        massId.push({ id: areaId, canall: [], lbl: [], labels, datasets: [] });
        numIdInMas = massId.length - 1;
      } else {
        numIdInMas = nomInMas;
        canal = massId[numIdInMas].canall;
        for (let i = 0; i < massId[numIdInMas].lbl.length; i++)
          labels.push(massId[numIdInMas].lbl[i]);
      }
      oldAreaid = areaId;
      setValue("0");
    }
    if (oldInterval !== interval) needMakeMatrix = true;
  }

  const StatGraf00 = () => {
    let datas = [];
    let datasetsMask: Datasets = {
      label: "Канал ",
      data: [],
      borderWidth: 1,
      borderColor: "",
      backgroundColor: "",
      pointRadius: 1,
    };

    const val = Number(value) - 1;

    if (isOpen && intervalGraf[numIdInMas] !== interval) {
      ZeroMassIdCanal();
      intervalGraf[numIdInMas] = interval;
    }

    if (isOpen && val >= 0 && !canal.includes(val)) {
      if (value !== "0" && labels.length === 0 && val !== 16) {
        const colMin = 60 / matrix[0].TLen;
        for (let i = 0; i < matrix.length; i++) {
          let int = "";
          if (i % colMin === 0) {
            if (i / colMin < 10) int += "0";
            int += String(i / colMin);
            int += ":00";
          }
          labels.push(int);
        }
        for (let i = 0; i < labels.length; i++)
          massId[numIdInMas].lbl.push(labels[i]);
      }
      if (val === 16) {
        ZeroMassIdCanal(); // очистка графиков
      } else {
        let int = 0; // добавление канала
        if (matrix[matrix.length - 1].Datas.length !== 0)
          int = matrix[matrix.length - 1].Datas[val].in;
        datas.push(int);

        for (let i = 0; i < matrix.length - 1; i++) {
          int = 0;
          if (matrix[i].Datas.length !== 0) int = matrix[i].Datas[val].in;
          datas.push(int);
        }
        datasetsMask.label += value;
        datasetsMask.data = datas;
        datasetsMask.borderColor = colorsGraf[val];
        datasetsMask.backgroundColor = colorsGraf[val];
        massId[numIdInMas].datasets.push(datasetsMask);
        canal.push(val);
        massId[numIdInMas].canall = canal;
      }
    } else {
      // повторное нажатие на канал (удаление)
      let faktNum = massId[numIdInMas].canall.indexOf(val);
      let massDatasets = [];
      let massCanall = [];
      let massсanal = [];
      for (let i = 0; i < massId[numIdInMas].datasets.length; i++) {
        if (i !== faktNum) {
          massDatasets.push(massId[numIdInMas].datasets[i]);
          massCanall.push(massId[numIdInMas].canall[i]);
          massсanal.push(canal[i]);
        }
      }
      massId[numIdInMas].datasets = massDatasets;
      massId[numIdInMas].canall = massCanall;
      canal = massсanal;
    }

    return (
      <>
        <Grid item xs ref={printRef} sx={{ height: "33.0vh" }}>
          <Line options={OptionsForLine(head)} data={massId[numIdInMas]} />
        </Grid>
      </>
    );
  };
  //=========================================================================
  const styleSt03 = {
    //textIndent: 6,
    borderRight: "1px solid #d4d4d4", // серый,
    borderBottom: "1px solid #d4d4d4", // серый,
    fontSize: 12.9,
    lineHeight: 2,
    backgroundColor: colorStat,
    textAlign: "center",
  };

  colChanel = points[areaId].Statistics[0].Datas.length;

  const StatisticHeader = () => {
    const SetValue = (nom: any) => {
      let oldValue = value;
      setValue(nom);
      if (oldValue === nom) setTrigger(!trigger);
    };

    const MenuKnobBat = () => {
      const SpisBatt = (leng: number) => {
        let resStr = [];
        let xss = 12 / leng;
        for (let i = 1; i <= leng; i++) {
          let illum = canal.indexOf(i - 1) >= 0 ? styleBatton01 : styleBatton02;
          resStr.push(
            <Grid item key={i} xs={xss}>
              <Grid container justifyContent="center" sx={styleHeader03}>
                <Button sx={illum} onClick={() => SetValue(i.toString())}>
                  <b>{i.toString()}</b>
                </Button>
              </Grid>
            </Grid>
          );
        }
        return resStr;
      };

      return (
        <Grid container>
          <Grid item xs={12} sx={{ height: 24 }}>
            <Grid container>{SpisBatt(colChanel)}</Grid>
          </Grid>
        </Grid>
      );
    };

    return (
      <Grid container item sx={{ height: 24 }}>
        <Grid container sx={{ marginRight: 0.7 }}>
          <Grid item xs={0.5} sx={styleHeader03}>
            {KnobBatCl(setValue)}
          </Grid>
          <Grid item xs={0.512 * colChanel} sx={styleHeader03}>
            <MenuKnobBat />
          </Grid>
          <Grid item xs={3.3} sx={styleHeader033}>
            <b>Качество</b>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const StatStroka = (numMas: number) => {
    if (isOpen) {
      kakchestvo = " ";
      resStr = [];
      //формирование времение в формате 00:00
      let timLiner = "";
      if (matrix[numMas].Hour < 10) timLiner = "0";
      timLiner += matrix[numMas].Hour;
      timLiner += ":";
      if (matrix[numMas].Min < 10) timLiner += "0";
      timLiner += matrix[numMas].Min;
      //формирование начала строки
      resStr.push(
        <Grid key={Math.random()} item xs={0.5} sx={styleSt05}>
          <Box sx={styleXTG101}>{timLiner}</Box>
        </Grid>
      );
      if (!matrix[numMas].Avail) {
        //нет данных
        for (let i = 0; i < colChanel; i++)
          resStr.push(<Grid key={i} item xs={0.5122} sx={styleSt02}></Grid>);
        //формирование конца строки
        resStr.push(
          <Grid key={Math.random()} item xs={3.3} sx={styleSt06}>
            нет данных
          </Grid>
        );
      } else {
        for (let i = 0; i < colChanel; i++) {
          if (matrix[numMas].Datas[i].st) kakchestvo += i + 1 + ", ";
          let styleSt = !matrix[numMas].Datas[i].st ? styleSt03 : styleSt04;
          resStr.push(
            <Grid key={Math.random()} item xs={0.5122} sx={styleSt}>
              {matrix[numMas].Datas[i].in}
            </Grid>
          );
        }
        //формирование конца строки
        resStr.push(
          <Grid key={Math.random()} item xs={3.3} sx={styleSt06}>
            {kakchestvo.slice(0, -2)}
          </Grid>
        );
      }
    }
    return resStr;
  };

  const StatSpis = () => {
    return (
      <>
        {isOpen &&
          matrix.map((array: any, idx: number) => {
            return (
              <Grid
                key={idx}
                item
                container
                sx={{ cursor: "default", height: 27 }}
              >
                {StatStroka(idx)}
              </Grid>
            );
          })}
      </>
    );
  };

  const CreateMatrix = () => {
    const step: number = points[areaId].Statistics[0].TLen;
    const typer = points[areaId].Statistics[0].Type;
    const kolDatas = colChanel;
    const rows = 1440 / step;
    let time = 0;
    MATRIX = [];
    for (let i = 0; i < rows; i++) {
      time = time + step;
      let hours = Math.trunc(time / 60);
      let minutes = time % 60;
      matrix[i] = {
        Period: 0,
        Type: typer,
        TLen: step,
        Hour: hours,
        Min: minutes,
        Avail: false,
        Datas: [],
      };
      let maskMATRIX = {
        Hour: hours,
        Min: minutes,
        Avail: false,
        Datas: [],
      };
      for (let j = 0; j < kolDatas; j++) {
        matrix[i].Datas[j] = {
          ch: j + 1,
          st: 0,
          in: 0,
          sp: 0,
          d: 0,
          o: 0,
          g: 0,
        };
      }
      maskMATRIX.Datas = matrix[i].Datas;
      MATRIX.push(maskMATRIX);
    }
  };

  const CompletMatrix = () => {
    const step = points[areaId].Statistics[0].TLen;
    const typeStat = points[areaId].Statistics[0].Type;
    colorStat = "#E6EEF5"; // голубой
    if (typeStat > 1) colorStat = "#D8F5DF"; //зелёный
    for (let i = 0; i < points[areaId].Statistics.length; i++) {
      let inHour = points[areaId].Statistics[i].Hour;
      let inTime = inHour * 60 + points[areaId].Statistics[i].Min;
      let timeOffset = inHour === 0 && points[areaId].Statistics[i].Min === 0;
      if (!timeOffset) {
        if (inTime % step === 0) {
          let numInMatrix = inTime / step - 1;
          for (let j = 0; j < points[areaId].Statistics[i].Datas.length; j++) {
            matrix[numInMatrix].Datas[j] = {
              ...points[areaId].Statistics[i].Datas[j],
            };
            MATRIX[numInMatrix].Datas[j] = {
              ...points[areaId].Statistics[i].Datas[j],
            };
          }
          matrix[numInMatrix].Avail = true;
          MATRIX[numInMatrix].Avail = true;
        }
      }
    }
    //== Piece of Redux ======================================
    datestat.area = points[areaId].area;
    datestat.id = points[areaId].id;
    datestat.TLen = step;
    datestat.stat = JSON.parse(JSON.stringify(MATRIX));
    datestat.data = new Date(props.date).toLocaleDateString();
    datestat.time = "24:00";
    datestat.xtName = head;
    datestat.xtGraf = printRef;
    dispatch(statsaveCreate(datestat));
    //========================================================
    const stepInterval = interval / step;
    if (stepInterval > 1) {
      let pointsMatrix: any = [];
      for (let i = 0; i < matrix.length; i = i + stepInterval) {
        let sumRec = matrix[i];
        for (let j = 0; j < matrix[i].Datas.length; j++) {
          for (let k = 1; k < stepInterval; k++) {
            sumRec.Datas[j].in = sumRec.Datas[j].in + matrix[i + k].Datas[j].in;
            sumRec.Min = matrix[i + k].Min;
            sumRec.Hour = matrix[i + k].Hour;
          }
          if (typeStat > 1)
            sumRec.Datas[j].in = sumRec.Datas[j].in / stepInterval;
        }
        sumRec.TLen = interval;
        pointsMatrix.push(sumRec);
      }
      matrix = pointsMatrix;
    }
  };
  //============ Dinama =====================================================
  const handleClose = () => setOpenLoader(false);

  const Output = () => {
    setTimeout(() => {
      setOpenLoader(false);
    }, 500);
  };

  const Dinama = () => {
    return (
      <Backdrop sx={styleBackdrop} open={openLoader} onClick={handleClose}>
        <CircularProgress color="inherit" size={212} />
      </Backdrop>
    );
  };
  //=========================================================================
  if (isOpen && needMakeMatrix) {
    CreateMatrix();
    CompletMatrix();
    needMakeMatrix = false;
    oldInterval = interval;
  }

  if (openLoader) Output();

  return (
    <Box sx={{ marginTop: 0.3, marginLeft: -2.5, marginRight: -4 }}>
      <Grid container item>
        <Grid item xs={12} sx={styleStatMain}>
          <StatGraf00 />
        </Grid>
      </Grid>
      <Grid container item sx={{ marginTop: 1 }}>
        <Grid item xs={24} sx={styleStatMain}>
          <StatisticHeader />
          <Box sx={{ overflowX: "auto", height: "54.0vh" }}>
            {openLoader && <Dinama />}
            {!openLoader && <>{StatSpis()}</>}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StatisticXTArchive;
