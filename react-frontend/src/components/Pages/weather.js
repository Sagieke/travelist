import React,{useState,useEffect} from "react";
import ReactWeather, { useOpenWeather } from 'react-open-weather';
import {Modal,Button} from "react-bootstrap";
  //Requirement number 6
export default function  WeatherPage(props)  {

  
  let { data, isLoading, errorMessage } = useOpenWeather({
    key: "5d50cb77a4d850371ce5a430e31c9b24",
    lat: props.lat,
    lon: props.lon,
    lang: "en",
    unit: "metric" // values are (metric, standard, imperial)
  });
  
  return (
    <div>
    <ReactWeather
      //theme={customStyles}
      isLoading={isLoading}
      errorMessage={errorMessage}
      data={data}
      lang="en"
      locationLabel={props.name}
      unitsLabels={{ temperature: "C", windSpeed: "Km/h" }}
      showForecast
    />
    
     </div>
  );
};
