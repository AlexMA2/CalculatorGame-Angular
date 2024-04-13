export interface Settings {
    theme: 'light' | 'dark';
    times: Times;
    addOperator: OperatorSetting;
    subtractOperator: OperatorSetting;
    multiplyOperator: OperatorSetting;
    divisionOperator: OperatorSetting;
    sound: boolean;
}

export interface OperatorSetting {
    enabled: boolean;
    min: number;
    max: number;
}

export enum Times {
    SLOW = 'slow',
    MEDIUM = 'medium',
    FAST = 'fast',
}
