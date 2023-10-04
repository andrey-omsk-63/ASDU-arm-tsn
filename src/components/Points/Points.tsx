import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { maskpointCreate, statsaveCreate } from "./../../redux/actions";

import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import PointsMenuLevel1 from "./PointsMenuLevel1";

import { MakeDate, SendSocketOldDateXt } from "../../AppServiceFunctions";

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
  //pointsEtalon = points; // замена проверки обновления Xctrl - проверка теперь в App

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

  //console.log('1PointsGl:', debug, props.date, oldDate, oldXt, tekValue);

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
        <Box key={1}>
          <h2>Нет данных по ХТ</h2>
        </Box>
      );
    } else {
      for (let i = 0; i < pointsEtalon.length; i++) {
        const stylePXt1 = {
          fontSize: 13.5,
          maxHeight: "20px",
          minHeight: "20px",
          bgcolor: "#BAE186", // тёмно-салатовый
          border: "1px solid #000",
          borderColor: "#93D145", // ярко-салатовый
          boxShadow: '6px -6px 6px #d4d4d4',
          color: "black",
          marginRight: 1,
        };
        const stylePXt11 = {
          fontSize: 13.5,
          maxHeight: "20px",
          minHeight: "20px",
          bgcolor: "#E6F5D6", // светло-салатовый
          border: "1px solid #000",
          borderColor: "#d4d4d4", // серый
          boxShadow: 2,
          color: "black",
          marginRight: 1,
        };
        let illum = value === i ? stylePXt1 : stylePXt11;
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

  const stylePoints01 = {
    //border: 1,
    width: window.innerWidth - 21,
    fontSize: 12,
    marginTop: 0.5,
    marginLeft: 0.5,
  };

  return (
    <Box sx={{ border: 0, marginTop: -2.8, marginLeft: -3, marginRight: -5 }}>
      {pointsEtalon.length > 0 && (
        <>
          <Box sx={stylePoints01}>
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
          />
        </>
      )}
      {pointsEtalon.length === 0 && (
        <Box sx={{ marginLeft: 3 }}>
          <h2>Нет данных по ХТ</h2>
        </Box>
      )}
    </Box>
  );
};

export default Points;
