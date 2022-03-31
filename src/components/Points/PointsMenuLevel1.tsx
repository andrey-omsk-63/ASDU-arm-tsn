import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Modal from '@mui/material/Modal';

import PointsMainScr from './PointsMainScr';
import PointsMenuLevel2 from './PointsMenuLevel2';

import { XctrlInfo } from '../../interfaceGl.d';

const PointsMenuLevel1 = (props: { open: boolean; xctrll: XctrlInfo[]; xtt: number }) => {
  const isOpen = props.open;
  const xtProps = props.xtt;
  const points = props.xctrll[xtProps];

  const stylePXt1 = {
    fontSize: 13.9,
    maxHeight: '20px',
    minHeight: '20px',
    backgroundColor: '#F1F3F4',
    color: 'black',
    marginRight: 1,
    marginTop: 2,
    textTransform: 'unset !important',
  };

  const [valueLevel2, setValueLavel2] = React.useState('1');
  const [crossRoad, setCrossRoad] = React.useState(0);

  const MenuCrossRoad = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);

    const handleClose = (numer: number) => {
      if (numer !== 777) {
        setCrossRoad(numer);
        setValueLavel2('2');
      }
      setOpen(false);
    };

    let dlStrMenu = 0;

    if (isOpen && points.xctrls.length !== 0) {
      for (let i = 0; i < points.xctrls.length; i++) {
        if (points.xctrls[i].name.length > dlStrMenu) {
          dlStrMenu = points.xctrls[i].name.length;
        }
      }

      const stylePK = {
        position: 'relative',
        bottom: '-33vh',
        marginLeft: '60vh',
        //transform: 'translate(-50%, -50%)',
        width: (dlStrMenu + 8) * 10,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        borderRadius: 2,
        boxShadow: 24,
        p: 3,
      };

      const styleModalEnd = {
        position: 'absolute',
        maxWidth: '3vh',
        minWidth: '3vh',
        maxHeight: '16px',
        minHeight: '16px',
        backgroundColor: 'fff',
        top: '0.5%',
        left: '92%',
        fontSize: 15,
        color: 'black',
      };

      const SpisPerekr = () => {
        let resStr = [];
        for (let i = 0; i < points.xctrls.length; i++) {
          resStr.push(
            <Button key={i} sx={stylePXt1} variant="contained" onClick={() => handleClose(i)}>
              <b>
                XT:{xtProps + 1}:1:&nbsp;&nbsp;{points.xctrls[i].name}
              </b>
            </Button>,
          );
        }
        resStr.push(
          // <Button key={0} sx={stylePXt1} variant="contained" onClick={() => handleClose(777)}>
          //   <b>Выход</b>
          // </Button>,
          <Button key={777} sx={styleModalEnd} onClick={() => handleClose(777)}>
            <b>&#10006;</b>
          </Button>,
        );
        return resStr;
      };

      return (
        <div>
          <Button sx={stylePXt1} variant="contained" onClick={handleOpen}>
            <b>XT:{xtProps + 1}:1 &nbsp; Перечень перекрёстков</b>
          </Button>
          <Modal open={open}>
            <Box sx={stylePK}>
              <Stack direction="column">{SpisPerekr()}</Stack>
            </Box>
          </Modal>
        </div>
      );
    }
  };

  return (
    <Box>
      <TabContext value={valueLevel2}>
        <Box>
          <Stack sx={{ marginLeft: 0.5, marginTop: 0.7 }} direction="row">
            <Button sx={stylePXt1} variant="contained" onClick={() => setValueLavel2('1')}>
              <b>Основной:</b>
            </Button>
            {MenuCrossRoad()}
          </Stack>
        </Box>
        <TabPanel value="1">
          <PointsMainScr open={isOpen} xctrll={props.xctrll} xtt={xtProps} />
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
                />
              </>
            )}
          </>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default PointsMenuLevel1;
