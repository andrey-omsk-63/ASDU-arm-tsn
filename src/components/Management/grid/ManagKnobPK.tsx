import React from "react";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import ManagKnobError from "./ManagKnobError";

import { SendStopDevices } from "../../../AppServiceFunctions";

import { debug, WS } from "../../../App";

import { stylePK, styleSoob, styleModalEnd } from "./ManagGridStyle";
import { styleSoobPusto, styleBatMenu } from "./ManagGridStyle";
import { styleBatKnop01, styleBatKnop02 } from "./ManagGridStyle";

import { colorCuan, colorSky } from "./ManagGridStyle"; // назначено ПК

import { massKnop } from "./ManagLeftGrid";

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
    cmd: 5,
    param: 99,
    region: "",
    area: "",
    subarea: 0,
  },
];

const ManagementKnobPK = (props: {
  open: boolean;
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
    SendStopDevices(props.region);
    otpravka = true;
  };

  const handleClose = (mode: number) => {
    setOpen(false);
    setValue(21);
    const handleSendOpen = () => {
      if (WS !== null) {
        if (WS.readyState === WebSocket.OPEN) {
          WS.send(JSON.stringify({ type: "getDevices", region: props.region }));
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
    if (!debug) handleSendOpen();
    props.setDataKn(dataKnob, mode);
    setBeginWork(true);
  };

  const ButtonKnob = (val: number) => {
    let valumeKnob: string = "Авт";
    if (val !== 0) valumeKnob = val.toString();
    return (
      <Box sx={{ textAlign: "center" }}>
        <Button sx={styleBatMenu} onClick={() => setValue(val)}>
          {valumeKnob}
        </Button>
      </Box>
    );
  };

  const ButtonDo = () => {
    if (value !== 21 && otpravka) {
      const handleSendOpen = () => {
        if (WS !== null) {
          if (WS.readyState === WebSocket.OPEN) {
            console.log("Отпр: dispatch из ПК", 5, value);

            WS.send(
              JSON.stringify({
                type: "dispatch",
                data: {
                  cmd: 5,
                  param: value,
                  region: props.region,
                  area: props.areaa,
                  subarea: props.subArea,
                },
              })
            );
            //отключение ХТ
            WS.send(
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
        }
      };

      if (!debug) handleSendOpen();

      dataKnob[0].param = value;
      dataKnob[0].region = props.region;
      dataKnob[0].area = props.areaa;
      dataKnob[0].subarea = props.subArea;

      soobDispatch = "Отправлено";
      if (value !== 0) {
        nomDispatch = "ПК " + value;
      } else nomDispatch = "Авт";
      otpravka = false;

      //console.log("3ButtonDo:", dataKnob, soobDispatch);
      if (!debug) handleClose(0); // выход без подтверждения
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
    let coler = colorCuan;
    for (let j = 0; j < massKnop.length; j++) {
      if (
        massKnop[j].area === props.areaa &&
        massKnop[j].subarea === props.subArea &&
        massKnop[j].cmd === 5 // ПК
      )
        coler = colorSky;
    }

    let illum = !open ? styleBatKnop01(coler) : styleBatKnop02(colorSky);
    return (
      <Button sx={illum} onClick={handleOpen}>
        <b>ПК</b>
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
      <Modal open={open} hideBackdrop={false}>
        <Box sx={stylePK}>
          <Button sx={styleModalEnd} onClick={() => handleClose(1)}>
            <b>&#10006;</b>
          </Button>
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
            <Button sx={styleBatMenu} onClick={() => handleClose(0)}>
              Выход
            </Button>
          </Box>
          {ButtonDo()}
        </Box>
      </Modal>
    </>
  );
};

export default ManagementKnobPK;
