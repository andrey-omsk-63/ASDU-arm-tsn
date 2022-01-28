import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TabPanel from '@mui/lab/TabPanel';

const ManagementKnobXT = () => {
  const [value, setValue] = React.useState('0');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const stylePK = {
    position: 'absolute',
    top: '22.8%',
    left: '47.7%',
    transform: 'translate(-50%, -50%)',
    width: 164,
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
    // position: 'absolute',
    // top: '9.4%',
    // left: '41.4%',
  };

  return (
    <div>
      <Button size="small" sx={styleBatton} variant="contained" onClick={handleOpen}>
        XT
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={stylePK}>
          <TabContext value={value}>
            <Stack direction="column">
              <Button color="inherit" variant="contained" onClick={() => setValue('1')}>
                Включить
              </Button>
              <Button
                color="inherit"
                sx={{ marginTop: 1 }}
                variant="contained"
                onClick={() => setValue('2')}>
                Отключить
              </Button>

              <Button
                color="inherit"
                sx={{ marginTop: 1 }}
                variant="contained"
                onClick={handleClose}>
                Выход
              </Button>
            </Stack>

            <TabPanel value="1" sx={{ marginBottom: -6 }}></TabPanel>
            <TabPanel value="2" sx={{ marginBottom: -6 }}></TabPanel>
          </TabContext>
        </Box>
      </Modal>
    </div>
  );
};

export default ManagementKnobXT;
