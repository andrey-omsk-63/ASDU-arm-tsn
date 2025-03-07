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

import { MesssgeLength } from "../../../AppServiceFunctions";

//import { debug } from "../../../App";

import { Tflight } from "../../../interfaceMNG.d";
import { XctrlInfo } from "../../../interfaceGl.d";

import { styleMG01, styleMG03, styleButSubArea01 } from "./ManagGridStyle";
import { styleButSubArea02, styleButArea01 } from "./ManagGridStyle";
import { styleButArea02, styleButRegion01 } from "./ManagGridStyle";
import { styleButRegion02 } from "./ManagGridStyle";

import { colorSalat, colorCrayola } from "./ManagGridStyle"; // ничего не назначено
import { colorCuan, colorSky } from "./ManagGridStyle"; // назначено ПК
import { colorGolden, colorBrightYell } from "./ManagGridStyle"; // назначено СК
import { colorPinkish, colorAmaranth } from "./ManagGridStyle"; // назначено НК
import { colorApricot, colorBronze } from "./ManagGridStyle"; // назначено XT

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

export let masXT: any = [];
export let massKnop: Knob[] = [];
let massKnopTemp: Knob[] = [];
let firstEntry = true;

let dataKnob: Knob[] = [
  {
    cmd: 0,
    param: 99,
    region: "",
    area: "",
    subarea: 88,
  },
];

let coler = colorSalat;
let colerGl = colorCrayola;
let pk = 0;
let ck = 0;
//let reg = "Очень длинное название Иркутского региона длинное длинное";

const ManagementLeftGrid = (props: {
  open: boolean;
  tflightt: Tflight[];
  xctrll: XctrlInfo[];
}) => {
  const points = props.tflightt;
  const pointsXT = props.xctrll;
  let reGion = "1";
  masXT = [];

  const [mode, setMode] = React.useState(1);
  const [areaa, setAreaa] = React.useState("0");
  const [subArea, setSubArea] = React.useState(0);
  const [addition, setAddition] = React.useState(80);
  const [trigger, setTrigger] = React.useState(false);
  const ref = React.useRef<any>(null);

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
      if (firstEntry) {
        // создание массива massKnop
        if (points[i].pk || points[i].ck || points[i].nk) {
          let dataKnobTemp: Knob[] = [
            {
              cmd: 0,
              param: 0,
              region: points[i].region.num,
              area: points[i].area.num,
              subarea: points[i].subarea,
            },
          ];
          dataKnob[0].subarea = points[i].subarea;
          if (points[i].pk && points[i].StatusCommandDU.isPK) {
            dataKnobTemp[0].cmd = 5; // ПК
            dataKnobTemp[0].param = points[i].pk;
            massKnop.push(JSON.parse(JSON.stringify(dataKnobTemp[0])));
          }
          if (points[i].ck && points[i].StatusCommandDU.isCK) {
            dataKnobTemp[0].cmd = 6; // CК
            dataKnobTemp[0].param = points[i].ck;
            massKnop.push(JSON.parse(JSON.stringify(dataKnobTemp[0])));
          }
          if (points[i].nk && points[i].StatusCommandDU.isNK) {
            dataKnobTemp[0].cmd = 7; // HК
            dataKnobTemp[0].param = points[i].nk;
            massKnop.push(JSON.parse(JSON.stringify(dataKnobTemp[0])));
          }
        }
      }
      // создание массива номеров районов
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
    if (firstEntry) {
      // console.log("Points:", points);
      // console.log("###:", JSON.parse(JSON.stringify(massKnop)));

      //убираем дубликаты в massKnop
      massKnop = massKnop.filter(
        (value, index, self) =>
          index ===
          self.findIndex(
            (t) =>
              t.cmd === value.cmd &&
              t.param === value.param &&
              t.region === value.region &&
              t.area === value.area &&
              t.subarea === value.subarea
          )
      );
      firstEntry = false;
    }
    //убираем дубликаты в masAreaNum
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

  const ColorSelection = (j: number) => {
    if (massKnop[j].cmd === 5 && massKnop[j].param) {
      coler = colorCuan; // ПК
      colerGl = colorSky;
      pk++;
    } else {
      if (massKnop[j].cmd === 6 && massKnop[j].param) {
        if (!pk) {
          coler = colorGolden; // CК
          colerGl = colorBrightYell;
          ck++;
        }
      } else {
        if (massKnop[j].cmd === 7 && massKnop[j].param)
          if (!pk && !ck) {
            coler = colorPinkish; // HК
            colerGl = colorAmaranth;
          }
      }
    }
  };

  const SpisAreaMLG = (props: { nom: string }) => {
    let masSpis: any = [];
    masSpis = mass.filter(
      (mass: { areaNum: string }) => mass.areaNum === props.nom
    );

    const SpisSubAreaMLG = () => {
      const ButtonSubArea = (i: number) => {
        coler = colorSalat;
        colerGl = colorCrayola;
        pk = 0;
        ck = 0;
        let area = masSpis[i].areaNum;
        let subar = masSpis[i].subarea;
        for (let j = 0; j < massKnop.length; j++) {
          if (massKnop[j].area === area && massKnop[j].subarea === subar)
            ColorSelection(j);
        }
        if (coler === colorSalat) {
          // проверка наличия ХТ - самый нижний приоритет
          for (let j = 0; j < masXT.length; j++) {
            if (
              masXT[j].areaXT === Number(area) &&
              masXT[j].subareaXT === subar &&
              masXT[j].releaseXT
            ) {
              coler = colorApricot; // XT
              colerGl = colorBronze;
            }
          }
        }

        let illum =
          mode === 3 &&
          areaa === masSpis[i].areaNum &&
          subArea === masSpis[i].subarea
            ? styleButSubArea01(colerGl)
            : styleButSubArea02(coler);

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
      coler = colorSalat;
      colerGl = colorCrayola;
      pk = 0;
      ck = 0;
      for (let j = 0; j < massKnop.length; j++) {
        let area = massKnop[j].area;
        let subar = massKnop[j].subarea;
        if (area === masSpis[0].areaNum && !subar) ColorSelection(j);
      }

      let illum =
        mode === 2 && areaa === masSpis[0].areaNum && subArea === 0
          ? styleButArea01(colerGl)
          : styleButArea02(coler);

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
      coler = colorSalat;
      colerGl = colorCrayola;
      pk = 0;
      ck = 0;
      for (let j = 0; j < massKnop.length; j++) {
        if (massKnop[j].area === "0" && massKnop[j].subarea === 0)
          ColorSelection(j);
      }

      let illum =
        mode === 1 && areaa === "0" && subArea === 0
          ? styleButRegion01(addition, colerGl)
          : styleButRegion02(addition, coler);

      return (
        <Button sx={illum} onClick={handleClickGl}>
          <b>{points[0].region.nameRegion}</b>
          {/* <b>{reg}</b> */}
        </Button>
      );
    };

    return (
      <>
        <Grid container>
          <Grid item xs sx={{ p: 0.0, border: 0 }}>
            {ButtonRegion()}
          </Grid>
        </Grid>
        {SpisAreaGlob()}
      </>
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
      if (!dubl && massKnop[i].param !== 99 && massKnop[i].param)
        massTemp.push(massKnop[i]);
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
              subarea: mass[i].subarea,
            },
          ];
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

  const SetDataKnob = (knob: any, mode: number) => {
    console.log("SetDataKnob:", mode, knob[0].cmd, knob);

    if (!mode) {
      dataKnob = knob;
      if (knob[0].cmd === 13) {
      }
      CheckFourKnops();
      setTrigger(!trigger);
    }
  };

  const CheckFourKnops = () => {
    if (dataKnob[0].cmd !== 0) {
      let flagDubl = true; // проверка дубликатов
      for (let i = 0; i < massKnop.length; i++) {
        if (
          massKnop[i].cmd === dataKnob[0].cmd &&
          //massKnop[i].param === dataKnob[0].param &&   // исправление 20.11.24
          massKnop[i].region === dataKnob[0].region &&
          massKnop[i].area === dataKnob[0].area &&
          massKnop[i].subarea === dataKnob[0].subarea
        ) {
          flagDubl = false; //console.log(i, "Дубликат");
          massKnop[i].param = dataKnob[0].param;
        }
      }
      if (flagDubl) {
        massKnob[0].cmd = dataKnob[0].cmd; //console.log("Запись");
        massKnob[0].param = dataKnob[0].param;
        massKnob[0].region = dataKnob[0].region;
        massKnob[0].area = dataKnob[0].area;
        massKnob[0].subarea = dataKnob[0].subarea;
        massKnop.push(massKnob[0]);
      }
      if (dataKnob[0].area === "0" && dataKnob[0].subarea === 0) {
        RecordInAria();
      } else RecordInSubaria();
      massKnop.sort((prev, next) => prev.cmd - next.cmd); // сортировка по cmd
      let masrab: Knob[] = []; // удаление записей с param = 0
      for (let i = 0; i < massKnop.length; i++)
        if (massKnop[i].param) masrab.push(massKnop[i]);
      if (masrab.length) massKnop = masrab;
    }
  };

  const FourKnops = () => {
    return (
      <Grid item xs={12} sx={{ height: "4vh", marginTop: "0.5vh" }}>
        <ManagementKnobPK
          open={props.open}
          region={reGion}
          areaa={areaa}
          subArea={subArea}
          setDataKn={SetDataKnob}
        />
        <ManagementKnobSK
          open={props.open}
          region={reGion}
          areaa={areaa}
          subArea={subArea}
          setDataKn={SetDataKnob}
        />
        <ManagementKnobNK
          open={props.open}
          region={reGion}
          areaa={areaa}
          subArea={subArea}
          setDataKn={SetDataKnob}
        />
        <ManagementKnobXT
          open={props.open}
          region={reGion}
          areaa={areaa}
          subArea={subArea}
          setDataKn={SetDataKnob}
          masxt={masXT}
        />
      </Grid>
    );
  };

  React.useLayoutEffect(() => {
    //let regionWidth = MesssgeLength(reg, 14);
    let regionWidth = MesssgeLength(points[0].region.nameRegion, 14);
    let aa = regionWidth / ref.current.offsetWidth;
    let addit = aa <= 1 ? 20 : aa <= 2 ? 30 : aa <= 3 ? 60 : 80;
    //console.log("addition:", addit);
    setAddition(addit);
  }, [points]);

  return (
    <Grid container>
      <Grid ref={ref} item xs={2.5} sx={styleMG01}>
        <Box sx={{ overflowX: "auto", height: "94.5vh" }}>
          {props.open && <SpisMLG />}
        </Box>
      </Grid>
      <Grid item xs sx={{ height: "94.5vh", marginTop: "0.5vh" }}>
        <Grid container>
          <FourKnops />
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
