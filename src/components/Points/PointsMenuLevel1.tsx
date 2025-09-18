import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { maskpointCreate, statsaveCreate } from "./../../redux/actions";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import Modal from "@mui/material/Modal";

import PointsMainScr from "./PointsMainScr";
import PointsMenuLevel2 from "./PointsMenuLevel2";

import { stylePLevel01, styleModalEnd } from "./grid/PointsGridStyle";
import { stylePLevel02, stylePLevel03 } from "./grid/PointsGridStyle";
import { stylePLevel04, stylePLevel05 } from "./grid/PointsGridStyle";

import { XctrlInfo } from "../../interfaceGl.d";

let xtPropsOld = -1;
let numerOld = -1;
let nomIllum = -1;

const PointsMenuLevel1 = (props: {
  open: boolean;
  xctrll: XctrlInfo[];
  xtt: number;
  setPoint: any;
  saveXt: Function;
  calc: boolean; // calculate из App
  calcDeb: boolean;
  update: boolean;
}) => {
  //== Piece of Redux =======================================
  let maskpoint = useSelector((state: any) => {
    const { maskpointReducer } = state;
    return maskpointReducer.maskpoint;
  });
  let datestat = useSelector((state: any) => {
    const { statsaveReducer } = state;
    return statsaveReducer.datestat;
  });
  const dispatch = useDispatch();
  props.saveXt(false);
  //===========================================================
  const isOpen = props.open;
  const xtProps = props.xtt;
  const points = props.xctrll[xtProps];

  const [valueLevel2, setValueLavel2] = React.useState("1");
  const [tekValue, setTekValue] = React.useState("1");
  const [crossRoad, setCrossRoad] = React.useState(0);

  if (xtPropsOld !== xtProps) {
    xtPropsOld = xtProps;
    nomIllum = -1;
    setCrossRoad(0);
  }

  const SetValueLavel2 = (mode: string) => {
    setValueLavel2(mode);
    if (mode === "1") setTekValue(mode); // tekValue = mode;
  };

  const MenuCrossRoad = () => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
      setOpen(true);
      setTekValue("2");
    };

    const handleClose = (numer: number) => {
      nomIllum = numer;
      if (numer !== 777) {
        //==================================================================
        maskpoint.savePoint = false;
        maskpoint.redaxPoint = true;
        dispatch(maskpointCreate(maskpoint));
        datestat.needSave = false;
        dispatch(statsaveCreate(datestat));
        //==================================================================
        setCrossRoad(numer);
        SetValueLavel2("2");
        if (numerOld !== numer) {
          maskpoint.newXt = true;
          dispatch(maskpointCreate(maskpoint));
          numerOld = numer;
        }
      }
      setOpen(false);
    };

    let dlStrMenu = 0;

    if (points) {
      if (isOpen && points.xctrls.length !== 0) {
        for (let i = 0; i < points.xctrls.length; i++)
          if (points.xctrls[i].name.length > dlStrMenu)
            dlStrMenu = points.xctrls[i].name.length;

        const SpisPerekr = () => {
          let resStr = [];
          for (let i = 0; i < points.xctrls.length; i++) {
            let illum = nomIllum === i ? stylePLevel02 : stylePLevel03;
            let cont = "XT:" + points.area + ":" + points.subarea;
            cont += ":" + points.xctrls[i].name;

            resStr.push(
              <Button key={i} sx={illum} onClick={() => handleClose(i)}>
                <b>{cont}</b>
              </Button>
            );
          }
          resStr.push(
            <Button
              key={Math.random()}
              sx={styleModalEnd}
              onClick={() => handleClose(777)}
            >
              <b>&#10006;</b>
            </Button>
          );
          return resStr;
        };

        let soob =
          "XT:" + points.area + ":" + points.subarea + " Перечень перекрёстков";

        return (
          <>
            {ButtonMenu("2", soob, handleOpen)}
            <Modal open={open} hideBackdrop={false}>
              <Box sx={stylePLevel01(dlStrMenu)}>{SpisPerekr()}</Box>
            </Modal>
          </>
        );
      }
    }
  };
  //Math
  const SetValueLavel21 = () => {
    //==================================================================
    maskpoint.savePoint = false;
    maskpoint.redaxPoint = true;
    dispatch(maskpointCreate(maskpoint));
    datestat.needSave = false;
    dispatch(statsaveCreate(datestat));
    //==================================================================
    SetValueLavel2("1");
  };

  const ButtonMenu = (mode: string, soob: any, func: Function) => {
    let illum = mode === tekValue ? stylePLevel04 : stylePLevel05;

    return (
      <Button sx={illum} onClick={() => func()}>
        <b>{soob}</b>
      </Button>
    );
  };

  return (
    <>
      {points && (
        <Box>
          <TabContext value={valueLevel2}>
            <Box sx={{ marginLeft: 0.5 }}>
              <Stack sx={{ marginLeft: 0.5 }} direction="row">
                {ButtonMenu("1", "Основной:", SetValueLavel21)}
                {MenuCrossRoad()}
              </Stack>
            </Box>
            <TabPanel value="1">
              <PointsMainScr
                open={isOpen}
                xctrll={props.xctrll}
                xtt={xtProps}
                setPoint={props.setPoint}
                calc={props.calc}
                calcDeb={props.calcDeb}
              />
            </TabPanel>
            <TabPanel value="2">
              <>
                {points.xctrls.length > 0 && (
                  <>
                    <PointsMenuLevel2
                      open={isOpen}
                      xctrll={props.xctrll}
                      xtt={xtProps}
                      crossroad={crossRoad}
                      setPoint={props.setPoint}
                      saveXt={props.saveXt}
                      calc={props.calc}
                      calcDeb={props.calcDeb}
                      update={props.update}
                    />
                  </>
                )}
              </>
            </TabPanel>
          </TabContext>
        </Box>
      )}
    </>
  );
};

export default PointsMenuLevel1;
