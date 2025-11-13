import React from "react";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import ManagKnobError from "./ManagKnobError";
import ManagKnobXTEmpty from "./ManagKnobXTEmpty";

import { SendStopDevices } from "../../../AppServiceFunctions";

import { debug, WS } from "../../../App";

import { styleSoobPusto, styleSoob, styleModalEnd } from "./ManagGridStyle";
import { stylePKXt, styleBatMenuXt, styleMenuXt } from "./ManagGridStyle";
import { styleBatKnop01, styleBatKnop02, styleXtSoob } from "./ManagGridStyle";

import { colorApricot, colorBronze } from "./ManagGridStyle"; // назначено XT

import { masXT } from "./ManagLeftGrid";

//import { Tflight } from "../../../interfaceMNG.d";

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

let soobEmpty = "";
let releaseXT = false;
let switchXT = false;

const ManagementKnobXT = (props: {
  open: boolean;
  region: string;
  areaa: string;
  subArea: number;
  setDataKn: Function;
  masxt: any;
}) => {
  const [value, setValue] = React.useState(21);
  const [open, setOpen] = React.useState(false);
  const [openSoobErr, setOpenSoobErr] = React.useState(false);
  const [openEmpty, setOpenEmpty] = React.useState(false);
  const [beginWork, setBeginWork] = React.useState(true);
  const [trigger, setTrigger] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    SendStopDevices(props.region);
    otpravka = true;
  };

  const handleClose = (mode: number) => {
    const handleSendOpen = () => {
      if (WS !== null) {
        if (WS.readyState === WebSocket.OPEN) {
          WS.send(JSON.stringify({ type: "getDevices", region: props.region }));
        } else {
          setTimeout(() => {
            handleSendOpen();
          }, 1000);
        }
      }
    };

    setOpen(false);
    setValue(21);
    if (!debug) handleSendOpen();
    otpravka = true;
    soobDispatch = "";
    nomDispatch = "Вкл";
    props.setDataKn(dataKnob, mode);
    setTrigger(false);
    setBeginWork(true);
  };

  const ButtonDo = () => {
    console.log("ButtonDo:", value, otpravka);

    if (value !== 21 && otpravka) {
      const handleSendOpen = () => {
        if (WS !== null) {
          if (WS.readyState === WebSocket.OPEN) {
            console.log("Отпр: dispatch из XT", 13, value);
            WS.send(
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
            if (!value) {
              console.log("Отпр: dispatch из XT", 5, 0);
              // включение PK - авт
              WS.send(
                JSON.stringify({
                  type: "dispatch",
                  data: {
                    cmd: 5,
                    param: 0,
                    region: props.region,
                    area: props.areaa,
                    subarea: props.subArea,
                  },
                })
              );
            }
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
      if (value === 0) nomDispatch = "Отключить исполнение";
      if (value === 1) nomDispatch = "Включить исполнение";
      if (value === 2) nomDispatch = "Отключить расчёт";
      if (value === 3) nomDispatch = "Включить расчёт";
      otpravka = false;

      if (!debug) handleClose(0); // выход без подтверждения
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

  const ButtMenu = (soob: string, tip: boolean, mode: number) => {
    let masSoob = soob.split(" ", 2);
    return (
      <>
        {props.subArea && !tip ? (
          <Box sx={styleMenuXt}>
            <Box sx={styleXtSoob}>{masSoob[0]}</Box>
            <Box sx={{ textShadow: "1px 1px 2px rgba(0,0,0,0.3)" }}>
              {masSoob[1]}
            </Box>
          </Box>
        ) : (
          <Button sx={styleBatMenuXt} onClick={() => SetValue(mode)}>
            {soob}
          </Button>
        )}
      </>
    );
  };

  const ButtonKnop = () => {
    let coler = colorApricot;

    for (let j = 0; j < masXT.length; j++) {
      if (
        masXT[j].areaXT === Number(props.areaa) &&
        masXT[j].subareaXT === props.subArea &&
        masXT[j].releaseXT // XT
      )
        coler = colorBronze;
    }

    let illum = !open ? styleBatKnop01(coler) : styleBatKnop02(colorBronze);

    return (
      <Button sx={illum} onClick={handleOpen}>
        <b>XT</b>
      </Button>
    );
  };

  const SetOpenEmpty = () => {
    setOpenEmpty(false);
    setOpen(false);
    setBeginWork(true);
  };
  //== Начало работы =======================================
  if (props.areaa === "0" && !props.subArea && beginWork) {
    // выбран весь регион
    setOpenSoobErr(true);
    setBeginWork(false);
  } else {
    let have = false;
    if (props.areaa !== "0" && !props.subArea && beginWork) {
      // выбран весь район
      for (let j = 0; j < props.masxt.length; j++)
        if (Number(props.areaa) === props.masxt[j].areaXT) have = true;
      if (!have) {
        soobEmpty = "В выбранном районе ХТ отсутствуют";
        setOpenEmpty(true);
      }
      setBeginWork(false);
    } else {
      // выбран beginWork - конкретный подрайон
      if (beginWork) {
        for (let j = 0; j < props.masxt.length; j++) {
          if (
            Number(props.areaa) === props.masxt[j].areaXT &&
            props.subArea === props.masxt[j].subareaXT
          ) {
            have = true;
            releaseXT = props.masxt[j].releaseXT;
            switchXT = props.masxt[j].switchXT;
          }
        }
        if (!have) {
          soobEmpty = "Для данного подрайона проект ХТ не загружен";
          setOpenEmpty(true);
        }
        setBeginWork(false);
      }
    }
  }
  //========================================================
  return (
    <>
      {ButtonKnop()}
      <Modal open={open} hideBackdrop={false}>
        <>
          {openEmpty ? (
            <ManagKnobXTEmpty soob={soobEmpty} setOpen={SetOpenEmpty} />
          ) : (
            <Box sx={stylePKXt}>
              <Button sx={styleModalEnd} onClick={() => handleClose(1)}>
                <b>&#10006;</b>
              </Button>
              {openSoobErr && <ManagKnobError setOpen={setOpenSoobErr} />}
              <>
                {!trigger && (
                  <>
                    {ButtMenu("Включить исполнение", !releaseXT, 1)}
                    {ButtMenu("Отключить исполнение", releaseXT, 0)}
                    {ButtMenu("Включить расчёт", !switchXT, 3)}
                    {ButtMenu("Отключить расчёт", switchXT, 2)}
                  </>
                )}
                <Button sx={styleBatMenuXt} onClick={() => handleClose(0)}>
                  Выход
                </Button>
                {trigger && <>{ButtonDo()}</>}
              </>
            </Box>
          )}
        </>
      </Modal>
    </>
  );
};

export default ManagementKnobXT;
