export interface XctrlGlob {
    type: string;
    data: Data;
}

export interface Data {
    areaInfo: AreaInfo;
    regionInfo: RegionInfo;
    xctrlInfo: XctrlInfo[];
}

export interface AreaInfo {
    Воронеж: { [key: string]: string };
    Зеленоград: Зеленоград;
    Иркутск: { [key: string]: string };
    "Иркутск дирекция": { [key: string]: string };
    Калмыкия: Зеленоград;
    Мосавтодор: { [key: string]: string };
    Тула: { [key: string]: string };
    Хабаровск: { [key: string]: string };
    "Южно-Сахалинск": Зеленоград;
}

export interface Зеленоград {
    "1": string;
}

export interface RegionInfo {
    [index: string]: string
    // "1": string;
    // "2": string;
    // "3": string;
    // "4": string;
    // "5": string;
    // "6": string;
    // "7": string;
    // "8": string;
    // "9": string;
}

export interface XctrlInfo {
    region: number;
    area: number;
    subarea: number;
    switch: boolean;
    release: boolean;
    use: boolean;
    yellow: Yellow;
    step: number;
    ltime: number;
    pkcalc: number;
    pknow: number;
    pklast: number;
    status: null;
    xctrls: Xctrl[];
    ext: Array<number[]>;
    extdesc: string[];
    prioryty: Array<number[]>;
    time: number;
    results: { [key: string]: Result[] };
    devices: number[];
}

export interface Result {
    Time: number;
    Value: number[];
    Good: boolean;
}

export interface Xctrl {
    name: string;
    left: number;
    right: number;
    status: any[];
    StrategyA: StrategyA[];
    StrategyB: StrategyB[];
    Calculates: Calculate[];
}

export interface Calculate {
    region: number;
    area: number;
    id: number;
    chanL: number[];
    chanR: number[];
}

export interface StrategyA {
    pk: number;
    desc: string;
    xleft: number;
    xright: number;
}

export interface StrategyB {
    xleft: number;
    xright: number;
    vleft: number;
    vright: number;
    pkl: number;
    pks: number;
    pkr: number;
    desc: string;
}

export interface Yellow {
    make: boolean;
    start: number;
    stop: number;
}
