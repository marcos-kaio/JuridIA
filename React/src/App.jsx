import LandingPage from "./pages/LandingPage";
import ChatLayout from "./pages/Chat";
import Chat from "./components/Chat";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/chat" element={<ChatLayout />}>
          <Route index element={<Chat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
