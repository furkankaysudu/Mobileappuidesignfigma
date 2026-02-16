import React from "react";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl font-medium transition active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-emerald-600 text-white hover:bg-emerald-700",
    secondary: "bg-neutral-100 text-neutral-900 hover:bg-neutral-200",
    ghost: "bg-transparent text-neutral-900 hover:bg-neutral-100",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };
  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-11 px-4 text-sm",
    lg: "h-12 px-5 text-base",
  };
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-neutral-200 bg-white shadow-sm",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-3 p-4">
      <div>
        <div className="text-sm font-semibold text-neutral-900">{title}</div>
        {subtitle ? (
          <div className="mt-1 text-xs text-neutral-500">{subtitle}</div>
        ) : null}
      </div>
      {right ? <div className="shrink-0">{right}</div> : null}
    </div>
  );
}

export function Input({
  label,
  hint,
  right,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  right?: React.ReactNode;
}) {
  return (
    <label className={cn("block", className)}>
      {label ? (
        <div className="mb-2 text-xs font-medium text-neutral-700">{label}</div>
      ) : null}
      <div className="relative">
        <input
          className={cn(
            "h-11 w-full rounded-xl border border-neutral-200 bg-white px-3 text-sm outline-none placeholder:text-neutral-400 focus:border-neutral-400"
          )}
          {...props}
        />
        {right ? (
          <div className="absolute inset-y-0 right-2 flex items-center">
            {right}
          </div>
        ) : null}
      </div>
      {hint ? <div className="mt-2 text-xs text-neutral-500">{hint}</div> : null}
    </label>
  );
}

export function Select({
  label,
  hint,
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  hint?: string;
}) {
  return (
    <label className={cn("block", className)}>
      {label ? (
        <div className="mb-2 text-xs font-medium text-neutral-700">{label}</div>
      ) : null}
      <select
        className="h-11 w-full rounded-xl border border-neutral-200 bg-white px-3 text-sm outline-none focus:border-neutral-400"
        {...props}
      >
        {children}
      </select>
      {hint ? <div className="mt-2 text-xs text-neutral-500">{hint}</div> : null}
    </label>
  );
}

export function Textarea({
  label,
  hint,
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  hint?: string;
}) {
  return (
    <label className={cn("block", className)}>
      {label ? (
        <div className="mb-2 text-xs font-medium text-neutral-700">{label}</div>
      ) : null}
      <textarea
        className="min-h-[96px] w-full resize-none rounded-xl border border-neutral-200 bg-white px-3 py-3 text-sm outline-none focus:border-neutral-400"
        {...props}
      />
      {hint ? <div className="mt-2 text-xs text-neutral-500">{hint}</div> : null}
    </label>
  );
}

export function Chip({
  children,
  selected,
  onClick,
}: {
  children: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-9 items-center gap-2 rounded-full border px-3 text-sm transition",
        selected
          ? "border-emerald-600 bg-emerald-600 text-white"
          : "border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50"
      )}
    >
      {children}
    </button>
  );
}

export function Divider({ className }: { className?: string }) {
  return <div className={cn("h-px w-full bg-neutral-200", className)} />;
}

export function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "success" | "warning";
}) {
  const tones = {
    neutral: "bg-neutral-100 text-neutral-700",
    success: "bg-emerald-100 text-emerald-800",
    warning: "bg-amber-100 text-amber-800",
  };
  return (
    <span className={cn("rounded-full px-2 py-1 text-xs font-medium", tones[tone])}>
      {children}
    </span>
  );
}

export function Stepper({
  steps,
  current,
}: {
  steps: string[];
  current: number; // 0-based
}) {
  return (
    <div className="px-4 pt-3">
      <div className="flex items-center justify-between">
        <div className="text-xs font-medium text-neutral-700">
          Step {current + 1} of {steps.length}
        </div>
        <div className="text-xs text-neutral-500">{steps[current]}</div>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
        <div
          className="h-full rounded-full bg-emerald-600 transition-all"
          style={{ width: `${((current + 1) / steps.length) * 100}%` }}
        />
      </div>
    </div>
  );
}

export function Segmented({
  options,
  value,
  onChange,
}: {
  options: Array<{ label: string; value: string }>;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex rounded-xl border border-neutral-200 bg-neutral-50 p-1">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={cn(
            "h-9 flex-1 rounded-lg px-3 text-sm font-medium transition",
            value === o.value
              ? "bg-white text-neutral-900 shadow-sm"
              : "text-neutral-600 hover:text-neutral-900"
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}