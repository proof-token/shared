declare type Stats = {
    mints: number;
    topContract: {
        name: string;
        id: string;
        mints: number;
    };
};
declare type Year = number;
declare type Day = number;
declare type Month = number;
export declare type DayStats = {
    day: Day;
    month: Month;
    year: Year;
    stats: Stats;
};
export declare type MonthStats = {
    month: Month;
    year: Year;
    stats: Stats;
};
export {};
