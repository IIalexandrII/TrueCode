Array.prototype.includeObjSite = function(obj){
   for(let element of this){
      if(element.site_URL==obj.site){
         return true;
      }
   }
   return false;
}

import mysql from "mysql2"
import {Model} from './dataFromAPI.js'


const tokenYandex = '';
const tokenTopVisor = '';
const getData = new Model(tokenYandex,tokenTopVisor);

const conn = mysql.createConnection({
   host:"127.0.0.1",
   user:"root",
   database:"metrics",
   password:""
}).promise();

async function addIdProjInDB(conn){
   let sqlInsertQuery = "INSERT INTO project_id(site_URL, id_yandex, id_topvisor, name) VALUES (?,?,?,?)";
   let sqlSelectQuery = "SELECT site_URL FROM project_id";
   let data = await getData.getIDs();
   
   let projFromDB;

   let errorCheck = false;
   await conn.execute(sqlSelectQuery).then(([rows,field])=>{projFromDB = rows}).catch(err=>{console.log('\x1b[31m%s\x1b[0m',"error add id",err); errorCheck=true});
   if(errorCheck) return;

   let dataForAddInDB = new Array(); 
   for(let projAPI of data){
      if(!projFromDB.includeObjSite(projAPI)){
         dataForAddInDB.push([projAPI.site, projAPI.idYandex, projAPI.idTopVisor, projAPI.name]);
      }
   }
   if(dataForAddInDB.length>0){
      for(let sqlData of dataForAddInDB){
         await conn.execute(sqlInsertQuery,sqlData).then(([result,field])=>console.log('\x1b[33m%s\x1b[0m',"id added")).catch(err=>console.log('\x1b[31m%s\x1b[0m',"error add id",err));
      }
   }else{
      console.log('\x1b[33m%s\x1b[0m',"no new projects found");
   }
}

async function main(){
   await conn.connect().then(result=>console.log('\x1b[32m%s\x1b[0m',"Database connected")).catch(err=>console.log('\x1b[31m%s\x1b[0m',err));
   await addIdProjInDB(conn);
   await conn.end().then(result=>console.log('\x1b[32m%s\x1b[0m',"Database disconnected")).catch(err=>console.log('\x1b[31m%s\x1b[0m',err))
}
main();



// 
// let data = ['www.sad.asd','465','798','rtyuukjn']
// conn.execute(sql, data, err=>{console.log(err)}, result=>console.log(result))
// conn.execute("SELECT * FROM `project_id`",(err,result)=>{
//    for(let row of result){
//       console.log(row)
//    }
// });
//let test = ['www.sad.asd','465','798','rtyuukjn']
//conn.execute(sqlInsertData,test);
