import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { statsaveCreate } from "../../../redux/actions";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import { MakeDate, TimeStr, MakeDateRus } from "../../../AppServiceFunctions";
import { OptionsForLine } from "../../../AppServiceFunctions";

import { debug } from "../../../App";

import { styleXTC011, styleXTC01, styleXTC02 } from "./PointsGridStyle";
import { styleXTC03, styleXTC033, styleXTC04 } from "./PointsGridStyle";
import { styleStError, styleXTG101 } from "../../../AppStyle";

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
  saveXt: Function;
  calc: boolean;
  calcDeb: boolean;
  update: boolean;
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
  const printRef = React.useRef(null);
  let statusXT = false;
  if (!points.release && points.switch) statusXT = true; // исполнение выкл и расчёт вкл

  let namer = points.xctrls[props.crossroad].name;
  let pointer = points.results;
  let extDesc: any = points.extdesc;
  if (extDesc === undefined)
    extDesc = new Array(16).fill("поменяйте структуру");

  if (datestat.xttData !== MakeDate(new Date())) {
    pointer = datestat.result;
    if (debug) namer = "Без имени_12.09.2022_10-12-57";
  }

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
      <Grid container ref={printRef}>
        <Grid item xs sx={{ width: "99vh", height: "30vh" }}>
          <Line
            options={OptionsForLine(
              points.xctrls[props.crossroad].name +
                " за " +
                MakeDateRus(datestat.xttData)
            )}
            data={data}
          />
        </Grid>
      </Grid>
    );
  };

  const PointsLevel2CalcTab2Header = () => {
    return (
      <Grid container sx={{ marginRight: 0.74, cursor: "default" }}>
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
        for (let i = 0; i < pointer[namer].length; i++) {
          pusto = true;
          kakchestvo = "";
          let ksdk = pointer[namer][i].Value[2];
          if (ksdk) kakchestvo = extDesc[ksdk - 1];
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

          if (statusXT) kakchestvo = "Работа по СК";
          //====== переход через 24:00 ======
          if (points.yellow.start > points.yellow.stop && points.yellow.make) {
            if (tim <= points.yellow.stop || tim >= points.yellow.start)
              kakchestvo = "Работа по НК и СК";
          }
          if (
            !pointer[namer][i].Value[0] &&
            !pointer[namer][i].Value[1] &&
            !pointer[namer][i].Value[2]
          )
            pusto = false;
          // создание символьного файла
          let stroka = TimeStr(pointer[namer][i].Time) + ";";
          stroka += pointer[namer][i].Value[0] + ";";
          stroka += pointer[namer][i].Value[1] + ";";
          stroka += pointer[namer][i].Value[2] + ";";
          stroka += kakchestvo + ";\n";
          datestat.xtCsv += stroka;

          stroka = TimeStr(pointer[namer][i].Time) + " "; // генерация строки для файла печати
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
            <Grid key={i} container sx={{ cursor: "default" }}>
              <Grid xs={1} item sx={!pusto ? styleXTC011 : styleXTC01}>
                <Box sx={styleXTG101}>{TimeStr(pointer[namer][i].Time)}</Box>
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
        }
        datestat.data = new Date().toLocaleDateString();
        datestat.time = new Date().toLocaleTimeString().slice(0, -3);
        datestat.xtName = namer;
        datestat.xtGraf = printRef;
        dispatch(statsaveCreate(datestat));
      }
    }
    return resStr;
  };

  const OutputGraf = () => {
    return (
      <Grid container>
        {!!pointer && (
          <Grid item xs sx={styleXTC03}>
            {!!pointer[namer] && (
              <>{!!pointer[namer].length && <>{PointsGraf00()}</>}</>
            )}
          </Grid>
        )}
      </Grid>
    );
  };

  const OutputMainTabl = (update: boolean) => {
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
      <Grid container sx={{ marginRight: 0.74, cursor: "default" }}>
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
    for (let i = 0; i < points.ext.length; i++)
      if (points.ext[i][0] === ks) pk = points.ext[i][1];
    return pk;
  };

  const EmptyInfo = () => {
    let soob =
      "На " + MakeDateRus(datestat.xttData) + " по данному ХТ информации НЕТ";
    return (
      <Grid item xs={12}>
        <Box sx={styleStError}>
          <h1>{soob}</h1>
        </Box>
      </Grid>
    );
  };

  const CalcSupportiveTabl = () => {
    let masTime = [TimeStr(pointer[namer][0].Time)];
    let masKs = [pointer[namer][0].Value[2]];

    for (let i = 1; i < pointer[namer].length; i++) {
      if (pointer[namer][i].Value[2] !== masKs[masKs.length - 1]) {
        masTime.push(TimeStr(pointer[namer][i].Time));
        masKs.push(pointer[namer][i].Value[2]);
      }
    }
    for (let i = 0; i < masKs.length; i++) masKs[i] = AccordKStoPK(masKs[i]);

    return masTime.map((mastime: any, idx: number) => {
      let int = mastime + " - ";
      int += idx !== masTime.length - 1 ? masTime[idx + 1] : "24:00";
      return (
        <Grid key={idx} container sx={{ cursor: "default" }}>
          <Grid xs={6} item sx={styleXTC011}>
            <Box sx={styleXTG101}>{int}</Box>
          </Grid>
          <Grid xs={6} item sx={styleXTC011}>
            {!masKs[idx] ? "Нет информациии" : masKs[idx]}
          </Grid>
        </Grid>
      );
    });
  };

  const OutputNotMainTabl = () => {
    return (
      <Grid item xs={3.95} sx={styleXTC033}>
        {HeaderSupportiveTabl()}
        <Box sx={{ overflowX: "auto", height: "52.1vh" }}>
          <Grid container>{CalcSupportiveTabl()}</Grid>
        </Box>
      </Grid>
    );
  };

  return (
    <>
      {datestat.xttData !== "sss" && (
        <Box sx={{ marginTop: 0, border: 0 }}>
          {statusXT && <Box sx={styleXTC04}>Расчёт</Box>}
          {OutputGraf()}
          <Grid container sx={{ marginTop: "0.6vh", height: "55.4vh" }}>
            {!!pointer ? (
              <>
                {!!pointer[namer] ? (
                  <>
                    {!!pointer[namer].length ? (
                      <>
                        {OutputMainTabl(props.update)}
                        <Grid item xs={0.05}></Grid>
                        {OutputNotMainTabl()}
                      </>
                    ) : (
                      <>{EmptyInfo()}</>
                    )}
                  </>
                ) : (
                  <>{EmptyInfo()}</>
                )}
              </>
            ) : (
              <>{EmptyInfo()}</>
            )}
          </Grid>
        </Box>
      )}
    </>
  );
};

export default PointsLevel2Calc;
