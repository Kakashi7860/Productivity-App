import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import { Plus, Trash2, Target, CheckCircle, Circle } from 'lucide-react';

const GoalList = () => {
    const [goals, setGoals] = useState([]);
    const [newGoal, setNewGoal] = useState('');

    useEffect(() => {
        fetchGoals();
    }, []);

    const fetchGoals = async () => {
        try {
            const res = await axios.get('/goals');
            setGoals(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const addGoal = async (e) => {
        e.preventDefault();
        if (!newGoal) return;
        try {
            const res = await axios.post('/goals', { title: newGoal });
            setGoals([res.data, ...goals]);
            setNewGoal('');
        } catch (err) {
            console.error(err);
        }
    };

    const toggleComplete = async (id, isCompleted) => {
        try {
            const res = await axios.put(`/goals/${id}`, { isCompleted: !isCompleted });
            setGoals(goals.map((g) => (g._id === id ? res.data : g)));
        } catch (err) {
            console.error(err);
        }
    };

    const deleteGoal = async (id) => {
        try {
            await axios.delete(`/goals/${id}`);
            setGoals(goals.filter((g) => g._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const completedCount = goals.filter(g => g.isCompleted).length;
    const progress = goals.length > 0 ? (completedCount / goals.length) * 100 : 0;

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Daily Goals</h2>
            </div>

            <div className="mb-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
                <div className="flex justify-between items-end mb-4">
                    <div>
                        <h3 className="text-lg font-semibold opacity-90">Today's Progress</h3>
                        <p className="text-3xl font-bold">{Math.round(progress)}%</p>
                    </div>
                    <Target size={48} className="opacity-20" />
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                    <div
                        className="bg-white rounded-full h-2 transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <p className="mt-2 text-sm opacity-80">{completedCount} of {goals.length} goals completed</p>
            </div>

            <form onSubmit={addGoal} className="mb-8 flex gap-4">
                <input
                    type="text"
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-200 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-sm dark:bg-neutral-700 dark:text-white"
                    placeholder="Set a new goal for today..."
                />
                <button
                    type="submit"
                    className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                    Add Goal
                </button>
            </form>

            <div className="grid grid-cols-1 gap-4">
                {goals.map((goal) => (
                    <div
                        key={goal._id}
                        className={`flex items-center justify-between p-4 bg-white dark:bg-neutral-800 rounded-lg border transition-all ${goal.isCompleted ? 'border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800' : 'border-gray-200 dark:border-neutral-700'
                            }`}
                    >
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => toggleComplete(goal._id, goal.isCompleted)}
                                className={`transition-colors ${goal.isCompleted ? 'text-green-500' : 'text-gray-300 hover:text-primary'
                                    }`}
                            >
                                {goal.isCompleted ? <CheckCircle size={28} /> : <Circle size={28} />}
                            </button>
                            <span className={`text-lg ${goal.isCompleted ? 'text-gray-500 dark:text-gray-400 line-through' : 'text-gray-800 dark:text-white'}`}>
                                {goal.title}
                            </span>
                        </div>
                        <button
                            onClick={() => deleteGoal(goal._id)}
                            className="text-gray-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-full transition-colors"
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>
                ))}
                {goals.length === 0 && (
                    <div className="text-center py-12 text-gray-400">
                        No goals set for today. Start small!
                    </div>
                )}
            </div>
        </div>
    );
};

export default GoalList;
