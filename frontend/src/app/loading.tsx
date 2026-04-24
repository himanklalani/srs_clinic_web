import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[999] bg-white flex flex-col items-center justify-center p-4">
      <div className="relative">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
        <div className="absolute inset-0 h-12 w-12 border-4 border-primary/20 rounded-full" />
      </div>
      <p className="mt-4 font-serif text-lg text-primary-dark animate-pulse italic">
        Loading dental care excellence...
      </p>
    </div>
  );
}
