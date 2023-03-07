import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Lessons from "./pages/Lessons";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import CreateListing from "./pages/CreateListing";
import Profile from "./pages/Profile";
import SingleListing from "./pages/SingleListing";

const subjectOptions = [
  { label: "Piano", value: "piano" },
  { label: "Guitar", value: "guitar" },
  { label: "Violin", value: "violin" },
  { label: "Cello", value: "cello" },
];
const cityOptions = [
  { label: "Poznan", value: "poznan" },
  { label: "Szczecin", value: "szczecin" },
  { label: "Gdansk", value: "gdansk" },
];

export const AppContext = React.createContext(null);

function App() {
  return (
    <AppContext.Provider value={{ subjectOptions, cityOptions }}>
      <Router>
        <Toaster position="bottom-center" reverseOrder={false} />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/lessons/:subject/:city" element={<Lessons />} />
          <Route
            path="/lessons/:subject/:city/:id"
            element={<SingleListing />}
          />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
