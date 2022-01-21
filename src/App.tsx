import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';

import axios from 'axios';

//import Header from './components/Header/Header';
import Management from './components/Management/Management';
import Points from './components/Points/Points';
import Statistics from './components/Statistics/Statistics';

//import  {XctrlGlob} from './interfaceGl.d';

export interface XctrlGlob {
  type: string;
  data: Data;
}

export interface Data {
  areaInfo:   AreaInfo;
  regionInfo: RegionInfo;
  xctrlInfo:  XctrlInfo[];
}

export interface AreaInfo {
  Воронеж:            { [key: string]: string };
  Зеленоград:         Зеленоград;
  Иркутск:            { [key: string]: string };
  "Иркутск дирекция": { [key: string]: string };
  Калмыкия:           Зеленоград;
  Мосавтодор:         { [key: string]: string };
  Тула:               { [key: string]: string };
  Хабаровск:          { [key: string]: string };
  "Южно-Сахалинск":   Зеленоград;
}

export interface Зеленоград {
  "1": string;
}

export interface RegionInfo {
  "1":                string;
  "2":                string;
  "3":                string;
  "4":                string;
  "5":                string;
  "6":                string;
  "7":                string;
  "8":                string;
  "9":                string;
  Воронеж:            string;
  "Все регионы":      string;
  Зеленоград:         string;
  Иркутск:            string;
  "Иркутск дирекция": string;
  Калмыкия:           string;
  Мосавтодор:         string;
  Тула:               string;
  Хабаровск:          string;
  "Южно-Сахалинск":   string;
}

export interface XctrlInfo {
  region:   number;
  area:     number;
  subarea:  number;
  switch:   boolean;
  release:  boolean;
  use:      boolean;
  yellow:   Yellow;
  step:     number;
  ltime:    number;
  pkcalc:   number;
  pknow:    number;
  pklast:   number;
  status:   null;
  xctrls:   Xctrl[];
  ext:      Array<number[]>;
  prioryty: Array<number[]>;
  time:     number;
  results:  { [key: string]: Result[] };
  devices:  number[];
}

export interface Result {
  Time:  number;
  Value: number[];
  Good:  boolean;
}

export interface Xctrl {
  name:       string;
  left:       number;
  right:      number;
  status:     any[];
  StrategyA: StrategyA[];
  StrategyB:  StrategyB[];
  Calculates: Calculate[];
}

export interface Calculate {
  region: number;
  area:   number;
  id:     number;
  chanL:  number[];
  chanR:  number[];
}

export interface StrategyA {
  pk: number;
  desc: string;
  xleft: number;
  xright: number;
}

export interface StrategyB {
  xleft:  number;
  xright: number;
  vleft:  number;
  vright: number;
  pkl:    number;
  pks:    number;
  pkr:    number;
  desc:   string;
}

export interface Yellow {
  make:  boolean;
  start: number;
  stop:  number;
}


// const WS = new WebSocket('wss://' + window.location.host + window.location.pathname + 'W' + window.location.search)
// const WS = new WebSocket('wss://192.168.115.134:4443/user/MMM/charPointsW')
// const WS = new WebSocket('wss://192.168.115.134:4443/user/Andrey_omsk/charPointsW');

// WS.onopen = function (event) {
//   console.log(event);
// };

// WS.onclose = function (event) {
//   console.log(event);
// };

// WS.onerror = function (event) {
//   console.log(event);
// };

// WS.onmessage = function (event) {
//   let allData = JSON.parse(event.data);
//   let data = allData.data;
//   switch (allData.type) {
//     case 'xctrlInfo':
//       console.log(data);
//       break;
//   }
// };


const App = () => {
  const styleApp01 = {
    fontSize: 12,
    marginRight: 1,
    width: '12vh',
    maxHeight: '21px',
    minHeight: '21px',
    backgroundColor: '#F1F3F4',
    color: 'black',
  };

  const styleApp02 = {
    fontSize: 12,
    marginRight: 1,
    maxHeight: '21px',
    minHeight: '21px',
    width: '24vh',
    backgroundColor: '#F1F3F4',
    color: 'black',
  };
  
  
  const [points, setPoints] = React.useState<XctrlGlob>({} as XctrlGlob);

  //const [points, setPoints] = React.useState<XctrlInfo>({} as XctrlInfo);
  //const [points, setPoints] = React.useState<Array<XctrlInfo>>([]);
  const [isOpen, setIsOpen] = React.useState(false);

  const [value, setValue] = React.useState('1');
  const ipAdress: string = 'http://localhost:3000/otladkaGlob.json';

  React.useEffect(() => {
      axios.get(ipAdress).then(({ data }) => {
      setPoints(data.data);
      setPoints(data.data.xctrlInfo);
      //setIsOpen(true);

      console.log('data:', data)
      console.log('data.xctrlInfo:', data.data.xctrlInfo)

      console.log('points:', points)
    });
  }, [ipAdress]);

  return (
    <>
      <Box sx={{ typography: 'body2' }}>
        <TabContext value={value}>
          <Box sx={{ marginLeft: 0.2, backgroundColor: '#F1F5FB' }}>
            <Stack direction="row">
              <Button sx={styleApp01} variant="contained" onClick={() => setValue('1')}>
                <b>Управление</b>
              </Button>

              <Button sx={styleApp02} variant="contained" onClick={() => setValue('2')}>
                <b>Характерные точки</b>
              </Button>

              <Button sx={styleApp01} variant="contained" onClick={() => setValue('3')}>
                <b>Статистика</b>
              </Button>
              {/* <Header /> */}
            </Stack>
          </Box>
          <TabPanel value="1">
            <Management />
          </TabPanel>
          <TabPanel value="2">
            <Points open={isOpen} />
          </TabPanel>
          <TabPanel value="3">
            <Statistics />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default App;
