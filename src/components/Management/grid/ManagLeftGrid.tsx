import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import ManagementRightGrid from "./ManagRightGrid";
import ManagementKnobPK from "./ManagKnobPK";
import ManagementKnobSK from "./ManagKnobSK";
import ManagementKnobNK from "./ManagKnobNK";
import ManagementKnobXT from "./ManagKnobXT";

import { Tflight } from "../../../interfaceMNG.d";
import { XctrlInfo } from "../../../interfaceGl.d";

import { styleMG01, styleMG03, styleButSubArea01 } from "./ManagGridStyle";
import { styleButSubArea02, styleButArea01 } from "./ManagGridStyle";
import { styleButArea02, styleButRegion01 } from "./ManagGridStyle";
import { styleButRegion02 } from "./ManagGridStyle";

export interface DataKnob {
  knop: Knob[];
}

export interface Knob {
  cmd: number;
  param: number;
  region: string;
  area: string;
  subarea: number;
}

let massKnop: Knob[] = [];
let massKnopTemp: Knob[] = [];

const ManagementLeftGrid = (props: {
  open: boolean;
  ws: WebSocket;
  tflightt: Tflight[];
  xctrll: XctrlInfo[];
}) => {
  const points = props.tflightt;
  const pointsXT = props.xctrll;
  let masXT: any = [];

  const [mode, setMode] = React.useState(1);
  let reGion = "1";
  const [areaa, setAreaa] = React.useState("0");
  const [subArea, setSubArea] = React.useState(0);

  const [dataKnob, setDataKnob] = React.useState<Array<Knob>>([
    {
      cmd: 0,
      param: 99,
      region: "",
      area: "",
      subarea: 88,
    },
  ]);

  const massKnob: Knob[] = [
    {
      cmd: 0,
      param: 99,
      region: "",
      area: "",
      subarea: 99,
    },
  ];

  let mass: any = [];
  let masRab: any = [];
  let masAreaNum: any = [];

  if (props.open) {
    reGion = points[0].region.num;
    masRab[0] = points[0].area.num;
    mass[0] = {
      areaNum: points[0].area.num,
      areaName: points[0].area.nameArea,
      subarea: points[0].subarea,
    };
    let j = 0;

    for (let i = 1; i < points.length; i++) {
      if (
        mass[j].areaNum !== points[i].area.num ||
        mass[j].subarea !== points[i].subarea
      ) {
        j++;
        masRab[j] = points[i].area.num;
        mass[j] = {
          areaNum: points[i].area.num,
          areaName: points[i].area.nameArea,
          subarea: points[i].subarea,
        };
      }
    }
    //убираем дубликаты
    masAreaNum = masRab.filter((element: any, index: any) => {
      return masRab.indexOf(element) === index;
    });
    // создание массива ХТ
    for (let i = 0; i < pointsXT.length; i++) {
      masXT[i] = {
        areaXT: pointsXT[i].area,
        subareaXT: pointsXT[i].subarea,
        releaseXT: pointsXT[i].release,
        switchXT: pointsXT[i].switch,
        pknowXT: pointsXT[i].pknow,
      };
    }
  }

  const handleClickGl = () => {
    setMode(1);
    setAreaa("0");
    setSubArea(0);
  };

  const handleClock = (area: string) => {
    setMode(2);
    setAreaa(area);
    setSubArea(0);
  };

  const handleClick = (area: string, subarea: number) => {
    setMode(3);
    setAreaa(area);
    setSubArea(subarea);
  };

  const SpisAreaMLG = (props: { nom: string }) => {
    let masSpis: any = [];
    masSpis = mass.filter(
      (mass: { areaNum: string }) => mass.areaNum === props.nom
    );

    const SpisSubAreaMLG = () => {
      const ButtonSubArea = (i: number) => {
        let illum =
          mode === 3 &&
          areaa === masSpis[i].areaNum &&
          subArea === masSpis[i].subarea
            ? styleButSubArea01
            : styleButSubArea02;

        return (
          <Button
            sx={illum}
            onClick={() => handleClick(props.nom, masSpis[i].subarea)}
          >
            Подрайон:{masSpis[i].areaNum}:{masSpis[i].subarea}
          </Button>
        );
      };

      return masSpis.map((masspis: any, idx: number) => {
        return (
          <Grid container key={idx}>
            <Grid item xs={0.5} sx={styleMG03}></Grid>
            <Grid item xs sx={styleMG03}>
              {ButtonSubArea(idx)}
            </Grid>
          </Grid>
        );
      });
    };

    const ButtonArea = () => {
      let illum =
        mode === 2 && areaa === masSpis[0].areaNum && subArea === 0
          ? styleButArea01
          : styleButArea02;

      return (
        <Button sx={illum} onClick={() => handleClock(props.nom)}>
          <b>
            Район:{masSpis[0].areaNum}&nbsp;{masSpis[0].areaName}
          </b>
        </Button>
      );
    };

    return (
      <Stack direction="column">
        <Grid container>
          <Grid item xs sx={styleMG03}>
            {ButtonArea()}
          </Grid>
          {SpisSubAreaMLG()}
        </Grid>
      </Stack>
    );
  };

  const SpisMLG = () => {
    const SpisAreaGlob = () => {
      return masAreaNum.map((masAN: any, idx: number) => {
        return <SpisAreaMLG nom={masAN} key={idx} />;
      });
    };

    const ButtonRegion = () => {
      let illum =
        mode === 1 && areaa === "0" && subArea === 0
          ? styleButRegion01
          : styleButRegion02;

      return (
        <Button sx={illum} onClick={handleClickGl}>
          <b>{points[0].region.nameRegion}</b>
        </Button>
      );
    };

    return (
      <Stack direction="column">
        <Grid container>
          <Grid item xs sx={{ p: 0.1, border: 0 }}>
            {ButtonRegion()}
          </Grid>
        </Grid>
        {SpisAreaGlob()}
      </Stack>
    );
  };

  const DelateDublRecords = () => {
    let massTemp = [];
    for (let i = 0; i < massKnop.length; i++) {
      let dubl = false;
      if (i < massKnop.length - 1) {
        for (let j = i + 1; j < massKnop.length; j++) {
          if (
            massKnop[i].cmd === massKnop[j].cmd &&
            massKnop[i].param === massKnop[j].param &&
            massKnop[i].region === massKnop[j].region &&
            massKnop[i].area === massKnop[j].area &&
            massKnop[i].subarea === massKnop[j].subarea
          )
            dubl = true;
        }
      }
      if (!dubl && massKnop[i].param !== 99) massTemp.push(massKnop[i]);
    }
    massKnop = massTemp;
  };

  const RecordInAria = () => {
    massKnopTemp = [];
    let masArea: any = [];
    let masAreaRab: any = [];

    for (let i = 0; i < mass.length; i++) {
      let dataKnobTemp: Knob[] = [
        {
          cmd: dataKnob[0].cmd,
          param: dataKnob[0].param,
          region: dataKnob[0].region,
          area: mass[i].areaNum,
          subarea: mass[i].subarea,
        },
      ];
      // костыль
      dataKnobTemp[0].cmd = dataKnob[0].cmd;
      dataKnobTemp[0].param = dataKnob[0].param;
      dataKnobTemp[0].region = dataKnob[0].region;
      dataKnobTemp[0].area = mass[i].areaNum;
      dataKnobTemp[0].subarea = mass[i].subarea;
      massKnopTemp.push(dataKnobTemp[0]);
      masAreaRab.push(mass[i].areaNum);
    }
    //убираем дубликаты
    masArea = masAreaRab.filter((element: any, index: any) => {
      return masAreaRab.indexOf(element) === index;
    });

    for (let i = 0; i < masArea.length; i++) {
      //добавление записей по районам
      let dataKnobTemp: Knob[] = [
        {
          cmd: dataKnob[0].cmd,
          param: dataKnob[0].param,
          region: dataKnob[0].region,
          area: masArea[i],
          subarea: 0,
        },
      ];
      // костыль
      dataKnobTemp[0].cmd = dataKnob[0].cmd;
      dataKnobTemp[0].param = dataKnob[0].param;
      dataKnobTemp[0].region = dataKnob[0].region;
      dataKnobTemp[0].area = masArea[i];
      dataKnobTemp[0].subarea = 0;
      massKnopTemp.push(dataKnobTemp[0]);
    }
    massKnop = massKnop.concat(massKnopTemp); // ОбЪединение массивов

    for (let i = 0; i < massKnop.length; i++) {
      // изменение param по всему кусту региона
      if (
        massKnop[i].cmd === dataKnob[0].cmd &&
        massKnop[i].region === dataKnob[0].region
      )
        massKnop[i].param = dataKnob[0].param;
    }
    DelateDublRecords(); //удаление дубликатов
  };

  const RecordInSubaria = () => {
    if (dataKnob[0].subarea === 0) {
      massKnopTemp = [];
      for (let i = 0; i < mass.length; i++) {
        if (mass[i].areaNum === dataKnob[0].area) {
          let dataKnobTemp: Knob[] = [
            {
              cmd: dataKnob[0].cmd,
              param: dataKnob[0].param,
              region: dataKnob[0].region,
              area: mass[i].areaNum,
              subarea: mass[i].areaNum,
            },
          ];
          // костыль
          dataKnobTemp[0].cmd = dataKnob[0].cmd;
          dataKnobTemp[0].param = dataKnob[0].param;
          dataKnobTemp[0].region = dataKnob[0].region;
          dataKnobTemp[0].area = mass[i].areaNum;
          dataKnobTemp[0].subarea = mass[i].areaNum;
          massKnopTemp.push(dataKnobTemp[0]);
        }
      }
      massKnop = massKnop.concat(massKnopTemp); // ОбЪединение массивов
      for (let i = 0; i < massKnop.length; i++) {
        // изменение param по всему кусту района
        if (
          massKnop[i].cmd === dataKnob[0].cmd &&
          massKnop[i].region === dataKnob[0].region &&
          massKnop[i].area === dataKnob[0].area
        )
          massKnop[i].param = dataKnob[0].param;
      }
      DelateDublRecords(); //удаление дубликатов
    }
  };

  const CheckFourKnops = () => {
    if (dataKnob[0].cmd !== 0) {
      // проверка дубликатов
      let flagDubl = true;
      for (let i = 0; i < massKnop.length; i++) {
        if (
          massKnop[i].cmd === dataKnob[0].cmd &&
          massKnop[i].param === dataKnob[0].param &&
          massKnop[i].region === dataKnob[0].region &&
          massKnop[i].area === dataKnob[0].area &&
          massKnop[i].subarea === dataKnob[0].subarea
        ) {
          flagDubl = false; //console.log(i, 'Дубликат')
          massKnop[i].param = dataKnob[0].param;
        }
      }
      if (flagDubl) {
        //console.log('Запись');
        massKnob[0].cmd = dataKnob[0].cmd;
        massKnob[0].param = dataKnob[0].param;
        massKnob[0].region = dataKnob[0].region;
        massKnob[0].area = dataKnob[0].area;
        massKnob[0].subarea = dataKnob[0].subarea;
        massKnop.push(massKnob[0]);
      }
      if (dataKnob[0].area === "0" && dataKnob[0].subarea === 0) {
        RecordInAria();
      } else RecordInSubaria();
      // сортировка по cmd
      massKnop.sort((prev, next) => prev.cmd - next.cmd);
    }
  };

  const FourKnops = () => {
    return (
      <Grid item xs={12} sx={{ border: 0, height: "4vh", marginTop: "0.5vh" }}>
        <Stack direction="row">
          <ManagementKnobPK
            open={props.open}
            ws={props.ws}
            region={reGion}
            areaa={areaa}
            subArea={subArea}
            setDataKn={setDataKnob}
          />
          <ManagementKnobSK
            open={props.open}
            ws={props.ws}
            region={reGion}
            areaa={areaa}
            subArea={subArea}
            setDataKn={setDataKnob}
          />
          <ManagementKnobNK
            open={props.open}
            ws={props.ws}
            region={reGion}
            areaa={areaa}
            subArea={subArea}
            setDataKn={setDataKnob}
          />
          <ManagementKnobXT
            open={props.open}
            ws={props.ws}
            region={reGion}
            areaa={areaa}
            subArea={subArea}
            setDataKn={setDataKnob}
            //tflightt={points}
            masxt={masXT}
          />
        </Stack>
      </Grid>
    );
  };

  return (
    <Grid container>
      <Grid item xs={2.5} sx={styleMG01}>
        <Box sx={{ border: 0, overflowX: "auto", height: "94.5vh" }}>
          {props.open && <SpisMLG />}
        </Box>
      </Grid>
      <Grid item xs sx={{ border: 0, height: "94.5vh", marginTop: "0.5vh" }}>
        <Grid container>
          <FourKnops />
          {CheckFourKnops()}
          <ManagementRightGrid
            open={props.open}
            tflightt={points}
            mode={mode}
            areaa={areaa}
            subArea={subArea}
            masxt={masXT}
            masknob={massKnop}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ManagementLeftGrid;
