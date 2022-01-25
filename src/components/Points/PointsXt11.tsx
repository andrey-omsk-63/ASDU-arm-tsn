import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Modal from '@mui/material/Modal';

import PointsXt111 from './PointsXt111';
import PointsXt112 from './PointsXt112';

import { XctrlInfo } from '../../interfaceGl.d';

const PointsXt11 = (props: { open: boolean; xctrll: XctrlInfo[]; xtt: number }) => {
  console.log('PointsXt11:', props.xtt);

  const stylePXt1 = {
    fontSize: 10,
    maxHeight: '20px',
    minHeight: '20px',
    backgroundColor: '#F1F3F4',
    color: 'black',
    marginRight: 1,
  };

  const isOpen = props.open;
  const xtProps = props.xtt;
  const points = props.xctrll[xtProps];

  const [valueLevel2, setValueLavel2] = React.useState('1');
  let crossroad = 0;

  const MenuName = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);

    const handleClose = (numer: number) => {
      crossroad = numer;
      setValueLavel2('2');
      setOpen(false);
    };
    let dlStrMenu = 0;

    if (isOpen) {
      for (let i = 0; i < points.xctrls.length; i++) {
        if (points.xctrls[i].name.length > dlStrMenu) {
          dlStrMenu = points.xctrls[i].name.length;
        }
      }

      const stylePK = {
        position: 'relative',
        //marginTop: '5vh',
        bottom: '-33vh',
        marginLeft: '60vh',
        transform: 'translate(-50%, -50%)',
        width: (dlStrMenu + 7) * 9,
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
    <Box sx={{ marginTop: 2.5, marginLeft: -2.5, marginRight: -10 }}>
      <TabContext value={valueLevel2}>
        <Box>
          <Stack sx={{ marginTop: -2 }} direction="row">
            <Button sx={stylePXt1} variant="contained" onClick={() => setValueLavel2('1')}>
              <b>Основной:</b>
            </Button>
            {MenuName()}
          </Stack>
        </Box>
        <TabPanel value="1">
          <PointsXt111 open={isOpen} xctrll={props.xctrll} xtt={xtProps} />
        </TabPanel>
        <TabPanel value="2">
          <PointsXt112 open={isOpen} xctrll={props.xctrll} xtt={xtProps} crossroad={crossroad} />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default PointsXt11;
