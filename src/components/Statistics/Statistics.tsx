import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Statistic110 from './Statistic110';

import axios from 'axios';

import { Statistic } from '../../interfaceStat.d';

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

let tekValue = 0;

const Statistics = () => {
  const styleSt1 = {
    fontSize: 13.5,
    maxHeight: '20px',
    minHeight: '20px',
    backgroundColor: '#F1F3F4',
    color: 'black',
    marginRight: 0.5,
  };

  const [points, setPoints] = React.useState<Array<Statistic>>([]);
  //const [points, setPoints] = React.useState<Data>({} as Data);
  const [isOpen, setIsOpen] = React.useState(false);
  const ipAdress: string = 'http://localhost:3000/statistics.json';

  React.useEffect(() => {
    axios.get(ipAdress).then(({ data }) => {
      setPoints(data.data.statistics);
      setIsOpen(true);
    });
  }, [ipAdress]);

  //if (isOpen) console.log('!!!', points);

  const [value, setValue] = React.useState(tekValue);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    tekValue = newValue;
  };

  const SpisXT = () => {
    let resSps: any = [];
    let labl: string = '';
    for (let i = 0; i < points.length; i++) {
      labl = 'XT:' + (i + 1).toString() + ':1';
      resSps.push(<Tab key={i} sx={styleSt1} label={labl} />);
    }
    return resSps;
  };

  return (
    <>
      <Box sx={{ maxWidth: 850, fontSize: 12, marginTop: -2, marginLeft: -3, marginRight: -7 }}>
        <Tabs
          sx={{ maxHeight: '20px', minHeight: '20px' }}
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons={true}
          allowScrollButtonsMobile>
          {SpisXT()}
        </Tabs>
      </Box>
      <Statistic110 open={isOpen} statist={points} areaid={value} />
    </>
  );
};

export default Statistics;

//import Stack from '@mui/material/Stack';
//import Button from '@mui/material/Button';
//import TabContext from '@mui/lab/TabContext';
//import TabPanel from '@mui/lab/TabPanel';

// <Box sx={{ marginTop: -2, marginLeft: -3, marginRight: -7 }}>
//   <TabContext value={value}>
//     <Box>
//       <Stack sx={{ marginTop: -2 }} direction="row">
//         <Button sx={styleBut01} variant="contained" onClick={() => setValue('1')}>
//           1:1
//         </Button>
//         <Button sx={styleBut01} variant="contained" onClick={() => setValue('2')}>
//           2:2
//         </Button>
//       </Stack>
//     </Box>
//     <TabPanel value="1">
//       <Statistic110 open={isOpen} statist={points} areaid={0} />
//     </TabPanel>
//     <TabPanel value="2">
//       <Statistic110 open={isOpen} statist={points} areaid={1} />
//     </TabPanel>
//   </TabContext>
// </Box>
