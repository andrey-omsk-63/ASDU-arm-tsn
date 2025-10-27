import React from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";

import { MenuSpisRegion, SendSocketDevices } from "./AppServiceFunctions";
import { SendSocketgetStatisticsList } from "./AppServiceFunctions";

//import { debug, WS } from "./App";

let massRegion: Array<number> = [];
let massNameRegion: Array<string> = [];
let regionGlob = 0;
let pointsReg: any = null;
let dlStrMenu = 0;

const BeginSeans = (props: { pointsReg: any; SetRegion: Function }) => {
  console.log("BeginSeans:", props.pointsReg);
  const [open, setOpen] = React.useState(true);

  // let debug = false;
  // if (props.ws.url === "wss://localhost:3000/W") debug = true;
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
    SendSocketgetStatisticsList(numer.toString());
    SendSocketDevices(numer);
    props.SetRegion(numer);
    setOpen(false);
  };

  const CloseEnd = (event: any, reason: string) => {
    if (reason === "escapeKeyDown") window.close(); // нажали Esc
  };

  const OneRegin = () => {
    SendSocketgetStatisticsList(massRegion[0].toString());
    SendSocketDevices(massRegion[0]);
    props.SetRegion(massRegion[0]);
  };

  const SpisRegion = () => {
    // let resStr = [];
    // for (let i = 0; i < massRegion.length; i++) {
    //   resStr.push(
    //     <>
    //       {MenuSpisRegion(massRegion[i], massNameRegion[i], handleCloseModal)}
    //     </>
    //   );
    // }
    // return resStr;
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
    bgcolor: "background.paper",
    border: "1px solid #fff",
    borderRadius: 1,
    boxShadow: 24,
    p: 3,
  };

  return (
    <>
      {massRegion.length > 1 && (
        <Modal open={open} onClose={CloseEnd}>
          <Box sx={styleModal}>
            <Stack direction="column">
              <Box sx={{ textAlign: "center" }}>Выбор региона:</Box>
              {SpisRegion()}
              <Box sx={{ marginBottom: 0.5 }}> </Box>
            </Stack>
          </Box>
        </Modal>
      )}
      {massRegion.length === 1 && <>{OneRegin()}</>}
    </>
  );
};

export default BeginSeans;
