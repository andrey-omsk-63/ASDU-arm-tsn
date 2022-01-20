import * as React from 'react';
import Grid from '@mui/material/Grid';

const styleMG02 = {
  borderRight: 1,
  borderBottom: 1,
  textAlign: 'center',
  borderColor: 'primary.main',
  padding: 0.4,
  backgroundColor: '#C0C0C0',
};

const ManagementLeftGrid = () => {
  return (
    <>
      <Grid
        item
        xs={3}
        sx={{
          border: 1,
          borderRadius: 1,
          borderColor: 'primary.main',
          margin: 1.2,
          height: '94.6vh',
        }}>
        <Grid container>
          <Grid item xs={6.5} sx={styleMG02}>
            Выбор
          </Grid>
          <Grid item xs={5.5} sx={styleMG02}>
            Наименование
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ManagementLeftGrid;
