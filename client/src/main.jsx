import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify';
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./utils/queryClient.js";
import 'react-toastify/dist/ReactToastify.css';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>,
  // <BrowserRouter>
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
    <ToastContainer />

  </StrictMode>
// </BrowserRouter>
)

// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";
// import { ClerkProvider } from "@clerk/clerk-react";

// // Import your Publishable Key
// const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// if (!PUBLISHABLE_KEY) {
//   throw new Error("Missing Publishable Key");
// }

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
//       <App />
//     </ClerkProvider>
//   </StrictMode>
// );
