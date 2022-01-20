import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';

import Statistic110 from './Statistic110';
import Statistic112 from './Statistic112';

const Statistics = () => {
  const [value, setValue] = React.useState('1');

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
          <Statistic110 />
        </TabPanel>
        <TabPanel value="2">
          <Statistic112 />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default Statistics;
