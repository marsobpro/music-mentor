import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import HowItWorks from "./pages/HowItWorks";
import Contact from "./pages/Contact";
import Lessons from "./pages/Lessons";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import CreateListing from "./pages/CreateListing";
import Profile from "./pages/Profile";
import SingleListing from "./pages/SingleListing";
import ProtectedRoute from "./utils/ProtectedRoute";
import EditListing from "./pages/EditListing";
import OnlineLessons from "./pages/OnlineLessons";

const subjectOptions = [
  { label: "Piano", value: "piano" },
  { label: "Guitar", value: "guitar" },
  { label: "Violin", value: "violin" },
];
const cityOptions = [
  { label: "Poznan", value: "poznan" },
  { label: "Szczecin", value: "szczecin" },
  { label: "Gdansk", value: "gdansk" },
];
const toastStyling = {
  duration: 4000,
  success: { style: { backgroundColor: "rgb(74 222 128)", color: "black" } },
  error: { style: { backgroundColor: "rgb(170 23 23)", color: "white" } },
};

export const AppContext = React.createContext(null);

function App() {
  return (
    <AppContext.Provider value={{ subjectOptions, cityOptions }}>
      <Router>
        <Toaster
          position="bottom-center"
          reverseOrder={false}
          toastOptions={toastStyling}
        />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/lessons/:subject" element={<Lessons />} />
          <Route path="/lessons/:subject/:city" element={<Lessons />} />
          <Route
            path="/lessons/:subject/:city/:id"
            element={<SingleListing />}
          />
          <Route path="/online-lessons/" element={<OnlineLessons />}></Route>
          <Route
            path="/online-lessons/:subject"
            element={<OnlineLessons />}
          ></Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/edit-listing/:id" element={<EditListing />} />
          <Route path="/profile" element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/create-listing" element={<ProtectedRoute />}>
            <Route path="/create-listing" element={<CreateListing />} />
          </Route>
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
