import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import axios from 'axios';

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
const labels = [];
let canal = [];

const data = {
  labels,
  datasets: [],
};

const Statistic110 = () => {
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
  };
  const styleSt04 = {
    textIndent: 6,
    borderRight: 1,
    borderBottom: 1,
    fontSize: 11,
    lineHeight: 2,
    backgroundColor: '#FF80C0',
    color: 'white',
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

  const [points, setPoints] = React.useState({});
  const [isOpen, setIsOpen] = React.useState(false);
  const [value, setValue] = React.useState('0');
  let resStr = [];
  let resSps = [];
  let matrix = [];
  let kakchestvo = ' ';

  const StatGraf00 = () => {
    let datas = [];
    let datasetsMask = {
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
      if (val === 16) {
        data.datasets = [];
        canal = [];
      } else {
        for (let i = 0; i < matrix.length; i++) {
          let int = 0;
          if (matrix[i].Datas.length !== 0) int = matrix[i].Datas[val].Intensiv;
          datas.push(int);
        }

        datasetsMask.label += value;
        datasetsMask.data = datas;
        datasetsMask.borderColor = colorsGraf[val];
        datasetsMask.backgroundColor = colorsGraf[val];

        data.datasets.push(datasetsMask);
        canal.push(val);
        //console.log('canal:', canal);
      }
    }

    return (
      <Grid item xs sx={{ height: '28vh', border: 0 }}>
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
          position: 'top',
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
    const KnobBat = (props) => {
      const styleBatton = {
        fontSize: 11,
        backgroundColor: '#F1F3F4',
        color: 'black',
        maxWidth: '2.7vh',
        maxHeight: '23px',
        minWidth: '2.7vh',
        minHeight: '23px',
      };

      return (
        <Grid item xs={0.75} sx={styleSt03}>
          <Button
            size="small"
            sx={styleBatton}
            variant="contained"
            onClick={() => setValue(props.num)}>
            <b>{props.num}</b>
          </Button>
        </Grid>
      );
    };

    const KnobBatCl = () => {
      const styleClear = {
        position: 'relative',
        top: '-2.8vh',
        left: '-7.5vh',
      };
      const styleBattonCl = {
        fontSize: 9,
        backgroundColor: '#F1F3F4',
        color: 'red',
        maxWidth: '7vh',
        maxHeight: '15px',
        minWidth: '7vh',
        minHeight: '15px',
      };

      return (
        <Box sx={styleClear}>
          <Button
            size="small"
            sx={styleBattonCl}
            variant="contained"
            onClick={() => setValue('17')}>
            <b>Очистить</b>
          </Button>
        </Box>
      );
    };

    const MenuKnobBat = () => {
      return (
        <Grid container>
          <Grid item xs={12} sx={{ border: 0, height: 24 }}>
            <Stack direction="row">
              <Grid container>
                <KnobBat num="1" />
                <KnobBat num="2" />
                <KnobBat num="3" />
                <KnobBat num="4" />
                <KnobBat num="5" />
                <KnobBat num="6" />
                <KnobBat num="7" />
                <KnobBat num="8" />
                <KnobBat num="9" />
                <KnobBat num="10" />
                <KnobBat num="11" />
                <KnobBat num="12" />
                <KnobBat num="13" />
                <KnobBat num="14" />
                <KnobBat num="15" />
                <KnobBat num="16" />
                <KnobBatCl />
              </Grid>
            </Stack>
          </Grid>
        </Grid>
      );
    };

    return (
      <Grid container item sx={{ height: 24 }}>
        <Grid container sx={{ border: 0, marginRight: 0.7 }}>
          <Grid item xs={0.5} sx={styleSt03}></Grid>
          <Grid item xs={8.16} sx={{ border: 0 }}>
            <MenuKnobBat />
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
        for (let i = 0; i < points[0].Datas.length; i++) {
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
        for (const elem of matrix[numMas].Datas) {
          i++;
          if (elem.Status !== 0) {
            kakchestvo += i;
            kakchestvo += ', ';
          }
          resStr.push(
            <Grid key={Math.random()} item xs={0.51} sx={elem.Status === 0 ? styleSt03 : styleSt04}>
              {elem.Intensiv}
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
          <Grid key={i} item container sx={{ border: 0, height: 27 }}>
            {StatStroka(i)}
          </Grid>,
        );
      }
    }
    return resSps;
  };

  const CreateMatrix = () => {
    const step = points[0].TLen;
    const typer = points[0].Type;
    let rows = 1440 / step;
    let time = -step;
    for (let i = 0; i < rows; i++) {
      time = time + step;
      let hours = Math.trunc(time / 60);
      let minutes = time % 60;
      matrix[i] = {
        Min: minutes,
        Hour: hours,
        TLen: step,
        Type: typer,
        Datas: [],
      };
    }
  };

  const CompletMatrix = () => {
    const step = points[0].TLen;
    for (let i = 0; i < points.length; i++) {
      let numInMatrix = (points[i].Hour * 60 + points[i].Min) / step;
      matrix[numInMatrix].Datas = points[i].Datas;
    }
  };

  React.useEffect(() => {
    axios.get('http://localhost:3000/stat01.json').then(({ data }) => {
      setPoints(data.Statistics);
      setIsOpen(true);
    });
  }, []);

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
      <Grid container item sx={{ marginTop: 0.5, height: '56vh', border: 0 }}>
        <Grid item xs={24} sx={{ border: 1, borderRadius: 1, borderColor: 'primary.main' }}>
          <StatisticHeader />
          <Box sx={{ overflowX: 'auto', height: '59vh', border: 0 }}>
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
