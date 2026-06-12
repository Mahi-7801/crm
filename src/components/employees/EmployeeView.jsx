import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Edit2, User, Briefcase, Landmark, Phone, FileText, Package, Clock, DollarSign, Mail, MapPin, Calendar, Building, Shield, CheckCircle, ChevronRight, CalendarDays, Sun, Moon, Star } from 'lucide-react'
import { useTheme } from '../../lib/ThemeContext'

const emp = {
  id: 'EMP001', name: 'Rajesh Kumar', email: 'rajesh@devna.com', phone: '9876543210', emergency: 'Sita Kumar - 9876543000',
  dept: 'Production', designation: 'Team Lead', doj: '01-01-2024', status: 'Active', probation: '3 months',
  bankName: 'State Bank of India', bankAcc: 'XXXXXXXX1234', ifsc: 'SBIN0012345', uan: '123456789012', esic: 'ESIC1234567',
  address: '123, Industrial Area, Phase 2, Bangalore - 560001',
  shift: 'Morning', monthlyHours: 176, perDay: 2045, otHours: 18, otAmount: 2700, basic: 45000, workingDays: 22,
  assets: [{ name: 'Safety Helmet', code: 'AST001', date: '01-01-2024', status: 'Allocated' }, { name: 'Work Gloves', code: 'AST002', date: '01-01-2024', status: 'Allocated' }],
  attendance: [{ month: 'May 2026', present: 24, absent: 2, late: 1 }, { month: 'Jun 2026', present: 10, absent: 1, late: 0 }],
  payroll: [{ month: 'May 2026', gross: 61200, net: 57700 }, { month: 'Jun 2026', gross: 61200, net: 57700 }],
}

const profileTabs = [
  { id: 'personal', label: 'Personal', icon: User },
  { id: 'professional', label: 'Professional', icon: Briefcase },
  { id: 'bank', label: 'Bank & Statutory', icon: Landmark, roleLimit: 'super_admin' },
  { id: 'emergency', label: 'Emergency', icon: Phone },
  { id: 'documents', label: 'Documents', icon: FileText },
  { id: 'salary', label: 'Salary', icon: DollarSign, roleLimit: 'super_admin' },
  { id: 'assets', label: 'Assets', icon: Package },
  { id: 'attendance', label: 'Attendance', icon: Clock },
  { id: 'payroll', label: 'Payroll', icon: FileText, roleLimit: 'super_admin' },
]

function EmployeeView() {
  const { role } = useTheme()
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('personal')
  const [perDay, setPerDay] = useState(emp.perDay)
  const [otAmount, setOtAmount] = useState(emp.otAmount)
  const calculatedBasic = perDay * emp.workingDays
  const grossPayable = calculatedBasic + otAmount

  const visibleTabs = profileTabs.filter(t => !t.roleLimit || role === t.roleLimit)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/app/employees')} className="w-9 h-9 flex items-center justify-center rounded-xl transition-colors" style={{ color: 'var(--text-secondary)' }}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{emp.name}</h1>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{emp.id} · {emp.dept} · {emp.designation}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <span className={`badge ${emp.status === 'Active' ? 'badge-success' : 'badge-neutral'}`}>{emp.status}</span>
          <button onClick={() => navigate(`/app/employees/${id}/edit`)} className="btn-secondary text-xs">
            <Edit2 className="w-4 h-4" /> Edit
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="card p-6 text-center">
            <div className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold mx-auto" style={{ background: 'color-mix(in srgb, var(--color-primary) 12%, transparent)', color: 'var(--color-primary)' }}>
              {emp.name.split(' ').map(n => n[0]).join('')}
            </div>
            <h2 className="text-lg font-semibold mt-4" style={{ color: 'var(--text-primary)' }}>{emp.name}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>{emp.designation}</p>
            <div className="mt-4 space-y-2.5 text-sm text-left">
              {[
                { icon: Mail, value: emp.email },
                { icon: Phone, value: emp.phone },
                { icon: MapPin, value: emp.address },
                { icon: Calendar, value: `Joined ${emp.doj}` },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <item.icon className="w-4 h-4 shrink-0" style={{ color: 'var(--text-muted)' }} />
                  <span style={{ color: 'var(--text-secondary)' }} className="truncate">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-4 mt-4">
            <div className="text-xs font-semibold mb-3" style={{ color: 'var(--text-muted)' }}>QUICK LINKS</div>
            {role === 'super_admin' && (
              <button className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm mb-0.5 transition-colors"
                style={{ color: 'var(--text-secondary)' }}>
                <DollarSign className="w-4 h-4" /> View Payslips <ChevronRight className="w-3.5 h-3.5 ml-auto" />
              </button>
            )}
            {[
              { label: 'Request Leave', icon: CalendarDays },
              { label: 'Attendance Log', icon: Clock },
            ].map((link, i) => {
              const Icon = link.icon
              return (
                <button key={i} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm mb-0.5 transition-colors"
                  style={{ color: 'var(--text-secondary)' }}>
                  <Icon className="w-4 h-4" /> {link.label} <ChevronRight className="w-3.5 h-3.5 ml-auto" />
                </button>
              )
            })}
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="card">
            <div className="flex flex-wrap p-1 gap-1" style={{ borderBottom: '1px solid var(--border)' }}>
              {visibleTabs.map(tab => {
                const Icon = tab.icon
                return (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className={`tab-btn whitespace-nowrap ${activeTab === tab.id ? 'active' : ''}`}>
                    <Icon className="w-4 h-4 inline mr-1.5" />{tab.label}
                  </button>
                )
              })}
            </div>

            <div className="p-6 animate-fade-in">
              {activeTab === 'personal' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: 'Full Name', value: emp.name },
                    { label: 'Email Address', value: emp.email },
                    { label: 'Phone Number', value: emp.phone },
                    { label: 'Date of Birth', value: '15-08-1990' },
                    { label: 'Gender', value: 'Male' },
                    { label: 'Blood Group', value: 'O+' },
                    { label: 'Marital Status', value: 'Married' },
                    { label: 'Address', value: emp.address, full: true },
                  ].map((f, i) => (
                    <div key={i} className={f.full ? 'md:col-span-2' : ''}>
                      <label className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>{f.label}</label>
                      <p className="text-sm mt-0.5 font-medium" style={{ color: 'var(--text-primary)' }}>{f.value}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'professional' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: 'Employee ID', value: emp.id },
                    { label: 'Department', value: emp.dept },
                    { label: 'Designation', value: emp.designation },
                    { label: 'Date of Joining', value: emp.doj },
                    { label: 'Probation Period', value: emp.probation },
                    { label: 'Employment Type', value: 'Permanent' },
                    { label: 'Reporting Manager', value: 'Priya Sharma' },
                    { label: 'Work Location', value: 'Bangalore HQ' },
                  ].map((f, i) => (
                    <div key={i}>
                      <label className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>{f.label}</label>
                      <p className="text-sm mt-0.5 font-medium" style={{ color: 'var(--text-primary)' }}>{f.value}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'bank' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: 'Bank Name', value: emp.bankName },
                    { label: 'Account Number', value: emp.bankAcc },
                    { label: 'IFSC Code', value: emp.ifsc },
                    { label: 'UAN Number', value: emp.uan },
                    { label: 'ESIC Number', value: emp.esic },
                    { label: 'PAN Card', value: 'ABCDE1234F' },
                  ].map((f, i) => (
                    <div key={i}>
                      <label className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>{f.label}</label>
                      <p className="text-sm mt-0.5 font-medium" style={{ color: 'var(--text-primary)' }}>{f.value}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'emergency' && (
                <div>
                  {[
                    { name: 'Sita Kumar', relation: 'Spouse', phone: '9876543000' },
                    { name: 'Rahul Kumar', relation: 'Brother', phone: '9876543111' },
                  ].map((c, i) => (
                    <div key={i} className="card p-4 mb-3 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--hover)' }}>
                        <Phone className="w-5 h-5" style={{ color: 'var(--text-muted)' }} />
                      </div>
                      <div>
                        <div className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{c.name}</div>
                        <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{c.relation} · {c.phone}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'documents' && (
                <div>
                  {[
                    { name: 'Aadhar Card', file: 'aadhar_emp001.pdf', size: '2.4 MB' },
                    { name: 'PAN Card', file: 'pan_emp001.pdf', size: '1.1 MB' },
                    { name: 'Offer Letter', file: 'offer_emp001.pdf', size: '0.8 MB' },
                  ].map((d, i) => (
                    <div key={i} className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid var(--border)' }}>
                      <div className="flex items-center gap-3">
                        <FileText className="w-8 h-8" style={{ color: 'var(--color-primary)' }} />
                        <div>
                          <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{d.name}</div>
                          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{d.file} · {d.size}</div>
                        </div>
                      </div>
                      <button className="btn-secondary text-xs py-1.5 px-3">Download</button>
                    </div>
                  ))}
                </div>
              )}


              {activeTab === 'assets' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="table-header"><th>Asset</th><th>Code</th><th>Issue Date</th><th>Status</th></tr></thead>
                    <tbody>
                      {emp.assets.map((a, i) => (
                        <tr key={i} className="table-row">
                          <td className="px-4 py-3 font-medium" style={{ color: 'var(--text-primary)' }}>{a.name}</td>
                          <td className="px-4 py-3" style={{ color: 'var(--text-secondary)' }}>{a.code}</td>
                          <td className="px-4 py-3" style={{ color: 'var(--text-secondary)' }}>{a.date}</td>
                          <td className="px-4 py-3"><span className="badge badge-success">{a.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'attendance' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="table-header"><th>Month</th><th>Present</th><th>Absent</th><th>Late</th><th>Attendance %</th></tr></thead>
                    <tbody>
                      {emp.attendance.map((a, i) => (
                        <tr key={i} className="table-row">
                          <td className="px-4 py-3 font-medium" style={{ color: 'var(--text-primary)' }}>{a.month}</td>
                          <td className="px-4 py-3" style={{ color: '#4CAF50' }}>{a.present}</td>
                          <td className="px-4 py-3" style={{ color: '#1A78C2' }}>{a.absent}</td>
                          <td className="px-4 py-3" style={{ color: '#4CAF50' }}>{a.late}</td>
                          <td className="px-4 py-3 font-medium" style={{ color: 'var(--text-primary)' }}>{Math.round(a.present / (a.present + a.absent + a.late) * 100)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'salary' && role === 'super_admin' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="card p-5 space-y-4" style={{ border: '1px solid var(--border)' }}>
                    <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Salary Overview</h3>
                    <div className="flex items-center justify-between text-sm py-1.5" style={{ borderBottom: '1px solid var(--border)' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Employee ID</span>
                      <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{emp.id}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm py-1.5" style={{ borderBottom: '1px solid var(--border)' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Working Days / Month</span>
                      <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{emp.workingDays} days</span>
                    </div>
                    <div className="flex items-center justify-between text-sm py-1.5" style={{ borderBottom: '1px solid var(--border)' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Per Day Rate (₹)</span>
                      <input type="number" value={perDay} onChange={e => setPerDay(Number(e.target.value))}
                        className="w-full max-w-28 text-right px-3 py-1.5 rounded-lg text-sm font-medium"
                        style={{ border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-primary)' }} />
                    </div>
                    <div className="flex items-center justify-between text-sm py-1.5" style={{ borderBottom: '1px solid var(--border)' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Basic Salary</span>
                      <span className="text-lg font-bold" style={{ color: '#1A78C2' }}>₹{calculatedBasic.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm py-1.5" style={{ borderBottom: '1px solid var(--border)' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Monthly Working Hours</span>
                      <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{emp.monthlyHours} hrs</span>
                    </div>
                    <div className="flex items-center justify-between text-sm py-1.5">
                      <span style={{ color: 'var(--text-muted)' }}>Shift</span>
                      <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{emp.shift}</span>
                    </div>
                  </div>
                  <div className="card p-5 space-y-4" style={{ border: '1px solid var(--border)' }}>
                    <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Overtime & Earnings</h3>
                    <div className="flex items-center justify-between text-sm py-1.5" style={{ borderBottom: '1px solid var(--border)' }}>
                      <span style={{ color: 'var(--text-muted)' }}>OT Hours (This Month)</span>
                      <span className="font-medium" style={{ color: '#4CAF50' }}>{emp.otHours} hrs</span>
                    </div>
                    <div className="flex items-center justify-between text-sm py-1.5" style={{ borderBottom: '1px solid var(--border)' }}>
                      <span style={{ color: 'var(--text-muted)' }}>OT Amount (₹)</span>
                      <input type="number" value={otAmount} onChange={e => setOtAmount(Number(e.target.value))}
                        className="w-full max-w-28 text-right px-3 py-1.5 rounded-lg text-sm font-medium"
                        style={{ border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-primary)' }} />
                    </div>
                    <div className="flex items-center justify-between text-sm py-3" style={{ borderBottom: '1px solid var(--border)' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Gross Payable</span>
                      <span className="text-lg font-bold" style={{ color: '#4CAF50' }}>₹{grossPayable.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      {emp.shift === 'Morning' ? <Sun className="w-4 h-4" style={{ color: '#4CAF50' }} /> :
                       emp.shift === 'Evening' ? <Star className="w-4 h-4" style={{ color: '#1A78C2' }} /> :
                       <Moon className="w-4 h-4" style={{ color: '#1A78C2' }} />}
                      <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{emp.shift} Shift</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'payroll' && role === 'super_admin' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="table-header"><th>Month</th><th>Gross</th><th>Net Pay</th><th>Actions</th></tr></thead>
                    <tbody>
                      {emp.payroll.map((p, i) => (
                        <tr key={i} className="table-row">
                          <td className="px-4 py-3 font-medium" style={{ color: 'var(--text-primary)' }}>{p.month}</td>
                          <td className="px-4 py-3" style={{ color: 'var(--text-secondary)' }}>₹{p.gross.toLocaleString()}</td>
                          <td className="px-4 py-3 font-medium" style={{ color: '#4CAF50' }}>₹{p.net.toLocaleString()}</td>
                          <td className="px-4 py-3"><button className="btn-secondary text-xs py-1.5 px-3">Payslip</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeView
