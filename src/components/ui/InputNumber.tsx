'use client';

interface InputNumberProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  suffix?: string;
  hint?: string;
  min?: number;
  max?: number;
  step?: number;
  decimals?: number;
}

export default function InputNumber({
  id,
  label,
  value,
  onChange,
  placeholder = '0',
  suffix,
  hint,
  min = 0,
  max,
  step = 1,
  decimals = 0,
}: InputNumberProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    if (raw === '' || raw === '-') {
      onChange(0);
      return;
    }
    const num = decimals > 0 ? parseFloat(raw) : parseInt(raw, 10);
    if (isNaN(num)) return;
    if (min !== undefined && num < min) return;
    if (max !== undefined && num > max) return;
    onChange(num);
  }

  return (
    <div className="input-group">
      <label htmlFor={id} className="input-label">
        {label}
      </label>
      <div className="input-wrapper">
        <input
          id={id}
          type="number"
          className="input-field"
          style={{ paddingRight: suffix ? '4rem' : '1rem' }}
          value={value === 0 ? '' : value}
          onChange={handleChange}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          autoComplete="off"
        />
        {suffix && <span className="input-suffix">{suffix}</span>}
      </div>
      {hint && <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{hint}</span>}
    </div>
  );
}
