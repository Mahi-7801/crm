import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Download, Info, Calculator, Percent, Plus } from 'lucide-react'

const employees = [
  { id: 'EMP001', name: 'Rajesh Kumar', basic: 45000, da: 5000, hra: 8000, ot: 3200, pf: 1800, esic: 500, tax: 1200, incentive: 2000, bonus: 3000 },
  { id: 'EMP002', name: 'Priya Sharma', basic: 55000, da: 6000, hra: 10000, ot: 0, pf: 2200, esic: 600, tax: 2500, incentive: 0, bonus: 5000 },
  { id: 'EMP003', name: 'Amit Patel', basic: 25000, da: 3000, hra: 5000, ot: 4500, pf: 1250, esic: 350, tax: 500, incentive: 1000, bonus: 0 },
]

function PayrollProcess() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState([])
  const toggleAll = () => setSelected(selected.length === employees.length ? [] : employees.map(e => e.id))
  const toggle = (id) => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  const sel = employees.filter(e => selected.includes(e.id))
  const totalEarnings = sel.reduce((s, e) => s + e.basic + e.da + e.hra + e.ot + e.incentive + e.bonus, 0)
  const totalDed = sel.reduce((s, e) => s + e.pf + e.esic + e.tax, 0)

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/app/payroll')} className="w-9 h-9 flex items-center justify-center rounded-xl" style={{ color: 'var(--text-secondary)' }}><ArrowLeft className="w-5 h-5" /></button>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Process Payroll</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Review and process salary for June 2026.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: 'Selected', value: selected.length, color: 'var(--text-primary)' },
          { label: 'Total Earnings', value: `₹${totalEarnings.toLocaleString()}`, color: 'var(--text-primary)' },
          { label: 'Total Deductions', value: `₹${totalDed.toLocaleString()}`, color: '#1A78C2' },
          { label: 'Net Payable', value: `₹${(totalEarnings - totalDed).toLocaleString()}`, color: '#4CAF50' },
        ].map((s, i) => (
          <div key={i} className="card p-4"><div className="text-xs" style={{ color: 'var(--text-muted)' }}>{s.label}</div><div className="text-xl font-bold mt-1" style={{ color: s.color }}>{s.value}</div></div>
        ))}
      </div>

      <div className="card overflow-hidden">
        <div className="p-3 flex items-center gap-2 text-xs" style={{ background: 'var(--hover)', color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>
          <Info className="w-3.5 h-3.5" /> Select employees, review earnings & deductions, then process
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="table-header">
                <th className="w-12"><input type="checkbox" checked={selected.length === employees.length} onChange={toggleAll} className="accent-primary w-4 h-4" /></th>
                <th>Employee</th>
                <th>Basic</th><th>DA</th><th>HRA</th><th>OT</th><th>Incentive</th><th>Bonus</th>
                <th className="text-success">Earnings</th><th className="text-danger">Deductions</th><th className="text-success">Net Pay</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, i) => {
                const earnings = emp.basic + emp.da + emp.hra + emp.ot + emp.incentive + emp.bonus
                const ded = emp.pf + emp.esic + emp.tax
                return (
                  <tr key={emp.id} className="table-row" style={selected.includes(emp.id) ? { background: 'color-mix(in srgb, var(--color-primary) 4%, transparent)' } : {}}>
                    <td className="px-4 py-3"><input type="checkbox" checked={selected.includes(emp.id)} onChange={() => toggle(emp.id)} className="accent-primary w-4 h-4" /></td>
                    <td className="px-4 py-3 font-medium" style={{ color: 'var(--text-primary)' }}>{emp.name}</td>
                    <td className="px-3 py-3" style={{ color: 'var(--text-secondary)' }}>₹{emp.basic.toLocaleString()}</td>
                    <td className="px-3 py-3" style={{ color: 'var(--text-secondary)' }}>₹{emp.da.toLocaleString()}</td>
                    <td className="px-3 py-3" style={{ color: 'var(--text-secondary)' }}>₹{emp.hra.toLocaleString()}</td>
                    <td className="px-3 py-3" style={{ color: 'var(--text-secondary)' }}>₹{emp.ot.toLocaleString()}</td>
                    <td className="px-3 py-3" style={{ color: 'var(--text-secondary)' }}>₹{emp.incentive.toLocaleString()}</td>
                    <td className="px-3 py-3" style={{ color: 'var(--text-secondary)' }}>₹{emp.bonus.toLocaleString()}</td>
                    <td className="px-3 py-3 font-medium" style={{ color: '#4CAF50' }}>₹{earnings.toLocaleString()}</td>
                    <td className="px-3 py-3" style={{ color: '#1A78C2' }}>₹{ded.toLocaleString()}</td>
                    <td className="px-3 py-3 font-medium" style={{ color: '#4CAF50' }}>₹{(earnings - ded).toLocaleString()}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end gap-3 flex-wrap">
        <button onClick={() => navigate('/app/payroll')} className="btn-secondary">Cancel</button>
        <button className="btn-secondary"><Calculator className="w-4 h-4 shrink-0" /> Calculate</button>
        <button disabled={selected.length === 0} className="btn-primary" style={{ opacity: selected.length === 0 ? 0.5 : 1 }}>
          <Download className="w-4 h-4 shrink-0" /> Process ({selected.length})
        </button>
      </div>
    </div>
  )
}

export default PayrollProcess
