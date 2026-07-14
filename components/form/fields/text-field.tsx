"use client";

interface TextFieldProps {
  name: string;
  label: string;
  error?: string[];
  required?: boolean;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  autoComplete?: string;
}

const fieldClass =
  "w-full min-h-11 rounded-xl border bg-brand-sand/40 px-4 py-3 font-sans text-base text-brand-ink placeholder:text-brand-muted/55 transition-[border-color,box-shadow,background-color] duration-200 focus:bg-surface focus:outline-none focus:ring-2 focus:ring-[var(--ring)]";

export function TextField({
  name,
  label,
  error,
  required,
  type = "text",
  placeholder,
  defaultValue,
  value,
  onChange,
  inputMode,
  autoComplete,
}: TextFieldProps) {
  const hasError = Boolean(error?.length);
  const errorId = `${name}-error`;

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="font-sans text-sm font-medium text-brand-ink"
      >
        {label}
        {required && (
          <span className="ml-0.5 text-brand-terracotta" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={value === undefined ? defaultValue : undefined}
        value={value}
        onChange={onChange}
        required={required}
        inputMode={inputMode}
        autoComplete={autoComplete}
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? errorId : undefined}
        className={`${fieldClass} ${
          hasError
            ? "border-red-400 focus:border-red-400 focus:ring-red-300/50"
            : "border-brand-ink/12 focus:border-brand-terracotta"
        }`}
      />
      {hasError && (
        <p id={errorId} role="alert" className="font-sans text-sm text-red-600">
          {error![0]}
        </p>
      )}
    </div>
  );
}
