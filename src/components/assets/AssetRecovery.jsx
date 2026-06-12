import { useState } from 'react'
import { DollarSign, TrendingDown, RefreshCw, CheckCircle, Clock } from 'lucide-react'

const recoveries = [
  { id: 'REC001', employee: 'Rajesh Kumar', asset: 'Lenovo ThinkPad X1', total: 120000, paid: 50000, emi: 10000, nextDue: '01-07-2026', status: 'Active', monthsLeft: 7 },
  { id: 'REC002', employee: 'Priya Sharma', asset: 'iPhone 15 Pro', total: 85000, paid: 85000, emi: 0, nextDue: '-', status: 'Completed', monthsLeft: 0 },
  { id: 'REC003', employee: 'Amit Patel', asset: 'Drilling Machine X5', total: 45000, paid: 15000, emi: 5000, nextDue: '01-07-2026', status: 'Active', monthsLeft: 6 },
]

function AssetRecovery() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Asset Recovery & EMI</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Track EMI payments, outstanding balances, and recovery status.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Outstanding', value: '₹1.15L', icon: DollarSign, color: '#4CAF50' },
          { label: 'Recovered This Month', value: '₹25,000', icon: TrendingDown, color: '#4CAF50' },
          { label: 'Active Recoveries', value: '3', icon: RefreshCw, color: '#1A78C2' },
          { label: 'Completed', value: '12', icon: CheckCircle, color: '#1A78C2' },
        ].map((s, i) => {
          const Icon = s.icon
          return (
            <div key={i} className="card p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${s.color}15` }}>
                <Icon className="w-5 h-5" style={{ color: s.color }} />
              </div>
              <div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{s.label}</div>
                <div className="text-lg font-bold mt-0.5" style={{ color: s.color }}>{s.value}</div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {recoveries.map((r, i) => {
          const progress = (r.paid / r.total) * 100
          return (
            <div key={r.id} className="card p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{r.employee}</div>
                <span className={`badge text-xs ${r.status === 'Active' ? 'badge-warning' : 'badge-success'}`}>{r.status}</span>
              </div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{r.asset}</div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span style={{ color: 'var(--text-secondary)' }}>Recovered</span>
                  <span className="font-medium" style={{ color: '#4CAF50' }}>₹{r.paid.toLocaleString()} / ₹{r.total.toLocaleString()}</span>
                </div>
                <div className="w-full h-2 rounded-full" style={{ background: 'var(--hover)' }}>
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: progress >= 100 ? '#4CAF50' : '#4CAF50' }} />
                </div>
                <div className="flex justify-between text-xs" style={{ color: 'var(--text-muted)' }}>
                  <span>{progress.toFixed(0)}% recovered</span>
                  <span>{r.monthsLeft} months left</span>
                </div>
              </div>
              {r.status === 'Active' && (
                <div className="flex items-center justify-between text-xs p-3 rounded-xl" style={{ background: 'color-mix(in srgb, var(--color-accent) 8%, transparent)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Next EMI Due</span>
                  <span className="font-medium" style={{ color: '#4CAF50' }}>₹{r.emi.toLocaleString()} on {r.nextDue}</span>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AssetRecovery
