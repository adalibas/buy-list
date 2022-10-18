interface dbresult {
    categoryName: string,
    categoryId: number,
    parentId: null | number,
    itemId: null | number,
    itemName: null | string,
    active: null | number
}

interface item {
    id: number,
    name: string,
    active: boolean,
}

interface category {
    id: number,
    name: string,
    elements: item[],
    children: category[]
}



export function getTree(res: dbresult[]):category {
    
    let catIdChildIdMap = new Map<number,number[]>();
    for (let elem of res) {
        let parentId = elem.parentId;
        if (parentId == null){
            continue;
        } else {
            let elemId = elem.categoryId
            if (catIdChildIdMap.has(parentId)){
                let old = catIdChildIdMap.get(parentId)!;
                if (old.includes(elemId)){
                    continue;
                } else {
                    old.push(elemId);
                    catIdChildIdMap.set(parentId,old)
                }
            } else {
                catIdChildIdMap.set(parentId,[elemId])
            }
        }
    }

    let itemIdItemMap = new Map<number,item>();
    for (let elem of res) {
        let itemId = elem.itemId;
        if (itemId == null){
            continue;
        } else {
            let name = elem.itemName!;
            let active = Boolean(elem.active)
            let id = elem.itemId!

            let item = {id,name,active}
            if (itemIdItemMap.has(itemId)) {
                continue
            } else {
                itemIdItemMap.set(itemId,item)
            }
        }
    }

    let catIdItemIdMap = new Map<number,number[]>();
    for (let elem of res) {
        let catId = elem.categoryId;
        let itId = elem.itemId;
        if (itId ==null){
            continue;
        } else {
            if (catIdItemIdMap.has(catId)){
                let old = catIdItemIdMap.get(catId)!;
                if (old.includes(itId)){
                    continue;
                } else {
                    old.push(itId);
                    catIdItemIdMap.set(catId,old)
                }
            } else {
                catIdItemIdMap.set(catId,[itId])
            }
        }
    }

    let catIdcatNameMap = new Map<number,string>();
    for (let elem of res) {
        let catId = elem.categoryId;
        let name = elem.categoryName;
        catIdcatNameMap.set(catId,name)
    }

    function tree(catId: number): category {
        if (catIdChildIdMap.get(catId) == null) {
            let catName = catIdcatNameMap.get(catId)!;
            let elemIds = catIdItemIdMap.get(catId)
            if (elemIds == null) {
                return {id: catId, name: catName, elements: [], children: []}
            } else {
                let elements = elemIds.map(id => itemIdItemMap.get(id)!);
                return {id: catId, name: catName, elements, children: []}
            }
            
        } else {
            let childrenIds = catIdChildIdMap.get(catId)
            
            let catName = catIdcatNameMap.get(catId)!;
            let elemIds = catIdItemIdMap.get(catId);
            let elements: item[];
            let children:category[];
            if (elemIds == null){
                elements = []
            } else {
                elements = elemIds.map(id => itemIdItemMap.get(id)!);
            }

            if (childrenIds == null) {
                children = []
            } else {
                children = childrenIds.map(id => tree(id));
            }

            return {id:catId, name: catName, elements, children}

        }
    }

    return tree(1)
}
