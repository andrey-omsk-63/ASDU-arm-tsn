import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { Tflight } from '../../../interfaceMNG.d';

const ManagementLeftGrid = (props: { open: boolean; tflightt: Tflight[] }) => {
  const points = props.tflightt;

  const styleMG01 = {
    border: 1,
    borderRadius: 1,
    borderColor: 'primary.main',
    margin: 1.2,
    height: '94.6vh',
  };

  const styleMG03 = {
    padding: 0.3,
  };

  let mass: any = [];
  let masRab: any = [];
  let masAreaNum: any = [];

  if (props.open) {
    masRab[0] = points[0].area.num;
    mass[0] = {
      areaNum: points[0].area.num,
      areaName: points[0].area.nameArea,
      subarea: points[0].subarea,
    };
    let j = 0;
    for (let i = 1; i < points.length; i++) {
      if (mass[j].area !== points[i].area && mass[j].subarea !== points[i].subarea) {
        j++;
        masRab[j] = points[i].area.num;
        mass[j] = {
          areaNum: points[i].area.num,
          areaName: points[i].area.nameArea,
          subarea: points[i].subarea,
        };
      }
    }
    //убираем дубликаты
    masAreaNum = masRab.filter((element: any, index: any) => {
      return masRab.indexOf(element) === index;
    });

    console.log('mass:', mass);
    // console.log('masRab:', masRab);
    // console.log('masAreaNum:', masAreaNum);
  }

  const SpisAreaMLG = (props: { nom: string }) => {
    masRab = [];
    masRab = mass.filter((mass: { areaNum: string }) => mass.areaNum === props.nom);
    console.log('masRab1:', masRab);

    const SpisSubAreaMLG = () => {
      let resStr = [];
      for (let i = 0; i < masRab.length; i++) {
        resStr.push(
          <Grid container key={Math.random()}>
            <Grid key={Math.random()} item xs={2} sx={styleMG03}></Grid>
            <Grid key={Math.random()} item xs={10} sx={styleMG03}>
              Подрайон:{masRab[i].areaNum}:{masRab[i].subarea}
            </Grid>
          </Grid>,
        );
      }
      return resStr;
    };

    return (
      <>
        <Grid container>
          <Grid item xs={1} sx={styleMG03}></Grid>
          <Grid item xs={11} sx={styleMG03}>
            Район:{masRab[0].areaNum}&nbsp;&nbsp;&nbsp;&nbsp;{masRab[0].areaName}
          </Grid>
          {SpisSubAreaMLG()}
        </Grid>
      </>
    );
  };

  const SpisMLG = () => {
    const SpisAreaGlob = () => {
      let resStr = [];
      for (let i = 0; i < masAreaNum.length; i++) {
        resStr.push(<SpisAreaMLG nom={masAreaNum[i]} key={Math.random()} />);
      }
      return resStr;
    };

    return (
      <>
        <Grid container>
          <Grid item xs={6} sx={styleMG03}>
            <b>Регион</b>&nbsp;&nbsp;&nbsp;&nbsp;<b>{points[0].region.nameRegion}</b>
          </Grid>
        </Grid>
        {SpisAreaGlob()}
      </>
    );
  };

  return (
    <>
      <Grid item xs={2.5} sx={styleMG01}>
        <Box sx={{ overflowX: 'auto', height: '94.3vh', border: 0 }}>
          {props.open && <SpisMLG />}
        </Box>
      </Grid>
    </>
  );
};

export default ManagementLeftGrid;

//console.log(points[0].ID);
// let mass: Array<Tflight> = points.filter(tflight => tflight.ID == 8);
// let mass: Array<Tflight> = [];
// mass = points.filter(tflight => tflight.area.num === '2');
// console.log('mass1:', mass);
// mass = points.filter(tflight => tflight.area.num === '2' && tflight.subarea === 2);
