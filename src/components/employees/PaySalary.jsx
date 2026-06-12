import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, DollarSign, Sun, Moon, Star, Clock, AlertCircle } from 'lucide-react'

const initialAllEmployees = [
  { id: 'EMP001', name: 'Rajesh Kumar', dept: 'Production', shift: 'Morning', monthlyHrs: 176, perDay: 2045, otHrs: 18, otAmount: 2700, basic: 45000, status: 'Active' },
  { id: 'EMP002', name: 'Priya Sharma', dept: 'HR', shift: 'Morning', monthlyHrs: 176, perDay: 3200, otHrs: 0, otAmount: 0, basic: 55000, status: 'Active' },
  { id: 'EMP003', name: 'Amit Patel', dept: 'Production', shift: 'Evening', monthlyHrs: 160, perDay: 1700, otHrs: 25, otAmount: 3750, basic: 25000, status: 'Active' },
  { id: 'EMP004', name: 'Sneha Reddy', dept: 'Finance', shift: 'Morning', monthlyHrs: 176, perDay: 2100, otHrs: 5, otAmount: 750, basic: 38000, status: 'Active' },
  { id: 'EMP005', name: 'Vikram Singh', dept: 'Warehouse', shift: 'Night', monthlyHrs: 168, perDay: 1500, otHrs: 12, otAmount: 1800, basic: 22000, status: 'Inactive' },
  { id: 'EMP006', name: 'Anita Desai', dept: 'Production', shift: 'Morning', monthlyHrs: 176, perDay: 1900, otHrs: 22, otAmount: 3300, basic: 32000, status: 'Active' },
  { id: 'EMP007', name: 'Rohan Mehta', dept: 'IT', shift: 'Evening', monthlyHrs: 176, perDay: 2700, otHrs: 8, otAmount: 1200, basic: 48000, status: 'Active' },
  { id: 'EMP008', name: 'Deepa Joshi', dept: 'Quality', shift: 'Morning', monthlyHrs: 176, perDay: 1800, otHrs: 10, otAmount: 1500, basic: 30000, status: 'Active' },
]

const shiftIcons = { Morning: Sun, Evening: Star, Night: Moon }
const shiftColors = { Morning: '#4CAF50', Evening: '#1A78C2', Night: '#1A78C2' }

function PaySalary() {
  const navigate = useNavigate()
  const [allEmployees, setAllEmployees] = useState(() => {
    const saved = localStorage.getItem('hrms_salary_data')
    if (saved) return JSON.parse(saved)
    localStorage.setItem('hrms_salary_data', JSON.stringify(initialAllEmployees))
    return initialAllEmployees
  })
  const [selected, setSelected] = useState([])
  const [selectAll, setSelectAll] = useState(false)

  const toggleAll = () => {
    if (selectAll) { setSelected([]); setSelectAll(false) }
    else { setSelected(allEmployees.map(e => e.id)); setSelectAll(true) }
  }

  const toggle = (id) => {
    setSelected(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
      setSelectAll(next.length === allEmployees.length)
      return next
    })
  }

  const handlePay = () => {
    alert(`Successfully processed payroll of ₹${totalPayable.toLocaleString()} for ${selected.length} employees!`)
    setSelected([])
    setSelectAll(false)
    navigate('/app/employees')
  }

  const sel = allEmployees.filter(e => selected.includes(e.id))
  const totalBasic = sel.reduce((s, e) => s + e.basic, 0)
  const totalOt = sel.reduce((s, e) => s + e.otAmount, 0)
  const totalPayable = totalBasic + totalOt

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/app/employees')} className="w-9 h-9 flex items-center justify-center rounded-xl" style={{ color: 'var(--text-secondary)' }}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Pay Salary</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Select employees and process salary with shift & OT calculations.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: 'Employees Selected', value: selected.length, color: 'var(--text-primary)' },
          { label: 'Total Basic Salary', value: `₹${totalBasic.toLocaleString()}`, color: 'var(--text-primary)' },
          { label: 'Total OT Amount', value: `₹${totalOt.toLocaleString()}`, color: '#4CAF50' },
          { label: 'Total Payable', value: `₹${totalPayable.toLocaleString()}`, color: '#1A78C2' },
        ].map((s, i) => (
          <div key={i} className="card p-5"><div className="text-xs" style={{ color: 'var(--text-muted)' }}>{s.label}</div><div className="text-xl font-bold mt-1" style={{ color: s.color }}>{s.value}</div></div>
        ))}
      </div>

      <div className="card overflow-hidden">
        <div className="p-4 flex items-center gap-2 text-xs" style={{ background: 'color-mix(in srgb, #1A78C2 6%, transparent)', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border)' }}>
          <AlertCircle className="w-3.5 h-3.5" style={{ color: '#1A78C2' }} />
          Salary calculated based on shift type — Morning (base), Evening (+10% allowance), Night (+20% allowance)
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="table-header">
                <th className="w-12"><input type="checkbox" checked={selectAll} onChange={toggleAll} className="accent-primary w-4 h-4" /></th>
                <th>Employee</th>
                <th>Dept</th>
                <th>Shift</th>
                <th>Monthly Hrs</th>
                <th>Per Day (₹)</th>
                <th>Basic (₹)</th>
                <th>OT Hrs</th>
                <th>OT Amount (₹)</th>
                <th className="text-primary">Total (₹)</th>
              </tr>
            </thead>
            <tbody>
              {allEmployees.map((emp, i) => {
                const ShiftIcon = shiftIcons[emp.shift]
                const shiftColor = shiftColors[emp.shift]
                const total = emp.basic + emp.otAmount
                const isSelected = selected.includes(emp.id)
                return (
                  <tr key={emp.id} className="table-row" style={isSelected ? { background: 'color-mix(in srgb, var(--color-primary) 4%, transparent)' } : {}}>
                    <td className="px-4 py-3"><input type="checkbox" checked={isSelected} onChange={() => toggle(emp.id)} className="accent-primary w-4 h-4" /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold" style={{ background: 'color-mix(in srgb, var(--color-primary) 12%, transparent)', color: '#1A78C2' }}>
                          {emp.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{emp.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3" style={{ color: 'var(--text-secondary)' }}>{emp.dept}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium" style={{ background: `${shiftColor}15`, color: shiftColor }}>
                        <ShiftIcon className="w-3 h-3" /> {emp.shift}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium" style={{ color: 'var(--text-primary)' }}>{emp.monthlyHrs}h</td>
                    <td className="px-4 py-3" style={{ color: 'var(--text-secondary)' }}>₹{emp.perDay.toLocaleString()}</td>
                    <td className="px-4 py-3" style={{ color: 'var(--text-secondary)' }}>₹{emp.basic.toLocaleString()}</td>
                    <td className="px-4 py-3" style={{ color: '#4CAF50' }}>{emp.otHrs}h</td>
                    <td className="px-4 py-3 font-medium" style={{ color: '#4CAF50' }}>₹{emp.otAmount.toLocaleString()}</td>
                    <td className="px-4 py-3 font-bold" style={{ color: 'var(--color-primary)' }}>₹{total.toLocaleString()}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end gap-3 flex-wrap">
        <button onClick={() => navigate('/app/employees')} className="btn-secondary shrink-0">Cancel</button>
        <button onClick={handlePay} disabled={selected.length === 0} className="btn-primary" style={{ opacity: selected.length === 0 ? 0.5 : 1 }}>
          <DollarSign className="w-4 h-4 shrink-0" /> Pay Selected ({selected.length}) — ₹{totalPayable.toLocaleString()}
        </button>
      </div>
    </div>
  )
}

export default PaySalary
