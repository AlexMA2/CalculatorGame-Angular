export const readLocalStorageData = (
    key: string
): Record<string, any> | null => {
    const json = localStorage.getItem(key);
    return json ? JSON.parse(json) : null;
};

export const saveLocalStorageData = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
};
