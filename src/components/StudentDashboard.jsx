import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Filter, 
  Database,
  Eye,
  Phone,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Menu,
  Settings,
  PlusCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { ref, onValue, off, query, orderByChild, limitToLast } from 'firebase/database';

// Sidebar Component (keep as is)
const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'complaints', icon: FileText, label: 'My Complaints' },
    { id: 'new', icon: PlusCircle, label: 'New Complaint' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <aside className="w-64 bg-[#0a0e1a] border-r border-indigo-900/30 flex flex-col">
      <div className="p-6 border-b border-indigo-900/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">EduResolve</span>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/50' 
                      : 'text-gray-400 hover:text-white hover:bg-indigo-900/30'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-indigo-900/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-white font-bold">
            AR
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-white">Alex Rivera</p>
            <p className="text-xs text-gray-400">alex@university.edu</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

// Stats Card Component
const StatsCard = ({ icon: Icon, label, value, sublabel, color, bgColor }) => {
  return (
    <div className="bg-[#0f1425] rounded-xl p-6 border border-indigo-900/30 hover:border-indigo-500/50 transition-all hover:shadow-lg hover:shadow-indigo-500/10">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
        <div className={`px-3 py-1 ${bgColor} rounded-full`}>
          <span className={`text-xs font-bold ${color}`}>{sublabel}</span>
        </div>
      </div>
      <h3 className="text-4xl font-black text-white mb-1">{value}</h3>
      <p className="text-sm text-gray-400 font-medium">{label}</p>
    </div>
  );
};

// Complaint Row Component
const ComplaintRow = ({ complaint, onViewDetails }) => {
  const statusStyles = {
    'Pending': 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    'In Progress': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    'Resolved': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
  };

  const categoryColors = {
    'Academic': 'bg-purple-500/10 text-purple-300',
    'Hostel': 'bg-cyan-500/10 text-cyan-300',
    'Library': 'bg-indigo-500/10 text-indigo-300',
    'Finance': 'bg-rose-500/10 text-rose-300',
    'Other': 'bg-gray-500/10 text-gray-300'
  };

  // Format date from timestamp
  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <tr className="border-b border-indigo-900/20 hover:bg-indigo-950/30 transition-colors">
      <td className="px-6 py-4">
        <div>
          <p className="font-semibold text-white mb-1">{complaint.subject || complaint.title}</p>
          <p className="text-sm text-gray-500">{complaint.complaintId}</p>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[complaint.category] || 'bg-gray-500/10 text-gray-300'}`}>
          {complaint.category}
        </span>
      </td>
      <td className="px-6 py-4">
        <span className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${statusStyles[complaint.status] || 'bg-gray-500/10 text-gray-400 border-gray-500/30'}`}>
          ● {complaint.status}
        </span>
      </td>
      <td className="px-6 py-4 text-gray-400 text-sm">
        {formatDate(complaint.createdAt)}
      </td>
      <td className="px-6 py-4">
        <button 
          onClick={() => onViewDetails(complaint)}
          className="p-2 hover:bg-indigo-900/30 rounded-lg transition-colors text-gray-400 hover:text-white"
        >
          <Eye className="w-5 h-5" />
        </button>
      </td>
    </tr>
  );
};

// Complaint Details Modal
const ComplaintDetailsModal = ({ complaint, onClose }) => {
  if (!complaint) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-[#0f1425] border border-indigo-900/30 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-indigo-900/30 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Complaint Details</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-indigo-900/30 rounded-lg transition-colors text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <p className="text-sm text-gray-400 mb-1">Complaint ID</p>
            <p className="text-white font-mono">{complaint.complaintId}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-400 mb-1">Subject</p>
            <p className="text-white font-semibold">{complaint.subject}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">Category</p>
              <p className="text-white">{complaint.category}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Priority</p>
              <p className={`font-semibold ${
                complaint.priority === 'Critical' ? 'text-red-400' :
                complaint.priority === 'High' ? 'text-orange-400' :
                complaint.priority === 'Medium' ? 'text-yellow-400' :
                'text-green-400'
              }`}>{complaint.priority}</p>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-gray-400 mb-1">Status</p>
            <p className="text-white">{complaint.status}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-400 mb-1">Description</p>
            <p className="text-white bg-[#0a0e1a] p-4 rounded-lg">{complaint.description}</p>
          </div>
          
          {complaint.orderId && (
            <div>
              <p className="text-sm text-gray-400 mb-1">Order/Service ID</p>
              <p className="text-white">{complaint.orderId}</p>
            </div>
          )}
          
          <div>
            <p className="text-sm text-gray-400 mb-1">Submitted On</p>
            <p className="text-white">{new Date(complaint.createdAt).toLocaleString()}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-400 mb-1">Submitted By</p>
            <p className="text-white">{complaint.userName} ({complaint.userId})</p>
          </div>
        </div>
        
        <div className="p-6 border-t border-indigo-900/30 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Emergency Help Banner (keep as is)
const EmergencyBanner = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-2xl shadow-indigo-500/20">
      <h3 className="text-2xl font-bold mb-3">Need immediate help?</h3>
      <p className="text-indigo-100 mb-6 text-sm leading-relaxed">
        If you have an urgent issue regarding student safety or emergency<br />
        situations, you can reach out to our team directly.
      </p>
      <div className="flex gap-4">
        <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-all flex items-center gap-2 shadow-lg">
          <Phone className="w-4 h-4" />
          Emergency Hotline
        </button>
        <button className="bg-indigo-500/30 border-2 border-white/30 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-500/50 transition-all flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          FAQ Center
        </button>
      </div>
    </div>
  );
};

// Main Dashboard Component
const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('complaints');
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    resolved: 0,
    pending: 0,
    inProgress: 0
  });
  
  const navigate = useNavigate();

  // Fetch complaints from Firebase
  useEffect(() => {
    setLoading(true);
    
    // Create a reference to the complaints node
    const complaintsRef = ref(db, 'complaints');
    
    // Create a query - order by createdAt descending
    const complaintsQuery = query(complaintsRef, orderByChild('createdAt'), limitToLast(50));
    
    // Listen for real-time updates
    const unsubscribe = onValue(complaintsQuery, (snapshot) => {
      const data = snapshot.val();
      
      if (data) {
        // Convert object to array
        const complaintsArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        
        // Sort by createdAt descending (newest first)
        complaintsArray.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        
        setComplaints(complaintsArray);
        
        // Calculate stats
        const total = complaintsArray.length;
        const resolved = complaintsArray.filter(c => c.status === 'Resolved').length;
        const pending = complaintsArray.filter(c => c.status === 'Pending').length;
        const inProgress = complaintsArray.filter(c => c.status === 'In Progress').length;
        
        setStats({ total, resolved, pending, inProgress });
      } else {
        setComplaints([]);
        setStats({ total: 0, resolved: 0, pending: 0, inProgress: 0 });
      }
      
      setLoading(false);
    }, (error) => {
      console.error('Error fetching complaints:', error);
      setLoading(false);
    });
    
    // Cleanup listener on unmount
    return () => {
      off(complaintsRef);
    };
  }, []);

  // Handle tab changes
  useEffect(() => {
    if (activeTab === 'new') {
      navigate('/new-complaint');
    }
  }, [activeTab, navigate]);

  const statCards = [
    { 
      icon: FileText, 
      label: 'Complaints filed overall', 
      value: stats.total.toString(), 
      sublabel: 'Total', 
      color: 'text-blue-400', 
      bgColor: 'bg-blue-500/10' 
    },
    { 
      icon: CheckCircle2, 
      label: `${stats.total ? Math.round((stats.resolved / stats.total) * 100) : 0}% success rate`, 
      value: stats.resolved.toString(), 
      sublabel: 'Resolved', 
      color: 'text-emerald-400', 
      bgColor: 'bg-emerald-500/10' 
    },
    { 
      icon: Clock, 
      label: `${stats.pending} awaiting response`, 
      value: stats.pending.toString(), 
      sublabel: 'Pending', 
      color: 'text-amber-400', 
      bgColor: 'bg-amber-500/10' 
    }
  ];

  const handleViewDetails = (complaint) => {
    setSelectedComplaint(complaint);
  };

  return (
    <div className="flex h-screen bg-[#050810] text-gray-100 font-['Space_Grotesk',sans-serif]">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-[#0a0e1a] border-b border-indigo-900/30 px-8 py-6 sticky top-0 z-10 backdrop-blur-xl bg-opacity-80">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Grievances..."
                  className="bg-[#0f1425] border border-indigo-900/30 rounded-lg px-4 py-2 pl-10 w-80 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-white placeholder-gray-500"
                />
                <Menu className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-indigo-900/30 rounded-lg transition-colors">
                <AlertCircle className="w-5 h-5 text-gray-400" />
              </button>
              <button
                onClick={() => navigate("/new-complaint")}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-lg font-bold hover:shadow-lg hover:shadow-indigo-500/50 transition-all flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                New Complaint
              </button>
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-black text-white">Student Dashboard</h1>
            <p className="text-sm text-gray-400 mt-1">
              {loading ? 'Loading complaints...' : `Track and manage your university grievances (${stats.total} total)`}
            </p>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {statCards.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>

          {/* Complaints Table */}
          <div className="bg-[#0f1425] rounded-2xl border border-indigo-900/30 overflow-hidden">
            <div className="px-6 py-5 border-b border-indigo-900/30 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">My Complaints</h2>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-[#0a0e1a] border border-indigo-900/30 rounded-lg text-sm font-semibold text-gray-300 hover:text-white hover:border-indigo-500/50 transition-all">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#0a0e1a] border border-indigo-900/30 rounded-lg text-sm font-semibold text-gray-300 hover:text-white hover:border-indigo-500/50 transition-all">
                  <Database className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading complaints...</p>
                  </div>
                </div>
              ) : complaints.length === 0 ? (
                <div className="flex items-center justify-center py-20">
                  <div className="text-center">
                    <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg mb-2">No complaints yet</p>
                    <p className="text-gray-500 text-sm mb-6">Submit your first complaint to get started</p>
                    <button
                      onClick={() => navigate("/new-complaint")}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-indigo-500/50 transition-all"
                    >
                      + New Complaint
                    </button>
                  </div>
                </div>
              ) : (
                <table className="w-full">
                  <thead className="bg-[#0a0e1a]">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                        Complaint / ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                        Submitted
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {complaints.map((complaint) => (
                      <ComplaintRow 
                        key={complaint.id} 
                        complaint={complaint} 
                        onViewDetails={handleViewDetails}
                      />
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Pagination - only show if more than 10 complaints */}
            {complaints.length > 10 && (
              <div className="px-6 py-4 border-t border-indigo-900/30 flex items-center justify-between">
                <p className="text-sm text-gray-400">
                  Showing 1 to 10 of {complaints.length} entries
                </p>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-2 bg-[#0a0e1a] border border-indigo-900/30 rounded-lg text-sm font-semibold text-gray-400 hover:text-white hover:border-indigo-500/50 transition-all flex items-center gap-1">
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>
                  <button className="w-10 h-10 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-all">
                    1
                  </button>
                  <button className="px-3 py-2 bg-[#0a0e1a] border border-indigo-900/30 rounded-lg text-sm font-semibold text-gray-400 hover:text-white hover:border-indigo-500/50 transition-all flex items-center gap-1">
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Emergency Banner */}
          <EmergencyBanner />
        </div>
      </main>

      {/* Complaint Details Modal */}
      {selectedComplaint && (
        <ComplaintDetailsModal 
          complaint={selectedComplaint} 
          onClose={() => setSelectedComplaint(null)} 
        />
      )}
    </div>
  );
};

export default StudentDashboard;