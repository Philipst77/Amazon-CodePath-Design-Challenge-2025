import { Routes, Route, Navigate } from 'react-router-dom';
import HomeComponent from './components/HomeComponent';
import NavComponent from './components/NavComponent';
import SetupComponent from './components/SetupComponent';
import AuthRedirector from './components/AuthRedirector';

const App = ({ userData, setUserData }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex">
        <NavComponent userData={userData} setUserData={setUserData} />
        <main className="flex-grow p-4" style={{ backgroundColor: '#F5F5F5' }}>
          {userData ? (
            <AuthRedirector userData={userData}>
              <Routes>
                <Route path="/" element={<HomeComponent userData={userData} />} />
                <Route path="/setup" element={<SetupComponent userData={userData} />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AuthRedirector>
          ) : (
            <Routes>
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
