import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { statsaveCreate } from "./../../redux/actions";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { Statistic } from "../../interfaceStat.d";

import { colorsGraf, styleSt02, options } from "./StatisticXTStyle";
import { styleSt04, styleSt05, styleStatMain } from "./StatisticXTStyle";
import { styleSt06, styleHeader03, styleHeader033 } from "./StatisticXTStyle";
import { styleClear, styleBattonCl, styleBatton01 } from "./StatisticXTStyle";
import { styleBatton02 } from "./StatisticXTStyle";

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
  //id: number;
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
let numIdInMas = 0;
let intervalGraf = [
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
];
let colorStat = "#E6EEF5"; // голубой
let oldDate = "";

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
  const [openLoader, setOpenLoader] = React.useState(true);
  const [trigger, setTrigger] = React.useState(true);

  let resStr: any = [];
  let resSps: any = [];
  let matrix: any = [];
  let MATRIX: any = [];
  let kakchestvo = " ";

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
    //canal = [];
    oldAreaid = -1;
    numIdInMas = 0;
    oldDate = props.date;
    //setOpenLoader(true);
  }

  if (isOpen) {
    //начало работы (первый вход)
    if (oldAreaid < 0) {
      massId.push({ id: areaId, canall: [], lbl: [], labels, datasets: [] });
      oldAreaid = areaId;
      canal = [];
    }
    //сменился ID
    if (oldAreaid !== areaId) {
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
        for (let i = 0; i < massId[numIdInMas].lbl.length; i++) {
          labels.push(massId[numIdInMas].lbl[i]);
        }
      }
      oldAreaid = areaId;
      setValue("0");
      setOpenLoader(true);
    }
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
        for (let i = 0; i < labels.length; i++) {
          massId[numIdInMas].lbl.push(labels[i]);
        }
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
      <Grid item xs sx={{ height: "28vh" }}>
        <Line options={options} data={massId[numIdInMas]} />
      </Grid>
    );
  };
  //=========================================================================
  const styleSt03 = {
    textIndent: 6,
    borderRight: 1,
    borderBottom: 1,
    fontSize: 11,
    lineHeight: 2,
    backgroundColor: colorStat,
    borderColor: "primary.main",
    textAlign: "center",
  };

  colChanel = points[areaId].Statistics[0].Datas.length;

  const StatisticHeader = () => {
    const KnobBatCl = () => {
      return (
        <Box sx={styleClear}>
          <Button
            sx={styleBattonCl}
            variant="contained"
            onClick={() => setValue("17")}
          >
            <b>Чистка</b>
          </Button>
        </Box>
      );
    };

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
          const ButtonCanal = () => {
            return (
              <Button sx={illum} onClick={() => SetValue(i.toString())}>
                <b>{i.toString()}</b>
              </Button>
            );
          };

          resStr.push(
            <Grid item key={i} xs={xss}>
              <Grid
                container
                key={i}
                justifyContent="center"
                sx={styleHeader03}
              >
                {ButtonCanal()}
              </Grid>
            </Grid>
          );
        }
        return resStr;
      };

      return (
        <Grid container>
          <Grid item xs={12} sx={{ height: 24 }}>
            <Stack direction="row">
              <Grid container>{SpisBatt(colChanel)}</Grid>
            </Stack>
          </Grid>
        </Grid>
      );
    };

    return (
      <Grid container item sx={{ height: 24 }}>
        <Grid container sx={{ marginRight: 0.7 }}>
          <Grid item xs={0.5} sx={styleHeader03}></Grid>
          <Grid item xs={0.51 * colChanel} sx={styleHeader03}>
            <MenuKnobBat />
            <KnobBatCl />
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
          {timLiner}
        </Grid>
      );
      if (!matrix[numMas].Avail) {
        //нет данных
        for (let i = 0; i < colChanel; i++) {
          resStr.push(<Grid key={i} item xs={0.51} sx={styleSt02}></Grid>);
        }
        //формирование конца строки
        resStr.push(
          <Grid key={Math.random()} item xs={3.3} sx={styleSt06}>
            нет данных
          </Grid>
        );
      } else {
        for (let i = 0; i < colChanel; i++) {
          if (matrix[numMas].Datas[i].st !== 0) {
            kakchestvo += i + 1;
            kakchestvo += ", ";
          }
          resStr.push(
            <Grid
              key={Math.random()}
              item
              xs={0.51}
              sx={matrix[numMas].Datas[i].st === 0 ? styleSt03 : styleSt04}
            >
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
    if (isOpen) {
      resSps = [];
      for (let i = 0; i < matrix.length; i++) {
        resSps.push(
          <Grid key={i} item container sx={{ height: 27 }}>
            {StatStroka(i)}
          </Grid>
        );
      }
    }
    return resSps;
  };

  const CreateMatrix = () => {
    const step: number = points[areaId].Statistics[0].TLen;
    const typer = points[areaId].Statistics[0].Type;
    const kolDatas = colChanel;
    let rows = 1440 / step;
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
      if (inHour < 24) {
        if (inTime % step === 0) {
          let numInMatrix = inTime / step - 1;
          if (inHour === 0 && points[areaId].Statistics[i].Min === 0) {
            numInMatrix = matrix.length - 1;
          }
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
    dispatch(statsaveCreate(datestat));
    //========================================================
    let stepInterval = interval / step;
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
  const handleClose = () => {
    setOpenLoader(false);
  };

  const styleBackdrop = {
    color: "#fff",
    marginLeft: "0.3vh",
    marginRight: "1.7vh",
    marginTop: "34vh",
    marginBottom: "4vh",
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
        <CircularProgress color="inherit" size={212} />
      </Backdrop>
    );
  };
  //=========================================================================
  if (isOpen) {
    CreateMatrix();
    CompletMatrix();
    StatSpis();
  }

  if (openLoader) Output();

  return (
    <Box sx={{ marginTop: 0.8, marginLeft: -2.5, marginRight: -4 }}>
      <Grid container item sx={{ height: "28vh" }}>
        <Grid item xs={12} sx={styleStatMain}>
          <StatGraf00 />
        </Grid>
      </Grid>
      <Grid container item sx={{ marginTop: 0.5, height: "56vh" }}>
        <Grid item xs={24} sx={styleStatMain}>
          <StatisticHeader />
          <Box sx={{ overflowX: "auto", height: "59vh" }}>
            <Grid container item>
              {openLoader && <Dinama />}
              {!openLoader && (
                <Grid container item>
                  {resSps}
                </Grid>
              )}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StatisticXTArchive;
