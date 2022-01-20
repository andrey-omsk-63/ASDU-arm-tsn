import * as React from 'react';
import Grid from '@mui/material/Grid';

const ManagementRightGrid03 = () => {
  const styleMRG03 = {
    borderRight: 1,
    borderBottom: 1,
    borderColor: 'primary.main',
    padding: 0.4,
    textAlign: 'center',
    backgroundColor: '#C0C0C0',
  };

  const styleMRG04 = {
    border: 1,
    borderRadius: 1,
    borderColor: 'primary.main',
    marginTop: 0.5,
    marginLeft: -0.7,
    //marginRight: -0.5,
    height: '86.0vh',
  };

  return (
    <Grid item container>
      <Grid item xs={12} sx={styleMRG04}>
        <Grid item container>
          <Grid item xs={1} sx={styleMRG03}>
            №
          </Grid>

          <Grid item xs={1} sx={styleMRG03}>
            Район
          </Grid>

          <Grid item xs={4} sx={styleMRG03}>
            Устройства
          </Grid>

          <Grid item xs={3} sx={styleMRG03}>
            Текущее состояние
          </Grid>

          <Grid item xs={3} sx={styleMRG03}>
            Состояние ХТ
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ManagementRightGrid03;
