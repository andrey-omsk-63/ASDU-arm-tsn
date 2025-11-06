import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

const ManagKnobError = (props: { setOpen: any }) => {
  const [openSet, setOpenSet] = React.useState(true);

  const styleSetInf = {
    outline: "none",
    position: "absolute",
    marginTop: "15vh",
    marginLeft: "24vh",
    width: 380,
    bgcolor: "#fff6d2", // светло-жёлтый
    border: "1px solid #FFEDA6", // блендно-жёлтый
    borderRadius: 1,
    color: "#5B1080", // сиреневый
    boxShadow: 24,
    textShadow: "2px 2px 3px rgba(0,0,0,0.3)",
    p: 1.5,
    cursor: "default",
  };

  const styleModalEnd = {
    position: "absolute",
    top: "0%",
    left: "auto",
    right: "-0%",
    height: "21px",
    maxWidth: "2%",
    minWidth: "2%",
    color: "#5B1080", // сиреневый
  };

  const handleClose = () => {
    props.setOpen(false);
    setOpenSet(false);
  };

  return (
    <Modal open={openSet} onClose={handleClose} hideBackdrop>
      <Box sx={styleSetInf}>
        <Button sx={styleModalEnd} onClick={handleClose}>
          <b>&#10006;</b>
        </Button>
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          ⚠️ПРЕДУПРЕЖДЕНИЕ
        </Typography>
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          Выбран весь регион, будьте внимательны!
        </Typography>
      </Box>
    </Modal>
  );
};

export default ManagKnobError;
