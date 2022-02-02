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
        techMode:        TechMode;
        StatusCommandDU: { [key: string]: boolean };
        scon:            boolean;
    }
    
    export interface Area {
        num:      string;
        nameArea: NameArea;
    }
    
    export enum NameArea {
        ВтораяПоловина = "Вторая половина",
        ПерваяПоловина = "Первая половина",
        ТретийКусок = "Третий кусок",
    }
    
    export interface Points {
        Y: number;
        X: number;
    }
    
    export interface Region {
        num:        string;
        nameRegion: NameRegion;
    }
    
    export enum NameRegion {
        Мосавтодор = "Мосавтодор",
    }
    
    export enum TechMode {
        Empty = "",
        ВыборПКПоВремениПоСуточнойКартеВРСК = "выбор ПК по времени по суточной карте ВР-СК",
        ВыборПКПоГодовойКарте = "выбор ПК по годовой карте",
        ВыборПКПоНедельнойКартеВРНК = "выбор ПК по недельной карте ВР-НК",
    }
    
    export interface Tlsost {
        num:         number;
        description: Description;
        control:     boolean;
    }
    
    export enum Description {
        КоординированноеУправление = "Координированное управление",
        НетСвязиСУСДКДК = "Нет связи с УСДК/ДК",
        ОбрывЛинийСвязи = "Обрыв линий связи",
    }
    