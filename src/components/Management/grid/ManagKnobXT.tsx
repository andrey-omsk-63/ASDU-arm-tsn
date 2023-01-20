import React from "react";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import ManagKnobError from "./ManagKnobError";

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
let nomDispatch = "Вкл";
let dataKnob: Knob[] = [
  {
    cmd: 13,
    param: 99,
    region: "",
    area: "",
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
  const [openSoobErr, setOpenSoobErr] = React.useState(false);
  const [beginWork, setBeginWork] = React.useState(true);
  const [trigger, setTrigger] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    const handleSendOpen = () => {
      if (props.ws !== null) {
        if (props.ws.readyState === WebSocket.OPEN) {
          props.ws.send(
            JSON.stringify({ type: "stopDevices", region: props.region })
          );
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
    const handleSendOpen = () => {
      if (props.ws !== null) {
        if (props.ws.readyState === WebSocket.OPEN) {
          props.ws.send(
            JSON.stringify({ type: "getDevices", region: props.region })
          );
        } else {
          setTimeout(() => {
            handleSendOpen();
          }, 1000);
        }
      }
    };

    setOpen(false);
    setValue(21);
    handleSendOpen();
    otpravka = true;
    soobDispatch = "";
    nomDispatch = "Вкл";
    props.setDataKn(dataKnob);
    setTrigger(false);
    setBeginWork(true);
  };

  const stylePK = {
    textAlign: "center",
    position: "absolute",
    top: "22.8%",
    left: "33%",
    transform: "translate(-50%, -50%)",
    width: 164,
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderColor: "primary.main",
    borderRadius: 2,
    boxShadow: 24,
    p: 2,
  };

  const styleBatton = {
    fontSize: 10,
    //backgroundColor: '#F1F3F4',
    backgroundColor: "#E9F5D8",
    color: "black",
  };

  const styleSoob = {
    fontSize: 12,
    backgroundColor: "#F1F3F4",
    color: "black",
    textAlign: "center",
  };

  const styleSoobPusto = {
    backgroundColor: "#F1F3F4",
    color: "#F1F3F4",
  };

  const styleBatMenu = {
    fontSize: 12.9,
    textAlign: "center",
    backgroundColor: "#E9F5D8",
    color: "black",
    marginTop: 1,
    width: "121px",
    textTransform: "unset !important",
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
                  cmd: 13,
                  param: value,
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
      if (value === 0) nomDispatch = "Отключить исполнение";
      if (value === 1) nomDispatch = "Включить исполнение";
      if (value === 2) nomDispatch = "Отключить расчёт";
      if (value === 3) nomDispatch = "Включить расчёт";
      otpravka = false;
    } else {
      soobDispatch = "";
      nomDispatch = "Вкл";
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

  const SetValue = (mode: number) => {
    setValue(mode);
    setTrigger(true);
  };

  const ButtMenu = (soob: string, mode: number) => {
    return (
      <Button
        sx={styleBatMenu}
        variant="contained"
        onClick={() => SetValue(mode)}
      >
        {soob}
      </Button>
    );
  };

  // const BoxMenu = (soob: string) => {
  //   return (
  //     <>
  //       <Box>
  //         <b>{soob}</b>
  //       </Box>
  //       <br />
  //     </>
  //   );
  // };

  if (props.areaa === "0" && !props.subArea && beginWork) {
    setOpenSoobErr(true);
    setBeginWork(false);
  }

  return (
    <>
      <Button
        size="small"
        sx={styleBatton}
        variant="contained"
        onClick={handleOpen}
      >
        XT
      </Button>
      <Modal open={open} hideBackdrop>
        <Box sx={stylePK}>
          {openSoobErr && <ManagKnobError setOpen={setOpenSoobErr} />}
          {!trigger && (
            <>
              {ButtMenu("Включить исполнение", 1)}
              {ButtMenu("Отключить исполнение", 0)}
              {ButtMenu("Включить расчёт", 3)}
              {ButtMenu("Отключить расчёт", 2)}
            </>
          )}
          {/* {trigger && (
            <>
              {BoxMenu("Включить исполнение")}
              {BoxMenu("Отключить исполнение")}
              {BoxMenu("Включить расчёт")}
              {BoxMenu("Отключить расчёт")}
            </>
          )} */}
          <Button sx={styleBatMenu} variant="contained" onClick={handleClose}>
            Выход
          </Button>
          {trigger && <>{ButtonDo()}</>}
        </Box>
      </Modal>
    </>
  );
};

export default ManagementKnobXT;
