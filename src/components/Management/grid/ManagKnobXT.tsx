import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export interface DataKnob {
  knop: Knob[];
}

export interface Knob {
  cmd: number;
  param: number;
  region: string;
  area: string;
  subarea: number;
}

let otpravka = true;
let soobDispatch = '';
let nomDispatch = 'Вкл';
let dataKnob: Knob[] = [
  {
    cmd: 13,
    param: 99,
    region: '',
    area: '',
    subarea: 0,
  },
];

const ManagementKnobXT = (props: {
  open: boolean;
  ws: WebSocket;
  region: string;
  areaa: string;
  subArea: number;
  setDataKn: Function;
}) => {
  const [value, setValue] = React.useState(21);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    const handleSendOpen = () => {
      if (props.ws !== null) {
        if (props.ws.readyState === WebSocket.OPEN) {
          props.ws.send(JSON.stringify({ type: 'stopDevices', region: props.region }));
          otpravka = true;
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
    setValue(21);
    const handleSendOpen = () => {
      if (props.ws !== null) {
        if (props.ws.readyState === WebSocket.OPEN) {
          props.ws.send(JSON.stringify({ type: 'getDevices', region: props.region }));
          otpravka = false;
          soobDispatch = '';
          nomDispatch = 'Вкл';
        } else {
          setTimeout(() => {
            handleSendOpen();
          }, 1000);
        }
      }
    };
    handleSendOpen();
    props.setDataKn(dataKnob);
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
    p: 2,
  };

  const styleBatton = {
    fontSize: 10,
    backgroundColor: '#F1F3F4',
    color: 'black',
  };

  const styleSoob = {
    fontSize: 12,
    backgroundColor: '#F1F3F4',
    color: '#5B1080',
    textAlign: 'center',
  };

  const styleSoobPusto = {
    backgroundColor: '#F1F3F4',
    color: '#F1F3F4',
  };

  const styleBatMenu = {
    fontSize: 12.9,
    backgroundColor: '#F1F3F4',
    color: 'black',
    marginTop: 1,
    textTransform: 'unset !important',
  };

  const ButtonDo = () => {
    if (value !== 21 && otpravka) {
      const handleSendOpen = () => {
        if (props.ws !== null) {
          if (props.ws.readyState === WebSocket.OPEN) {
            props.ws.send(
              JSON.stringify({
                type: 'dispatch',
                data: {
                  cmd: 13,
                  param: value,
                  region: props.region,
                  area: props.areaa,
                  subarea: props.subArea,
                },
              }),
            );
          } else {
            setTimeout(() => {
              handleSendOpen();
            }, 1000);
          }
          dataKnob[0].param = value;
          dataKnob[0].region = props.region;
          dataKnob[0].area = props.areaa;
          dataKnob[0].subarea = props.subArea;
        }
      };

      handleSendOpen();
      soobDispatch = 'Отправлено';
      if (value === 0) nomDispatch = 'Откл';
      otpravka = false;
    } else {
      soobDispatch = '';
      nomDispatch = 'Вкл';
    }

    return (
      <>
        {soobDispatch === 'Отправлено' && (
          <>
            <Box sx={styleSoobPusto}>Pusto</Box>
            <Box sx={styleSoob}>
              <b>{soobDispatch}</b>
            </Box>
            <Box sx={styleSoob}>
              <b>{nomDispatch}</b>
            </Box>
            <Box sx={styleSoobPusto}>Pusto</Box>
          </>
        )}
      </>
    );
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
          <Stack direction="column">
            <Button sx={styleBatMenu} variant="contained" onClick={() => setValue(0)}>
              Отключить
            </Button>
            <Button sx={styleBatMenu} variant="contained" onClick={() => setValue(1)}>
              Включить
            </Button>
            <Button sx={styleBatMenu} variant="contained" onClick={handleClose}>
              Выход
            </Button>
            {ButtonDo()}
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default ManagementKnobXT;
