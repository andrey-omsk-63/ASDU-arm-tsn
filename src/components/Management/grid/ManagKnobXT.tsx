import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const ManagementKnobXT = (props: {
  open: boolean;
  ws: WebSocket;
  region: string;
  areaa: string;
  subArea: number;
}) => {
  const [value, setValue] = React.useState(21);
  const [open, setOpen] = React.useState(false);
  let soob_dispatch = '.';

  const handleOpen = () => {
    setOpen(true);
    const handleSendOpen = () => {
      if (props.ws !== null) {
        if (props.ws.readyState === WebSocket.OPEN) {
          props.ws.send(JSON.stringify({ type: 'stopDevices', region: props.region }));
        } else {
          setTimeout(() => {
            handleSendOpen();
          }, 1000);
        }
      }
    };
    handleSendOpen();
  };

  const handleClose = () => {
    setOpen(false);
    //setValue(0)
    const handleSendOpen = () => {
      if (props.ws !== null) {
        if (props.ws.readyState === WebSocket.OPEN) {
          props.ws.send(JSON.stringify({ type: 'getDevices', region: props.region }));
        } else {
          setTimeout(() => {
            handleSendOpen();
          }, 1000);
        }
      }
    };
    handleSendOpen();
  };

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
  };

  const styleSoob = {
    fontSize: 10,
    backgroundColor: '#F1F3F4',
    color: 'blue',
    textAlign: 'center',
  };

  const styleBatMenu = {
    fontSize: 12.9,
    backgroundColor: '#F1F3F4',
    color: 'black',
    marginTop: 1,
  };

  const ButtonDo = () => {
    if (value !== 21) {
      const handleSendOpen = () => {
        if (props.ws !== null) {
          if (props.ws.readyState === WebSocket.OPEN) {
            props.ws.send(
              JSON.stringify({
                type: 'dispatch',
                cmd: 13,
                param: value,
                region: props.region,
                area: props.areaa,
                subarea: props.subArea,
              }),
            );
          } else {
            setTimeout(() => {
              handleSendOpen();
            }, 1000);
          }
        }
      };

      handleSendOpen();
      //console.log('запрос отправлен');
      soob_dispatch = 'Отправлено';
    }

    return <Box sx={styleSoob}>{soob_dispatch}</Box>;
  };

  return (
    <div>
      <Button size="small" sx={styleBatton} variant="contained" onClick={handleOpen}>
        XT
      </Button>
      <Modal
        open={open}
        // disableEnforceFocus
        // onClose={handleCloseSet}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={stylePK}>
          <Stack direction="column">
            <Button sx={styleBatMenu} variant="contained" onClick={() => setValue(1)}>
              Включить
            </Button>
            <Button sx={styleBatMenu} variant="contained" onClick={() => setValue(2)}>
              Отключить
            </Button>
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

export default ManagementKnobXT;
