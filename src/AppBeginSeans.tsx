import React from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";

import { MenuSpisRegion } from "./AppServiceFunctions";
import { SendSocketgetStatisticsList } from "./AppServiceFunctions";

let massRegion: Array<number> = [];
let massNameRegion: Array<string> = [];
let regionGlob = 0;
let pointsReg: any = null;
let dlStrMenu = 0;

const BeginSeans = (props: {
  ws: WebSocket;
  pointsReg: any;
  SetRegion: Function;
}) => {
  console.log('!!!regionGlob',regionGlob)
  const [open, setOpen] = React.useState(true);

  let debug = false;
  if (props.ws.url === "wss://localhost:3000/W") debug = true;
  if (!pointsReg) pointsReg = props.pointsReg;

  const handleCloseModal = (numer: number) => {
    regionGlob = numer;
    SendSocketgetStatisticsList(debug, props.ws, regionGlob.toString());
    props.SetRegion(numer);
    setOpen(false);
  };

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

  const OneRegin = () => {
    regionGlob = massRegion[0];
    SendSocketgetStatisticsList(debug, props.ws, regionGlob.toString());
    props.SetRegion(massRegion[0]);
    // if (massRegion.length === 1) {
    //   console.log("%%%:", massRegion[0]);
    //   handleCloseModal(massRegion[0]);
    // }
  };

  //console.log("2massRegion", massRegion, massRegion.length);

  const SpisRegion = () => {
    let resStr = [];
    for (let i = 0; i < massRegion.length; i++) {
      resStr.push(
        <>
          {MenuSpisRegion(massRegion[i], massNameRegion[i], handleCloseModal)}
        </>
      );
    }
    return resStr;
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
    border: "2px solid #000",
    borderColor: "primary.main",
    borderRadius: 2,
    boxShadow: 24,
    p: 3,
  };

  return (
    <>
      {massRegion.length > 1 && (
        <Modal open={open}>
          <Box sx={styleModal}>
            <Stack direction="column">
              <Box sx={{ textAlign: "center" }}>Выбор региона:</Box>
              {/* <Box sx={{ overflowX: 'auto', height: '36vh' }}>{SpisRegion()}</Box> */}
              {SpisRegion()}
              <Box sx={{ marginBottom: 1 }}> </Box>
            </Stack>
          </Box>
        </Modal>
      )}
      {massRegion.length === 1 && <>{OneRegin()}</>}
    </>
  );
};

export default BeginSeans;
