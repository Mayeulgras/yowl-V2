import React from "react";
    import ReactDOM from "react-dom/client";
    import "../src/index.css";
    import App from "./App";
    import AuthProvider from "../src/components/authProvider";
    import { BrowserRouter as Router } from "react-router-dom";
    
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(
      <React.StrictMode>
        <AuthProvider>
          <Router>
            <App />
          </Router>
        </AuthProvider>
      </React.StrictMode>
    );
    