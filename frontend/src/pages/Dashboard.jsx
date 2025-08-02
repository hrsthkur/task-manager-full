import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);


  const handleDelete = async (taskId) => {
  try {
    await axios.delete(`/tasks/${taskId}`);
    setTasks(prev => prev.filter(task => task._id !== taskId));
  } catch (err) {
    console.error("Delete failed:", err);
  }
};



  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('/tasks');
        setTasks(res.data.tasks); 
      } catch (err) {
        setError('Unauthorized. Please login again.');
        localStorage.removeItem('token');
        navigate('/');
      }
      finally {
      setLoading(false);
    }
    };

    fetchTasks();
  }, [navigate]);

  const ShimmerCard = () => (
  <div className="bg-white p-4 rounded-lg shadow border-l-4 border-gray-300 animate-pulse">
    <div className="h-5 bg-gray-300 rounded w-2/3 mb-2"></div>
    <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
    <div className="h-3 bg-gray-200 rounded w-1/3"></div>
  </div>
);

return (
  <div className="min-h-screen bg-gray-50 p-6">
    <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">My Tasks</h1>

    {error && <p className="text-center text-red-500">{error}</p>}

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {loading ? (
        <>
          <ShimmerCard />
          <ShimmerCard />
          <ShimmerCard />
        </>
      ) : tasks.length === 0 ? (
        
         <p className="text-gray-500 col-span-full text-center">No tasks available</p>
        
       
      ) : (
       tasks.map((task) => (
  <div key={task._id} className="relative bg-white p-4 rounded-lg shadow border-l-4 border-blue-400">
    {/* Delete Button */}
    <button
      onClick={() => handleDelete(task._id)}
      className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-3xl font-bold"
    >
      ×
    </button>

    <h2 className="text-xl font-semibold">{task.title}</h2>
    <p className="text-sm text-gray-600 mb-2">Due: {task.dueDate?.split('T')[0]}</p>
    <p className="text-gray-700">{task.description}</p>

    <div>
      <p className="text-sm text-green-600 mt-2">Status: {task.status}</p>
      <p className="text-sm text-red-600 mt-2">Priority: {task.priority}</p>
    </div>

    {/* 📎 Show Uploaded PDFs */}
    {task.documents && task.documents.length > 0 && (
      <div className="mt-3">
        <h4 className="font-semibold text-sm text-gray-700 mb-1">Documents:</h4>
        <ul className="list-disc ml-5 text-blue-600 text-sm">
          {task.documents.map((doc, index) => (
            <li key={index}>
              <a
                href={`http://localhost:5000/${doc}`}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                PDF {index + 1}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )}

    <Link to={`/edit-task/${task._id}`} className="flex justify-end text-blue-600 hover:underline mt-2">
      Edit
    </Link>
  </div>
))

      )}
    </div>
  </div>
);
}

export default Dashboard;
