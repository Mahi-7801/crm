import { useState } from 'react'
import { User, Calendar, Clock, FileText, CreditCard, Shield, ChevronRight, MapPin, Phone, Mail } from 'lucide-react'

function SelfService() {
  const [activeTab, setActiveTab] = useState('profile')

  const tabs = [
    { key: 'profile', label: 'My Profile', icon: User },
    { key: 'attendance', label: 'Attendance', icon: Calendar },
    { key: 'payslips', label: 'Payslips', icon: FileText },
    { key: 'documents', label: 'Documents', icon: Shield },
  ]

  const TabIcon = tabs.find(t => t.key === activeTab)?.icon

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Employee Self Service</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>View and manage your personal information, attendance, payslips, and documents.</p>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-1">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)}
            className="tab-btn text-sm" data-active={activeTab === t.key}>
            <t.icon className="w-4 h-4" /> {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="card p-6 text-center space-y-4">
            <div className="w-20 h-20 rounded-2xl mx-auto flex items-center justify-center text-2xl font-bold" style={{ background: 'color-mix(in srgb, var(--color-primary) 12%, transparent)', color: 'var(--color-primary)' }}>RK</div>
            <div>
              <div className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Rajesh Kumar</div>
              <div className="text-sm" style={{ color: 'var(--text-muted)' }}>Team Lead — Production</div>
            </div>
            <div className="space-y-1.5 text-xs text-left">
              {[
                { icon: Mail, label: 'rajesh.k@devna.com' },
                { icon: Phone, label: '+91 98765 43210' },
                { icon: MapPin, label: 'Bangalore, India' },
              ].map((d, i) => (
                <div key={i} className="flex items-center gap-2.5"><d.icon className="w-3.5 h-3.5" style={{ color: 'var(--text-muted)' }} /><span style={{ color: 'var(--text-secondary)' }}>{d.label}</span></div>
              ))}
            </div>
            <div className="flex justify-center gap-3 pt-2">
              <div className="text-center">
                <div className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>4.5</div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Years</div>
              </div>
              <div className="w-px" style={{ background: 'var(--border)' }} />
              <div className="text-center">
                <div className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>12</div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Leaves Left</div>
              </div>
              <div className="w-px" style={{ background: 'var(--border)' }} />
              <div className="text-center">
                <div className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>92%</div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Attendance</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 card p-6 space-y-5">
            <div>
              <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Personal Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                {[
                  { label: 'Full Name', value: 'Rajesh Kumar' },
                  { label: 'Date of Birth', value: '15-03-1990' },
                  { label: 'Gender', value: 'Male' },
                  { label: 'Marital Status', value: 'Married' },
                  { label: 'Blood Group', value: 'B+' },
                  { label: 'PAN', value: 'ABCDE1234F' },
                ].map((f, i) => (
                  <div key={i}>
                    <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{f.label}</div>
                    <div className="font-medium mt-0.5" style={{ color: 'var(--text-primary)' }}>{f.value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Contact Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                {[
                  { label: 'Email', value: 'rajesh.k@devna.com' },
                  { label: 'Phone', value: '+91 98765 43210' },
                  { label: 'Emergency Contact', value: '+91 98765 43211' },
                  { label: 'Address', value: '123, Industrial Layout, Bangalore' },
                ].map((f, i) => (
                  <div key={i}>
                    <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{f.label}</div>
                    <div className="font-medium mt-0.5" style={{ color: 'var(--text-primary)' }}>{f.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'attendance' && (
        <div className="card p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Present (This Month)', value: '21 days', color: '#4CAF50' },
              { label: 'Absent', value: '1 day', color: '#1A78C2' },
              { label: 'Late Arrivals', value: '2 days', color: '#4CAF50' },
            ].map((s, i) => (
              <div key={i} className="card p-4 text-center">
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{s.label}</div>
                <div className="text-2xl font-bold mt-1" style={{ color: s.color }}>{s.value}</div>
              </div>
            ))}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="table-header">{['Date', 'Day', 'In-Time', 'Out-Time', 'Status'].map(h => <th key={h}>{h}</th>)}</tr></thead>
              <tbody>
                {[
                  { date: '10-06-2026', day: 'Mon', in: '08:55', out: '17:30', status: 'Present' },
                  { date: '09-06-2026', day: 'Sun', in: '-', out: '-', status: 'Week Off' },
                  { date: '08-06-2026', day: 'Sat', in: '09:10', out: '14:00', status: 'Present' },
                ].map((a, i) => (
                  <tr key={i} className="table-row">
                    <td className="px-4 py-3" style={{ color: 'var(--text-primary)' }}>{a.date}</td>
                    <td className="px-4 py-3" style={{ color: 'var(--text-secondary)' }}>{a.day}</td>
                    <td className="px-4 py-3" style={{ color: 'var(--text-secondary)' }}>{a.in}</td>
                    <td className="px-4 py-3" style={{ color: 'var(--text-secondary)' }}>{a.out}</td>
                    <td className="px-4 py-3"><span className={`badge ${a.status === 'Present' ? 'badge-success' : 'badge-info'}`}>{a.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'payslips' && (
        <div className="card p-6 space-y-4">
          {['June 2026', 'May 2026', 'April 2026'].map((m, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl transition-colors" style={{ background: 'var(--hover)' }}>
              <div>
                <div className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{m}</div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>₹62,000</div>
              </div>
              <button className="btn-primary text-xs"><FileText className="w-3.5 h-3.5" /> Download</button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'documents' && (
        <div className="card p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Offer Letter', type: 'PDF', size: '245 KB', date: '10-06-2026' },
              { name: 'Appointment Letter', type: 'PDF', size: '180 KB', date: '10-06-2026' },
              { name: 'Salary Certificate', type: 'PDF', size: '120 KB', date: '05-06-2026' },
              { name: 'Experience Letter', type: 'PDF', size: '150 KB', date: '01-06-2026' },
              { name: 'PF Statement', type: 'PDF', size: '320 KB', date: '28-05-2026' },
              { name: 'ID Card', type: 'Image', size: '85 KB', date: '15-03-2026' },
            ].map((doc, i) => (
              <div key={i} className="p-4 rounded-xl transition-colors" style={{ background: 'var(--hover)' }}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{doc.name}</div>
                    <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{doc.type} • {doc.size} • {doc.date}</div>
                  </div>
                  <button className="shrink-0 text-xs font-medium" style={{ color: 'var(--color-primary)' }}>View</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SelfService
