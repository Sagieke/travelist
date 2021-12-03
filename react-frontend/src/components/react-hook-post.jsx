import React, { useState, useEffect } from 'react';

export default function PostRequestHooks() {
    const [postId, setPostId] = useState(null);

    useEffect(() => {
        // POST request using fetch inside useEffect React hook
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ListName:'test2',color:'#fffff3f'})
        };
        fetch('http://localhost:5000/getliststest', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    },);

    return (
        <div className="card text-center m-3">
            <h5 className="card-header">POST Request with React Hooks</h5>
            <div className="card-body">
                Returned Id: {postId}
            </div>
        </div>
    );
}

