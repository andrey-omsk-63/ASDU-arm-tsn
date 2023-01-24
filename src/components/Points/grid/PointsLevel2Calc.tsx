import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { statsaveCreate } from "../../../redux/actions";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import { TimeStr } from "../../../AppServiceFunctions";

import { styleXTC011, styleXTC01, styleXTC02 } from "./PointsGridStyle";
import { styleXTC03, styleXTC033 } from "./PointsGridStyle";

import { XctrlInfo } from "../../../interfaceGl.d";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
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
  //========================================================
  const xtProps = props.xtt;
  const points = props.xctrll[xtProps];
  const namer = points.xctrls[props.crossroad].name;
  const printRef = React.useRef(null);

  if (points.results !== null) props.saveXt(true);

  const labels: string[] = [];
  let data: DataGl = {
    labels,
    datasets: [
      {
        label: "Прямое",
        data: [],
        borderWidth: 1,
        borderColor: "orange",
        backgroundColor: "orange",
        pointRadius: 1,
      },
      {
        label: "Обратное",
        data: [],
        borderWidth: 1,
        borderColor: "blue",
        backgroundColor: "blue",
        pointRadius: 1,
      },
    ],
  };

  const PointsGraf00 = () => {
    const colMin = 60 / points.results[namer][0].Time;
    for (let i = 0; i < points.results[namer].length; i++) {
      let int = "";
      if (i % colMin === 0) {
        if (i / colMin < 10) int += "0";
        int += String(i / colMin);
        int += ":00";
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
      if (points.results[namer].length !== 0)
        int = points.results[namer][i].Value[0];
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
      if (points.results[namer].length !== 0)
        int = points.results[namer][i].Value[1];
      datas.push(int);
    }
    data.datasets[1].data = datas;

    return (
      <Grid container item>
        <Grid ref={printRef} item xs sx={{ width: "99vh", height: "28vh" }}>
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
          position: "top" as const,
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
      <Grid container item xs={12} sx={{ marginRight: 0.74 }}>
        <Grid xs={1} item sx={styleXTC02}></Grid>
        <Grid xs={2} item sx={styleXTC02}>
          <b>Прямой</b>
        </Grid>
        <Grid xs={2} item sx={styleXTC02}>
          <b>Обратный</b>
        </Grid>
        <Grid xs={2} item sx={styleXTC02}>
          <b>КС на ДК</b>
        </Grid>
        <Grid xs item sx={styleXTC02}>
          <b>Примечание</b>
        </Grid>
      </Grid>
    );
  };

  const PointsLevel2CalcTab1Stroka = () => {
    let resStr = [];
    datestat.xtCsv = "";
    datestat.xtTxt = "";
    let pusto = false;
    let kakchestvo = "Работа по СК";
    if (points.results !== null) {
      if (points.results[namer]) {
        for (let i = 0; i < points.results[namer].length; i++) {
          // if (!points.results[namer][i].Good) {
          //   pusto = true;
          //   kakchestvo = "Нет данных";
          // }
          let tim = points.results[namer][i].Time;
          kakchestvo = "Работа по СК";
          if (
            !points.yellow.make &&
            tim >= points.yellow.start &&
            tim <= points.yellow.stop
          )
            kakchestvo = "Работа по НК и СК";

          let stroka = TimeStr(points.results[namer][i].Time) + ";";
          stroka += points.results[namer][i].Value[0] + ";";
          stroka += points.results[namer][i].Value[1] + ";";
          stroka += points.results[namer][i].Value[2] + ";";
          stroka += kakchestvo + ";\n";
          datestat.xtCsv += stroka;

          stroka = TimeStr(points.results[namer][i].Time) + " ";
          let st = points.results[namer][i].Value[0].toString();
          let stt = "     " + st;
          stroka += stt.slice(st.length) + "  ";
          st = points.results[namer][i].Value[1].toString();
          stt = "       " + st;
          stroka += stt.slice(st.length) + "  ";
          st = points.results[namer][i].Value[2].toString();
          stt = "       " + st;
          stroka += stt.slice(st.length) + "  ";
          stt = "                 " + kakchestvo;
          stroka += stt.slice(kakchestvo.length) + "\n";
          datestat.xtTxt += stroka;

          resStr.push(
            <Grid key={Math.random()} container item xs={12}>
              <Grid xs={1} item sx={styleXTC011}>
                {TimeStr(points.results[namer][i].Time)}
              </Grid>
              <Grid xs={2} item sx={pusto ? styleXTC011 : styleXTC01}>
                {points.results[namer][i].Value[0]}
              </Grid>
              <Grid xs={2} item sx={pusto ? styleXTC011 : styleXTC01}>
                {points.results[namer][i].Value[1]}
              </Grid>
              <Grid xs={2} item sx={pusto ? styleXTC011 : styleXTC01}>
                {points.results[namer][i].Value[2]}
              </Grid>
              <Grid xs item sx={styleXTC011}>
                {kakchestvo}
              </Grid>
            </Grid>
          );
          pusto = false;
          kakchestvo = "";
        }
        datestat.data = new Date().toLocaleDateString();
        datestat.time = new Date().toLocaleTimeString().slice(0, -3);
        datestat.area = points.area;
        datestat.id = points.subarea;
        datestat.xtName = namer;
        datestat.xtGraf = printRef;
        dispatch(statsaveCreate(datestat));
      }
    }
    return resStr;
  };

  return (
    <Box sx={{ marginTop: -0.3 }}>
      <Grid container item sx={{ height: "28vh" }}>
        <Grid item xs sx={styleXTC03}>
          {points.results !== null && <>{PointsGraf00()}</>}
        </Grid>
      </Grid>
      <Grid container item sx={{ marginTop: 0.5, height: "59.5vh" }}>
        {points.results !== null && (
          <Grid item sx={styleXTC033}>
            {PointsLevel2CalcTab2Header()}
            <Box sx={{ overflowX: "auto", height: "56vh" }}>
              <Grid container>{PointsLevel2CalcTab1Stroka()}</Grid>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default PointsLevel2Calc;
