import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:date" element={<Home />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Analytics />
    </BrowserRouter>
  );
}

export default App;