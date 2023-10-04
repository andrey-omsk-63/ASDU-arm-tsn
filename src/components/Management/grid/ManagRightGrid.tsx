import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import { Tflight } from "../../../interfaceMNG.d";

import { styleMgl, styleMRG01, styleMRG02 } from "./ManagGridStyle";
import { styleMRG02Center, styleMRGHeader } from "./ManagGridStyle";
import { styleMRG03, styleMRG04 } from "./ManagGridStyle";

export interface DataKnob {
  knop: Knob[];
}

export interface Knob {
  cmd: number;
  param: number;
  region: string;
  area: string;
  subarea: number;
}

const ManagementRightGrid = (props: {
  open: boolean;
  tflightt: Tflight[];
  mode: number;
  areaa: string;
  subArea: number;
  masxt: any;
  masknob: Knob[];
}) => {
  let points = props.tflightt;
  let masSpis = [];
  let mass: any = [];
  let sostGl = 0;
  let podchGl = 0;
  let j = 0;
  let massKnob: Knob[] = [];
  let massknob: Knob[] = [];
  const massClinch = [16, 17, 18, 38, 39];

  const SearchInMassKnob = (cmd: number) => {
    for (let i = 0; i < massknob.length; i++) {
      if (massknob[i].cmd === cmd) return massknob[i].param;
    }
    return -1;
  };

  const CounterMode = (i: number, j: number) => {
    if (!massClinch.includes(points[i].tlsost.num)) {
      // на связи
      mass[j].sost++;
      sostGl++;
      let podchGlOld = podchGl;
      switch (points[i].techMode) {
        case 2:
          if (
            !points[i].StatusCommandDU.isCK && // назначен ВР
            !points[i].StatusCommandDU.IsPK &&
            !points[i].StatusCommandDU.IsNK
          ) {
            if (
              SearchInMassKnob(5) <= 0 &&
              SearchInMassKnob(6) <= 0 && // не было ручного упр-я
              SearchInMassKnob(7) <= 0
            ) {
              mass[j].podch++;
              podchGl++;
            }
          }
          break;
        case 5:
          for (let k = 0; k < props.masxt.length; k++) {
            if (
              parseInt(points[i].area.num) === props.masxt[k].areaXT &&
              points[i].subarea === props.masxt[k].subareaXT
            ) {
              if (props.masxt[k].pknowXT > 0) {
                podchGl++;
                mass[j].podch++;
              }
            }
          }
          break;
        case 9:
          mass[j].podch++;
          podchGl++;
      }
      // подчинён вручную?
      if (podchGl === podchGlOld) {
        if (points[i].StatusCommandDU.IsPK) {
          if (points[i].pk === SearchInMassKnob(5)) {
            podchGl++;
            mass[j].podch++;
          }
        } else {
          if (points[i].StatusCommandDU.IsCK && SearchInMassKnob(5) <= 0) {
            if (points[i].ck === SearchInMassKnob(6)) {
              podchGl++;
              mass[j].podch++;
            }
          } else {
            if (points[i].StatusCommandDU.IsNK && SearchInMassKnob(6) <= 0) {
              if (points[i].nk === SearchInMassKnob(7)) {
                podchGl++;
                mass[j].podch++;
              }
            }
          }
        }
      }
      if (points[i].StatusCommandDU.IsPK) mass[j].isPK = true;
      if (points[i].StatusCommandDU.IsCK) mass[j].isCK = true;
      if (points[i].StatusCommandDU.IsNK) mass[j].isNK = true;
      if (props.mode === 2) {
        for (let k = 0; k < props.masxt.length; k++) {
          if (
            parseInt(points[i].area.num) === props.masxt[k].areaXT &&
            points[i].subarea === props.masxt[k].subareaXT
          ) {
            mass[j].releaseXT = true;
          }
        }
      }
    }
  };

  const HeaderMRG03 = () => {
    const StrokaGridHeader = (xss: number, write: string) => {
      return (
        <Grid item xs={xss} sx={styleMRG03}>
          <b>{write}</b>
        </Grid>
      );
    };

    const StrokaHeaderMode1 = () => {
      return (
        <Grid container sx={styleMRGHeader}>
          {StrokaGridHeader(0.3, "№")}
          {StrokaGridHeader(0.7, "Район")}
          {StrokaGridHeader(4.8, "Устройствa")}
          {StrokaGridHeader(2.5, "Текущее состояние")}
          {StrokaGridHeader(3.7, "Состояние ХТ")}
        </Grid>
      );
    };

    const StrokaHeaderMode2 = () => {
      return (
        <Grid container sx={styleMRGHeader}>
          {StrokaGridHeader(0.3, "№")}
          {StrokaGridHeader(1.1, "Подрайон")}
          {StrokaGridHeader(4.5, "Устройствa")}
          {StrokaGridHeader(2.4, "Текущее состояние")}
          {StrokaGridHeader(3.7, "Состояние ХТ")}
        </Grid>
      );
    };

    const StrokaHeaderMode3 = () => {
      return (
        <Grid container sx={styleMRGHeader}>
          {StrokaGridHeader(0.3, "№")}
          {StrokaGridHeader(1.1, "Подрайон")}
          {StrokaGridHeader(0.4, "ДК")}
          {StrokaGridHeader(4.0, "Наименование")}
          {StrokaGridHeader(1.5, "Устройствo")}
          {StrokaGridHeader(2.0, "Состояние")}
          {StrokaGridHeader(0.5, "ПК")}
          {StrokaGridHeader(0.5, "СК")}
          {StrokaGridHeader(0.5, "НК")}
          {StrokaGridHeader(1.2, "Статус")}
        </Grid>
      );
    };

    return props.mode === 1 ? (
      <div>{StrokaHeaderMode1()}</div>
    ) : props.mode === 2 ? (
      <div>{StrokaHeaderMode2()}</div>
    ) : (
      <div>{StrokaHeaderMode3()}</div>
    );
  };

  const StrokaMRG03 = () => {
    const StrokaGridInfo = (xss: number, stylXX: any, write: string) => {
      return (
        <Grid item xs={xss} sx={stylXX}>
          {write}
        </Grid>
      );
    };

    const StrokaSpsMode1 = () => {
      let resStr = [];
      for (let i = 0; i < mass.length; i++) {
        let prosentSv = (100 * mass[i].sost) / mass[i].koldk;
        let prosentPch = (100 * mass[i].podch) / mass[i].koldk;
        let soobBP = "Назначен";
        let soobXT = "ХТ для данного района ";
        if (mass[i].isPK) {
          soobBP += " ПК";
        } else {
          for (let i = 0; i < massKnob.length; i++) {
            if (massKnob[i].cmd === 5) {
              soobBP += " пк";
              break;
            }
          }
        }
        // ХТ
        if (mass[i].isCK) {
          soobBP += " CК";
        } else {
          for (let i = 0; i < massKnob.length; i++) {
            if (massKnob[i].cmd === 6) {
              soobBP += " ск";
              break;
            }
          }
        }
        if (mass[i].isNK) {
          soobBP += " HК";
        } else {
          for (let i = 0; i < massKnob.length; i++) {
            if (massKnob[i].cmd === 7) {
              soobBP += " нк";
              break;
            }
          }
        }
        if (soobBP === "Назначен") {
          for (let i = 0; i < massKnob.length; i++) {
            switch (massKnob[i].cmd) {
              case 5:
                soobBP += " ПК";
                break;
              case 6:
                soobBP += " CК";
                break;
              case 7:
                soobBP += " HК";
            }
          }
        }
        if (soobBP === "Назначен") soobBP += " ВР";
        if (mass[i].isXT) {
          soobXT += "назначен";
        } else {
          soobXT += "отсутствует";
        }
        resStr.push(
          <Grid item key={i} container>
            {StrokaGridInfo(0.3, styleMRG02Center, String(i + 1))}
            {StrokaGridInfo(0.7, styleMRG02Center, String(mass[i].areaNum))}
            <Grid item xs={4.8} sx={styleMRG02}>
              Всего ДК&nbsp;<b>{mass[i].koldk}</b>&nbsp; на связи&nbsp;
              <b>{prosentSv.toFixed(2)}%</b>&nbsp; подчинены&nbsp;
              <b>{prosentPch.toFixed(2)}%</b>
            </Grid>
            {StrokaGridInfo(2.5, styleMRG02, soobBP)}
            {StrokaGridInfo(3.7, styleMRG01, soobXT)}
          </Grid>
        );
      }
      return resStr;
    };

    const StrokaSpsMode2 = () => {
      let resStr = [];
      for (let i = 0; i < mass.length; i++) {
        let soobBP = "Назначен";
        let soobXT = "ХТ для данного подрайона ";
        if (mass[i].isPK) {
          soobBP += " ПК";
        } else {
          for (let i = 0; i < massKnob.length; i++) {
            if (massKnob[i].cmd === 5) {
              soobBP += " пк";
              break;
            }
          }
        }
        if (mass[i].isCK) {
          soobBP += " CК";
        } else {
          for (let i = 0; i < massKnob.length; i++) {
            if (massKnob[i].cmd === 6) {
              soobBP += " ск";
              break;
            }
          }
        }
        if (mass[i].isNK) {
          soobBP += " HК";
        } else {
          for (let i = 0; i < massKnob.length; i++) {
            if (massKnob[i].cmd === 7) {
              soobBP += " нк";
              break;
            }
          }
        }
        if (soobBP === "Назначен") {
          for (let i = 0; i < massKnob.length; i++) {
            switch (massKnob[i].cmd) {
              case 5:
                soobBP += " ПК";
                break;
              case 6:
                soobBP += " CК";
                break;
              case 7:
                soobBP += " HК";
            }
          }
        }
        if (soobBP === "Назначен") soobBP = soobBP + " ВР";
        if (mass[i].isXT) {
          soobXT = soobXT + "назначен/";
          if (mass[i].releaseXT) {
            soobXT += "включён";
          } else {
            soobXT += "выключен";
          }
        } else {
          soobXT += "отсутствует";
        }
        resStr.push(
          <Grid item key={i} container>
            {StrokaGridInfo(0.3, styleMRG02Center, String(i + 1))}
            {StrokaGridInfo(
              1.1,
              styleMRG02Center,
              String(mass[i].areaNum) + ":" + String(mass[i].subareaNum)
            )}
            <Grid item xs={4.5} sx={styleMRG02}>
              Всего ДК&nbsp;<b>{mass[i].koldk}</b>&nbsp; на связи&nbsp;
              <b>{mass[i].sost}</b>&nbsp; подчинены&nbsp;<b>{mass[i].podch}</b>
            </Grid>
            {StrokaGridInfo(2.4, styleMRG02, soobBP)}
            {StrokaGridInfo(3.7, styleMRG01, soobXT)}
          </Grid>
        );
      }
      return resStr;
    };

    const StrokaSpsMode3 = () => {
      let resStr = [];
      for (let i = 0; i < points.length; i++) {
        let rec1 = String(points[i].area.num) + ":" + String(points[i].subarea);
        let rec2 = String(points[i].tlsost.description);
        resStr.push(
          <Grid item key={i} container>
            {StrokaGridInfo(0.3, styleMRG02Center, String(i + 1))}
            {StrokaGridInfo(1.1, styleMRG02Center, rec1)}
            {StrokaGridInfo(0.4, styleMRG02Center, String(points[i].ID))}
            {StrokaGridInfo(4, styleMRG02, String(points[i].description))}
            {StrokaGridInfo(1.5, styleMRG02Center, String(points[i].idevice))}
            {StrokaGridInfo(2, styleMRG02, rec2)}
            {StrokaGridInfo(0.5, styleMRG02Center, String(points[i].pk))}
            {StrokaGridInfo(0.5, styleMRG02Center, String(points[i].ck))}
            {StrokaGridInfo(0.5, styleMRG02Center, String(points[i].nk))}
            {StrokaGridInfo(1.2, styleMRG01, points[i].techModeString)}
          </Grid>
        );
      }
      return resStr;
    };

    return props.mode === 1 ? (
      <div>{StrokaSpsMode1()}</div>
    ) : props.mode === 2 ? (
      <div>{StrokaSpsMode2()}</div>
    ) : (
      <div>{StrokaSpsMode3()}</div>
    );
  };

  const StrokaInfo = () => {
    let sumDk = points.length;
    let prosSv = "";
    let prosPch = "";
    let proXT = "";
    let soobBP = "";
    if (props.mode !== 3) {
      prosSv = ((100 * sostGl) / sumDk).toFixed(2).toString() + "%";
      prosPch = ((100 * podchGl) / sumDk).toFixed(2).toString() + "%";
    } else {
      prosSv = sostGl.toString();
      prosPch = podchGl.toString();
      proXT = "ХТ для подрайона отсутствует";
      for (let j = 0; j < props.masxt.length; j++) {
        if (
          parseInt(points[0].area.num) === props.masxt[j].areaXT &&
          points[0].subarea === props.masxt[j].subareaXT
        ) {
          proXT = "ХТ для подрайона назначен/";
          if (props.masxt[j].releaseXT) proXT += "включён ";
          if (!props.masxt[j].releaseXT) proXT += "выключен ";

          if (props.masxt[j].switchXT) proXT += "Расчёт включён";
          if (!props.masxt[j].switchXT) proXT += "Расчёт выключен";

          if (props.masxt[j].pknowXT > 0)
            soobBP = " Выбран план №" + props.masxt[j].pknowXT.toString();
        }
      }
    }
    if (soobBP === "") {
      soobBP = "Назначен ВР";
      if (massKnob.length > 0) {
        soobBP = "";
        for (let i = 0; i < massKnob.length; i++) {
          switch (massKnob[i].cmd) {
            case 5:
              soobBP += " ПК" + massKnob[i].param.toString();
              break;
            case 6:
              soobBP += " CК" + massKnob[i].param.toString();
              break;
            case 7:
              soobBP += " HК" + massKnob[i].param.toString();
          }
        }
        if (soobBP === "") {
          soobBP = "Назначен ВР";
        } else {
          soobBP = "Назначен" + soobBP;
        }
      }
    }

    return (
      <Grid item xs={12} sx={styleMgl}>
        Всего ДК&nbsp;<b>{sumDk}</b>&nbsp;на связи&nbsp;<b>{prosSv}</b>
        &nbsp;подчинены&nbsp;
        <b>{prosPch}</b>&nbsp;&nbsp;
        <b>{soobBP}</b>&nbsp;&nbsp;<em>{proXT}</em>
      </Grid>
    );
  };

  //=== Тело компонента =======================================================
  massknob = [];
  massKnob = [];
  for (let i = 0; i < props.masknob.length; i++) {
    if (props.masknob[i].param > 0) massknob.push(props.masknob[i]);
    if (
      props.areaa === props.masknob[i].area &&
      props.subArea === props.masknob[i].subarea &&
      props.masknob[i].cmd !== 13
    )
      if (props.masknob[i].param > 0) massKnob.push(props.masknob[i]);
  }

  switch (props.mode) {
    case 1:
      points = props.tflightt;
      if (props.open) {
        mass[0] = {
          areaNum: points[0].area.num,
          koldk: 1,
          sost: 0,
          podch: 0,
          isPK: false,
          isCK: false,
          isNK: false,
          isXT: false,
          releaseXT: false,
        };
        CounterMode(0, 0);
        j = 0;
        for (let i = 1; i < points.length; i++) {
          if (mass[j].areaNum !== points[i].area.num) {
            j++;
            mass[j] = {
              areaNum: points[i].area.num,
              koldk: 1,
              sost: 0,
              podch: 0,
              isPK: false,
              isCK: false,
              isNK: false,
              isXT: false,
              releaseXT: false,
            };
            CounterMode(i, j);
          } else {
            mass[j].koldk++;
            CounterMode(i, j);
          }
        }
      }
      let masArea: Tflight[];
      let flagXtArea = true;
      for (let k = 0; k < mass.length; k++) {
        masArea = points.filter(
          (points) => points.area.num === mass[k].areaNum
        );
        flagXtArea = true;
        let flEstXt = false;
        for (let i = 0; i < masArea.length; i++) {
          for (let j = 0; j < props.masxt.length; j++) {
            if (parseInt(masArea[i].area.num) === props.masxt[j].areaXT) {
              flEstXt = true;
              if (masArea[i].subarea === props.masxt[j].subareaXT) {
                mass[k].isXT = true;
              } else {
                mass[k].isXT = false;
                flagXtArea = false;
              }
            }
          }
        }
        if (flEstXt) mass[k].isXT = flagXtArea;
      }
      break;

    case 2:
      masSpis = points.filter((points) => points.area.num === props.areaa);
      points = masSpis;

      if (props.open) {
        mass[0] = {
          areaNum: points[0].area.num,
          subareaNum: points[0].subarea,
          koldk: 1,
          sost: 0,
          podch: 0,
          isPK: false,
          isCK: false,
          isNK: false,
          isXT: false,
          releaseXT: false,
        };
        CounterMode(0, 0);
        j = 0;
        for (let i = 1; i < points.length; i++) {
          if (mass[j].subareaNum !== points[i].subarea) {
            j++;
            mass[j] = {
              areaNum: points[i].area.num,
              subareaNum: points[i].subarea,
              koldk: 1,
              sost: 0,
              podch: 0,
              isPK: false,
              isCK: false,
              isNK: false,
              isXT: false,
              releaseXT: false,
            };
            CounterMode(i, j);
          } else {
            mass[j].koldk++;
            CounterMode(i, j);
          }
        }
      }
      for (let i = 0; i < mass.length; i++) {
        for (let j = 0; j < props.masxt.length; j++) {
          if (
            parseInt(mass[i].areaNum) === props.masxt[j].areaXT &&
            mass[i].subareaNum === props.masxt[j].subareaXT
          )
            mass[i].isXT = true;
        }
      }
      break;

    default:
      masSpis = points.filter(
        (points) =>
          points.area.num === props.areaa && points.subarea === props.subArea
      );
      points = masSpis;
      for (let i = 0; i < points.length; i++) {
        // на связи?
        if (!massClinch.includes(points[i].tlsost.num)) {
          sostGl++;
          let podchGlOld = podchGl;
          switch (points[i].techMode) {
            case 2: // назначен ВР
              if (
                !points[i].StatusCommandDU.isCK &&
                !points[i].StatusCommandDU.IsPK &&
                !points[i].StatusCommandDU.IsNK
              ) {
                if (
                  SearchInMassKnob(5) <= 0 &&
                  SearchInMassKnob(6) <= 0 && // не было ручного упр-я
                  SearchInMassKnob(7) <= 0
                ) {
                  podchGl++;
                }
              }
              break;
            case 5:
              for (let j = 0; j < props.masxt.length; j++) {
                if (
                  parseInt(points[0].area.num) === props.masxt[j].areaXT &&
                  points[0].subarea === props.masxt[j].subareaXT
                ) {
                  if (props.masxt[j].pknowXT > 0) podchGl++;
                }
              }
              break;
            case 9:
              podchGl++;
          }
          // подчинён вручную?
          if (podchGl === podchGlOld) {
            if (points[i].StatusCommandDU.IsPK) {
              if (points[i].pk === SearchInMassKnob(5)) podchGl++;
            } else {
              if (points[i].StatusCommandDU.IsCK && SearchInMassKnob(7) <= 0) {
                if (points[i].ck === SearchInMassKnob(6)) podchGl++;
              } else {
                if (points[i].StatusCommandDU.IsNK && SearchInMassKnob(6) <= 0)
                  if (points[i].nk === SearchInMassKnob(7)) podchGl++;
              }
            }
          }
        }
      }
  }

  return (
    <>
      <StrokaInfo />
      <Grid item container sx={styleMRG04}>
        <Grid item xs={12}>
          <HeaderMRG03 />
          <Box sx={{ border: 0, overflowX: "auto", height: "81.6vh" }}>
            {props.open && <StrokaMRG03 />}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ManagementRightGrid;
