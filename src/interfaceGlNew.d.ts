export interface XctrlAdd {
    type: string;
    data: Data;
}

export interface Data {
    xctrlUpdate: XctrlUpdate[];
}

export interface XctrlUpdate {
    region:   number;
    area:     number;
    subarea:  number;
    switch:   boolean;
    release:  boolean;
    use:      boolean;
    yellow:   Yellow;
    step:     number;
    ltime:    number;
    pkcalc:   number;
    pknow:    number;
    pklast:   number;
    status:   any[];
    xctrls:   Xctrl[];
    ext:      Array<number[]>;
    prioryty: Array<number[]>;
    time:     number;
    results:  { [key: string]: Result[] };
    devices:  number[];
}

export interface Result {
    Time:  number;
    Value: number[];
    Good:  boolean;
}

export interface Xctrl {
    name:       string;
    left:       number;
    right:      number;
    status:     any[];
    StrategyA:  any[];
    StrategyB:  StrategyB[];
    Calculates: Calculate[];
}

export interface Calculate {
    region: number;
    area:   number;
    id:     number;
    chanL:  number[];
    chanR:  number[];
}

export interface StrategyB {
    xleft:  number;
    xright: number;
    vleft:  number;
    vright: number;
    pkl:    number;
    pks:    number;
    pkr:    number;
    desc:   string;
}

export interface Yellow {
    make:  boolean;
    start: number;
    stop:  number;
}
