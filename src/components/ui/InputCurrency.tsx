'use client';

import { useState, useEffect } from 'react';
import { formatInputRupiah, parseInputRupiah } from '@/lib/formatters';

interface InputCurrencyProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  hint?: string;
  min?: number;
  max?: number;
}

export default function InputCurrency({
  id,
  label,
  value,
  onChange,
  placeholder = '0',
  hint,
  min = 0,
  max,
}: InputCurrencyProps) {
  const [displayValue, setDisplayValue] = useState('');

  useEffect(() => {
    if (value > 0) {
      setDisplayValue(formatInputRupiah(String(value)));
    }
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    const digits = raw.replace(/\D/g, '');
    
    if (!digits) {
      setDisplayValue('');
      onChange(0);
      return;
    }

    const num = parseInt(digits, 10);
    if (max !== undefined && num > max) return;
    
    setDisplayValue(formatInputRupiah(digits));
    onChange(num);
  }

  return (
    <div className="input-group">
      <label htmlFor={id} className="input-label">
        {label}
      </label>
      <div className="input-wrapper">
        <span className="input-prefix">Rp</span>
        <input
          id={id}
          type="text"
          inputMode="numeric"
          className="input-field input-currency"
          value={displayValue}
          onChange={handleChange}
          placeholder={placeholder}
          autoComplete="off"
        />
      </div>
      {hint && <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{hint}</span>}
    </div>
  );
}
