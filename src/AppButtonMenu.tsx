import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { BiSolidDownload } from "react-icons/bi";

const ButtonMenu = (props: {
  mode: string;
  soob: string;
  SetValue: Function;
  tekValue: string;
}) => {
  const [hint, setHint] = React.useState(false);

  let dlSoob = props.soob !== "⇩" ? (props.soob.length + 10) * 6.5 : 33;

  const styleApp02 = {
    fontSize: 14.5,
    marginRight: "3px",
    minWidth: dlSoob,
    maxWidth: dlSoob,
    height: "22px",
    bgcolor: "#BAE186", // тёмно-салатовый
    border: "1px solid #93D145", // ярко-салатовый
    borderRadius: 1,
    color: "black",
    textTransform: "unset !important",
    boxShadow: 8,
    textAlign: "center",
  };

  const styleApp021 = {
    fontSize: 14,
    marginRight: "3px",
    minWidth: dlSoob,
    maxWidth: dlSoob,
    minHeight: "21px",
    maxHeight: "21px",
    padding: "2px 0px 0px 0px",
    bgcolor: "#E6F5D6", // светло-салатовый
    border: "1px solid #d4d4d4", // серый
    borderRadius: 1,
    color: "black",
    textTransform: "unset !important",
    boxShadow: 1,
    textAlign: "center",
  };

  const styleApp022 = {
    position: "absolute",
    left: "484px",
    top: "2px",
    width: "63px",
    fontSize: 12.5,
    fontWeight: 500,
    color: "#797A7B", // тёмно-серый
  };

  const TurnOnHint = () => {
    props.soob === "⇩" && setHint(true);
  };

  const TurnOffHint = () => {
    props.soob === "⇩" && setHint(false);
  };

  let illum = props.mode === props.tekValue ? styleApp02 : styleApp021;

  return (
    <>
      <Button
        sx={illum}
        onClick={() => props.SetValue(props.mode)}
        onMouseEnter={() => TurnOnHint()}
        onMouseLeave={() => TurnOffHint()}
      >
        {props.soob === "⇩" ? <BiSolidDownload /> : <b>{props.soob}</b>}
      </Button>
      {hint && <Box sx={styleApp022}>Сохранить</Box>}
    </>
  );
};

export default ButtonMenu;
