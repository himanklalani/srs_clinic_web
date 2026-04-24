import PageLink from "@/components/PageLink";
import { H1, Body } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="mb-8 relative">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-24 w-24 text-primary animate-bounce"
        >
          <path
            d="M4.5 10.5c0-2.5 1.5-4.5 4.5-4.5s4.5 2 4.5 4.5v3c0 2.5-1.5 4.5-4.5 4.5s-4.5-2-4.5-4.5v-3z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 10.5c0-2.5 1.5-4.5 4.5-4.5s4.5 2 4.5 4.5v3c0 2.5-1.5 4.5-4.5 4.5s-4.5-2-4.5-4.5v-3z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      
      <H1 className="mb-4 text-primary-dark">Oops! Page Not Found</H1>
      <Body className="mb-10 max-w-md mx-auto">
        We couldn't find the page you're looking for. It might have been moved or deleted.
      </Body>
      
      <PageLink href="/">
        <Button size="lg">Return to Home</Button>
      </PageLink>
    </main>
  );
}
