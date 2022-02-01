import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { Tflight } from '../../../interfaceMNG.d';

const ManagementRightGrid03 = (props: {
  open: boolean;
  tflightt: Tflight[];
  mode: number;
  areaa: string;
  subArea: number;
}) => {
  let points = props.tflightt;

  if (props.mode === 3) {
    let masSpis = points.filter(
      (points) => points.area.num === props.areaa && points.subarea === props.subArea,
    );
    points = masSpis;
  } else {
    if (props.mode === 2) {
      let masSpis = points.filter((points) => points.area.num === props.areaa);
      points = masSpis;
    }
  }

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
    //textAlign: 'center',
  };

  const styleMRG02 = {
    borderRight: 1,
    borderBottom: 1,
    borderColor: 'primary.main',
    padding: 0.4,
    //textAlign: 'center',
  };

  const styleMRG02Center = {
    borderRight: 1,
    borderBottom: 1,
    borderColor: 'primary.main',
    padding: 0.4,
    textAlign: 'center',
  };

  const styleMRG03 = {
    //borderRight: 1,
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
    marginLeft: -0.7,
    height: '86.0vh',
  };

  //const [value, setValue] = React.useState('1');
  let sumDk = points.length;

  const HeaderMRG03 = () => {
    const StrokaHeaderMode1 = () => {
      let resStr = [];
      resStr.push(
        <Grid item key={Math.random()} container>
          <Grid item key={Math.random()} xs={0.3} sx={styleMRG03}>
            <b>№</b>
          </Grid>
          <Grid item key={Math.random()} xs={0.7} sx={styleMRG03}>
            <b>Район</b>
          </Grid>
          <Grid item key={Math.random()} xs={4.8} sx={styleMRG03}>
            <b>Устройствa</b>
          </Grid>
          <Grid item key={Math.random()} xs={2.5} sx={styleMRG03}>
            <b>Текущее состояние</b>
          </Grid>
          <Grid item key={Math.random()} xs={3.7} sx={styleMRG03}>
            <b>Состояние ХТ</b>
          </Grid>
        </Grid>,
      );
      return resStr;
    };

    const StrokaHeaderMode2 = () => {
      let resStr = [];
      resStr.push(
        <Grid item key={Math.random()} container>
          <Grid item key={Math.random()} xs={0.3} sx={styleMRG03}>
            <b>№</b>
          </Grid>
          <Grid item key={Math.random()} xs={1.1} sx={styleMRG03}>
            <b>Подрайон</b>
          </Grid>
          <Grid item key={Math.random()} xs={4.5} sx={styleMRG03}>
            <b>Устройствa</b>
          </Grid>
          <Grid item key={Math.random()} xs={2.4} sx={styleMRG03}>
            <b>Текущее состояние</b>
          </Grid>
          <Grid item key={Math.random()} xs={3.7} sx={styleMRG03}>
            <b>Состояние ХТ</b>
          </Grid>
        </Grid>,
      );
      return resStr;
    };

    const StrokaHeaderMode3 = () => {
      let resStr = [];
      resStr.push(
        <Grid item key={Math.random()} container>
          <Grid item key={Math.random()} xs={0.3} sx={styleMRG03}>
            <b>№</b>
          </Grid>
          <Grid item key={Math.random()} xs={1.1} sx={styleMRG03}>
            <b>Подрайон</b>
          </Grid>
          <Grid item key={Math.random()} xs={0.4} sx={styleMRG03}>
            <b>ДК</b>
          </Grid>
          <Grid item key={Math.random()} xs={4} sx={styleMRG03}>
            <b>Наименование</b>
          </Grid>
          <Grid item key={Math.random()} xs={1.5} sx={styleMRG03}>
            <b>Устройство</b>
          </Grid>
          <Grid item key={Math.random()} xs={2} sx={styleMRG03}>
            <b>Состояние</b>
          </Grid>
          <Grid item key={Math.random()} xs={0.5} sx={styleMRG03}>
            <b>ПК</b>
          </Grid>
          <Grid item key={Math.random()} xs={0.5} sx={styleMRG03}>
            <b>СК</b>
          </Grid>
          <Grid item key={Math.random()} xs={0.5} sx={styleMRG03}>
            <b>НК</b>
          </Grid>
          <Grid item key={Math.random()} xs={1.2} sx={styleMRG03}>
            <b>Статус</b>
          </Grid>
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
      let mass: any = [];
      mass[0] = {
        areaNum: points[0].area.num,
        koldk: 1,
        sost: 0,
      };
      
      let j = 0;
      for (let i = 1; i < sumDk; i++) {
        if (mass[j].areaNum !== points[i].area.num) {
          j++;
          mass[j] = {
            areaNum: points[i].area.num,
            koldk: 1,
            sost: 0,
          };
        } else {
          mass[j].koldk++;
          if (points[i].tlsost.control) { mass[j].sost++ }
        }
      }
      let resStr = [];
      for (let i = 0; i < mass.length; i++) {
        let prosent = 100 * mass[i].sost / mass[i].koldk
        resStr.push(
          <Grid item key={Math.random()} container>
            <Grid item key={Math.random()} xs={0.3} sx={styleMRG02}>
              {i + 1}
            </Grid>
            <Grid item key={Math.random()} xs={0.7} sx={styleMRG02Center}>
              {mass[i].areaNum}
            </Grid>
            <Grid item key={Math.random()} xs={4.8} sx={styleMRG02}>
              Всего ДК&nbsp;{mass[i].koldk}&nbsp;на связи&nbsp;{prosent.toFixed(2)}%
              подчинены&nbsp;{prosent.toFixed(2)}%
            </Grid>
            <Grid item key={Math.random()} xs={2.5} sx={styleMRG02}>
              Назначен ВР
            </Grid>
            <Grid item key={Math.random()} xs={3.7} sx={styleMRG01}>
              ХТ для данного района отсутствует
            </Grid>
          </Grid>,
        );
      }
      return resStr;
    };

    const StrokaSpsMode2 = () => {
      let mass: any = [];
      mass[0] = {
        areaNum: points[0].area.num,
        subareaNum: points[0].subarea,
        koldk: 1,
        sost: 0,
      };
      let j = 0;
      for (let i = 1; i < points.length; i++) {
        if (mass[j].subareaNum !== points[i].subarea) {
          j++;
          mass[j] = {
            areaNum: points[i].area.num,
            subareaNum: points[i].subarea,
            koldk: 1,
            sost: 0,
          };
        } else {
          mass[j].koldk++;
          if (points[i].tlsost.control) { mass[j].sost++ }
        }
      }
      let resStr = [];
      for (let i = 0; i < mass.length; i++) {
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
              &nbsp;подчинены&nbsp;{mass[i].sost}
            </Grid>
            <Grid item key={Math.random()} xs={2.4} sx={styleMRG02}>
              Назначен ВР
            </Grid>
            <Grid item key={Math.random()} xs={3.7} sx={styleMRG01}>
              ХТ для данного района отсутствует
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
              {points[i].techMode}
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

  return (
    <>
      <Grid item xs={12} sx={styleMgl}>
        Всего ДК&nbsp;{sumDk}&nbsp;на связи 0.01% подчинены 0.00% <b>Назначен ВР Выполняется ХТ</b>
      </Grid>
      <Grid item container sx={styleMRG04}>
        <Grid item xs={12}>
          <HeaderMRG03 />
          <Box sx={{ overflowX: 'auto', height: '82.5vh', border: 0 }}>
            {/* <Box sx={{ marginRight: 0.71, }}> */}
            {props.open && <StrokaMRG03 />}
            {/* </Box> */}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ManagementRightGrid03;
