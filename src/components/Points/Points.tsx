import * as React from 'react';

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import PointsXt11 from './PointsXt11';

import { XctrlInfo } from '../../interfaceGl.d';

const Points = (props: { open: boolean; xctrll: XctrlInfo[] }) => {
  console.log('Poins_xctrll:', props.xctrll);

  const stylePXt1 = {
    fontSiz: 10,
    maxHeight: '20px',
    minHeight: '20px',
    backgroundColor: '#F1F3F4',
    color: 'black',
    marginRight: 1,
    // bordercolor: 'white',
  };

  // const [value, setValue] = React.useState('1');
  const open = props.open;
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ maxWidth: 850, fontSize: 12, marginTop: -2.5, marginLeft: -3, marginRight: -7 }}>
        <Tabs
          sx={{ maxHeight: '20px', minHeight: '20px' }}
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons={true}
          allowScrollButtonsMobile>
          <Tab sx={stylePXt1} label="XT:1:1" />
          <Tab sx={stylePXt1} label="XT:2:1" />
          <Tab sx={stylePXt1} label="XT:3:1" />
          <Tab sx={stylePXt1} label="XT:4:1" />

          <Tab sx={stylePXt1} label="XT:5:1" />
          <Tab sx={stylePXt1} label="XT:6:1" />
          <Tab sx={stylePXt1} label="XT:7:1" />
          <Tab sx={stylePXt1} label="XT:8:1" />

          <Tab sx={stylePXt1} label="XT:9:1" />
          <Tab sx={stylePXt1} label="XT:10:1" />
          <Tab sx={stylePXt1} label="XT:11:1" />
          <Tab sx={stylePXt1} label="XT:12:1" />
        </Tabs>
      </Box>
      <PointsXt11 open={open} xctrll={props.xctrll} xtt={value} />
    </>
  );
};

export default Points;
