import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { Tflight } from '../../../interfaceMNG.d';

const ManagementRightGrid = (props: {
  open: boolean;
  tflightt: Tflight[];
  mode: number;
  areaa: string;
  subArea: number;
  masxt: any;
}) => {
  const styleMgl = {
    padding: 1,
    margin: 1,
    marginLeft: -0.5,
    marginTop: 0.5,
    marginBottom: 0,
  };

  const styleMRG01 = {
    borderBottom: 1,
    borderColor: 'primary.main',
    padding: 0.4,
  };

  const styleMRG02 = {
    borderRight: 1,
    borderBottom: 1,
    borderColor: 'primary.main',
    padding: 0.4,
  };

  const styleMRG02Center = {
    borderRight: 1,
    borderBottom: 1,
    borderColor: 'primary.main',
    padding: 0.4,
    textAlign: 'center',
  };

  const styleMRG03 = {
    borderBottom: 1,
    borderColor: 'primary.main',
    padding: 0.4,
    textAlign: 'center',
    backgroundColor: '#C0C0C0',
  };

  const styleMRG04 = {
    border: 1,
    borderRadius: 1,
    borderColor: 'primary.main',
    marginTop: 0.5,
    marginBottom: 0.5,
  };

  let points = props.tflightt;
  let masSpis = [];
  let mass: any = [];
  let sostGl = 0;
  let podchGl = 0;
  let j = 0;

  const CounterMode = (i: number, j: number) => {
    if (points[i].scon) {
      mass[j].sost++;
      sostGl++;
    }
    if (points[i].techMode === 9) {
      mass[j].podch++;
      podchGl++;
    }
    if (points[i].StatusCommandDU.IsPK) mass[j].isPk = true;
    if (points[i].StatusCommandDU.IsCK) mass[j].isCK = true;
    if (points[i].StatusCommandDU.IsNK) mass[j].isNK = true;
  };

  switch (props.mode) {
    case 1:
      points = props.tflightt;
      if (props.open) {
        mass[0] = {
          areaNum: points[0].area.num,
          koldk: 1,
          sost: 0,
          podch: 0,
          isPk: false,
          isCk: false,
          isNk: false,
          isXT: false,
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
              isPk: false,
              isCk: false,
              isNk: false,
              isXT: true,
            };
          } else {
            mass[j].koldk++;
            CounterMode(i, j);
          }
        }
      }

      let masArea: Tflight[];
      let flagXtArea = true;
      for (let k = 0; k < mass.length; k++) {
        masArea = points.filter((points) => points.area.num === mass[k].areaNum);
        flagXtArea = true;
        for (let i = 0; i < masArea.length; i++) {
          for (let j = 0; j < props.masxt.length; j++) {
            if (
              parseInt(masArea[i].area.num) === props.masxt[j].areaXT &&
              masArea[i].subarea === props.masxt[j].subareaXT
            ) {
              mass[k].isXT = true;
            } else {
              mass[k].isXT = false;
              flagXtArea = false;
            }
          }
        }
        mass[k].isXT = flagXtArea;
      }

      //console.log('mass_mod1_end', mass)
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
          isPk: false,
          isCk: false,
          isNk: false,
          isXT: false,
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
              isPk: false,
              isCk: false,
              isNk: false,
              isXT: false,
            };
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
          ) {
            mass[i].isXT = true;
          }
        }
      }

      break;

    default:
      masSpis = points.filter(
        (points) => points.area.num === props.areaa && points.subarea === props.subArea,
      );
      points = masSpis;
      for (let i = 0; i < points.length; i++) {
        if (points[i].scon) sostGl++;
        if (points[i].techMode === 9) podchGl++;
      }
  }

  const HeaderMRG03 = () => {
    const StrokaGridHeader = (xss: number, write: string) => {
      return (
        <Grid item key={Math.random()} xs={xss} sx={styleMRG03}>
          <b>{write}</b>
        </Grid>
      );
    };

    const StrokaHeaderMode1 = () => {
      let resStr = [];
      resStr.push(
        <Grid item key={Math.random()} container>
          {StrokaGridHeader(0.3, '№')}
          {StrokaGridHeader(0.7, 'Район')}
          {StrokaGridHeader(4.8, 'Устройствa')}
          {StrokaGridHeader(2.5, 'Текущее состояние')}
          {StrokaGridHeader(3.7, 'Состояние ХТ')}
        </Grid>,
      );
      return resStr;
    };

    const StrokaHeaderMode2 = () => {
      let resStr = [];
      resStr.push(
        <Grid item key={Math.random()} container>
          {StrokaGridHeader(0.3, '№')}
          {StrokaGridHeader(1.1, 'Подрайон')}
          {StrokaGridHeader(4.5, 'Устройствa')}
          {StrokaGridHeader(2.4, 'Текущее состояние')}
          {StrokaGridHeader(3.7, 'Состояние ХТ')}
        </Grid>,
      );
      return resStr;
    };

    const StrokaHeaderMode3 = () => {
      let resStr = [];
      resStr.push(
        <Grid item key={Math.random()} container>
          {StrokaGridHeader(0.3, '№')}
          {StrokaGridHeader(1.1, 'Подрайон')}
          {StrokaGridHeader(0.4, 'ДК')}
          {StrokaGridHeader(4.0, 'Наименование')}
          {StrokaGridHeader(1.5, 'Устройствo')}
          {StrokaGridHeader(2.0, 'Состояние')}
          {StrokaGridHeader(0.5, 'ПК')}
          {StrokaGridHeader(0.5, 'СК')}
          {StrokaGridHeader(0.5, 'НК')}
          {StrokaGridHeader(1.2, 'Статус')}
        </Grid>,
      );
      return resStr;
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

    const StrokaSpsMode1 = () => {
      let resStr = [];
      for (let i = 0; i < mass.length; i++) {
        let prosentSv = (100 * mass[i].sost) / mass[i].koldk;
        let prosentPch = (100 * mass[i].podch) / mass[i].koldk;
        let soobBP = 'Назначен';
        let soobXT = 'ХТ для данного района ';
        if (mass[i].isPk) soobBP = soobBP + ' ПК';
        if (mass[i].isCk) soobBP = soobBP + ' CК';
        if (mass[i].isNk) soobBP = soobBP + ' HК';
        if (soobBP === 'Назначен') soobBP = soobBP + ' BP';
        if (mass[i].isXT) {
          soobXT = soobXT + 'назначен';
        } else {
          soobXT = soobXT + 'отсутствует';
        }
        resStr.push(
          <Grid item key={Math.random()} container>
            <Grid item key={Math.random()} xs={0.3} sx={styleMRG02}>
              {i + 1}
            </Grid>
            <Grid item key={Math.random()} xs={0.7} sx={styleMRG02Center}>
              {mass[i].areaNum}
            </Grid>
            <Grid item key={Math.random()} xs={4.8} sx={styleMRG02}>
              Всего ДК&nbsp;{mass[i].koldk}&nbsp;на связи&nbsp;{prosentSv.toFixed(2)}%
              подчинены&nbsp;{prosentPch.toFixed(2)}%
            </Grid>
            <Grid item key={Math.random()} xs={2.5} sx={styleMRG02}>
              {soobBP}
            </Grid>
            <Grid item key={Math.random()} xs={3.7} sx={styleMRG01}>
              {soobXT}
            </Grid>
          </Grid>,
        );
      }
      return resStr;
    };

    const StrokaSpsMode2 = () => {
      let resStr = [];
      for (let i = 0; i < mass.length; i++) {
        let soobBP = 'Назначен';
        let soobXT = 'ХТ для данного подрайона ';
        if (mass[i].isPk) soobBP = soobBP + ' ПК';
        if (mass[i].isCk) soobBP = soobBP + ' CК';
        if (mass[i].isNk) soobBP = soobBP + ' HК';
        if (soobBP === 'Назначен') soobBP = soobBP + ' BP';
        if (mass[i].isXT) {
          soobXT = soobXT + 'назначен';
        } else {
          soobXT = soobXT + 'отсутствует';
        }
        resStr.push(
          <Grid item key={Math.random()} container>
            <Grid item key={Math.random()} xs={0.3} sx={styleMRG02}>
              {i + 1}
            </Grid>
            <Grid item key={Math.random()} xs={1.1} sx={styleMRG02Center}>
              {mass[i].areaNum}:{mass[i].subareaNum}
            </Grid>
            <Grid item key={Math.random()} xs={4.5} sx={styleMRG02}>
              Всего ДК&nbsp;{mass[i].koldk}&nbsp;на связи&nbsp;{mass[i].sost}
              &nbsp;подчинены&nbsp;{mass[i].podch}
            </Grid>
            <Grid item key={Math.random()} xs={2.4} sx={styleMRG02}>
              {soobBP}
            </Grid>
            <Grid item key={Math.random()} xs={3.7} sx={styleMRG01}>
              {soobXT}
            </Grid>
          </Grid>,
        );
      }
      return resStr;
    };

    const StrokaSpsMode3 = () => {
      let resStr = [];
      for (let i = 0; i < points.length; i++) {
        resStr.push(
          <Grid item key={Math.random()} container>
            <Grid item key={Math.random()} xs={0.3} sx={styleMRG02Center}>
              {i + 1}
            </Grid>
            <Grid item key={Math.random()} xs={1.1} sx={styleMRG02Center}>
              {points[i].area.num}:{points[i].subarea}
            </Grid>
            <Grid item key={Math.random()} xs={0.4} sx={styleMRG02Center}>
              {points[i].ID}
            </Grid>
            <Grid item key={Math.random()} xs={4} sx={styleMRG02}>
              {points[i].description}
            </Grid>
            <Grid item key={Math.random()} xs={1.5} sx={styleMRG02Center}>
              {points[i].idevice}
            </Grid>
            <Grid item key={Math.random()} xs={2} sx={styleMRG02}>
              {points[i].tlsost.description}
            </Grid>
            <Grid item key={Math.random()} xs={0.5} sx={styleMRG02Center}>
              {points[i].pk}
            </Grid>
            <Grid item key={Math.random()} xs={0.5} sx={styleMRG02Center}>
              {points[i].ck}
            </Grid>
            <Grid item key={Math.random()} xs={0.5} sx={styleMRG02Center}>
              {points[i].nk}
            </Grid>
            <Grid item key={Math.random()} xs={1.2} sx={styleMRG01}>
              {points[i].techModeString}
            </Grid>
          </Grid>,
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
    let prosSv = '';
    let prosPch = '';
    let proXT = 'ХТ для данного района ';
    if (props.mode !== 3) {
      prosSv = ((100 * sostGl) / sumDk).toFixed(2).toString() + '%';
      prosPch = ((100 * podchGl) / sumDk).toFixed(2).toString() + '%';
      let proXtWell = 'назначен';
      for (let k = 0; k < mass.length; k++) {
        if (!mass[k].isXT) proXtWell = 'отсутствует';
      }
      if (props.mode === 1) proXT = 'ХТ для данного региона ';
      proXT = proXT + proXtWell
    } else {
      prosSv = sostGl.toString();
      prosPch = podchGl.toString();
      proXT = 'ХТ для данного подрайона отсутствует';
      for (let j = 0; j < props.masxt.length; j++) {
        if (
          parseInt(points[0].area.num) === props.masxt[j].areaXT &&
          points[0].subarea === props.masxt[j].subareaXT
        ) {
          proXT = 'ХТ для данного подрайона назначен';
        }
      }
    }

    return (
      <Grid item xs={12} sx={styleMgl}>
        Всего ДК&nbsp;{sumDk}&nbsp;на связи&nbsp;{prosSv}&nbsp; подчинены&nbsp;{prosPch}&nbsp;
        <b>Назначен ВР</b>&nbsp;<em>{proXT}</em>
      </Grid>
    );
  };

  return (
    <>
      <StrokaInfo />
      <Grid item container sx={styleMRG04}>
        <Grid item xs={12}>
          <HeaderMRG03 />
          <Box sx={{ overflowX: 'auto', height: '81vh' }}>{props.open && <StrokaMRG03 />}</Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ManagementRightGrid;
