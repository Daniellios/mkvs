import { data } from "../constants/data";

export interface Data {
    name: string;
    uv: number;
    pv: number;
    amt: number;
}

export interface ZScoreData extends Data {
    uvZScore: number;
    pvZScore: number;
    uvIsExtreme: boolean;
    pvIsExtreme: boolean;
    x2: string;
}

export const calculateZScores = <T>(data: T[], field: keyof T): number[] => {
    const values: number[] = data.map((item) => +item[field]);
    const mean: number =
        values.reduce((sum, val) => sum + val, 0) / values.length;

    const standartDeviation: number = Math.sqrt(
        values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) /
            values.length
    );

    return values.map((val) => (val - mean) / standartDeviation);
};

const uvZScores = calculateZScores<Data>(data, "uv");
const pvZScores = calculateZScores<Data>(data, "pv");

export const enhancedData: ZScoreData[] = data.map((item, index, array) => ({
    ...item,
    uvZScore: uvZScores[index],
    pvZScore: pvZScores[index],
    uvIsExtreme: Math.abs(uvZScores[index]) > 1,
    pvIsExtreme: Math.abs(pvZScores[index]) > 1,
    x2: array[Math.min(index + 1, array.length - 1)].name,
}));

export type ScoreType = keyof Pick<ZScoreData, "pvIsExtreme" | "uvIsExtreme">;

export const isDotRed = (index: number, type: ScoreType): boolean => {
    return enhancedData[index]?.[type];
};
