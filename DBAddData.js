import mysql from "mysql2"
import {Model} from './dataFromAPI.js'


const tokenYandex = 'y0_AgAAAABu9NRrAAolqgAAAADnKTk34NU7eXSCTiG-M1YC6p-zwSwK9bc';
const tokenTopVisor = '46d84eaa08c50379ce6b59607e0d5b79';
const getData = new Model(tokenYandex,tokenTopVisor);

const conn = mysql.createConnection({
   host:"127.0.0.1",
   user:"root",
   database:"metrics",
   password:""
}).promise();

async function addIdProjInDB(conn){
   let sqlInsertData = "INSERT INTO project_id(site_URL, id_yandex, id_topvisor, name) VALUES (?,?,?,?)";
   let sqlSelectData = "SELECT site_URL FROM project_id";
   let data = await getData.getIDs();
   
   let projFromDB; 
   await conn.execute(sqlSelectData).then(([rows,field])=>{projFromDB = rows});
   for(let proj of projFromDB){
      
   }
}

async function main(){
   await conn.connect((err)=>{if(err)console.log(err);else console.log("database connected")});
   await addIdProjInDB(conn);
   await conn.end((err)=>{if(err)console.log(err);else console.log("database disconnected")})
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