export interface GetArea{
    type: string;
    data: Data;
}

export interface Data {
    tflight: Tflight[];
}

export interface Tflight {
    ID:              number;
    region:          Region;
    area:            Area;
    subarea:         number;
    idevice:         number;
    tlsost:          Tlsost;
    description:     string;
    phases:          null;
    points:          Points;
    inputError:      boolean;
    pk:              number;
    nk:              number;
    ck:              number;
    techMode:        number;
    techModeString:  string;
    StatusCommandDU: { [key: string]: boolean };
    scon:            boolean;
    ltime:           string;
}

export interface Area {
    num:      string;
    nameArea: string;
}

export interface Points {
    Y: number;
    X: number;
}

export interface Region {
    num:        string;
    nameRegion: string;
}

export interface Tlsost {
    num:         number;
    description: string;
    control:     boolean;
}
