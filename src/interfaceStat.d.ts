export interface Statistica {
    type: string;
    data: Data;
  }
  
  export interface Data {
    statistics: Statistic[];
  }
  
  export interface Statistic {
    region: number;
    area: number;
    subarea: number;
    id: number;
    date: Date;
    Statistics: StatisticElement[];
  }
  
  export interface StatisticElement {
    Period: number;
    Type: number;
    TLen: number;
    Hour: number;
    Min: number;
    Datas: DataElement[];
  }
  
  export interface DataElement {
    ch: number;
    st: number;
    in: number;
    sp: number;
    d: number;
    o: number;
    g: number;
  }
