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
  // marginLeft: window.innerWidth * 0.355 + "px",
  marginLeft: window.innerWidth * 0.355 + "px",
  marginRight: "1.7vh",
  marginTop: 11,
  marginBottom: "5vh",
  zIndex: (theme: any) => theme.zIndex.drawer + 1,
};
//====== PointsLevel2Baza =======================================================
export const styleXTG00 = {
  fontSize: 11,
  borderBottom: 1,
  borderColor: "primary.main",
  padding: 0.3,
  textAlign: "center",
};

export const styleXTG01 = {
  fontSize: 11,
  borderRight: 1,
  borderBottom: 1,
  borderColor: "primary.main",
  padding: 0.3,
  textAlign: "center",
};

export const styleXTG011 = {
  fontSize: 11,
  borderRight: 1,
  borderBottom: 1,
  borderColor: "primary.main",
  padding: 0.3,
  textAlign: "center",
};

export const styleXTG021 = {
  fontSize: 11,
  borderBottom: 1,
  borderColor: "primary.main",
  padding: 0.7,
  textAlign: "center",
  //backgroundColor: "#C0C0C0",
};

export const styleXTG02 = {
  fontSize: 11,
  //borderRight: 1,
  borderBottom: 1,
  borderColor: "primary.main",
  padding: 0.7,
  textAlign: "center",
  //backgroundColor: "#C0C0C0",
};

export const styleXTG03 = {
  bgcolor: "#F1F5FB", // светло серый
  marginTop: "0.5vh",
  border: 1,
  height: "32.6vh", // 33
  borderRadius: 1,
  borderColor: "primary.main",
  boxShadow: 12,
};

export const styleXTG04 = {
  height: "85.7vh",
  bgcolor: "#BBBBBB", // серый
  border: 1,
  marginLeft: 0.5,
  borderRadius: 1,
  borderColor: "#BBBBBB", // серый
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
  fontSize: 11,
  maxHeight: "21px",
  minHeight: "21px",
  maxWidth: "33px",
  minWidth: "33px",
  color: "black",
  bgcolor: "#E6F5D6", // светло-салатовый
  border: "1px solid #000",
  borderColor: "#d4d4d4", // серый
  borderRadius: 1,
  boxShadow: 1,
  textTransform: "unset !important",
};

export const styleBut021 = {
  fontSize: 11,
  maxHeight: "21px",
  minHeight: "21px",
  maxWidth: "33px",
  minWidth: "33px",
  color: "black",
  bgcolor: "#BAE186", // тёмно-салатовый
  border: "1px solid #000",
  borderColor: "#93D145", // ярко-салатовый
  borderRadius: 1,
  boxShadow: 6,
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
  border: "1px solid #000",
  borderColor: "primary.main",
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
  border: "1px solid #000",
  borderColor: "primary.main",
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
  bgcolor: "#E6F5D6", // светло-салатовый
  border: "1px solid #000",
  borderColor: "#d4d4d4", // серый
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

export const PointInfoDirStyle = (
  mt01: string,
  ml01: string,
  fs: number,
) => {
  const stylePointInf = {
    //border: 1,
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
  fs: number,
) => {
  const stylePointInf = {
    //border: 1,
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
  bgcolor: "#F1F5FB", // светло серый
  border: 1,
  //height: "85.8vh",
  height: "65.8vh",
  borderRadius: 1,
  borderColor: "primary.main",
  boxShadow: 12,
};

export const styleXTG045 = {
  height: '85.8vh',
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
  bgcolor: "#C0C0C0",
  borderColor: "#C0C0C0",
  borderTopLeftRadius: 3,
  borderTopRightRadius: 3,
};

export const styleXTG102 = {
  //borderRight: 1,
  borderBottom: 1,
  borderColor: "primary.main",
  padding: 0.7,
  textAlign: "center",
  //backgroundColor: "#C0C0C0",
};

export const styleXTG103 = {
  borderRight: 1,
  borderBottom: 1,
  borderColor: "primary.main",
  padding: 0.7,
  textAlign: "center",
};

export const styleXTG104 = {
  fontSize: 14.5,
  bgcolor: "#F1F5FB", // светло серый
  borderColor: "primary.main",
  borderRadius: 1,
  margin: -1,
  boxShadow: 12,
};

export const styleXTG105 = {
  fontSize: 11,
  borderRight: 1,
  borderColor: "primary.main",
  backgroundColor: "#E5E5E5",
  textAlign: "center",
};
//====== PointsMainScrGrid2 =====================================================
export const styleXTGrid = {
  bgcolor: "#F1F5FB", // светло серый
  fontSize: 14.5,
  margin: -1,
  borderRadius: 1,
  boxShadow: 12,
};

export const styleXTGl02 = {
  //borderRight: 1,
  borderBottom: 1,
  borderColor: "primary.main",
  padding: 0.7,
  textAlign: "center",
  //backgroundColor: "#C0C0C0",
};

export const styleXTGl021 = {
  borderBottom: 1,
  borderColor: "primary.main",
  padding: 0.7,
  textAlign: "center",
  //backgroundColor: "#C0C0C0",
};

export const styleXTGl05 = {
  fontSize: 11,
  //borderRight: 1,
  borderColor: "primary.main",
  backgroundColor: "#E5E5E5",
  textAlign: "center",
};
//====== PointsLevel2Calc =======================================================
export const styleXTC011 = {
  fontSize: 11,
  borderRight: 1,
  borderBottom: 1,
  borderColor: "primary.main",
  padding: 0.2,
  //backgroundColor: "#ffffff", // белый
  textAlign: "center",
};

export const styleXTC01 = {
  fontSize: 11,
  borderRight: 1,
  borderBottom: 1,
  borderColor: "primary.main",
  padding: 0.2,
  backgroundColor: "#e4eef7", // светло-голубой
  textAlign: "center",
};

export const styleXTC02 = {
  fontSize: 11,
  borderBottom: 1,
  borderColor: "primary.main",
  padding: 0.4,
  textAlign: "center",
  backgroundColor: "#C0C0C0",
};

export const styleXTC03 = {
  bgcolor: "#F1F5FB", // светло серый
  border: 1,
  borderRadius: 1,
  borderColor: "primary.main",
  boxShadow: 12,
};

export const styleXTC033 = {
  bgcolor: "#F1F5FB", // светло серый
  border: 1,
  borderRadius: 1,
  borderColor: "primary.main",
  //width: '99vh',
  height: "57.9vh",
  boxShadow: 12,
};
//====== PointsMainScr ==========================================================
export const styleXt02 = {
  bgcolor: "#F1F5FB", // светло серый
  border: 1,
  borderRadius: 1,
  borderColor: "primary.main",
  padding: 1,
  marginLeft: 0.5,
  marginRight: 1,
  boxShadow: 12,
};

export const styleXt03 = {
  padding: 1,
  margin: 0.5,
  marginTop: 0,
  border: 0,
};

export const styleXt04 = {
  border: 1,
  borderRadius: 1,
  borderColor: "primary.main",
  padding: 1,
  margin: 1,
  marginTop: -0.5,
  marginLeft: -1,
  height: "69%",
};

export const styleXt05 = {
  border: 1,
  borderRadius: 1,
  borderColor: "primary.main",
  padding: 1,
  margin: 1,
  marginTop: -0.5,
  marginLeft: -0.5,
  marginRight: 1.5,
  height: "69%",
};
//====== PointsMenuLevel2 =======================================================
export const styleXTl201 = {
  width: "70%",
  height: "83.5vh",
  marginTop: "2.5vh",
  marginLeft: -3,
  marginRight: -61,
  border: 0,
};
//===============================================================================
