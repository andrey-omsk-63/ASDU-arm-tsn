import * as React from 'react';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const AppWriteToAllFileForXT = (props: { setOpen: Function }) => {
  //== Piece of Redux ======================================
  let datestat = useSelector((state: any) => {
    const { statsaveReducer } = state;
    return statsaveReducer.datestat;
  });
  //const dispatch = useDispatch();
  //========================================================
  const [openSet, setOpenSet] = React.useState(true);

  let nameFile = '.' + new Date().getDate();
  let dat: any = new Date().getMonth() + 1;
  if (dat < 10) dat = '0' + dat;
  nameFile += dat + new Date().getFullYear().toString().slice(2);
  dat = new Date().getHours();
  if (dat < 10) dat = '0' + dat;
  nameFile += dat;
  dat = new Date().getMinutes();
  if (dat < 10) dat = '0' + dat;
  nameFile += dat;
  nameFile = 'XT.' + datestat.xtName + nameFile;

  const styleModalEnd = {
    position: 'absolute',
    top: '0%',
    left: 'auto',
    right: '-0%',
    height: '21px',
    maxWidth: '2%',
    minWidth: '2%',
    color: 'black',
  };

  const styleSetWrite = {
    fontSize: 16,
    outline: 'none',
    position: 'relative',
    marginTop: '12vh',
    marginLeft: '40vh',
    marginRight: 'auto',
    width: '33%',
    bgcolor: 'background.paper',
    border: '3px solid #000',
    borderColor: 'primary.main',
    borderRadius: 2,
    boxShadow: 24,
  };

  const styleModalMenu = {
    maxHeight: '21px',
    minHeight: '21px',
    backgroundColor: '#E6F5D6',
    color: 'black',
    marginRight: 1,
    marginBottom: 2,
    textTransform: 'unset !important',
    textAlign: 'center',
  };

  const handleDownloadCsv = () => {
    const element = document.createElement('a');
    let textFile = ' ;Прямой;Обратный;КС на ДК;Примечание;\n';
    textFile += datestat.xtCsv;
    const file = new Blob(['\ufeff', textFile], {
      type: 'text/csv;charset=utf-8',
    });
    element.href = URL.createObjectURL(file);
    element.download = nameFile + '.csv';
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  const handleDownloadTxt = () => {
    const element = document.createElement('a');
    let textFile = '————————————————————————————————————————————————\n';
    textFile += '      Прямой Обратный КС на ДК     Примечание\n';
    textFile += '————————————————————————————————————————————————\n';
    textFile += datestat.xtTxt;
    const file = new Blob(['\ufeff', textFile], {
      type: 'text/txt;charset=utf-8',
    });
    element.href = URL.createObjectURL(file);
    element.download = nameFile + '.txt';
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  const handleDownloadPdf = async () => {
    if (datestat.xtGraf.current) {
      const element = datestat.xtGraf.current;
      const canvas = await html2canvas(element);
      const data = canvas.toDataURL('image/png');
      let pdf = new jsPDF('l', 'pt', 'dl');
      let imgProperties = pdf.getImageProperties(data);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
      pdf.addImage(data, 'PNG', 0, 69, pdfWidth, pdfHeight + 33);
      pdf.save(nameFile + '.pdf');
    }
  };

  const handleCloseSet = () => {
    props.setOpen(false);
    setOpenSet(false);
  };

  const handleClose = (mode: number) => {
    if (mode) {
      handleDownloadTxt();
    } else {
      handleDownloadCsv();
    }
    handleDownloadPdf();
    handleCloseSet();
  };

  return (
    <Modal open={openSet} onClose={handleCloseSet} hideBackdrop>
      <Box sx={styleSetWrite}>
        <Button sx={styleModalEnd} onClick={handleCloseSet}>
          &#10006;
        </Button>
        <Box sx={{ marginTop: 1, textAlign: 'center' }}>
          <b>Формат сохранения таблицы:</b>
        </Box>
        <Box sx={{ marginTop: 2, textAlign: 'center' }}>
          <Button sx={styleModalMenu} onClick={() => handleClose(0)}>
            Лист Microsoft Excel
          </Button>
          <Button sx={styleModalMenu} onClick={() => handleClose(1)}>
            Tекстовый документ.txt
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AppWriteToAllFileForXT;