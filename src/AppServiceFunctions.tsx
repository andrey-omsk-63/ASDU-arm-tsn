import { Stater } from './App';

export const MakeInterval = (mode: number) => {
  let dat: any = [];
  switch (mode) {
    case 1:
      dat = ['1', '5', '10', '15', '30', '60'];
      break;
    case 5:
      dat = ['5', '10', '15', '30', '60'];
      break;
    case 10:
      dat = ['10', '20', '30', '60'];
      break;
    case 15:
      dat = ['15', '30', '60'];
      break;
    case 20:
      dat = ['20', '60'];
      break;
    default:
      console.log('В БД некорректный интервал');
      dat = ['1', '5', '10', '15', '30', '60'];
  }
  return dat;
};

export const WriteToCsvFile = (datestat: Stater) => {
  console.log('Datestat:', datestat);
  const element = document.createElement('a');
  let textFile = '';
  for (let i = 0; i < datestat.stat.length; i++) {
    textFile += datestat.stat[i].Hour;
    textFile += ';';
    textFile += datestat.stat[i].Min;
    textFile += ';';
    for (let j = 0; j < datestat.stat[i].Datas.length; j++) {
      textFile += datestat.stat[i].Datas[j].in;
      if (j + 1 !== datestat.stat[i].Datas.length) textFile += ';';
    }
    //textFile += ";;\n";
    textFile += '\n';
  }
  const file = new Blob([textFile], { type: 'text/plain' });
  element.href = URL.createObjectURL(file);
  let nameFile =
    datestat.area + '.' + datestat.id + ' ' + datestat.data + ' ' + datestat.time + '.csv';
  element.download = nameFile;
  document.body.appendChild(element); // Required for this to work in FireFox
  element.click();
  // const dataURI = "data:text/plain;base64," + encodeBase64("Hello World!");
  // saveAs(dataURI, "test.txt");
};
