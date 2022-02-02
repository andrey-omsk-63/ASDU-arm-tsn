import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { Statistic } from '../../interfaceStat.d';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const colorsGraf = [
  'red',
  'orange',
  'black',
  'blue',
  'green',
  'Pink',
  'lime',
  'Yellow',
  'Silver',
  'teal',
  'YellowGreen',
  'purple',
  '',
  'Aqua',
  'RosyBrown',
  'maroon',
  '',
];

export interface DataGl {
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

// const labels: string[] = [];
// let canal: number[] = [];

// const data: DataGl = {
//   labels,
//   datasets: [],
// };

// let oldAreaid = -1;

const Statistic110 = (props: { open: boolean; statist: Statistic[]; areaid: number; }) => {
  //  const Statistic110 = (props: { open: boolean; statist: Data }) => {

  const isOpen = props.open;
  const points = props.statist;
  const areaId = props.areaid;
  let colChanel = 0

  const labels: string[] = [];
  let canal: number[] = [];

  const data: DataGl = {
    labels,
    datasets: [],
  };

  //let oldAreaid = -1;

  if (isOpen) {
    colChanel = points[areaId].Statistics[areaId].Datas.length
    // if (oldAreaid !== areaId) {   // очистка графиков
    //   data.datasets = [];
    //   canal = [];
    //   oldAreaid = areaId
    // }
  }

  const styleSt02 = {
    textIndent: 6,
    borderRight: 1,
    borderBottom: 1,
    fontSize: 11,
    lineHeight: 2,
    borderColor: 'primary.main',
  };
  const styleSt03 = {
    textIndent: 6,
    borderRight: 1,
    borderBottom: 1,
    fontSize: 11,
    lineHeight: 2,
    backgroundColor: '#E6EEF5',
    borderColor: 'primary.main',
    textAlign: 'center',
  };
  const styleSt04 = {
    textIndent: 6,
    borderRight: 1,
    borderBottom: 1,
    fontSize: 11,
    lineHeight: 2,
    backgroundColor: '#FF80C0',
    color: 'white',
    textAlign: 'center',
  };
  const styleSt05 = {
    borderRight: 1,
    borderBottom: 1,
    borderColor: 'primary.main',
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 2,
  };
  const styleSt06 = {
    textIndent: 6,
    border: 1,
    borderTop: 0,
    borderLeft: 0,
    borderColor: 'primary.main',
    fontSize: 11,
    lineHeight: 2,
  };

  //const [points, setPoints] = React.useState<Array<Statistic>>([]);
  const [value, setValue] = React.useState('0');

  let resStr: any = [];
  let resSps: any = [];
  let matrix: any = [];
  let kakchestvo = ' ';

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
      }
      if (val === 16) {     // очистка графиков
        data.datasets = [];
        canal = [];
      } else {
        console.log('matrix1', matrix)
        for (let i = 0; i < matrix.length; i++) {
          let int = 0;
          if (matrix[i].Datas.length !== 0) int = matrix[i].Datas[val].in;
          datas.push(int);
        }

        datasetsMask.label += value;
        datasetsMask.data = datas;
        datasetsMask.borderColor = colorsGraf[val];
        datasetsMask.backgroundColor = colorsGraf[val];

        data.datasets.push(datasetsMask);
        canal.push(val);
      }
    }

    return (
      <Grid item xs sx={{ height: '28vh', }}>
        <StatGraf01 />
      </Grid>
    );
  };

  const StatGraf01 = () => {
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: false,
          //text: 'Очковые змеи - это КОБРЫ а не глисты',
        },
      },
    };

    return <Line options={options} data={data} />;
  };

  const StatisticHeader = () => {
    const styleSt03 = {
      borderRight: 1,
      borderBottom: 1,
      borderColor: 'primary.main',
      backgroundColor: '#C0C0C0',
      fontSize: 11,
      textAlign: 'center',
      lineHeight: 2,
    };

    const KnobBat = (props: { num: string; xss: number }) => {
      const styleBatton = {
        marginLeft: 0.4,
        fontSize: 11,
        backgroundColor: '#F1F3F4',
        color: 'black',
        maxWidth: '2.7vh',
        maxHeight: '23px',
        minWidth: '2.7vh',
        minHeight: '23px',
        textAlign: 'center',
      };

      return (
        <Grid key={Math.random()} item xs={props.xss} sx={styleSt03}>
          <Button sx={styleBatton} variant="contained" onClick={() => setValue(props.num)}>
            <b>{props.num}</b>
          </Button>
        </Grid>
      );
    };

    const KnobBatCl = () => {
      const styleClear = {
        position: 'absolute',
        marginTop: '-2.8vh',
        left: '0.4vh',
      };

      const styleBattonCl = {
        fontSize: 10.1,
        backgroundColor: '#F1F3F4',
        color: 'red',
        maxWidth: '5vh',
        maxHeight: '12px',
        minWidth: '5vh',
        minHeight: '12px',
        textTransform: 'unset !important',
      };

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
              <KnobBat num={i.toString()} xss={xss} key={Math.random()} />
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
          <Grid item xs={0.5} sx={styleSt03}></Grid>
          <Grid item xs={0.51 * colChanel} sx={styleSt03}>
            <MenuKnobBat />
            <KnobBatCl />
          </Grid>
          <Grid item xs={3.3} sx={styleSt03}>
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

      if (matrix[numMas].Datas.length === 0) {
        //нет данных
        //for (let i = 0; i < points[0].Statistics[0].Datas.length; i++) {
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
        //есть данные
        let i = 0;
        //console.log('matrix:', matrix);
        for (const elem of matrix[numMas].Datas) {
          i++;
          if (elem.st !== 0) {
            kakchestvo += i;
            kakchestvo += ', ';
          }
          resStr.push(
            <Grid key={Math.random()} item xs={0.51} sx={elem.st === 0 ? styleSt03 : styleSt04}>
              {elem.in}
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
    let rows = 1440 / step;
    let time = -step;
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
        Datas: [],
      };
    }
  };

  const CompletMatrix = () => {
    const step = points[areaId].Statistics[0].TLen;

    for (let i = 0; i < points[areaId].Statistics.length; i++) {
      let numInMatrix = (points[areaId].Statistics[i].Hour * 60 + points[areaId].Statistics[i].Min) / step;
      matrix[numInMatrix].Datas = points[areaId].Statistics[i].Datas;
    }
  };

  if (isOpen) {
    CreateMatrix();
    CompletMatrix();
    StatSpis();
  }

  return (
    <Box sx={{ marginTop: -2, marginLeft: -3, marginRight: 2 }}>
      <Grid container item sx={{ margin: 0, height: '28vh' }}>
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

export default Statistic110;
