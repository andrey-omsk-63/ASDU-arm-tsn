import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { statsaveCreate } from "../../../redux/actions";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

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
  datestat.xtSave = "";
  // dispatch(statsaveCreate(datestat));
  //========================================================
  const xtProps = props.xtt;
  const points = props.xctrll[xtProps];
  const namer = points.xctrls[props.crossroad].name;
  const chartRef = React.useRef(null);
  //const chartRef = React.useRef<ChartJS>(null);

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
    //let base64Image = null;
    //chartRef.current && (base64Image = chartRef.current.chartInstance.toBase64Image();)
    return <Line options={options} data={data} ref={chartRef}  />;
  };

  const handleDownloadPdf = async () => {
    
    if (printRef.current) {
      const element = printRef.current;
      const canvas = await html2canvas(element);
      console.log('@@@2:', canvas)
      const data = canvas.toDataURL('image/png');
    
      const pdf = new jsPDF();
      const imgProperties = pdf.getImageProperties(data);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight =
        (imgProperties.height * pdfWidth) / imgProperties.width;
  
      pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
      console.log('@@@3:', pdfWidth, pdfHeight)
      //pdf.addImage(data, 'PNG', 300, 0,267, 963, );
      pdf.save('print.pdf');
      console.log('Test,', pdfWidth, pdfHeight)
    }
    
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
    datestat.xtSave = "";
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
          datestat.xtSave += stroka;

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
        dispatch(statsaveCreate(datestat));
      }
    }
    return resStr;
  };

  // const convertToPdf = () => {
  //   //let canvas: any = null;

  //   let canvas = document.querySelector(".canvas")[0];
  //   const imgWidth = 190;
  //   const pdf = new PdfConverter("p", "mm");
  //   DomToImage.toPng(canvas).then((dataURL: any) => {
  //     const imgHeight = (canvas.clientHeight * imgWidth) / canvas.clientWidth;
  //     pdf.addImage(dataURL, "PNG", 10, 20, imgWidth, imgHeight);
  //   });
  //   pdf.save("save.pdf");
  // };

  // const clickHandler = () => {
  //   const link = document.createElement("a");
  //   //const pdfBlob = new Blob([chartRef.current], { type: 'application/pdf' });
  //   link.download = "chart.jpeg";
  //   if (chartRef.current) {
  //     link.href = chartRef.current.toBase64Image("image/jpeg", 1);
  //   }
    
  //   //link.href = URL.createObjectURL(chartRef);
  //   //link.href = chartRef.current.toBase64Image("image/jpeg", 1);
  //   //link.click();
  // };
  const printRef = React.useRef(null);
  handleDownloadPdf()

  return (
    <Box sx={{ marginTop: -0.3 }}>
      <Grid container item sx={{ height: "28vh" }}>
        <Grid ref={printRef} item xs sx={styleXTC03}>
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
