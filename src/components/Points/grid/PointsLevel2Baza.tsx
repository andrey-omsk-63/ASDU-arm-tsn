import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { maskpointCreate } from './../../../redux/actions';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import PointsLevel2BazaDiogram from './PointsLevel2BazaDiogram';

import { TimeStr, BoxTextField, Inputer } from '../../../AppServiceFunctions';
import { WorkMenuEdit, ButtRec, ConclStr } from '../../../AppServiceFunctions';
import { SendHandleSend, ConclHeader } from '../../../AppServiceFunctions';
import { InputTimeAndMode, SaveFunc } from '../../../AppServiceFunctions';

import { styleXTG00, styleXTG01, styleXTG011 } from './PointsGridStyle';
import { styleXTG021, styleXTG02, styleXTG03 } from './PointsGridStyle';
import { styleXTG04, styleBoxForm } from './PointsGridStyle';
import { styleBut02, styleModalEnd } from './PointsGridStyle';
import { styleSetInf, styleSetInff } from './PointsGridStyle';
import { styleInpName } from './PointsGridStyle';
import { styleInpArg, styleInpTime } from './PointsGridStyle';

import { XctrlInfo } from '../../../interfaceGl.d';

let nomStr = 0;
let flagSave = false;
let flagEdit = true;
let flagExit = false;

let xtPropsOld = -1;
let crossRoadOld = -1;

let pointsTemp: any = null;
let formTemp = '';
let leftTemp = 0;
let rightTemp = 0;
let pointRab: any = null;
let pointGraf: XctrlInfo[] = [];

const PointsLevel2Baza = (props: {
  open: boolean;
  ws: WebSocket;
  xctrll: XctrlInfo[];
  xtt: number;
  crossroad: number;
  setPoint: any;
}) => {
  //== Piece of Redux =======================================
  let maskpoint = useSelector((state: any) => {
    const { maskpointReducer } = state;
    return maskpointReducer.maskpoint;
  });
  //console.log("maskpoint_Baza:", maskpoint);
  const dispatch = useDispatch();
  //===========================================================
  const xtProps = props.xtt;
  let pointsEt = props.xctrll[xtProps];
  const crossRoad = props.crossroad;
  const xctrLl = props.xctrll;

  const [openSetName, setOpenSetName] = React.useState(false);
  const [openSetStr, setOpenSetStr] = React.useState(false);
  const [points, setPoints] = React.useState(pointsEt);
  const [formName, setFormName] = React.useState(pointsEt.xctrls[crossRoad].name);
  const [maxLeft, setMaxLeft] = React.useState(pointsEt.xctrls[crossRoad].left);
  const [maxRight, setMaxRight] = React.useState(pointsEt.xctrls[crossRoad].right);
  const [yellow, setYellow] = React.useState(pointsEt.yellow.make);
  const [tmStart, setTmStart] = React.useState(pointsEt.yellow.start);
  const [tmStop, setTmStop] = React.useState(pointsEt.yellow.stop);
  const [trigger, setTrigger] = React.useState(false);

  if (xtPropsOld !== xtProps || crossRoadOld !== crossRoad) {
    pointGraf = props.xctrll;
    xtPropsOld = xtProps;
    crossRoadOld = crossRoad;
    nomStr = 0;
    flagSave = false;
    flagEdit = true;
    flagExit = false;
    pointsTemp = pointsEt;
    setFormName(pointsEt.xctrls[crossRoad].name);
    setMaxLeft(pointsEt.xctrls[crossRoad].left);
    setMaxRight(pointsEt.xctrls[crossRoad].right);
    setTmStart(pointsEt.yellow.start);
    setTmStop(pointsEt.yellow.stop);
    setYellow(pointsEt.yellow.make);
    setPoints(pointsEt);
    if (maskpoint.newXt) {
      maskpoint.pointForRedax = pointsEt;
      maskpoint.newXt = false;
      maskpoint.savePoint = false;
      maskpoint.redaxPoint = true;
      dispatch(maskpointCreate(maskpoint));
    }
  } else {
    if (!maskpoint.redaxPoint && flagEdit) {
      pointsEt = maskpoint.pointForRedax; // Start
      pointsTemp = pointsEt;
      flagExit = true;
      flagEdit = false;
    } else {
      if (maskpoint.redaxPoint && !flagEdit) {
        setPoints(pointsTemp); // Stop
        flagExit = false;
        flagEdit = true;
        flagSave = false;
      }
    }
  }

  const SetName = () => {
    let yell = 0;
    if (yellow) yell = 1;
    const [valuen1, setValuen1] = React.useState(formName);
    const [valuen2, setValuen2] = React.useState(maxLeft);
    const [valuen3, setValuen3] = React.useState(maxRight);
    const [valuen4, setValuen4] = React.useState(yell);
    const [valuen5, setValuen5] = React.useState(TimeStr(tmStart).slice(0, 2));
    const [valuen6, setValuen6] = React.useState(TimeStr(tmStart).slice(3, 5));
    const [valuen7, setValuen7] = React.useState(TimeStr(tmStop).slice(0, 2));
    const [valuen8, setValuen8] = React.useState(TimeStr(tmStop).slice(3, 5));

    const handleChange1 = (event: any) => {
      let form = event.target.value.trimStart(); // удаление пробелов в начале строки
      setValuen1(form);
    };

    const handleChange2 = (event: any) => {
      let form = Number(event.target.value.trimStart()); // удаление пробелов в начале строки
      if (form) setValuen2(Math.abs(form));
    };

    const handleChange3 = (event: any) => {
      let form = Number(event.target.value.trimStart()); // удаление пробелов в начале строки
      if (form) setValuen3(Math.abs(form));
    };

    const handleChange5 = (event: any) => {
      let form = event.target.value.trimStart(); // удаление пробелов в начале строки
      if (Math.abs(form) && Number(form) < 24) setValuen5(Math.abs(form).toString());
    };

    const handleChange6 = (event: any) => {
      let form = event.target.value.trimStart(); // удаление пробелов в начале строки
      if (Math.abs(form) && Number(form) < 60) setValuen6(Math.abs(form).toString());
    };

    const handleChange7 = (event: any) => {
      let form = event.target.value.trimStart(); // удаление пробелов в начале строки
      if (Math.abs(form) && Number(form) < 24) setValuen7(Math.abs(form).toString());
    };

    const handleChange8 = (event: any) => {
      let form = event.target.value.trimStart(); // удаление пробелов в начале строки
      if (Math.abs(form) && Number(form) < 60) setValuen8(Math.abs(form).toString());
    };

    const handleClose = () => {
      let pointRab = JSON.parse(JSON.stringify(maskpoint.pointForRedax));
      pointRab.xctrls[props.crossroad].name = valuen1;
      pointRab.xctrls[props.crossroad].left = valuen2;
      pointRab.xctrls[props.crossroad].right = valuen3;
      let yell = true;
      if (!valuen4) yell = false;
      pointRab.yellow.make = yell;
      let timeStart = Number(valuen5) * 60 + Number(valuen6);
      pointRab.yellow.start = timeStart;
      let timeStop = Number(valuen7) * 60 + Number(valuen8);
      if (timeStop < timeStart) timeStop = timeStart;
      pointRab.yellow.stop = timeStop;
      setPoints(pointRab);
      maskpoint.pointForRedax = pointRab;
      pointsEt = pointRab;
      setFormName(valuen1);
      setMaxLeft(valuen2);
      setMaxRight(valuen3);
      setYellow(yell);
      setTmStart(timeStart);
      setTmStop(timeStop);
      setOpenSetName(false);
      flagSave = true;
      maskpoint.savePoint = true;
      dispatch(maskpointCreate(maskpoint));
    };

    const handleCloseClinch = () => {
      setOpenSetName(false);
    };

    const InputerMode = () => {
      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrency(Number(event.target.value));
        setValuen4(Number(event.target.value));
      };

      const handleKey = (event: any) => {
        if (event.key === 'Enter') event.preventDefault();
      };

      let dat = ['Вкл', 'Выкл'];
      let massKey = [];
      let massDat: any[] = [];
      const currencies: any = [];
      for (let key in dat) {
        massKey.push(key);
        massDat.push(dat[key]);
      }
      for (let i = 0; i < massKey.length; i++) {
        let maskCurrencies = {
          value: '',
          label: '',
        };
        maskCurrencies.value = massKey[i];
        maskCurrencies.label = massDat[i];
        currencies.push(maskCurrencies);
      }

      const [currency, setCurrency] = React.useState(valuen4);

      return (
        <Box component="form" sx={styleBoxForm}>
          <TextField
            select
            size="small"
            onKeyPress={handleKey} //отключение Enter
            value={currency}
            onChange={handleChange}
            InputProps={{ style: { fontSize: 14 } }}
            variant="standard"
            color="secondary">
            {currencies.map((option: any) => (
              <MenuItem key={option.value} value={option.value} sx={{ fontSize: 14 }}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      );
    };

    const FuncStart = () => {
      return (
        <Box sx={styleInpTime}>
          {BoxTextField(valuen5, handleChange5)}
          {' : '}
          {BoxTextField(valuen6, handleChange6)}
        </Box>
      );
    };

    const FuncStop = () => {
      return (
        <Box sx={styleInpTime}>
          {BoxTextField(valuen7, handleChange7)}
          {' : '}
          {BoxTextField(valuen8, handleChange8)}
        </Box>
      );
    };

    return (
      <Modal open={openSetName} onClose={handleCloseClinch} hideBackdrop>
        <Box sx={styleSetInff}>
          <Button sx={styleModalEnd} onClick={handleCloseClinch}>
            <b>&#10006;</b>
          </Button>
          {Inputer('Наименование ХТ', valuen1, handleChange1, styleInpName)}
          {Inputer('Максимум прямого', valuen2, handleChange2, styleInpArg)}
          {Inputer('Максимум обратного', valuen3, handleChange3, styleInpArg)}
          {InputTimeAndMode('Работа по НК и СК', InputerMode)}
          {InputTimeAndMode('Начало', FuncStart)}
          {InputTimeAndMode('Конец', FuncStop)}
          {SaveFunc(handleClose)}
        </Box>
      </Modal>
    );
  };

  const SetStr = (props: { nom: number }) => {
    let elem = maskpoint.pointForRedax.xctrls[crossRoad].StrategyB[props.nom];
    const [valuen1, setValuen1] = React.useState(elem.xleft);
    const [valuen2, setValuen2] = React.useState(elem.xright);
    const [valuen3, setValuen3] = React.useState(elem.pkl);
    const [valuen4, setValuen4] = React.useState(elem.pks);
    const [valuen5, setValuen5] = React.useState(elem.pkr);
    const [valuen6, setValuen6] = React.useState(elem.vleft);
    const [valuen7, setValuen7] = React.useState(elem.vright);
    const [valuen8, setValuen8] = React.useState(elem.desc);

    const handleClose = () => {
      setOpenSetStr(false);
    };

    const handleCloseStr = () => {
      pointRab = JSON.parse(JSON.stringify(maskpoint.pointForRedax));
      pointRab.xctrls[crossRoad].StrategyB[props.nom].xleft = valuen1;
      pointRab.xctrls[crossRoad].StrategyB[props.nom].xright = valuen2;
      pointRab.xctrls[crossRoad].StrategyB[props.nom].pkl = valuen3;
      pointRab.xctrls[crossRoad].StrategyB[props.nom].pks = valuen4;
      pointRab.xctrls[crossRoad].StrategyB[props.nom].pkr = valuen5;
      pointRab.xctrls[crossRoad].StrategyB[props.nom].vleft = valuen6;
      pointRab.xctrls[crossRoad].StrategyB[props.nom].vright = valuen7;
      pointRab.xctrls[crossRoad].StrategyB[props.nom].desc = valuen8;
      if (props.nom === maskpoint.pointForRedax.xctrls[crossRoad].StrategyB.length - 1) {
        if (pointRab.xctrls[crossRoad].left < valuen1) {
          pointRab.xctrls[crossRoad].left = valuen1;
          setMaxLeft(valuen1);
        }
        if (pointRab.xctrls[crossRoad].right < valuen2) {
          pointRab.xctrls[crossRoad].right = valuen2;
          setMaxRight(valuen2);
        }
      }
      setPoints(pointRab);
      maskpoint.pointForRedax = pointRab;

      pointGraf = [];
      for (let i = 0; i < xctrLl.length; i++) {
        if (
          xctrLl[i].region === points.region &&
          xctrLl[i].area === points.area &&
          xctrLl[i].subarea === points.subarea
        ) {
          pointGraf.push(pointRab);
        } else {
          pointGraf.push(xctrLl[i]);
        }
      }
      flagSave = true;
      maskpoint.savePoint = true;
      dispatch(maskpointCreate(maskpoint));
      setOpenSetStr(false);
      setTrigger(!trigger);
    };

    const handleChange1 = (event: any) => {
      let form = Number(event.target.value.trimStart()); // удаление пробелов в начале строки
      if (form) setValuen1(Math.abs(form));
    };

    const handleChange2 = (event: any) => {
      let form = Number(event.target.value.trimStart()); // удаление пробелов в начале строки
      if (form) setValuen2(Math.abs(form));
    };

    const handleChange3 = (event: any) => {
      let form = Number(event.target.value.trimStart()); // удаление пробелов в начале строки
      if (form) setValuen3(Math.abs(form));
    };

    const handleChange4 = (event: any) => {
      let form = Number(event.target.value.trimStart()); // удаление пробелов в начале строки
      if (form) setValuen4(Math.abs(form));
    };

    const handleChange5 = (event: any) => {
      let form = Number(event.target.value.trimStart()); // удаление пробелов в начале строки
      if (form) setValuen5(Math.abs(form));
    };

    const handleChange6 = (event: any) => {
      let form = Number(event.target.value.trimStart()); // удаление пробелов в начале строки
      if (form) setValuen6(Math.abs(form));
    };

    const handleChange7 = (event: any) => {
      let form = Number(event.target.value.trimStart()); // удаление пробелов в начале строки
      if (form) setValuen7(Math.abs(form));
    };

    const handleChange8 = (event: any) => {
      let form = event.target.value.trimStart(); // удаление пробелов в начале строки
      setValuen8(form);
    };

    return (
      <Modal open={openSetStr} onClose={handleClose} hideBackdrop>
        <Box sx={styleSetInf}>
          <Button sx={styleModalEnd} onClick={handleClose}>
            <b>&#10006;</b>
          </Button>
          <Typography sx={{ textAlign: 'center' }}>
            Номер записи <b> {props.nom} </b>
          </Typography>{' '}
          <br />
          {Inputer('Прямой', valuen1, handleChange1, styleInpArg)}
          {Inputer('Обратный', valuen2, handleChange2, styleInpArg)}
          {Inputer('КСП', valuen3, handleChange3, styleInpArg)}
          {Inputer('КСС', valuen4, handleChange4, styleInpArg)}
          {Inputer('КСО', valuen5, handleChange5, styleInpArg)}
          {Inputer('Луч П', valuen6, handleChange6, styleInpArg)}
          {Inputer('Луч О', valuen7, handleChange7, styleInpArg)}
          {Inputer('Описание', valuen8, handleChange8, styleInpArg)}
          {SaveFunc(handleCloseStr)}
        </Box>
      </Modal>
    );
  };

  const SetOpenSetName = () => {
    setOpenSetName(true);
  };

  const SetOpenSetStr = (nom: number) => {
    nomStr = nom;
    setOpenSetStr(true);
  };

  const PointsLevel2BazaTab1 = () => {
    let name = formName.slice(0, 29);
    let yellowSoob = 'Выкл с ';
    if (!maskpoint.pointForRedax.yellow.make) yellowSoob = 'Вкл с ';
    yellowSoob +=
      TimeStr(maskpoint.pointForRedax.yellow.start) +
      ' до ' +
      TimeStr(maskpoint.pointForRedax.yellow.stop);

    return (
      <Grid container sx={{ height: '19.5vh' }}>
        <Grid item xs={12} sx={{ border: 0 }}>
          <Grid container item>
            <Grid item xs={4.2}>
              <Box sx={{ fontSize: 10.7, marginTop: 0.4 }}>
                <b>Наименование ХТ</b> <br /> <br />
                <b>Максимум прямого</b> <br /> <br />
                <b>Максимум обратного</b> <br /> <br />
                <b>Работа по НК и СК</b>
              </Box>
            </Grid>
            <Grid item xs>
              <Box sx={{ marginTop: 0.15, fontSize: 11, border: 0 }}>
                {!flagEdit && (
                  <>
                    {ButtRec(name, SetOpenSetName)} <br /> <br />
                    {ButtRec(maskpoint.pointForRedax.xctrls[props.crossroad].left, SetOpenSetName)}
                    <br /> <br />
                    {ButtRec(maskpoint.pointForRedax.xctrls[props.crossroad].right, SetOpenSetName)}
                    <br /> <br />
                    {ButtRec(yellowSoob, SetOpenSetName)}
                  </>
                )}
                {flagEdit && (
                  <b>
                    {name} <br /> <br />
                    {maskpoint.pointForRedax.xctrls[props.crossroad].left}
                    <br /> <br />
                    {maskpoint.pointForRedax.xctrls[props.crossroad].right}
                    <br /> <br />
                    {yellowSoob}
                  </b>
                )}
              </Box>
            </Grid>
          </Grid>
        </Grid>
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
    let elemm = maskpoint.pointForRedax.xctrls[crossRoad].StrategyB;

    for (let i = 0; i < elemm.length; i++) {
      let elem = elemm[i];
      resStr.push(
        <Grid key={i} container item xs={12}>
          <Grid xs={1.3} item sx={styleXTG011}>
            {!flagEdit && (
              <Button sx={styleBut02} variant="contained" onClick={() => SetOpenSetStr(i)}>
                {i}
              </Button>
            )}
            {flagEdit && <Box sx={{ p: 0.3 }}>{i}</Box>}
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
    let elemm = maskpoint.pointForRedax.xctrls[props.crossroad].Calculates;

    for (let i = 0; i < elemm.length; i++) {
      let elem = elemm[i];
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

  const StartEdit = () => {
    formTemp = formName;
    leftTemp = maxLeft;
    rightTemp = maxRight;
    pointsEt = points;
    pointsTemp = pointsEt;
    flagExit = true;
    flagEdit = false;
    maskpoint.redaxPoint = false;
    dispatch(maskpointCreate(maskpoint));
    setTrigger(!trigger);
  };

  const StopEdit = () => {
    setFormName(formTemp);
    setMaxLeft(leftTemp);
    setMaxRight(rightTemp);
    setPoints(pointsTemp);
    maskpoint.pointForRedax = props.xctrll[xtProps];
    pointGraf = props.xctrll;
    flagExit = false;
    flagEdit = true;
    maskpoint.redaxPoint = true;
    flagSave = false;
    maskpoint.savePoint = false;
    dispatch(maskpointCreate(maskpoint));
    setTrigger(!trigger);
  };

  const SaveEdit = () => {
    SendHandleSend(props.ws, maskpoint.pointForRedax); // прокидываем изменения на сервер
    props.setPoint(maskpoint.pointForRedax); // прокидываем изменения в App
    flagExit = false;
    flagEdit = true;
    maskpoint.redaxPoint = true;
    flagSave = false;
    maskpoint.savePoint = false;
    dispatch(maskpointCreate(maskpoint));
    pointsTemp = JSON.parse(JSON.stringify(maskpoint.pointForRedax));
    pointsEt = maskpoint.pointForRedax;
    setTrigger(!trigger);
  };

  return (
    <>
      {(maskpoint.savePoint || flagSave) && <>{WorkMenuEdit(6, 'Сохранить изменения', SaveEdit)}</>}
      {(maskpoint.redaxPoint || flagEdit) && <>{WorkMenuEdit(9, 'Редактирование', StartEdit)}</>}
      {flagExit && <>{WorkMenuEdit(9, 'Выйти без cохранения', StopEdit)}</>}

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
          <PointsLevel2BazaDiogram xctrll={pointGraf} xtt={xtProps} crossroad={props.crossroad} />
        </Grid>
      </Stack>
      {openSetName && <SetName />}
      {openSetStr && <SetStr nom={nomStr} />}
    </>
  );
};

export default PointsLevel2Baza;
