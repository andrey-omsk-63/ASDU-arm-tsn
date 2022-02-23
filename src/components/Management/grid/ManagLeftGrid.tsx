import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import ManagementRightGrid from './ManagRightGrid';
import ManagementKnobPK from './ManagKnobPK';
import ManagementKnobSK from './ManagKnobSK';
import ManagementKnobNK from './ManagKnobNK';
import ManagementKnobXT from './ManagKnobXT';

import { Tflight } from '../../../interfaceMNG.d';

const ManagementLeftGrid = (props: { open: boolean; ws: WebSocket; tflightt: Tflight[] }) => {
  const points = props.tflightt;

  //console.log('PoinsMGLeft:', props.open, points)

  const styleMG01 = {
    border: 1,
    borderRadius: 1,
    borderColor: 'primary.main',
    margin: 0.5,
    //maxHeight: '99.2%',
    //minHeight: '99.2%',
    height: '94vh',
  };

  const styleMG03 = {
    fontSize: 14,
    padding: 0.3,
  };

  const styleButt01 = {
    fontSize: 12,
    maxHeight: '21px',
    minHeight: '21px',
    backgroundColor: 'white',
    color: 'black',
    textTransform: 'unset !important',
  };

  const styleButt02 = {
    fontSize: 15,
    maxHeight: '21px',
    minHeight: '21px',
    backgroundColor: 'white',
    color: '#5B1080',
    textTransform: 'unset !important',
  };

  const [mode, setMode] = React.useState(1);
  const [areaa, setAreaa] = React.useState('1');
  const [subArea, setSubArea] = React.useState(1);

  let mass: any = [];
  let masRab: any = [];
  let masAreaNum: any = [];

  const handleClickGl = () => {
    setMode(1);
  };

  const handleClock = (area: string) => {
    setAreaa(area);
    setMode(2);
  };

  const handleClick = (area: string, subarea: number) => {
    setAreaa(area);
    setSubArea(subarea);
    setMode(3);
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
  }

  const SpisAreaMLG = (props: { nom: string }) => {
    let masSpis: any = [];
    masSpis = mass.filter((mass: { areaNum: string }) => mass.areaNum === props.nom);

    const SpisSubAreaMLG = () => {
      let resStr = [];

      for (let i = 0; i < masSpis.length; i++) {
        resStr.push(
          <Grid container key={Math.random()}>
            <Grid key={Math.random()} item xs={1} sx={styleMG03}></Grid>
            <Grid key={Math.random()} item xs={11} sx={styleMG03}>
              <Button
                key={i}
                sx={styleButt01}
                //variant="contained"
                onClick={() => handleClick(props.nom, masSpis[i].subarea)}>
                Подрайон:{masSpis[i].areaNum}:{masSpis[i].subarea}
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
            <Button sx={styleButt01} onClick={() => handleClock(props.nom)}>
              <b>
                Район:{masSpis[0].areaNum}&nbsp;{masSpis[0].areaName}
              </b>
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
      <Grid item xs={12} sx={{ marginLeft: 0, marginTop: 1 }}>
        <Stack direction="row">
          <ManagementKnobPK ws={props.ws} />
          <ManagementKnobSK ws={props.ws} />
          <ManagementKnobNK ws={props.ws} />
          <ManagementKnobXT ws={props.ws} />
        </Stack>
      </Grid>
    );
  };

  return (
    <Grid container>
      <Grid item xs={2.5} sx={styleMG01}>
        <Box sx={{ border: 0, overflowX: 'auto' }}>{props.open && <SpisMLG />}</Box>
      </Grid>
      <Grid item xs sx={{ border: 0 }}>
        <Grid container>
          <FourKnops />
          <ManagementRightGrid
            open={props.open}
            tflightt={points}
            mode={mode}
            areaa={areaa}
            subArea={subArea}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ManagementLeftGrid;

//console.log(points[0].ID);
// let mass: Array<Tflight> = points.filter(tflight => tflight.ID == 8);
// let mass: Array<Tflight> = [];
// mass = points.filter(tflight => tflight.area.num === '2');
// console.log('mass1:', mass);
// mass = points.filter(tflight => tflight.area.num === '2' && tflight.subarea === 2);
