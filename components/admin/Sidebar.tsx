"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BarChart3,
  Package,
  Settings,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Overview", icon: <LayoutDashboard size={20} />, href: "/admin" },
    {
      name: "Analytics",
      icon: <BarChart3 size={20} />,
      href: "/admin/analytics",
    },
    {
      name: "Stock Manager",
      icon: <Package size={20} />,
      href: "/admin/stock",
    },
    { name: "Settings", icon: <Settings size={20} />, href: "/admin/settings" },
  ];

  return (
    <aside
      className="glass-panel"
      style={{
        width: "280px",
        height: "100vh",
        padding: "2rem 1.5rem",
        borderRadius: "0",
        borderLeft: "none",
        borderTop: "none",
        borderBottom: "none",
        display: "flex",
        flexDirection: "column",
        zIndex: 100,
        backgroundColor: "var(--bg2)",
        borderRight: "1px solid var(--border)",
      }}
    >
      <div style={{ marginBottom: "3rem", padding: "0 1rem" }}>
        <h2
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "1.5rem",
            color: "white",
            letterSpacing: "2px",
          }}
        >
          NEX<span style={{ color: "var(--accent)" }}>ZELLENZ</span>
          <span
            style={{
              fontSize: "0.65rem",
              display: "block",
              color: "var(--text-muted)",
              fontWeight: 400,
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: "1px",
              marginTop: "0.25rem",
            }}
          >
            ADMIN CONSOLE
          </span>
        </h2>
      </div>

      <nav style={{ display: "grid", gap: "0.5rem", flex: 1 }}>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-item ${isActive ? "active" : ""}`}
            >
              {item.icon}
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.85rem",
                }}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      <div
        style={{
          marginTop: "auto",
          borderTop: "1px solid var(--border)",
          paddingTop: "1.5rem",
        }}
      >
        <button
          onClick={() => {
            document.cookie =
              "auth=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
            window.location.href = "/admin/login";
          }}
          className="nav-item"
          style={{
            width: "100%",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          <LogOut size={20} />
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.85rem",
            }}
          >
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
