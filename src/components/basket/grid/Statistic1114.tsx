import * as React from 'react';
import Grid from '@mui/material/Grid';

import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const Statistic1114 = () => {
  const styleSt03 = {
    borderRight: 1,
    borderBottom: 1,
    borderColor: 'primary.main',
    backgroundColor: '#C0C0C0',
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 2,
  };

  const styleBatton = {
    fontSize: 11,
    backgroundColor: '#F1F3F4',
    color: 'black',
    // maxWidth: '4.55vh',
    maxWidth: '2.7vh',
    maxHeight: '23px',
    // minWidth: '4.55vh',
    minWidth: '2.7vh',
    minHeight: '23px',
  };

  const [value, setValue] = React.useState('0');

  const PointsXt21 = () => {
    return <h1 className="burger-paradise">Страница XT:2:1</h1>;
  };

  const Stat1114 = () => {
    return (
      <Box sx={{ height: 24 }}>
        <TabContext value={value}>
          <Box>
            <Stack direction="row">
              <Grid container>
                <Grid item xs={0.75} sx={styleSt03}>
                  <Button
                    size="small"
                    sx={styleBatton}
                    variant="contained"
                    onClick={() => setValue('1')}>
                    <b>1 </b>
                  </Button>
                </Grid>
                <Grid item xs={0.75} sx={styleSt03}>
                  <Button
                    size="small"
                    sx={styleBatton}
                    variant="contained"
                    onClick={() => setValue('2')}>
                    <b>2 </b>
                  </Button>
                </Grid>
                <Grid item xs={0.75} sx={styleSt03}>
                  <Button
                    size="small"
                    sx={styleBatton}
                    variant="contained"
                    onClick={() => setValue('3')}>
                    <b>3 </b>
                  </Button>
                </Grid>
                <Grid item xs={0.75} sx={styleSt03}>
                  <Button
                    size="small"
                    sx={styleBatton}
                    variant="contained"
                    onClick={() => setValue('1')}>
                    <b>4 </b>
                  </Button>
                </Grid>
                <Grid item xs={0.75} sx={styleSt03}>
                  <Button
                    size="small"
                    sx={styleBatton}
                    variant="contained"
                    onClick={() => setValue('2')}>
                    <b>5 </b>
                  </Button>
                </Grid>
                <Grid item xs={0.75} sx={styleSt03}>
                  <Button
                    size="small"
                    sx={styleBatton}
                    variant="contained"
                    onClick={() => setValue('3')}>
                    <b>6 </b>
                  </Button>
                </Grid>
                <Grid item xs={0.75} sx={styleSt03}>
                  <Button
                    size="small"
                    sx={styleBatton}
                    variant="contained"
                    onClick={() => setValue('1')}>
                    <b>7 </b>
                  </Button>
                </Grid>
                <Grid item xs={0.75} sx={styleSt03}>
                  <Button
                    size="small"
                    sx={styleBatton}
                    variant="contained"
                    onClick={() => setValue('2')}>
                    <b>8 </b>
                  </Button>
                </Grid>
                <Grid item xs={0.75} sx={styleSt03}>
                  <Button
                    size="small"
                    sx={styleBatton}
                    variant="contained"
                    onClick={() => setValue('3')}>
                    <b>9 </b>
                  </Button>
                </Grid>
                <Grid item xs={0.75} sx={styleSt03}>
                  <Button
                    size="small"
                    sx={styleBatton}
                    variant="contained"
                    onClick={() => setValue('1')}>
                    <b>10 </b>
                  </Button>
                </Grid>
                <Grid item xs={0.75} sx={styleSt03}>
                  <Button
                    size="small"
                    sx={styleBatton}
                    variant="contained"
                    onClick={() => setValue('2')}>
                    <b>11 </b>
                  </Button>
                </Grid>
                <Grid item xs={0.75} sx={styleSt03}>
                  <Button
                    size="small"
                    sx={styleBatton}
                    variant="contained"
                    onClick={() => setValue('3')}>
                    <b>12 </b>
                  </Button>
                </Grid>
                <Grid item xs={0.75} sx={styleSt03}>
                  <Button
                    size="small"
                    sx={styleBatton}
                    variant="contained"
                    onClick={() => setValue('3')}>
                    <b>13 </b>
                  </Button>
                </Grid>
                <Grid item xs={0.75} sx={styleSt03}>
                  <Button
                    size="small"
                    sx={styleBatton}
                    variant="contained"
                    onClick={() => setValue('14')}>
                    <b>14 </b>
                  </Button>
                </Grid>
                <Grid item xs={0.75} sx={styleSt03}>
                  <Button
                    size="small"
                    sx={styleBatton}
                    variant="contained"
                    onClick={() => setValue('15')}>
                    <b>15 </b>
                  </Button>
                </Grid>
                <Grid item xs={0.75} sx={styleSt03}>
                  <Button
                    size="small"
                    sx={styleBatton}
                    variant="contained"
                    onClick={() => setValue('16')}>
                    <b>16 </b>
                  </Button>
                </Grid>
              </Grid>
            </Stack>
          </Box>

          <TabPanel value="1">
            <PointsXt21 />
          </TabPanel>
          <TabPanel value="2"></TabPanel>
        </TabContext>
      </Box>
    );
  };

  return (
    <Grid container item sx={{ height: 24 }}>
      <Grid container sx={{ border: 0, marginRight: 0.7 }}>
        <Grid item xs={0.6} sx={styleSt03}></Grid>
        <Grid item xs={4.8} sx={{ border: 0 }}>
          <Stat1114 />
        </Grid>
        <Grid item xs={3.3} sx={styleSt03}>
          <b>Качество</b>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Statistic1114;

