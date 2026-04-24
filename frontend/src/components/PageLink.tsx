"use client";

import Link from "next/link";
import { useTransition } from "./providers/TransitionProvider";

interface PageLinkProps extends React.ComponentProps<typeof Link> {
  children: React.ReactNode;
  href: string;
}

export default function PageLink({ children, href, onClick, ...props }: PageLinkProps) {
  const { navigate } = useTransition();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // If it's a new tab, anchor link, or external link, don't intercept
    if (
      e.ctrlKey || 
      e.metaKey || 
      href.startsWith("#") || 
      href.startsWith("http") || 
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      props.target === "_blank"
    ) {
      if (onClick) onClick(e);
      return;
    }

    e.preventDefault();
    if (onClick) onClick(e);
    
    // Trigger transition and route change
    navigate(href);
  };

  return (
    <Link href={href} onClick={handleLinkClick} {...props}>
      {children}
    </Link>
  );
}
