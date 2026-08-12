"use client";

import { useState } from "react";

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupFieldProps {
  name: string;
  label: string;
  options: RadioOption[];
  error?: string[];
  required?: boolean;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export function RadioGroupField({
  name,
  label,
  options,
  error,
  required,
  defaultValue,
  onValueChange,
}: RadioGroupFieldProps) {
  const [selected, setSelected] = useState(defaultValue ?? "");
  const hasError = Boolean(error?.length);
  const errorId = `${name}-error`;

  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="font-sans text-sm font-medium text-foreground">
        {label}
        {required && (
          <span className="ml-0.5 text-primary" aria-hidden="true">
            *
          </span>
        )}
      </legend>
      <div
        className="flex flex-col gap-2.5"
        role="radiogroup"
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? errorId : undefined}
      >
        {options.map((option) => {
          const optionId = `${name}-${option.value}`;
          const isChecked = selected === option.value;
          return (
            <label
              key={option.value}
              htmlFor={optionId}
              className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 font-sans text-base text-foreground transition-[border-color,background-color,box-shadow] duration-200 ${
                isChecked
                  ? "border-primary bg-primary/8 shadow-[inset_0_0_0_1px_var(--primary)]"
                  : "border-border bg-muted/40 hover:border-primary/45 hover:bg-card"
              }`}
            >
              <input
                id={optionId}
                type="radio"
                name={name}
                value={option.value}
                checked={isChecked}
                onChange={() => {
                  setSelected(option.value);
                  onValueChange?.(option.value);
                }}
                required={required}
                className="h-4 w-4 shrink-0 accent-primary"
              />
              <span className="leading-snug">{option.label}</span>
            </label>
          );
        })}
      </div>
      {hasError && (
        <p id={errorId} role="alert" className="font-sans text-sm text-destructive">
          {error![0]}
        </p>
      )}
    </fieldset>
  );
}
