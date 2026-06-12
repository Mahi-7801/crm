import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Check, ChevronRight, Upload, User, Briefcase, Landmark, FileText, Package, ThumbsUp } from 'lucide-react'

const steps = [
  { id: 1, label: 'Personal Info', icon: User },
  { id: 2, label: 'Employment', icon: Briefcase },
  { id: 3, label: 'Bank Details', icon: Landmark },
  { id: 4, label: 'Documents', icon: FileText },
  { id: 5, label: 'Asset Allocation', icon: Package },
  { id: 6, label: 'Final Approval', icon: ThumbsUp },
]

function Onboarding() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/app/employees')} className="w-9 h-9 flex items-center justify-center rounded-xl" style={{ color: 'var(--text-secondary)' }}>
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Employee Onboarding</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>Multi-step employee registration wizard</p>
        </div>
      </div>

      <div className="step-indicator overflow-x-auto p-4 card">
        {steps.map((s, i) => (
          <div key={s.id} className="flex items-center">
            <div className={`step ${step === s.id ? 'active' : ''} ${step > s.id ? 'completed' : ''}`}>
              <div className="step-number">{step > s.id ? <Check className="w-3.5 h-3.5" /> : s.id}</div>
              <span className="hidden sm:inline text-xs">{s.label}</span>
            </div>
            {i < steps.length - 1 && <div className={`step-connector ${step > s.id ? 'completed' : ''} ${step === s.id + 1 ? 'active' : ''}`} />}
          </div>
        ))}
      </div>

      <div className="card p-6 animate-fade-in">
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-base font-semibold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}><User className="w-5 h-5 text-primary" /> Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[{ label: 'Full Name' }, { label: 'Email', type: 'email' }, { label: 'Phone' }, { label: 'Date of Birth', type: 'date' }, { label: 'Gender', select: true, opts: ['Male', 'Female', 'Other'] }, { label: 'Blood Group', select: true, opts: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'] }].map((f, i) => (
                <div key={i}>{f.select ? (
                  <><label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>{f.label}</label><select className="input-field"><option value="">Select</option>{f.opts.map(o => <option key={o}>{o}</option>)}</select></>
                ) : (
                  <><label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>{f.label}</label><input type={f.type || 'text'} className="input-field" /></>
                )}</div>
              ))}
              <div className="md:col-span-2">
                <label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>Address</label>
                <textarea className="input-field resize-none" rows={2} />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-base font-semibold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}><Briefcase className="w-5 h-5 text-primary" /> Employment Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[{ label: 'Department', select: true, opts: ['Production', 'HR', 'Finance', 'IT', 'Warehouse', 'Quality', 'Admin'] }, { label: 'Designation', select: true, opts: ['Team Lead', 'HR Manager', 'Operator', 'Accountant', 'Store Keeper', 'Supervisor', 'System Admin', 'QC Inspector', 'Manager', 'Executive'] }, { label: 'Employment Type', select: true, opts: ['Permanent', 'Contract', 'Probation', 'Intern'] }, { label: 'Date of Joining', type: 'date' }, { label: 'Probation Period', select: true, opts: ['1 Month', '2 Months', '3 Months', '6 Months'] }, { label: 'Reporting Manager', select: true, opts: ['Priya Sharma', 'Rajesh Kumar', 'Sneha Reddy'] }].map((f, i) => (
                <div key={i}>{f.select ? (
                  <><label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>{f.label}</label><select className="input-field"><option value="">Select</option>{f.opts.map(o => <option key={o}>{o}</option>)}</select></>
                ) : (
                  <><label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>{f.label}</label><input type={f.type || 'text'} className="input-field" /></>
                )}</div>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-base font-semibold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}><Landmark className="w-5 h-5 text-primary" /> Bank & Statutory Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[{ label: 'Bank Name' }, { label: 'Account Number' }, { label: 'IFSC Code' }, { label: 'UAN Number' }, { label: 'ESIC Number' }, { label: 'PAN Card' }].map((f, i) => (
                <div key={i}><label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>{f.label}</label><input className="input-field" /></div>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-base font-semibold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}><FileText className="w-5 h-5 text-primary" /> Document Upload</h2>
            {['Aadhar Card', 'PAN Card', 'Offer Letter', 'Address Proof', 'Education Certificates'].map((doc, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl" style={{ background: 'var(--hover)' }}>
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{doc}</span>
                <div className="border-2 border-dashed rounded-xl px-4 py-2 text-xs cursor-pointer" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
                  <Upload className="w-4 h-4 inline mr-1" /> Upload
                </div>
              </div>
            ))}
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <h2 className="text-base font-semibold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}><Package className="w-5 h-5 text-primary" /> Asset Allocation</h2>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Select assets to allocate to the employee during onboarding.</p>
            {['Safety Helmet', 'Work Gloves', 'Safety Shoes', 'Uniform Set', 'ID Card'].map((asset, i) => (
              <label key={i} className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors" style={{ background: 'var(--hover)' }}>
                <input type="checkbox" className="accent-primary w-4 h-4" />
                <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{asset}</span>
              </label>
            ))}
          </div>
        )}

        {step === 6 && (
          <div className="text-center py-8 animate-scale-in">
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto">
              <ThumbsUp className="w-10 h-10 text-success" />
            </div>
            <h2 className="text-xl font-bold mt-4" style={{ color: 'var(--text-primary)' }}>Ready for Approval</h2>
            <p className="text-sm mt-2 max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>All information has been collected. Review and submit for HR Manager approval to complete the onboarding process.</p>
            <div className="mt-6 p-4 rounded-xl inline-block" style={{ background: 'var(--hover)' }}>
              <div className="text-sm" style={{ color: 'var(--text-primary)' }}>Employee: Rajesh Kumar · Dept: Production</div>
              <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Documents: 5 uploaded · Assets: 3 allocated</div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <button disabled={step === 1} onClick={() => setStep(s => s - 1)} className="btn-secondary" style={{ opacity: step === 1 ? 0.5 : 1 }}>Previous</button>
        {step < 6 ? (
          <button onClick={() => setStep(s => s + 1)} className="btn-primary"><ChevronRight className="w-4 h-4" /> Next Step</button>
        ) : (
          <button onClick={() => navigate('/app/employees')} className="btn-primary"><Check className="w-4 h-4" /> Complete Onboarding</button>
        )}
      </div>
    </div>
  )
}

export default Onboarding
