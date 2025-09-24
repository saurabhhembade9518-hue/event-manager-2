import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./Component/Navbar";
import { Footer } from "./Component/Footer";
import {Home} from "./Component/Home";
import { Events } from "./Component/Events";
import { CardDetails } from "./Component/CardDetails";
import { AllEvents } from "./Component/AllEvents";
import {Payment} from "./Component/Payment"; 
import Login from "./Component/Login"; 
import Profile from "./Component/Profile"; 
import Signup from "./Component/Signup";


const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events/:clubId" element={<Events />} />
          <Route path="/card_details/:eventId" element={<CardDetails />} />
          <Route path="/events" element= {<AllEvents/>}/>
          <Route path="/payment" element={<Payment/>} />
          <Route path="/login" element={<Login/>}/> 
          <Route path="/profile" element= {<Profile/>} />
          <Route path="/signUp" element= {<Signup/>} />
        </Routes>
      </div>
     
    </div>
  );
};

export default App;
