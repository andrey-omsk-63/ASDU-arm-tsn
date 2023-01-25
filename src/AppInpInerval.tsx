import React from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import { styleBoxFormInt } from "./AppStyle";

const InputInterval = (props: { curr: any; cur: string; func: any }) => {
  const handleKey = (event: any) => {
    if (event.key === "Enter") event.preventDefault();
  };

  return (
    <Box component="form" sx={styleBoxFormInt}>
      <TextField
        select
        size="small"
        onKeyPress={handleKey} //отключение Enter
        value={props.cur}
        onChange={props.func}
        InputProps={{ style: { fontSize: 12.5 } }}
        variant="standard"
        color="secondary"
      >
        {props.curr.map((option: any) => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={{ fontSize: 12.5 }}
          >
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default InputInterval;
