import React,{useState} from "react";
import ReactWeather, { useOpenWeather } from 'react-open-weather';
import {Modal,Button} from "react-bootstrap";

export default function  WeatherPage()  {
  const { data, isLoading, errorMessage } = useOpenWeather({
    key: "b3f6d1b828d70b152d06eed90c69d8c8",
    lat: "27.4",
    lon: "48.42",
    lang: "en",
    unit: "metric" // values are (metric, standard, imperial)
  });

  return (
    <ReactWeather
      //theme={customStyles}
      isLoading={isLoading}
      errorMessage={errorMessage}
      data={data}
      lang="en"
      locationLabel="dani"
      unitsLabels={{ temperature: "C", windSpeed: "Km/h" }}
      showForecast
    />
  );
};
