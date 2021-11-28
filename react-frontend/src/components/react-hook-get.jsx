import React, { useState, useEffect } from 'react';

export default function GetRequestHooks() {
    const [totalReactPackages, setTotalReactPackages] = useState(null);
    const city = 'ashkelon'
    useEffect(() => {
        // GET request using fetch inside useEffect React hook
        fetch('http://api.openweathermap.org/data/2.5/weather?q='+city+'&units=metric&appid=e53647cd71abcf81c779b83f1a8807c1')
            .then(response => response.json())
            .then(data => setTotalReactPackages(data.main.temp));

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);

    return (
        <div className="card text-center m-3">
            <h5 className="card-header">GET Request with React Hooks</h5>
            <div className="card-body">
                Total react packages: {totalReactPackages}
            </div>
        </div>
    );
}

export { GetRequestHooks };