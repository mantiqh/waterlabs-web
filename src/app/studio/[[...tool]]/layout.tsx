import type { ReactNode } from 'react';

export default function StudioLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-[9999] bg-white overflow-auto">
      {children}
    </div>
  );
}

