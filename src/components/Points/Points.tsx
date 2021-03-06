import * as React from 'react';

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import PointsMenuLevel1 from './PointsMenuLevel1';

import { XctrlInfo } from '../../interfaceGl.d';

let tekValue = 0;
let pointsEtalon: XctrlInfo[];
//let flagEtalon = true;

const Points = (props: { open: boolean; ws: WebSocket; xctrll: XctrlInfo[]; region: string }) => {
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
  let points = pointsGl.filter((pointsGl) => pointsGl.region === Number(reGion));

  pointsEtalon = points;     // замена проверки обновления Xctrl - проверка теперь в App

  const [value, setValue] = React.useState(tekValue);

  React.useEffect(() => {
    const handleSend = () => {
      if (props.ws !== null) {
        if (props.ws.readyState === WebSocket.OPEN) {
          props.ws.send(JSON.stringify({ type: 'stopDevices', region: reGion }));
          props.ws.send(JSON.stringify({ type: 'stopStatistics', region: reGion }));
        } else {
          setTimeout(() => {
            handleSend();
          }, 1000);
        }
      }
    };
    handleSend();
  }, [props.ws, reGion]);
  
  if (isOpen) pointsEtalon = points;   // замена проверки обновления - проверка теперь в App

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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    tekValue = newValue;
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
    <Box sx={{ border: 0, marginTop: -2.8, marginLeft: -3, marginRight: -5.5 }}>
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
            <PointsMenuLevel1 open={isOpen} xctrll={pointsEtalon} xtt={tekValue} />
          </>
        )}
      </>
    </Box>
  );
};

export default Points;
