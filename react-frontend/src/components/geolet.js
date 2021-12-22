import React, { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

export default function Longlet(){
  const [value, setValue] = useState(null);

  return (
<div className="auth-wrapper">
     
        <div className="auth-inner-left">
          <h1>ss</h1>
          <hr class="my-4"></hr>
          <GooglePlacesAutocomplete
        apiKey="AIzaSyC43U2-wqXxYEk1RBrTLdkYt3aDoOxO4Fw"
        selectProps={{     
          value,
          onChange: setValue,
        }}
    
      />
        
          <br />
         
          </div>
          <br />
        
        </div>













  );
}