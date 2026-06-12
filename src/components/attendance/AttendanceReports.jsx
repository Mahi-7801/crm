import { useState } from 'react'
import { Search, Download, Filter, ChevronDown, CalendarDays } from 'lucide-react'

function AttendanceReports() {
  const departments = ['All', 'Production', 'HR', 'Finance', 'IT', 'Warehouse', 'Quality']

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Attendance Reports</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Generate and export attendance reports with filters.</p>
      </div>

      <div className="card p-5">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-5">
          <div>
            <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-muted)' }}>Department</label>
            <select className="input-field">
              {departments.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-muted)' }}>Employee</label>
            <select className="input-field"><option>All Employees</option></select>
          </div>
          <div>
            <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-muted)' }}>From Date</label>
            <input type="date" className="input-field" />
          </div>
          <div>
            <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-muted)' }}>To Date</label>
            <input type="date" className="input-field" />
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button className="btn-primary text-xs"><Search className="w-4 h-4 shrink-0" /> Generate Report</button>
          <button className="btn-secondary text-xs"><Download className="w-4 h-4 shrink-0" /> Export PDF</button>
          <button className="btn-secondary text-xs"><Download className="w-4 h-4 shrink-0" /> Export Excel</button>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="p-4" style={{ borderBottom: '1px solid var(--border)' }}>
          <h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Monthly Attendance Summary - June 2026</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="table-header">{['Employee', 'Present', 'Absent', 'Late', 'Half-Day', 'Leave', 'OT Hours', 'Attendance %'].map(h => <th key={h}>{h}</th>)}</tr></thead>
            <tbody>
              {[
                { name: 'Rajesh Kumar', p: 24, a: 2, l: 1, h: 0, lv: 1, ot: 18 },
                { name: 'Priya Sharma', p: 25, a: 1, l: 1, h: 0, lv: 2, ot: 5 },
                { name: 'Amit Patel', p: 22, a: 3, l: 2, h: 1, lv: 1, ot: 25 },
              ].map((e, i) => (
                <tr key={i} className="table-row">
                  <td className="px-4 py-3 font-medium" style={{ color: 'var(--text-primary)' }}>{e.name}</td>
                  <td className="px-4 py-3" style={{ color: '#4CAF50' }}>{e.p}</td>
                  <td className="px-4 py-3" style={{ color: '#1A78C2' }}>{e.a}</td>
                  <td className="px-4 py-3" style={{ color: '#4CAF50' }}>{e.l}</td>
                  <td className="px-4 py-3" style={{ color: '#1A78C2' }}>{e.h}</td>
                  <td className="px-4 py-3" style={{ color: '#1A78C2' }}>{e.lv}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--text-secondary)' }}>{e.ot}h</td>
                  <td className="px-4 py-3"><span className="badge badge-success">{Math.round(e.p / 28 * 100)}%</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AttendanceReports
