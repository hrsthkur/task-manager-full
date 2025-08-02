import React, { useState } from 'react';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';




const CreateTask = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    status: 'pending'
  });
const [files, setFiles] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  const formPayload = new FormData();
  formPayload.append('title', formData.title);
  formPayload.append('description', formData.description);
  formPayload.append('dueDate', formData.dueDate);
  formPayload.append('priority', formData.priority);
  formPayload.append('status', formData.status);

  // Append PDFs
  for (let i = 0; i < files.length; i++) {
    formPayload.append('documents', files[i]);
  }

  try {
    await axios.post('/tasks', formPayload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    navigate('/dashboard');
  } catch (err) {
    setError(err.response?.data?.msg || 'Task creation failed');
  }
};



  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-purple-700">Create a New Task</h2>

        {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
            <input
  type="file"
  name="documents"
  accept="application/pdf"
  multiple
  onChange={(e) => setFiles(e.target.files)}
  className="w-full border p-2 rounded"
/>


          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
          >
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
