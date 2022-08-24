export const MakeInterval = (mode: number) => {
  let dat: any = [];
  switch (mode) {
    case 1:
      dat = ["1", "5", "10", "15", "30", "60"];
      break;
    case 5:
      dat = ["5", "10", "15", "30", "60"];
      break;
    case 10:
      dat = ["10", "20", "30", "60"];
      break;
    case 15:
      dat = ["15", "30", "60"];
      break;
    case 20:
      dat = ["20", "60"];
      break;
    default:
      console.log("В БД некорректный интервал");
  }
  return dat;
}

