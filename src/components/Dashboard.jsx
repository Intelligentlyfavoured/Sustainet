import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Dashboard() {
  const [data, setData] = useState({
    totalInitiated: 0,
    totalAuthorised: 0,
    totalReviewed: 0,
    finalAuthorization: 0,
  });

 
  useEffect(() => {

    const fetchData = async () => {
      try {
       
        const response = await fetch('/api/dashboard-data');
        const result = await response.json();
        setData(result); 
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    // fetchData();
  }, []); 

  return (
<div>
  <Sidebar/>
    <div className="dashboard-container">
   
      <div className="tabs-container">
        <div className="tab">
          <Link to="/">
            <span>Total Initiated<br /><b> {data.totalInitiated}</b></span>
          </Link>
        </div>
        <div className="tab">
          <Link to="/">
            <span>Total Authorised<br /><b> {data.totalAuthorised}</b></span>
          </Link>
        </div>
        <div className="tab">
          <Link to="/">
            <span>Total Reviewed<br /> <b>{data.totalReviewed}</b></span>
          </Link>
        </div>
        <div className="tab">
          <Link to="/">
            <span>Final Authorization<br /><b> {data.finalAuthorization}</b></span>
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
}
