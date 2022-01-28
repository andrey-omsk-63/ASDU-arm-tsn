import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TabPanel from '@mui/lab/TabPanel';

const ManagementKnobPK = () => {
  const [value, setValue] = React.useState('0');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const stylePK = {
    position: 'absolute',
    top: '46%',
    left: '29.3%',
    transform: 'translate(-50%, -50%)',
    width: 64,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 1,
  };

  const styleBatton = {
    fontSize: 10,
    backgroundColor: '#F1F3F4',
    color: 'black',
    marginRight: 1,
    //   position: 'absolute',
    //   top: '9.4%',
    //left: '26.5%',
  };

  return (
    <div>
      <Button size="small" sx={styleBatton} variant="contained" onClick={handleOpen}>
        ПК
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={stylePK}>
          <TabContext value={value}>
            <Stack direction="column">
              <Button color="inherit" variant="contained" onClick={() => setValue('1')}>
                1
              </Button>
              <Button color="inherit" variant="contained" onClick={() => setValue('2')}>
                2
              </Button>
              <Button color="inherit" variant="contained" onClick={() => setValue('3')}>
                3
              </Button>
              <Button color="inherit" variant="contained" onClick={() => setValue('4')}>
                4
              </Button>
              <Button color="inherit" variant="contained" onClick={() => setValue('5')}>
                5
              </Button>
              <Button color="inherit" variant="contained" onClick={() => setValue('6')}>
                6
              </Button>
              <Button color="inherit" variant="contained" onClick={() => setValue('7')}>
                7
              </Button>
              <Button color="inherit" variant="contained" onClick={() => setValue('8')}>
                8
              </Button>
              <Button color="inherit" variant="contained" onClick={() => setValue('9')}>
                9
              </Button>
              <Button color="inherit" variant="contained" onClick={() => setValue('10')}>
                10
              </Button>
              <Button color="inherit" variant="contained" onClick={() => setValue('11')}>
                11
              </Button>
              <Button color="inherit" variant="contained" onClick={() => setValue('12')}>
                12
              </Button>

              <Button
                color="inherit"
                sx={{ marginTop: 1 }}
                variant="contained"
                onClick={handleClose}>
                Вых
              </Button>
            </Stack>

            <TabPanel value="1" sx={{ marginBottom: -6 }}></TabPanel>
            <TabPanel value="2" sx={{ marginBottom: -6 }}></TabPanel>
            <TabPanel value="3" sx={{ marginBottom: -6 }}></TabPanel>
            <TabPanel value="4" sx={{ marginBottom: -6 }}></TabPanel>
            <TabPanel value="5" sx={{ marginBottom: -6 }}></TabPanel>
            <TabPanel value="6" sx={{ marginBottom: -6 }}></TabPanel>
            <TabPanel value="7" sx={{ marginBottom: -6 }}></TabPanel>
            <TabPanel value="8" sx={{ marginBottom: -6 }}></TabPanel>
            <TabPanel value="9" sx={{ marginBottom: -6 }}></TabPanel>
            <TabPanel value="10" sx={{ marginBottom: -6 }}></TabPanel>
            <TabPanel value="11" sx={{ marginBottom: -6 }}></TabPanel>
            <TabPanel value="12" sx={{ marginBottom: -6 }}></TabPanel>
          </TabContext>
        </Box>
      </Modal>
    </div>
  );
};
// }
export default ManagementKnobPK;
