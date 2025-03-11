import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Archive from "./pages/Archive";
import Header from "./components/ui/header/Header";
import ActivityDetails from "./components/details_card/ActivityDetails";
import { ToastContainer } from "react-toastify";
import useFetch from "./hooks/useFetch";
import usePatch from "./hooks/useUpdateActivity";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "./constants";
import LoadingSpinner from "./components/ui/loader/LoadingSpinner";

const App = () => {
  const { data, loading, error } = useFetch(BASE_URL);
  const [activities, setActivities] = useState();

  useEffect(() => {
    setActivities(data);
  }, [data]);

  const { updateItem } = usePatch(BASE_URL, setActivities);

  if (loading) return <LoadingSpinner />;

  if (error)
    return (
      <p className="error-message">
        Some error occured. Please try again later
      </p>
    );

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Home activities={activities} updateItem={updateItem} />}
        />
        <Route
          path="/archive"
          element={<Archive activities={activities} updateItem={updateItem} />}
        />
        <Route
          path="/activity/:id"
          element={
            <ActivityDetails activities={activities} updateItem={updateItem} />
          }
        />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Router>
  );
};

export default App;
