const catchAsync = require('./../utils/catchAsync');
const Weather = require('../models/weatherModel');
const fetch = require('node-fetch');

let storeResultsInDB= async(json,place)=> {
    return {
      coord:[json.coord.lon,json.coord.lat],
      weather:{ 
        main:json.weather[0].main,
        description:json.weather[0].description,
        temp:json.main.temp,
        pressure:json.main.pressure,
        humidity:json.main.humidity,
        visibility:json.visibility,
        windSpeed:json.wind.speed,
        clouds:json.clouds.all,
        country:json.sys.country,
      },
      searchQuery:place,
    }
  }

exports.getOverview = catchAsync(async(req,res,next)=>{
    let data;
    if(req.query.place){
        let api_url = `http://api.openweathermap.org/data/2.5/weather?q=${req.query.place}&appid=${process.env.API_ID}`;
        let weather = await fetch(api_url);
        let json = await weather.json();
        if(json.cod=='404'){
            data=null;
        }else{
            data =await storeResultsInDB(json,req.query.place);
            await Weather.create(data);
        }
    }
    res.status(200).render('weatherReport', {
        title: 'All Tours',
        data
      });
});

exports.getAll = catchAsync(async(req,res,next)=>{

  if(req.query.createdAt) {
    // const event =req.query.createdAt;
    // if(!event.lte){ event.lte=new Date(Date.now()).toISOString()}
    // else{event.lte=new Date(event.lte)}
    // req.query.createdAt = {"gte":new Date(event.gte),"lte":event.lte};
  }
  let queryStr = JSON.stringify({...req.query});
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
  const query = Weather.find(JSON.parse(queryStr)).sort('-createdAt');
  const doc = await query;
  
  res.status(200).render('weatherHistory', {
      title: 'All Tours',
      results:doc.length,
      data:doc
    });
});
