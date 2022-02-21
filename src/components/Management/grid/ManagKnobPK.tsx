import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const ManagementKnobPK = (props: { ws: WebSocket; }) => {

  const [value, setValue] = React.useState(21);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    const handleSendOpen = () => {
      if (props.ws !== null) {
        if (props.ws.readyState === WebSocket.OPEN) {
          props.ws.send(JSON.stringify({ type: 'stopDevices', region: '1' }));
        } else {
          setTimeout(() => {
            handleSendOpen();
          }, 1000);
        }
      }
    };
    handleSendOpen();
  }

  const handleClose = () => {
    setOpen(false);
    setValue(0)
    const handleSendOpen = () => {
      if (props.ws !== null) {
        if (props.ws.readyState === WebSocket.OPEN) {
          props.ws.send(JSON.stringify({ type: 'getDevices', region: '1' }));
        } else {
          setTimeout(() => {
            handleSendOpen();
          }, 1000);
        }
      }
    };
    handleSendOpen();
  }

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
  };

  const styleBatMenu = {
    fontSize: 12.9,
    backgroundColor: '#F1F3F4',
    color: 'black',
  };

  const ButtonKnob = (val: number) => {
    return (
      <Button sx={styleBatMenu} variant="contained" onClick={() => setValue(val)}>
        {val}
      </Button>
    )
  }

  const ButtonDo = () => {
    //console.log('Value ПК:', value)
  }

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
          <Stack direction="column">
            {ButtonKnob(0)}
            {ButtonKnob(1)}
            {ButtonKnob(2)}
            {ButtonKnob(3)}
            {ButtonKnob(4)}
            {ButtonKnob(5)}
            {ButtonKnob(6)}
            {ButtonKnob(7)}
            {ButtonKnob(8)}
            {ButtonKnob(9)}
            {ButtonKnob(10)}
            {ButtonKnob(11)}
            {ButtonKnob(12)}
            <Button sx={styleBatMenu} variant="contained" onClick={handleClose}>
              Отмена
            </Button>
            {ButtonDo()}
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default ManagementKnobPK;
