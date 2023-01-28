import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

const EndSeans = (props: { bsLogin: string; setOpen: any }) => {
  const [openSet, setOpenSet] = React.useState(true);
  let soob = 'В Арм-е Технолога системы работает пользователь ' + props.bsLogin;

  const styleSetInf = {
    outline: 'none',
    position: 'absolute',
    left: '45%',
    top: '46%',
    transform: 'translate(-50%, -50%)',
    width: 380,
    bgcolor: 'background.paper',
    border: '3px solid #000',
    borderColor: 'red',
    borderRadius: 2,
    boxShadow: 24,
    p: 1.5,
  };

  const styleBatMenu = {
    fontSize: 14,
    backgroundColor: '#E9F5D8',
    color: 'red',
    marginTop: 1,
    marginRight: 1,
    textTransform: 'unset !important',
  };

  const handleClose = (mode: number) => {
    if (!mode) window.close();
    props.setOpen(false);
    setOpenSet(false);
  };

  return (
    <Modal open={openSet} onClose={handleClose} hideBackdrop>
      <Box sx={styleSetInf}>
        <Typography variant="h6" sx={{ textAlign: 'center', color: 'red' }}>
          {soob}
        </Typography>
        <Box sx={{ textAlign: 'center' }}>
          <Button sx={styleBatMenu} variant="contained" onClick={() => handleClose(1)}>
            <b>Переход в «Статистику»</b>
          </Button>
          <Button sx={styleBatMenu} variant="contained" onClick={() => handleClose(0)}>
            <b>Выход</b>
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EndSeans;
