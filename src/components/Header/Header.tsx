import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import ModalSetting from './modal/ModalSetting';
import ModalRestart from './modal/ModalRestart';

const Header = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const styleComand = {
    position: 'absolute',
    top: '15%',
    right: '3%',
    transform: 'translate(-50%, -50%)',
    width: 180,
    border: '3px solid #000',
    borderRadius: 2,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
  };

  const ModalComand = () => {
    return (
      <div>
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={styleComand}>
            <Stack direction="column">
              <ModalSetting />
              <ModalRestart />
              <Button
                color="inherit"
                sx={{ marginTop: 1 }}
                variant="contained"
                onClick={handleClose}>
                Выход
              </Button>
            </Stack>
          </Box>
        </Modal>
      </div>
    );
  };

  return (
    // <Box sx={{ border: 0, marginLeft: '55vh' }}>
    <Box sx={{ border: 0, marginLeft: '36vh' }}>
      <Button
        onClick={handleOpen}
        size="small"
        sx={{
          fontSize: 12,
          maxHeight: '21px',
          minHeight: '21px',
          backgroundColor: '#FFE295',
          color: 'black',
        }}
        variant="contained">
        <b>Команды</b>
      </Button>
      <ModalComand />
    </Box>
  );
};

export default Header;
