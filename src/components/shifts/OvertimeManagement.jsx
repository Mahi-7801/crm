import { Clock, DollarSign, TrendingUp, BarChart3 } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const overtimeData = [
  { dept: 'Production', hours: 245, cost: 36750 },
  { dept: 'Warehouse', hours: 120, cost: 18000 },
  { dept: 'Quality', hours: 85, cost: 12750 },
  { dept: 'IT', hours: 45, cost: 9000 },
  { dept: 'Admin', hours: 30, cost: 6000 },
]

function OvertimeManagement() {
  const totalHours = overtimeData.reduce((s, d) => s + d.hours, 0)
  const totalCost = overtimeData.reduce((s, d) => s + d.cost, 0)

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Overtime Management</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Track overtime hours, costs, and department analysis.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total OT Hours (June)', value: `${totalHours}h`, icon: Clock, color: '#1A78C2' },
          { label: 'Total OT Cost', value: `₹${totalCost.toLocaleString()}`, icon: DollarSign, color: '#4CAF50' },
          { label: 'Avg OT / Employee', value: '14.2h', icon: TrendingUp, color: '#4CAF50' },
        ].map((s, i) => {
          const Icon = s.icon
          return (
            <div key={i} className="card p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${s.color}15` }}>
                <Icon className="w-6 h-6" style={{ color: s.color }} />
              </div>
              <div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{s.label}</div>
                <div className="text-xl font-bold mt-0.5" style={{ color: s.color }}>{s.value}</div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="card p-5">
        <h2 className="text-sm font-semibold mb-5" style={{ color: 'var(--text-primary)' }}>Department-wise Overtime</h2>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={overtimeData} barCategoryGap="25%">
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="dept" tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid var(--border)', background: 'var(--bg-card)' }} />
            <Bar dataKey="hours" fill="#1A78C2" radius={[6, 6, 0, 0]} maxBarSize={50} name="Hours" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="overflow-x-auto card">
        <table className="w-full text-sm">
          <thead><tr className="table-header">{['Employee', 'Department', 'OT Hours', 'Rate (₹/hr)', 'OT Amount', 'Status'].map(h => <th key={h}>{h}</th>)}</tr></thead>
          <tbody>
            {[
              { name: 'Rajesh Kumar', dept: 'Production', hours: 18, rate: 150, amount: 2700, status: 'Approved' },
              { name: 'Amit Patel', dept: 'Production', hours: 25, rate: 150, amount: 3750, status: 'Approved' },
              { name: 'Anita Desai', dept: 'Production', hours: 22, rate: 150, amount: 3300, status: 'Pending' },
              { name: 'Vikram Singh', dept: 'Warehouse', hours: 15, rate: 120, amount: 1800, status: 'Approved' },
            ].map((o, i) => (
              <tr key={i} className="table-row">
                <td className="px-4 py-3 font-medium" style={{ color: 'var(--text-primary)' }}>{o.name}</td>
                <td className="px-4 py-3" style={{ color: 'var(--text-secondary)' }}>{o.dept}</td>
                <td className="px-4 py-3 font-medium" style={{ color: 'var(--text-primary)' }}>{o.hours}h</td>
                <td className="px-4 py-3" style={{ color: 'var(--text-secondary)' }}>₹{o.rate}</td>
                <td className="px-4 py-3 font-medium" style={{ color: '#4CAF50' }}>₹{o.amount}</td>
                <td className="px-4 py-3"><span className={`badge ${o.status === 'Approved' ? 'badge-success' : 'badge-warning'}`}>{o.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OvertimeManagement
