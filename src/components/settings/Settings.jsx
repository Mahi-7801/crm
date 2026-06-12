import { useState } from 'react'
import { Settings2, Building2, DollarSign, Shield, Bell, Users, Activity, FileText } from 'lucide-react'
import { useTheme } from '../../lib/ThemeContext'

function Settings() {
  const { role } = useTheme()
  const [activeSection, setActiveSection] = useState('company')

  const sections = [
    { key: 'company', label: 'Company', icon: Building2 },
    { key: 'payroll', label: 'Payroll Rules', icon: DollarSign, roleLimit: 'super_admin' },
    { key: 'leave', label: 'Leave Policies', icon: FileText },
    { key: 'roles', label: 'Roles & Permissions', icon: Shield },
    { key: 'notifications', label: 'Notifications', icon: Bell },
    { key: 'audit', label: 'Audit Logs', icon: Activity },
  ]

  const visibleSections = sections.filter(s => !s.roleLimit || role === s.roleLimit)

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Settings & Administration</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Company configuration, payroll rules, leave policies, and system settings.</p>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-1">
        {visibleSections.map(s => (
          <button key={s.key} onClick={() => setActiveSection(s.key)}
            className="tab-btn text-sm" data-active={activeSection === s.key}>
            <s.icon className="w-4 h-4" /> {s.label}
          </button>
        ))}
      </div>

      {activeSection === 'company' && (
        <div className="card p-6 space-y-5">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Devna Engineers</h2>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Industrial equipment manufacturing</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
            {[
              { label: 'Company Name', value: 'Devna Engineers Pvt. Ltd.', type: 'text' },
              { label: 'Registration No', value: 'U12345KA2020PTC123456', type: 'text' },
              { label: 'GST No', value: '29ABCDE1234F1Z5', type: 'text' },
              { label: 'PAN', value: 'ABCDE1234F', type: 'text' },
              { label: 'Email', value: 'info@devna.com', type: 'email' },
              { label: 'Phone', value: '+91 80 4123 4567', type: 'text' },
              { label: 'Industry', value: 'Industrial Manufacturing', type: 'text' },
              { label: 'Employees', value: '119', type: 'number' },
            ].map((f, i) => (
              <div key={i}>
                <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>{f.label}</label>
                <input type={f.type} className="input-field" defaultValue={f.value} />
              </div>
            ))}
          </div>
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Address</label>
            <textarea className="input-field" rows="2" defaultValue="Industrial Area, Phase 2, Bangalore - 560001" />
          </div>
          <div className="flex justify-end"><button className="btn-primary">Save Changes</button></div>
        </div>
      )}

      {activeSection === 'payroll' && role === 'super_admin' && (
        <div className="card p-6 space-y-5">
          <h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Payroll Configuration</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
            {[
              { label: 'PF Employer Contribution (%)', value: '12' },
              { label: 'ESIC Employer Contribution (%)', value: '3.25' },
              { label: 'Professional Tax (Monthly)', value: '₹200' },
              { label: 'OT Rate Multiplier', value: '2x' },
              { label: 'Bonus % of Basic (Annual)', value: '8.33%' },
              { label: 'Payroll Cycle', value: 'Monthly (1st - 30th)' },
            ].map((f, i) => (
              <div key={i}>
                <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>{f.label}</label>
                <input className="input-field" defaultValue={f.value} />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {[
              { label: 'PF Applicable', checked: true },
              { label: 'ESIC Applicable', checked: true },
              { label: 'TDS Deduction', checked: true },
            ].map((t, i) => (
              <label key={i} className="flex items-center gap-2.5 text-sm" style={{ color: 'var(--text-primary)' }}>
                <input type="checkbox" defaultChecked={t.checked} className="accent-primary w-4 h-4" /> {t.label}
              </label>
            ))}
          </div>
          <div className="flex justify-end"><button className="btn-primary">Save Changes</button></div>
        </div>
      )}



      {activeSection === 'leave' && (
        <div className="card p-6 space-y-5">
          <h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Leave Policies</h2>
          <div className="space-y-3">
            {[
              { type: 'Annual Leave', days: 18, carryForward: 5, requiresApproval: true },
              { type: 'Sick Leave', days: 12, carryForward: 0, requiresApproval: true },
              { type: 'Casual Leave', days: 6, carryForward: 0, requiresApproval: true },
              { type: 'Maternity Leave', days: 90, carryForward: 0, requiresApproval: true },
              { type: 'Paternity Leave', days: 5, carryForward: 0, requiresApproval: true },
              { type: 'Comp Off', days: 4, carryForward: 2, requiresApproval: true },
            ].map((l, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl" style={{ background: 'var(--hover)' }}>
                <div>
                  <div className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{l.type}</div>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{l.days} days/year • Carry forward: {l.carryForward} days</div>
                </div>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
                    <input type="checkbox" defaultChecked={l.requiresApproval} className="accent-primary w-3.5 h-3.5" /> Approval Required
                  </label>
                  <button className="text-xs font-medium" style={{ color: 'var(--color-primary)' }}>Edit</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === 'roles' && (
        <div className="card p-6 space-y-5">
          <h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Roles & Permissions</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="table-header">{['Role', 'Users', 'Employees', 'Attendance', 'Payroll', 'Assets', 'Reports', 'Settings'].map(h => <th key={h}>{h}</th>)}</tr></thead>
              <tbody>
                {[
                  { role: 'Super Admin', users: 2, perms: 'All', all: true },
                  { role: 'HR Manager', users: 3, perms: 'View/Edit/Delete', all: false },
                  { role: 'Dept Manager', users: 5, perms: 'View Only', all: false },
                  { role: 'Employee', users: 109, perms: 'Self Service', all: false },
                ].map((r, i) => (
                  <tr key={i} className="table-row">
                    <td className="px-4 py-3 font-medium" style={{ color: 'var(--text-primary)' }}>{r.role}</td>
                    <td className="px-4 py-3" style={{ color: 'var(--text-secondary)' }}>{r.users}</td>
                    {['Full', 'Full', 'Full', 'Full', 'Full', 'Full'].map((p, j) => (
                      <td key={j} className="px-4 py-3">
                        <span className={`badge ${r.role === 'Super Admin' || (r.role === 'HR Manager' && j < 5) ? 'badge-success' : r.role === 'Dept Manager' && j < 2 ? 'badge-warning' : r.role === 'Employee' && j > 4 ? 'badge-info' : 'badge-secondary'}`}>
                          {r.role === 'Super Admin' || (r.role === 'HR Manager' && j < 5) ? '✓' : r.role === 'Dept Manager' && j < 2 ? 'View' : r.role === 'Employee' && j > 4 ? 'Self' : '—'}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeSection === 'notifications' && (
        <div className="card p-6 space-y-4">
          <h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Notification Settings</h2>
          {[
            { label: 'Email Notifications', desc: 'Receive email alerts for pending approvals and updates' },
            { label: 'Leave Approvals', desc: 'Notify when employee applies for leave' },
            { label: 'Shift Allocation', desc: 'Alert when new shifts are allocated' },
            { label: 'Asset Allocation', desc: 'Notify on new asset allocation requests' },
            { label: 'System Alerts', desc: 'Critical system notifications and warnings' },
          ].map((n, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl" style={{ background: 'var(--hover)' }}>
              <div>
                <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{n.label}</div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{n.desc}</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked={i < 3} className="sr-only peer" />
                <div className="w-10 h-5 rounded-full transition-colors" style={{ background: 'var(--border)' }} />
                <div className="absolute left-0.5 top-0.5 w-4 h-4 rounded-full transition-transform bg-white shadow-sm peer-checked:translate-x-5" style={{ background: i < 3 ? 'var(--color-primary)' : '#ccc' }} />
              </label>
            </div>
          ))}
          <div className="flex justify-end"><button className="btn-primary">Save Preferences</button></div>
        </div>
      )}

      {activeSection === 'audit' && (
        <div className="card overflow-hidden">
          <div className="p-4 flex items-center gap-2 text-xs" style={{ background: 'var(--hover)', color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>
            <Activity className="w-3.5 h-3.5" /> Last 30 days of system activity
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="table-header">{['Timestamp', 'User', 'Action', 'Module', 'IP Address', 'Status'].map(h => <th key={h}>{h}</th>)}</tr></thead>
              <tbody>
                {[
                  { time: '11-06-2026 09:23', user: 'admin@devna.com', action: 'Login', module: 'Auth', ip: '192.168.1.100', status: 'Success' },
                  { time: '11-06-2026 09:25', user: 'admin@devna.com', action: 'View Employee', module: 'HR', ip: '192.168.1.100', status: 'Success' },
                  { time: '11-06-2026 09:30', user: 'hr@devna.com', action: 'Update Shift', module: 'Shifts', ip: '192.168.1.101', status: 'Success' },
                  { time: '11-06-2026 08:45', user: 'manager@devna.com', action: 'Approve Leave', module: 'Attendance', ip: '192.168.1.102', status: 'Success' },
                  { time: '10-06-2026 17:30', user: 'admin@devna.com', action: 'Export Report', module: 'Reports', ip: '192.168.1.100', status: 'Success' },
                ].map((a, i) => (
                  <tr key={i} className="table-row">
                    <td className="px-4 py-3 text-xs" style={{ color: 'var(--text-muted)' }}>{a.time}</td>
                    <td className="px-4 py-3 text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>{a.user}</td>
                    <td className="px-4 py-3 font-medium" style={{ color: 'var(--text-primary)' }}>{a.action}</td>
                    <td className="px-4 py-3"><span className="badge">{a.module}</span></td>
                    <td className="px-4 py-3 text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{a.ip}</td>
                    <td className="px-4 py-3"><span className={`badge ${a.status === 'Success' ? 'badge-success' : 'badge-danger'}`}>{a.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default Settings
