import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      console.log("Task ID from URL:", id);

      const res = await axios.get(`/tasks/${id}`);
      setFormData(res.data.task);
    };
    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios.put(`/tasks/${id}`, formData);
    navigate('/dashboard');
  };
  if (!formData) {
  return <div className="text-center p-4 text-gray-600">Loading task...</div>;
}

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Task</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full border p-2 rounded" />
        <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border p-2 rounded" />
        <select name="status" value={formData.status} onChange={handleChange} className="w-full border p-2 rounded">
          <option value="">Select Status</option>
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <select name="priority" value={formData.priority} onChange={handleChange} className="w-full border p-2 rounded">
          <option value="">Select Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input type="date" name="dueDate" value={formData.dueDate?.split('T')[0]} onChange={handleChange} className="w-full border p-2 rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update Task</button>
      </form>
    </div>
  );
};

export default EditTask;
