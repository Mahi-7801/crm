import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, Upload, User, Briefcase, Landmark, FileText, CheckCircle } from 'lucide-react'
import { useTheme } from '../../lib/ThemeContext'

const defaultDepartments = ['Production', 'HR', 'Finance', 'IT', 'Warehouse', 'Quality', 'Admin']
const designations = ['Team Lead', 'HR Manager', 'Operator', 'Accountant', 'Store Keeper', 'Supervisor', 'System Admin', 'QC Inspector', 'Manager', 'Executive']

const tabs = [
  { id: 'personal', label: 'Personal & Professional', icon: User },
  { id: 'bank', label: 'Bank & Statutory', icon: Landmark },
  { id: 'documents', label: 'Documents', icon: FileText },
]

function EmployeeForm() {
  const { role } = useTheme()
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)
  const [activeTab, setActiveTab] = useState('personal')
  const [form, setForm] = useState({ name: '', email: '', phone: '', dept: '', designation: '', doj: '', bankName: '', bankAcc: '', ifsc: '', uan: '', esic: '', address: '' })

  const savedDepts = localStorage.getItem('extra_departments')
  const extraDepts = savedDepts ? JSON.parse(savedDepts) : []
  const departments = [...defaultDepartments, ...extraDepts]
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = (e) => { e.preventDefault(); navigate('/app/employees') }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/app/employees')} className="w-9 h-9 flex items-center justify-center rounded-xl" style={{ color: 'var(--text-secondary)' }}>
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{isEdit ? 'Edit Employee' : 'Add New Employee'}</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>{isEdit ? 'Update employee information' : 'Register a new employee in the system'}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card">
          <div className="flex overflow-x-auto p-1 gap-1" style={{ borderBottom: '1px solid var(--border)' }}>
            {tabs.map(tab => {
              if (tab.id === 'bank' && role !== 'super_admin') return null;
              const Icon = tab.icon
              return (
                <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)} className={`tab-btn whitespace-nowrap ${activeTab === tab.id ? 'active' : ''}`}>
                  <Icon className="w-4 h-4 inline mr-1.5" />{tab.label}
                </button>
              )
            })}
          </div>

          {activeTab === 'personal' && (
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[{ name: 'name', label: 'Full Name', req: true }, { name: 'email', label: 'Email', req: true, type: 'email' }, { name: 'phone', label: 'Phone', req: true }, { name: 'dept', label: 'Department', req: true, select: true, opts: departments }, { name: 'designation', label: 'Designation', select: true, opts: designations }, { name: 'doj', label: 'Date of Joining', type: 'date' }].map(f => (
                  <div key={f.name}>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>{f.label}{f.req && <span className="text-danger ml-0.5">*</span>}</label>
                    {f.select ? (
                      <select name={f.name} value={form[f.name]} onChange={handleChange} className="input-field" required={f.req}>
                        <option value="">Select {f.label}</option>
                        {f.opts.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    ) : (
                      <input name={f.name} type={f.type || 'text'} value={form[f.name]} onChange={handleChange} className="input-field" required={f.req} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'bank' && (
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[{ name: 'bankName', label: 'Bank Name' }, { name: 'bankAcc', label: 'Account Number' }, { name: 'ifsc', label: 'IFSC Code' }, { name: 'uan', label: 'UAN Number' }, { name: 'esic', label: 'ESIC Number' }].map(f => (
                  <div key={f.name}>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>{f.label}</label>
                    <input name={f.name} value={form[f.name]} onChange={handleChange} className="input-field" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>Address</label>
                <textarea name="address" value={form.address} onChange={handleChange} rows={3} className="input-field resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Upload Documents</label>
                <div className="border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all" style={{ borderColor: 'var(--border)' }}>
                  <Upload className="w-10 h-10 mx-auto" style={{ color: 'var(--text-muted)' }} />
                  <p className="text-sm mt-3" style={{ color: 'var(--text-secondary)' }}>Drop files here or <span className="font-medium" style={{ color: 'var(--color-primary)' }}>browse</span></p>
                  <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>PDF, JPG, PNG up to 10MB</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <button type="button" onClick={() => navigate('/app/employees')} className="btn-secondary">Cancel</button>
          <button type="submit" className="btn-primary"><Save className="w-4 h-4" /> {isEdit ? 'Update Employee' : 'Save Employee'}</button>
        </div>
      </form>
    </div>
  )
}

export default EmployeeForm
