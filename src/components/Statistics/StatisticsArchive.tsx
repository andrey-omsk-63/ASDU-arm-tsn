import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { statsaveCreate } from '../../redux/actions';

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import StatisticXTArchive from './StatisticXTArchive';

import { Statistic } from '../../interfaceStat.d';

let tekValue = 0;
let pointsEtalon: Statistic[];
let flagEtalon = true;
let massInterval: any = [];

let oldDate = '';

const StatisticsArchive = (props: {
  open: boolean;
  ws: WebSocket;
  points: Statistic[];
  region: string;
  date: string;
  interval: number;
  func: any;
}) => {
  //== Piece of Redux ======================================
  // let maskpoint = useSelector((state: any) => {
  //   const { maskpointReducer } = state;
  //   return maskpointReducer.maskpoint;
  // });
  let datestat = useSelector((state: any) => {
    const { statsaveReducer } = state;
    return statsaveReducer.datestat;
  });
  const dispatch = useDispatch();
  //========================================================
  let isOpen = props.open;
  let points = props.points;
  let reGion = props.region;
  if (oldDate !== props.date) flagEtalon = true;

  React.useEffect(() => {
    const handleSend = () => {
      if (props.ws !== null && oldDate !== props.date) {
        if (props.ws.readyState === WebSocket.OPEN) {
          props.ws.send(JSON.stringify({ type: 'stopDevices', region: reGion }));
          props.ws.send(JSON.stringify({ type: 'stopStatistics', region: reGion }));
          props.ws.send(
            JSON.stringify({
              type: 'getOldStatistics',
              region: reGion,
              date: new Date(props.date).toISOString(),
            }),
          );
        } else {
          setTimeout(() => {
            handleSend();
          }, 1000);
        }
      }
    };
    handleSend();
    oldDate = props.date;
  }, [reGion, props.date, props.ws]);

  if (isOpen && flagEtalon) {
    pointsEtalon = points;
    flagEtalon = false;
    massInterval = [];
    for (let i = 0; i < points.length; i++) {
      massInterval.push(points[i].Statistics[0].TLen);
    }
    points = [];
    tekValue = 0;
  } else {
    if (massInterval.length) massInterval[tekValue] = props.interval;
  }

  const styleSt1 = {
    fontSize: 13.5,
    maxHeight: '20px',
    minHeight: '20px',
    backgroundColor: '#F1F3F4',
    color: 'black',
    marginRight: 0.5,
  };

  const styleSt2 = {
    maxWidth: 850,
    minWidth: 850,
    fontSize: 12,
    marginTop: -2,
    marginLeft: -3,
    marginRight: -7,
  };

  console.log('3££££££', tekValue, datestat.tekArea, datestat.tekId);
  if (datestat.tekArea && datestat.tekId) {
    tekValue = 0;
    for (let i = 0; i < pointsEtalon.length; i++) {
      if (pointsEtalon[i].area === datestat.tekArea && pointsEtalon[i].id === datestat.tekId)
        tekValue = i;
    }
  }
  console.log('4££££££', tekValue, datestat.tekArea, datestat.tekId);

  const [value, setValue] = React.useState(tekValue);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    tekValue = newValue;
    datestat.tekArea = pointsEtalon[tekValue].area;
    datestat.tekId = pointsEtalon[tekValue].id;
    console.log('$$$tekValue:', tekValue, datestat.tekArea, datestat.tekId);
    dispatch(statsaveCreate(datestat));
    props.func(tekValue, massInterval[tekValue]);
    //console.log("Old_ПЕРЕДАЛ:", tekValue, massInterval[tekValue]);
  };

  const handleChangeNull = () => {
    //console.log('ПЕРЕДАЛ:', 0, massInterval[0]);
    //props.func(-1, massInterval[0]);
    return <Box sx={styleSt1}>На эту дату данных по статистике НЕТ</Box>;
  };

  const SpisXT = () => {
    let resSps: any = [];
    let labl: string = '';

    if (pointsEtalon.length === 0) {
      resSps.push(
        <Box key={1} sx={styleSt1}>
          Нет данных по статистике за эту дату
        </Box>,
      );
    } else {
      for (let i = 0; i < pointsEtalon.length; i++) {
        labl = pointsEtalon[i].area.toString() + ':' + pointsEtalon[i].id.toString();
        resSps.push(<Tab key={i} sx={styleSt1} label={labl} />);
      }
    }
    return resSps;
  };

  return (
    <>
      {isOpen && pointsEtalon.length === 0 && <>{handleChangeNull()} </>}
      {isOpen && pointsEtalon.length !== 0 && (
        <>
          <Box sx={styleSt2}>
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
              <StatisticXTArchive
                open={isOpen}
                statist={pointsEtalon}
                areaid={value}
                date={props.date}
                interval={massInterval[tekValue]}
              />
            )}
          </>
        </>
      )}
    </>
  );
};

export default StatisticsArchive;
