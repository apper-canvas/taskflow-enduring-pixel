import { Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import TaskManagement from "@/components/pages/TaskManagement"

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Routes>
        <Route path="/" element={<TaskManagement />} />
        <Route path="*" element={<TaskManagement />} />
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
        theme="light"
        toastStyle={{
          borderRadius: "8px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10px)"
        }}
      />
    </div>
  )
}

export default App