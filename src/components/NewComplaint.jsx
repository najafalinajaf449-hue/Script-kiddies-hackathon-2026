import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { ref, push, set, serverTimestamp } from 'firebase/database';
// Note: Firebase Realtime Database doesn't have storage, you'll need to add getStorage if you want file uploads

const ComplaintForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    category: '',
    priority: '',
    description: '',
    orderId: ''
    // Removed attachments since Realtime DB doesn't handle files well
  });

  // Generate unique complaint ID
  const generateComplaintId = () => {
    const prefix = 'COMP';
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    const timestamp = Date.now().toString().slice(-4);
    return `${prefix}-${random}-${timestamp}`;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.subject || !formData.description || !formData.category || !formData.priority) {
        alert('Please fill in all required fields');
        setLoading(false);
        return;
      }

      // Generate complaint ID
      const complaintId = generateComplaintId();

      // Create a new reference in the 'complaints' path
      const complaintsRef = ref(db, 'complaints');
      const newComplaintRef = push(complaintsRef);

      // Prepare complaint data
      const complaintData = {
        complaintId: complaintId,
        subject: formData.subject,
        category: formData.category,
        priority: formData.priority,
        description: formData.description,
        orderId: formData.orderId || null,
        status: 'Pending',
        createdAt: Date.now(), // Realtime DB doesn't have serverTimestamp
        updatedAt: Date.now(),
        userId: 'alex@university.edu',
        userName: 'Alex Rivera',
        userAvatar: 'AR'
      };

      // Save to Realtime Database
      await set(newComplaintRef, complaintData);
      
      console.log('Complaint submitted with ID: ', newComplaintRef.key);
      alert('Complaint submitted successfully!');
      
      // Reset form and redirect
      setFormData({
        subject: '',
        category: '',
        priority: '',
        description: '',
        orderId: ''
      });
      
      navigate('/');
      
    } catch (error) {
      console.error('Error submitting complaint: ', error);
      alert('Error submitting complaint. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Rest of your JSX (same as before, but remove the attachments section)
  return (
    <div style={{
      backgroundColor: '#0a0a0a',
      color: 'white',
      padding: '40px',
      fontFamily: 'Arial, sans-serif',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }}>
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        disabled={loading}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          backgroundColor: '#222',
          color: 'white',
          border: '1px solid #444',
          borderRadius: '8px',
          padding: '12px 24px',
          cursor: loading ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '14px',
          fontWeight: '500',
          transition: 'all 0.3s',
          fontFamily: 'Arial, sans-serif',
          opacity: loading ? 0.5 : 1
        }}
      >
        ← Back to Dashboard
      </button>

      <div style={{
        width: '100%',
        maxWidth: '500px',
        backgroundColor: '#111',
        border: '1px solid #333',
        borderRadius: '12px',
        padding: '40px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
      }}>
        <h2 style={{
          margin: '0 0 30px 0',
          fontSize: '28px',
          color: '#fff',
          textAlign: 'center',
          fontWeight: 'bold'
        }}>
          {loading ? 'Submitting...' : 'Submit New Complaint'}
        </h2>
        
        <p style={{
          margin: '0 0 25px 0',
          color: '#aaa',
          fontSize: '16px',
          textAlign: 'center'
        }}>
          Please describe about your service/order
        </p>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#ccc', fontSize: '14px' }}>
              Subject <span style={{ color: '#ff6b6b' }}>*</span>
            </label>
            <input 
              type="text" 
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter subject"
              required
              disabled={loading}
              style={{
                width: '100%',
                padding: '15px',
                backgroundColor: '#222',
                border: '1px solid #444',
                borderRadius: '8px',
                color: 'white',
                fontSize: '16px',
                outline: 'none',
                transition: 'border-color 0.3s',
                boxSizing: 'border-box',
                opacity: loading ? 0.5 : 1
              }}
            />
          </div>
          
          <div style={{ display: 'flex', gap: '15px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#ccc', fontSize: '14px' }}>
                Category <span style={{ color: '#ff6b6b' }}>*</span>
              </label>
              <select 
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '15px',
                  backgroundColor: '#222',
                  border: '1px solid #444',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '16px',
                  outline: 'none',
                  appearance: 'none',
                  backgroundImage: 'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDEuNUw2IDYuNUw3IDUuNUw2LjUgNyBMMSAyIEwxIDUuNUw2LjUgMiBMNyAzIEw2IDQuNUwxIDEuNSIgc3Ryb2tlPSIjOTk5IiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+")',
                  backgroundPosition: 'right 12px center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '12px',
                  paddingRight: '40px',
                  boxSizing: 'border-box',
                  opacity: loading ? 0.5 : 1
                }}
              >
                <option value="">Select Category</option>
                <option value="Academic">Academic</option>
                <option value="Hostel">Hostel</option>
                <option value="Library">Library</option>
                <option value="Finance">Finance</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#ccc', fontSize: '14px' }}>
                Priority <span style={{ color: '#ff6b6b' }}>*</span>
              </label>
              <select 
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                required
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '15px',
                  backgroundColor: '#222',
                  border: '1px solid #444',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '16px',
                  outline: 'none',
                  appearance: 'none',
                  backgroundImage: 'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDEuNUw2IDYuNUw3IDUuNUw2LjUgNyBMMSAyIEwxIDUuNUw2LjUgMiBMNyAzIEw2IDQuNUwxIDEuNSIgc3Ryb2tlPSIjOTk5IiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+")',
                  backgroundPosition: 'right 12px center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '12px',
                  paddingRight: '40px',
                  boxSizing: 'border-box',
                  opacity: loading ? 0.5 : 1
                }}
              >
                <option value="">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#ccc', fontSize: '14px' }}>
              Description <span style={{ color: '#ff6b6b' }}>*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your complaint in detail..."
              rows="5"
              required
              disabled={loading}
              style={{
                width: '100%',
                padding: '15px',
                backgroundColor: '#222',
                border: '1px solid #444',
                borderRadius: '8px',
                color: 'white',
                fontSize: '16px',
                outline: 'none',
                transition: 'border-color 0.3s',
                resize: 'vertical',
                fontFamily: 'Arial, sans-serif',
                boxSizing: 'border-box',
                opacity: loading ? 0.5 : 1
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#ccc', fontSize: '14px' }}>
              Order/Service ID
            </label>
            <input 
              type="text" 
              name="orderId"
              value={formData.orderId}
              onChange={handleChange}
              placeholder="Enter order or service ID (optional)"
              disabled={loading}
              style={{
                width: '100%',
                padding: '15px',
                backgroundColor: '#222',
                border: '1px solid #444',
                borderRadius: '8px',
                color: 'white',
                fontSize: '16px',
                outline: 'none',
                transition: 'border-color 0.3s',
                boxSizing: 'border-box',
                opacity: loading ? 0.5 : 1
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px',
              backgroundColor: loading ? '#666' : '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s',
              marginTop: '10px',
              boxSizing: 'border-box',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'SUBMITTING...' : 'SUBMIT COMPLAINT'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ComplaintForm;