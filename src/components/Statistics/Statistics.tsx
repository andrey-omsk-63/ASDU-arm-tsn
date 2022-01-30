import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';

import Statistic110 from './Statistic110';
import Statistic112 from './Statistic112';

import axios from 'axios';

export interface Welcome2 {
  type: string;
  data: Data;
}

export interface Data {
  statistics: [];
}

export interface Statistic {
  region: number;
  area: number;
  id: number;
  date: Date;
  Statistics: StatisticElement[];
}

export interface StatisticElement {
  Period: number;
  Type: number;
  TLen: number;
  Hour: number;
  Min: number;
  Datas: DataElement[];
}

export interface DataElement {
  ch: number;
  st: number;
  in: number;
  sp: number;
  d: number;
  o: number;
  g: number;
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

const Statistics = () => {
  const [value, setValue] = React.useState('1');
  const [points, setPoints] = React.useState<Array<Statistic>>([]);
  //const [points, setPoints] = React.useState<Data>({} as Data);
  const [isOpen, setIsOpen] = React.useState(false);
  const ipAdress: string = 'http://localhost:3000/statistics.json';

  React.useEffect(() => {
    axios.get(ipAdress).then(({ data }) => {
      console.log('000', data);
      setPoints(data.data.statistics);
      setIsOpen(true);
    });
  }, [ipAdress]);

  if (isOpen) console.log('!!!', points);
  return (
    <Box sx={{ marginTop: -2, marginLeft: -3, marginRight: -7 }}>
      <TabContext value={value}>
        <Box>
          <Stack sx={{ marginTop: -2 }} direction="row">
            <Button
              size="small"
              sx={{
                fontSize: 10,
                maxHeight: '20px',
                minHeight: '20px',
                backgroundColor: '#F1F3F4',
                color: 'black',
                marginRight: 1,
              }}
              variant="contained"
              onClick={() => setValue('1')}>
              1:1
            </Button>

            <Button
              size="small"
              sx={{
                fontSize: 10,
                maxHeight: '20px',
                minHeight: '20px',
                backgroundColor: '#F1F3F4',
                color: 'black',
              }}
              variant="contained"
              onClick={() => setValue('2')}>
              2:2
            </Button>
          </Stack>
        </Box>
        <TabPanel value="1">
          <Statistic110 open={isOpen} statist={points} />
        </TabPanel>
        <TabPanel value="2">
          <Statistic112 />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default Statistics;
