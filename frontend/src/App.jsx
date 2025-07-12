import { Route, Routes } from "react-router-dom";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import ForumPage from "./pages/ForumPage";
import QuestionDetail from "./pages/QuestionDetail";

export default function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<ForumPage />} />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/signup" element={<UserSignup />} />
      <Route path="/question/:title" element={<QuestionDetail />} />
      {/* Add other routes here */}
    </Routes>
    
    </>
  )
}