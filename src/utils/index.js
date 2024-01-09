export const data = [
    {
        id: '675f3a96-d949-4f3f-898b-8897dae00abd', 
        length: 1450, 
        width: 140, 
        count: 4
    },
    {
        id: 'b1a9eae1-b99e-4a24-8ba0-766f49606dc4', 
        length: 480, 
        width: 125, 
        count: 4
    },
    {
        id: '2ed1a71f-fdc2-47a6-ab64-326f3a318578', 
        length: 1450, 
        width: 520, 
        count: 7
    },
];

export const sorting = (data) => {
    return data.sort((a, b) => (b.width * b.length) - (a.width * a.length));
}

// length: 3630,
// width: 1830,
const root = {
    x: 0, y: 0, w: 1830, h: 3630 
};



