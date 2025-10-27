import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

import { debug, WS } from "./App";

const EndSeans = (props: { bsLogin: string; setOpen: any; reg: number }) => {
  const reGion = props.reg;
  const [openSet, setOpenSet] = React.useState(true);
  let soob = "В Арм-е Технолога системы работает пользователь " + props.bsLogin;

  const styleSetInf = {
    outline: "none",
    position: "absolute",
    left: "45%",
    top: "46%",
    transform: "translate(-50%, -50%)",
    width: 380,
    bgcolor: "#FFDB4D", // жёлтый
    border: "1px solid #FFEDA6", // бледно-жёлтый
    borderRadius: 1,
    textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
    boxShadow: 24,
    p: 1.5,
  };

  const styleBatMenu = {
    fontSize: 14,
    maxHeight: "24px",
    minHeight: "24px",
    bgcolor: "#CFECB0", // светло-салатовый
    border: "1px solid #d4d4d4", // серый
    borderRadius: 1,
    boxShadow: 6,
    color: "black",
    marginTop: 1,
    marginRight: 1,
    textTransform: "unset !important",
  };

  const handleClose = (mode: number) => {
    if (!mode) window.close();

    console.log("getDevices", reGion);

    const handleSendOpen = () => {
      if (WS !== null) {
        if (WS.readyState === WebSocket.OPEN) {
          WS.send(
            JSON.stringify({ type: "getDevices", region: reGion.toString() })
          );
        } else {
          setTimeout(() => {
            handleSendOpen();
          }, 1000);
        }
      }
    };
    if (!debug) handleSendOpen();

    props.setOpen(false);
    setOpenSet(false);
  };

  return (
    <Modal open={openSet} onClose={handleClose} hideBackdrop>
      <Box sx={styleSetInf}>
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          {soob}
        </Typography>
        <Box sx={{ textAlign: "center" }}>
          <Button sx={styleBatMenu} onClick={() => handleClose(1)}>
            Переход в «Статистику»
          </Button>
          <Button sx={styleBatMenu} onClick={() => handleClose(0)}>
            Выход
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EndSeans;
