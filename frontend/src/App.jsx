import React, { useState, useEffect } from 'react';

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/data') // Calls backend via proxy (no direct exposure)
      .then((res) => res.json())
      .then((data) => setData(data.message))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>    
      <h1 className={` font-primary text-[var(--PRIMARY_COLOR)] w-full z-10 text-center `} >
       THREEJS REACT TAILWINDCSS DEVELOPMENT
      </h1>
 
     <p className="  text-center text-amber-600 text-2xl">Hello Server: {data}</p> 
    </div> 

 
  )
}

export default App;
