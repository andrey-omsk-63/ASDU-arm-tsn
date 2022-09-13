import * as React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import PointsLevel2AreaDiogram from './PointsLevel2AreaDiogram';

import { styleSetInf, styleModalEnd } from './PointsLevel2BazaStyle';
import { styleInpArg, styleInpKnop } from './PointsLevel2BazaStyle';
import { styleXTG05, styleBut02, styleBut03 } from './PointsLevel2BazaStyle';
import { styleXTG00, styleXTG01, styleXTG021 } from './PointsLevel2BazaStyle';
import { styleXTG02, styleXTG035, styleXTG045 } from './PointsLevel2BazaStyle';

import { XctrlInfo } from '../../../interfaceGl.d';

let nomStr = 0;
let flagSave = false;
let flagEdit = true;
let flagExit = false;

let xtPropsOld = -1;
let crossRoadOld = -1;

let pointsTemp: any = null;
let pointRab: any = null;
let pointGraf: XctrlInfo[] = [];

const PointsLevel2Area = (props: {
  open: boolean;
  ws: WebSocket;
  xctrll: XctrlInfo[];
  xtt: number;
  value: string;
  crossroad: number;
  setPoint: any;
}) => {
  const xtProps = props.xtt;
  let pointsEt = props.xctrll[xtProps];
  const crossRoad = props.crossroad;
  const xctrLl = props.xctrll;

  const [openSetStr, setOpenSetStr] = React.useState(false);
  const [points, setPoints] = React.useState(pointsEt);
  const [trigger, setTrigger] = React.useState(false);

  // const styleXTG03 = {
  //   border: 1,
  //   height: '86.5vh',
  //   borderRadius: 1,
  //   borderColor: 'primary.main',
  // };

  // const styleXTG04 = {
  //   //height: '84.4vh',
  //   border: 1,
  //   marginLeft: 0.5,
  //   borderRadius: 1,
  //   borderColor: 'primary.main',
  // };

  if (xtPropsOld !== xtProps || crossRoadOld !== crossRoad) {
    pointGraf = props.xctrll;
    xtPropsOld = xtProps;
    crossRoadOld = crossRoad;
    nomStr = 0;
    flagSave = false;
    flagEdit = true;
    flagExit = false;
    pointsTemp = pointsEt;
    setPoints(pointsEt);
  }

  const handleKey = (event: any) => {
    if (event.key === 'Enter') event.preventDefault();
  };

  const Inputer = (name: string, argum: any, hChange: any, styleX: any) => {
    return (
      <Grid container sx={{ fontSize: 15 }}>
        <Grid item xs={5}>
          {name}
        </Grid>
        <Grid item xs>
          <Box sx={styleX}>
            <TextField
              size="small"
              onKeyPress={handleKey} //отключение Enter
              inputProps={{ style: { fontSize: 14 } }}
              value={argum}
              onChange={hChange}
              variant="standard"
            />
          </Box>
        </Grid>
      </Grid>
    );
  };
  //let elem = points.xctrls[crossRoad].StrategyA[props.nom]

  const SetStr = (props: { nom: number }) => {
    let elem = points.xctrls[crossRoad].StrategyA[props.nom];
    const [valuen1, setValuen1] = React.useState(elem.xleft);
    const [valuen2, setValuen2] = React.useState(elem.xright);
    const [valuen3, setValuen3] = React.useState(elem.desc);

    const handleClose = () => {
      setOpenSetStr(false);
    };

    const handleCloseStr = () => {
      pointRab = JSON.parse(JSON.stringify(points));
      pointRab.xctrls[crossRoad].StrategyA[props.nom].xleft = valuen1;
      pointRab.xctrls[crossRoad].StrategyA[props.nom].xright = valuen2;
      pointRab.xctrls[crossRoad].StrategyA[props.nom].desc = valuen3;
      setPoints(pointRab);
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
      let form = event.target.value.trimStart(); // удаление пробелов в начале строки
      setValuen3(form);
    };

    return (
      <Modal open={openSetStr} onClose={handleClose} hideBackdrop>
        <Box sx={styleSetInf}>
          <Button sx={styleModalEnd} onClick={handleClose}>
            <b>&#10006;</b>
          </Button>
          <Typography sx={{ textAlign: 'center' }}>
            КС <b> {elem.pk} </b>
          </Typography>
          {Inputer('Прямой', valuen1, handleChange1, styleInpArg)}
          {Inputer('Обратный', valuen2, handleChange2, styleInpArg)}
          {Inputer('Описание', valuen3, handleChange3, styleInpArg)}
          <Box sx={{ textAlign: 'center' }}>
            <Button sx={styleInpKnop} variant="contained" onClick={handleCloseStr}>
              <b>Сохранить</b>
            </Button>
          </Box>
        </Box>
      </Modal>
    );
  };

  const SetOpenSetStr = (nom: number) => {
    nomStr = nom;
    setOpenSetStr(true);
  };

  const PointsLevel2AreaTab1Header = () => {
    return (
      <Grid container>
        <Grid item xs={2} sx={styleXTG02}>
          <b>КС</b>
        </Grid>
        <Grid item xs={3} sx={styleXTG02}>
          <b>Прямой</b>
        </Grid>
        <Grid item xs={3.5} sx={styleXTG02}>
          <b>Обратный</b>
        </Grid>
        <Grid item xs={3.5} sx={styleXTG021}>
          <b>Описание</b>
        </Grid>
      </Grid>
    );
  };

  const PointsLevel2AreaTab1Stroka = () => {
    let resStr = [];

    for (let i = 0; i < points.xctrls[props.crossroad].StrategyA.length; i++) {
      let elem = points.xctrls[props.crossroad].StrategyA[i].pk;
      resStr.push(
        <Grid key={i} container>
          <Grid xs={2} item sx={styleXTG01}>
            {/* {points.xctrls[props.crossroad].StrategyA[i].pk} */}
            {!flagEdit && (
              <Button sx={styleBut02} variant="contained" onClick={() => SetOpenSetStr(i)}>
                {elem}
              </Button>
            )}
            {flagEdit && <Box sx={{ p: 0.3 }}>{elem}</Box>}
          </Grid>
          <Grid xs={3} item sx={styleXTG01}>
            {points.xctrls[props.crossroad].StrategyA[i].xleft}
          </Grid>
          <Grid xs={3.5} item sx={styleXTG01}>
            {points.xctrls[props.crossroad].StrategyA[i].xright}
          </Grid>

          <Grid xs={3.5} item sx={styleXTG00}>
            {points.xctrls[props.crossroad].StrategyA[i].desc}
          </Grid>
        </Grid>,
      );
    }
    return resStr;
  };

  const StartEdit = () => {
    pointsEt = points;
    pointsTemp = pointsEt;
    flagExit = true;
    flagEdit = false;
    setTrigger(!trigger);
  };

  const StopEdit = () => {
    setPoints(pointsTemp);
    pointGraf = props.xctrll;
    flagExit = false;
    flagEdit = true;
    flagSave = false;
    setTrigger(!trigger);
  };

  const SaveEdit = () => {
    const handleSend = () => {
      if (props.ws !== null) {
        if (props.ws.readyState === WebSocket.OPEN) {
          props.ws.send(JSON.stringify({ type: 'changeXctrl', data: points }));
        } else {
          setTimeout(() => {
            handleSend();
          }, 1000);
        }
      }
    };
    handleSend(); // прокидываем изменения на сервер
    props.setPoint(points); // прокидываем изменения в App
    flagExit = false;
    flagEdit = true;
    flagSave = false;
    pointsTemp = points;
    pointsEt = points;
    setTrigger(!trigger);
  };

  return (
    <>
      {props.value === '2' && (
        <>
          {flagSave && (
            <Grid container>
              <Grid item xs={6}></Grid>
              <Grid item xs={3} sx={styleXTG05}>
                <Button sx={styleBut03} variant="contained" onClick={() => SaveEdit()}>
                  <b>Сохранить изменения</b>
                </Button>
              </Grid>
            </Grid>
          )}

          {flagEdit && (
            <Grid container>
              <Grid item xs={9}></Grid>
              <Grid item xs={3} sx={styleXTG05}>
                <Button sx={styleBut03} variant="contained" onClick={() => StartEdit()}>
                  <b>Редактирование</b>
                </Button>
              </Grid>
            </Grid>
          )}

          {flagExit && (
            <Grid container>
              <Grid item xs={9}></Grid>
              <Grid item xs={3} sx={styleXTG05}>
                <Button sx={styleBut03} variant="contained" onClick={() => StopEdit()}>
                  <b>Выйти без cохранения</b>
                </Button>
              </Grid>
            </Grid>
          )}

          <Stack direction="row">
            <Grid item xs={3} sx={{ height: '86.5vh', border: 0 }}>
              <Grid container>
                <Grid item xs={12} sx={styleXTG035}>
                  <PointsLevel2AreaTab1Header />
                  {PointsLevel2AreaTab1Stroka()}
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs sx={styleXTG045}>
              <Grid container>
                <PointsLevel2AreaDiogram
                  xctrll={pointGraf}
                  xtt={xtProps}
                  crossroad={props.crossroad}
                />
              </Grid>
            </Grid>
          </Stack>
          {openSetStr && <SetStr nom={nomStr} />}
        </>
      )}
    </>
  );
};

export default PointsLevel2Area;
