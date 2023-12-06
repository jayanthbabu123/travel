import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Header from "./Components/Header";
import MyTrips from "./Pages/MyTrips/MyTrips";
import Services from "./Pages/Services/Services";
import AboutUs from "./Pages/About-us/About-Us";
import LongTrip from "./Pages/Long-Trip/Long-Trip";
import OneDayTrip from "./Pages/One-Day/One-Day";
import TwoDayTrip from "./Pages/Two-Day/Two-Day";
import AllTrips from "./Pages/All-Trips/All-Trips";
import Users from "./Pages/Users/Users";
import {
  AdminRoute,
  PublicRoute,
  PrivateRoute,
} from "./Components/ConditionalRoute";

const AppRoutes = () => {
  return (
    <>
      <Router>
        <Header></Header>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/home" element={<Home />} />
          <Route path="/login" element={<PublicRoute element={<Login />} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/my-trips"
            element={<PrivateRoute element={<MyTrips />} />}
          />
          <Route
            path="/all-users"
            element={<AdminRoute element={<Users />} />}
          />
          <Route path="/services" element={<Services />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route
            path="/long-trip"
            element={<PrivateRoute element={<LongTrip />} />}
          />
          <Route
            path="/one-day"
            element={<PrivateRoute element={<OneDayTrip />} />}
          />
          <Route
            path="/two-day"
            element={<PrivateRoute element={<TwoDayTrip />} />}
          />
          <Route
            path="/all-trips"
            element={<PrivateRoute element={<AllTrips />} />}
          />
        </Routes>
      </Router>
    </>
  );
};

export default AppRoutes;
