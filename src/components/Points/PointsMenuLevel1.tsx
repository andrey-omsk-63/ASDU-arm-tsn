import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { maskpointCreate } from './../../redux/actions';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Modal from '@mui/material/Modal';

import PointsMainScr from './PointsMainScr';
import PointsMenuLevel2 from './PointsMenuLevel2';

import { XctrlInfo } from '../../interfaceGl.d';

let xtPropsOld = -1;
let numerOld = -1;

const PointsMenuLevel1 = (props: {
  open: boolean;
  ws: WebSocket;
  xctrll: XctrlInfo[];
  xtt: number;
  setPoint: any;
  saveXt: Function;
  calc: boolean;
  calcDeb: boolean;
}) => {
  //console.log('Calc_1:',props.calcDeb, props.calcDeb);
  //== Piece of Redux =======================================
  let maskpoint = useSelector((state: any) => {
    const { maskpointReducer } = state;
    return maskpointReducer.maskpoint;
  });
  //console.log("maskpoint_Level1:", maskpoint);
  const dispatch = useDispatch();
  props.saveXt(false);
  //===========================================================
  const isOpen = props.open;
  const xtProps = props.xtt;
  const points = props.xctrll[xtProps];

  const stylePXt1 = {
    fontSize: 13.9,
    maxHeight: '20px',
    minHeight: '20px',
    backgroundColor: '#E9F5D8',
    color: 'black',
    marginRight: 1,
    marginTop: 0.7,
    textTransform: 'unset !important',
  };

  const [valueLevel2, setValueLavel2] = React.useState('1');
  const [crossRoad, setCrossRoad] = React.useState(0);

  if (xtPropsOld !== xtProps) {
    xtPropsOld = xtProps;
    setCrossRoad(0);
  }

  const MenuCrossRoad = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);

    const handleClose = (numer: number) => {
      if (numer !== 777) {
        setCrossRoad(numer);
        setValueLavel2('2');
        if (numerOld !== numer) {
          maskpoint.newXt = true;
          dispatch(maskpointCreate(maskpoint));
          numerOld = numer;
        }
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
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: (dlStrMenu + 8) * 10,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        borderColor: 'primary.main',
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
        fontSize: 15,
        color: 'black',
        top: '0%',
        left: 'auto',
        right: '-1.2%',
      };

      const SpisPerekr = () => {
        let resStr = [];
        for (let i = 0; i < points.xctrls.length; i++) {
          resStr.push(
            <Button key={i} sx={stylePXt1} variant="contained" onClick={() => handleClose(i)}>
              <b>
                XT:{points.area}:1:&nbsp;&nbsp;{points.xctrls[i].name}
              </b>
            </Button>,
          );
        }
        resStr.push(
          <Button key={777} sx={styleModalEnd} onClick={() => handleClose(777)}>
            <b>&#10006;</b>
          </Button>,
        );
        return resStr;
      };

      return (
        <div>
          <Button sx={stylePXt1} variant="contained" onClick={handleOpen}>
            <b>XT:{points.area}:1 &nbsp; Перечень перекрёстков</b>
          </Button>
          <Modal open={open} hideBackdrop>
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
          <Stack sx={{ marginLeft: 0.5, marginTop: 0.5 }} direction="row">
            <Button sx={stylePXt1} variant="contained" onClick={() => setValueLavel2('1')}>
              <b>Основной:</b>
            </Button>
            {MenuCrossRoad()}
          </Stack>
        </Box>
        <TabPanel value="1">
          <PointsMainScr
            open={isOpen}
            ws={props.ws}
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
                  ws={props.ws}
                  xctrll={props.xctrll}
                  xtt={xtProps}
                  crossroad={crossRoad}
                  setPoint={props.setPoint}
                  saveXt={props.saveXt}
                  calc={props.calc}
                  calcDeb={props.calcDeb}
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
