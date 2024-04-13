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

export interface Game {
    id: string;
    puntuation: number;
    time: number;
    date: string;
    user: {
        username: string;
    };
    noParsedDate?: string;
}

export interface Tournament {
    id: string;
    name: string;
    maxPlayers: number;
    password?: string;
}
