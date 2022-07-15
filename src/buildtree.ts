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


type catInfo = {
    id: number,
    name: string
}

export function getTree(res: dbresult[]):category[]{
    
    let catItemMap = new Map<number,item[]>();
    
    for (let elem of res){
        let itemId = elem.itemId;

        if(itemId == null){
            continue;
        } else{
            let itemName = elem.itemName!;
            let active = elem.active!;
            let id = elem.itemId!
            let item = {"id":id, "name": itemName, "active": Boolean(active)};
            if (catItemMap.has(elem.categoryId)){
                let old = catItemMap.get(elem.categoryId)!;
                if (old.includes(item)){
                    continue
                } else {
                    old.push(item);
                    catItemMap.set(elem.categoryId, old)
                }

            } else {
                catItemMap.set(elem.categoryId,[item])
            }
        }
    }



    let catChildMap = new Map<number,catInfo[]>();

    for (let elem of res) {
        if (elem.parentId == null){
            continue
        } else {
            if (catChildMap.has(elem.parentId)){
                let old = catChildMap.get(elem.parentId)!;
                let now = {"id": elem.categoryId, "name": elem.categoryName}
                if (old.includes(now)){
                    continue
                } else {
                    old.push(now);
                    catChildMap.set(elem.parentId, old);
                }

            } else {
                catChildMap.set(elem.parentId,[{"id": elem.categoryId, "name": elem.categoryName}]);
            }
        }
    }

    function tree(mem: catInfo): category{
        let children = catChildMap.get(mem.id)
        if (children == null){
            let elements = catItemMap.get(mem.id)!
            return {id: mem.id, name: mem.name, children: [], elements }
        } else {
            let childrenArray = [];
            let elements = catItemMap.get(mem.id)!

            for (let elem of children){
                childrenArray.push(tree(elem))
            }

            return {id: mem.id, name: mem.name, children: childrenArray, elements }

        }
    }

    let root = res.find(elem => elem.parentId == null)!;
    return [tree({id: root.categoryId, name: root.categoryName})];

}