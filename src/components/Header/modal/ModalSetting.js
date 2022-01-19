import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';

//import axios from 'axios';

let formSett = [];
// const [formSett, setFormSett] = React.useState([

formSett[0] = {
  ipServer: '192.168.115.115',
  namePort: 5432,
  nameMen: 'Pupkin',
  nameBD: 'Controlled',
  passw: 'bomba',
  codReg: 55,
  statistics: true,
};

//]);

const ModalSetting = () => {
  const [openSet, setOpenSet] = React.useState(false);
  const handleOpenSet = () => setOpenSet(true);
  const handleCloseSet = (event, reason) => {
    console.log('1111', event)
    if (reason !== 'backdropClick') setOpenSet(false);
  };
  const styleSet = {
    position: 'absolute',
    top: '48%',
    right: '12%',
    transform: 'translate(-50%, -50%)',
    width: 360,
    bgcolor: 'background.paper',
    border: '3px solid #000',
    borderRadius: 2,
    boxShadow: 24,
    textAlign: 'center',
    p: 3,
  };

  const InpPassw = () => {
    const [values, setValues] = React.useState({
      amount: '',
      password: formSett[0].passw,
      weight: '',
      weightRange: '',
      showPassword: false,
    });

    const handleChange = (prop) => (event) => {
      console.log('3333', typeof prop, typeof event)
      setValues({ ...values, [prop]: event.target.value });
      formSett[0].passw = event.target.value;
    };

    const handleClickShowPassword = () => {
      setValues({
        ...values,
        showPassword: !values.showPassword,
      });
    };

    const handleMouseDownPassword = (event) => {
      console.log('2222', event)
      event.preventDefault();
    };

    return (
      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" size="small">
        <InputLabel htmlFor="outlined-adornment-password">Пароль:</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={values.showPassword ? 'text' : 'password'}
          value={values.password}
          onChange={handleChange('password')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end">
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Пароль"
        />
      </FormControl>
    );
  };

  const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="000.000.000.000"
        inputRef={ref}
        onAccept={(value) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  });

  TextMaskCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  const InpIpServer = () => {
    const [values, setValues] = React.useState({
      textmask: formSett[0].ipServer,
      numberformat: '1320',
    });

    const handleChange = (event) => {
      setValues({ ...values, [event.target.name]: event.target.value });
      formSett[0].ipServer = event.target.value;
    };

    return (
      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" size="small">
        <InputLabel htmlFor="formatted-text-mask-input">IP Cервер:</InputLabel>
        <OutlinedInput
          value={values.textmask}
          onChange={handleChange}
          name="textmask"
          id="formatted-text-mask-input"
          inputComponent={TextMaskCustom}
          label="IP Cервер:"
        />
      </FormControl>
    );
  };

  const InpNamePort = () => {
    const [valuen, setValuen] = React.useState(formSett[0].namePort);
    const handleChange = (event) => {
      setValuen(event.target.value);
      formSett[0].namePort = Number(event.target.value);
    };
    return (
      <TextField
        size="small"
        label="Порт:"
        type="number"
        value={valuen}
        onChange={handleChange}
        variant="outlined"
      />
    );
  };

  const InpNameBD = () => {
    const [valuen, setValuen] = React.useState(formSett[0].nameBD);
    const handleChange = (event) => {
      setValuen(event.target.value);
      formSett[0].nameBD = event.target.value;
    };
    return (
      <TextField
        size="small"
        label="Имя базы данных:"
        value={valuen}
        onChange={handleChange}
        variant="outlined"
      />
    );
  };

  const InpNameMen = () => {
    const [valuen, setValuen] = React.useState(formSett[0].nameMen);
    const handleChange = (event) => {
      setValuen(event.target.value);
      //formSett[0].nameMen = event.target.value.toLowerCase();
      formSett[0].nameMen = event.target.value;
    };
    return (
      <TextField
        label="Пользователь:"
        value={valuen}
        onChange={handleChange}
        size="small"
        variant="outlined"
      />
    );
  };

  const InpCodReg = () => {
    const [valuen, setValuen] = React.useState(formSett[0].codReg);
    const handleChange = (event) => {
      setValuen(event.target.value);
      formSett[0].codReg = Number(event.target.value);
    };
    return (
      <TextField
        size="small"
        type="number"
        inputProps={{ min: 1, max: 799 }}
        value={valuen}
        onChange={handleChange}
        label="Код региона:"
        variant="outlined"
      />
    );
  };

  const InpStatistics = () => {
    const [checked, setChecked] = React.useState(formSett[0].statistics);
    const handleChange = (event) => {
      setChecked(event.target.checked);
      formSett[0].statistics = event.target.checked;
    };
    return (
      <FormControlLabel
        label="Отображать статистику"
        control={<Checkbox checked={checked} onChange={handleChange} />}
      />
    );
  };

  const ChangeParamSett = () => {
    const [openRes, setOpenRes] = React.useState(false);
    const handleOpenRes = () => setOpenRes(true);
    const handleCloseRes = () => setOpenRes(false);
    const styleRes = {
      position: 'absolute',
      top: '28%',
      right: '15.5%',
      transform: 'translate(-50%, -50%)',
      width: 250,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      borderRadius: 2,
      boxShadow: 24,
      textAlign: 'center',
      p: 4,
    };

    return (
      <Box>
        <Button variant="contained" onClick={handleOpenRes}>
          Внести изменения
        </Button>
        <Modal
          open={openRes}
          onClose={handleCloseRes}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={styleRes}>
            <h3>Вы в этом уверены?</h3>
            <Stack sx={{ marginLeft: 5.5 }} direction="row" spacing={4}>
              <Button
                sx={{ backgroundColor: '#F1F3F4', color: 'black' }}
                variant="contained"
                onClick={handleCloseRes}>
                Да
              </Button>
              <Button
                sx={{ backgroundColor: '#F1F3F4', color: 'black' }}
                variant="contained"
                onClick={handleCloseRes}>
                Нет
              </Button>
            </Stack>
          </Box>
        </Modal>
      </Box>
    );
  };

  return (
    <Box>
      <Button
        color="inherit"
        variant="contained"
        sx={{ width: 180, marginTop: 1 }}
        onClick={handleOpenSet}>
        Настройка
      </Button>
      <Modal
        open={openSet}
        disableEnforceFocus
        onClose={handleCloseSet}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={styleSet}>
          <Button
            sx={{
              position: 'absolute',
              top: '0%',
              left: '88%',
              fontSize: 15,
            }}
            onClick={handleCloseSet}>
            &#10060;
          </Button>
          <Typography variant="h6">Настройка программы</Typography>
          <br />
          <Typography variant="subtitle1">Раздел БД</Typography>
          <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, width: '40ch' } }}
            noValidate
            autoComplete="off">
            <InpIpServer />
            <InpNamePort />
            <InpNameBD />
            <InpNameMen />
            <InpPassw />
            <InpCodReg />
            <InpStatistics />
          </Box>
          <br />
          <ChangeParamSett />
        </Box>
      </Modal>
    </Box>
  );
};

export default ModalSetting;
