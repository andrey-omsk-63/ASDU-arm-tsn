import * as React from 'react';
//import Stack from '@mui/material/Stack';
//import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
//import TabContext from '@mui/lab/TabContext';
//import TabPanel from '@mui/lab/TabPanel';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import TabUnstyled from '@mui/base/TabUnstyled';

import PointsXt11 from './PointsXt11';

import { XctrlInfo } from '../../interfaceGl.d';
import { maxWidth } from '@mui/system';

const Points = (props: { open: boolean; xctrll: XctrlInfo[] }) => {
  console.log('Poins_xctrll:', props.xctrll)

  const stylePXt1 = {
    fontSiz: 10,
    maxHeight: '20px',
    minHeight: '20px',
    backgroundColor: '#F1F3F4',
    color: 'black',
    marginRight: 1,

    bordercolor: 'white'
  };

  // const [value, setValue] = React.useState('1');
  const open = props.open;
  const [value, setValue] = React.useState(0);
  let valll = 0;



  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    valll = newValue
    console.log('val:', valll)
  };

  return (
    <Box sx={{ fontSize: 12, marginTop: -2, marginLeft: -3, marginRight: -7 }}>

      <Box sx={{ maxWidth: 400, bgcolor: 'background.paper' }}>
        <Tabs
          // sx={{ bordercolor: 'white' }}
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons={true}
          allowScrollButtonsMobile
          aria-label="Tabs where each tab needs to be selected manually"

        >
          <Tab sx={stylePXt1} label="XT:1:1" />
          <Tab sx={stylePXt1} label="XT:2:1" />
          <Tab sx={stylePXt1} label="XT:3:1" />
          <Tab sx={stylePXt1} label="XT:4:1" />

          <Tab sx={stylePXt1} label="XT:5:1" />
          <Tab sx={stylePXt1} label="XT:6:1" />
          <Tab sx={stylePXt1} label="XT:7:1" />
          <Tab sx={stylePXt1} label="XT:8:1" />

        </Tabs>
      </Box>



      {/* <TabsUnstyled defaultValue={0}>
        <TabsListUnstyled>
          <TabUnstyled>XT:1:1</TabUnstyled>
          <TabUnstyled>XT:2:1</TabUnstyled>
          <TabUnstyled>XT:3:1</TabUnstyled>
          <TabUnstyled>XT:1:1</TabUnstyled>
          <TabUnstyled>XT:2:1</TabUnstyled>
          <TabUnstyled>XT:3:1</TabUnstyled>
        </TabsListUnstyled>
        <TabPanelUnstyled value={0}>11111111111111111 </TabPanelUnstyled>
        <TabPanelUnstyled value={1}><PointsXt11 open={open} xctrll={props.xctrll} xt="XT:1:1" /></TabPanelUnstyled>
        <TabPanelUnstyled value={2}>Third content</TabPanelUnstyled>
      </TabsUnstyled> */}
    </Box>




    // <Box sx={{ fontSize: 12, marginTop: -2, marginLeft: -3, marginRight: -7 }}>
    //   <TabContext value={value}>


    //   <Stack sx={{ marginTop: -2, maxWidth: 100, border: 1 }} direction="row">
    //     <Tabs value={value}
    //       variant="scrollable"
    //       scrollButtons
    //       allowScrollButtonsMobile
    //       aria-label="scrollable force tabs example">
    //       <Button sx={stylePXt1} variant="contained" onClick={() => setValue('1')}>
    //         XT:1:1
    //       </Button>

    //       <Button sx={stylePXt1} variant="contained" onClick={() => setValue('2')}>
    //         XT:2:1
    //       </Button>
    //     </Tabs>
    //   </Stack>

    //   <TabPanel value="1">
    //       <PointsXt11 open={open} xctrll={props.xctrll} xt="XT:1:1" />
    //     </TabPanel>
    //     <TabPanel value="2">
    //       <PointsXt11 open={open} xctrll={props.xctrll} xt="XT:2:1" />
    //     </TabPanel> */}
    //   </TabContext>
    // </Box>
  );
};

export default Points;
