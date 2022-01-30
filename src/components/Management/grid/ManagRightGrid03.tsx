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

  const styleMRG01 = {
    borderBottom: 1,
    borderColor: 'primary.main',
    padding: 0.4,
    textAlign: 'center',
  };

  const styleMRG02 = {
    //borderRight: 1,
    borderBottom: 1,
    borderColor: 'primary.main',
    padding: 0.4,
    textAlign: 'center',
  };

  const styleMRG03 = {
    borderRight: 1,
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

  const HeaderMRG03 = () => {
    return (
      <>
        <Grid item container>
          <Grid item xs={0.3} sx={styleMRG03}>
            <b>№</b>
          </Grid>
          <Grid item xs={0.4} sx={styleMRG03}>
            <b>ДК</b>
          </Grid>
          <Grid item xs={1.5} sx={styleMRG03}>
            <b>Район</b>
          </Grid>
          <Grid item xs={4} sx={styleMRG03}>
            <b>Наименование</b>
          </Grid>
          <Grid item xs={1.5} sx={styleMRG03}>
            <b>Устройство</b>
          </Grid>
          <Grid item xs={2} sx={styleMRG03}>
            <b>Состояние</b>
          </Grid>
          <Grid item xs={0.5} sx={styleMRG03}>
            <b>ПК</b>
          </Grid>
          <Grid item xs={0.5} sx={styleMRG03}>
            <b>СК</b>
          </Grid>
          <Grid item xs={0.5} sx={styleMRG03}>
            <b>НК</b>
          </Grid>
          <Grid item xs={0.8} sx={styleMRG03}>
            <b>Статус</b>
          </Grid>
        </Grid>
      </>
    );
  };

  const StrokaMRG03 = () => {
    let resStr = [];
    for (let i = 0; i < points.length; i++) {
      resStr.push(
        <Grid item key={Math.random()} container>
          <Grid item key={Math.random()} xs={0.3} sx={styleMRG02}>
            {i + 1}
          </Grid>
          <Grid item key={Math.random()} xs={0.4} sx={styleMRG02}>
            {points[i].ID}
          </Grid>
          <Grid item key={Math.random()} xs={1.5} sx={styleMRG02}>
            {points[i].area.nameArea}
          </Grid>
          <Grid item key={Math.random()} xs={4} sx={styleMRG02}>
            {points[i].description}
          </Grid>

          <Grid item key={Math.random()} xs={1.5} sx={styleMRG02}>
            {points[i].idevice}
          </Grid>
          <Grid item key={Math.random()} xs={2} sx={styleMRG02}>
            {points[i].tlsost.description}
          </Grid>
          <Grid item key={Math.random()} xs={0.5} sx={styleMRG02}>
            {points[i].pk}
          </Grid>
          <Grid item key={Math.random()} xs={0.5} sx={styleMRG02}>
            {points[i].ck}
          </Grid>
          <Grid item key={Math.random()} xs={0.5} sx={styleMRG02}>
            {points[i].nk}
          </Grid>
          <Grid item key={Math.random()} xs={0.8} sx={styleMRG01}>
            {points[i].techMode}
          </Grid>
        </Grid>,
      );
    }
    return resStr;
  };

  return (
    <Grid item container sx={styleMRG04}>
      <Grid item xs={12}>
        {/* <Box
          sx={{
            marginRight: 0.71,
            border: 0,
          }}>
          <HeaderMRG03 />
        </Box> */}
        {/* <Box sx={{ overflowX: 'auto', height: '82.5vh', border: 0 }}> */}
        <Box sx={{ marginRight: 0.71, border: 0 }}>
          <HeaderMRG03 />
        </Box>
        <Box sx={{ overflowX: 'auto', height: '82.5vh', border: 0 }}>
          <Box
            sx={{
              marginRight: 0.71,
              border: 0,
            }}>
            {props.open && <div>{StrokaMRG03()}</div>}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ManagementRightGrid03;
