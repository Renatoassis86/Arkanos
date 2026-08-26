"use client";

import { useState } from "react";

/**
 * Campo de data de nascimento com máscara automática: o usuário só
 * digita números (bom pra teclado numérico, sem tecla de barra) e as
 * barras DD/MM/AAAA aparecem sozinhas conforme ele digita.
 */
export function BirthdateInput({
  className,
  required,
  defaultValue = "",
}: {
  className?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  const [value, setValue] = useState(defaultValue);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 8);
    let formatted = digits;
    if (digits.length > 4) {
      formatted = `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
    } else if (digits.length > 2) {
      formatted = `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
    }
    setValue(formatted);
  }

  return (
    <input
      name="data_nascimento"
      type="text"
      required={required}
      inputMode="numeric"
      autoComplete="off"
      placeholder="15/07/1986"
      pattern="\d{2}/\d{2}/\d{4}"
      title="Formato: DD/MM/AAAA"
      value={value}
      onChange={handleChange}
      className={className}
    />
  );
}
