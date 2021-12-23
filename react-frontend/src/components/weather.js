import React,{useState} from "react";
import ReactWeather, { useOpenWeather } from 'react-open-weather';
import {Modal,Button} from "react-bootstrap";

export default function  WeatherPage(props)  {
    const { data, isLoading, errorMessage } = useOpenWeather({
    key: 'e53647cd71abcf81c779b83f1a8807c1',
    lat: '48.137154',
    lon: '11.576124',
    lang: 'he',
    unit: 'metric', // values are (metric, standard, imperial)
  });
  return (
      <div>
   
              <ReactWeather
                  isLoading={isLoading}
                  errorMessage={errorMessage}
                  data={data}
                  lang="he"
                  locationLabel={props.name}
                  unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
                  showForecast />
          
      </div>
  );
};
