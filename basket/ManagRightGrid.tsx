import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { Tflight } from '../../../interfaceMNG.d';

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

const ManagementRightGrid = (props: {
  open: boolean;
  tflightt: Tflight[];
  mode: number;
  areaa: string;
  subArea: number;
  masxt: any;
  masknob: Knob[];
}) => {

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
  };

  const styleMRG02 = {
    borderRight: 1,
    borderBottom: 1,
    borderColor: 'primary.main',
    padding: 0.4,
  };

  const styleMRG02Center = {
    borderRight: 1,
    borderBottom: 1,
    borderColor: 'primary.main',
    padding: 0.4,
    textAlign: 'center',
  };

  const styleMRG03 = {
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
    marginBottom: 0.5,
  };

  let points = props.tflightt;
  let masSpis = [];
  let mass: any = [];
  let sostGl = 0;
  let podchGl = 0;
  let j = 0;
  let massKnob: Knob[] = [];

  const CounterMode = (i: number, j: number) => {
    if (points[i].scon) {
      mass[j].sost++;
      sostGl++;
    }
    if (points[i].techMode === 9) {
      mass[j].podch++;
      podchGl++;
    }
    if (points[i].StatusCommandDU.IsPK) mass[j].isPk = true;
    if (points[i].StatusCommandDU.IsCK) mass[j].isCK = true;
    if (points[i].StatusCommandDU.IsNK) mass[j].isNK = true;
    if (props.mode === 2) {
      for (let k = 0; k < props.masxt.length; k++) {
        if (
          parseInt(points[i].area.num) === props.masxt[k].areaXT &&
          points[i].subarea === props.masxt[k].subareaXT
        ) {
          mass[j].releaseXT = true;
        }
      }
    }
  };

  const MakeMassKnob = () => {
    massKnob = [];
    for (let i = 0; i < props.masknob.length; i++) {
      if (props.areaa === props.masknob[i].area &&
        props.subArea === props.masknob[i].subarea &&
        props.masknob[i].param !== 13
      ) {
        massKnob.push(props.masknob[i]);
      }
    }
  }

  switch (props.mode) {
    case 1:
      points = props.tflightt;
      if (props.open) {
        mass[0] = {
          areaNum: points[0].area.num,
          koldk: 1,
          sost: 0,
          podch: 0,
          isPk: false,
          isCk: false,
          isNk: false,
          isXT: false,
          releaseXT: false,
        };
        CounterMode(0, 0);
        j = 0;
        for (let i = 1; i < points.length; i++) {
          if (mass[j].areaNum !== points[i].area.num) {
            j++;
            mass[j] = {
              areaNum: points[i].area.num,
              koldk: 1,
              sost: 0,
              podch: 0,
              isPk: false,
              isCk: false,
              isNk: false,
              isXT: false,
              releaseXT: false,
            };
          } else {
            mass[j].koldk++;
            CounterMode(i, j);
          }
        }
      }

      let masArea: Tflight[];
      let flagXtArea = true;
      //console.log('MASXT:', props.masxt)
      //console.log('MASS:', mass)
      for (let k = 0; k < mass.length; k++) {
        masArea = points.filter((points) => points.area.num === mass[k].areaNum);
        flagXtArea = true;
        let flEstXt = false;
        //console.log('masArea:', masArea)
        for (let i = 0; i < masArea.length; i++) {
          for (let j = 0; j < props.masxt.length; j++) {
            // console.log('parseInt(masArea[i].area.num:', parseInt(masArea[i].area.num))
            // console.log('props.masxt[j].areaXT:', props.masxt[j].areaXT)
            // console.log('masArea[i].subarea:', masArea[i].subarea)
            // console.log('props.masxt[j].subareaXT:', props.masxt[j].subareaXT)
            if (parseInt(masArea[i].area.num) === props.masxt[j].areaXT) {
              flEstXt = true;
              if (masArea[i].subarea === props.masxt[j].subareaXT) {
                mass[k].isXT = true;
                //console.log('????????????:', k, i, j)
              }
              else {
                mass[k].isXT = false;
                flagXtArea = false;
                //console.log('???? ????????????:', k, i, j)
              }
            }
            // if (
            //   parseInt(masArea[i].area.num) === props.masxt[j].areaXT &&
            //   masArea[i].subarea === props.masxt[j].subareaXT
            // ) {
            //   mass[k].isXT = true;
            //   console.log('????????????:', k, i, j)
            // } 
            // else {
            //   mass[k].isXT = false;
            //   flagXtArea = false;
            //   console.log('???? ????????????:', k, i, j)
            // }
          }
        }
        if (flEstXt) mass[k].isXT = flagXtArea;
        //console.log('mass[k].isXT:', mass[k].isXT)
      }
      MakeMassKnob()

      break;

    case 2:
      masSpis = points.filter((points) => points.area.num === props.areaa);
      points = masSpis;
      if (props.open) {
        mass[0] = {
          areaNum: points[0].area.num,
          subareaNum: points[0].subarea,
          koldk: 1,
          sost: 0,
          podch: 0,
          isPk: false,
          isCk: false,
          isNk: false,
          isXT: false,
          releaseXT: false,
        };
        CounterMode(0, 0);
        j = 0;
        for (let i = 1; i < points.length; i++) {
          if (mass[j].subareaNum !== points[i].subarea) {
            j++;
            mass[j] = {
              areaNum: points[i].area.num,
              subareaNum: points[i].subarea,
              koldk: 1,
              sost: 0,
              podch: 0,
              isPk: false,
              isCk: false,
              isNk: false,
              isXT: false,
              releaseXT: false,
            };
          } else {
            mass[j].koldk++;
            CounterMode(i, j);
          }
        }
      }

      for (let i = 0; i < mass.length; i++) {
        for (let j = 0; j < props.masxt.length; j++) {
          if (
            parseInt(mass[i].areaNum) === props.masxt[j].areaXT &&
            mass[i].subareaNum === props.masxt[j].subareaXT
          ) {
            mass[i].isXT = true;
          }
        }
      }
      MakeMassKnob()

      break;

    default:
      masSpis = points.filter(
        (points) => points.area.num === props.areaa && points.subarea === props.subArea,
      );
      points = masSpis;
      for (let i = 0; i < points.length; i++) {
        if (points[i].scon) sostGl++;
        if (points[i].techMode === 9) podchGl++;
      }
      MakeMassKnob()
  }

  const HeaderMRG03 = () => {
    const StrokaGridHeader = (xss: number, write: string) => {
      return (
        <Grid item xs={xss} sx={styleMRG03}>
          <b>{write}</b>
        </Grid>
      );
    };

    const StrokaHeaderMode1 = () => {
      let resStr = [];
      resStr.push(
        <Grid item key={Math.random()} container>
          {StrokaGridHeader(0.3, '???')}
          {StrokaGridHeader(0.7, '??????????')}
          {StrokaGridHeader(4.8, '??????????????????a')}
          {StrokaGridHeader(2.5, '?????????????? ??????????????????')}
          {StrokaGridHeader(3.7, '?????????????????? ????')}
        </Grid>,
      );
      return resStr;
    };

    const StrokaHeaderMode2 = () => {
      let resStr = [];
      resStr.push(
        <Grid item key={Math.random()} container>
          {StrokaGridHeader(0.3, '???')}
          {StrokaGridHeader(1.1, '????????????????')}
          {StrokaGridHeader(4.5, '??????????????????a')}
          {StrokaGridHeader(2.4, '?????????????? ??????????????????')}
          {StrokaGridHeader(3.7, '?????????????????? ????')}
        </Grid>,
      );
      return resStr;
    };

    const StrokaHeaderMode3 = () => {
      let resStr = [];
      resStr.push(
        <Grid item key={Math.random()} container>
          {StrokaGridHeader(0.3, '???')}
          {StrokaGridHeader(1.1, '????????????????')}
          {StrokaGridHeader(0.4, '????')}
          {StrokaGridHeader(4.0, '????????????????????????')}
          {StrokaGridHeader(1.5, '??????????????????o')}
          {StrokaGridHeader(2.0, '??????????????????')}
          {StrokaGridHeader(0.5, '????')}
          {StrokaGridHeader(0.5, '????')}
          {StrokaGridHeader(0.5, '????')}
          {StrokaGridHeader(1.2, '????????????')}
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
      //console.log('massMode1:', mass)
      let resStr = [];
      for (let i = 0; i < mass.length; i++) {
        let prosentSv = (100 * mass[i].sost) / mass[i].koldk;
        let prosentPch = (100 * mass[i].podch) / mass[i].koldk;
        let soobBP = '????????????????';
        let soobXT = '???? ?????? ?????????????? ???????????? ';
        if (mass[i].isPk) soobBP = soobBP + ' ????';
        if (mass[i].isCk) soobBP = soobBP + ' C??';
        if (mass[i].isNk) soobBP = soobBP + ' H??';
        if (soobBP === '????????????????') soobBP = soobBP + ' BP';
        if (mass[i].isXT) {
          soobXT = soobXT + '????????????????';
        } else {
          soobXT = soobXT + '??????????????????????';
        }

        //console.log('i=', i, soobXT)

        resStr.push(
          <Grid item key={i} container>
            <Grid item xs={0.3} sx={styleMRG02}>
              {i + 1}
            </Grid>
            <Grid item xs={0.7} sx={styleMRG02Center}>
              {mass[i].areaNum}
            </Grid>
            <Grid item xs={4.8} sx={styleMRG02}>
              ?????????? ????&nbsp;{mass[i].koldk}&nbsp;???? ??????????&nbsp;{prosentSv.toFixed(2)}%
              ??????????????????&nbsp;{prosentPch.toFixed(2)}%
            </Grid>
            <Grid item xs={2.5} sx={styleMRG02}>
              {soobBP}
            </Grid>
            <Grid item xs={3.7} sx={styleMRG01}>
              {soobXT}
            </Grid>
          </Grid>,
        );
      }
      return resStr;
    };

    const StrokaSpsMode2 = () => {
      let resStr = [];
      console.log('massMode2:', mass)
      for (let i = 0; i < mass.length; i++) {
        let soobBP = '????????????????';
        let soobXT = '???? ?????? ?????????????? ?????????????????? ';
        if (mass[i].isPk) soobBP = soobBP + ' ????';
        if (mass[i].isCk) soobBP = soobBP + ' C??';
        if (mass[i].isNk) soobBP = soobBP + ' H??';
        if (soobBP === '????????????????') soobBP = soobBP + ' BP';
        if (mass[i].isXT) {
          soobXT = soobXT + '????????????????/';
          if (mass[i].releaseXT) {
            soobXT = soobXT + '??????????????'
          } else {
            soobXT = soobXT + '????????????????'
          }
        } else {
          soobXT = soobXT + '??????????????????????';
        }
        resStr.push(
          <Grid item key={i} container>
            <Grid item xs={0.3} sx={styleMRG02}>
              {i + 1}
            </Grid>
            <Grid item xs={1.1} sx={styleMRG02Center}>
              {mass[i].areaNum}:{mass[i].subareaNum}
            </Grid>
            <Grid item xs={4.5} sx={styleMRG02}>
              ?????????? ????&nbsp;{mass[i].koldk}&nbsp;???? ??????????&nbsp;{mass[i].sost}
              &nbsp;??????????????????&nbsp;{mass[i].podch}
            </Grid>
            <Grid item xs={2.4} sx={styleMRG02}>
              {soobBP}
            </Grid>
            <Grid item xs={3.7} sx={styleMRG01}>
              {soobXT}
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
          <Grid item key={i} container>
            <Grid item xs={0.3} sx={styleMRG02Center}>
              {i + 1}
            </Grid>
            <Grid item xs={1.1} sx={styleMRG02Center}>
              {points[i].area.num}:{points[i].subarea}
            </Grid>
            <Grid item xs={0.4} sx={styleMRG02Center}>
              {points[i].ID}
            </Grid>
            <Grid item xs={4} sx={styleMRG02}>
              {points[i].description}
            </Grid>
            <Grid item xs={1.5} sx={styleMRG02Center}>
              {points[i].idevice}
            </Grid>
            <Grid item xs={2} sx={styleMRG02}>
              {points[i].tlsost.description}
            </Grid>
            <Grid item xs={0.5} sx={styleMRG02Center}>
              {points[i].pk}
            </Grid>
            <Grid itemProp='' xs={0.5} sx={styleMRG02Center}>
              {points[i].ck}
            </Grid>
            <Grid item xs={0.5} sx={styleMRG02Center}>
              {points[i].nk}
            </Grid>
            <Grid item xs={1.2} sx={styleMRG01}>
              {points[i].techModeString}
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

  const StrokaInfo = () => {
    //console.log('props.masxt:', props.masxt)
    let sumDk = points.length;
    let prosSv = '';
    let prosPch = '';
    let proXT = '???? ?????? ?????????????? ???????????? ';
    if (props.mode !== 3) {
      prosSv = ((100 * sostGl) / sumDk).toFixed(2).toString() + '%';
      prosPch = ((100 * podchGl) / sumDk).toFixed(2).toString() + '%';
      let proXtWell = '????????????????';
      for (let k = 0; k < mass.length; k++) {
        if (!mass[k].isXT) proXtWell = '??????????????????????';
      }
      if (props.mode === 1) proXT = '???? ?????? ?????????????? ?????????????? ';
      proXT = proXT + proXtWell
    } else {
      prosSv = sostGl.toString();
      prosPch = podchGl.toString();
      proXT = '???? ?????? ?????????????? ?????????????????? ??????????????????????';
      for (let j = 0; j < props.masxt.length; j++) {
        if (
          parseInt(points[0].area.num) === props.masxt[j].areaXT &&
          points[0].subarea === props.masxt[j].subareaXT
        ) {
          proXT = '???? ?????? ?????????????? ?????????????????? ????????????????/';
          if (props.masxt[j].releaseXT) {
            proXT = proXT + '??????????????'
          } else {
            proXT = proXT + '????????????????'
          }
        }
      }
    }
    let soobBP = ' BP';
    if (massKnob.length > 0) {
      soobBP = '';
      for (let i = 0; i < massKnob.length; i++) {
        switch (massKnob[i].cmd) {
          case 5:
            soobBP = soobBP + ' ????' + massKnob[i].param.toString()
            break;
          case 6:
            soobBP = soobBP + ' C??' + massKnob[i].param.toString()
            break;
          case 7:
            soobBP = soobBP + ' H??' + massKnob[i].param.toString()
            break;
        }
      }

      if (soobBP === ' ????0 C??0 H??0') soobBP = ' BP(????0+C??0+H??0)';
      if (soobBP === '') soobBP = ' BP';
    }

    return (
      <Grid item xs={12} sx={styleMgl}>
        ?????????? ????&nbsp;{sumDk}&nbsp;???? ??????????&nbsp;{prosSv}&nbsp; ??????????????????&nbsp;{prosPch}&nbsp;&nbsp;
        <b>????????????????{soobBP}</b>&nbsp;&nbsp;<em>{proXT}</em>
      </Grid>
    );
  };

  return (
    <>
      <StrokaInfo />
      <Grid item container sx={styleMRG04}>
        <Grid item xs={12}>
          <HeaderMRG03 />
          <Box sx={{ overflowX: 'auto', height: '81vh' }}>{props.open && <StrokaMRG03 />}</Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ManagementRightGrid;
