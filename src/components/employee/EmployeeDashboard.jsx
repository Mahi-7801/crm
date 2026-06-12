import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../lib/ThemeContext'
import { ArrowLeft, Clock, LogIn, LogOut, CheckCircle, Sun, Moon, Star, Timer, ShieldCheck, ArrowRight, User, Building2, Calendar, Sparkles, Zap, Play, Square, Mail, KeyRound, Eye, EyeOff, ChevronLeft, Users, Search, Filter, BarChart3, Activity, UserCheck, UserX, AlertTriangle, Download, FileSpreadsheet } from 'lucide-react'

const defaultEmployees = [
  { email: 'rajesh@devna.com', password: 'emp123', name: 'Rajesh Kumar', id: 'EMP001', dept: 'Production' },
  { email: 'priya@devna.com', password: 'emp123', name: 'Priya Sharma', id: 'EMP002', dept: 'HR' },
  { email: 'amit@devna.com', password: 'emp123', name: 'Amit Patel', id: 'EMP003', dept: 'Warehouse' },
  { email: 'sneha@devna.com', password: 'emp123', name: 'Sneha Reddy', id: 'EMP004', dept: 'Finance' },
  { email: 'vikram@devna.com', password: 'emp123', name: 'Vikram Singh', id: 'EMP005', dept: 'Warehouse' },
  { email: 'anita@devna.com', password: 'emp123', name: 'Anita Desai', id: 'EMP006', dept: 'Production' },
  { email: 'rohan@devna.com', password: 'emp123', name: 'Rohan Mehta', id: 'EMP007', dept: 'IT' },
  { email: 'deepa@devna.com', password: 'emp123', name: 'Deepa Joshi', id: 'EMP008', dept: 'Quality' },
]

const dailyLogs = [
  { date: '12-06-2026', name: 'Rajesh Kumar', id: 'EMP001', in: '08:55', out: '18:05', hours: '9h 10m', ot: '1h 10m', status: 'Present' },
  { date: '12-06-2026', name: 'Priya Sharma', id: 'EMP002', in: '09:15', out: '18:00', hours: '8h 45m', ot: '0h', status: 'Present' },
  { date: '12-06-2026', name: 'Amit Patel', id: 'EMP003', in: '08:30', out: '18:30', hours: '10h', ot: '2h', status: 'Present' },
  { date: '12-06-2026', name: 'Sneha Reddy', id: 'EMP004', in: '09:00', out: '17:30', hours: '8h 30m', ot: '0h', status: 'Present' },
  { date: '12-06-2026', name: 'Vikram Singh', id: 'EMP005', in: '--', out: '--', hours: '--', ot: '--', status: 'Absent' },
  { date: '12-06-2026', name: 'Anita Desai', id: 'EMP006', in: '08:45', out: '18:15', hours: '9h 30m', ot: '1h 30m', status: 'Present' },
  { date: '12-06-2026', name: 'Rohan Mehta', id: 'EMP007', in: '09:30', out: '18:00', hours: '8h 30m', ot: '0h', status: 'Late' },
  { date: '12-06-2026', name: 'Deepa Joshi', id: 'EMP008', in: '08:50', out: '18:10', hours: '9h 20m', ot: '1h 20m', status: 'Present' },
]

function getShift() {
  const h = new Date().getHours()
  if (h >= 6 && h < 14) return { name: 'Morning', icon: Sun, color: '#4CAF50', bg: 'rgba(76,175,80,0.12)', time: '06:00 - 14:00', gradient: 'linear-gradient(135deg, #4CAF50, #388E3C)' }
  if (h >= 14 && h < 22) return { name: 'Evening', icon: Star, color: 'var(--color-primary)', bg: 'color-mix(in srgb, var(--color-primary) 12%, transparent)', time: '14:00 - 22:00', gradient: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))' }
  return { name: 'Night', icon: Moon, color: '#1A78C2', bg: 'rgba(26,120,194,0.12)', time: '22:00 - 06:00', gradient: 'linear-gradient(135deg, #1A78C2, #0D4F7A)' }
}

function EmployeeDashboard() {
  const navigate = useNavigate()
  const { role } = useTheme()
  const isAdmin = role === 'super_admin' || role === 'hr_manager' || role === 'manager' || role === 'dept_manager'

  const [employeesData, setEmployeesData] = useState(() => {
    const saved = localStorage.getItem('hrms_employees')
    if (saved) {
      const parsed = JSON.parse(saved)
      return parsed.map(e => ({ ...e, password: e.password || 'emp123' }))
    }
    return defaultEmployees
  })
  const [step, setStep] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emp, setEmp] = useState(null)
  const [error, setError] = useState('')
  const [checkInTime, setCheckInTime] = useState(null)
  const [checkOutTime, setCheckOutTime] = useState(null)
  const [now, setNow] = useState(new Date())
  const [animIn, setAnimIn] = useState(false)
  const [adminView, setAdminView] = useState('list')
  const [selectedEmp, setSelectedEmp] = useState(null)
  const [showPasswords, setShowPasswords] = useState({})
  const [nameSearch, setNameSearch] = useState('')
  const [idSearch, setIdSearch] = useState('')
  const [deptFilter, setDeptFilter] = useState('')
  const [customDept, setCustomDept] = useState('')
  const [extraDepts, setExtraDepts] = useState([])

  useEffect(() => {
    const savedId = localStorage.getItem('current_emp_id')
    const sessionsStr = localStorage.getItem('emp_sessions')
    const sessions = sessionsStr ? JSON.parse(sessionsStr) : {}
    if (savedId && sessions[savedId]) {
      try {
        const foundEmp = employeesData.find(e => e.id === savedId)
        if (foundEmp) {
          setEmp(foundEmp)
          const s = sessions[savedId]
          if (s.checkInTime) setCheckInTime(new Date(s.checkInTime))
          if (s.checkOutTime) setCheckOutTime(new Date(s.checkOutTime))
          if (s.checkOutTime) setStep('completed')
          else if (s.checkInTime) setStep('working')
          else setStep('dashboard')
        }
      } catch {}
    }
    setTimeout(() => setAnimIn(true), 50)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => { setAnimIn(false); setTimeout(() => setAnimIn(true), 50) }, [step])

  const shift = getShift()
  const ShiftIcon = shift.icon

  const saveSession = (currentEmp, ci, co) => {
    if (!currentEmp) return
    const sessionsStr = localStorage.getItem('emp_sessions')
    const sessions = sessionsStr ? JSON.parse(sessionsStr) : {}
    sessions[currentEmp.id] = { checkInTime: ci?.toISOString() || null, checkOutTime: co?.toISOString() || null }
    localStorage.setItem('emp_sessions', JSON.stringify(sessions))
    localStorage.setItem('current_emp_id', currentEmp.id)
  }

  const handleLogin = (e) => {
    e.preventDefault(); setError('')
    const found = employeesData.find(e => e.email === email && e.password === password)
    if (!found) { setError('Invalid email or password'); return }
    setEmp(found)
    
    const sessionsStr = localStorage.getItem('emp_sessions')
    const sessions = sessionsStr ? JSON.parse(sessionsStr) : {}
    const s = sessions[found.id]
    
    if (s) {
      if (s.checkInTime) setCheckInTime(new Date(s.checkInTime))
      if (s.checkOutTime) setCheckOutTime(new Date(s.checkOutTime))
      localStorage.setItem('current_emp_id', found.id)
      if (s.checkOutTime) { setStep('completed'); return }
      if (s.checkInTime) { setStep('working'); return }
    }
    
    const ci = new Date(); setCheckInTime(ci); setStep('working'); saveSession(found, ci, null)
  }

  const handleCheckIn = () => {
    const ci = new Date(); setCheckInTime(ci); setStep('working'); saveSession(emp, ci, null)
  }

  const handleCheckOut = () => {
    const co = new Date(); setCheckOutTime(co); setStep('completed'); saveSession(emp, checkInTime, co)
  }

  const handleLogout = () => {
    saveSession(emp, checkInTime, checkOutTime)
    localStorage.removeItem('current_emp_id')
    setStep('login'); setEmail(''); setPassword(''); setEmp(null)
    setCheckInTime(null); setCheckOutTime(null);
    if (isAdmin) setAdminView('list')
  }

  const fmt = (d) => d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  const fmt12 = (d) => d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
  const fdate = (d) => d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric' })

  const elapsed = checkInTime ? Math.floor(((checkOutTime || now) - checkInTime) / 1000) : 0
  const hh = String(Math.floor(elapsed / 3600)).padStart(2, '0')
  const mm = String(Math.floor((elapsed % 3600) / 60)).padStart(2, '0')
  const ss = String(elapsed % 60).padStart(2, '0')

  const totalMin = Math.floor(elapsed / 60)
  const totalHrs = (elapsed / 3600).toFixed(1)

  if (isAdmin && (adminView === 'list' || selectedEmp)) {
    return (
      <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
        <div className="max-w-6xl mx-auto p-4 md:p-6">
          {selectedEmp ? (
            <AdminEmployeeDetail
              emp={selectedEmp}
              logs={dailyLogs.filter(l => l.id === selectedEmp.id)}
              onBack={() => setSelectedEmp(null)}
            />
          ) : (
            <AdminEmployeeList
              role={role}
              employees={employeesData}
              dailyLogs={dailyLogs}
              showPasswords={showPasswords}
              nameSearch={nameSearch}
              setNameSearch={setNameSearch}
              idSearch={idSearch}
              setIdSearch={setIdSearch}
              deptFilter={deptFilter}
              setDeptFilter={setDeptFilter}
              customDept={customDept}
              setCustomDept={setCustomDept}
              extraDepts={extraDepts}
              setExtraDepts={setExtraDepts}
              onTogglePassword={(email) => setShowPasswords(p => ({ ...p, [email]: !p[email] }))}
              onSelectEmployee={(emp) => setSelectedEmp(emp)}
              onLoginAsEmployee={(empToLogin) => {
                setEmp(empToLogin)
                let finalStep = 'working'
                let finalCi = new Date()
                let finalCo = null

                const sessionsStr = localStorage.getItem('emp_sessions')
                const sessions = sessionsStr ? JSON.parse(sessionsStr) : {}
                const s = sessions[empToLogin.id]

                if (s) {
                  if (s.checkInTime) { finalCi = new Date(s.checkInTime); setCheckInTime(finalCi) }
                  if (s.checkOutTime) { finalCo = new Date(s.checkOutTime); setCheckOutTime(finalCo) }
                  if (s.checkOutTime) finalStep = 'completed'
                  else if (s.checkInTime) finalStep = 'working'
                }

                setStep(finalStep)
                if (finalStep === 'working' && !finalCo) {
                  setCheckInTime(finalCi)
                  sessions[empToLogin.id] = { checkInTime: finalCi.toISOString(), checkOutTime: null }
                  localStorage.setItem('emp_sessions', JSON.stringify(sessions))
                }
                localStorage.setItem('current_emp_id', empToLogin.id)
                setAdminView('impersonate')
              }}
            />
          )}
        </div>
      </div>
    )
  }

  if (step === 'login') {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(135deg, #E3F0FA 0%, #E8F5E9 100%)' }}>
        <div className="w-full p-4 md:p-6" style={{ background: 'linear-gradient(135deg, #0D4F7A, #1A78C2)' }}>
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <HardHat className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-lg text-white">Employee Logings</div>
                <div className="text-xs text-white/70">Sign in to track your attendance</div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm">
              <ShiftIcon className="w-4 h-4" style={{ color: shift.color }} />
              <span className="text-white text-sm font-medium">{shift.name} Shift</span>
              <span className="text-white/60 text-xs">{shift.time}</span>
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-sm animate-slide-up">
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 text-sm p-3.5 rounded-2xl animate-fade-in"
                  style={{ background: 'color-mix(in srgb, var(--color-primary) 8%, transparent)', color: 'var(--color-primary-dark)', border: '1px solid color-mix(in srgb, var(--color-primary) 20%, transparent)' }}>
                  <ShieldCheck className="w-4 h-4 shrink-0" /> {error}
                </div>
              )}
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: '#64748b' }}>Employee Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl text-sm outline-none transition-all duration-200"
                  style={{ background: '#fff', border: '2px solid #e2e8f0', color: '#0f172a' }}
                  onFocus={e => e.target.style.borderColor = '#1A78C2'}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                  placeholder="you@devna.com" required />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: '#64748b' }}>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl text-sm outline-none transition-all duration-200"
                  style={{ background: '#fff', border: '2px solid #e2e8f0', color: '#0f172a' }}
                  onFocus={e => e.target.style.borderColor = '#1A78C2'}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                  placeholder="Enter your password" required />
              </div>
              <button type="submit"
                className="w-full py-3.5 rounded-2xl text-sm font-bold text-white transition-all duration-200 flex items-center justify-center gap-2"
                style={{ background: '#1A78C2' }}
                onMouseEnter={e => e.target.style.background = '#1565A3'}
                onMouseLeave={e => e.target.style.background = '#1A78C2'}>
                <LogIn className="w-4 h-4" /> Sign In
              </button>
            </form>
            <div className="mt-6 p-4 rounded-2xl text-center" style={{ background: '#E3F0FA' }}>
              <div className="text-xs font-semibold" style={{ color: '#1A78C2' }}>Demo Accounts</div>
              <div className="text-xs mt-1" style={{ color: '#64748b' }}>rajesh@devna.com / emp123</div>
              <div className="text-xs" style={{ color: '#64748b' }}>Password for all: emp123</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #f0fdf4 100%)' }}>
      <header className="fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-6 z-10"
        style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div className="flex items-center gap-3">
          {isAdmin && (
            <button onClick={() => setAdminView('list')} className="w-9 h-9 flex items-center justify-center rounded-xl transition-colors hover:bg-slate-100 mr-1" style={{ color: '#64748b' }} title="Back to Admin List">
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div className="w-8 h-8 flex items-center justify-center">
            <img src="/unnamed.webp" alt="Logo" className="w-full h-full object-contain scale-125" />
          </div>
          <span className="font-bold text-lg" style={{ color: '#0f172a' }}>Devna Engineers</span>
          {isAdmin && (
            <span className="ml-2 px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-700 uppercase tracking-widest" style={{ border: '1px solid rgba(217, 119, 6, 0.2)' }}>
              Impersonating
            </span>
          )}
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors hover:bg-slate-50"
          style={{ color: '#64748b', border: '1px solid #e2e8f0' }}>
          <LogOut className="w-4 h-4" /> Log Out
        </button>
      </header>

      <main className="flex-1 flex items-center justify-center p-6 pt-24">
        <div className={`w-full max-w-2xl transition-all duration-500 ${animIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-5 mb-8 p-5 rounded-3xl" style={{ background: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold shrink-0"
              style={{ background: shift.gradient, color: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
              {emp.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-xl" style={{ color: '#0f172a' }}>{emp.name}</div>
              <div className="flex items-center gap-3 text-sm mt-1 flex-wrap">
                <span className="flex items-center gap-1.5" style={{ color: '#64748b' }}><Building2 className="w-3.5 h-3.5" />{emp.dept}</span>
                <span style={{ color: '#cbd5e1' }}>|</span>
                <span style={{ color: '#94a3b8' }}>{emp.id}</span>
                <span style={{ color: '#cbd5e1' }}>|</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ background: shift.bg, color: shift.color }}>
                  <ShiftIcon className="w-3.5 h-3.5" /> {shift.name}
                </span>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12 rounded-3xl text-center relative overflow-hidden"
            style={{ background: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}>
            <div className="absolute top-0 left-0 right-0 h-1" style={{ background: shift.gradient }} />

            {step === 'dashboard' && (
              <div className="space-y-8 animate-scale-in">
                <div className="w-28 h-28 rounded-full mx-auto flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #E3F0FA 0%, #E8F5E9 100%)', boxShadow: '0 0 0 4px rgba(26,120,194,0.08)' }}>
                  <Play className="w-12 h-12" style={{ color: '#4CAF50' }} />
                </div>
                <div>
                  <h2 className="text-3xl font-bold" style={{ color: '#0f172a' }}>Ready to Start?</h2>
                  <p className="text-base mt-2" style={{ color: '#64748b' }}>Your {shift.name.toLowerCase()} shift begins now</p>
                </div>
                <button onClick={handleCheckIn}
                  className="inline-flex items-center gap-3 px-12 py-5 rounded-2xl text-lg font-bold text-white transition-all duration-300 shadow-xl"
                  style={{ background: 'linear-gradient(135deg, #4CAF50, #388E3C)' }}
                  onMouseEnter={e => { e.target.style.transform = 'scale(1.03) translateY(-2px)'; e.target.style.boxShadow = '0 12px 40px rgba(76,175,80,0.4)' }}
                  onMouseLeave={e => { e.target.style.transform = 'scale(1) translateY(0)'; e.target.style.boxShadow = '0 8px 30px rgba(76,175,80,0.3)' }}>
                  <LogIn className="w-6 h-6" /> Check In — Start Shift
                </button>
              </div>
            )}

            {step === 'working' && (
              <div className="space-y-8">
                <div className="flex items-center justify-center gap-2.5">
                  <span className="relative flex w-3 h-3">
                    <span className="animate-ping absolute inset-0 rounded-full" style={{ background: '#4CAF50' }} />
                    <span className="relative rounded-full w-3 h-3" style={{ background: '#4CAF50' }} />
                  </span>
                  <span className="text-sm font-semibold tracking-wide uppercase" style={{ color: '#4CAF50' }}>Working Now</span>
                </div>

                <div className="relative">
                  <div className="text-7xl md:text-8xl font-bold tracking-wider tabular-nums" style={{ color: '#0f172a', fontVariantNumeric: 'tabular-nums' }}>
                    {hh}:{mm}:{ss}
                  </div>
                  <div className="flex justify-center gap-8 mt-4 text-sm" style={{ color: '#94a3b8' }}>
                    <span>{totalMin} minutes</span>
                    <span>{totalHrs} hours</span>
                  </div>
                </div>

                <div className="flex justify-center gap-8">
                  <div className="text-center px-6 py-3 rounded-2xl" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                    <div className="text-xs font-medium" style={{ color: '#94a3b8' }}>Check In</div>
                    <div className="text-lg font-bold mt-0.5" style={{ color: '#0f172a' }}>{fmt12(checkInTime)}</div>
                  </div>
                  <div className="text-center px-6 py-3 rounded-2xl" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <div className="text-xs font-medium" style={{ color: '#94a3b8' }}>Expected Out</div>
                    <div className="text-lg font-bold mt-0.5" style={{ color: '#0f172a' }}>
                      {shift.name === 'Morning' ? '02:00 PM' : shift.name === 'Evening' ? '10:00 PM' : '06:00 AM'}
                    </div>
                  </div>
                </div>

                <button onClick={handleCheckOut}
                  className="inline-flex items-center gap-3 px-12 py-5 rounded-2xl text-lg font-bold text-white transition-all duration-300 shadow-xl"
                  style={{ background: 'linear-gradient(135deg, #1A78C2, #0D4F7A)' }}
                  onMouseEnter={e => { e.target.style.transform = 'scale(1.03) translateY(-2px)'; e.target.style.boxShadow = '0 12px 40px rgba(26,120,194,0.4)' }}
                  onMouseLeave={e => { e.target.style.transform = 'scale(1) translateY(0)'; e.target.style.boxShadow = '0 8px 30px rgba(26,120,194,0.3)' }}>
                  <Square className="w-6 h-6" /> Check Out — End Shift
                </button>
              </div>
            )}

            {step === 'completed' && (
              <div className="space-y-8">
                <div className="w-28 h-28 rounded-full mx-auto flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)', boxShadow: '0 0 0 4px rgba(76,175,80,0.12)' }}>
                  <CheckCircle className="w-14 h-14" style={{ color: '#4CAF50' }} />
                </div>

                <div>
                  <h2 className="text-2xl font-bold" style={{ color: '#0D4F7A' }}>Shift Completed</h2>
                  <p className="text-sm mt-1" style={{ color: '#64748b' }}>Today's attendance recorded successfully</p>
                </div>

                <div className="relative py-4">
                  <div className="text-7xl md:text-8xl font-bold tracking-wider tabular-nums" style={{ color: '#0f172a', fontVariantNumeric: 'tabular-nums' }}>
                    {hh}:{mm}:{ss}
                  </div>
                  <div className="flex justify-center gap-6 mt-3">
                    <div className="px-4 py-2 rounded-xl" style={{ background: '#f0fdf4' }}>
                      <span className="text-sm font-semibold" style={{ color: '#4CAF50' }}>{totalMin} min</span>
                    </div>
                    <div className="px-4 py-2 rounded-xl" style={{ background: '#E3F0FA' }}>
                      <span className="text-sm font-semibold" style={{ color: '#1A78C2' }}>{totalHrs} hrs</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center gap-6">
                  <div className="text-center px-6 py-4 rounded-2xl" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', minWidth: 140 }}>
                    <div className="text-xs font-medium" style={{ color: '#94a3b8' }}>Check In</div>
                    <div className="text-lg font-bold mt-0.5 flex items-center justify-center gap-2" style={{ color: '#0f172a' }}>
                      <LogIn className="w-4 h-4" style={{ color: '#4CAF50' }} /> {fmt12(checkInTime)}
                    </div>
                  </div>
                  <div className="text-center px-6 py-4 rounded-2xl" style={{ background: 'color-mix(in srgb, var(--color-primary) 8%, transparent)', border: '1px solid color-mix(in srgb, var(--color-primary) 20%, transparent)', minWidth: 140 }}>
                    <div className="text-xs font-medium" style={{ color: '#94a3b8' }}>Check Out</div>
                    <div className="text-lg font-bold mt-0.5 flex items-center justify-center gap-2" style={{ color: '#0f172a' }}>
                      <LogOut className="w-4 h-4" style={{ color: 'var(--color-primary)' }} /> {fmt12(checkOutTime)}
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button onClick={handleLogout}
                    className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold text-white transition-all duration-300 shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #1A78C2, #1565A3)' }}
                    onMouseEnter={e => { e.target.style.transform = 'scale(1.02) translateY(-2px)'; e.target.style.boxShadow = '0 12px 30px rgba(26,120,194,0.35)' }}
                    onMouseLeave={e => { e.target.style.transform = 'scale(1) translateY(0)'; e.target.style.boxShadow = '0 8px 20px rgba(26,120,194,0.25)' }}>
                    <ArrowRight className="w-5 h-5" /> Done — Log Out
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-5 p-4 rounded-2xl flex items-center gap-3 animate-fade-in"
            style={{ background: 'rgba(26,120,194,0.06)', border: '1px solid rgba(26,120,194,0.15)' }}>
            <Timer className="w-5 h-5" style={{ color: '#1A78C2' }} />
            <div className="flex-1 text-sm" style={{ color: '#64748b' }}>
              Session saved — you can safely close this page. Your time continues tracking even after logout.
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function AdminEmployeeList({ role, employees, dailyLogs, showPasswords, nameSearch, setNameSearch, idSearch, setIdSearch, deptFilter, setDeptFilter, customDept, setCustomDept, extraDepts, setExtraDepts, onTogglePassword, onSelectEmployee, onLoginAsEmployee }) {
  const navigate = useNavigate()
  const departments = [...new Set([...employees.map(e => e.dept), ...extraDepts])]
  const isSuperAdmin = role === 'super_admin'
  const presentToday = dailyLogs.filter(l => l.status === 'Present').length
  const absentToday = dailyLogs.filter(l => l.status === 'Absent').length
  const lateToday = dailyLogs.filter(l => l.status === 'Late').length
  const stats = [
    { label: 'Total Employees', value: employees.length, icon: Users, color: '#1A78C2' },
    { label: 'Present Today', value: presentToday, icon: UserCheck, color: '#4CAF50' },
    { label: 'Absent', value: absentToday, icon: UserX, color: '#f87171' },
    { label: 'Late', value: lateToday, icon: AlertTriangle, color: '#f59e0b' },
  ]

  const filtered = employees.filter(e =>
    (e.name.toLowerCase().includes(nameSearch.toLowerCase())) &&
    (e.id.toLowerCase().includes(idSearch.toLowerCase())) &&
    (!deptFilter || e.dept === deptFilter)
  )

  const exportToExcel = () => {
    const header = ['Employee ID', 'Name', 'Department', 'Email', 'Password']
    const rows = employees.map(e => [e.id, e.name, e.dept, e.email, e.password])
    const csv = [header.join(','), ...rows.map(r => r.join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `devna_employees_${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const exportMonthlyReport = () => {
    const header = ['Date', 'Employee ID', 'Name', 'Department', 'Check In', 'Check Out', 'Working Hours', 'Overtime', 'Status']
    const rows = dailyLogs.map(l => [l.date, l.id, l.name, employees.find(e => e.id === l.id)?.dept || '', l.in, l.out, l.hours, l.ot, l.status])
    const csv = [header.join(','), ...rows.map(r => r.join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `devna_monthly_report_${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/app/dashboard')} className="w-9 h-9 flex items-center justify-center rounded-xl transition-colors hover:bg-slate-200" style={{ color: 'var(--text-secondary)' }} title="Back to Dashboard">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Employee Dashboard</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>View all employee credentials and daily attendance logs.</p>
          </div>
        </div>
        {isSuperAdmin && (
          <div className="flex gap-2">
            <button onClick={exportToExcel}
              className="btn-secondary text-xs py-2 px-3">
              <Download className="w-3.5 h-3.5" /> Export Credentials
            </button>
            <button onClick={exportMonthlyReport}
              className="btn-primary text-xs py-2 px-3"
              style={{ background: 'linear-gradient(135deg, #4CAF50, #388E3C)' }}>
              <FileSpreadsheet className="w-3.5 h-3.5" /> Monthly Report
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((s, i) => (
          <div key={i} className="card p-4 flex items-center gap-3 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: `color-mix(in srgb, ${s.color} 12%, transparent)` }}>
              <s.icon className="w-5 h-5" style={{ color: s.color }} />
            </div>
            <div>
              <div className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{s.value}</div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{s.label}</div>
            </div>
          </div>
        ))}
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
            <button onClick={() => { if (customDept.trim() && !extraDepts.includes(customDept.trim())) { setExtraDepts([...extraDepts, customDept.trim()]); setCustomDept('') } }}
              className="btn-primary text-xs py-2 px-3 whitespace-nowrap">+ Add</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="table-header">
                <th>Employee</th>
                <th>ID</th>
                <th>Department</th>
                <th>Email</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((emp, i) => (
                <tr key={emp.email} className="table-row cursor-pointer" onClick={() => onSelectEmployee(emp)}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                        style={{ background: 'linear-gradient(135deg, #1A78C2, #0D4F7A)', color: '#fff' }}>
                        {emp.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="font-medium" style={{ color: 'var(--text-primary)' }}>{emp.name}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--text-secondary)' }}>{emp.id}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        background: emp.dept === 'Production' ? 'rgba(26,120,194,0.1)' :
                          emp.dept === 'HR' ? 'rgba(76,175,80,0.1)' :
                            emp.dept === 'Warehouse' ? 'rgba(245,158,11,0.1)' :
                              emp.dept === 'Finance' ? 'rgba(16,185,129,0.1)' :
                                emp.dept === 'IT' ? 'rgba(139,92,246,0.1)' : 'rgba(236,72,153,0.1)',
                        color: emp.dept === 'Production' ? '#1A78C2' :
                          emp.dept === 'HR' ? '#4CAF50' :
                            emp.dept === 'Warehouse' ? '#d97706' :
                              emp.dept === 'Finance' ? '#059669' :
                                emp.dept === 'IT' ? '#7c3aed' : '#db2777',
                      }}>
                      <Building2 className="w-3 h-3" />
                      {emp.dept}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
                      <Mail className="w-3.5 h-3.5 shrink-0" />
                      <span className="text-xs">{emp.email}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
                      <KeyRound className="w-3.5 h-3.5 shrink-0" />
                      <span className="font-mono text-xs">{showPasswords[emp.email] ? emp.password : '••••••'}</span>
                      <button onClick={(e) => { e.stopPropagation(); onTogglePassword(emp.email) }}
                        className="p-1 rounded hover:bg-gray-100 transition-colors">
                        {showPasswords[emp.email] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <button onClick={(e) => { e.stopPropagation(); onSelectEmployee(emp) }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                        style={{ background: 'color-mix(in srgb, var(--color-primary) 10%, transparent)', color: 'var(--color-primary)' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'color-mix(in srgb, var(--color-primary) 20%, transparent)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'color-mix(in srgb, var(--color-primary) 10%, transparent)'}>
                        <BarChart3 className="w-3.5 h-3.5" /> Logs
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); onLoginAsEmployee(emp) }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all"
                        style={{ background: 'linear-gradient(135deg, #4CAF50, #388E3C)' }}
                        onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 12px rgba(76,175,80,0.3)'; e.currentTarget.style.transform = 'scale(1.02)' }}
                        onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'scale(1)' }}>
                        <LogIn className="w-3.5 h-3.5" /> Login
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12" style={{ color: 'var(--text-muted)' }}>
            <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm font-medium">No employees found</p>
            <p className="text-xs mt-1">Try adjusting your search or filter criteria</p>
          </div>
        )}

        <div className="px-4 py-3 flex items-center justify-between text-xs" style={{ borderTop: '1px solid var(--border)', color: 'var(--text-muted)' }}>
          <span>Showing {filtered.length} of {employees.length} employees</span>
        </div>
      </div>
    </div>
  )
}

function AdminEmployeeDetail({ emp, logs, onBack }) {
  const present = logs.filter(l => l.status === 'Present').length
  const absent = logs.filter(l => l.status === 'Absent').length
  const late = logs.filter(l => l.status === 'Late').length
  const totalHrs = logs.reduce((acc, l) => acc + (parseInt(l.hours) || 0), 0)
  const totalOt = logs.reduce((acc, l) => acc + (parseInt(l.ot) || 0), 0)

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center gap-4">
        <button onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-xl transition-colors"
          style={{ color: 'var(--text-secondary)' }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--hover)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold"
            style={{ background: 'linear-gradient(135deg, #1A78C2, #0D4F7A)', color: '#fff' }}>
            {emp.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{emp.name}</h1>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{emp.id} · {emp.dept} · {emp.email}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { label: 'Present', value: present, color: '#4CAF50', icon: UserCheck },
          { label: 'Absent', value: absent, color: '#f87171', icon: UserX },
          { label: 'Late', value: late, color: '#f59e0b', icon: AlertTriangle },
          { label: 'Total Hours', value: totalHrs + 'h', color: '#1A78C2', icon: Clock },
          { label: 'Overtime', value: totalOt + 'h', color: '#7c3aed', icon: Activity },
        ].map((s, i) => (
          <div key={i} className="card p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: `color-mix(in srgb, ${s.color} 12%, transparent)` }}>
              <s.icon className="w-4.5 h-4.5" style={{ color: s.color }} />
            </div>
            <div>
              <div className="text-lg font-bold" style={{ color: s.color }}>{s.value}</div>
              <div className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="card overflow-hidden">
        <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)' }}>
          <h3 className="text-sm font-semibold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <Clock className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
            Daily Attendance Log
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="table-header"><th>Date</th><th>Check In</th><th>Check Out</th><th>Working Hours</th><th>Overtime</th><th>Status</th></tr></thead>
            <tbody>
              {logs.map((log, i) => (
                <tr key={i} className="table-row">
                  <td className="px-4 py-3 font-medium" style={{ color: 'var(--text-primary)' }}>{log.date}</td>
                  <td className="px-4 py-3 font-mono text-xs" style={{ color: log.in === '--' ? 'var(--text-muted)' : 'var(--text-secondary)' }}>{log.in}</td>
                  <td className="px-4 py-3 font-mono text-xs" style={{ color: log.out === '--' ? 'var(--text-muted)' : 'var(--text-secondary)' }}>{log.out}</td>
                  <td className="px-4 py-3 font-medium" style={{ color: 'var(--color-primary)' }}>{log.hours}</td>
                  <td className="px-4 py-3" style={{ color: log.ot === '0h' ? 'var(--text-muted)' : '#4CAF50' }}>{log.ot}</td>
                  <td className="px-4 py-3">
                    <span className={`badge ${log.status === 'Present' ? 'badge-success' : log.status === 'Absent' ? 'badge-danger' : 'badge-warning'}`}>
                      {log.status === 'Present' ? <UserCheck className="w-3 h-3" /> : log.status === 'Absent' ? <UserX className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {logs.length === 0 && (
          <div className="text-center py-10" style={{ color: 'var(--text-muted)' }}>
            <Clock className="w-10 h-10 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No attendance logs found</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default EmployeeDashboard
