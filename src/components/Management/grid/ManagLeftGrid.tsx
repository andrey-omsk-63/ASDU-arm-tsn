import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { Tflight } from '../../../interfaceMNG.d';

const ManagementLeftGrid = (props: { open: boolean; tflightt: Tflight[] }) => {
  const points = props.tflightt;

  if (props.open) console.log('MLG:', points[0].region.nameRegion);

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

  const SpisAreaMLG = (props: { nom: number; name: string }) => {
    return (
      <>
        <Grid container>
          <Grid item xs={1} sx={styleMG03}></Grid>
          <Grid item xs={11} sx={styleMG03}>
            Район:{props.nom}&nbsp;&nbsp;&nbsp;&nbsp;{props.name}
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={2} sx={styleMG03}></Grid>
          <Grid item xs={10} sx={styleMG03}>
            Подрайон:{props.nom}:1
          </Grid>
        </Grid>
        {/* <Grid container>
          <Grid item xs={2} sx={styleMG03}></Grid>
          <Grid item xs={10} sx={styleMG03}>
            Подрайон:{props.nom}:2
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={2} sx={styleMG03}></Grid>
          <Grid item xs={10} sx={styleMG03}>
            Подрайон:{props.nom}:3
          </Grid>
        </Grid> */}
      </>
    );
  };

  const SpisMLG = () => {
    return (
      <>
        <Grid container>
          <Grid item xs={6} sx={styleMG03}>
            <b>Регион</b>&nbsp;&nbsp;&nbsp;&nbsp;<b>{points[0].region.nameRegion}</b>
          </Grid>
        </Grid>
        <SpisAreaMLG nom={Number(points[0].area.num)} name={points[0].area.nameArea} />
        <SpisAreaMLG nom={2} name={'Вторая половина'} />
        <SpisAreaMLG nom={3} name={'Третий кусок'} />
        <SpisAreaMLG nom={4} name={'Четвёртый кусок'} />
        <SpisAreaMLG nom={5} name={'Жопка'} />

        {/* <Grid container>
          <Grid item xs={6} sx={styleMG03}>
            <b>Регион</b>&nbsp;&nbsp;&nbsp;&nbsp;<b>Иркутск</b>
          </Grid>
        </Grid>
        <SpisAreaMLG nom={1} name={'Правый берег'} />
        <SpisAreaMLG nom={2} name={'Левый берег'} />
        <SpisAreaMLG nom={3} name={'Третий кусок'} />
        <SpisAreaMLG nom={4} name={'Четвёртый кусок'} />
        <SpisAreaMLG nom={5} name={'Жопка'} />

        <Grid container>
          <Grid item xs={6} sx={styleMG03}>
            <b>Регион</b>&nbsp;&nbsp;&nbsp;&nbsp;<b>Воронеж</b>
          </Grid>
        </Grid>
        <SpisAreaMLG nom={1} name={'Правый берег'} />
        <SpisAreaMLG nom={2} name={'Левый берег'} />
        <SpisAreaMLG nom={3} name={'Третий кусок'} />
        <SpisAreaMLG nom={4} name={'Четвёртый кусок'} />
        <SpisAreaMLG nom={5} name={'Жопка'} /> */}
      </>
    );
  };

  return (
    <>
      <Grid item xs={2.5} sx={styleMG01}>
        <Box sx={{ overflowX: 'auto', height: '94.3vh', border: 0 }}>
          {props.open && (
            <div>
              <SpisMLG />
            </div>
          )}
        </Box>
      </Grid>
    </>
  );
};

export default ManagementLeftGrid;
