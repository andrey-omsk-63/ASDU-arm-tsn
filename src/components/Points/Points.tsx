import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { maskpointCreate, statsaveCreate } from "./../../redux/actions";

import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import PointsMenuLevel1 from "./PointsMenuLevel1";

import { MakeDate, SendSocketOldDateXt } from "../../AppServiceFunctions";

import { stylePoint01, stylePoint02 } from "./grid/PointsGridStyle";
import { stylePoint03 } from "./grid/PointsGridStyle";
import { styleStError } from "../../AppStyle";

import { XctrlInfo } from "../../interfaceGl.d";

let tekValue = 0;
let pointsEtalon: XctrlInfo[];
let numerOld = -1;

const date = new Date();
let tekDate = MakeDate(date);
let oldDate = tekDate;
let oldXt = -1;

const Points = (props: {
  open: boolean;
  ws: WebSocket;
  xctrll: XctrlInfo[];
  region: string;
  setPoint: any;
  saveXt: Function;
  date: string;
  calc: boolean;
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
  let reGion = props.region;
  let isOpen = props.open;
  let pointsGl = props.xctrll;
  let debug = false;
  if (props.ws.url === "wss://localhost:3000/W") debug = true;

  let points = pointsGl.filter(
    (pointsGl) => pointsGl.region === Number(reGion)
  );

  //console.log("Points:", props.xctrll, points);

  const [value, setValue] = React.useState(tekValue);
  const [calculate, setCalculate] = React.useState(true);

  React.useEffect(() => {
    const handleSend = () => {
      if (props.ws !== null) {
        if (props.ws.readyState === WebSocket.OPEN) {
          props.ws.send(
            JSON.stringify({ type: "stopDevices", region: reGion })
          );
          props.ws.send(
            JSON.stringify({ type: "stopStatistics", region: reGion })
          );
          props.ws.send(
            JSON.stringify({ type: "stopOldStatistics", region: reGion })
          );
        } else {
          setTimeout(() => {
            handleSend();
          }, 1000);
        }
      }
    };
    handleSend();
  }, [props.ws, reGion]);

  if (isOpen) pointsEtalon = points; // замена проверки обновления - проверка теперь в App
  if (props.date !== tekDate) {
    if (props.date !== oldDate || oldXt !== tekValue) {
      if (debug) {
        datestat.xttData = props.date;
        setCalculate(!calculate);
      } else {
        datestat.xttData = "sss";
      }
      datestat.xtt = tekValue;
      SendSocketOldDateXt(props.ws, props.date, pointsEtalon, tekValue);
      oldXt = tekValue;
      oldDate = props.date;
    }
  } else {
    datestat.xttData = tekDate;
    if (props.date !== oldDate) {
      oldDate = props.date;
      setCalculate(!calculate);
    }
  }
  dispatch(statsaveCreate(datestat));

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    tekValue = newValue;
    if (numerOld !== tekValue) {
      //==================================================================
      datestat.needSave = false;
      dispatch(statsaveCreate(datestat));
      //==================================================================
      maskpoint.newXt = true;
      dispatch(maskpointCreate(maskpoint));
      numerOld = tekValue;
    }
  };

  const SpisXT = () => {
    let resSps: any = [];
    let labl: string = "";

    if (pointsEtalon.length === 0) {
      resSps.push(
        <Box key={1} sx={styleStError}>
          <h1>Нет данных по ХТ</h1>
        </Box>
      );
    } else {
      for (let i = 0; i < pointsEtalon.length; i++) {
        let illum = value === i ? stylePoint01 : stylePoint02;
        labl =
          "ХТ:" +
          pointsEtalon[i].area.toString() +
          ":" +
          pointsEtalon[i].subarea.toString();
        resSps.push(<Tab key={i} sx={illum} label={labl} />);
      }
    }
    return resSps;
  };

  return (
    <Box sx={{ marginTop: -2.8, marginLeft: -3, marginRight: -5 }}>
      {pointsEtalon.length > 0 && (
        <>
          <Box sx={stylePoint03}>
            <Tabs
              sx={{ maxHeight: "20px", minHeight: "20px" }}
              value={value}
              onChange={handleChange}
              variant="scrollable"
              textColor="inherit"
              scrollButtons={true}
              allowScrollButtonsMobile
              TabIndicatorProps={{ sx: { bgcolor: "#93D145" } }}
            >
              {SpisXT()}
            </Tabs>
          </Box>
          <PointsMenuLevel1
            open={isOpen}
            ws={props.ws}
            xctrll={pointsEtalon}
            xtt={tekValue}
            setPoint={props.setPoint}
            saveXt={props.saveXt}
            calc={props.calc}
            calcDeb={calculate}
            update={props.update}
          />
        </>
      )}
      {pointsEtalon.length === 0 && (
        <Box sx={styleStError}>
          <h1>Нет данных по ХТ</h1>
        </Box>
      )}
    </Box>
  );
};

export default Points;
