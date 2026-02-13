import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StudentDashboard from './components/StudentDashboard';
import ComplaintForm from './components/NewComplaint';
// 1. Import the new component
import AdminComplaintDetail from './components/AdminComplaintDetail'; 

function App() {
  return (
    <BrowserRouter>
      {/* 2. Add 'dark' class here if you want the dark theme to apply globally */}
      <div className="dark min-h-screen bg-background-light dark:bg-background-dark">
        <Routes>
          <Route path="/" element={<StudentDashboard />} />
          <Route path="/new-complaint" element={<ComplaintForm />} />
          
          {/* 3. Add the Admin Route */}
          <Route path="/admin/complaint/:id" element={<AdminComplaintDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;