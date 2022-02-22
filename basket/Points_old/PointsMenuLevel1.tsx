import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Modal from '@mui/material/Modal';

import PointsMenuLevel2 from './PointsMenuLevel2';
import PointsMainScr from './PointsMainScr';

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
    textTransform: 'unset !important',
  };

  const [valueLevel2, setValueLavel2] = React.useState('1');
  const [crossRoad, setCrossRoad] = React.useState(0);


  const MenuCrossRoad = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);

    const handleClose = (numer: number) => {
      setCrossRoad(numer)
      setValueLavel2('2');
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
        transform: 'translate(-50%, -50%)',
        width: (dlStrMenu + 8) * 10,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 1,
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
        return resStr;
      };

      return (
        <div>
          <Button sx={stylePXt1} variant="contained" onClick={handleOpen}>
            <b>XT:{xtProps + 1}:1 &nbsp; Перечень перекрёстков</b>
          </Button>
          <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={stylePK}>
              <Stack direction="column">{SpisPerekr()}</Stack>
            </Box>
          </Modal>
        </div>
      );
    }
  };
  
  return (
    <Box sx={{ border: 0 }}>
      <TabContext value={valueLevel2}>
        <Box>
          <Stack sx={{ marginLeft: 0.5, marginTop: 0.7, border: 0 }} direction="row">
            <Button sx={stylePXt1} variant="contained" onClick={() => setValueLavel2('1')}>
              <b>Основной:</b>
            </Button>
            {MenuCrossRoad()}
          </Stack>
        </Box>
        <TabPanel value="1">
          <PointsMenuLevel2 open={isOpen} xctrll={props.xctrll} xtt={xtProps} />
        </TabPanel>
        <TabPanel value="2">
          <>
            {points.xctrls.length > 0 && (
              <>
                <PointsMenuLevel02 open={isOpen} xctrll={props.xctrll} xtt={xtProps} crossroad={crossRoad} />
              </>
            )}
          </>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default PointsMenuLevel1;
