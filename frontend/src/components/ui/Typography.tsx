import { ReactNode } from "react";

interface TypographyProps {
  children: ReactNode;
  className?: string;
}

export const H1 = ({ children, className = "" }: TypographyProps) => (
  <h1 className={`font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary-dark leading-tight ${className}`}>
    {children}
  </h1>
);

export const H2 = ({ children, className = "" }: TypographyProps) => (
  <h2 className={`font-serif text-2xl sm:text-3xl md:text-4xl text-primary-dark leading-snug ${className}`}>
    {children}
  </h2>
);

export const H3 = ({ children, className = "" }: TypographyProps) => (
  <h3 className={`font-display text-xl sm:text-2xl md:text-3xl text-primary-dark ${className}`}>
    {children}
  </h3>
);

export const Body = ({ children, className = "" }: TypographyProps) => (
  <p className={`font-sans text-base md:text-lg text-text/80 leading-relaxed ${className}`}>
    {children}
  </p>
);

export const Caption = ({ children, className = "" }: TypographyProps) => (
  <span className={`font-sans text-sm text-text/60 ${className}`}>
    {children}
  </span>
);

export const Label = ({ children, className = "" }: TypographyProps) => (
  <label className={`font-sans text-sm font-semibold uppercase tracking-wider text-primary ${className}`}>
    {children}
  </label>
);
