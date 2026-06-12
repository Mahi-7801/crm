import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Download, Printer, HardHat } from 'lucide-react'

function PayslipView() {
  const { id } = useParams()
  const navigate = useNavigate()

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <div className="flex items-center justify-between no-print">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/app/payroll')} className="w-9 h-9 flex items-center justify-center rounded-xl" style={{ color: 'var(--text-secondary)' }}><ArrowLeft className="w-5 h-5" /></button>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Payslip</h1>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Salary details for June 2026</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => window.print()} className="btn-secondary text-xs"><Printer className="w-4 h-4" /> Print</button>
          <button className="btn-primary text-xs"><Download className="w-4 h-4" /> Download PDF</button>
        </div>
      </div>

      <div className="card p-8" id="payslip">
        <div className="flex items-center justify-between pb-6" style={{ borderBottom: '2px dashed var(--border)' }}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <HardHat className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Devna Engineers</div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Industrial Area, Phase 2, Bangalore - 560001</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>PAYSLIP</div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>June 2026</div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6" style={{ borderBottom: '1px solid var(--border)' }}>
          <div>
            <h3 className="text-xs font-semibold mb-3" style={{ color: 'var(--text-muted)' }}>EMPLOYEE DETAILS</h3>
            <div className="space-y-1.5 text-sm">
              {[
                { label: 'Name', value: 'Rajesh Kumar' },
                { label: 'Employee ID', value: 'EMP001' },
                { label: 'Department', value: 'Production' },
                { label: 'Designation', value: 'Team Lead' },
                { label: 'PAN', value: 'ABCDE1234F' },
                { label: 'UAN', value: '123456789012' },
              ].map((f, i) => (
                <div key={i} className="flex justify-between"><span style={{ color: 'var(--text-muted)' }}>{f.label}</span><span className="font-medium" style={{ color: 'var(--text-primary)' }}>{f.value}</span></div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xs font-semibold mb-3" style={{ color: 'var(--text-muted)' }}>PAYMENT DETAILS</h3>
            <div className="space-y-1.5 text-sm">
              {[
                { label: 'Bank Name', value: 'State Bank of India' },
                { label: 'Account No', value: 'XXXXXX1234' },
                { label: 'IFSC Code', value: 'SBIN0012345' },
                { label: 'Pay Period', value: 'June 2026' },
                { label: 'Pay Date', value: '05-06-2026' },
                { label: 'Pay Mode', value: 'Bank Transfer' },
              ].map((f, i) => (
                <div key={i} className="flex justify-between"><span style={{ color: 'var(--text-muted)' }}>{f.label}</span><span className="font-medium" style={{ color: 'var(--text-primary)' }}>{f.value}</span></div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6">
          <div>
            <h3 className="text-xs font-semibold mb-3" style={{ color: '#4CAF50' }}>EARNINGS</h3>
            <div className="space-y-2">
              {[
                { label: 'Basic Salary', amount: 45000 },
                { label: 'Dearness Allowance', amount: 5000 },
                { label: 'House Rent Allowance', amount: 8000 },
                { label: 'Overtime', amount: 3200 },
                { label: 'Incentive', amount: 2000 },
                { label: 'Bonus', amount: 3000 },
              ].map((e, i) => (
                <div key={i} className="flex justify-between text-sm py-1"><span style={{ color: 'var(--text-secondary)' }}>{e.label}</span><span className="font-medium" style={{ color: 'var(--text-primary)' }}>₹{e.amount.toLocaleString()}</span></div>
              ))}
              <div className="flex justify-between text-sm pt-3 mt-3 font-bold" style={{ borderTop: '2px solid var(--border)', color: '#4CAF50' }}>
                <span>Total Earnings</span><span>₹66,200</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xs font-semibold mb-3" style={{ color: '#1A78C2' }}>DEDUCTIONS</h3>
            <div className="space-y-2">
              {[
                { label: 'Provident Fund (PF)', amount: 1800 },
                { label: 'ESIC', amount: 500 },
                { label: 'Professional Tax', amount: 200 },
                { label: 'Income Tax', amount: 1200 },
                { label: 'Asset Recovery', amount: 500 },
              ].map((d, i) => (
                <div key={i} className="flex justify-between text-sm py-1"><span style={{ color: 'var(--text-secondary)' }}>{d.label}</span><span className="font-medium" style={{ color: 'var(--text-primary)' }}>₹{d.amount.toLocaleString()}</span></div>
              ))}
              <div className="flex justify-between text-sm pt-3 mt-3 font-bold" style={{ borderTop: '2px solid var(--border)', color: '#1A78C2' }}>
                <span>Total Deductions</span><span>₹4,200</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl flex items-center justify-between" style={{ background: 'color-mix(in srgb, var(--color-primary) 8%, transparent)', border: '1px solid color-mix(in srgb, var(--color-primary) 20%, transparent)' }}>
          <div>
            <div className="text-sm font-medium" style={{ color: 'var(--color-primary)' }}>Net Salary Payable</div>
            <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Rupees Sixty Two Thousand Only</div>
          </div>
          <div className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>₹62,000</div>
        </div>

        <div className="flex justify-between text-xs pt-6" style={{ color: 'var(--text-muted)' }}>
          <span>This is a computer-generated payslip and does not require a signature.</span>
          <span>Generated on: 11-06-2026</span>
        </div>
      </div>
    </div>
  )
}

export default PayslipView
