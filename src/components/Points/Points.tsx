import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';

import PointsXt11 from './PointsXt11';

const Points = (props: {open: boolean}) => {
  
  const stylePXt1 = {
    fontSize: 10,
    maxHeight: '20px',
    minHeight: '20px',
    backgroundColor: '#F1F3F4',
    color: 'black',
    marginRight: 1,
  };

  const [value, setValue] = React.useState('1');

  return (
    <Box sx={{ fontSize: 12, marginTop: -2, marginLeft: -3, marginRight: -7 }}>
      <TabContext value={value}>
        <Box>
          <Stack sx={{ marginTop: -2 }} direction="row">
            <Button sx={stylePXt1} variant="contained" onClick={() => setValue('1')}>
              XT:1:1
            </Button>

            <Button sx={stylePXt1} variant="contained" onClick={() => setValue('2')}>
              XT:2:1
            </Button>
          </Stack>
        </Box>
        <TabPanel value="1">
          <PointsXt11 xt='XT:1:1' IP={'http://localhost:3000/xctrl.json'} />
        </TabPanel>
        <TabPanel value="2">
          <PointsXt11 xt='XT:1:2' IP={'http://localhost:3000/otladka.json'} />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default Points;
