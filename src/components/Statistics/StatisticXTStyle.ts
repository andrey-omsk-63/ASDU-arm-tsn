export const colorsGraf = [
  "red",
  "orange",
  "black",

  "blue",
  "green",
  "Violet",

  "lime",
  "Silver",
  "teal",

  "YellowGreen",
  "purple",
  "",

  "Turquoise",
  "RosyBrown",
  "maroon",

  "Coral",
  "Aqua",
  "Tomato",

  "Pink",
  "Yellow",
];

export const styleBackdrop = {
  color: "#fff",
  marginLeft: "0.3vh",
  marginRight: "1.7vh",
  marginTop: "34vh",
  marginBottom: "4vh",
  zIndex: (theme: any) => theme.zIndex.drawer + 1,
};

export const styleSt1 = {
  fontSize: 14.1,
  maxHeight: "22px",
  minHeight: "22px",
  bgcolor: "#BAE186", // тёмно-салатовый
  border: "1px solid #000",
  borderColor: "#93D145", // ярко-салатовый
  boxShadow: "4px -6px 6px #d4d4d4",
  color: "black",
  marginRight: 0.4,
  padding: "1px 0px 1px 0px",
  //textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
};

export const styleSt11 = {
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

export const styleSt2 = {
  width: window.innerWidth - 21,
  fontSize: 12,
  marginTop: "-2vh",
  marginLeft: -2.4,
};

export const styleSt02 = {
  textIndent: 6,
  borderRight: "1px solid #d4d4d4", // серый
  borderBottom: "1px solid #d4d4d4", // серый
  fontSize: 12.9,
  lineHeight: 2,
};

export const styleSt03 = {
  textIndent: 6,
  borderRight: "1px solid #d4d4d4", // серый
  borderBottom: "1px solid #d4d4d4", // серый
  fontSize: 12.9,
  lineHeight: 2,
  backgroundColor: "#E6EEF5", // голубой
  textAlign: "center",
};

export const styleSt04 = {
  //textIndent: 6,
  borderRight: "1px solid #d4d4d4", // серый
  borderBottom: "1px solid #d4d4d4", // серый
  fontSize: 12.9,
  lineHeight: 2,
  backgroundColor: "#ff97ca", // розовый
  color: "white",
  textAlign: "center",
};

export const styleSt05 = {
  borderRight: "1px solid #d4d4d4", // серый
  borderBottom: "1px solid #d4d4d4", // серый
  fontSize: 12.9,
  textAlign: "center",
  lineHeight: 2,
};

export const styleSt06 = {
  textIndent: 6,
  borderRight: "1px solid #d4d4d4", // серый
  borderBottom: "1px solid #d4d4d4", // серый
  lineHeight: 2,
  fontSize: 12.9,
};

export const styleHeader03 = {
  borderBottom: "1px solid #d4d4d4", // серый
  bgcolor: "#B8CBB9", // серо-салатовый
  fontSize: 11,
  textAlign: "center",
  height: 24,
  lineHeight: 2,
};

export const styleHeader033 = {
  borderRight: "1px solid #d4d4d4", // серый
  borderBottom: "1px solid #d4d4d4", // серый
  bgcolor: "#B8CBB9", // серо-салатовый
  fontSize: 12.9,
  textAlign: "center",
  height: 24,
  lineHeight: 1.5,
};

export const styleBatton01 = {
  marginLeft: 0.4,
  fontSize: 12,
  bgcolor: "#BAE186", // тёмно-салатовый
  border: "1px solid #000",
  borderColor: "#BAE186", // тёмно-салатовый
  borderRadius: 1,
  boxShadow: 10,
  color: "black",
  maxWidth: "2.7vh",
  minWidth: "2.7vh",
  maxHeight: "23px",
  minHeight: "23px",
  textAlign: "center",
  padding: "2px 0px 0px 0px",
};

export const styleBatton02 = {
  marginLeft: 0.4,
  fontSize: 11,
  bgcolor: "#E6F5D6", // светло-салатовый
  border: "1px solid #000",
  borderColor: "#BAE186", // тёмно-салатовый
  borderRadius: 1,
  boxShadow: 1,
  color: "black",
  maxWidth: "2.7vh",
  minWidth: "2.7vh",
  maxHeight: "23px",
  minHeight: "23px",
  textAlign: "center",
  padding: "2px 0px 0px 0px",
};

export const styleClear = {
  position: "absolute",
  marginTop: "-2.7vh",
  left: "0.95vh",
};

export const styleBattonCl = {
  fontSize: 10.1,
  backgroundColor: "#E9F5D8", // светло-салатовый
  color: "red",
  height: "18px",
  maxWidth: "5vh",
  minWidth: "5vh",
  textTransform: "unset !important",
  border: "1px solid #000",
  borderColor: "#d4d4d4", // серый
  borderRadius: 1,
  boxShadow: 6,
};

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: true, position: "top" as const },
    title: { display: false },
  },
};

export const styleStatMain = {
  background: "linear-gradient(160deg, #F1F5FB 63%, #D0DEF0 )",
  border: "1px solid #d4d4d4", // серый
  borderRadius: 1,
  boxShadow: 12,
};
