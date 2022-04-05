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
import { XctrlInfo } from '../../../interfaceGl.d';

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

let massKnop: Knob[] = [];

const ManagementLeftGrid = (props: {
  open: boolean;
  ws: WebSocket;
  tflightt: Tflight[];
  xctrll: XctrlInfo[];
}) => {
  const points = props.tflightt;
  const pointsXT = props.xctrll;
  let masXT: any = [];

  const styleMG01 = {
    border: 1,
    borderRadius: 1,
    borderColor: 'primary.main',
    margin: 0.5,
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
    //width: '20%',
    backgroundColor: 'white',
    color: '#5B1080',
    textTransform: 'unset !important',
  };

  const [mode, setMode] = React.useState(1);
  let reGion = '1';
  const [areaa, setAreaa] = React.useState('0');
  const [subArea, setSubArea] = React.useState(0);
  const [dataKnob, setDataKnob] = React.useState<Array<Knob>>([
    {
      cmd: 0,
      param: 99,
      region: '',
      area: '',
      subarea: 88,
    },
  ]);

  let massKnob: Knob[] = [
    {
      cmd: 0,
      param: 99,
      region: '',
      area: '',
      subarea: 99,
    },
  ];

  //console.log('dataKnob:', dataKnob[0], dataKnob[0].cmd);

  let mass: any = [];
  let masRab: any = [];
  let masAreaNum: any = [];

  const handleClickGl = () => {
    setMode(1);
    setAreaa('0');
    setSubArea(0);
  };

  const handleClock = (area: string) => {
    setMode(2);
    setAreaa(area);
    setSubArea(0);
  };

  const handleClick = (area: string, subarea: number) => {
    setMode(3);
    setAreaa(area);
    setSubArea(subarea);
  };

  if (props.open) {
    reGion = points[0].region.num;
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
    // создание массива ХТ
    for (let i = 0; i < pointsXT.length; i++) {
      masXT[i] = {
        areaXT: pointsXT[i].area,
        subareaXT: pointsXT[i].subarea,
        releaseXT: pointsXT[i].release,
      };
    }
  }

  const SpisAreaMLG = (props: { nom: string }) => {
    let masSpis: any = [];
    masSpis = mass.filter((mass: { areaNum: string }) => mass.areaNum === props.nom);

    const SpisSubAreaMLG = () => {
      let resStr = [];

      for (let i = 0; i < masSpis.length; i++) {
        resStr.push(
          <Grid container key={Math.random()}>
            <Grid key={Math.random()} item xs={0.5} sx={styleMG03}></Grid>
            <Grid key={Math.random()} item xs sx={styleMG03}>
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
        <Stack direction="column">
          <Grid container>
            {/* <Grid item xs={0.25} sx={styleMG03}></Grid> */}
            <Grid item xs sx={styleMG03}>
              <Button sx={styleButt01} onClick={() => handleClock(props.nom)}>
                <b>
                  Район:{masSpis[0].areaNum}&nbsp;{masSpis[0].areaName}
                </b>
              </Button>
            </Grid>
            {SpisSubAreaMLG()}
          </Grid>
        </Stack>
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
        <Stack direction="column">
          <Grid container>
            {/* <Grid item xs={6} sx={styleMG03}> */}
            <Grid item xs sx={{ p: 0.1, border: 0 }}>
              <Button sx={styleButt02} onClick={handleClickGl}>
                <b>{points[0].region.nameRegion}</b>
              </Button>
            </Grid>
          </Grid>
          {SpisAreaGlob()}
        </Stack>
      </>
    );
  };

  const CheckFourKnops = () => {
    if (dataKnob[0].cmd !== 0) {
      // проверка дубликатов
      let flagDubl = true;
      for (let i = 0; i < massKnop.length; i++) {
        if (
          massKnop[i].cmd === dataKnob[0].cmd &&
          //massKnop[i].param === dataKnob[0].param &&
          massKnop[i].region === dataKnob[0].region &&
          massKnop[i].area === dataKnob[0].area &&
          massKnop[i].subarea === dataKnob[0].subarea
        ) {
          flagDubl = false;
          massKnop[i].param = dataKnob[0].param;
          //console.log(i, 'Дубликат');
        }
      }
      if (flagDubl) {
        //console.log('Запись');
        massKnob[0].cmd = dataKnob[0].cmd;
        massKnob[0].param = dataKnob[0].param;
        massKnob[0].region = dataKnob[0].region;
        massKnob[0].area = dataKnob[0].area;
        massKnob[0].subarea = dataKnob[0].subarea;

        massKnop.push(massKnob[0]);
        // сортировка по cmd
        massKnop.sort((prev, next) => prev.cmd - next.cmd);
      }

      setDataKnob([
        {
          cmd: 0,
          param: 99,
          region: '',
          area: '',
          subarea: 77,
        },
      ]);
    }
  };

  const FourKnops = () => {
    return (
      <Grid item xs={12} sx={{ marginLeft: 0, marginTop: 1 }}>
        <Stack direction="row">
          <ManagementKnobPK
            open={props.open}
            ws={props.ws}
            region={reGion}
            areaa={areaa}
            subArea={subArea}
            setDataKn={setDataKnob}
          />
          <ManagementKnobSK
            open={props.open}
            ws={props.ws}
            region={reGion}
            areaa={areaa}
            subArea={subArea}
            setDataKn={setDataKnob}
          />
          <ManagementKnobNK
            open={props.open}
            ws={props.ws}
            region={reGion}
            areaa={areaa}
            subArea={subArea}
            setDataKn={setDataKnob}
          />
          <ManagementKnobXT
            open={props.open}
            ws={props.ws}
            region={reGion}
            areaa={areaa}
            subArea={subArea}
            setDataKn={setDataKnob}
          />
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
          {CheckFourKnops()}
          <ManagementRightGrid
            open={props.open}
            tflightt={points}
            mode={mode}
            areaa={areaa}
            subArea={subArea}
            masxt={masXT}
            masknob={massKnop}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ManagementLeftGrid;
