const data = [
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

const sorting = (data) => {
    return data.sort((a, b) => (b.width * b.length) - (a.width * a.length));
}

// const calcCutArea = (data) => {
//     return data.map(cat => {
//         return {
//             ...cat,
//             area: cat.length * cat.width
//         }
//     })
// }


// length: 3630,
// width: 1830,
const root = {
    x: 0,
    y: 0,
    length: 3630, 
    width: 1830,
};

const fit = (blocks) => {
    // debugger;
    console.log('blocks', [...blocks]);
    let node, block;
    for(let n = 0; n < blocks.length; n++) {
        block = blocks[n];
        console.log('bbbbb============', block);
        if(node = findNode(root, block.width, block.length)) {
            block.fit = splitNode(node, block.width, block.length);
        }
    }
    return blocks
}


const findNode = (root, width, length) => {
    console.log('root, width, length', root, width, length);
    if(root.used) {
        return findNode(root.right, width, length) || findNode(root.down, width, length);
    } else if((width <= root.width) && (length <= root.length)) {
        return root;
    } else {
        return null;
    }
}

const splitNode = (node, width, length) => {
    console.log('node', node);
    console.log('width', width);
    console.log('length', length);
    node.used = true;
    node.down  = { 
        x: node.x,
        y: node.y + length,
        width: node.width,
        length: node.length - length
    };
    node.right = {
        x: node.x + width,
        y: node.y,
        width: node.width - width,
        length: length
    };
    return node;
}


export const run = () => {
    console.log('data', data);
    const sortingData = sorting(data);
    console.log('sortingData', sortingData);
    const fitData = fit([...sortingData]);
    console.log('fitData', fitData);
    return fitData;
}

