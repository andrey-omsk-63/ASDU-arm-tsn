import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const ModalRestart = () => {
  const [openRes, setOpenRes] = React.useState(false);
  const handleOpenRes = () => setOpenRes(true);
  const handleCloseRes = () => setOpenRes(false);

  const styleRes = {
    position: 'absolute',
    top: '28%',
    right: '15.5%',
    transform: 'translate(-50%, -50%)',
    width: 250,
    bgcolor: 'background.paper',
    border: '3px solid #000',
    borderRadius: 2,
    textAlign: 'center',
    p: 4,
  };

  return (
    <Box>
      <Button
        color="inherit"
        sx={{ width: 180, marginTop: 1 }}
        variant="contained"
        onClick={handleOpenRes}>
        Перезапуск ХТ
      </Button>
      <Modal
        open={openRes}
        onClose={handleCloseRes}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={styleRes}>
          <h3>Выполнить перезапуск?</h3>
          <Stack sx={{ marginLeft: 5.5 }} direction="row" spacing={4}>
            <Button
              sx={{ backgroundColor: '#F1F3F4', color: 'black' }}
              variant="contained"
              onClick={handleCloseRes}>
              Да
            </Button>

            <Button
              sx={{ backgroundColor: '#F1F3F4', color: 'black' }}
              variant="contained"
              onClick={handleCloseRes}>
              Нет
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
};

export default ModalRestart;
