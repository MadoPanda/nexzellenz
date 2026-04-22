'use client';

import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import { usePathname } from "next/navigation";
import "./admin.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname.startsWith('/admin/login');

  if (isLoginPage) {
    return (
      <div className="admin-portal">
        {children}
      </div>
    );
  }

  return (
    <div className="admin-portal" style={{ display: 'flex', minHeight: '100vh', background: '#020617' }}>
      <div className="bg-mesh" />
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ padding: '2rem', overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
