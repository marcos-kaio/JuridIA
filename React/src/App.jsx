import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NotificationProvider } from './context/NotificationContext';
import Notification from './components/Notification';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ChatPage from './pages/ChatPage';
import ComparePage from './pages/ComparePage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <NotificationProvider>
      <Router>
        <div className='App'>
          <Notification />
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/chat' element={<ChatPage />} />
            <Route path='/compare/:id' element={<ComparePage />} />
            <Route path='/profile' element={<ProfilePage />} />
          </Routes>
        </div>
      </Router>
    </NotificationProvider>
  );
}

export default App;
