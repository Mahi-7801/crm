import { useState } from 'react'
import { ArrowLeft, Sun, Moon, Star, Clock, ChevronLeft, ChevronRight } from 'lucide-react'

const shifts = [
  { name: 'Morning', time: '06:00 - 14:00', icon: Sun, color: '#4CAF50', count: 45 },
  { name: 'Evening', time: '14:00 - 22:00', icon: Star, color: '#1A78C2', count: 28 },
  { name: 'Night', time: '22:00 - 06:00', icon: Moon, color: '#1A78C2', count: 15 },
]

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const employees = [
  { name: 'Rajesh Kumar', mon: 'Morning', tue: 'Morning', wed: 'Morning', thu: 'Morning', fri: 'Morning', sat: '-', sun: '-' },
  { name: 'Amit Patel', mon: 'Evening', tue: 'Evening', wed: 'Evening', thu: 'Evening', fri: 'Evening', sat: '-', sun: '-' },
  { name: 'Vikram Singh', mon: 'Night', tue: 'Night', wed: 'Night', thu: 'Night', fri: 'Night', sat: '-', sun: '-' },
]

function ShiftScheduler() {
  const [week, setWeek] = useState('Jun 08 - Jun 14, 2026')

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Shift & Workforce Planning</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Schedule shifts and manage workforce assignments.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {shifts.map((s, i) => {
          const Icon = s.icon
          return (
            <div key={i} className="card p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${s.color}15` }}>
                <Icon className="w-6 h-6" style={{ color: s.color }} />
              </div>
              <div>
                <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>{s.name}</div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{s.time}</div>
                <div className="text-xs mt-0.5 font-medium" style={{ color: s.color }}>{s.count} employees</div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="card p-5">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <button className="p-1.5 rounded-lg transition-colors" style={{ color: 'var(--text-muted)' }}><ChevronLeft className="w-4 h-4" /></button>
            <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{week}</span>
            <button className="p-1.5 rounded-lg transition-colors" style={{ color: 'var(--text-muted)' }}><ChevronRight className="w-4 h-4" /></button>
          </div>
          <button className="btn-primary text-xs"><Clock className="w-4 h-4" /> Auto Schedule</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="table-header">
                <th className="sticky left-0 z-10" style={{ background: 'var(--bg-card)' }}>Employee</th>
                {weekDays.map(d => <th key={d} className="text-center">{d}</th>)}
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, i) => (
                <tr key={i} className="table-row">
                  <td className="px-4 py-3 font-medium sticky left-0 z-10" style={{ color: 'var(--text-primary)', background: 'var(--bg-card)' }}>{emp.name}</td>
                  {weekDays.map(d => {
                    const day = d.toLowerCase().slice(0, 3)
                    const shift = emp[day]
                    const shiftInfo = shifts.find(s => s.name === shift)
                    return (
                      <td key={d} className="px-3 py-3 text-center">
                        {shiftInfo ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium"
                            style={{ background: `${shiftInfo.color}15`, color: shiftInfo.color }}>
                            <shiftInfo.icon className="w-3 h-3" /> {shift}
                          </span>
                        ) : (
                          <span style={{ color: 'var(--text-muted)' }}>—</span>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ShiftScheduler
