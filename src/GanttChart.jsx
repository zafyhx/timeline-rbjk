import React, { useState, useMemo } from 'react';
import { Calendar, CheckCircle2, Circle, AlertCircle, Users, Clock } from 'lucide-react';

const GanttChart = () => {
  const [expandedWeeks, setExpandedWeeks] = useState([]);
  const [view, setView] = useState('timeline');

  // UPDATED: TANGGAL DIMULAI 12 NOVEMBER
  // Semua status di-reset ke 'pending' dan progress 0
  const [weeks, setWeeks] = useState([
    {
      id: 'week10',
      week: 'Week 10',
      area: 'Area 1 (Sector J)',
      startDate: '12 Nov',
      endDate: '16 Nov',
      status: 'pending',
      progress: 0,
      tasks: [
        { name: 'Analisis Blueprint', owner: 'Dillo', duration: '1d', status: 'pending' },
        { name: 'Security Requirements', owner: 'Bagus', duration: '1d', status: 'pending' },
        { name: 'Logical Design + VLAN', owner: 'Alifian', duration: '2d', status: 'pending' },
        { name: 'Physical Design + Cabling', owner: 'Rizal', duration: '2d', status: 'pending' },
        { name: 'Device Selection + BoM', owner: 'Rayhan', duration: '1d', status: 'pending' },
        { name: 'Security Validation', owner: 'Bagus', duration: '0.5d', status: 'pending' },
        { name: 'Budget & Weekly Report', owner: 'Dewi', duration: '1d', status: 'pending' }
      ]
    },
    {
      id: 'week11',
      week: 'Week 11',
      area: 'Area 2 (Sector K-L)',
      startDate: '19 Nov',
      endDate: '23 Nov',
      status: 'pending',
      progress: 0,
      tasks: [
        { name: 'Analisis Blueprint', owner: 'Dillo', duration: '1d', status: 'pending' },
        { name: 'Security Requirements', owner: 'Bagus', duration: '1d', status: 'pending' },
        { name: 'Logical Design', owner: 'Alifian', duration: '2d', status: 'pending' },
        { name: 'Physical Layout', owner: 'Rizal', duration: '2d', status: 'pending' },
        { name: 'Device Selection + BoM', owner: 'Rayhan', duration: '1d', status: 'pending' },
        { name: 'Security Validation', owner: 'Bagus', duration: '0.5d', status: 'pending' },
        { name: 'Budget & Weekly Report', owner: 'Dewi', duration: '1d', status: 'pending' }
      ]
    },
    {
      id: 'week12',
      week: 'Week 12',
      area: 'Area 3 (Sector N)',
      startDate: '26 Nov',
      endDate: '30 Nov',
      status: 'pending',
      progress: 0,
      tasks: [
        { name: 'Analisis Blueprint', owner: 'Dillo', duration: '1d', status: 'pending' },
        { name: 'Security Requirements', owner: 'Bagus', duration: '1d', status: 'pending' },
        { name: 'Logical Design', owner: 'Alifian', duration: '2d', status: 'pending' },
        { name: 'Physical Layout', owner: 'Rizal', duration: '2d', status: 'pending' },
        { name: 'Device Selection + BoM', owner: 'Rayhan', duration: '1d', status: 'pending' },
        { name: 'Security Validation', owner: 'Bagus', duration: '0.5d', status: 'pending' },
        { name: 'Budget & Weekly Report', owner: 'Dewi', duration: '1d', status: 'pending' }
      ]
    },
    {
      id: 'week13',
      week: 'Week 13',
      area: 'Area 4 (New Primary)',
      startDate: '3 Dec',
      endDate: '7 Dec',
      status: 'pending',
      progress: 0,
      tasks: [
        { name: 'Analisis Blueprint', owner: 'Dillo', duration: '1d', status: 'pending' },
        { name: 'Security Requirements', owner: 'Bagus', duration: '1d', status: 'pending' },
        { name: 'Logical Design', owner: 'Alifian', duration: '2d', status: 'pending' },
        { name: 'Physical Layout', owner: 'Rizal', duration: '2d', status: 'pending' },
        { name: 'Device Selection + BoM', owner: 'Rayhan', duration: '1d', status: 'pending' },
        { name: 'Security Validation', owner: 'Bagus', duration: '0.5d', status: 'pending' }
      ]
    },
    {
      id: 'week14',
      week: 'Week 14',
      area: 'Integration & Security',
      startDate: '10 Dec',
      endDate: '14 Dec',
      status: 'pending',
      progress: 0,
      critical: true,
      tasks: [
        { name: 'Integrasi Semua Area', owner: 'Dillo + Tim', duration: '3d', status: 'pending' },
        { name: 'Implementasi Security Policies', owner: 'Bagus', duration: '2d', status: 'pending' },
        { name: 'Testing & Verification', owner: 'Tim', duration: '2d', status: 'pending' }
      ]
    },
    {
      id: 'week15',
      week: 'Week 15',
      area: 'Finalisasi Proposal',
      startDate: '17 Dec',
      endDate: '23 Dec',
      status: 'pending',
      progress: 0,
      critical: true,
      tasks: [
        { name: 'Penyusunan Proposal Final', owner: 'Dewi + Dillo', duration: '6d', status: 'pending' },
        { name: 'QC & Editing Akhir', owner: 'Dillo', duration: '1d', status: 'pending' }
      ]
    },
    {
      id: 'week16',
      week: 'Week 16',
      area: 'Presentasi Akhir',
      startDate: '24 Dec',
      endDate: '25 Dec',
      status: 'pending',
      progress: 0,
      critical: true,
      tasks: [
        { name: 'Persiapan Presentasi Final', owner: 'Tim', duration: '1d', status: 'pending' },
        { name: 'Presentasi Final (Seminar)', owner: 'Tim', duration: '1d', status: 'pending' }
      ]
    }
  ]);

  const teamMembers = [
    { name: 'Dillo', role: 'Project Manager', color: 'bg-purple-500' },
    { name: 'Bagus', role: 'Security Specialist', color: 'bg-red-500' },
    { name: 'Alifian', role: 'Network Designer', color: 'bg-blue-500' },
    { name: 'Rizal', role: 'Physical Design', color: 'bg-green-500' },
    { name: 'Rayhan', role: 'Device Specialist', color: 'bg-yellow-500' },
    { name: 'Dewi', role: 'Budget & Documentation', color: 'bg-pink-500' }
  ];

  // LOGIKA MATEMATIKA OTOMATIS
  const toggleTaskStatus = (weekId, taskIndex) => {
    setWeeks(prevWeeks => {
      return prevWeeks.map(week => {
        if (week.id !== weekId) return week;

        const newTasks = [...week.tasks];
        const currentTask = newTasks[taskIndex];

        const newStatus = currentTask.status === 'completed' ? 'pending' : 'completed';
        newTasks[taskIndex] = { ...currentTask, status: newStatus };

        const completedCount = newTasks.filter(t => t.status === 'completed').length;
        const totalTasks = newTasks.length;
        const newProgress = Math.round((completedCount / totalTasks) * 100);

        let newWeekStatus = 'pending';
        if (newProgress === 100) newWeekStatus = 'completed';
        else if (newProgress > 0) newWeekStatus = 'in-progress';

        return {
          ...week,
          tasks: newTasks,
          progress: newProgress,
          status: newWeekStatus
        };
      });
    });
  };

  const toggleWeek = (weekId) => {
    setExpandedWeeks(prev => 
      prev.includes(weekId) 
        ? prev.filter(id => id !== weekId) 
        : [...prev, weekId]
    );
  };

  // DASHBOARD STATS
  const stats = useMemo(() => {
    const completed = weeks.filter(w => w.status === 'completed').length;
    const inProgress = weeks.filter(w => w.status === 'in-progress').length;
    const pending = weeks.filter(w => w.status === 'pending').length;
    
    const totalProgressSum = weeks.reduce((acc, curr) => acc + curr.progress, 0);
    const overallProgress = Math.round(totalProgressSum / weeks.length);

    return { completed, inProgress, pending, overallProgress };
  }, [weeks]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'in-progress': return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default: return <Circle className="w-5 h-5 text-gray-300" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 border-green-500';
      case 'in-progress': return 'bg-yellow-100 border-yellow-500';
      default: return 'bg-gray-50 border-gray-300';
    }
  };

  const getProgressColor = (progress) => {
    if (progress === 100) return 'bg-green-500';
    if (progress > 0) return 'bg-yellow-500';
    return 'bg-gray-300';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Proyek Jaringan Ripley Valley School
              </h1>
              <p className="text-gray-600">Timeline & Progress Tracking</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setView('timeline')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  view === 'timeline' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Timeline View
              </button>
              <button
                onClick={() => setView('list')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  view === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                List View
              </button>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border-2 border-green-200">
              <div className="text-sm text-green-700 font-medium mb-1">Completed</div>
              <div className="text-2xl font-bold text-green-700">{stats.completed} Week(s)</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg border-2 border-yellow-200">
              <div className="text-sm text-yellow-700 font-medium mb-1">In Progress</div>
              <div className="text-2xl font-bold text-yellow-700">{stats.inProgress} Week(s)</div>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg border-2 border-gray-200">
              <div className="text-sm text-gray-700 font-medium mb-1">Pending</div>
              <div className="text-2xl font-bold text-gray-700">{stats.pending} Week(s)</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border-2 border-blue-200">
              <div className="text-sm text-blue-700 font-medium mb-1">Overall Project</div>
              <div className="text-2xl font-bold text-blue-700">{stats.overallProgress}%</div>
            </div>
          </div>
        </div>

        {/* Timeline View */}
        {view === 'timeline' && (
          <div className="space-y-4">
            {weeks.map((week) => (
              <div
                key={week.id}
                className={`bg-white rounded-xl shadow-lg border-2 transition-all hover:shadow-xl ${
                  getStatusColor(week.status)
                } ${week.critical ? 'border-l-8 border-l-red-500' : ''}`}
              >
                <div className="p-6">
                  {/* Header Week */}
                  <div 
                    className="cursor-pointer"
                    onClick={() => toggleWeek(week.id)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        {getStatusIcon(week.status)}
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{week.week}</h3>
                          <p className="text-gray-600">{week.area}</p>
                        </div>
                        {week.critical && (
                          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">
                            CRITICAL
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <Calendar className="w-4 h-4" />
                          <span>{week.startDate} - {week.endDate}</span>
                        </div>
                        <div className="text-sm font-medium text-gray-700">
                          Progress: {week.progress}%
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full ${getProgressColor(week.progress)} transition-all duration-500 rounded-full`}
                        style={{ width: `${week.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Expanded Tasks */}
                  {expandedWeeks.includes(week.id) && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        Task Details (Klik item untuk update progress)
                      </h4>
                      <div className="space-y-3">
                        {week.tasks.map((task, idx) => (
                          <div
                            key={idx}
                            onClick={() => toggleTaskStatus(week.id, idx)}
                            className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                                task.status === 'completed' 
                                    ? 'bg-green-50 border-green-200 hover:bg-green-100' 
                                    : 'bg-gray-50 border-transparent hover:bg-gray-100'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {task.status === 'completed' 
                                ? <CheckCircle2 className="w-5 h-5 text-green-600" /> 
                                : <Circle className="w-5 h-5 text-gray-300" />
                              }
                              <div>
                                <div className={`font-medium ${task.status === 'completed' ? 'text-green-800 line-through' : 'text-gray-800'}`}>
                                    {task.name}
                                </div>
                                <div className="text-sm text-gray-600">
                                  <Users className="w-3 h-3 inline mr-1" />
                                  {task.owner}
                                </div>
                              </div>
                            </div>
                            <div className="text-sm text-gray-600 font-medium">
                              {task.duration}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* List View */}
        {view === 'list' && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Week</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Area</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Date Range</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Progress</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Tasks</th>
                </tr>
              </thead>
              <tbody>
                {weeks.map((week) => (
                  <tr
                    key={week.id}
                    className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                      week.critical ? 'bg-red-50' : ''
                    }`}
                  >
                    <td className="px-6 py-4">{getStatusIcon(week.status)}</td>
                    <td className="px-6 py-4 font-medium text-gray-800">{week.week}</td>
                    <td className="px-6 py-4 text-gray-700">{week.area}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {week.startDate} - {week.endDate}
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-24">
                        <div className="text-xs text-gray-600 mb-1">{week.progress}%</div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-full ${getProgressColor(week.progress)} rounded-full`}
                            style={{ width: `${week.progress}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {week.tasks.length} tasks
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Team Members */}
        <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Users className="w-6 h-6" />
            Tim Proyek
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className={`w-12 h-12 ${member.color} rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold`}>
                  {member.name.charAt(0)}
                </div>
                <div className="font-medium text-gray-800 text-sm">{member.name}</div>
                <div className="text-xs text-gray-600">{member.role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GanttChart;