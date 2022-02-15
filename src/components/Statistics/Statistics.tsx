import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

//import axios from 'axios';

import Statistic110 from './Statistic110';

import { Statistic } from '../../interfaceStat.d';

let tekValue = 0;
let pointsEtalon: Statistic[];
let flagEtalon = true;

const Statistics = (props: {
  open: boolean;
  ws: React.MutableRefObject<WebSocket>;
  //ws: WebSocket;
  points: Statistic[];
}) => {
  //console.log('PoinsSt:', props.open, props.points);

  let isOpen = props.open;
  let points = props.points;

  React.useEffect(() => {
    const handleSend = () => {
      if (props.ws.current.readyState === WebSocket.OPEN) {
        props.ws.current.send(JSON.stringify({ type: 'getStatistics', region: '1' }));
        //if (props.ws.readyState === WebSocket.OPEN) {
        //  props.ws.send(JSON.stringify({ type: 'getDevices', region: '1' }));
      } else {
        setTimeout(() => {
          handleSend();
        }, 1000);
      }
      console.log('отработал send ST');
    };

    handleSend();
  }, [props.ws]);

  //const [points, setPoints] = React.useState<Array<Statistic>>([]);
  //const [points, setPoints] = React.useState<Data>({} as Data);
  // const [isOpen, setIsOpen] = React.useState(false);
  // const ipAdress: string = 'http://localhost:3000/statistics.json';

  // React.useEffect(() => {
  //   axios.get(ipAdress).then(({ data }) => {
  //     setPoints(data.data.statistics);
  //     setIsOpen(true);
  //   });
  // }, [ipAdress]);

  //if (isOpen) console.log('!!!', points);

  if (isOpen && flagEtalon) {
    pointsEtalon = points;
    flagEtalon = false;
    points = [];
  }

  if (isOpen && !flagEtalon) {
    for (let i = 0; i < points.length; i++) {
      
      for (let j = 0; j < pointsEtalon.length; j++) {
        if (
          points[i].id === pointsEtalon[j].id &&
          points[i].region === pointsEtalon[j].region &&
          points[i].area === pointsEtalon[j].area 
        ) {
          console.log('Ctat совподение записей i=', i, 'j=', j);
          pointsEtalon[j] = points[i];
        }
      }
    }
  }
  const styleSt1 = {
    fontSize: 13.5,
    maxHeight: '20px',
    minHeight: '20px',
    backgroundColor: '#F1F3F4',
    color: 'black',
    marginRight: 0.5,
  };

  const [value, setValue] = React.useState(tekValue);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    tekValue = newValue;
  };

  const SpisXT = () => {
    let resSps: any = [];
    let labl: string = '';

    if (points.length === 0) {
      resSps.push(
        <Box key={1} sx={styleSt1}>
          Нет данных по ХТ
        </Box>,
      );
    } else {
      for (let i = 0; i < pointsEtalon.length; i++) {
        labl = 'XT:' + (i + 1).toString() + ':1';
        resSps.push(<Tab key={i} sx={styleSt1} label={labl} />);
      }
    }
    
    return resSps;
  };

  return (
    <>
      {isOpen && points.length > 0 && (
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
          <>
            {points.length > 0 && (
              <>
                <Statistic110 open={isOpen} statist={pointsEtalon} areaid={value} />
              </>
            )}
          </>
        </>
      )}
    </>
  );
};

export default Statistics;
