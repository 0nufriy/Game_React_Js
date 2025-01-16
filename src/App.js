import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import MainScreen from './page/MainScreen/mainScreen';
import PlanetScreen from './page/PlanetScreen/planetScreen';
import UpgradeShip from './page/UpgradeShip/UpgradeShip';
import BaseScreen from './page/BaseScreen/BaseScreen';
import ProbeScreen from './page/ProbeScreen/ProbeScreen';
import InventoryScreen from './page/InventoryScreen/InventoryScreen';
import {login} from "./http"
import { useEffect, useLayoutEffect, useState } from 'react';

import LoadingItem from "./page/Components/Items/LoadingItem"


function App() {
  const [userData, setUserData] = useState(null)


  const [error, setError] = useState("");
  const [connectionError, setConnectionError] = useState("");
  const [loading, setLoading] = useState(true);


  useLayoutEffect(()=>{
    login({telegram_id: 123}).then(r => {
      
      if(r.error){
        setError(r.error);
      }else{
        localStorage.setItem("TOKEN", r.token)
        setUserData(r)
        
      }
    }).catch( err => {
      setConnectionError("Failed to connect");
    })
    .finally(() => {
      setLoading(false);
    });
  },[])



  if (loading) return <LoadingItem />;

  if (error)
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', textAlign: 'center' }}>{error}</h1>
      </div>
    );

  if (connectionError)
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', textAlign: 'center' }}>{connectionError}</h1>
      </div>
    );

  if(userData)
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <MainScreen userData={userData}></MainScreen>
          }>
          </Route>
          <Route path='/planet' element={
            <PlanetScreen userData={userData} setUserData={setUserData}></PlanetScreen>
          }>
          </Route>
          <Route path='/upgradeShip' element={
            <UpgradeShip userData={userData} setUserData={setUserData}></UpgradeShip>
          }>
          </Route>
          <Route path='/base' element={
            <BaseScreen userData={userData} setUserData={setUserData} ></BaseScreen>
          }>
          </Route>
          <Route path='/probe' element={
            <ProbeScreen userData={userData} setUserData={setUserData}></ProbeScreen>
          }>
          </Route>
          <Route path='/inventory' element={
            <InventoryScreen userData={userData}></InventoryScreen>
          }>
          </Route>


          <Route index path='*' element={
            <Navigate to="/"></Navigate>
        }></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
  else {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', textAlign: 'center' }}>Loading Failed</h1>
        <h5 style={{ fontSize: 'clamp(1rem, 2.5vw, 2rem)', textAlign: 'center' }}>
          Unable to connect. Please try again later.
        </h5>
      </div>
    );
  }
  
}

export default App;
