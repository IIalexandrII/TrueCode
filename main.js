//------------------------------
console.clear();
//------------------------------
import fetch from 'node-fetch';
import express from "express";
import bodyParser from "body-parser";
import {Model} from "./dataFromAPI.js";

const __dirname = new URL("./",import.meta.url).href.slice(8);
const token = 'y0_AgAAAABu9NRrAAolqgAAAADnKTk34NU7eXSCTiG-M1YC6p-zwSwK9bc';
const model = new Model(token);

const app = express();
const hostname="0.0.0.0";
const port = 3000;

app.use(express.static('view'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/',(req, res)=>{
   res.sendFile(__dirname + "./view/index.html");
});

app.get('/getIds',async (req,res)=>{
   let response = new Array();
   let yandexReq = await fetch("https://api-metrika.yandex.net/management/v1/counters",{ method:'GET',headers:{Authorization:'OAuth '+token}})
   let data = (await yandexReq.json()).counters;
   for(let item of data){
      response.push({id:item.id,name:item.name,site:item.site});
   }
   res.send(response);
});

app.post('/getData',async (req,res)=>{
   console.log(req.body);

   let dataSource = await model.SourcesForPeriod(req.body.dateForSource.start, req.body.dateForSource.end, req.body.id);
   //console.log(dataSource);

   let dataTraffic = await model.DynamicsSiteTrafficForPeriod(req.body.dateForTraffic.start, req.body.dateForTraffic.end, req.body.id);
   //console.log(dataTraffic);

   let dataPhrase = await model.SearchPhrase(req.body.dateForPhrase.start, req.body.dateForPhrase.end, req.body.id, req.body.dateForPhrase.minValue);
   //console.log(dataPhrase);

   let dataDevice = await model.DeviceCategory(req.body.dateForDevice.start, req.body.dateForDevice.end, req.body.id);
   // console.log(dataDevice);

   let dataSearchEngine = await model.SearchEngine(req.body.dateForSearchEngine.start, req.body.dateForSearchEngine.end, req.body.id);
   // console.log(dataSearchEngine);

   let dataConversion = await model.Conversion(req.body.dateForConversion.start, req.body.dateForConversion.end, req.body.id);
   // console.log(dataConversion);

   res.send({
      source:dataSource,
      traffic:dataTraffic,
      phrase:dataPhrase,
      device:dataDevice,
      searchEngine:dataSearchEngine,
      conversion:dataConversion
   });
});

app.listen(port,hostname,()=>{console.log('\x1b[32m%s\x1b[0m',"------------STARTED------------");});

