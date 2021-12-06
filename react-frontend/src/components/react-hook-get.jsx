import React, { useState, useEffect } from 'react';

export default function GetRequestHooks() {
    const [listgiInfo, setlistgiInfo] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/getlists',{
            credentials: "include"
          })
            .then(response => response.json())
            .then(object => setlistgiInfo(object))
        },[]);
      
    // empty dependency array means this effect will only run once (like componentDidMount in classes)

    return (
        <div className="card text-center m-3">
            <h5 className="card-header">GET Request with React Hooks</h5>
            <div className="card-body">
                Total react packages: {listgiInfo}
            </div>
        </div>
    );
}