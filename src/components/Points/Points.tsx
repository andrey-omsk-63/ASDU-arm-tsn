import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { maskpointCreate, statsaveCreate } from './../../redux/actions';

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import PointsMenuLevel1 from './PointsMenuLevel1';

import { MakeDate } from '../../AppServiceFunctions';

import { XctrlInfo } from '../../interfaceGl.d';

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
  const stylePXt1 = {
    fontSize: 13.5,
    maxHeight: '20px',
    minHeight: '20px',
    backgroundColor: '#F1F3F4',
    color: 'black',
    marginRight: 0.5,
  };

  let reGion = props.region;
  let isOpen = props.open;
  let pointsGl = props.xctrll;
  let debug = false;
  if (props.ws.url === 'wss://localhost:3000/W') debug = true;

  //console.log("POINS:", reGion, pointsGl);

  let points = pointsGl.filter((pointsGl) => pointsGl.region === Number(reGion));
  //let points = pointsGl;  // для отладки

  pointsEtalon = points; // замена проверки обновления Xctrl - проверка теперь в App

  const [value, setValue] = React.useState(tekValue);
  const [calculate, setCalculate] = React.useState(true);

  React.useEffect(() => {
    const handleSend = () => {
      if (props.ws !== null) {
        if (props.ws.readyState === WebSocket.OPEN) {
          props.ws.send(JSON.stringify({ type: 'stopDevices', region: reGion }));
          props.ws.send(JSON.stringify({ type: 'stopStatistics', region: reGion }));
          props.ws.send(JSON.stringify({ type: 'stopOldStatistics', region: reGion }));
        } else {
          setTimeout(() => {
            handleSend();
          }, 1000);
        }
      }
    };
    handleSend();
  }, [props.ws, reGion]);

  const SendSocketOldDateXt = (ws: any) => {
    console.log(
      'SendSocketOldDateXt',
      date,
      Number(props.region),
      pointsEtalon[tekValue].area,
      pointsEtalon[tekValue].subarea,
      pointsEtalon[tekValue],
    );
    const handleSendOpen = () => {
      if (ws !== null) {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(
            JSON.stringify({
              type: 'getCalculation',
              date: new Date(props.date).toISOString(),
              region: Number(props.region),
              area: pointsEtalon[tekValue].area,
              subarea: pointsEtalon[tekValue].subarea,
            }),
          );
        } else {
          setTimeout(() => {
            handleSendOpen();
          }, 1000);
        }
      }
    };
    handleSendOpen();
  };

  if (isOpen) pointsEtalon = points; // замена проверки обновления - проверка теперь в App

  console.log('PointsGl:', debug, props.date, oldDate, oldXt, tekValue);

  if (props.date !== tekDate) {
    if (props.date !== oldDate || oldXt !== tekValue) {
      if (debug) {
        datestat.xttData = props.date;
        setCalculate(!calculate);
      } else {
        datestat.xttData = 'sss';
      }
      datestat.xtt = tekValue;
      SendSocketOldDateXt(props.ws);
      oldXt = tekValue;
      oldDate = props.date;
      // rerend
    }
  } else {
    datestat.dateXtt = '';
  }
  dispatch(statsaveCreate(datestat));

  console.log('Datestat', props.date, datestat);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    tekValue = newValue;
    if (numerOld !== tekValue) {
      maskpoint.newXt = true;
      dispatch(maskpointCreate(maskpoint));
      numerOld = tekValue;
    }
  };

  const SpisXT = () => {
    let resSps: any = [];
    let labl: string = '';

    if (pointsEtalon.length === 0) {
      resSps.push(
        <Box key={1} sx={stylePXt1}>
          Нет данных по ХТ
        </Box>,
      );
    } else {
      for (let i = 0; i < pointsEtalon.length; i++) {
        labl = 'XT:' + pointsEtalon[i].area.toString() + ':' + pointsEtalon[i].subarea.toString();
        resSps.push(<Tab key={i} sx={stylePXt1} label={labl} />);
      }
    }
    return resSps;
  };

  return (
    <Box sx={{ border: 0, marginTop: -2.8, marginLeft: -3, marginRight: -5 }}>
      <Box
        sx={{
          maxWidth: '100%',
          fontSize: 12,
          marginTop: 0.5,
          marginLeft: -4.6,
          marginRight: -7,
        }}>
        <Tabs
          sx={{ maxHeight: '20px', minHeight: '20px' }}
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons={true}
          allowScrollButtonsMobile>
          {SpisXT()}
        </Tabs>
      </Box>
      <>
        {pointsEtalon.length > 0 && (
          <>
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
      </>
    </Box>
  );
};

export default Points;

// разноска обновлений
// if (isOpen && !flagEtalon) {
//   let pointsAdd = [];
//   let newRecord = true;
//   for (let i = 0; i < points.length; i++) {
//     newRecord = true;
//     for (let j = 0; j < pointsEtalon.length; j++) {
//       if (
//         points[i].subarea === pointsEtalon[j].subarea &&
//         points[i].region === pointsEtalon[j].region &&
//         points[i].area === pointsEtalon[j].area
//       ) {
//         newRecord = false;
//         pointsEtalon[j] = points[i];
//         //console.log('Points обновилась запись i=', i);
//       }
//     }
//     if (newRecord) {
//       console.log('Points новая запись i=', i);
//       pointsAdd.push(points[i]);
//     }
//   }
//   if (pointsAdd.length > 0) {
//     for (let i = 0; i < pointsAdd.length; i++) {
//       pointsEtalon.push(pointsAdd[i]);
//     }
//   }
// }
