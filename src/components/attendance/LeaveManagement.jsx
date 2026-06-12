import { useState } from 'react'
import { useTheme } from '../../lib/ThemeContext'
import { Search, CheckCircle, XCircle, CalendarCheck, Clock, AlertCircle, Plus, Filter, User } from 'lucide-react'

const initialRequests = [
  { id: 'LV001', name: 'Rajesh Kumar', type: 'Sick Leave', from: '12-06-2026', to: '13-06-2026', days: 2, status: 'Pending', reason: 'Not feeling well' },
  { id: 'LV002', name: 'Priya Sharma', type: 'Casual Leave', from: '15-06-2026', to: '15-06-2026', days: 1, status: 'Approved', reason: 'Personal work' },
  { id: 'LV003', name: 'Amit Patel', type: 'Annual Leave', from: '20-06-2026', to: '24-06-2026', days: 5, status: 'Pending', reason: 'Family vacation' },
  { id: 'LV004', name: 'Sneha Reddy', type: 'Sick Leave', from: '10-06-2026', to: '10-06-2026', days: 1, status: 'Approved', reason: 'Doctor appointment' },
  { id: 'LV005', name: 'Vikram Singh', type: 'Casual Leave', from: '18-06-2026', to: '19-06-2026', days: 2, status: 'Rejected', reason: 'Insufficient balance' },
]

const balances = [
  { type: 'Annual Leave', total: 20, used: 8, remaining: 12, icon: CalendarCheck, color: '#1A78C2' },
  { type: 'Sick Leave', total: 12, used: 3, remaining: 9, icon: AlertCircle, color: '#4CAF50' },
  { type: 'Casual Leave', total: 10, used: 5, remaining: 5, icon: Clock, color: '#1A78C2' },
]

function LeaveManagement() {
  const { role } = useTheme()
  const isAdmin = role === 'super_admin' || role === 'hr_manager' || role === 'dept_manager'
  const [tab, setTab] = useState('requests')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [leaveRequests, setLeaveRequests] = useState(initialRequests)

  const handleApprove = (id) => {
    setLeaveRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'Approved' } : r))
  }

  const handleReject = (id) => {
    setLeaveRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'Rejected' } : r))
  }

  const filtered = leaveRequests.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'All' || r.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Leave Management</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Manage leave requests, approvals, and balances.</p>
        </div>
        <button className="btn-primary text-xs"><Plus className="w-4 h-4" /> New Request</button>
      </div>

      <div className="flex gap-2">
        <button onClick={() => setTab('requests')} className={`tab-btn ${tab === 'requests' ? 'active' : ''}`}>Leave Requests</button>
        <button onClick={() => setTab('balance')} className={`tab-btn ${tab === 'balance' ? 'active' : ''}`}>Leave Balance</button>
      </div>

      {tab === 'requests' && (
        <div className="card overflow-hidden">
          <div className="p-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between" style={{ borderBottom: '1px solid var(--border)' }}>
            <div className="relative flex-1 max-w-xs">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
              <input type="text" placeholder="Search employee or ID..." value={search} onChange={e => setSearch(e.target.value)} className="input-field pl-10" />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 shrink-0" style={{ color: 'var(--text-muted)' }} />
              {['All', 'Pending', 'Approved', 'Rejected'].map(s => (
                <button key={s} onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${statusFilter === s ? 'bg-primary text-white' : ''}`}
                  style={statusFilter !== s ? { background: 'var(--hover)', color: 'var(--text-secondary)' } : {}}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="table-header">{['Employee', 'Leave Type', 'Duration', 'Days', 'Reason', 'Status', 'Actions'].map(h => <th key={h}>{h}</th>)}</tr></thead>
              <tbody>
                {filtered.map((lv, i) => (
                  <tr key={lv.id} className="table-row">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {lv.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{lv.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3"><span className="badge-neutral badge">{lv.type}</span></td>
                    <td className="px-4 py-3" style={{ color: 'var(--text-secondary)' }}>{lv.from} - {lv.to}</td>
                    <td className="px-4 py-3 font-medium" style={{ color: 'var(--text-primary)' }}>{lv.days}</td>
                    <td className="px-4 py-3 max-w-[100px] sm:max-w-[200px] truncate" style={{ color: 'var(--text-muted)' }}>{lv.reason}</td>
                    <td className="px-4 py-3"><span className={`badge ${lv.status === 'Approved' ? 'badge-success' : lv.status === 'Rejected' ? 'badge-danger' : 'badge-warning'}`}>{lv.status}</span></td>
                    <td className="px-4 py-3">
                      {lv.status === 'Pending' && isAdmin ? (
                        <div className="flex gap-1">
                          <button onClick={() => handleApprove(lv.id)} className="p-1.5 rounded-lg transition-colors hover:bg-green-50" style={{ color: '#4CAF50' }} title="Approve">
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleReject(lv.id)} className="p-1.5 rounded-lg transition-colors hover:bg-red-50" style={{ color: '#1A78C2' }} title="Reject">
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                          {lv.status === 'Approved' ? 'Approved' : lv.status === 'Rejected' ? 'Rejected' : 'Awaiting'}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'balance' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {balances.map((b, i) => {
            const Icon = b.icon
            return (
              <div key={i} className="card p-5 animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${b.color}15` }}>
                    <Icon className="w-6 h-6" style={{ color: b.color }} />
                  </div>
                  <span className={`badge ${b.remaining > 5 ? 'badge-success' : 'badge-warning'}`}>{b.remaining} left</span>
                </div>
                <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{b.type}</h3>
                <div className="mt-4 space-y-2 text-sm">
                  {[
                    { label: 'Total', value: b.total, color: 'var(--text-primary)' },
                    { label: 'Used', value: b.used, color: '#4CAF50' },
                    { label: 'Remaining', value: b.remaining, color: '#4CAF50' },
                  ].map((s, j) => (
                    <div key={j} className="flex justify-between">
                      <span style={{ color: 'var(--text-muted)' }}>{s.label}</span>
                      <span className="font-medium" style={{ color: s.color }}>{s.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 h-2 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
                  <div className="h-full rounded-full transition-all" style={{ width: `${(b.used / b.total) * 100}%`, background: b.color }} />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default LeaveManagement
