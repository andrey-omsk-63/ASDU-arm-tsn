import React from "react";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import ManagKnobError from "./ManagKnobError";

import { stylePK, styleSoob } from "./ManagGridStyle";
import { styleSoobPusto, styleBatMenu } from "./ManagGridStyle";

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
let soobDispatch = "";
let nomDispatch = "Авт";
let dataKnob: Knob[] = [
  {
    cmd: 6,
    param: 99,
    region: "",
    area: "",
    subarea: 0,
  },
];

const ManagementKnobSK = (props: {
  open: boolean;
  ws: WebSocket;
  region: string;
  areaa: string;
  subArea: number;
  setDataKn: Function;
}) => {
  const [value, setValue] = React.useState(21);
  const [open, setOpen] = React.useState(false);
  const [openSoobErr, setOpenSoobErr] = React.useState(false);
  const [beginWork, setBeginWork] = React.useState(true);

  const handleOpen = () => {
    setOpen(true);
    const handleSendOpen = () => {
      if (props.ws !== null) {
        if (props.ws.readyState === WebSocket.OPEN) {
          props.ws.send(
            JSON.stringify({ type: "stopDevices", region: props.region })
          );
        } else {
          setTimeout(() => {
            handleSendOpen();
          }, 1000);
        }
      }
    };
    handleSendOpen();
    otpravka = true;
  };

  const handleClose = () => {
    setOpen(false);
    setValue(21);
    const handleSendOpen = () => {
      if (props.ws !== null) {
        if (props.ws.readyState === WebSocket.OPEN) {
          props.ws.send(
            JSON.stringify({ type: "getDevices", region: props.region })
          );
          otpravka = true;
          soobDispatch = "";
          nomDispatch = "Авт";
        } else {
          setTimeout(() => {
            handleSendOpen();
          }, 1000);
        }
      }
    };
    handleSendOpen();
    props.setDataKn(dataKnob);
    setBeginWork(true);
  };

  const ButtonKnob = (val: number) => {
    let valumeKnob: string = "Авт";
    if (val !== 0) valumeKnob = val.toString();

    return (
      <Box sx={{ textAlign: "center" }}>
        <Button
          sx={styleBatMenu}
          variant="contained"
          onClick={() => setValue(val)}
        >
          {valumeKnob}
        </Button>
      </Box>
    );
  };

  const ButtonDo = () => {
    if (value !== 21 && otpravka) {
      const handleSendOpen = () => {
        if (props.ws !== null) {
          if (props.ws.readyState === WebSocket.OPEN) {
            props.ws.send(
              JSON.stringify({
                type: "dispatch",
                data: {
                  cmd: 6,
                  param: value,
                  region: props.region,
                  area: props.areaa,
                  subarea: props.subArea,
                },
              })
            );
            //отключение ХТ
            props.ws.send(
              JSON.stringify({
                type: "dispatch",
                data: {
                  cmd: 13,
                  param: 0,
                  region: props.region,
                  area: props.areaa,
                  subarea: props.subArea,
                },
              })
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
      soobDispatch = "Отправлено";
      if (value !== 0) {
        nomDispatch = "СК " + value;
      } else {
        nomDispatch = "Авт";
      }
      otpravka = false;
    }

    return (
      <>
        {soobDispatch === "Отправлено" && (
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

  const ButtonKnop = () => {
    const styleBatton = {
      fontSize: 11,
      height: "3.5vh",
      backgroundColor: open ? "#93D145" : "#E9F5D8",
      color: "black",
      marginRight: 1,
    };

    return (
      <Button sx={styleBatton} variant="contained" onClick={handleOpen}>
        <b>СК</b>
      </Button>
    );
  };

  if (props.areaa === "0" && !props.subArea && beginWork) {
    setOpenSoobErr(true);
    setBeginWork(false);
  }

  return (
    <>
      {ButtonKnop()}
      <Modal open={open} hideBackdrop>
        <Box sx={stylePK}>
          {openSoobErr && <ManagKnobError setOpen={setOpenSoobErr} />}
          {value === 21 && (
            <>
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
            </>
          )}
          <Box sx={{ textAlign: "center" }}>
            <Button sx={styleBatMenu} variant="contained" onClick={handleClose}>
              Выход
            </Button>
          </Box>
          {ButtonDo()}
        </Box>
      </Modal>
    </>
  );
};

export default ManagementKnobSK;
