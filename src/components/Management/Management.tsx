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

const Management = () => {
  const styleMgl = {
    padding: 1,
    margin: 1,
    marginLeft: -0.5,
    marginRight: 0,
    marginTop: 0.5,
    marginBottom: 0,
    border: 0,
  };

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

  return (
    <Box sx={{ fontSize: 12, marginTop: -3, marginLeft: -1, marginRight: -4 }}>
      <Grid container sx={{ marginLeft: -3 }}>
        <ManagementLeftGrid />
        <Grid item xs>
          <Grid container>
            <FourKnops />
            <Grid item xs={12} sx={styleMgl}>
              Всего ДК 2 на связи 0.00% подчинены 0.00% <b>Назначен ВР Выполняется ХТ</b>
            </Grid>
            <ManagementRightGrid03 />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Management;
