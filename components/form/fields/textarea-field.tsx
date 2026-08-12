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
  "w-full min-h-11 resize-y rounded-xl border bg-muted/40 px-4 py-3 font-sans text-base leading-relaxed text-foreground placeholder:text-muted-foreground/55 transition-[border-color,box-shadow,background-color] duration-200 focus:bg-card focus:outline-none focus:ring-2 focus:ring-ring";

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
      <label htmlFor={name} className="font-sans text-sm font-medium text-foreground">
        {label}
        {required && (
          <span className="ml-0.5 text-primary" aria-hidden="true">
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
            ? "border-destructive focus:border-destructive focus:ring-destructive/40"
            : "border-border focus:border-primary"
        }`}
      />
      {hasError && (
        <p id={errorId} role="alert" className="font-sans text-sm text-destructive">
          {error![0]}
        </p>
      )}
    </div>
  );
}
