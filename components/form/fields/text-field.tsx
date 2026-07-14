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
}

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
}: TextFieldProps) {
  const hasError = Boolean(error?.length);
  const errorId = `${name}-error`;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={name}
        className="font-sans text-sm font-medium text-brand-ink"
      >
        {label}
        {required && <span className="ml-0.5 text-brand-terracotta">*</span>}
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
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? errorId : undefined}
        className={`w-full rounded-lg border bg-white px-4 py-3 font-sans text-base text-brand-ink placeholder:text-brand-ink/40 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-terracotta/40 ${
          hasError
            ? "border-red-400 focus:border-red-400"
            : "border-brand-ink/15 focus:border-brand-terracotta"
        }`}
      />
      {hasError && (
        <p id={errorId} className="font-sans text-sm text-red-600">
          {error![0]}
        </p>
      )}
    </div>
  );
}
