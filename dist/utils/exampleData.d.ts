export const areaData: {
    date: number;
    'category one': number;
    'category two has a really long name and takes a lot of space': number;
    'category three': number;
    'category four': number;
    'category five': number;
    'category six': number;
}[];
export const barData: {
    name: string;
    value: number;
}[];
export const barGroupData: {
    name: string;
    group: string;
    value: number;
}[];
export const barStackedData: {
    name: string;
    'Category 1': number;
    'Category 2': number;
    'Category 3': number;
    'Category 4 with a long name': number;
    'Category 5': number;
}[];
export const scatterData: {
    name: string;
    xvalue: number;
    yvalue: number;
    group: string;
}[];
export const lineData: ({
    date: string;
    'category one': number;
    'category two': string;
    'category three': number;
    'category four two lines': number;
    'category five': number;
} | {
    date: string;
    'category one': number;
    'category two': number;
    'category three': number;
    'category four two lines': number;
    'category five': number;
})[];
