import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { styleBatMenu, styleMod } from "./AppStyle";

const EndSeans = (props: { bsLogin: string }) => {
  let soob = "В Арм-е Технолога системы работает пользователь " + props.bsLogin;

  const handleClose = () => {
    window.close();
  };

  return (
    <>
      {props.bsLogin !== "" && (
        <Box sx={styleMod}>
          <Box sx={{ textAlign: "center", fontSize: 16, color: "red" }}>
            <b>{soob}</b>
          </Box>
          <Box sx={{ color: "background.paper" }}>Pusto</Box>
          <Box sx={{ textAlign: "center" }}>
            <Button sx={styleBatMenu} variant="contained" onClick={handleClose}>
              <b>Выход</b>
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default EndSeans;
