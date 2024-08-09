export const styleEndInf = {
  fontSize: 11,
  position: "absolute",
  top: "0%",
  left: "auto",
  right: "0%",
  height: "15px",
  maxWidth: "2%",
  minWidth: "2%",
  color: "black",
};

export const styleBackdropArea = {
  color: "#fff",
  marginLeft: window.innerWidth * 0.274 + "px",
  marginRight: "1.7vh",
  marginTop: 11,
  marginBottom: "5.5vh",
  zIndex: (theme: any) => theme.zIndex.drawer + 1,
};

export const styleBackdropBaza = {
  color: "#fff",
  marginLeft: window.innerWidth * 0.355 + "px",
  marginRight: "1.7vh",
  marginTop: 11,
  marginBottom: "5vh",
  zIndex: (theme: any) => theme.zIndex.drawer + 1,
};
//====== Points =================================================================
export const stylePoint01 = {
  fontSize: 14.1,
  maxHeight: "22px",
  minHeight: "22px",
  bgcolor: "#BAE186", // тёмно-салатовый
  border: "1px solid #000",
  borderColor: "#93D145", // ярко-салатовый
  boxShadow: "6px -6px 6px #d4d4d4",
  color: "black",
  marginRight: 0.4,
  padding: "1px 0px 1px 0px",
  //textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
};
export const stylePoint02 = {
  fontSize: 13.5,
  maxHeight: "20px",
  minHeight: "20px",
  bgcolor: "#E6F5D6", // светло-салатовый
  border: "1px solid #000",
  borderColor: "#d4d4d4", // серый
  boxShadow: 2,
  color: "black",
  marginRight: 0.4,
  padding: "1px 0px 1px 0px",
};

export const stylePoint03 = {
  width: window.innerWidth - 21,
  fontSize: 12,
  marginTop: 0.5,
  marginLeft: 0.5,
};
//====== PointsMenuLevel1 =======================================================
export const stylePLevel01 = (dlStrMenu: number) => {
  const stylePLevel = {
    outline: "none",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: (dlStrMenu + 8) * 10,
    bgcolor: "background.paper",
    border: "1px solid #FFFFFF",
    borderRadius: 2,
    boxShadow: 24,
    p: 3,
  };
  return stylePLevel;
};

export const stylePLevel02 = {
  fontSize: 13.9,
  maxHeight: "20px",
  minHeight: "20px",
  color: "black",
  bgcolor: "#BAE186", // тёмно-салатовый
  border: "1px solid #000",
  borderColor: "#93D145", // ярко-салатовый
  borderRadius: 1,
  boxShadow: 6,
  marginRight: 1,
  marginTop: 0.7,
  textTransform: "unset !important",
};

export const stylePLevel03 = {
  fontSize: 13.9,
  maxHeight: "20px",
  minHeight: "20px",
  bgcolor: "#E6F5D6", // светло-салатовый
  border: "1px solid #000",
  borderColor: "#d4d4d4", // серый
  borderRadius: 1,
  boxShadow: 4,
  color: "black",
  marginRight: 1,
  marginTop: 0.7,
  textTransform: "unset !important",
};

export const stylePLevel04 = {
  fontSize: 14.5,
  height: "21px",
  color: "black",
  bgcolor: "#BAE186", // тёмно-салатовый
  border: "1px solid #000",
  borderColor: "#93D145", // ярко-салатовый
  borderRadius: 1,
  boxShadow: 8,
  marginRight: 0.4,
  marginTop: 0.7,
  textTransform: "unset !important",
  //textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
};

export const stylePLevel05 = {
  fontSize: 13.9,
  height: "20px",
  color: "black",
  bgcolor: "#E6F5D6", // светло-салатовый
  border: "1px solid #000",
  borderColor: "#d4d4d4", // серый
  borderRadius: 1,
  boxShadow: 2,
  marginRight: 0.4,
  marginTop: 0.7,
  textTransform: "unset !important",
};
//====== PointsMenuLevel2 =======================================================
export const styleXTl201 = {
  width: "70%",
  height: "83.5vh",
  marginTop: "2.5vh",
  marginLeft: -1.6,
  marginRight: -61,
  border: 0,
};

export const stylePLevel06 = {
  fontSize: 12.9,
  height: "22px",
  width: "60px",
  transform: "rotate(270deg)",
  bgcolor: "#BAE186", // тёмно-салатовый
  border: "1px solid #93D145", // ярко-салатовый
  borderRadius: 1,
  boxShadow: 8,
  color: "black",
  marginBottom: 5.9,
  textTransform: "unset !important",
  //textShadow: "1px 1px 1px rgba(0,0,0,0.3)",
};

export const stylePLevel07 = {
  fontSize: 12.5,
  height: "20px",
  width: "60px",
  transform: "rotate(270deg)",
  bgcolor: "#E6F5D6", // светло-салатовый
  border: "1px solid #d4d4d4", // серый
  borderRadius: 1,
  boxShadow: 2,
  color: "black",
  marginBottom: 5.9,
  textTransform: "unset !important",
};
//====== PointsLevel2Baza =======================================================
export const styleXTG00 = {
  fontSize: 11,
  borderBottom: "1px solid #d4d4d4", // серый
  padding: 0.3,
  textAlign: "center",
};

export const styleXTG01 = {
  fontSize: 11,
  borderRight: "1px solid #d4d4d4", // серый
  borderBottom: "1px solid #d4d4d4", // серый
  padding: 0.3,
  textAlign: "center",
};

export const styleXTG011 = {
  fontSize: 11,
  borderRight: "1px solid #d4d4d4", // серый
  borderBottom: "1px solid #d4d4d4", // серый
  padding: 0.3,
  textAlign: "center",
};

export const styleXTG021 = {
  fontSize: 11,
  borderBottom: "1px solid #d4d4d4", // серый
  padding: 0.7,
  textAlign: "center",
};

export const styleXTG02 = {
  fontSize: 11,
  borderBottom: "1px solid #d4d4d4", // серый
  padding: 0.7,
  textAlign: "center",
};

export const styleXTG03 = {
  //bgcolor: "#F1F5FB", // светло серый
  background: "linear-gradient(160deg, #F1F5FB 63%, #D0DEF0 )",
  marginTop: "0.5vh",
  border: "1px solid #d4d4d4", // серый
  height: "32.6vh", // 33
  borderRadius: 1,
  boxShadow: 12,
};

export const styleXTG04 = {
  height: "85.7vh",
  //bgcolor: "#BBBBBB", // серый
  //background: 'linear-gradient(160deg, #F1F5FB 63%, #D0DEF0 )',
  //border: "1px solid #BBBBBB", // серый
  marginLeft: 0.5,
  borderRadius: 1,
  boxShadow: 12,
};

export const styleXTG05 = {
  marginTop: -3.0,
  height: "3vh",
  textAlign: "right",
};

export const styleBut01 = {
  fontSize: 10,
  marginTop: -0.3,
  maxHeight: "15px",
  minHeight: "15px",
  maxWidth: "205px",
  minWidth: "205px",
  // backgroundColor: '#FFFBE5', // молоко
  backgroundColor: "#E9F5D8", // салатовый
  color: "black",
  textTransform: "unset !important",
};

export const styleBut02 = {
  fontSize: 12.9,
  fontWeight: 600,
  maxHeight: "21px",
  minHeight: "21px",
  maxWidth: "33px",
  minWidth: "33px",
  color: "black",
  padding: "1px 0px 0px 0px",
  bgcolor: "#E6F5D6", // светло-салатовый
  border: "1px solid #000",
  borderColor: "#d4d4d4", // серый
  borderRadius: 1,
  boxShadow: 1,
  textTransform: "unset !important",
};

export const styleBut021 = {
  fontSize: 14.0,
  fontWeight: 700,
  maxHeight: "21px",
  minHeight: "21px",
  maxWidth: "33px",
  minWidth: "33px",
  color: "black",
  bgcolor: "#BAE186", // тёмно-салатовый
  border: "1px solid #000",
  borderColor: "#93D145", // ярко-салатовый
  borderRadius: 1,
  boxShadow: 12,
  textTransform: "unset !important",
};

export const styleBut03 = {
  fontSize: 13.5,
  marginTop: -0.5,
  maxHeight: "21px",
  minHeight: "21px",
  maxWidth: "193px",
  minWidth: "193px",
  bgcolor: "#E6F5D6", // светло-салатовый
  border: "1px solid #000",
  borderColor: "#d4d4d4", // серый
  borderRadius: 1,
  boxShadow: 6,
  color: "black",
  textTransform: "unset !important",
};

export const styleModalEnd = {
  position: "absolute",
  top: "0%",
  left: "auto",
  right: "-0%",
  height: "21px",
  maxWidth: "2%",
  minWidth: "2%",
  color: "black",
};

export const styleSetInf = {
  outline: "none",
  fontSize: 17,
  position: "absolute",
  left: "50%",
  top: "36%",
  transform: "translate(-50%, -50%)",
  width: 270,
  bgcolor: "background.paper",
  border: "1px solid #FFFFFF",
  borderRadius: 1,
  boxShadow: 24,
  p: 1.5,
};

export const styleSetInff = {
  outline: "none",
  fontSize: 17,
  position: "absolute",
  left: "50%",
  top: "36%",
  transform: "translate(-50%, -50%)",
  width: 380,
  bgcolor: "background.paper",
  border: "1px solid #FFFFFF",
  borderRadius: 1,
  boxShadow: 24,
  p: 1.5,
};

export const styleInpName = {
  "& > :not(style)": {
    m: 0,
    width: "27ch",
    bgcolor: "#FFFBE5",
    border: "1px solid #000",
    borderColor: "#d4d4d4", // серый
    borderRadius: 1,
    boxShadow: 6,
  },
};

export const styleInpArg = {
  "& > :not(style)": {
    width: "12ch",
    marginTop: 0.5,
    bgcolor: "#FFFBE5",
    borderColor: "#d4d4d4", // серый
    borderRadius: 1,
    boxShadow: 6,
  },
};
export const styleInpTime = {
  "& > :not(style)": {
    width: "2.5ch",
    maxHeight: "21px",
    minHeight: "21px",
    bgcolor: "#FFFBE5",
    border: "1px solid #000",
    borderColor: "#d4d4d4", // серый
    borderRadius: 1,
    boxShadow: 6,
  },
};

export const styleInpKnop = {
  marginTop: 1,
  maxHeight: "21px",
  minHeight: "21px",
  color: "black",
  padding: "2px 8px 0px 8px",
  bgcolor: "#E6F5D6", // светло-салатовый
  border: "1px solid #d4d4d4", // серый
  borderRadius: 1,
  boxShadow: 6,
  textAlign: "center",
  textTransform: "unset !important",
};
//====== PointsLevel2BazaDiogram ================================================
export const PointInfoStrStyle = (mt01: string, ml01: string) => {
  const stylePointInf = {
    fontSize: 10.5,
    position: "absolute",
    marginTop: mt01,
    marginLeft: ml01,
    textAlign: "right",
    width: "69px",
  };
  return stylePointInf;
};

export const PointInfoDirStyle = (mt01: string, ml01: string, fs: number) => {
  const stylePointInf = {
    fontSize: fs,
    position: "absolute",
    marginTop: mt01,
    marginLeft: ml01,
    textAlign: "right",
    width: "132px",
  };
  return stylePointInf;
};

export const PointInfoDirRotStyle = (
  mt01: string,
  ml01: string,
  fs: number
) => {
  const stylePointInf = {
    fontSize: fs,
    position: "absolute",
    marginTop: mt01,
    marginLeft: ml01,
    transform: "rotate(270deg)",
    textAlign: "right",
    width: "128px",
  };
  return stylePointInf;
};
//====== PointsLevel2Area =======================================================
export const styleXTG035 = {
  background: "linear-gradient(160deg, #F1F5FB 63%, #D0DEF0 )",
  border: "1px solid #d4d4d4", // серый
  height: "65.8vh",
  borderRadius: 1,
  boxShadow: 12,
};

export const styleXTG045 = {
  height: "85.8vh",
  bgcolor: "#BBBBBB", // серый
  border: 1,
  marginLeft: 0.5,
  borderRadius: 1,
  borderColor: "#BBBBBB", // серый
  boxShadow: 12,
};

export const styleBoxForm = {
  "& > :not(style)": {
    backgroundColor: "#FFFBE5", // молоко
    border: "1px solid #000",
    borderColor: "#d4d4d4", // серый
    borderRadius: 1,
    boxShadow: 6,
    marginTop: "0px",
    marginLeft: "-0px",
    width: "63px",
  },
};
//====== PointsMainScrGrid1 =====================================================
export const styleXTGHeader = {
  bgcolor: "#B8CBB9", // серо-салатовый
  borderColor: "#C0C0C0",
  borderTopLeftRadius: 3,
  borderTopRightRadius: 3,
};

export const styleXTG102 = {
  borderBottom: "1px solid #d4d4d4", // серый
  padding: 0.7,
  textAlign: "center",
};

export const styleXTG103 = {
  borderRight: "1px solid #d4d4d4", // серый
  borderBottom: "1px solid #d4d4d4", // серый
  padding: 0.7,
  textAlign: "center",
};

export const styleXTG104 = {
  fontSize: 14.5,
  background: "linear-gradient(160deg, #F1F5FB 63%, #D0DEF0 )",
  border: "1px solid #d4d4d4", // серый
  borderRadius: 1,
  margin: -1,
  boxShadow: 12,
};

export const styleXTG105 = {
  fontSize: 11,
  borderRight: "1px solid #d4d4d4", // серый
  backgroundColor: "#E5E5E5",
  textAlign: "center",
};
//====== PointsMainScrGrid2 =====================================================
export const styleXTGrid = {
  background: "linear-gradient(160deg, #F1F5FB 63%, #D0DEF0 )",
  fontSize: 14.5,
  margin: -1,
  borderRadius: 1,
  boxShadow: 12,
};

export const styleXTGl02 = {
  borderBottom: "1px solid #d4d4d4", // серый
  padding: 0.7,
  textAlign: "center",
};

export const styleXTGl021 = {
  borderBottom: "1px solid #d4d4d4", // серый
  padding: 0.7,
  textAlign: "center",
};

export const styleXTGl05 = {
  fontSize: 11,
  borderColor: "primary.main",
  backgroundColor: "#E5E5E5",
  textAlign: "center",
};

export const styleXTGl06 = {
  color: "#5B1080", // сиреневый
  textAlign: "center",
  textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
};
//====== PointsLevel2Calc =======================================================
export const styleXTC011 = {
  fontSize: 11,
  borderRight: "1px solid #d4d4d4", // серый
  borderBottom: "1px solid #d4d4d4", // серый
  padding: 0.2,
  textAlign: "center",
};

export const styleXTC01 = {
  fontSize: 11,
  borderRight: "1px solid #d4d4d4", // серый
  borderBottom: "1px solid #d4d4d4", // серый
  padding: 0.2,
  backgroundColor: "#e4eef7", // светло-голубой
  textAlign: "center",
};

export const styleXTC02 = {
  fontSize: 11,
  borderBottom: "1px solid #d4d4d4", // серый
  padding: 0.4,
  textAlign: "center",
  bgcolor: "#B8CBB9", // серо-салатовый
};

export const styleXTC03 = {
  bgcolor: "#F1F5FB", // светло серый
  border: "1px solid #d4d4d4", // серый
  borderRadius: 1,
  boxShadow: 12,
};

export const styleXTC033 = {
  background: "linear-gradient(160deg, #F1F5FB 63%, #D0DEF0 )",
  border: "1px solid #d4d4d4", // серый
  borderRadius: 1,
  boxShadow: 12,
};
//====== PointsMainScr ==========================================================
export const styleXt02 = {
  bgcolor: "#F1F5FB", // светло серый
  border: "1px solid #d4d4d4", // серый
  borderRadius: 1,
  padding: 1,
  marginLeft: 0.5,
  marginRight: 1,
  boxShadow: 12,
  textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
};

export const styleXt03 = {
  padding: 1,
  margin: 0.5,
  marginTop: 0,
  border: 0,
};

export const styleXt04 = {
  borderRight: "1px solid #d4d4d4", // серый
  borderRadius: 1,
  padding: 1,
  margin: 1,
  marginTop: -0.5,
  marginLeft: -1,
  height: "69%",
};

export const styleXt05 = {
  borderRight: "1px solid #d4d4d4", // серый
  borderRadius: 1,
  padding: 1,
  margin: 1,
  marginTop: -0.5,
  marginLeft: -0.5,
  marginRight: 1.5,
  height: "69%",
};
//===============================================================================
