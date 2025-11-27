import React from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";

import { MenuSpisRegion, SendSocketDevices } from "./AppServiceFunctions";

let massRegion: Array<number> = [];
let massNameRegion: Array<string> = [];
let regionGlob = 0;
let pointsReg: any = null;
let dlStrMenu = 0;

const BeginSeans = (props: { pointsReg: any; SetRegion: Function }) => {
  const [open, setOpen] = React.useState(true);

  if (!pointsReg) pointsReg = props.pointsReg;

  if (regionGlob === 0) {
    for (let key in pointsReg) {
      if (!isNaN(Number(key))) {
        massRegion.push(Number(key)); // ключ - символьное число
        massNameRegion.push(pointsReg[key]);
        if (pointsReg[key].length > dlStrMenu)
          dlStrMenu = pointsReg[key].length;
      }
    }
    regionGlob = massRegion[0];
    dlStrMenu = (dlStrMenu + 8) * 10;
  }

  const handleCloseModal = (numer: number) => {
    SendSocketDevices(numer);
    props.SetRegion(numer);
    setOpen(false);
  };

  const CloseEnd = (event: any, reason: string) => {
    if (reason === "escapeKeyDown") window.close(); // нажали Esc
  };

  const OneRegin = () => {
    SendSocketDevices(massRegion[0]);
    props.SetRegion(massRegion[0]);
  };

  const SpisRegion = () => {
    return massRegion.map((masregion: any, idx: number) => {
      return (
        <>{MenuSpisRegion(masregion, massNameRegion[idx], handleCloseModal)}</>
      );
    });
  };

  const styleModal = {
    outline: "none",
    position: "absolute",
    left: "50%",
    top: "50%",
    marginBottom: 1,
    transform: "translate(-50%, -50%)",
    width: dlStrMenu,
    background: "linear-gradient(160deg, #F1F5FB 63%, #D0DEF0 )",
    border: "1px solid #fff",
    borderRadius: 1,
    boxShadow: 24,
    p: 3,
  };

  return (
    <>
      {massRegion.length === 1 ? (
        <>{OneRegin()}</>
      ) : (
        <Modal open={open} onClose={CloseEnd}>
          <Box sx={styleModal}>
            <Stack direction="column">
              <Box sx={{ color: "#6F139B", textAlign: "center" }}>
                Выбор региона:
              </Box>
              {SpisRegion()}
              <Box sx={{ marginBottom: 0.5 }}> </Box>
            </Stack>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default BeginSeans;
