export interface GameResult {
    correct: number;
    incorrect: number;
    score: number;
}

export enum Operators {
    Add = '+',
    Subtract = '-',
    Multiply = '*',
    Division = '/',
}
