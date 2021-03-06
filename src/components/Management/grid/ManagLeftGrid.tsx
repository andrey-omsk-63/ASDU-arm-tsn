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
let massKnopTemp: Knob[] = [];

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

  const massKnob: Knob[] = [
    {
      cmd: 0,
      param: 99,
      region: '',
      area: '',
      subarea: 99,
    },
  ];
  
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

      if (mass[j].areaNum !== points[i].area.num || mass[j].subarea !== points[i].subarea) {
        j++;
        masRab[j] = points[i].area.num;
        mass[j] = {
          areaNum: points[i].area.num,
          areaName: points[i].area.nameArea,
          subarea: points[i].subarea,
        };
      }
    }

    //?????????????? ??????????????????
    masAreaNum = masRab.filter((element: any, index: any) => {
      return masRab.indexOf(element) === index;
    });

    // ???????????????? ?????????????? ????
    for (let i = 0; i < pointsXT.length; i++) {
      masXT[i] = {
        areaXT: pointsXT[i].area,
        subareaXT: pointsXT[i].subarea,
        releaseXT: pointsXT[i].release,
        pknowXT: pointsXT[i].pknow,
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
          <Grid container key={i}>
            <Grid item xs={0.5} sx={styleMG03}></Grid>
            <Grid item xs sx={styleMG03}>
              <Button
                sx={styleButt01}
                //variant="contained"
                onClick={() => handleClick(props.nom, masSpis[i].subarea)}>
                ????????????????:{masSpis[i].areaNum}:{masSpis[i].subarea}
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
                  ??????????:{masSpis[0].areaNum}&nbsp;{masSpis[0].areaName}
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

  const DelateDublRecords = () => {
    let massTemp = [];
    for (let i = 0; i < massKnop.length; i++) {
      let dubl = false;
      if (i < massKnop.length - 1) {
        for (let j = i + 1; j < massKnop.length; j++) {
          if (
            massKnop[i].cmd === massKnop[j].cmd &&
            massKnop[i].param === massKnop[j].param &&
            massKnop[i].region === massKnop[j].region &&
            massKnop[i].area === massKnop[j].area &&
            massKnop[i].subarea === massKnop[j].subarea
          ) {
            dubl = true;
          }
        }
      }
      if (!dubl && massKnop[i].param !== 99) massTemp.push(massKnop[i]);
    }
    massKnop = massTemp;
  };

  const RecordInAria = () => {
    massKnopTemp = [];
    let masArea: any = [];
    let masAreaRab: any = [];

    for (let i = 0; i < mass.length; i++) {
      let dataKnobTemp: Knob[] = [
        {
          cmd: dataKnob[0].cmd,
          param: dataKnob[0].param,
          region: dataKnob[0].region,
          area: mass[i].areaNum,
          subarea: mass[i].subarea,
        },
      ];
      // ??????????????
      dataKnobTemp[0].cmd = dataKnob[0].cmd
      dataKnobTemp[0].param = dataKnob[0].param;
      dataKnobTemp[0].region = dataKnob[0].region;
      dataKnobTemp[0].area = mass[i].areaNum;
      dataKnobTemp[0].subarea = mass[i].subarea;
      //massKnopTemp[i] = dataKnobTemp[0];
      massKnopTemp.push(dataKnobTemp[0]);
      masAreaRab.push(mass[i].areaNum);
    }
    //?????????????? ??????????????????
    masArea = masAreaRab.filter((element: any, index: any) => {
      return masAreaRab.indexOf(element) === index;
    });

    for (let i = 0; i < masArea.length; i++) {
      //???????????????????? ?????????????? ???? ??????????????
      let dataKnobTemp: Knob[] = [
        {
          cmd: dataKnob[0].cmd,
          param: dataKnob[0].param,
          region: dataKnob[0].region,
          area: masArea[i],
          subarea: 0,
        },
      ];
      // ??????????????
      dataKnobTemp[0].cmd = dataKnob[0].cmd
      dataKnobTemp[0].param = dataKnob[0].param;
      dataKnobTemp[0].region = dataKnob[0].region;
      dataKnobTemp[0].area = masArea[i];
      dataKnobTemp[0].subarea = 0;

      massKnopTemp.push(dataKnobTemp[0]);
    }
    massKnop = massKnop.concat(massKnopTemp); // ?????????????????????? ????????????????

    for (let i = 0; i < massKnop.length; i++) {
      // ?????????????????? param ???? ?????????? ?????????? ??????????????
      if (massKnop[i].cmd === dataKnob[0].cmd && massKnop[i].region === dataKnob[0].region) {
        massKnop[i].param = dataKnob[0].param;
      }
    }
    DelateDublRecords(); //???????????????? ????????????????????
  };

  const RecordInSubaria = () => {
    if (dataKnob[0].subarea === 0) {
      massKnopTemp = [];
      for (let i = 0; i < mass.length; i++) {
        if (mass[i].areaNum === dataKnob[0].area) {
          let dataKnobTemp: Knob[] = [
            {
              cmd: dataKnob[0].cmd,
              param: dataKnob[0].param,
              region: dataKnob[0].region,
              area: mass[i].areaNum,
              subarea: mass[i].areaNum,
            },
          ];
          // ??????????????
          dataKnobTemp[0].cmd = dataKnob[0].cmd
          dataKnobTemp[0].param = dataKnob[0].param;
          dataKnobTemp[0].region = dataKnob[0].region;
          dataKnobTemp[0].area = mass[i].areaNum;
          dataKnobTemp[0].subarea = mass[i].areaNum;
          massKnopTemp.push(dataKnobTemp[0]);
         }
      }
      massKnop = massKnop.concat(massKnopTemp); // ?????????????????????? ????????????????
      for (let i = 0; i < massKnop.length; i++) {
        // ?????????????????? param ???? ?????????? ?????????? ????????????
        if (
          massKnop[i].cmd === dataKnob[0].cmd &&
          massKnop[i].region === dataKnob[0].region &&
          massKnop[i].area === dataKnob[0].area
        ) {
          massKnop[i].param = dataKnob[0].param;
        }
      }
      DelateDublRecords(); //???????????????? ????????????????????
    }
  };

  const CheckFourKnops = () => {
    if (dataKnob[0].cmd !== 0) {
      // ???????????????? ????????????????????
      let flagDubl = true;
      for (let i = 0; i < massKnop.length; i++) {
        if (
          massKnop[i].cmd === dataKnob[0].cmd &&
          //massKnop[i].param === dataKnob[0].param &&
          massKnop[i].param === dataKnob[0].param &&
          massKnop[i].region === dataKnob[0].region &&
          massKnop[i].area === dataKnob[0].area &&
          massKnop[i].subarea === dataKnob[0].subarea
        ) {
          flagDubl = false; //console.log(i, '????????????????')
          massKnop[i].param = dataKnob[0].param;
        }
      }
      if (flagDubl) {
        //console.log('????????????');
        massKnob[0].cmd = dataKnob[0].cmd;
        massKnob[0].param = dataKnob[0].param;
        massKnob[0].region = dataKnob[0].region;
        massKnob[0].area = dataKnob[0].area;
        massKnob[0].subarea = dataKnob[0].subarea;
        massKnop.push(massKnob[0]);
      }
      if (dataKnob[0].area === '0' && dataKnob[0].subarea === 0) {
        RecordInAria();
      } else {
        RecordInSubaria();
      }
      //console.log('LEFTmassKnopGl:', massKnop);
      // ???????????????????? ???? cmd
      massKnop.sort((prev, next) => prev.cmd - next.cmd);
      //console.log('LEFTmassKnopGlSort:', massKnop);
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

  //console.log('LEFTmasknobOut:', massKnop)

  return (
    <Grid container>
      <Grid item xs={2.5} sx={styleMG01}>
        <Box sx={{ overflowX: 'auto' }}>{props.open && <SpisMLG />}</Box>
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
