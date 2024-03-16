export interface Settings {
    theme: 'light' | 'dark';
    times: 'slow' | 'medium' | 'fast';
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
