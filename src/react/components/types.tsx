export interface category {
    id: number,
    name: string,
    elements: item[],
    children: category[]
}

export interface item {
    id: number,
    name: string,
    active: boolean,
}