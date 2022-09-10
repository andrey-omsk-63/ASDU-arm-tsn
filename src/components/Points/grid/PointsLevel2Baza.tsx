import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import PointsLevel2BazaDiogram from './PointsLevel2BazaDiogram';

import { styleXTG00, styleXTG01, styleXTG011 } from './PointsLevel2BazaStyle';
import { styleXTG021, styleXTG02, styleXTG03 } from './PointsLevel2BazaStyle';
import { styleXTG04, styleXTG05, styleBut01 } from './PointsLevel2BazaStyle';
import { styleBut02, styleModalEnd, styleBut03 } from './PointsLevel2BazaStyle';
import { styleSetInf } from './PointsLevel2BazaStyle';

import { XctrlInfo } from '../../../interfaceGl.d';

let nomStr = 0;
let flagSave = false;
//let formName = '';

const PointsLevel2Baza = (props: {
  open: boolean;
  xctrll: XctrlInfo[];
  xtt: number;
  value: string;
  crossroad: number;
}) => {
  const xtProps = props.xtt;
  const points = props.xctrll[xtProps];
  const crossRoad = props.crossroad;
  //formName = points.xctrls[props.crossroad].name;

  const [openSetName, setOpenSetName] = React.useState(false);
  const [openSetStr, setOpenSetStr] = React.useState(false);
  const [formName, setFormName] = React.useState(points.xctrls[props.crossroad].name);

  const styleInpKnop = {
    color: 'black',
    marginTop: 1,
    maxHeight: '21px',
    minHeight: '21px',
    backgroundColor: '#F1F3F4',
    textAlign: 'center',
    textTransform: 'unset !important',
  };

  const SetName = () => {
    const [valuen, setValuen] = React.useState(formName);

    const handleKey = (event: any) => {
      if (event.key === 'Enter') event.preventDefault();
    };

    const handleChange = (event: any) => {
      let form = event.target.value.trimStart(); // удаление пробелов в начале строки
      setValuen(form);
    };

    const handleClose = () => {
      setFormName(valuen);
      setOpenSetName(false);
      console.log('formName', formName);
    };

    const handleCloseClinch = () => {
      setOpenSetName(false);
    };

    return (
      <Modal open={openSetName} onClose={handleClose} hideBackdrop>
        <Box sx={styleSetInf}>
          <Button sx={styleModalEnd} onClick={handleCloseClinch}>
            <b>&#10006;</b>
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <Box
              component="form"
              // sx={{ '& > :not(style)': {  width: '25ch' } }}
              sx={{ '& > :not(style)': { m: 1, width: '25ch', bgcolor: '#FFFBE5' } }}
              //noValidate
              //autoComplete="off"
            >
              {/* <Typography sx={{ textAlign: "center" }}>
              <b>{points.xctrls[props.crossroad].name}</b>
            </Typography> */}
              <TextField
                size="small"
                onKeyPress={handleKey} //отключение Enter
                inputProps={{ style: { fontSize: 14 } }}
                value={valuen}
                onChange={handleChange}
                variant="standard"
              />
            </Box>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Button sx={styleInpKnop} variant="contained" onClick={handleClose}>
              <b>Сохранить</b>
            </Button>
          </Box>
        </Box>
      </Modal>
    );
  };

  const SetStr = (props: { nom: number }) => {
    const handleClose = () => {
      setOpenSetStr(false);
    };

    return (
      <Modal open={openSetStr} onClose={handleClose} hideBackdrop>
        <Box sx={styleSetInf}>
          <Button sx={styleModalEnd} onClick={handleClose}>
            <b>&#10006;</b>
          </Button>

          <Typography sx={{ textAlign: 'center' }}>
            <b>
              Прямой {points.xctrls[crossRoad].StrategyB[props.nom].xleft}
              <br />
              Обратный {points.xctrls[crossRoad].StrategyB[props.nom].xright}
              <br />
              КСП {points.xctrls[crossRoad].StrategyB[props.nom].pkl}
              <br />
              КСС {points.xctrls[crossRoad].StrategyB[props.nom].pks}
              <br />
              КСО {points.xctrls[crossRoad].StrategyB[props.nom].pkr}
              <br />
              Луч П {points.xctrls[crossRoad].StrategyB[props.nom].vleft} <br />
              Луч О {points.xctrls[crossRoad].StrategyB[props.nom].vright} <br />
              Описание {points.xctrls[crossRoad].StrategyB[props.nom].desc}
            </b>
          </Typography>
          <Box sx={{ textAlign: 'center' }}>
            <Button sx={styleInpKnop} variant="contained" onClick={handleClose}>
              <b>Сохранить</b>
            </Button>
          </Box>
        </Box>
      </Modal>
    );
  };

  const SetOpenSetName = () => {
    setOpenSetName(true);
    flagSave = true;
  };

  const SetOpenSetStr = (nom: number) => {
    nomStr = nom;
    setOpenSetStr(true);
    flagSave = true;
  };

  const PointsLevel2BazaTab1 = () => {
    return (
      <Grid container sx={{ height: '14.5vh' }}>
        <Grid item xs={12} sx={{ border: 0 }}>
          <Grid container item>
            <Grid item xs={3.9}>
              <Box sx={{ fontSize: 10.5, marginTop: 0.5 }}>
                <b>Наименование ХТ</b> <br /> <br />
                <b>Максимум прямого</b> <br /> <br />
                <b>Максимум обратного</b>
              </Box>
            </Grid>
            <Grid item xs>
              <Box sx={{ marginTop: -0.3, fontSize: 11, border: 0 }}>
                <Button sx={styleBut01} variant="contained" onClick={() => SetOpenSetName()}>
                  {/* <b>{points.xctrls[props.crossroad].name}</b> */}
                  <b>{formName}</b>
                </Button>
                <br /> <br />
                {points.xctrls[props.crossroad].left} <br /> <br />
                {points.xctrls[props.crossroad].right}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const ConclHeader = (xss: number, elem: string, styleXX: any) => {
    return (
      <Grid item xs={xss} sx={styleXX}>
        <b>{elem}</b>
      </Grid>
    );
  };

  const ConclStr = (xss: number, elem: any, styleXX: any) => {
    return (
      <Grid item xs={xss} sx={styleXX}>
        {elem}
      </Grid>
    );
  };

  const PointsLevel2BazaTab2Header = () => {
    return (
      <Grid container>
        {ConclHeader(1.3, '№', styleXTG02)}
        {ConclHeader(1.8, 'Прямой', styleXTG02)}
        {ConclHeader(1.8, 'Обратный', styleXTG02)}
        {ConclHeader(1, 'КСП', styleXTG02)}
        {ConclHeader(1, 'КСС', styleXTG02)}
        {ConclHeader(1, 'КСО', styleXTG02)}
        {ConclHeader(1, 'Луч П', styleXTG02)}
        {ConclHeader(1, 'Луч О', styleXTG02)}
        {ConclHeader(2.1, 'Описание', styleXTG021)}
      </Grid>
    );
  };

  const PointsLevel2BazaTab3Header = () => {
    return (
      <Grid container>
        <Grid xs={0.5} item sx={styleXTG02}></Grid>
        {ConclHeader(1.75, 'Регион', styleXTG02)}
        {ConclHeader(1.75, 'Район', styleXTG02)}
        {ConclHeader(2, 'Перекрёсток', styleXTG02)}
        {ConclHeader(3, 'Номера каналов прямого', styleXTG02)}
        {ConclHeader(3, 'Номера каналов обратного', styleXTG021)}
      </Grid>
    );
  };

  const PointsLevel2BazaTab2Stroka = () => {
    let resStr = [];

    for (let i = 0; i < points.xctrls[props.crossroad].StrategyB.length; i++) {
      let elem = points.xctrls[props.crossroad].StrategyB[i];
      resStr.push(
        <Grid key={i} container item xs={12}>
          <Grid xs={1.3} item sx={styleXTG011}>
            <Button sx={styleBut02} variant="contained" onClick={() => SetOpenSetStr(i)}>
              {i}
            </Button>
          </Grid>
          {ConclStr(1.8, elem.xleft, styleXTG01)}
          {ConclStr(1.8, elem.xright, styleXTG01)}
          {ConclStr(1, elem.pkl, styleXTG01)}
          {ConclStr(1, elem.pks, styleXTG01)}
          {ConclStr(1, elem.pkr, styleXTG01)}
          {ConclStr(1, elem.vleft, styleXTG01)}
          {ConclStr(1, elem.vright, styleXTG01)}
          {ConclStr(2.1, elem.desc, styleXTG00)}
        </Grid>,
      );
    }
    return resStr;
  };

  const PointsLevel2BazaTab3Stroka = () => {
    let resStr = [];

    for (let i = 0; i < points.xctrls[props.crossroad].Calculates.length; i++) {
      let elem = points.xctrls[props.crossroad].Calculates[i];
      resStr.push(
        <Grid key={i} container item xs={12}>
          <Grid container item xs={12}>
            <Grid xs={0.5} item sx={styleXTG01}>
              {i}
            </Grid>
            {ConclStr(1.75, elem.region, styleXTG01)}
            {ConclStr(1.75, elem.area, styleXTG01)}
            {ConclStr(2, elem.id, styleXTG01)}
            {ConclStr(3, elem.chanL[0], styleXTG01)}
            {ConclStr(3, elem.chanR[0], styleXTG00)}
          </Grid>
        </Grid>,
      );
    }
    return resStr;
  };

  return (
    <>
      {props.value === '1' && (
        <>
          {flagSave && (
            <Grid container item>
              <Grid item xs={9}></Grid>
              <Grid item xs={3} sx={styleXTG05}>
                <Button sx={styleBut03} variant="contained">
                  <b>Сохранить изменения</b>
                </Button>
              </Grid>
            </Grid>
          )}
          <Stack direction="row">
            <Grid item xs={4} sx={{ height: '86.5vh', border: 0 }}>
              <PointsLevel2BazaTab1 />
              <Grid container>
                <Grid item xs={12} sx={styleXTG03}>
                  <PointsLevel2BazaTab2Header />
                  {PointsLevel2BazaTab2Stroka()}
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} sx={styleXTG03}>
                  <PointsLevel2BazaTab3Header />
                  {PointsLevel2BazaTab3Stroka()}
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs sx={styleXTG04}>
              <PointsLevel2BazaDiogram
                xctrll={props.xctrll}
                xtt={xtProps}
                crossroad={props.crossroad}
              />
            </Grid>
          </Stack>
          {openSetName && <SetName />}
          {openSetStr && <SetStr nom={nomStr} />}
        </>
      )}
    </>
  );
};

export default PointsLevel2Baza;
