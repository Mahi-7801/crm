import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Plus, Filter, Eye, Edit2, Trash2, ChevronDown, Download, Grid, List, UserPlus, DollarSign } from 'lucide-react'
import { useTheme } from '../../lib/ThemeContext'

const initialEmployees = [
  { id: 'EMP001', name: 'Rajesh Kumar', dept: 'Production', designation: 'Team Lead', email: 'rajesh@devna.com', phone: '9876543210', status: 'Active', doj: '01-01-2024' },
  { id: 'EMP002', name: 'Priya Sharma', dept: 'HR', designation: 'HR Manager', email: 'priya@devna.com', phone: '9876543211', status: 'Active', doj: '15-02-2024' },
  { id: 'EMP003', name: 'Amit Patel', dept: 'Production', designation: 'Operator', email: 'amit@devna.com', phone: '9876543212', status: 'Active', doj: '01-03-2024' },
  { id: 'EMP004', name: 'Sneha Reddy', dept: 'Finance', designation: 'Accountant', email: 'sneha@devna.com', phone: '9876543213', status: 'Active', doj: '01-04-2024' },
  { id: 'EMP005', name: 'Vikram Singh', dept: 'Warehouse', designation: 'Store Keeper', email: 'vikram@devna.com', phone: '9876543214', status: 'Inactive', doj: '01-01-2023' },
  { id: 'EMP006', name: 'Anita Desai', dept: 'Production', designation: 'Supervisor', email: 'anita@devna.com', phone: '9876543215', status: 'Active', doj: '01-05-2024' },
  { id: 'EMP007', name: 'Rohan Mehta', dept: 'IT', designation: 'System Admin', email: 'rohan@devna.com', phone: '9876543216', status: 'Active', doj: '01-06-2024' },
  { id: 'EMP008', name: 'Deepa Joshi', dept: 'Quality', designation: 'QC Inspector', email: 'deepa@devna.com', phone: '9876543217', status: 'Active', doj: '01-07-2024' },
]

function EmployeeList() {
  const { role } = useTheme()
  const [employeesData, setEmployeesData] = useState(() => {
    const saved = localStorage.getItem('hrms_employees')
    if (saved) return JSON.parse(saved)
    localStorage.setItem('hrms_employees', JSON.stringify(initialEmployees))
    return initialEmployees
  })
  const [nameSearch, setNameSearch] = useState('')
  const [idSearch, setIdSearch] = useState('')
  const [view, setView] = useState('table')
  const [deptFilter, setDeptFilter] = useState('')
  const [customDept, setCustomDept] = useState('')
  const [extraDepts, setExtraDepts] = useState(() => {
    const saved = localStorage.getItem('extra_departments')
    return saved ? JSON.parse(saved) : []
  })

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      const updated = employeesData.filter(e => e.id !== id)
      setEmployeesData(updated)
      localStorage.setItem('hrms_employees', JSON.stringify(updated))
    }
  }

  const filtered = employeesData.filter(e =>
    (e.name.toLowerCase().includes(nameSearch.toLowerCase())) &&
    (e.id.toLowerCase().includes(idSearch.toLowerCase())) &&
    (!deptFilter || e.dept === deptFilter)
  )

  const departments = [...new Set([...employeesData.map(e => e.dept), ...extraDepts])]

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Employee Management</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Manage employee records, onboarding, and profiles.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {role === 'super_admin' && (
            <Link to="/app/employees/pay-salary" className="btn-secondary text-xs"><DollarSign className="w-4 h-4 shrink-0" /> Pay Salary</Link>
          )}
          {(role === 'super_admin' || role === 'hr_manager') && (
            <>
              <Link to="/app/onboarding" className="btn-secondary text-xs"><UserPlus className="w-4 h-4 shrink-0" /> Onboarding</Link>
              <Link to="/app/employees/new" className="btn-primary text-xs"><Plus className="w-4 h-4 shrink-0" /> Add Employee</Link>
            </>
          )}
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="p-4 flex flex-col sm:flex-row gap-3 flex-wrap" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="relative flex-1 min-w-[180px]">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
            <input type="text" placeholder="Search by name..." value={nameSearch} onChange={e => setNameSearch(e.target.value)}
              className="input-field pl-10" />
          </div>
          <div className="relative flex-1 min-w-[140px]">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
            <input type="text" placeholder="Search by ID..." value={idSearch} onChange={e => setIdSearch(e.target.value)}
              className="input-field pl-10" />
          </div>
          <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)} className="input-field w-auto text-sm">
            <option value="">All Departments</option>
            {departments.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <div className="flex gap-2 items-center">
            <input type="text" placeholder="New dept..." value={customDept} onChange={e => setCustomDept(e.target.value)}
              className="input-field text-sm w-32" />
            <button onClick={() => {
              if (customDept.trim() && !extraDepts.includes(customDept.trim()) && !['Production', 'HR', 'Finance', 'IT', 'Warehouse', 'Quality', 'Admin'].includes(customDept.trim())) {
                const next = [...extraDepts, customDept.trim()]
                setExtraDepts(next)
                localStorage.setItem('extra_departments', JSON.stringify(next))
                setCustomDept('')
              }
            }}
              className="btn-primary text-xs py-2 px-3 whitespace-nowrap">+ Add</button>
          </div>
          <div className="flex rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
            <button onClick={() => setView('table')} className={`p-2.5 transition-colors ${view === 'table' ? 'bg-primary text-white' : ''}`} style={view !== 'table' ? { color: 'var(--text-muted)' } : {}}><List className="w-4 h-4" /></button>
            <button onClick={() => setView('grid')} className={`p-2.5 transition-colors ${view === 'grid' ? 'bg-primary text-white' : ''}`} style={view !== 'grid' ? { color: 'var(--text-muted)' } : {}}><Grid className="w-4 h-4" /></button>
          </div>
        </div>

        {view === 'table' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="table-header">
                {['Employee', 'Department', 'Designation', 'Contact', 'Status', 'Actions'].map(h => <th key={h}>{h}</th>)}
              </tr></thead>
              <tbody>
                {filtered.map((emp, i) => (
                  <tr key={emp.id} className="table-row animate-fade-in" style={{ animationDelay: `${i * 30}ms` }}>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold shrink-0"
                          style={{ background: 'color-mix(in srgb, var(--color-primary) 12%, transparent)', color: 'var(--color-primary)' }}>
                          {emp.name.split(' ').map(n => n[0]).join('')}</div>
                        <div><div className="font-medium" style={{ color: 'var(--text-primary)' }}>{emp.name}</div><div className="text-xs" style={{ color: 'var(--text-muted)' }}>{emp.id}</div></div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5"><span className="px-2.5 py-1 rounded-lg text-xs font-medium" style={{ background: 'var(--hover)', color: 'var(--text-secondary)' }}>{emp.dept}</span></td>
                    <td className="px-4 py-3.5" style={{ color: 'var(--text-secondary)' }}>{emp.designation}</td>
                    <td className="px-4 py-3.5"><div style={{ color: 'var(--text-secondary)' }}>{emp.email}</div><div className="text-xs" style={{ color: 'var(--text-muted)' }}>{emp.phone}</div></td>
                    <td className="px-4 py-3.5"><span className={`badge ${emp.status === 'Active' ? 'badge-success' : 'badge-neutral'}`}>{emp.status}</span></td>
                    <td className="px-4 py-3.5">
                      <div className="flex gap-0.5">
                        <Link to={`/app/employees/${emp.id}`} className="p-2 rounded-lg transition-colors" style={{ color: 'var(--text-muted)' }}><Eye className="w-4 h-4" /></Link>
                        {(role === 'super_admin' || role === 'hr_manager') && (
                          <Link to={`/app/employees/${emp.id}/edit`} className="p-2 rounded-lg transition-colors" style={{ color: 'var(--text-muted)' }}><Edit2 className="w-4 h-4" /></Link>
                        )}
                        {role === 'super_admin' && (
                          <button onClick={() => handleDelete(emp.id)} className="p-2 rounded-lg transition-colors hover:text-red-500" style={{ color: 'var(--text-muted)' }}><Trash2 className="w-4 h-4" /></button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
            {filtered.map((emp, i) => (
              <div key={emp.id} className="card p-4 text-center animate-scale-in" style={{ animationDelay: `${i * 30}ms` }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold mx-auto" style={{ background: 'color-mix(in srgb, var(--color-primary) 12%, transparent)', color: 'var(--color-primary)' }}>
                  {emp.name.split(' ').map(n => n[0]).join('')}</div>
                <div className="mt-3 font-semibold" style={{ color: 'var(--text-primary)' }}>{emp.name}</div>
                <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{emp.designation}</div>
                <div className="mt-2"><span className="badge-neutral badge">{emp.dept}</span></div>
                <div className="mt-3"><span className={`badge ${emp.status === 'Active' ? 'badge-success' : 'badge-neutral'}`}>{emp.status}</span></div>
                <div className="flex justify-center gap-2 mt-4">
                  <Link to={`/app/employees/${emp.id}`} className="btn-secondary text-xs py-2 px-4">Profile</Link>
                  {(role === 'super_admin' || role === 'hr_manager') && (
                    <Link to={`/app/employees/${emp.id}/edit`} className="btn-primary text-xs py-2 px-4">Edit</Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="px-4 py-3 flex items-center justify-between text-xs" style={{ borderTop: '1px solid var(--border)', color: 'var(--text-muted)' }}>
          <span>Showing {filtered.length} of {employeesData.length} employees</span>
          <div className="flex gap-1.5">
            <button className="px-3 py-1.5 rounded-lg transition-colors" style={{ border: '1px solid var(--border)', color: 'var(--text-muted)' }} disabled>Prev</button>
            {[1, 2, 3].map(p => <button key={p} className="px-3 py-1.5 rounded-lg font-medium" style={p === 1 ? { background: 'var(--color-primary)', color: 'white' } : { border: '1px solid var(--border)', color: 'var(--text-muted)' }}>{p}</button>)}
            <button className="px-3 py-1.5 rounded-lg" style={{ border: '1px solid var(--border)', color: 'var(--text-muted)' }}>Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeList
