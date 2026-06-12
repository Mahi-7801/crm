import { useState } from 'react'
import { BarChart2, PieChart, TrendingUp, Users, DollarSign, Calendar, Download, FileText } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RPieChart, Pie, Cell, LineChart, Line } from 'recharts'

const deptData = [
  { name: 'Production', headcount: 45, salary: 2250000, attrition: 5 },
  { name: 'Quality', headcount: 22, salary: 1320000, attrition: 3 },
  { name: 'Warehouse', headcount: 30, salary: 900000, attrition: 8 },
  { name: 'IT', headcount: 12, salary: 960000, attrition: 2 },
  { name: 'Admin', headcount: 10, salary: 500000, attrition: 1 },
]

const monthlyTrend = [
  { month: 'Jan', hiring: 8, attrition: 2 },
  { month: 'Feb', hiring: 6, attrition: 3 },
  { month: 'Mar', hiring: 10, attrition: 1 },
  { month: 'Apr', hiring: 4, attrition: 4 },
  { month: 'May', hiring: 7, attrition: 2 },
  { month: 'Jun', hiring: 9, attrition: 3 },
]

const COLORS = ['#1A78C2', '#1A78C2', '#4CAF50', '#4CAF50', '#1A78C2']

function Reports() {
  const [reportType, setReportType] = useState('headcount')
  const totalHeadcount = deptData.reduce((s, d) => s + d.headcount, 0)
  const totalSalary = deptData.reduce((s, d) => s + d.salary, 0)

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Reports & Analytics</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>HR analytics, workforce planning, and compliance reports.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary text-xs"><Download className="w-4 h-4" /> Export PDF</button>
          <button className="btn-secondary text-xs"><FileText className="w-4 h-4" /> Export Excel</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Headcount', value: totalHeadcount, icon: Users, color: '#1A78C2' },
          { label: 'Total Salary/Month', value: `₹${(totalSalary / 100000).toFixed(1)}L`, icon: DollarSign, color: '#4CAF50' },
          { label: 'Avg Attrition', value: `${(deptData.reduce((s, d) => s + d.attrition, 0) / deptData.length).toFixed(1)}%`, icon: TrendingUp, color: '#1A78C2' },
          { label: 'Reports Generated', value: '128', icon: BarChart2, color: '#1A78C2' },
        ].map((s, i) => {
          const Icon = s.icon
          return (
            <div key={i} className="card p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${s.color}15` }}>
                <Icon className="w-5 h-5" style={{ color: s.color }} />
              </div>
              <div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{s.label}</div>
                <div className="text-lg font-bold mt-0.5" style={{ color: s.color }}>{s.value}</div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="card p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Department Headcount</h2>
            <div className="flex gap-2">
              {[
                { key: 'headcount', label: 'Headcount', icon: Users },
                { key: 'salary', label: 'Salary', icon: DollarSign },
              ].map(r => (
                <button key={r.key} onClick={() => setReportType(r.key)}
                  className="tab-btn text-xs" data-active={reportType === r.key}>
                  <r.icon className="w-3.5 h-3.5" /> {r.label}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={deptData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid var(--border)', background: 'var(--bg-card)' }} />
              <Bar dataKey={reportType === 'headcount' ? 'headcount' : reportType === 'salary' ? 'salary' : 'headcount'} fill="#1A78C2" radius={[6, 6, 0, 0]} maxBarSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-5">
          <h2 className="text-sm font-semibold mb-5" style={{ color: 'var(--text-primary)' }}>Headcount Distribution</h2>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width={180} height={180}>
              <RPieChart>
                <Pie data={deptData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="headcount">
                  {deptData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid var(--border)', background: 'var(--bg-card)' }} />
              </RPieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {deptData.map((d, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <div className="w-2.5 h-2.5 rounded-sm" style={{ background: COLORS[i] }} />
                  <span style={{ color: 'var(--text-secondary)' }}>{d.name}</span>
                  <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{d.headcount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="card p-5">
        <h2 className="text-sm font-semibold mb-5" style={{ color: 'var(--text-primary)' }}>Hiring vs Attrition Trend (2026)</h2>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={monthlyTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid var(--border)', background: 'var(--bg-card)' }} />
            <Line type="monotone" dataKey="hiring" stroke="#4CAF50" strokeWidth={3} dot={{ r: 5, fill: '#4CAF50' }} name="Hiring" />
            <Line type="monotone" dataKey="attrition" stroke="#1A78C2" strokeWidth={3} dot={{ r: 5, fill: '#1A78C2' }} name="Attrition" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default Reports
