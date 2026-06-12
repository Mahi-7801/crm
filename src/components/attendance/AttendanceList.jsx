import { useState } from 'react'
import { Search, Filter, ChevronDown, CalendarDays, Download } from 'lucide-react'

const logs = [
  { date: '11-06-2026', name: 'Rajesh Kumar', id: 'EMP001', dept: 'Production', in: '08:55', out: '18:05', status: 'Present', ot: '1h 5m' },
  { date: '11-06-2026', name: 'Priya Sharma', id: 'EMP002', dept: 'HR', in: '09:15', out: '18:00', status: 'Present', ot: '0h' },
  { date: '11-06-2026', name: 'Amit Patel', id: 'EMP003', dept: 'Production', in: '08:30', out: '18:30', status: 'Present', ot: '2h' },
  { date: '11-06-2026', name: 'Sneha Reddy', id: 'EMP004', dept: 'Finance', in: '09:00', out: '17:30', status: 'Present', ot: '0h' },
  { date: '11-06-2026', name: 'Vikram Singh', id: 'EMP005', dept: 'Warehouse', in: '--', out: '--', status: 'Absent', ot: '--' },
  { date: '11-06-2026', name: 'Anita Desai', id: 'EMP006', dept: 'Production', in: '08:45', out: '18:15', status: 'Present', ot: '1h 30m' },
  { date: '11-06-2026', name: 'Rohan Mehta', id: 'EMP007', dept: 'IT', in: '09:30', out: '18:00', status: 'Late', ot: '0h' },
]

const stats = [
  { label: 'Present', value: '5', total: '8', pct: 62.5, color: '#4CAF50' },
  { label: 'Absent', value: '1', total: '8', pct: 12.5, color: '#1A78C2' },
  { label: 'Late', value: '1', total: '8', pct: 12.5, color: '#4CAF50' },
  { label: 'Half-Day', value: '0', total: '8', pct: 0, color: '#1A78C2' },
  { label: 'On Leave', value: '1', total: '8', pct: 12.5, color: '#1A78C2' },
]

function AttendanceList() {
  const [search, setSearch] = useState('')
  const filtered = logs.filter(e => e.name.toLowerCase().includes(search.toLowerCase()) || e.id.includes(search))

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Attendance Management</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Daily attendance monitoring with login/logout tracking.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {stats.map((s, i) => (
          <div key={i} className="card p-4 animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>{s.label}</span>
              <span className="text-lg font-bold" style={{ color: s.color }}>{s.value}</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
              <div className="h-full rounded-full transition-all" style={{ width: `${s.pct}%`, background: s.color }} />
            </div>
            <div className="text-[11px] mt-1" style={{ color: 'var(--text-muted)' }}>{s.pct}%</div>
          </div>
        ))}
      </div>

      <div className="card overflow-hidden">
        <div className="p-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
            <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="input-field pl-10" />
          </div>
          <div className="flex gap-2">
            <button className="btn-secondary text-xs"><CalendarDays className="w-4 h-4" /> Today</button>
            <button className="btn-secondary text-xs"><Download className="w-4 h-4" /> Export</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="table-header">{['Date', 'Employee', 'Dept', 'In', 'Out', 'Status', 'Overtime'].map(h => <th key={h}>{h}</th>)}</tr></thead>
            <tbody>
              {filtered.map((log, i) => (
                <tr key={i} className="table-row">
                  <td className="px-4 py-3" style={{ color: 'var(--text-secondary)' }}>{log.date}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold" style={{ background: 'color-mix(in srgb, var(--color-primary) 12%, transparent)', color: 'var(--color-primary)' }}>
                        {log.name.split(' ').map(n => n[0]).join('')}</div>
                      <div><div className="font-medium" style={{ color: 'var(--text-primary)' }}>{log.name}</div><div className="text-xs" style={{ color: 'var(--text-muted)' }}>{log.id}</div></div>
                    </div>
                  </td>
                  <td className="px-4 py-3"><span className="px-2.5 py-1 rounded-lg text-xs font-medium" style={{ background: 'var(--hover)', color: 'var(--text-secondary)' }}>{log.dept}</span></td>
                  <td className="px-4 py-3 font-medium" style={{ color: 'var(--text-primary)' }}>{log.in}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--text-secondary)' }}>{log.out}</td>
                  <td className="px-4 py-3"><span className={`badge ${log.status === 'Present' ? 'badge-success' : log.status === 'Absent' ? 'badge-danger' : 'badge-warning'}`}>{log.status}</span></td>
                  <td className="px-4 py-3" style={{ color: 'var(--text-secondary)' }}>{log.ot}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AttendanceList
