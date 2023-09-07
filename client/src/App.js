import React from 'react';
import {Route,Link, Routes} from 'react-router-dom'
import BankForm from './components/BankForm';
import Clients from './components/Clients';
import './App.css';

function App() {
  return(
    <>
      <Routes>
      <Route path="/" element={<BankForm/>}/>
      <Route path="/clients" element={<Clients/>}/>
      </Routes>
     
    </>
  );
}

export default App;
