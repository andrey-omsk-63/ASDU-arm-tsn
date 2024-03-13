import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

//import { styleModalEnd, styleSetInf } from "./components/MainMapStyle";

const ManagKnobXTEmpty = (props: { soob: string; setOpen: any }) => {
  const [openSet, setOpenSet] = React.useState(true);

  const styleSetInf = {
    outline: "none",
    position: "absolute",
    marginTop: "15vh",
    marginLeft: "24vh",
    width: 380,
    bgcolor: "background.paper",
    border: "1px solid #fff",
    //borderColor: "red",
    borderRadius: 1,
    boxShadow: 24,
    textShadow: "2px 2px 3px rgba(0,0,0,0.3)",
    p: 3,
  };

  const styleModalEnd = {
    position: "absolute",
    top: "0%",
    left: "auto",
    right: "-0%",
    height: "21px",
    maxWidth: "2%",
    minWidth: "2%",
    color: "red",
  };

  const handleClose = () => {
    props.setOpen(false);
    setOpenSet(false);
  };

  return (
    <Modal open={openSet} onClose={handleClose}  hideBackdrop={true}>
      <Box sx={styleSetInf}>
        <Button sx={styleModalEnd} onClick={handleClose}>
          <b>&#10006;</b>
        </Button>

        <Typography variant="h6" sx={{ textAlign: "center", color: "red" }}>
          ⚠️{props.soob}
        </Typography>
      </Box>
    </Modal>
  );
};

export default ManagKnobXTEmpty;
