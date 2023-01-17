import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { statsaveCreate } from '../../../redux/actions';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { TimeStr } from '../../../AppServiceFunctions';

import { XctrlInfo } from '../../../interfaceGl.d';

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

const PointsLevel2Calc = (props: {
  open: boolean;
  xctrll: XctrlInfo[];
  xtt: number;
  crossroad: number;
  saveXt: any;
}) => {
  //== Piece of Redux ======================================
  let datestat = useSelector((state: any) => {
    const { statsaveReducer } = state;
    return statsaveReducer.datestat;
  });
  const dispatch = useDispatch();
  datestat.xtSave = true;
  dispatch(statsaveCreate(datestat));
  props.saveXt(true);
  //========================================================
  const xtProps = props.xtt;
  const points = props.xctrll[xtProps];

  const namer = points.xctrls[props.crossroad].name;
  //const namer = props.crossroad;

  const labels: string[] = [];
  let data: DataGl = {
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
    //borderRight: 1,
    borderBottom: 1,
    borderColor: 'primary.main',
    padding: 0.4,
    textAlign: 'center',
    backgroundColor: '#C0C0C0',
  };

  const styleXTG03 = {
    border: 1,
    borderRadius: 1,
    borderColor: 'primary.main',
    //width: '99vh',
    //height: '58vh',
  };
  const styleXTG033 = {
    border: 1,
    borderRadius: 1,
    borderColor: 'primary.main',
    //width: '99vh',
    height: '59.5vh',
  };

  const PointsGraf00 = () => {
    const colMin = 60 / points.results[namer][0].Time;
    for (let i = 0; i < points.results[namer].length; i++) {
      let int = '';
      if (i % colMin === 0) {
        if (i / colMin < 10) int += '0';
        int += String(i / colMin);
        int += ':00';
      }
      labels.push(int);
    }
    let int = 0;
    //график прямого
    let datas = [];
    // for (let i = 0; i < points.results[namer].length; i++) {
    //   datas.push(points.results[namer][i].Value[0]);
    // }
    if (points.results[namer].length !== 0)
      int = points.results[namer][points.results[namer].length - 1].Value[0];
    datas.push(int);
    for (let i = 0; i < points.results[namer].length - 1; i++) {
      int = 0;
      if (points.results[namer].length !== 0) int = points.results[namer][i].Value[0];
      datas.push(int);
    }
    data.datasets[0].data = datas;
    //график обратного
    datas = [];
    // for (let i = 0; i < points.results[namer].length; i++) {
    //   datas.push(points.results[namer][i].Value[1]);
    // }
    if (points.results[namer].length !== 0)
      int = points.results[namer][points.results[namer].length - 1].Value[1];
    datas.push(int);
    for (let i = 0; i < points.results[namer].length - 1; i++) {
      int = 0;
      if (points.results[namer].length !== 0) int = points.results[namer][i].Value[1];
      datas.push(int);
    }
    data.datasets[1].data = datas;

    return (
      <Grid container item>
        <Grid item xs sx={{ width: '99vh', height: '28vh' }}>
          <PointsGraf01 />
        </Grid>
      </Grid>
    );
  };

  const PointsGraf01 = () => {
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: false,
        },
      },
    };

    return <Line options={options} data={data} />;
  };

  const PointsLevel2CalcTab2Header = () => {
    return (
      // <Box sx={{ marginRight: 0.74, border: 0 }}>
      <Grid container item xs={12} sx={{ marginRight: 0.74 }}>
        <Grid xs={1} item sx={styleXTG02}></Grid>
        <Grid xs={2} item sx={styleXTG02}>
          <b>Прямой</b>
        </Grid>
        <Grid xs={2} item sx={styleXTG02}>
          <b>Обратный</b>
        </Grid>
        <Grid xs={2} item sx={styleXTG02}>
          <b>КС на ДК</b>
        </Grid>
        <Grid xs item sx={styleXTG02}>
          <b>Примечание</b>
        </Grid>
      </Grid>
      // </Box>
    );
  };

  const PointsLevel2CalcTab1Stroka = () => {
    let resStr = [];
    let pusto = false;
    let kakchestvo = 'Работа по СК';
    if (points.results !== null) {
      if (points.results[namer]) {
        for (let i = 0; i < points.results[namer].length; i++) {
          // if (!points.results[namer][i].Good) {
          //   pusto = true;
          //   kakchestvo = "Нет данных";
          // }
          let tim = points.results[namer][i].Time;
          kakchestvo = 'Работа по СК';
          if (!points.yellow.make && tim >= points.yellow.start && tim <= points.yellow.stop)
            kakchestvo = 'Работа по НК и СК';

          resStr.push(
            <Grid key={Math.random()} container item xs={12}>
              <Grid key={Math.random()} xs={1} item sx={styleXTG011}>
                {TimeStr(points.results[namer][i].Time)}
              </Grid>
              <Grid key={Math.random()} xs={2} item sx={pusto ? styleXTG011 : styleXTG01}>
                {points.results[namer][i].Value[0]}
              </Grid>
              <Grid key={Math.random()} xs={2} item sx={pusto ? styleXTG011 : styleXTG01}>
                {points.results[namer][i].Value[1]}
              </Grid>
              <Grid key={Math.random()} xs={2} item sx={pusto ? styleXTG011 : styleXTG01}>
                {points.results[namer][i].Value[2]}
              </Grid>
              <Grid key={Math.random()} xs item sx={styleXTG011}>
                {kakchestvo}
              </Grid>
            </Grid>,
          );
          pusto = false;
          kakchestvo = '';
        }
      }
    }
    return resStr;
  };

  return (
    <Box sx={{ marginTop: -0.3 }}>
      <Grid container item sx={{ height: '28vh' }}>
        <Grid item xs sx={styleXTG03}>
          {points.results !== null && <>{PointsGraf00()}</>}
        </Grid>
      </Grid>
      <Grid container item sx={{ marginTop: 0.5 }}>
        <Grid item sx={styleXTG033}>
          {PointsLevel2CalcTab2Header()}
          <Box sx={{ overflowX: 'auto', height: '56vh' }}>
            <Grid container>{PointsLevel2CalcTab1Stroka()}</Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PointsLevel2Calc;
