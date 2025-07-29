import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { AuthContextProvider } from "./contexts/auth-context.tsx"
import { Toaster } from "react-hot-toast"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
      <Toaster position='bottom-center' toastOptions={{ duration: 3000 }} />
    </AuthContextProvider>
  </React.StrictMode>
)
