import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { ref, onValue, update } from 'firebase/database';

const AdminComplaintDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [complaint, setComplaint] = useState(null);
  const [resolution, setResolution] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  // 1. Fetch real data from Firebase based on the ID
  useEffect(() => {
    const complaintRef = ref(db, `complaints/${id}`);
    const unsubscribe = onValue(complaintRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setComplaint(data);
        setStatus(data.status);
        setResolution(data.adminResponse || "");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [id]);

  // 2. Function to update status in Firebase
  const updateStatus = async (newStatus) => {
    try {
      await update(ref(db, `complaints/${id}`), { status: newStatus });
      alert(`Status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // 3. Function to Resolve with Response
  const handleFinalResolve = async () => {
    if (!resolution.trim()) {
      alert("Please enter a resolution message first.");
      return;
    }
    try {
      await update(ref(db, `complaints/${id}`), { 
        status: "Resolved",
        adminResponse: resolution,
        resolvedAt: Date.now()
      });
      alert("Complaint Resolved successfully.");
    } catch (error) {
      console.error("Error resolving:", error);
    }
  };

  if (loading) return <div className="p-20 text-center text-white">Loading Complaint...</div>;
  if (!complaint) return <div className="p-20 text-center text-white">Complaint Not Found.</div>;

  return (
    <div className="bg-[#050810] text-slate-100 min-h-screen flex font-sans">
      {/* Sidebar - Static as per your design */}
      <aside className="w-64 border-r border-indigo-900/30 flex flex-col fixed inset-y-0 bg-[#0a0e1a]">
        <div className="p-6 flex items-center gap-3 border-b border-indigo-900/30">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="material-icons text-white">school</span>
          </div>
          <span className="font-bold text-xl text-white uppercase tracking-tight">EduGuard</span>
        </div>
        <nav className="p-4 space-y-2">
            <div className="text-xs font-bold text-indigo-400 uppercase p-2">Admin Panel</div>
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-indigo-600 rounded-lg text-white">
                <span className="material-icons">assignment_late</span>
                <span>Complaints</span>
            </button>
        </nav>
      </aside>

      <main className="ml-64 flex-1 flex flex-col">
        {/* Header with Action Buttons */}
        <header className="h-24 border-b border-indigo-900/30 bg-[#0a0e1a]/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center gap-6">
            <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white transition-colors">
              <span className="material-icons">arrow_back</span>
            </button>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold tracking-tight">#{complaint.complaintId}</h1>
                <StatusBadge status={status} />
              </div>
              <p className="text-xs text-gray-500 uppercase tracking-widest">{complaint.category} • Priority: {complaint.priority}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button onClick={() => updateStatus("Accepted")} className="px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-bold hover:bg-emerald-500/20 transition-all">ACCEPT</button>
            <button onClick={() => updateStatus("Rejected")} className="px-4 py-2 bg-rose-500/10 text-rose-400 border border-rose-500/30 rounded-lg text-xs font-bold hover:bg-rose-500/20 transition-all">REJECT</button>
            <button onClick={handleFinalResolve} className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold shadow-lg shadow-indigo-600/30 hover:bg-indigo-700 transition-all">RESOLVE</button>
          </div>
        </header>

        <div className="p-8 grid grid-cols-12 gap-8">
          {/* Left: Student Info */}
          <div className="col-span-4">
            <div className="bg-[#0f1425] border border-indigo-900/30 rounded-2xl p-6">
              <h3 className="text-xs font-bold text-indigo-400 uppercase mb-6 tracking-widest">Student Info</h3>
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-20 h-20 rounded-full bg-indigo-600/20 text-indigo-400 flex items-center justify-center text-2xl font-bold mb-4 border-2 border-indigo-500/30">
                  {complaint.userName?.charAt(0)}
                </div>
                <h4 className="text-lg font-bold">{complaint.userName}</h4>
                <p className="text-sm text-gray-500">{complaint.userId}</p>
              </div>
            </div>
          </div>

          {/* Right: Complaint Details & Editor */}
          <div className="col-span-8 space-y-6">
            <div className="bg-[#0f1425] border border-indigo-900/30 rounded-2xl p-8">
              <h2 className="text-xl font-bold mb-4">{complaint.subject}</h2>
              <p className="text-gray-400 leading-relaxed bg-[#050810] p-4 rounded-xl border border-indigo-900/20">
                {complaint.description}
              </p>
            </div>

            {/* Response Section */}
            <div className="bg-[#0f1425] border border-indigo-900/30 rounded-2xl overflow-hidden">
              <div className="px-6 py-4 bg-indigo-600/10 border-b border-indigo-900/30 flex items-center justify-between">
                <span className="text-sm font-bold text-indigo-300">ADMIN RESOLUTION RESPONSE</span>
              </div>
              <div className="p-6">
                <textarea 
                  className="w-full h-40 bg-[#050810] border border-indigo-900/30 rounded-xl p-4 text-sm focus:border-indigo-500 outline-none resize-none mb-4 transition-all"
                  placeholder="Provide the official solution or reason for decision..."
                  value={resolution}
                  onChange={(e) => setResolution(e.target.value)}
                />
                <div className="flex justify-end">
                    <button onClick={handleFinalResolve} className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all">
                        Finalize & Send Response
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Sub-component for Status Badge
const StatusBadge = ({ status }) => {
    const styles = {
        'Pending': 'bg-amber-500/10 text-amber-500 border-amber-500/20',
        'Accepted': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
        'Rejected': 'bg-rose-500/10 text-rose-500 border-rose-500/20',
        'Resolved': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    };
    return (
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${styles[status] || styles['Pending']}`}>
            ● {status}
        </span>
    );
};

export default AdminComplaintDetail;