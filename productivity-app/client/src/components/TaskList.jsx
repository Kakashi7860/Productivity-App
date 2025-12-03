import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import { Plus, Trash2, CheckCircle, Circle, Calendar } from 'lucide-react';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', category: 'personal', dueDate: '' });
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await axios.get('/tasks');
            setTasks(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const addTask = async (e) => {
        e.preventDefault();
        if (!newTask.title) return;
        try {
            const res = await axios.post('/tasks', newTask);
            setTasks([res.data, ...tasks]);
            setNewTask({ title: '', category: 'personal', dueDate: '' });
        } catch (err) {
            console.error(err);
        }
    };

    const toggleComplete = async (id, isCompleted) => {
        try {
            const res = await axios.put(`/tasks/${id}`, { isCompleted: !isCompleted });
            setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
        } catch (err) {
            console.error(err);
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`/tasks/${id}`);
            setTasks(tasks.filter((t) => t._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'all') return true;
        return task.category === filter;
    });

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Tasks</h2>
                <div className="flex space-x-2">
                    {['all', 'work', 'personal', 'study'].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${filter === cat
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-neutral-700 dark:text-gray-300 dark:hover:bg-neutral-600'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <form onSubmit={addTask} className="mb-8 bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-neutral-700 flex gap-4 items-end">
                <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Task Title</label>
                    <input
                        type="text"
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 dark:bg-neutral-700 dark:text-white"
                        placeholder="What needs to be done?"
                    />
                </div>
                <div className="w-32">
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Category</label>
                    <select
                        value={newTask.category}
                        onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 dark:bg-neutral-700 dark:text-white"
                    >
                        <option value="personal">Personal</option>
                        <option value="work">Work</option>
                        <option value="study">Study</option>
                    </select>
                </div>
                <div className="w-40">
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Due Date</label>
                    <input
                        type="date"
                        value={newTask.dueDate}
                        onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 dark:bg-neutral-700 dark:text-white"
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center gap-2"
                >
                    <Plus size={18} /> Add
                </button>
            </form>

            <div className="space-y-3">
                {filteredTasks.map((task) => (
                    <div
                        key={task._id}
                        className={`group flex items-center justify-between p-4 bg-white dark:bg-neutral-800 rounded-lg border transition-all hover:shadow-md ${task.isCompleted ? 'border-gray-100 bg-gray-50 dark:bg-neutral-900 dark:border-neutral-800' : 'border-gray-200 dark:border-neutral-700'
                            }`}
                    >
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => toggleComplete(task._id, task.isCompleted)}
                                className={`text-gray-400 hover:text-primary transition-colors ${task.isCompleted ? 'text-green-500' : ''
                                    }`}
                            >
                                {task.isCompleted ? <CheckCircle size={24} /> : <Circle size={24} />}
                            </button>
                            <div>
                                <h3
                                    className={`font-medium text-gray-800 dark:text-gray-100 ${task.isCompleted ? 'line-through text-gray-400 dark:text-gray-500' : ''
                                        }`}
                                >
                                    {task.title}
                                </h3>
                                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                    <span className={`px-2 py-0.5 rounded-full bg-gray-100 dark:bg-neutral-700 dark:text-gray-300 capitalize`}>
                                        {task.category}
                                    </span>
                                    {task.dueDate && (
                                        <span className="flex items-center gap-1">
                                            <Calendar size={12} />
                                            {new Date(task.dueDate).toLocaleDateString()}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => deleteTask(task._id)}
                            className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
                {filteredTasks.length === 0 && (
                    <div className="text-center py-12 text-gray-400">
                        No tasks found. Add one above!
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskList;
