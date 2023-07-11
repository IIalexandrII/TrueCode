const main = document.getElementById("table");
const select = document.getElementById("idProj");

async function start(){
   let res = await fetch("/getIds",{method:"GET"});
   let ids = await res.json();
   let test='<option value="no"selected></option>';   
   //console.log(ids);
   for(id of ids){
      test+=`<option value='${id.idYandex}_${id.idTopVisor}'>${id.name}</option>`;
   }
   select.innerHTML = test;
}

async function getData(){
   if(select.value=="no"){console.log("nononono");return;}
   console.log(); 
   let dates = {
      idYandex: select.value.split("_")[0],
      idTopVisor:select.value.split("_")[1],
      dateForSource:{
         start:"2023-07-03",
         end:"2023-07-09"
      },
      dateForTraffic:{
         start:"2023-07-03",
         end:"2023-07-09"
      },
      dateForPhrase:{
         start:"2023-07-03",
         end:"2023-07-09",
         minValue:0
      },
      dateForDevice:{
         start:"2023-07-03",
         end:"2023-07-09",
      },
      dateForSearchEngine:{
         start:"2023-07-03",
         end:"2023-07-09",
      },
      dateForConversion:{
         start:"2023-07-03",
         end:"2023-07-09",
      }
   };
   let data = await (await fetch("/getData",{
      method: 'POST',
      headers: {
         'Accept': 'application/json, text/plain, */*',
         'Content-Type': 'application/json'
      },
      body:JSON.stringify(dates)
   })).json();
   console.log(data);
}

start()