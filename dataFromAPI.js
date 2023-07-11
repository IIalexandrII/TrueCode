export class Model{
   constructor(token){
      this.token=token;
   }
   async SourcesForPeriod(date1,date2,id){
      let dataSource = new Array();
      await fetch(`https://api-metrika.yandex.net/stat/v1/data?date1=${date1}&date2=${date2}&dimensions=ym:s:<attribution>TrafficSource&attribution=cross_device_last_significant&filters=ym:s:isRobot=='No'&metrics=ym:s:visits,ym:s:users&lang=ru&id=${id}`,{
                                 method:'GET',
                                 headers:{Authorization:'OAuth '+this.token}
                              })
         .then(resp=>resp.json())
         .then(data=>{   
                        for(let item of data.data){
                           dataSource.push({
                                             name:item.dimensions[0].name,
                                             visits:item.metrics[0],
                                             users:item.metrics[1]
                                          });
                        }
         });
      return dataSource;
   }
   async DynamicsSiteTrafficForPeriod(date1,date2,id){
      let dataTraffic = new Array();
      await fetch(`https://api-metrika.yandex.net/stat/v1/data/bytime?date1=${date1}&date2=${date2}&group=day&metrics=ym:s:visits,ym:s:users&filters=ym:s:<attribution>TrafficSource=='organic' AND ym:s:isRobot=='No'&attribution=lastsign&lang=ru&id=${id}`,{
                                 method:'GET',
                                 headers:{Authorization:'OAuth '+this.token}
                              })
         .then(resp=>resp.json())
         .then(data=>{
                        for(let i = 0; i < data.time_intervals.length; i++){
                           dataTraffic.push({
                                             interval:data.time_intervals[i],
                                             visits:data.totals[0][i],
                                             users:data.totals[1][i]
                                          });
                        }
          });
      return dataTraffic;
   }
   async SearchPhrase(date1,date2,id,minUserOrVisit){
      let dataPhrase = new Array();
      await fetch(`https://api-metrika.yandex.net/stat/v1/data?date1=${date1}&date2=${date2}&filters=(ym:s:visits>${minUserOrVisit} OR ym:s:users>${minUserOrVisit}) AND ym:s:isRobot=='No'&dimensions=ym:s:SearchPhrase&metrics=ym:s:visits,ym:s:users&lang=ru&id=${id}`,{
                                 method:'GET',
                                 headers:{Authorization:'OAuth '+this.token}
                              })
         .then(resp=>resp.json())
         .then(data=>{
                     for(let item of data.data){
                        dataPhrase.push({
                              name:item.dimensions[0].name,
                              visits:item.metrics[0],
                              users:item.metrics[1]
                           });
                     }
         });
      return dataPhrase;
   }
   async DeviceCategory(date1,date2,id,){
      let dataDevice = new Array();
      await fetch(`https://api-metrika.yandex.net/stat/v1/data?date1=${date1}&date2=${date2}&filters=ym:s:isRobot=='No'&dimensions=ym:s:deviceCategory&metrics=ym:s:visits,ym:s:users&lang=ru&id=${id}`,{
                                 method:'GET',
                                 headers:{Authorization:'OAuth '+this.token}
                              })
         .then(resp=>resp.json())
         .then(data=>{
                     for(let item of data.data){
                        dataDevice.push({
                              name:item.dimensions[0].name,
                              visits:item.metrics[0],
                              users:item.metrics[1]
                           });
                     }
         });
      return dataDevice;
   }
   async SearchEngine(date1,date2,id,){
      let dataSearchEngine = new Array();
      await fetch(`https://api-metrika.yandex.net/stat/v1/data?date1=${date1}&date2=${date2}&dimensions=ym:s:<attribution>SearchEngineRoot&attribution=cross_device_last_significant&filters=ym:s:isRobot=='NO'&metrics=ym:s:visits,ym:s:users&lang=ru&id=${id}`,{
                                 method:'GET',
                                 headers:{Authorization:'OAuth '+this.token}
                              })
         .then(resp=>resp.json())
         .then(data=>{
                     for(let item of data.data){
                        dataSearchEngine.push({
                              name:item.dimensions[0].name,
                              visits:item.metrics[0],
                              users:item.metrics[1]
                           });
                     }
         });
      return dataSearchEngine;
   }
   async Conversion(date1,date2,id,){
      let dataGoalIDs = new Array();
      let dataConversion = new Array();
      await fetch(`https://api-metrika.yandex.net/stat/v1/data?date1=${date1}&date2=${date2}&filteres=ym:s:isRobot=='NO'&dimensions=ym:s:goal&metrics=ym:s:anyGoalConversionRate&lang=ru&id=${id}`,{
                                 method:'GET',
                                 headers:{Authorization:'OAuth '+this.token}
                              })
         .then(resp=>resp.json())
         .then(data=>{
                     for(let item of data.data){
                        dataGoalIDs.push({
                              id:item.dimensions[0].id,
                              name:item.dimensions[0].name
                           });
                     }
         });
         for(let i = 0;i<dataGoalIDs.length;i++){
            await fetch(`https://api-metrika.yandex.net/stat/v1/data?date1=${date1}&date2=${date2}&metrics=ym:s:goal<goal_id>conversionRate&goal_id=${dataGoalIDs[i].id}&lang=ru&id=${id}`,{method:"GET",headers:{Authorization:'OAuth '+this.token}})
               .then(resp=>resp.json())
               .then(data=>dataConversion.push({goalName:dataGoalIDs[i].name, conversion:data.data[0].metrics[0]}))
         }
      return dataConversion;
   }
}



