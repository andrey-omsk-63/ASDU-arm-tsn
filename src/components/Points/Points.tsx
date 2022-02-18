import * as React from 'react';

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import PointsXt11 from './PointsXt11';

//import axios from 'axios';

import { XctrlInfo } from '../../interfaceGl.d';

let tekValue = 0;

const Points = (props: {
  open: boolean; ws: WebSocket; xctrll: XctrlInfo[]
  //flag: boolean; 
}) => {
  const stylePXt1 = {
    fontSize: 13.5,
    maxHeight: '20px',
    minHeight: '20px',
    backgroundColor: '#F1F3F4',
    color: 'black',
    marginRight: 0.5,
  };

  const isOpen = props.open;
  const points = props.xctrll;
  const [value, setValue] = React.useState(tekValue);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    tekValue = newValue;
  };

  const SpisXT = () => {
    let resSps: any = [];
    let labl: string = '';

    console.log('props.xctrll:', points)
    
    if (points.length === 0) {
      resSps.push(
        <Box key={1} sx={stylePXt1}>
          Нет данных по ХТ
        </Box>,
      );
    } else {
      for (let i = 0; i < points.length; i++) {
        labl = 'XT:' + (i + 1).toString() + ':1';
        resSps.push(<Tab key={i} sx={stylePXt1} label={labl} />);
      }
    }
    return resSps;
  };

  // const [points, setPoints] = React.useState<Array<XctrlInfo>>([]);
  // const [isOpen, setIsOpen] = React.useState(false);
  // const ipAdress: string = 'http://localhost:3000/otladkaGlob.json';
  // React.useEffect(() => {
  //   axios.get(ipAdress).then(({ data }) => {
  //     //console.log('ggg', data.data.xctrlInfo);
  //     setPoints(data.data.xctrlInfo);
  //     setIsOpen(true);
  //   });
  // }, [ipAdress]);
  //console.log('pppp', points, isOpen);

  return (
    <Box sx={{ border: 0, marginTop: -2.8, marginLeft: -3, marginRight: -5.5 }}>
      <Box
        sx={{
          maxWidth: '100%',
          fontSize: 12,
          marginTop: 0.5,
          marginLeft: -4.6,
          marginRight: -7,
        }}>
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
            <PointsXt11 open={isOpen} xctrll={points} xtt={value} />
          </>
        )}
      </>
    </Box>
  );
};

export default Points;
