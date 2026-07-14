"use client";

interface TextareaFieldProps {
  name: string;
  label: string;
  error?: string[];
  required?: boolean;
  rows?: number;
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function TextareaField({
  name,
  label,
  error,
  required,
  rows = 4,
  placeholder,
  defaultValue,
  value,
  onChange,
}: TextareaFieldProps) {
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
      <textarea
        id={name}
        name={name}
        rows={rows}
        placeholder={placeholder}
        defaultValue={value === undefined ? defaultValue : undefined}
        value={value}
        onChange={onChange}
        required={required}
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? errorId : undefined}
        className={`w-full resize-none rounded-lg border bg-white px-4 py-3 font-sans text-base leading-relaxed text-brand-ink placeholder:text-brand-ink/40 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-terracotta/40 ${
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
