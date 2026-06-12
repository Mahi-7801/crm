import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowDown, ArrowUp, User } from 'lucide-react'

function AssetAllocation() {
  const navigate = useNavigate()
  const [recoveryType, setRecoveryType] = useState('onetime')

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Allocate Asset</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Assign an asset to an employee.</p>
      </div>

      <div className="card p-6 space-y-5">
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>Asset</label>
          <select className="input-field"><option>Lenovo ThinkPad X1 (IT-001)</option><option>Dell Monitor 27" (IT-002)</option></select>
        </div>
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>Employee</label>
          <div className="relative">
            <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
            <select className="input-field pl-10">
              <option>Rajesh Kumar (EMP001) — Production</option>
              <option>Priya Sharma (EMP002) — Quality</option>
              <option>Amit Patel (EMP003) — Warehouse</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>Allocation Date</label>
          <input type="date" className="input-field" defaultValue="2026-06-11" />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>Expected Return</label>
          <input type="date" className="input-field" defaultValue="2027-06-11" />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>Recovery Type</label>
          <div className="flex gap-3">
            {[
              { value: 'onetime', label: 'One-Time', icon: ArrowDown },
              { value: 'emi', label: 'EMI (Monthly)', icon: ArrowUp },
            ].map(r => {
              const Icon = r.icon
              const active = recoveryType === r.value
              return (
                <button key={r.value} onClick={() => setRecoveryType(r.value)}
                  className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all"
                  style={{
                    borderColor: active ? 'var(--color-primary)' : 'var(--border)',
                    background: active ? 'color-mix(in srgb, var(--color-primary) 8%, transparent)' : 'transparent',
                    color: active ? 'var(--color-primary)' : 'var(--text-secondary)'
                  }}>
                  <Icon className={`w-4 h-4 ${active ? '' : ''}`} />
                  {r.label}
                </button>
              )
            })}
          </div>
        </div>
        {recoveryType === 'emi' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>Total Amount (₹)</label>
              <input type="number" className="input-field" defaultValue="120000" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>EMI Amount (₹)</label>
              <input type="number" className="input-field" defaultValue="10000" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>Tenure (months)</label>
              <input type="number" className="input-field" defaultValue="12" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>Start From</label>
              <input type="month" className="input-field" defaultValue="2026-07" />
            </div>
          </div>
        )}
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>Notes</label>
          <textarea className="input-field" rows="3" placeholder="Additional notes about asset allocation..." />
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <button onClick={() => navigate('/app/assets')} className="btn-secondary">Cancel</button>
          <button className="btn-primary"><ArrowDown className="w-4 h-4" /> Allocate Asset</button>
        </div>
      </div>
    </div>
  )
}

export default AssetAllocation
