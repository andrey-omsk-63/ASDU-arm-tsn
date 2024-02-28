import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { statsaveCreate } from "../../../redux/actions";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import { MakeDate, TimeStr } from "../../../AppServiceFunctions";

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

//let oldXtProps = -1;
//let oldXttData = "aaa";
//let needRend = true;
//let datestatXtGraf: any = null;

const PointsLevel2Calc = (props: {
  open: boolean;
  ws: WebSocket;
  xctrll: XctrlInfo[];
  xtt: number;
  crossroad: number;
  saveXt: Function;
  calc: boolean;
  calcDeb: boolean;
}) => {
  //== Piece of Redux ======================================
  let datestat = useSelector((state: any) => {
    const { statsaveReducer } = state;
    return statsaveReducer.datestat;
  });
  //console.log("Datestat", datestat.xttData, datestat);
  const dispatch = useDispatch();
  //========================================================

  const xtProps = props.xtt;
  const points = props.xctrll[xtProps];
  let namer = points.xctrls[props.crossroad].name;

  //console.log('@@@@@@:', xtProps, props.crossroad, points);

  let debug = false;
  if (props.ws.url === "wss://localhost:3000/W") debug = true;

  const printRef = React.useRef(null);
  let pointer = points.results;

  if (datestat.xttData !== MakeDate(new Date())) {
    pointer = datestat.result;
    if (debug) namer = "Без имени_12.09.2022_10-12-57";
  }

  //props.saveXt(true);
  //console.log("NAMER", namer, pointer[namer]);

  React.useEffect(() => {
    if (pointer !== null) props.saveXt(true);
  }, [pointer, props]);

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
    //console.log("!!!######:", namer, pointer[namer], pointer);
    const colMin = 60 / pointer[namer][0].Time;
    for (let i = 0; i < pointer[namer].length; i++) {
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
    // for (let i = 0; i < pointer[namer].length; i++) {
    //   datas.push(pointer[namer][i].Value[0]);
    // }
    if (pointer[namer].length !== 0)
      int = pointer[namer][pointer[namer].length - 1].Value[0];
    datas.push(int);
    for (let i = 0; i < pointer[namer].length - 1; i++) {
      int = 0;
      if (pointer[namer].length !== 0) int = pointer[namer][i].Value[0];
      datas.push(int);
    }
    data.datasets[0].data = datas;
    //график обратного
    datas = [];
    // for (let i = 0; i < pointer[namer].length; i++) {
    //   datas.push(pointer[namer][i].Value[1]);
    // }
    if (pointer[namer].length !== 0)
      int = pointer[namer][pointer[namer].length - 1].Value[1];
    datas.push(int);
    for (let i = 0; i < pointer[namer].length - 1; i++) {
      int = 0;
      if (pointer[namer].length !== 0) int = pointer[namer][i].Value[1];
      datas.push(int);
    }
    data.datasets[1].data = datas;

    return (
      <Grid container item>
        <Grid item xs sx={{ width: "99vh", height: "28vh" }}>
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
        <Grid xs={5} item sx={styleXTC02}>
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
    let kakchestvo = "";

    if (pointer !== null) {
      if (pointer[namer].length !== 0) {
        //console.log("!!!!!!:", points.yellow);
        for (let i = 0; i < pointer[namer].length; i++) {
          kakchestvo = "";
          pusto = true;
          if (!pointer[namer][i].Good) {
            pusto = true;
            kakchestvo = "Работа по СК";
          }
          let tim = pointer[namer][i].Time;

          if (
            points.yellow.make &&
            tim >= points.yellow.start &&
            tim <= points.yellow.stop
          )
            kakchestvo = "Работа по НК и СК";
          //====== переход через 24:00 ======
          if (points.yellow.start > points.yellow.stop && points.yellow.make) {
            if (tim <= points.yellow.stop || tim >= points.yellow.start)
              kakchestvo = "Работа по НК и СК";
          }
          if (
            !pointer[namer][i].Value[0] &&
            !pointer[namer][i].Value[1] &&
            !pointer[namer][i].Value[2]
          ) {
            pusto = false;
            //kakchestvo = "";
          }
          // создание символьного файла
          let stroka = TimeStr(pointer[namer][i].Time) + ";";
          stroka += pointer[namer][i].Value[0] + ";";
          stroka += pointer[namer][i].Value[1] + ";";
          stroka += pointer[namer][i].Value[2] + ";";
          stroka += kakchestvo + ";\n";
          datestat.xtCsv += stroka;

          stroka = TimeStr(pointer[namer][i].Time) + " ";
          let st = pointer[namer][i].Value[0].toString();
          let stt = "     " + st;
          stroka += stt.slice(st.length) + "  ";
          st = pointer[namer][i].Value[1].toString();
          stt = "       " + st;
          stroka += stt.slice(st.length) + "  ";
          st = pointer[namer][i].Value[2].toString();
          stt = "       " + st;
          stroka += stt.slice(st.length) + "  ";
          stt = "                 " + kakchestvo;
          stroka += stt.slice(kakchestvo.length) + "\n";
          datestat.xtTxt += stroka;

          resStr.push(
            <Grid key={i} container item xs={12}>
              <Grid xs={1} item sx={!pusto ? styleXTC011 : styleXTC01}>
                {TimeStr(pointer[namer][i].Time)}
              </Grid>
              <Grid xs={2} item sx={!pusto ? styleXTC011 : styleXTC01}>
                {pointer[namer][i].Value[0]}
              </Grid>
              <Grid xs={2} item sx={!pusto ? styleXTC011 : styleXTC01}>
                {pointer[namer][i].Value[1]}
              </Grid>
              <Grid xs={2} item sx={!pusto ? styleXTC011 : styleXTC01}>
                {pointer[namer][i].Value[2]}
              </Grid>
              <Grid xs={5} item sx={!pusto ? styleXTC011 : styleXTC01}>
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

  const OutputGraf = () => {
    return (
      <Grid container item sx={{}}>
        <Grid ref={printRef} item xs sx={styleXTC03}>
          {pointer !== null && (
            <>{pointer[namer].length !== 0 && <>{PointsGraf00()}</>}</>
          )}
        </Grid>
      </Grid>
    );
  };

  const OutputMainTabl = () => {
    return (
      <Grid item xs={8} sx={styleXTC033}>
        {PointsLevel2CalcTab2Header()}
        <Box sx={{ overflowX: "auto", height: "54.1vh" }}>
          <Grid container>{PointsLevel2CalcTab1Stroka()}</Grid>
        </Box>
      </Grid>
    );
  };

  const HeaderSupportiveTabl = () => {
    return (
      <Grid container item xs={12} sx={{ marginRight: 0.74 }}>
        <Grid xs={6} item sx={styleXTC02}>
          <b>Время</b>
        </Grid>
        <Grid xs={6} item sx={styleXTC02}>
          <b>ПК</b>
        </Grid>
      </Grid>
    );
  };

  const AccordKStoPK = (ks: number) => {
    let pk = 0;
    for (let i = 0; i < points.ext.length; i++) {
      if (points.ext[i][0] === ks) pk = points.ext[i][1];
    }
    return pk;
  };

  const CalcSupportiveTabl = () => {
    //console.log("points", points.ext);
    let masTime = [TimeStr(pointer[namer][0].Time)];
    let masKs = [pointer[namer][0].Value[2]];

    for (let i = 1; i < pointer[namer].length; i++) {
      if (pointer[namer][i].Value[2] !== masKs[masKs.length - 1]) {
        masTime.push(TimeStr(pointer[namer][i].Time));
        masKs.push(pointer[namer][i].Value[2]);
      }
    }
    for (let i = 0; i < masKs.length; i++) masKs[i] = AccordKStoPK(masKs[i]);

    let resStr = [];
    for (let i = 0; i < masTime.length; i++) {
      let int = masTime[i] + " - ";
      int += i !== masTime.length - 1 ? masTime[i + 1] : "24:00";

      resStr.push(
        <Grid key={i} container item xs={12}>
          <Grid xs={6} item sx={styleXTC011}>
            {int}
          </Grid>
          <Grid xs={6} item sx={styleXTC011}>
            {!masKs[i] ? "Нет информациии" : masKs[i]}
          </Grid>
        </Grid>
      );
    }
    return resStr;
  };

  return (
    <>
      {datestat.xttData !== "sss" && (
         <Box sx={{ marginTop: 0, border: 0 }}>
           {/* <Box sx={{ marginTop: "-0.3vh", border: 1 }}></Box> */}
          {OutputGraf()}
          <Grid container sx={{ marginTop: '0.6vh', height: "57.5vh" }}>
            {pointer !== null ? (
              <>
                {pointer[namer].length !== 0 ? (
                  <Grid item xs={12}>
                    <Grid container>
                      {OutputMainTabl()}
                      <Grid item xs={0.05}></Grid>
                      <Grid item xs={3.95} sx={styleXTC033}>
                        {HeaderSupportiveTabl()}
                        <Box sx={{ overflowX: "auto", height: "54.1vh" }}>
                          <Grid container>{CalcSupportiveTabl()}</Grid>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                ) : (
                  <Box sx={{ textAlign: "center" }}>
                    <h1>Нет информациии</h1>
                  </Box>
                )}
              </>
            ) : (
              <Box sx={{ textAlign: "center" }}>
                <h1>Нет информациии</h1>
              </Box>
            )}
          </Grid>
        </Box>
      )}
    </>
  );
};

export default PointsLevel2Calc;
