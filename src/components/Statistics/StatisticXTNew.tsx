import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { Statistic } from '../../interfaceStat.d';

import { colorsGraf, styleSt02, styleSt03, styleSt04, styleSt05 } from './StatisticXTStyle';
import { styleSt06, styleHeader03, styleHeader033 } from './StatisticXTStyle';
import { styleBatton, styleClear, styleBattonCl, options } from './StatisticXTStyle';

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

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

// let massId: <GrafGlob>({} as GrafGlob)

const labels: string[] = [];
//const masLabels = { id: 0, labels: [''] };
let massId: any = [];
//const data: DataGraf = { id: 0, labels, datasets: [] };
let canal: number[] = [];
let oldAreaid = -1;
let numIdInMas = 0;

const StatisticXTNew = (props: { open: boolean; statist: Statistic[]; areaid: number }) => {
  const isOpen = props.open;
  const points = props.statist;
  const areaId = props.areaid;

  console.log('Stat_points:', points)

  let colChanel = 0;
  const [value, setValue] = React.useState('0');

  let resStr: any = [];
  let resSps: any = [];
  let matrix: any = [];
  let kakchestvo = ' ';

  if (isOpen) {
    if (oldAreaid < 0) {
      //начало работы (первый вход)
      massId.push({ id: areaId, canall: [], lbl: [], labels, datasets: [] });
      oldAreaid = areaId;
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
      if (nomInMas < 0) {
        massId.push({ id: areaId, canall: [], lbl: [], labels, datasets: [] });
        numIdInMas = massId.length - 1;
        while (labels.length > 0) labels.pop(); // labels = [];
        canal = [];
      } else {
        numIdInMas = nomInMas;
        canal = [];
        canal = massId[numIdInMas].canall;
        while (labels.length > 0) labels.pop(); // labels = [];
        for (let i = 0; i < massId[numIdInMas].lbl.length; i++) {
          labels.push(massId[numIdInMas].lbl[i]);
        }
      }
      oldAreaid = areaId;
      setValue('0');
    }
  }

  const StatGraf00 = () => {
    let datas = [];
    let datasetsMask: Datasets = {
      label: 'Канал ',
      data: [],
      borderWidth: 1,
      borderColor: '',
      backgroundColor: '',
      pointRadius: 1,
    };

    const val = Number(value) - 1;

    if (isOpen && val >= 0 && !canal.includes(val)) {
      if (isOpen && value !== '0' && labels.length === 0) {
        const colMin = 60 / matrix[0].TLen;
        for (let i = 0; i < matrix.length; i++) {
          let int = '';
          if (i % colMin === 0) {
            if (i / colMin < 10) int += '0';
            int += String(i / colMin);
            int += ':00';
          }
          labels.push(int);
        }
        //massId[numIdInMas].lbl = labels;
        for (let i = 0; i < labels.length; i++) {
          massId[numIdInMas].lbl.push(labels[i]);
        }
      }
      if (val === 16) {
        // очистка графиков
        massId[numIdInMas].datasets = [];
        canal = [];
      } else {
        let int = 0;
        if (matrix[matrix.length - 1].Datas.length !== 0) int = matrix[matrix.length - 1].Datas[val].in;
        datas.push(int);

        for (let i = 0; i < matrix.length - 1; i++) {
          int = 0;
          if (matrix[i].Datas.length !== 0) int = matrix[i].Datas[val].in;
          datas.push(int);
        }
        // for (let i = 0; i < matrix.length; i++) {
        //   let int = 0;
        //   //console.log('1!!!', i, val, matrix[i].Datas);
        //   if (matrix[i].Datas.length !== 0) int = matrix[i].Datas[val].in;
        //   datas.push(int);
        // }
        datasetsMask.label += value;
        datasetsMask.data = datas;
        datasetsMask.borderColor = colorsGraf[val];
        datasetsMask.backgroundColor = colorsGraf[val];

        massId[numIdInMas].datasets.push(datasetsMask);
        canal.push(val);
        massId[numIdInMas].canall = canal;
      }
    }

    return (
      <Grid item xs sx={{ height: '28vh' }}>
        <Line options={options} data={massId[numIdInMas]} />
      </Grid>
    );
  };

  //=========================================================================

  colChanel = points[areaId].Statistics[0].Datas.length;

  const StatisticHeader = () => {
    // const KnobBat = (props: { num: string }) => {
    //   return (
    //     <Grid container key={Math.random()} justifyContent="center" sx={styleHeader03}>
    //       <Button sx={styleBatton} variant="contained" onClick={() => setValue(props.num)}>
    //         <b>{props.num}</b>
    //       </Button>
    //     </Grid>
    //   );
    // };

    const KnobBatCl = () => {
      return (
        <Box sx={styleClear}>
          <Button sx={styleBattonCl} variant="contained" onClick={() => setValue('17')}>
            <b>Чистка</b>
          </Button>
        </Box>
      );
    };

    const MenuKnobBat = () => {
      const SpisBatt = (leng: number) => {
        let resStr = [];
        let xss = 12 / leng;
        for (let i = 1; i <= leng; i++) {
          resStr.push(
            <Grid item key={i} xs={xss}>
              {/* <KnobBat num={i.toString()} key={Math.random()} /> */}
              <Grid container key={Math.random()} justifyContent="center" sx={styleHeader03}>
                <Button sx={styleBatton} variant="contained" onClick={() => setValue(i.toString())}>
                  <b>{i.toString()}</b>
                </Button>
              </Grid>
            </Grid>,
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
      kakchestvo = ' ';
      resStr = [];

      //формирование времение в формате 00:00
      let timLiner = '';
      if (matrix[numMas].Hour < 10) timLiner = '0';
      timLiner += matrix[numMas].Hour;
      timLiner += ':';
      if (matrix[numMas].Min < 10) timLiner += '0';
      timLiner += matrix[numMas].Min;
      //формирование начала строки
      resStr.push(
        <Grid key={Math.random()} item xs={0.5} sx={styleSt05}>
          {timLiner}
        </Grid>,
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
          </Grid>,
        );
      } else {
        for (let i = 0; i < colChanel; i++) {
          if (matrix[numMas].Datas[i].st !== 0) {
            kakchestvo += i + 1;
            kakchestvo += ', ';
          }
          resStr.push(
            <Grid
              key={Math.random()}
              item
              xs={0.51}
              sx={matrix[numMas].Datas[i].st === 0 ? styleSt03 : styleSt04}>
              {matrix[numMas].Datas[i].in}
            </Grid>,
          );
        }
        //формирование конца строки
        resStr.push(
          <Grid key={Math.random()} item xs={3.3} sx={styleSt06}>
            {kakchestvo.slice(0, -2)}
          </Grid>,
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
          </Grid>,
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
    }
  };

  const CompletMatrix = () => {
    const step = points[areaId].Statistics[0].TLen;
    for (let i = 0; i < points[areaId].Statistics.length; i++) {
      let inHour = points[areaId].Statistics[i].Hour;
      let inTime = inHour * 60 + points[areaId].Statistics[i].Min;
      if (inTime % step === 0) {
        let numInMatrix = inTime / step - 1;
        if (inHour === 0 && points[areaId].Statistics[i].Min === 0) {
          numInMatrix = matrix.length - 1;
        }
        for (let j = 0; j < points[areaId].Statistics[i].Datas.length; j++) {
          matrix[numInMatrix].Datas[j] = points[areaId].Statistics[i].Datas[j];
        }
        matrix[numInMatrix].Avail = true;
      }
    }
  };

  if (isOpen) {
    CreateMatrix();
    CompletMatrix();
    StatSpis();
  }

  return (
    <Box sx={{ marginTop: 0.8, marginLeft: -2.5, marginRight: -4 }}>
      <Grid container item sx={{ height: '28vh' }}>
        <Grid item xs={12} sx={{ border: 1, borderRadius: 1, borderColor: 'primary.main' }}>
          <StatGraf00 />
        </Grid>
      </Grid>
      <Grid container item sx={{ marginTop: 0.5, height: '56vh' }}>
        <Grid item xs={24} sx={{ border: 1, borderRadius: 1, borderColor: 'primary.main' }}>
          <StatisticHeader />
          <Box sx={{ overflowX: 'auto', height: '59vh' }}>
            <Grid container item>
              {resSps}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StatisticXTNew;
