import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AuthHandle from "./components/AuthHandle";
import { supabase } from "./client/supabaseClient";

const RootApp = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial user fetch
    supabase.auth.getUser().then(({ data: { user }, error }) => {
      if (user) {
        setUserData(user);
      }
      setLoading(false);
    });

    // Listen to auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserData(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      {userData ? (
        <App userData={userData} setUserData = {setUserData} />
      ) : (
        <AuthHandle setUserData={setUserData} />
      )}
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);
