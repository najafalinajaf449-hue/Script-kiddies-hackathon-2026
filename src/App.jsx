import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StudentDashboard from './components/StudentDashboard';
import ComplaintForm from './components/NewComplaint';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudentDashboard />} />
        <Route path="/new-complaint" element={<ComplaintForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;