import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import ManagementRightGrid03 from './ManagRightGrid03';
import ManagementKnobPK from './ManagKnobPK';
import ManagementKnobSK from './ManagKnobSK';
import ManagementKnobNK from './ManagKnobNK';
import ManagementKnobXT from './ManagKnobXT';

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
    fontSize: 14,
    padding: 0.3,
  };

  const styleMgl = {
    padding: 1,
    margin: 1,
    marginLeft: -0.5,
    marginTop: 0.5,
    marginBottom: 0,
  };

  const styleButt01 = {
    fontSize: 10,
    marginRight: 1,
    maxHeight: '21px',
    minHeight: '21px',
    //width: '12vh',
    //backgroundColor: '#F1F3F4',
    backgroundColor: 'white',
    color: 'black',
  };

  const styleButt02 = {
    fontSize: 12.9,
    marginRight: 1,
    maxHeight: '21px',
    minHeight: '21px',
    //width: '12vh',
    //backgroundColor: '#F1F3F4',
    backgroundColor: 'white',
    color: 'black',
  };

  let mass: any = [];
  let masRab: any = [];
  let masAreaNum: any = [];

  const handleClickGl = () => {
    console.log('clickGl:')
  };

  const handleClick = () => {
    console.log('click:')
  };

  const handleClock = () => {
    console.log('clock:')
  };

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

    //console.log('mass:', mass);
    // console.log('masRab:', masRab);
    // console.log('masAreaNum:', masAreaNum);
  }

  const SpisAreaMLG = (props: { nom: string }) => {
    masRab = [];
    masRab = mass.filter((mass: { areaNum: string }) => mass.areaNum === props.nom);
    //console.log('masRab1:', masRab);

    const SpisSubAreaMLG = () => {
      let resStr = [];
      for (let i = 0; i < masRab.length; i++) {
        resStr.push(
          <Grid container key={Math.random()}>
            <Grid key={Math.random()} item xs={1} sx={styleMG03}></Grid>
            <Grid key={Math.random()} item xs={11} sx={styleMG03}>
              <Button key={i} sx={styleButt01} onClick={handleClick}>
                Подрайон:{masRab[i].areaNum}:{masRab[i].subarea}
              </Button>
            </Grid>
          </Grid>,
        );
      }
      return resStr;
    };

    return (
      <>
        <Grid container>
          <Grid item xs={0.5} sx={styleMG03}></Grid>
          <Grid item xs={11.5} sx={styleMG03}>
            <Button sx={styleButt01} onClick={handleClock}>
              Район:{masRab[0].areaNum}&nbsp;&nbsp;{masRab[0].areaName}
            </Button>
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
            <Button sx={styleButt02} onClick={handleClickGl}>
              <b>Регион&nbsp;&nbsp;{points[0].region.nameRegion}</b>
            </Button>
          </Grid>
        </Grid>
        {SpisAreaGlob()}
      </>
    );
  };

  const FourKnops = () => {
    return (
      <Grid item xs={12} sx={{ border: 0, marginLeft: -0.5, marginTop: 1 }}>
        <Stack direction="row">
          <ManagementKnobPK />

          <ManagementKnobSK />

          <ManagementKnobNK />

          <ManagementKnobXT />
        </Stack>
      </Grid>
    );
  };

  return (
    <>
      <Grid item xs={2.5} sx={styleMG01}>
        <Box sx={{ overflowX: 'auto', height: '94.3vh' }}>
          {props.open && <SpisMLG />}
        </Box>
      </Grid>
      <Grid item xs>
        <Grid container>
          <FourKnops />
          <Grid item xs={12} sx={styleMgl}>
            Всего ДК 2 на связи 0.00% подчинены 0.00% <b>Назначен ВР Выполняется ХТ</b>
          </Grid>
          <ManagementRightGrid03 open={props.open} tflightt={points} mode={0} />
        </Grid>
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
