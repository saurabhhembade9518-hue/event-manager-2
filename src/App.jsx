import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./Component/Navbar";
import { Footer } from "./Component/Footer";
import {Home} from "./Component/Home";
import { Events } from "./Component/Events";
import { Card_Details } from "./Component/Card_Details";
import { AllEvents } from "./Component/All_Events";
import {Payment} from "./Component/Payment"; 

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events/:clubId" element={<Events />} />
          <Route path="/card_details/:eventId" element={<Card_Details />} />
          <Route path="/events" element= {<AllEvents/>}/>
          <Route path="/payment" element={<Payment/>} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
