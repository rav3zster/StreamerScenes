import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { EditorPage } from './pages/EditorPage';

const App: React.FC = () => (
  <BrowserRouter>
    <div className="app-shell">
      <Routes>
        <Route path="/*" element={<EditorPage />} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;
