
import { Routes, Route } from "react-router-dom"
import LogIn from "./pages/LogIn"
import Register from "./pages/Register"
import DashBoardLayout from "./layouts/DashBoardLayout"
import DashBoard from "./pages/DashBoard"
import Scanner from "./pages/Scanner"
import History from "./pages/History"
import PestLibrary from "./pages/PestLibrary"
import Account from "./pages/Account"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LogIn />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<DashBoardLayout/>}>
        <Route index element={<DashBoard />} />
        <Route path="scanner" element={<Scanner />} />
        <Route path="history" element={<History />} />
        <Route path="library" element={<PestLibrary />} />
        <Route path="account" element={<Account />} />
      </Route>
    </Routes>
  )
}

export default App
