import { Users, Clock, CalendarDays, DollarSign, Package, CheckSquare, UserPlus, TrendingUp, ArrowUpRight, ArrowDownRight, HardHat } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart, PieChart, Pie, Cell } from 'recharts'
import { useTheme } from '../../lib/ThemeContext'

const kpis = [
  { label: 'Total Employees', value: '156', change: '+12', up: true, icon: Users, color: '#1A78C2' },
  { label: 'Active Employees', value: '142', change: '+8', up: true, icon: Users, color: '#4CAF50' },
  { label: 'New Joiners', value: '5', change: '+3', up: true, icon: UserPlus, color: '#4CAF50' },
  { label: 'Attendance Today', value: '134', change: '85.9%', up: true, icon: Clock, color: '#1A78C2' },
  { label: 'On Leave', value: '8', change: '-2', up: false, icon: CalendarDays, color: '#4CAF50' },
  { label: 'Pending Approvals', value: '12', change: '+4', up: true, icon: CheckSquare, color: '#1A78C2' },
  { label: 'Payroll This Month', value: '₹24.6L', change: '+8.3%', up: true, icon: DollarSign, color: '#4CAF50', roleLimit: 'super_admin' },
  { label: 'Asset Recovery', value: '78.2%', change: '+5.1%', up: true, icon: Package, color: '#1A78C2' },
]

const attendanceTrend = [
  { day: 'Mon', present: 140, absent: 16, late: 4 },
  { day: 'Tue', present: 138, absent: 18, late: 6 },
  { day: 'Wed', present: 142, absent: 14, late: 3 },
  { day: 'Thu', present: 135, absent: 21, late: 5 },
  { day: 'Fri', present: 144, absent: 12, late: 2 },
  { day: 'Sat', present: 98, absent: 58, late: 1 },
]

const deptDist = [
  { name: 'Production', value: 68, color: '#1A78C2' },
  { name: 'Admin', value: 15, color: '#4CAF50' },
  { name: 'Warehouse', value: 12, color: '#4CAF50' },
  { name: 'Quality', value: 10, color: '#4CAF50' },
  { name: 'HR', value: 8, color: '#1A78C2' },
  { name: 'Finance', value: 6, color: '#1A78C2' },
  { name: 'IT', value: 5, color: '#1A78C2' },
]

const payrollTrend = [
  { month: 'Jan', amount: 18.2 }, { month: 'Feb', amount: 19.1 },
  { month: 'Mar', amount: 21.3 }, { month: 'Apr', amount: 20.8 },
  { month: 'May', amount: 22.5 }, { month: 'Jun', amount: 24.6 },
]

const activities = [
  { user: 'Rajesh Kumar', action: 'checked in', time: '09:02 AM' },
  { user: 'Priya Sharma', action: 'submitted leave request', time: '10:15 AM' },
  { user: 'Amit Patel', action: 'asset allocated - Helmet & Gloves', time: '11:30 AM' },
  { user: 'Sneha Reddy', action: 'updated shift schedule', time: '02:45 PM' },
  { user: 'Vikram Singh', action: 'completed exit clearance', time: '03:20 PM' },
]

function Dashboard() {
  const { role } = useTheme()
  const visibleKpis = kpis.filter(k => !k.roleLimit || role === k.roleLimit)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Dashboard</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Enterprise overview — key HR metrics at a glance.</p>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
          style={{ background: 'color-mix(in srgb, var(--color-primary) 10%, transparent)', color: 'var(--color-primary)' }}>
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse-dot" /> Live
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {visibleKpis.map((k, i) => {
          const Icon = k.icon
          return (
            <div key={k.label} className="card p-4 animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
              <div className="flex items-start justify-between mb-2">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${k.color}15` }}>
                  <Icon className="w-5 h-5" style={{ color: k.color }} />
                </div>
                <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${k.up ? 'text-success' : 'text-danger'}`}>
                  {k.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {k.change}
                </span>
              </div>
              <div className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{k.value}</div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{k.label}</div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Attendance Trend (This Week)</h2>
            <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>Last 6 days</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={attendanceTrend} barCategoryGap="20%">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: 'var(--hover)' }} contentStyle={{ borderRadius: 12, border: '1px solid var(--border)', background: 'var(--bg-card)' }} />
              <Bar dataKey="present" fill="#1A78C2" radius={[6, 6, 0, 0]} maxBarSize={36} name="Present" />
              <Bar dataKey="absent" fill="var(--border)" radius={[6, 6, 0, 0]} maxBarSize={36} name="Absent" />
              <Bar dataKey="late" fill="#4CAF50" radius={[6, 6, 0, 0]} maxBarSize={36} name="Late" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-5">
          <h2 className="text-sm font-semibold mb-5" style={{ color: 'var(--text-primary)' }}>Department Distribution</h2>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={deptDist} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3}>
                {deptDist.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid var(--border)', background: 'var(--bg-card)' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-3 space-y-1.5">
            {deptDist.map((d, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: d.color }} />
                <span style={{ color: 'var(--text-secondary)' }} className="flex-1">{d.name}</span>
                <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`grid grid-cols-1 ${role === 'super_admin' ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-6`}>
        {role === 'super_admin' && (
          <div className="card p-5">
            <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Payroll Summary</h2>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={payrollTrend}>
                <defs><linearGradient id="payrollG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1A78C2" stopOpacity={0.2} /><stop offset="100%" stopColor="#1A78C2" stopOpacity={0.01} /></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid var(--border)', background: 'var(--bg-card)' }} />
                <Area type="monotone" dataKey="amount" stroke="#1A78C2" strokeWidth={2.5} fill="url(#payrollG)" />
              </AreaChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
              {[
                { label: 'Gross', value: '₹2.55L', color: 'var(--text-primary)' },
                { label: 'Deductions', value: '₹21.2K', color: '#1A78C2' },
                { label: 'Net Payable', value: '₹2.34L', color: '#4CAF50' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-sm font-bold" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="card p-5">
          <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Asset Recovery Status</h2>
          {[
            { name: 'Helmets', recovered: 85, color: '#1A78C2' },
            { name: 'Gloves', recovered: 72, color: '#4CAF50' },
            { name: 'Shoes', recovered: 65, color: '#4CAF50' },
            { name: 'Uniform', recovered: 78, color: '#1A78C2' },
          ].map((a, i) => (
            <div key={i} className="mb-3 last:mb-0">
              <div className="flex justify-between text-xs mb-1">
                <span style={{ color: 'var(--text-secondary)' }}>{a.name}</span>
                <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{a.recovered}%</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
                <div className="h-full rounded-full transition-all animate-slide-left" style={{ width: `${a.recovered}%`, background: a.color }} />
              </div>
            </div>
          ))}
          <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
            <div className="flex justify-between text-sm">
              <span style={{ color: 'var(--text-secondary)' }}>Outstanding Balance</span>
              <span className="font-bold" style={{ color: '#1A78C2' }}>₹78,200</span>
            </div>
          </div>
        </div>

        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Recent Activity</h2>
            <button className="text-xs font-medium" style={{ color: 'var(--color-primary)' }}>View all</button>
          </div>
          <div className="space-y-0">
            {activities.map((a, i) => (
              <div key={i} className="flex items-center gap-3 py-2.5 border-b last:border-b-0"
                style={{ borderColor: 'var(--border)' }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
                  style={{ background: 'color-mix(in srgb, var(--color-primary) 12%, transparent)', color: 'var(--color-primary)' }}>
                  {a.user.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{a.user}</span>{' '}
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{a.action}</span>
                </div>
                <span className="text-xs shrink-0" style={{ color: 'var(--text-muted)' }}>{a.time}</span>
              </div>
            ))}
          </div>
          <div className={`grid ${role === 'super_admin' ? 'grid-cols-2' : 'grid-cols-1'} gap-2 mt-4`}>
            <button className="btn-primary w-full justify-center text-xs py-2.5">Mark Attendance</button>
            {role === 'super_admin' && (
              <button className="btn-secondary w-full justify-center text-xs py-2.5">Process Payroll</button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
