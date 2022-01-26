import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const styleMG01 = {
  border: 1,
  borderRadius: 1,
  borderColor: 'primary.main',
  margin: 1.2,
  height: '94.6vh',
};

const styleMG02 = {
  borderRight: 1,
  borderBottom: 1,
  textAlign: 'center',
  borderColor: 'primary.main',
  padding: 0.4,
  backgroundColor: '#C0C0C0',
};

const styleMG03 = {
  //borderRight: 1,
  //borderBottom: 1,
  //textAlign: 'center',
  //borderColor: 'primary.main',
  padding: 0.3,
};


const HeaderMLG = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={6} sx={styleMG02}>
          {/* <b>Выбор</b> */}
        </Grid>
        <Grid item xs={6} sx={styleMG02}>
          <b>Наименование</b>
        </Grid>
      </Grid>

    </>
  );
};

const SpisAreaMLG = (props: { nom: number, name: string }) => {
  return (
    <>
      <Grid container>
        <Grid item xs={1} sx={styleMG03}></Grid>
        <Grid item xs={11} sx={styleMG03}>
          Район:{props.nom}&nbsp;&nbsp;&nbsp;&nbsp;{props.name}
        </Grid>
        {/* <Grid item xs={6} sx={styleMG03}>
          {props.name}
        </Grid> */}
      </Grid>
      <Grid container>
        <Grid item xs={2} sx={styleMG03}></Grid>
        <Grid item xs={10} sx={styleMG03}>
          Подрайон:{props.nom}:1
        </Grid>
      </Grid>
      <Grid container>
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
      </Grid>

      {/* <Grid container>
        <Grid item xs={1} sx={styleMG03}></Grid>
        <Grid item xs={5} sx={styleMG03}>
          Район:{props.nom}
        </Grid>
        <Grid item xs={6} sx={styleMG03}>
          {props.name}
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={2} sx={styleMG03}></Grid>
        <Grid item xs={5} sx={styleMG03}>
          Подрайон:{props.nom}:1
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={2} sx={styleMG03}></Grid>
        <Grid item xs={5} sx={styleMG03}>
          Подрайон:{props.nom}:2
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={2} sx={styleMG03}></Grid>
        <Grid item xs={5} sx={styleMG03}>
          Подрайон:{props.nom}:3
        </Grid>
      </Grid> */}
    </>
  );
}

const SpisMLG = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={6} sx={styleMG03}>
          <b>Регион</b>&nbsp;&nbsp;&nbsp;&nbsp;<b>Мосавтодор</b>
        </Grid>
        {/* <Grid item xs={6} sx={styleMG03}>
          <b>Мосавтодор</b>
        </Grid> */}
      </Grid>
      <SpisAreaMLG nom={1} name={'Первая половина'} />
      <SpisAreaMLG nom={2} name={'Вторая половина'} />
      <SpisAreaMLG nom={3} name={'Третий кусок'} />
      <SpisAreaMLG nom={4} name={'Четвёртый кусок'} />
      <SpisAreaMLG nom={5} name={'Жопка'} />

      <Grid container>
        <Grid item xs={6} sx={styleMG03}>
        <b>Регион</b>&nbsp;&nbsp;&nbsp;&nbsp;<b>Иркутск</b>
        </Grid>
        {/* <Grid item xs={6} sx={styleMG03}>
        <b> Иркутск</b>
        </Grid> */}
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
        {/* <Grid item xs={6} sx={styleMG03}>
        <b>Воронеж</b>
        </Grid> */}
      </Grid>
      <SpisAreaMLG nom={1} name={'Правый берег'} />
      <SpisAreaMLG nom={2} name={'Левый берег'} />
      <SpisAreaMLG nom={3} name={'Третий кусок'} />
      <SpisAreaMLG nom={4} name={'Четвёртый кусок'} />
      <SpisAreaMLG nom={5} name={'Жопка'} />
    </>
  );
}

const ManagementLeftGrid = () => {
  return (
    <>
      <Grid item xs={2.5} sx={styleMG01}>
        {/* <Box>
          <HeaderMLG />
        </Box> */}
        <Box sx={{ overflowX: 'auto', height: '94.3vh', border: 0 }}>
          <SpisMLG />
        </Box>
      </Grid>
    </>
  );
};

export default ManagementLeftGrid;
