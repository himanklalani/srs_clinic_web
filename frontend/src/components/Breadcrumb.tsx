import PageLink from "@/components/PageLink";
import { Home } from 'lucide-react';

interface BreadcrumbProps {
  items: { label: string; href?: string }[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb" className="text-sm text-text/70 mb-4">
      <ol className="flex items-center space-x-2">
        <li>
          <PageLink href="/" className="flex items-center hover:text-primary transition-colors">
            <Home className="h-4 w-4 mr-1" />
            Home
          </PageLink>
        </li>
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center">
            <span className="mx-1">/</span>
            {item.href ? (
              <PageLink href={item.href} className="hover:text-primary transition-colors">
                {item.label}
              </PageLink>
            ) : (
              <span aria-current="page" className="text-primary font-medium">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
