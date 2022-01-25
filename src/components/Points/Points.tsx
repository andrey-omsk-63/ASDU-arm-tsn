import * as React from 'react';

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import PointsXt11 from './PointsXt11';

import { XctrlInfo } from '../../interfaceGl.d';

const Points = (props: { open: boolean; xctrll: XctrlInfo[] }) => {

  const stylePXt1 = {
    fontSize: 14,
    maxHeight: '20px',
    minHeight: '20px',
    backgroundColor: '#F1F3F4',
    color: 'black',
    marginRight: 0.5,
  };

  const open = props.open;
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const SpisXT = () => {
    let resSps: any = [];
    let labl: string = '';
    for (let i = 0; i < props.xctrll.length; i++) {
      labl = 'XT:' + (i + 1).toString() + ':1';
      resSps.push(
        <Tab key={i} sx={stylePXt1} label={labl} />,
      );
    }
    return resSps;
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
          {SpisXT()}
        </Tabs>
      </Box>
      <PointsXt11 open={open} xctrll={props.xctrll} xtt={value} />
    </>
  );
};

export default Points;
