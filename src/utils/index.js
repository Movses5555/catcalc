
const sorting = (data) => {
    return data.sort((a, b) => (b.width * b.height) - (a.width * a.height));
}

const changeData = (data) => {
    const result = [];
    for(let i = 0; i < data.length; i++) {
        for(let j = 0; j < data[i].count; j++) {
            result.push({
                id: data[i].id,
                w: data[i].width,
                h: data[i].height,
            })
        }
    }
    return result;
}

let root = {
    x: 0,
    y: 0,
    w: 3630, 
    h: 1830,
};

const fit = (blocks) => {
    let node, block;
    for(let n = 0; n < blocks.length; n++) {
        block = blocks[n];
        node = findNode(root, block.w, block.h)
        if(node) {
            block.fit = splitNode(node, block.w, block.h);
        }
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
    if(root.used) {
        return findNode(root.right, w, h) || findNode(root.down, w, h);
    } else if((w <= root.w) && (h <= root.h)) {
        return root;
    } else {
        return null;
    }
}

const splitNode = (node, w, h) => {
    node.used = true;
    node.down  = {
        x: node.x,
        y: node.y + h + 5,
        w: node.w,
        h: node.h - h - 5
    };
    node.right = {
        x: node.x + w + 5,
        y: node.y,
        w: node.w - w - 5,
        h: h
    };
    return node;
}

const getSheets = (sheetsData, data) => {
    const fitData = fit(data);
    sheetsData.push(fitData.fitBlocks);
    if(fitData.noFitBlocks.length) {
        return getSheets(sheetsData, fitData.noFitBlocks);
    } else {
        return sheetsData;
    }
}

export const Cutting = (data) => {
    let sheetsData = [];
    const sortingData = sorting(data);
    const newData = changeData(sortingData);
    const fitData = getSheets(sheetsData, newData);
    return fitData;
}

