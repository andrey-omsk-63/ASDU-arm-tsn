import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';

//import Header from './components/Header/Header';
import Management from './components/Management/Management';
import Points from './components/Points/Points';
import Statistics from './components/Statistics/Statistics';

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

  const [value, setValue] = React.useState('1');

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
            <Points />
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
