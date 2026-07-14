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

const fieldClass =
  "w-full resize-y rounded-xl border bg-brand-sand/40 px-4 py-3 font-sans text-base leading-relaxed text-brand-ink placeholder:text-brand-muted/55 transition-[border-color,box-shadow,background-color] duration-200 focus:bg-surface focus:outline-none focus:ring-2 focus:ring-[var(--ring)]";

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
