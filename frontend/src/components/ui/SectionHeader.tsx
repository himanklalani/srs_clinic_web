import { H2, Body } from "./Typography";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  center?: boolean;
}

export default function SectionHeader({
  title,
  subtitle,
  className = "",
  center = true,
}: SectionHeaderProps) {
  return (
    <div className={`mb-10 md:mb-16 ${center ? "text-center" : "text-left"} ${className}`}>
      <div className={`relative inline-block ${center ? "mx-auto" : ""}`}>
        <H2 className="mb-4">{title}</H2>
        <div className={`h-1.5 w-24 bg-primary rounded-full mb-6 ${center ? "mx-auto" : ""}`} />
      </div>
      {subtitle && (
        <Body className={`max-w-2xl ${center ? "mx-auto" : ""} text-text/70`}>
          {subtitle}
        </Body>
      )}
    </div>
  );
}
