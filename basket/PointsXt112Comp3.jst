import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
//import Stack from '@mui/material/Stack';

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

const PointsXt112Comp3 = (props) => {
  let labels = [];
  let data = {
    labels,
    datasets: [
      {
        label: 'Прямое',
        data: [],
        borderWidth: 1,
        borderColor: 'orange',
        backgroundColor: 'orange',
        pointRadius: 1,
      },
      {
        label: 'Обратное',
        data: [],
        borderWidth: 1,
        borderColor: 'blue',
        backgroundColor: 'blue',
        pointRadius: 1,
      },
    ],
  };

  const styleXTG011 = {
    fontSize: 11,
    borderRight: 1,
    borderBottom: 1,
    borderColor: 'primary.main',
    padding: 0.2,
    textAlign: 'center',
  };

  const styleXTG01 = {
    fontSize: 11,
    borderRight: 1,
    borderBottom: 1,
    borderColor: 'primary.main',
    padding: 0.2,
    backgroundColor: '#E6EEF5',
    textAlign: 'center',
  };

  const styleXTG02 = {
    fontSize: 11,
    borderRight: 1,
    borderBottom: 1,
    borderColor: 'primary.main',
    padding: 0.4,
    textAlign: 'center',
    backgroundColor: '#C0C0C0',
  };

  const PointsGraf00 = () => {
    const colMin = 60 / props.xctrl.results[namer][0].Time;
    for (let i = 0; i < props.xctrl.results[namer].length; i++) {
      let int = '';
      if (i % colMin === 0) {
        if (i / colMin < 10) int += '0';
        int += String(i / colMin);
        int += ':00';
      }
      labels.push(int);
    }
    //график прямого
    let datas = [];
    for (let i = 0; i < props.xctrl.results[namer].length; i++) {
      datas.push(props.xctrl.results[namer][i].Value[0]);
    }
    data.datasets[0].data = datas;
    //график обратного
    datas = [];
    for (let i = 0; i < props.xctrl.results[namer].length; i++) {
      datas.push(props.xctrl.results[namer][i].Value[1]);
    }
    data.datasets[1].data = datas;

    return (
      <Grid item xs sx={{ height: '28vh' }}>
        <PointsGraf01 />
      </Grid>
    );
  };

  const PointsGraf01 = () => {
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: false,
        },
      },
    };

    return <Line options={options} data={data} />;
  };

  const PointsXt112Comp3Tab2Header = () => {
    return (
      <Box sx={{ marginRight: 0.74, border: 0 }}>
        <Grid container item xs={12}>
          <Grid xs={0.5} item sx={styleXTG02}></Grid>
          <Grid xs={1} item sx={styleXTG02}>
            <b>Прямой</b>
          </Grid>
          <Grid xs={1} item sx={styleXTG02}>
            <b>Обратный</b>
          </Grid>
          <Grid xs={1} item sx={styleXTG02}>
            <b>КС на ДК</b>
          </Grid>
          <Grid xs={1} item sx={styleXTG02}>
            <b>Качество</b>
          </Grid>
        </Grid>
      </Box>
    );
  };

  const TimeStr = (tim) => {
    let timLiner = '';
    let hour = Math.trunc(tim / 60);
    let min = tim % 60;

    if (hour < 10) timLiner = '0';
    timLiner += hour.toString();
    timLiner += ':';
    if (min < 10) timLiner += '0';
    timLiner += min.toString();
    return timLiner;
  };

  const namer = props.xctrl.xctrls[0].name;

  const PointsXt112Comp3Tab1Stroka = () => {
    let resStr = [];
    let pusto = false;
    let kakchestvo = '';
    for (let i = 0; i < props.xctrl.results[namer].length; i++) {
      if (!props.xctrl.results[namer][i].Good) {
        pusto = true;
        kakchestvo = 'Нет данных';
      }
      resStr.push(
        <Grid key={Math.random()} container item xs={12}>
          <Grid key={Math.random()} xs={0.5} item sx={styleXTG011}>
            {TimeStr(props.xctrl.results[namer][i].Time)}
          </Grid>
          <Grid key={Math.random()} xs={1} item sx={pusto ? styleXTG011 : styleXTG01}>
            {props.xctrl.results[namer][i].Value[0]}
          </Grid>
          <Grid key={Math.random()} xs={1} item sx={pusto ? styleXTG011 : styleXTG01}>
            {props.xctrl.results[namer][i].Value[1]}
          </Grid>
          <Grid key={Math.random()} xs={1} item sx={pusto ? styleXTG011 : styleXTG01}>
            {props.xctrl.results[namer][i].Value[2]}
          </Grid>
          <Grid key={Math.random()} xs={1} item sx={styleXTG011}>
            {kakchestvo}
          </Grid>
        </Grid>,
      );
      pusto = false;
      kakchestvo = '';
    }
    return resStr;
  };

  return (
    <>
      {props.value === '3' && (
        <Box sx={{ marginTop: -0.3, marginLeft: -0, marginRight: 0 }}>
          <Grid container item sx={{ margin: 0, height: '28vh' }}>
            <Grid item xs={12} sx={{ border: 1, borderRadius: 1, borderColor: 'primary.main' }}>
              <PointsGraf00 />
            </Grid>
          </Grid>
          <Grid container item sx={{ marginTop: 0.5, height: '56vh', border: 0 }}>
            <Grid item xs={24} sx={{ border: 1, borderRadius: 1, borderColor: 'primary.main' }}>
              <PointsXt112Comp3Tab2Header />
              <Box sx={{ overflowX: 'auto', height: '56vh', border: 0 }}>
                <Grid container item>
                  {PointsXt112Comp3Tab1Stroka()}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default PointsXt112Comp3;
