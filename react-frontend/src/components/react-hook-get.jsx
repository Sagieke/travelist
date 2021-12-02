import React, { useState, useEffect } from 'react';

export default function GetRequestHooks() {
    const [totalReactPackages, setTotalReactPackages] = useState('');
    useEffect(() => {
        fetch('http://localhost:5000/getlists')
            .then(response => response.json())
            .then(object => console.log(object))
        },[]);
      
    // empty dependency array means this effect will only run once (like componentDidMount in classes)

    return (
        <div className="card text-center m-3">
            <h5 className="card-header">GET Request with React Hooks</h5>
            <div className="card-body">
                Total react packages: {totalReactPackages}
            </div>
        </div>
    );
}