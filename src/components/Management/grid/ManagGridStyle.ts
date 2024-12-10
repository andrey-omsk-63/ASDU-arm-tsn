export const massEtalon = {
  areaNum: -1,
  subareaNum: -1,
  koldk: 1,
  sost: 0,
  podch: 0,
  isPK: false,
  isCK: false,
  isNK: false,
  isXT: false,
  releaseXT: false,
};

// Цвета для дерева  регион -> район -> подрайон:
// ничего не назначено
export const colorSalat = "#E6F5D6"; // светло-салатовый
export const colorCrayola = "#82e94a"; // ярко-салатовый
// назначено ПК
export const colorCuan = "#D7EDFF"; // светло-голубой
export const colorSky = "#6ABCFF"; // ярко-голубой
// назначено СК
export const colorGolden = "#FFFAC6"; // золотистый
export const colorBrightYell = "#FEE500"; // ярко-жёлтый
// назначено НК
export const colorPinkish = "#F8CBDC"; // светло-розовый
export const colorAmaranth = "#F097B9"; // ярко-розовый
// назначено XT
export const colorApricot = "#FDE8D9"; // абрикосовый
export const colorBronze = "#D3AC7C"; // желто-коричневый


//====== ManagementRightGrid ====================================================
export const styleMgl = {
  border: 0,
  padding: "1vh",
  height: "4vh",
  marginLeft: -0.5,
  marginTop: "0.5vh",
  marginBottom: 0,
};

export const styleMRG01 = {
  borderBottom: "1px solid #d4d4d4", // серый
  padding: 0.4,
};

export const styleMRG02 = {
  borderRight: "1px solid #d4d4d4", // серый
  borderBottom: "1px solid #d4d4d4", // серый
  padding: 0.4,
};

export const styleMRG02Center = {
  borderRight: "1px solid #d4d4d4", // серый
  borderBottom: "1px solid #d4d4d4", // серый
  padding: 0.4,
  textAlign: "center",
};

export const styleMRGHeader = {
  bgcolor: "#B8CBB9", // серо-салатовый
  borderColor: "#C0C0C0",
  borderTopLeftRadius: 3,
  borderTopRightRadius: 3,
};

export const styleMRG03 = {
  borderBottom: "1px solid #d4d4d4", // серый
  height: "3vh",
  textAlign: "center",
  paddingTop: "0.4vh",
};

export const styleMRG04 = {
  background: "linear-gradient(180deg, #F1F5FB 59%, #CBDAEF )",
  border: "1px solid #d4d4d4", // серый
  borderRadius: 1,
  marginTop: "0.5vh",
  height: "85.1vh",
  boxShadow: 12,
};
//====== ManagementLeftGrid =====================================================
export const styleMG01 = {
  border: "1px solid #d4d4d4", // серый
  borderRadius: 1,
  background: "linear-gradient(160deg, #F1F5FB 63%, #D0DEF0 )",
  marginTop: "0.5vh",
  marginLeft: 0.5,
  marginRight: 0.5,
  height: "94.5vh",
  boxShadow: 12,
};

export const styleMG03 = {
  fontSize: 14,
  padding: 0.3,
};

export const styleButSubArea01 = (coler: string) => {
  const styleButSubArea00 = {
    fontSize: 13.3,
    marginTop: 0.2,
    height: "20px",
    color: "black",
    //bgcolor: "#BAE186", // тёмно-салатовый
    bgcolor: coler,
    border: "1px solid #000",
    borderColor: "#93D145", // ярко-салатовый
    borderRadius: 1,
    boxShadow: 10,
    textTransform: "unset !important",
  };
  return styleButSubArea00;
};

export const styleButSubArea02 = (coler: string) => {
  const styleButSubArea00 = {
    fontSize: 12,
    marginTop: 0.2,
    height: "18px",
    color: "black",
    //bgcolor: "#E6F5D6", // светло-салатовый
    bgcolor: coler,
    border: "1px solid #000",
    borderColor: "#d4d4d4", // серый
    borderRadius: 1,
    boxShadow: 1,
    textTransform: "unset !important",
  };
  return styleButSubArea00;
};

export const styleButArea01 = (coler: string) => {
  const styleButArea00 = {
    fontSize: 12.5,
    marginTop: 0.3,
    height: "21px",
    color: "black",
    //bgcolor: "#BAE186", // тёмно-салатовый
    bgcolor: coler,
    border: "1px solid #000",
    borderColor: "#93D145", // ярко-салатовый
    borderRadius: 1,
    boxShadow: 10,
    textTransform: "unset !important",
  };
  return styleButArea00;
};

export const styleButArea02 = (coler: string) => {
  const styleButArea00 = {
    fontSize: 12,
    marginTop: 0.3,
    height: "20px",
    color: "black",
    //bgcolor: "#E6F5D6", // светло-салатовый
    bgcolor: coler,
    border: "1px solid #000",
    borderColor: "#d4d4d4", // серый
    borderRadius: 1,
    boxShadow: 1,
    textTransform: "unset !important",
  };
  return styleButArea00;
};

export const styleButRegion01 = (ht: number, coler: string) => {
  const styleButReg1 = {
    fontSize: 14,
    marginTop: 0.5,
    marginRight: "5px",
    height: 21,
    //bgcolor: "#BAE186", // тёмно-салатовый
    bgcolor: coler,
    border: "1px solid #93D145", // ярко-салатовый
    color: "#5B1080",
    borderRadius: 1,
    boxShadow: 10,
    textTransform: "unset !important",
  };
  const styleButReg2 = {
    fontSize: 14,
    marginTop: 0.5,
    marginRight: "5px",
    //bgcolor: "#BAE186", // тёмно-салатовый
    bgcolor: coler,
    border: "1px solid #93D145", // ярко-салатовый
    color: "#5B1080",
    borderRadius: 1,
    boxShadow: 10,
    textTransform: "unset !important",
  };
  return ht === 20 ? styleButReg1 : styleButReg2;
};

export const styleButRegion02 = (ht: number, coler: string) => {
  const styleButReg1 = {
    fontSize: 14,
    marginTop: 0.5,
    marginRight: "5px",
    height: 21,
    //bgcolor: "#E6F5D6", // светло-салатовый
    bgcolor: coler,
    color: "#5B1080",
    border: "1px solid #000",
    borderColor: "#d4d4d4", // серый
    borderRadius: 1,
    boxShadow: 1,
    textTransform: "unset !important",
  };
  const styleButReg2 = {
    fontSize: 14,
    marginTop: 0.5,
    marginRight: "5px",
    //bgcolor: "#E6F5D6", // светло-салатовый
    bgcolor: coler,
    color: "#5B1080",
    border: "1px solid #000",
    borderColor: "#d4d4d4", // серый
    borderRadius: 1,
    boxShadow: 1,
    textTransform: "unset !important",
  };
  return ht === 20 ? styleButReg1 : styleButReg2;
};
//====== ManagementKnob =========================================================
export const stylePK = {
  outline: "none",
  position: "absolute",
  top: "48%",
  left: "30%",
  transform: "translate(-50%, -50%)",
  width: 77,
  bgcolor: "background.paper",
  border: "1px solid #d4d4d4", // серый
  borderRadius: 1,
  boxShadow: 24,
  p: 5,
};

export const styleModalEnd = {
  position: "absolute",
  top: "0%",
  left: "auto",
  right: "-0%",
  height: "21px",
  maxWidth: "2%",
  minWidth: "2%",
  color: "#5B1080", // сиреневый
  textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
};

export const styleSoob = {
  fontSize: 11,
  backgroundColor: "#F1F3F4", // светло-серый
  color: "#5B1080", // светло-серый
  textAlign: "center",
};

export const styleSoobPusto = {
  backgroundColor: "#F1F3F4", // светло-серый
  color: "#F1F3F4", // сиреневый
  //border: "1px solid #000",
};

export const styleBatMenu = {
  fontSize: 12.9,
  marginTop: 0.75,
  color: "black",
  bgcolor: "#E6F5D6", // светло-салатовый
  border: "1px solid #000",
  borderColor: "#d4d4d4", // серый
  borderRadius: 1,
  boxShadow: 6,
  textTransform: "unset !important",
};

export const styleBatKnop01 = (coler: string) => {
  const styleBatKnop = {
    fontSize: 11,
    height: "3.5vh",
    color: "black",
    //bgcolor: "#BAE186", // тёмно-салатовый
    bgcolor: coler,
    border: "1px solid #d4d4d4", // серый
    borderRadius: 1,
    boxShadow: 8,
    marginRight: 1,
  };
  return styleBatKnop;
};

export const styleBatKnop02 = (coler: string) => {
  const styleBatKnop = {
    fontSize: 11,
    height: "3.5vh",
    color: "black",
    //bgcolor: "#E6F5D6", // светло-салатовый
    bgcolor: coler,
    border: "1px solid #d4d4d4", // серый
    borderRadius: 1,
    boxShadow: 1,
    marginRight: 1,
  };
  return styleBatKnop;
};
//====== ManagementKnobXT =======================================================
export const stylePKXt = {
  outline: "none",
  textAlign: "center",
  position: "absolute",
  top: "32%",
  left: "33%",
  transform: "translate(-50%, -50%)",
  width: 164,
  bgcolor: "background.paper",
  border: "1px solid #d4d4d4", // серый
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
};

export const styleBatMenuXt = {
  fontSize: 12.9,
  textAlign: "center",
  color: "black",
  bgcolor: "#E6F5D6", // светло-салатовый
  border: "1px solid #000",
  borderColor: "#d4d4d4", // серый
  borderRadius: 1,
  boxShadow: 6,
  marginTop: 1,
  width: "121px",
  textTransform: "unset !important",
};

export const styleMenuXt = {
  fontSize: 12.9,
  textAlign: "center",
  color: "black",
  bgcolor: "#F1F3F4", // светло-серый
  border: "1px solid #000",
  borderColor: "#d4d4d4", // серый
  borderRadius: 1,
  boxShadow: 1,
  marginTop: 1,
  marginLeft: 2.6,
  width: "121px",
  padding: "6px 0px 9px 0px",
};

export const styleXtSoob = {
  padding: "0px 0px 6px 0px",
  textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
};
//===============================================================================
