import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import { MainPage } from './pages/MainPage/MainPage';
import { UserDetails } from './pages/UserDetails/UserDetails';
import { PostDetails } from './pages/PostDetails/PostDetails';
import './App.css';

export const App = () => {
  return (
    <Theme preset={presetGpnDefault}>
      <div className="app-container">
        <BrowserRouter basename="/tech">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/users/:id" element={<UserDetails />} />
            <Route path="/posts/:id" element={<PostDetails />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Theme>
  );
};