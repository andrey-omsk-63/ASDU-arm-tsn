import * as React from 'react';

import { Stater } from './App';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CalendarPickerSkeleton } from '@mui/x-date-pickers/CalendarPickerSkeleton';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import Badge from '@mui/material/Badge';
// import html2canvas from 'html2canvas';
// import { jsPDF } from 'jspdf';

import { styleDatePicker, styleModalMenu } from './AppStyle';
import { styleInpOk, styleButOk } from './AppStyle';

export const MakeDate = (tekData: Date) => {
  let ddd = new Date(tekData.toString());
  let SMes = ddd.getMonth() + 1;
  let sDate = ddd.getFullYear() + '-';
  let sDay = ddd.getDate();
  if (SMes < 10) sDate = sDate + '0';
  sDate += SMes + '-';
  if (sDay < 10) sDate += '0';
  sDate += sDay;
  return sDate;
};

export const MakeDateRus = (dat: string) => {
  let rusDat = dat.slice(8) + '-' + dat.slice(5, 7);
  rusDat += '-' + dat.slice(0, 4);
  return rusDat;
};

export const MakeInterval = (mode: number) => {
  let dat: any = [];
  switch (mode) {
    case 1:
      dat = ['1', '5', '10', '15', '30', '60'];
      break;
    case 5:
      dat = ['5', '10', '15', '30', '60'];
      break;
    case 10:
      dat = ['10', '20', '30', '60'];
      break;
    case 15:
      dat = ['15', '30', '60'];
      break;
    case 20:
      dat = ['20', '60'];
      break;
    default:
      console.log('В БД некорректный интервал');
      dat = ['1', '5', '10', '15', '30', '60'];
  }
  return dat;
};
//TimeStr
export const ButtonMenu = (mode: string, soob: string, SetValue: Function) => {
  const styleApp02 = {
    fontSize: 14,
    marginRight: 1,
    minWidth: (soob.length + 10) * 6.5,
    maxWidth: (soob.length + 10) * 6.5,
    maxHeight: '21px',
    minHeight: '21px',
    backgroundColor: '#E9F5D8',
    color: 'black',
    textTransform: 'unset !important',
  };

  return (
    <Button sx={styleApp02} variant="contained" onClick={() => SetValue(mode)}>
      <b>{soob}</b>
    </Button>
  );
};

export const InputerOk = (inpDate: boolean, InputOk: Function) => {
  return (
    <Grid item xs={2.3} sx={styleInpOk}>
      {inpDate && (
        <Button sx={styleButOk} variant="contained" onClick={() => InputOk()}>
          Да
        </Button>
      )}
    </Grid>
  );
};

export const MenuSpisRegion = (region: any, nameRegion: string, handleCloseModal: Function) => {
  return (
    <Button
      key={Math.random()}
      sx={styleModalMenu}
      variant="contained"
      onClick={() => handleCloseModal(region)}>
      <b>{nameRegion}</b>
    </Button>
  );
};

export const PunktMenuSaveFile = (SetValue: Function) => {
  return (
    <Grid item container sx={{ marginTop: -0.25, marginRight: 0.3, width: '140px' }}>
      <Grid item xs sx={{ textAlign: 'left' }}>
        {ButtonMenu('5', 'Сохр.в файл', SetValue)}
      </Grid>
    </Grid>
  );
};

export const WriteToCsvFileForStat = (datestat: Stater) => {
  const element = document.createElement('a');
  let textFile = '';
  for (let i = 0; i < datestat.stat.length; i++) {
    textFile += datestat.stat[i].Hour + ';';
    textFile += datestat.stat[i].Min + ';';
    for (let j = 0; j < datestat.stat[i].Datas.length; j++) {
      textFile += datestat.stat[i].Datas[j].in;
      if (j + 1 !== datestat.stat[i].Datas.length) textFile += ';';
    }
    textFile += '\n';
  }
  const file = new Blob([textFile], { type: 'text/plain' });
  element.href = URL.createObjectURL(file);
  let nameFile = datestat.area + '.' + datestat.id + ' ';
  nameFile += datestat.data + ' ' + datestat.time + '.csv';
  element.download = nameFile;
  document.body.appendChild(element); // Required for this to work in FireFox
  element.click();
  // const dataURI = "data:text/plain;base64," + encodeBase64("Hello World!");
  // saveAs(dataURI, "test.txt");
};

export const InputerDate = (valueDate: any, handleChangeDP: any, massGoodDate: any) => {
  return (
    <Box sx={styleDatePicker}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ru'}>
        <DatePicker
          views={['day']}
          value={valueDate}
          inputFormat="DD-MM-YYYY"
          InputProps={{ style: { fontSize: 14 } }}
          onChange={handleChangeDP}
          renderInput={(params: any) => <TextField {...params} />}
          renderLoading={() => <CalendarPickerSkeleton />}
          renderDay={(day, _value, DayComponentProps) => {
            const isSelected =
              !DayComponentProps.outsideCurrentMonth && massGoodDate.indexOf(MakeDate(day)) >= 0;
            return (
              <Badge
                key={day.toString()}
                overlap="circular"
                badgeContent={isSelected ? '👍' : undefined}>
                <PickersDay {...DayComponentProps} />
              </Badge>
            );
          }}
        />
      </LocalizationProvider>
    </Box>
  );
};

export const SendSocketgetStatisticsList = (debug: boolean, ws: WebSocket, region: string) => {
  console.log('getStatisticsList:', region);
  const handleSendOpen = () => {
    if (!debug) {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(
          JSON.stringify({
            type: 'getStatisticsList',
            region,
          }),
        );
      } else {
        setTimeout(() => {
          handleSendOpen();
        }, 1000);
      }
    }
  };
  handleSendOpen();
};
//=== PointsLevel2Baza =============================
export const TimeStr = (tim: number) => {
  let timLiner = '';
  let hour = Math.trunc(tim / 60);
  let min = tim % 60;
  if (hour < 10) timLiner = '0';
  timLiner += hour.toString();
  timLiner += ':';
  if (min < 10) timLiner += '0';
  timLiner += min.toString();
  return timLiner;
};

export const BoxTextField = (argum: any, hChange: any) => {
  const handleKey = (event: any) => {
    if (event.key === 'Enter') event.preventDefault();
  };

  return (
    <TextField
      size="small"
      onKeyPress={handleKey} //отключение Enter
      inputProps={{ style: { fontSize: 14 } }}
      value={argum}
      onChange={hChange}
      variant="standard"
    />
  );
};

export const Inputer = (name: string, argum: any, hChange: any, styleX: any) => {
  return (
    <Grid container sx={{ fontSize: 15 }}>
      <Grid item xs={5}>
        {name}
      </Grid>
      <Grid item xs>
        <Box sx={styleX}>{BoxTextField(argum, hChange)}</Box>
      </Grid>
    </Grid>
  );
};

export const WorkMenuEdit = (xss: number, soob: string, servisFunc: any) => {
  const styleBut03 = {
    fontSize: 13.5,
    //marginTop: -0.5,
    marginTop: -2,
    maxHeight: '21px',
    minHeight: '21px',
    maxWidth: '193px',
    minWidth: '193px',
    //backgroundColor: '#FFFBE5',
    backgroundColor: '#E9F5D8',
    color: 'black',
    textTransform: 'unset !important',
  };

  const styleXTG05 = {
    marginTop: -3.0,
    height: '3vh',
    textAlign: 'right',
  };

  return (
    <Grid container item>
      <Grid item xs={xss}></Grid>
      <Grid item xs={3} sx={styleXTG05}>
        <Button sx={styleBut03} variant="contained" onClick={() => servisFunc()}>
          <b>{soob}</b>
        </Button>
      </Grid>
    </Grid>
  );
};

export const ButtRec = (rec: any, func: any) => {
  const styleBut01 = {
    fontSize: 10,
    marginTop: -0.3,
    maxHeight: '15px',
    minHeight: '15px',
    maxWidth: '205px',
    minWidth: '205px',
    // backgroundColor: '#FFFBE5', // молоко
    backgroundColor: '#E9F5D8', // салатовый
    color: 'black',
    textTransform: 'unset !important',
  };

  return (
    <Button sx={styleBut01} variant="contained" onClick={() => func()}>
      <b>{rec}</b>
    </Button>
  );
};

export const ConclHeader = (xss: number, elem: string, styleXX: any) => {
  return (
    <Grid item xs={xss} sx={styleXX}>
      <b>{elem}</b>
    </Grid>
  );
};

export const ConclStr = (xss: number, elem: any, styleXX: any) => {
  return (
    <Grid item xs={xss} sx={styleXX}>
      {elem}
    </Grid>
  );
};

export const InputTimeAndMode = (soob: string, func: any) => {
  return (
    <Grid container sx={{ fontSize: 15 }}>
      <Grid item xs={5}>
        {soob}
      </Grid>
      <Grid item xs>
        {func()}
      </Grid>
    </Grid>
  );
};

export const SaveFunc = (func: any) => {
  const styleInpKnop = {
    color: 'black',
    marginTop: 1,
    maxHeight: '21px',
    minHeight: '21px',
    //backgroundColor: '#F1F3F4', // светлосерый
    backgroundColor: '#E9F5D8', // салатовый
    textAlign: 'center',
    textTransform: 'unset !important',
  };

  return (
    <>
      <br />
      <Box sx={{ textAlign: 'center' }}>
        <Button sx={styleInpKnop} variant="contained" onClick={func}>
          <b>Сохранить</b>
        </Button>
      </Box>
    </>
  );
};

export const SendHandleSend = (ws: any, mask: any) => {
  const handleSendOpen = () => {
    if (ws !== null) {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(
          JSON.stringify({
            type: 'changeXctrl',
            data: mask,
          }),
        );
      } else {
        setTimeout(() => {
          handleSendOpen();
        }, 1000);
      }
    }
  };
  handleSendOpen();
};
//=== PointsMainScr ================================
export const WorkMenuEditMain = (xss: number, soob: string, servisFunc: any) => {
  const styleBut03 = {
    fontSize: 13.5,
    marginTop: 4,
    maxHeight: '21px',
    minHeight: '21px',
    maxWidth: '193px',
    minWidth: '193px',
    //backgroundColor: '#FFFBE5',
    backgroundColor: '#E9F5D8',
    color: 'black',
    textTransform: 'unset !important',
  };

  const styleXTG05 = {
    //border: 1,
    marginTop: -3.3,
    height: '3vh',
    textAlign: 'right',
    paddingRight: 1,
  };

  return (
    <Grid container>
      <Grid item xs={xss}></Grid>
      <Grid item xs={3} sx={styleXTG05}>
        <Button sx={styleBut03} variant="contained" onClick={() => servisFunc()}>
          <b>{soob}</b>
        </Button>
      </Grid>
    </Grid>
  );
};
//==================================================
