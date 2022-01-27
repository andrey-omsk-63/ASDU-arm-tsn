import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import ManagementLeftGrid from './grid/ManagLeftGrid';
import ManagementRightGrid03 from './grid/ManagRightGrid03';
import ManagementKnobPK from './modal/ManagKnobPK';
import ManagementKnobSK from './modal/ManagKnobSK';
import ManagementKnobNK from './modal/ManagKnobNK';
import ManagementKnobXT from './modal/ManagKnobXT';

import axios from 'axios';

import { Tflight } from '../../interfaceMNG.d';

const Management = () => {
  const styleMgl = {
    padding: 1,
    margin: 1,
    marginLeft: -0.5,
    marginTop: 0.5,
    marginBottom: 0,
  };

  const [points, setPoints] = React.useState<Array<Tflight>>([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const ipAdress: string = 'http://localhost:3000/getAreaOtl.json';

  const FourKnops = () => {
    return (
      <Grid item xs={12} sx={{ border: 0, marginLeft: -0.5, marginTop: 1 }}>
        <Stack direction="row">
          <ManagementKnobPK />

          <ManagementKnobSK />

          <ManagementKnobNK />

          <ManagementKnobXT />
        </Stack>
      </Grid>
    );
  };

  React.useEffect(() => {
    axios.get(ipAdress).then(({ data }) => {
      setPoints(data.data.tflight);
      setIsOpen(true);
    });
  }, [ipAdress]);

  return (
    <Box sx={{ fontSize: 12, marginTop: -3, marginLeft: -1, marginRight: -6 }}>
      <Grid container sx={{ marginLeft: -3 }}>
        <ManagementLeftGrid open={isOpen} tflightt={points} />
        <Grid item xs>
          <Grid container>
            <FourKnops />
            <Grid item xs={12} sx={styleMgl}>
              Всего ДК 2 на связи 0.00% подчинены 0.00% <b>Назначен ВР Выполняется ХТ</b>
            </Grid>
            <ManagementRightGrid03 open={isOpen} tflightt={points} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Management;
