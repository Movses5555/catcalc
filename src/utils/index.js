const data = [
    {
        id: '675f3a96-d949-4f3f-898b-8897dae00abd', 
        width: 1210, 
        height: 140,
        count: 3
    },
    {
        id: 'b1a9eae1-b99e-4a24-8ba0-766f49606dc4', 
        width: 480, 
        height: 125, 
        count: 4
    },
    // {
    //     id: 'b1a9eae1-b99e-4a24-8ba0-766f49606dc5', 
    //     width: 480, 
    //     height: 120, 
    //     count: 7
    // },
    {
        id: '2ed1a71f-fdc2-47a6-ab64-326f3a318578', 
        width: 1450, 
        height: 520, 
        count: 2
    },
];

const sorting = (data) => {
    console.log('data-----', data);
    return data.sort((a, b) => (b.width * b.height) - (a.width * a.height));
}

// deserialize: function(val) {
//     var i, j, block, blocks = val.split("\n"), result = [];
//     for(i = 0 ; i < blocks.length ; i++) {
//       block = blocks[i].split("x");
//       if (block.length >= 2)
//         result.push({w: parseInt(block[0]), h: parseInt(block[1]), num: (block.length == 2 ? 1 : parseInt(block[2])) });
//     }
//     var expanded = [];
//     for(i = 0 ; i < result.length ; i++) {
//       for(j = 0 ; j < result[i].num ; j++)
//         expanded.push({
//             w: result[i].w, 
//             h: result[i].h, 
//             area: result[i].w * result[i].h
//         });
//     }
//     return expanded;
// };

const changeData = (data) => {
    console.log('ddddddddd', data);
    const result = [];
    for(let i = 0; i < data.length; i++) {
        console.log('aaaaaaa',data[i].count );
        for(let j = 0; j < data[i].count; j++) {
            result.push({
                id: data[i].id,
                w: data[i].width,
                h: data[i].height,
            })
        }
    }
    console.log('result', result);
    return result;

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
let root = {
    x: 0,
    y: 0,
    w: 3630, 
    h: 1830,
};

const fit = (blocks) => {
    console.log('8888888888888888888888888888888888');

    // debugger;
    console.log('blocks----', blocks);
    let node, block;
    for(let n = 0; n < blocks.length; n++) {
        console.log('this.root', root);
        block = blocks[n];
        console.log('bbbbb============', block);
        node = findNode(root, block.w, block.h)
        console.log('node', node);
        if(node) {
            block.fit = splitNode(node, block.w, block.h);
        }
        console.log('block========', block);
    }
    root = {
        x: 0,
        y: 0,
        w: 3630, 
        h: 1830,
    };

    return {
        fitBlocks: blocks.filter(block => block.fit), 
        noFitBlocks: blocks.filter(block => !block.fit) 
    }
}


const findNode = (root, w, h) => {
    console.log('root, w, h', root, w, h);
    // debugger;
    if(root.used) {
        return findNode(root.right, w, h) || findNode(root.down, w, h);
    } else if((w <= root.w) && (h <= root.h)) {
        return root;
    } else {
        return null;
    }
}

const splitNode = (node, w, h) => {
    console.log('node', node);
    console.log('width', w);
    console.log('length', h);
    node.used = true;
    node.down  = { 
        x: node.x,
        y: node.y + h + 10,
        w: node.w,
        h: node.h - h
    };
    node.right = {
        x: node.x + w + 10,
        y: node.y,
        w: node.w - w,
        h: h
    };
    return node;
}

let sheetsData = [];
const getSheets = (data) => {
    const fitData = fit(data);
    sheetsData.push(fitData.fitBlocks);
    if(fitData.noFitBlocks.length) {
        return getSheets(fitData.noFitBlocks);
    } else {
        return sheetsData;
    }
}

export const run = () => {
    // console.log('data', data);
    sheetsData = [];
    const sortingData = sorting(data);
    console.log('sortingData', sortingData);
    const newData = changeData(sortingData);
    console.log('newData', newData);
    const fitData = getSheets(newData);
    console.log('fitData==========', fitData);
    return fitData;
}

