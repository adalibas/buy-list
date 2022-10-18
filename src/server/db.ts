import Database from "better-sqlite3";
import {checkCreateDatabase} from './checkfile';
import {getTree} from './buildtree'

interface item {
    itemId:number,
    name: string,
    active: boolean,
}

interface category {
    categoryId: number,
    name: string,
    elements: item[],
    children: category[]
}

checkCreateDatabase();
let db = new Database("./buy-list.db",{fileMustExist: true});

export function createCategory(name: string,parentId:number){
    db.prepare(`
        insert into categories (name, parentId) values (@name,@parentId);
    `).run({name,"parentId":parentId})
}

function deleteCategory(categoryId:number){
    db.prepare(`
        delete from categories where categoryId = @categoryId
    `).run({"categoryId": categoryId});
}

export function renameCategory(categoryId:number, newName:string){
    db.prepare(`
        update categories
        set name = @newName
        where categoryId = @categoryId
    `).run({"categoryId": categoryId, newName})
}

export function createItem(name:string, category:number){
    db.prepare(`
        insert into items (name,category) values (@name,@category)
    `).run({name, "category": category})
}

export function renameItem(itemId:number, newName:string){
    db.prepare(`
        update items
        set name = @newName
        where itemId = @itemId
    `).run({"itemId": itemId, newName})
}

function changeItemActivation(itemId:number, active: boolean){
    let act = Number(active)
    db.prepare(`
        update items
        set active = @active
        where itemId = @itemId
    `).run({"itemId": itemId, 'active': act})
}


export function changeItemCategory(itemId:number, categoryId:number){
    db.prepare(`
        update items
        set category = @categoryId
        where itemId = @itemId
    `).run({'itemId': itemId, 'categoryId': categoryId})
}

export function deleteItem(itemId:number){
    db.prepare(`
        delete from items where itemId = @itemId
    `).run({"itemId":itemId})
}

function getdb(){
    return db.prepare(`
    select c.name as categoryName, c.categoryId, c.parentId, i.itemId, i.name as itemName, i.active
    from categories as c left join items as i  on c.categoryId = i.category;  
    `).all();
}

export function dbTree(){
    return getTree(getdb());
}

// createCategory("veg",1);
// createCategory("meat",1);
// createCategory("chicken",3);
// createItem("pirasa", 2);
// createItem("patlican",2);
// createItem("kiyma",3);
// createItem("but",4)


//deleteCategory(4);
//renameCategory(3,"ekmek");
//createItem("ekmek",3);
//changeItemActivation(1,true);
//renameItem(1,"kola")
//changeItemCategory(1,1)
// console.log(getdb())
// console.log("here is the array",JSON.stringify(getTree(getdb())));
