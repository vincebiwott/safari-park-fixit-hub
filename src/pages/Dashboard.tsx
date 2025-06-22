
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import StatsCard from '@/components/Dashboard/StatsCard';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Users, 
  Wrench,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const renderSupervisorDashboard = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name}</h1>
        <p className="text-gray-600">Supervisor Dashboard - Submit and track your maintenance requests</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="My Open Tickets"
          value={8}
          description="Active requests"
          icon={FileText}
          trend={{ value: 12, isPositive: false }}
        />
        <StatsCard
          title="Pending Review"
          value={3}
          description="Awaiting approval"
          icon={Clock}
          trend={{ value: 25, isPositive: true }}
        />
        <StatsCard
          title="Resolved This Month"
          value={24}
          description="Completed tickets"
          icon={CheckCircle}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Average Response Time"
          value="2.4 hrs"
          description="Time to assignment"
          icon={TrendingUp}
          trend={{ value: 15, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { title: 'AC not working - Room 201', status: 'in_progress', urgency: 'high' },
                { title: 'Leaky faucet - Bathroom 105', status: 'pending', urgency: 'medium' },
                { title: 'Electrical outlet issue - Conference Room', status: 'resolved', urgency: 'low' }
              ].map((ticket, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{ticket.title}</p>
                    <p className="text-xs text-gray-600 capitalize">{ticket.urgency} priority</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    ticket.status === 'resolved' ? 'bg-primary text-white' :
                    ticket.status === 'in_progress' ? 'bg-secondary text-white' :
                    'bg-warning text-white'
                  }`}>
                    {ticket.status.replace('_', ' ')}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                <FileText className="h-6 w-6 mx-auto mb-2" />
                <span className="text-sm font-medium">Submit New Ticket</span>
              </button>
              <button className="p-4 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors">
                <Clock className="h-6 w-6 mx-auto mb-2" />
                <span className="text-sm font-medium">View My Tickets</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderTechnicianDashboard = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name}</h1>
        <p className="text-gray-600">Technician Dashboard - {user?.technicianCategory} specialist</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Available Tasks"
          value={5}
          description="Ready to accept"
          icon={FileText}
          className="border-l-4 border-l-warning"
        />
        <StatsCard
          title="My Active Tasks"
          value={3}
          description="In progress"
          icon={Wrench}
          className="border-l-4 border-l-secondary"
        />
        <StatsCard
          title="Completed Today"
          value={2}
          description="Tasks finished"
          icon={CheckCircle}
          className="border-l-4 border-l-primary"
        />
        <StatsCard
          title="Response Score"
          value="4.8/5"
          description="Performance rating"
          icon={TrendingUp}
          trend={{ value: 5, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>New Tasks Available</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { title: 'Electrical outlet repair - Room 305', urgency: 'high', time: '2 hours ago' },
                { title: 'Light fixture replacement - Lobby', urgency: 'medium', time: '4 hours ago' },
                { title: 'Wiring check - Conference Room B', urgency: 'low', time: '6 hours ago' }
              ].map((task, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{task.title}</p>
                    <p className="text-xs text-gray-600">{task.time}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      task.urgency === 'high' ? 'bg-destructive text-white' :
                      task.urgency === 'medium' ? 'bg-warning text-white' :
                      'bg-primary text-white'
                    }`}>
                      {task.urgency}
                    </span>
                    <button className="px-3 py-1 bg-primary text-white rounded text-xs hover:bg-primary/90">
                      Accept
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Room 205 - AC Repair</p>
                  <p className="text-xs text-gray-600">10:00 AM</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Lobby - Outlet Check</p>
                  <p className="text-xs text-gray-600">2:00 PM</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Conference Room - Lighting</p>
                  <p className="text-xs text-gray-600">4:00 PM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderHODDashboard = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name}</h1>
        <p className="text-gray-600">Head of Department Dashboard - System Overview</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatsCard
          title="Total Active Tickets"
          value={45}
          description="All open requests"
          icon={FileText}
          trend={{ value: 8, isPositive: false }}
        />
        <StatsCard
          title="Critical Issues"
          value={3}
          description="Require immediate attention"
          icon={AlertTriangle}
          className="border-l-4 border-l-destructive"
        />
        <StatsCard
          title="In Progress"
          value={28}
          description="Being worked on"
          icon={Wrench}
          className="border-l-4 border-l-secondary"
        />
        <StatsCard
          title="Resolved Today"
          value={12}
          description="Completed tickets"
          icon={CheckCircle}
          className="border-l-4 border-l-primary"
        />
        <StatsCard
          title="Active Technicians"
          value={8}
          description="Currently working"
          icon={Users}
          trend={{ value: 12, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { dept: 'Electrical', pending: 8, progress: 5, resolved: 15, score: 92 },
                { dept: 'Plumbing', pending: 6, progress: 3, resolved: 12, score: 88 },
                { dept: 'AC/Fridge', pending: 4, progress: 2, resolved: 8, score: 85 },
                { dept: 'Carpentry', pending: 3, progress: 1, resolved: 6, score: 90 }
              ].map((dept, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{dept.dept}</span>
                    <span className="text-sm text-primary font-medium">{dept.score}% efficiency</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="text-center">
                      <span className="block text-warning font-medium">{dept.pending}</span>
                      <span className="text-xs text-gray-600">Pending</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-secondary font-medium">{dept.progress}</span>
                      <span className="text-xs text-gray-600">In Progress</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-primary font-medium">{dept.resolved}</span>
                      <span className="text-xs text-gray-600">Resolved</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Critical Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { 
                  title: 'Generator failure - Main building', 
                  time: '30 minutes ago', 
                  severity: 'critical',
                  technician: 'Unassigned'
                },
                { 
                  title: 'Water leak - Kitchen area', 
                  time: '2 hours ago', 
                  severity: 'high',
                  technician: 'John Plumber'
                },
                { 
                  title: 'Overdue: Room 105 AC repair', 
                  time: '1 day overdue', 
                  severity: 'overdue',
                  technician: 'Mike AC Tech'
                }
              ].map((alert, index) => (
                <div key={index} className="flex items-start justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{alert.title}</p>
                    <p className="text-xs text-gray-600 mt-1">{alert.time}</p>
                    <p className="text-xs text-gray-500">Assigned to: {alert.technician}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    alert.severity === 'critical' ? 'bg-destructive text-white' :
                    alert.severity === 'high' ? 'bg-orange-500 text-white' :
                    'bg-gray-500 text-white'
                  }`}>
                    {alert.severity}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderAdminDashboard = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">System Administration</h1>
        <p className="text-gray-600">Complete system overview and management controls</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        <StatsCard
          title="Total Users"
          value={47}
          description="Active system users"
          icon={Users}
          trend={{ value: 6, isPositive: true }}
        />
        <StatsCard
          title="Total Tickets"
          value={1247}
          description="All time"
          icon={FileText}
          trend={{ value: 15, isPositive: true }}
        />
        <StatsCard
          title="System Uptime"
          value="99.9%"
          description="Last 30 days"
          icon={TrendingUp}
          className="border-l-4 border-l-primary"
        />
        <StatsCard
          title="Avg Resolution"
          value="4.2 hrs"
          description="Time to resolve"
          icon={Clock}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="User Satisfaction"
          value="4.7/5"
          description="Average rating"
          icon={CheckCircle}
          className="border-l-4 border-l-primary"
        />
        <StatsCard
          title="Critical Issues"
          value={2}
          description="Requiring attention"
          icon={AlertTriangle}
          className="border-l-4 border-l-destructive"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent System Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { action: 'New user registered', user: 'Jane Smith', time: '5 minutes ago' },
                { action: 'Ticket resolved', user: 'Mike Electrician', time: '15 minutes ago' },
                { action: 'Critical alert triggered', user: 'System', time: '30 minutes ago' },
                { action: 'Report generated', user: 'Sarah HOD', time: '1 hour ago' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-xs text-gray-600">{activity.user}</p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Admin Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm">
                <Users className="h-5 w-5 mx-auto mb-1" />
                Manage Users
              </button>
              <button className="p-3 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors text-sm">
                <FileText className="h-5 w-5 mx-auto mb-1" />
                View Reports
              </button>
              <button className="p-3 bg-warning text-white rounded-lg hover:bg-warning/90 transition-colors text-sm">
                <AlertTriangle className="h-5 w-5 mx-auto mb-1" />
                System Alerts
              </button>
              <button className="p-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm">
                <Calendar className="h-5 w-5 mx-auto mb-1" />
                Schedules
              </button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Database</span>
                <span className="text-sm text-primary font-medium">Healthy</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Email Service</span>
                <span className="text-sm text-primary font-medium">Active</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">File Storage</span>
                <span className="text-sm text-warning font-medium">75% Used</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">API Response</span>
                <span className="text-sm text-primary font-medium">Fast</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  switch (user?.role) {
    case 'supervisor':
      return renderSupervisorDashboard();
    case 'technician':
      return renderTechnicianDashboard();
    case 'hod':
      return renderHODDashboard();
    case 'super_admin':
      return renderAdminDashboard();
    default:
      return <div>Loading...</div>;
  }
};

export default Dashboard;
