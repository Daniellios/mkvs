import React from 'react'
import { ScoreType, isDotRed } from './utils/calculateZScore';

interface CustomDotProps {
    cx: number;
    cy: number;
    index: number;
    type: ScoreType;
    baseColor: string
}

export const CustomDot: React.FC<CustomDotProps> = ({ cx, cy, index, type, baseColor }) => {
    const isRed = isDotRed(index, type)
    return (
        <circle
            cx={cx}
            cy={cy}
            r={isRed ? 6 : 4}
            fill={isRed ? 'red' : baseColor}
            stroke={isRed ? 'darkred' : baseColor}
            strokeWidth={1}
        />
    );
}
