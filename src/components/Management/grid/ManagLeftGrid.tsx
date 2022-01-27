import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { Tflight } from '../../../interfaceMNG.d';

export interface DataMas {
  masss: ArrMass[];
}

export interface ArrMass {
  area: AreaM;
  subarea: number;
}

export interface AreaM {
  num: string;
  nameArea: string;
}

const ManagementLeftGrid = (props: { open: boolean; tflightt: Tflight[] }) => {
  const points = props.tflightt;

  //if (props.open) console.log(points.find({subarea: "1"}));
  if (props.open) {
    //console.log(points[0].ID);
    // let mass: Array<Tflight> = points.filter(tflight => tflight.ID == 8);
    // let mass: Array<Tflight> = [];
    // mass = points.filter(tflight => tflight.area.num === '2');
    // console.log('mass1:', mass);
    // mass = points.filter(tflight => tflight.area.num === '2' && tflight.subarea === 2);
    // console.log('mass2:', mass);
    // console.log('mass0:', points);
    console.log('points:', points);

    let mass: Array<ArrMass> = [];
    mass[0] = {
      area: points[0].area,
      subarea: points[0].subarea,
      
    };
    let j = 0
    for (let i = 1; i < points.length; i++) {
      console.log('j:', j, 'i:', i, mass[j].area, points[i].area)
      if (mass[j].area !== points[i].area || mass[j].subarea !== points[i].subarea) {
        j++
        mass[j] = {
          area: points[i].area,
          subarea: points[i].subarea,
          
        };
        
      }
      
    }
    console.log('mass:', mass);
  }

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
        {/* <SpisAreaMLG nom={2} name={'Вторая половина'} />
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
