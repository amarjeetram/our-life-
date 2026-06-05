'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';

type Variant = 'master' | 'sgpa-to-cgpa' | 'percentage-to-cgpa' | 'gpa-to-cgpa' | 'vit' | 'srm' | 'ktu' | 'vtu' | 'anna' | 'ipu';
interface SemesterRow { id: number; sgpa: string; credits: string; }
interface GradeRow { id: number; grade: string; credits: string; }
interface Props { variant: Variant; accentColor?: string; }

const GRADE_TABLES: Record<string, { grade: string; point: number; range: string }[]> = {
  vit: [
    { grade: 'S', point: 10, range: '91–100' }, { grade: 'A', point: 9, range: '81–90' },
    { grade: 'B', point: 8, range: '71–80' }, { grade: 'C', point: 7, range: '61–70' },
    { grade: 'D', point: 6, range: '51–60' }, { grade: 'E', point: 5, range: '45–50' },
    { grade: 'F', point: 0, range: 'Below 45' },
  ],
  srm: [
    { grade: 'O', point: 10, range: '91–100' }, { grade: 'A+', point: 9.5, range: '81–90' },
    { grade: 'A', point: 9, range: '71–80' }, { grade: 'B+', point: 8, range: '61–70' },
    { grade: 'B', point: 7, range: '51–60' }, { grade: 'C', point: 6, range: '45–50' },
    { grade: 'F', point: 0, range: 'Below 45' },
  ],
  ktu: [
    { grade: 'S', point: 10, range: '90–100' }, { grade: 'A+', point: 9, range: '85–89' },
    { grade: 'A', point: 8.5, range: '80–84' }, { grade: 'B+', point: 8, range: '70–79' },
    { grade: 'B', point: 7, range: '60–69' }, { grade: 'C+', point: 6, range: '50–59' },
    { grade: 'C', point: 5, range: '45–49' }, { grade: 'D', point: 4, range: '40–44' },
    { grade: 'F', point: 0, range: 'Below 40' },
  ],
  anna: [
    { grade: 'O', point: 10, range: '91–100' }, { grade: 'A+', point: 9, range: '81–90' },
    { grade: 'A', point: 8, range: '71–80' }, { grade: 'B+', point: 7, range: '61–70' },
    { grade: 'B', point: 6, range: '57–60' }, { grade: 'C', point: 5, range: '50–56' },
    { grade: 'U', point: 0, range: 'Below 50' },
  ],
  ipu: [
    { grade: 'O', point: 10, range: '90–100' }, { grade: 'A', point: 9, range: '80–89' },
    { grade: 'B+', point: 8, range: '70–79' }, { grade: 'B', point: 7, range: '60–69' },
    { grade: 'C+', point: 6, range: '50–59' }, { grade: 'C', point: 5, range: '45–49' },
    { grade: 'D', point: 4, range: '40–44' }, { grade: 'F', point: 0, range: 'Below 40' },
  ],
  vtu: [
    { grade: 'O', point: 10, range: '90–100' }, { grade: 'A+', point: 9, range: '80–89' },
    { grade: 'A', point: 8, range: '70–79' }, { grade: 'B+', point: 7, range: '60–69' },
    { grade: 'B', point: 6, range: '55–59' }, { grade: 'C', point: 5, range: '50–54' },
    { grade: 'P', point: 4, range: '45–49' }, { grade: 'F', point: 0, range: 'Below 45' },
  ],
};

const GRADE_OPTIONS: Record<string, string[]> = {
  vit: ['S', 'A', 'B', 'C', 'D', 'E', 'F'],
  srm: ['O', 'A+', 'A', 'B+', 'B', 'C', 'F'],
  ktu: ['S', 'A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F'],
  anna: ['O', 'A+', 'A', 'B+', 'B', 'C', 'U'],
  ipu: ['O', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F'],
  vtu: ['O', 'A+', 'A', 'B+', 'B', 'C', 'P', 'F'],
};

function getGradePoint(variant: string, grade: string): number {
  return GRADE_TABLES[variant]?.find(r => r.grade === grade)?.point ?? 0;
}

function cgpaToPercentage(variant: Variant, cgpa: number): string {
  if (variant === 'anna') return ((cgpa * 10) - 0.75).toFixed(2) + '%';
  if (variant === 'vtu') return (cgpa * 9.1).toFixed(2) + '%';
  return (cgpa * 9.5).toFixed(2) + '%';
}

function getLabel(cgpa: number): { label: string; color: string } {
  if (cgpa >= 9) return { label: 'Outstanding', color: '#22c55e' };
  if (cgpa >= 8) return { label: 'Excellent', color: '#84cc16' };
  if (cgpa >= 7) return { label: 'Very Good', color: '#eab308' };
  if (cgpa >= 6) return { label: 'Good', color: '#f97316' };
  if (cgpa >= 5) return { label: 'Average', color: '#ef4444' };
  return { label: 'Below Average', color: '#dc2626' };
}

function ResultCard({ cgpa, variant }: { cgpa: number | null; variant: Variant }) {
  if (cgpa === null) return null;
  const { label, color } = getLabel(cgpa);
  return (
    <div style={{ background: 'linear-gradient(135deg,#0f172a,#1e293b)', borderRadius: '20px', padding: '28px', marginTop: '24px', border: '1px solid #334155', textAlign: 'center' }}>
      <div style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>Your CGPA</div>
      <div style={{ fontSize: '64px', fontWeight: 900, color, lineHeight: 1, marginBottom: '8px' }}>{cgpa.toFixed(2)}</div>
      <div style={{ display: 'inline-block', background: color + '22', color, padding: '4px 16px', borderRadius: '100px', fontSize: '14px', fontWeight: 700, marginBottom: '20px' }}>{label}</div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap' }}>
        <div><div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Equivalent %</div><div style={{ fontSize: '22px', fontWeight: 800, color: '#e2e8f0' }}>{cgpaToPercentage(variant, cgpa)}</div></div>
        <div><div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Out of</div><div style={{ fontSize: '22px', fontWeight: 800, color: '#e2e8f0' }}>10.00</div></div>
      </div>
    </div>
  );
}

function SemesterCalc({ variant, accent }: { variant: 'master' | 'sgpa-to-cgpa'; accent: string }) {
  const [rows, setRows] = useState<SemesterRow[]>([{id:1,sgpa:'',credits:''},{id:2,sgpa:'',credits:''},{id:3,sgpa:'',credits:''}]);
  const [result, setResult] = useState<number | null>(null);
  const addRow = () => setRows(r => [...r, { id: Date.now(), sgpa: '', credits: '' }]);
  const removeRow = (id: number) => setRows(r => r.filter(x => x.id !== id));
  const upd = (id: number, f: 'sgpa'|'credits', v: string) => setRows(r => r.map(x => x.id===id ? {...x,[f]:v} : x));
  const calc = useCallback(() => {
    let tw = 0, tc = 0;
    for (const r of rows) { const s=parseFloat(r.sgpa),c=parseFloat(r.credits); if(!isNaN(s)&&!isNaN(c)&&c>0){tw+=s*c;tc+=c;} }
    setResult(tc > 0 ? tw/tc : null);
  }, [rows]);
  const reset = () => { setRows([{id:1,sgpa:'',credits:''},{id:2,sgpa:'',credits:''},{id:3,sgpa:'',credits:''}]); setResult(null); };
  const inp = { width:'100%', padding:'8px 10px', border:'1.5px solid #e2e8f0', borderRadius:'8px', fontSize:'14px', outline:'none', fontFamily:'inherit', boxSizing:'border-box' as const };
  return (
    <div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width:'100%', borderCollapse:'collapse', marginBottom:'16px' }}>
          <thead><tr style={{ background:'#f8fafc' }}>
            {['Semester','SGPA (0–10)','Credits',''].map(h=><th key={h} style={{ padding:'10px 12px', textAlign:'left', fontSize:'13px', fontWeight:700, color:'#475569' }}>{h}</th>)}
          </tr></thead>
          <tbody>{rows.map((row,i)=>(
            <tr key={row.id} style={{ borderBottom:'1px solid #f1f5f9' }}>
              <td style={{ padding:'8px 12px', fontSize:'14px', color:'#64748b', fontWeight:600 }}>Sem {i+1}</td>
              <td style={{ padding:'6px 12px' }}><input type="number" min="0" max="10" step="0.01" value={row.sgpa} onChange={e=>upd(row.id,'sgpa',e.target.value)} placeholder="e.g. 8.5" style={inp}/></td>
              <td style={{ padding:'6px 12px' }}><input type="number" min="1" value={row.credits} onChange={e=>upd(row.id,'credits',e.target.value)} placeholder="e.g. 24" style={inp}/></td>
              <td style={{ padding:'6px 8px' }}>{rows.length>1&&<button onClick={()=>removeRow(row.id)} style={{ background:'#fef2f2',border:'none',color:'#ef4444',width:'32px',height:'32px',borderRadius:'8px',cursor:'pointer',fontSize:'18px' }}>×</button>}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      <button onClick={addRow} style={{ background:accent+'15',color:accent,border:`1.5px dashed ${accent}`,padding:'8px 18px',borderRadius:'8px',fontSize:'14px',fontWeight:600,cursor:'pointer',marginBottom:'20px',width:'100%' }}>+ Add Semester</button>
      <div style={{ display:'flex', gap:'12px' }}>
        <button onClick={calc} style={{ flex:1,background:accent,color:'#fff',border:'none',padding:'14px',borderRadius:'12px',fontSize:'16px',fontWeight:700,cursor:'pointer' }}>Calculate CGPA</button>
        <button onClick={reset} style={{ background:'#f1f5f9',color:'#64748b',border:'none',padding:'14px 20px',borderRadius:'12px',fontSize:'14px',fontWeight:600,cursor:'pointer' }}>Reset</button>
      </div>
      <ResultCard cgpa={result} variant={variant} />
    </div>
  );
}

function PctCalc({ accent }: { accent: string }) {
  const [pct, setPct] = useState(''); const [scale, setScale] = useState('9.5'); const [result, setResult] = useState<number|null>(null);
  const calc = () => { const p=parseFloat(pct),s=parseFloat(scale); if(!isNaN(p)&&s>0) setResult(p/s); };
  const inp = { width:'100%', padding:'12px 16px', border:'1.5px solid #e2e8f0', borderRadius:'10px', fontSize:'16px', outline:'none', boxSizing:'border-box' as const, fontFamily:'inherit' };
  return (
    <div>
      <div style={{ display:'grid', gap:'16px', marginBottom:'20px' }}>
        <div><label style={{ display:'block',fontSize:'14px',fontWeight:600,color:'#374151',marginBottom:'6px' }}>Your Percentage (%)</label><input type="number" min="0" max="100" step="0.01" value={pct} onChange={e=>setPct(e.target.value)} placeholder="e.g. 85.5" style={inp}/></div>
        <div><label style={{ display:'block',fontSize:'14px',fontWeight:600,color:'#374151',marginBottom:'6px' }}>Conversion Scale</label>
          <select value={scale} onChange={e=>setScale(e.target.value)} style={{ ...inp, fontSize:'14px', background:'#fff', cursor:'pointer' }}>
            <option value="9.5">9.5 — General / CBSE / Most Universities</option>
            <option value="9.1">9.1 — VTU Karnataka</option>
            <option value="10">10 — Anna University</option>
            <option value="9">9 — Some Private Universities</option>
          </select>
        </div>
      </div>
      <button onClick={calc} style={{ width:'100%',background:accent,color:'#fff',border:'none',padding:'14px',borderRadius:'12px',fontSize:'16px',fontWeight:700,cursor:'pointer' }}>Convert to CGPA</button>
      <ResultCard cgpa={result} variant="percentage-to-cgpa" />
    </div>
  );
}

function GpaCalc({ accent }: { accent: string }) {
  const [gpa, setGpa] = useState(''); const [fromScale, setFromScale] = useState('4'); const [result, setResult] = useState<number|null>(null);
  const calc = () => { const g=parseFloat(gpa),s=parseFloat(fromScale); if(!isNaN(g)&&s>0) setResult((g/s)*10); };
  const inp = { width:'100%', padding:'12px 16px', border:'1.5px solid #e2e8f0', borderRadius:'10px', fontSize:'16px', outline:'none', boxSizing:'border-box' as const, fontFamily:'inherit' };
  return (
    <div>
      <div style={{ display:'grid', gap:'16px', marginBottom:'20px' }}>
        <div><label style={{ display:'block',fontSize:'14px',fontWeight:600,color:'#374151',marginBottom:'6px' }}>Your GPA</label><input type="number" min="0" max="10" step="0.01" value={gpa} onChange={e=>setGpa(e.target.value)} placeholder="e.g. 3.8" style={inp}/></div>
        <div><label style={{ display:'block',fontSize:'14px',fontWeight:600,color:'#374151',marginBottom:'6px' }}>GPA Scale</label>
          <select value={fromScale} onChange={e=>setFromScale(e.target.value)} style={{ ...inp, fontSize:'14px', background:'#fff', cursor:'pointer' }}>
            <option value="4">4.0 Scale (US Standard)</option>
            <option value="5">5.0 Scale</option>
            <option value="7">7.0 Scale</option>
          </select>
        </div>
      </div>
      <button onClick={calc} style={{ width:'100%',background:accent,color:'#fff',border:'none',padding:'14px',borderRadius:'12px',fontSize:'16px',fontWeight:700,cursor:'pointer' }}>Convert to CGPA</button>
      <ResultCard cgpa={result} variant="gpa-to-cgpa" />
    </div>
  );
}

function GradeCalc({ variant, accent }: { variant: Variant; accent: string }) {
  const opts = GRADE_OPTIONS[variant as string] ?? [];
  const [rows, setRows] = useState<GradeRow[]>([{id:1,grade:opts[0]??'',credits:''},{id:2,grade:opts[0]??'',credits:''},{id:3,grade:opts[0]??'',credits:''}]);
  const [result, setResult] = useState<number|null>(null);
  const addRow = () => setRows(r => [...r, { id: Date.now(), grade: opts[0]??'', credits: '' }]);
  const removeRow = (id: number) => setRows(r => r.filter(x => x.id !== id));
  const upd = (id: number, f: 'grade'|'credits', v: string) => setRows(r => r.map(x => x.id===id ? {...x,[f]:v} : x));
  const calc = useCallback(() => {
    let tw = 0, tc = 0;
    for (const r of rows) { const gp=getGradePoint(variant as string, r.grade), c=parseFloat(r.credits); if(!isNaN(c)&&c>0){tw+=gp*c;tc+=c;} }
    setResult(tc > 0 ? tw/tc : null);
  }, [rows, variant]);
  const reset = () => { setRows([{id:1,grade:opts[0]??'',credits:''},{id:2,grade:opts[0]??'',credits:''},{id:3,grade:opts[0]??'',credits:''}]); setResult(null); };
  const inp = { width:'100%', padding:'8px 10px', border:'1.5px solid #e2e8f0', borderRadius:'8px', fontSize:'14px', outline:'none', fontFamily:'inherit', boxSizing:'border-box' as const };
  return (
    <div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width:'100%', borderCollapse:'collapse', marginBottom:'16px' }}>
          <thead><tr style={{ background:'#f8fafc' }}>
            {['Subject','Grade','Credits',''].map(h=><th key={h} style={{ padding:'10px 12px', textAlign:'left', fontSize:'13px', fontWeight:700, color:'#475569' }}>{h}</th>)}
          </tr></thead>
          <tbody>{rows.map((row,i)=>(
            <tr key={row.id} style={{ borderBottom:'1px solid #f1f5f9' }}>
              <td style={{ padding:'8px 12px', fontSize:'14px', color:'#64748b', fontWeight:600 }}>Subject {i+1}</td>
              <td style={{ padding:'6px 12px' }}>
                <select value={row.grade} onChange={e=>upd(row.id,'grade',e.target.value)} style={{ ...inp, background:'#fff', cursor:'pointer' }}>
                  {opts.map(g=><option key={g} value={g}>{g} ({getGradePoint(variant as string, g)} pts)</option>)}
                </select>
              </td>
              <td style={{ padding:'6px 12px' }}><input type="number" min="1" max="10" value={row.credits} onChange={e=>upd(row.id,'credits',e.target.value)} placeholder="Credits" style={inp}/></td>
              <td style={{ padding:'6px 8px' }}>{rows.length>1&&<button onClick={()=>removeRow(row.id)} style={{ background:'#fef2f2',border:'none',color:'#ef4444',width:'32px',height:'32px',borderRadius:'8px',cursor:'pointer',fontSize:'18px' }}>×</button>}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      <button onClick={addRow} style={{ background:accent+'15',color:accent,border:`1.5px dashed ${accent}`,padding:'8px 18px',borderRadius:'8px',fontSize:'14px',fontWeight:600,cursor:'pointer',marginBottom:'20px',width:'100%' }}>+ Add Subject</button>
      <div style={{ display:'flex', gap:'12px' }}>
        <button onClick={calc} style={{ flex:1,background:accent,color:'#fff',border:'none',padding:'14px',borderRadius:'12px',fontSize:'16px',fontWeight:700,cursor:'pointer' }}>Calculate CGPA</button>
        <button onClick={reset} style={{ background:'#f1f5f9',color:'#64748b',border:'none',padding:'14px 20px',borderRadius:'12px',fontSize:'14px',fontWeight:600,cursor:'pointer' }}>Reset</button>
      </div>
      <ResultCard cgpa={result} variant={variant} />
      {/* Grade Table */}
      <div style={{ marginTop:'28px', background:'#f8fafc', borderRadius:'16px', padding:'20px', border:'1px solid #e2e8f0' }}>
        <h3 style={{ fontSize:'15px', fontWeight:800, color:'#1e293b', marginBottom:'14px', textTransform:'uppercase', letterSpacing:'0.05em' }}>Grading Scale Reference</h3>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead><tr style={{ background:'#fff' }}>
              {['Grade','Grade Point','Marks Range'].map(h=><th key={h} style={{ padding:'8px 12px', fontSize:'12px', fontWeight:700, color:'#64748b', textAlign:'left' }}>{h}</th>)}
            </tr></thead>
            <tbody>{(GRADE_TABLES[variant as string]??[]).map(r=>(
              <tr key={r.grade} style={{ borderBottom:'1px solid #e2e8f0' }}>
                <td style={{ padding:'8px 12px', fontWeight:800, color:accent, fontSize:'14px' }}>{r.grade}</td>
                <td style={{ padding:'8px 12px', fontSize:'14px', color:'#334155', fontWeight:600 }}>{r.point}</td>
                <td style={{ padding:'8px 12px', fontSize:'14px', color:'#64748b' }}>{r.range}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const RELATED = [
  {href:'/cgpa-calculator',label:'CGPA Calculator'},
  {href:'/sgpa-to-cgpa-calculator',label:'SGPA to CGPA'},
  {href:'/percentage-to-cgpa-calculator',label:'% to CGPA'},
  {href:'/gpa-to-cgpa-calculator',label:'GPA to CGPA'},
  {href:'/vit-cgpa-calculator',label:'VIT CGPA'},
  {href:'/srm-cgpa-calculator',label:'SRM CGPA'},
  {href:'/ktu-cgpa-calculator',label:'KTU CGPA'},
  {href:'/vtu-cgpa-calculator',label:'VTU CGPA'},
  {href:'/anna-university-cgpa-calculator',label:'Anna University'},
  {href:'/ipu-cgpa-calculator',label:'IPU CGPA'},
];

const LABELS: Record<Variant,string> = {
  'master':'CGPA Calculator','sgpa-to-cgpa':'SGPA to CGPA Converter',
  'percentage-to-cgpa':'Percentage to CGPA','gpa-to-cgpa':'GPA to CGPA Converter',
  'vit':'VIT CGPA Calculator','srm':'SRM CGPA Calculator','ktu':'KTU CGPA Calculator',
  'vtu':'VTU CGPA Calculator','anna':'Anna University CGPA Calculator','ipu':'IPU CGPA Calculator',
};

export default function CGPACalculatorClient({ variant, accentColor }: Props) {
  const accent = accentColor ?? '#6366f1';
  const isGrade = ['vit','srm','ktu','anna','ipu','vtu'].includes(variant);

  return (
    <div style={{ fontFamily:"'Inter','Plus Jakarta Sans',system-ui,sans-serif" }}>
      <div style={{ background:'#ffffff', borderRadius:'24px', border:'1px solid #e2e8f0', boxShadow:'0 8px 40px rgba(0,0,0,0.06)', overflow:'hidden' }}>
        <div style={{ background:`linear-gradient(135deg,${accent},${accent}cc)`, padding:'24px 28px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
            <div style={{ width:'42px', height:'42px', background:'rgba(255,255,255,0.2)', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'22px' }}>🎓</div>
            <div>
              <div style={{ fontSize:'18px', fontWeight:800, color:'#fff' }}>{LABELS[variant]}</div>
              <div style={{ fontSize:'13px', color:'rgba(255,255,255,0.75)', marginTop:'2px' }}>Free • Instant • Accurate</div>
            </div>
          </div>
        </div>
        <div style={{ padding:'24px 28px' }}>
          {(variant==='master'||variant==='sgpa-to-cgpa') && <SemesterCalc variant={variant} accent={accent}/>}
          {variant==='percentage-to-cgpa' && <PctCalc accent={accent}/>}
          {variant==='gpa-to-cgpa' && <GpaCalc accent={accent}/>}
          {isGrade && <GradeCalc variant={variant} accent={accent}/>}
        </div>
      </div>
      <div style={{ marginTop:'28px' }}>
        <div style={{ fontSize:'13px', fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'12px' }}>Related CGPA Tools</div>
        <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
          {RELATED.filter(t => !t.href.includes(variant.split('-')[0])).slice(0,6).map(t=>(
            <Link key={t.href} href={t.href} style={{ background:'#f8fafc', color:'#475569', border:'1px solid #e2e8f0', padding:'6px 14px', borderRadius:'100px', fontSize:'13px', fontWeight:600, textDecoration:'none' }}>{t.label}</Link>
          ))}
        </div>
      </div>
    </div>
  );
}
