import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Send, Upload } from 'lucide-react'

function LeaveRequest() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ type: '', from: '', to: '', reason: '' })

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/app/attendance/leave')} className="w-9 h-9 flex items-center justify-center rounded-xl" style={{ color: 'var(--text-secondary)' }}>
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Request Leave</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>Submit a new leave request for approval.</p>
        </div>
      </div>

      <div className="card p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>Leave Type</label>
            <select className="input-field" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
              <option value="">Select Leave Type</option>
              <option value="annual">Annual Leave</option>
              <option value="sick">Sick Leave</option>
              <option value="casual">Casual Leave</option>
              <option value="unpaid">Unpaid Leave</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>From Date</label>
            <input type="date" className="input-field" value={form.from} onChange={e => setForm({ ...form, from: e.target.value })} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>To Date</label>
            <input type="date" className="input-field" value={form.to} onChange={e => setForm({ ...form, to: e.target.value })} />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>Reason</label>
            <textarea className="input-field resize-none" rows={4} value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })} placeholder="Please provide a detailed reason for your leave..." />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text-secondary)' }}>Attachment (Optional)</label>
            <div className="border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer" style={{ borderColor: 'var(--border)' }}>
              <Upload className="w-8 h-8 mx-auto" style={{ color: 'var(--text-muted)' }} />
              <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>Drop file here or click to upload</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
          <button onClick={() => navigate('/app/attendance/leave')} className="btn-secondary">Cancel</button>
          <button className="btn-primary"><Send className="w-4 h-4" /> Submit Request</button>
        </div>
      </div>
    </div>
  )
}

export default LeaveRequest
