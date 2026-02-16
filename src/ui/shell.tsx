import React from "react";
import { cn, Badge } from "./primitives";
import { Link, useLocation } from "react-router";

export function MobileFrame({
  children,
  title,
  right,
}: {
  children: React.ReactNode;
  title: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-neutral-100 p-4">
      <div className="mx-auto w-full max-w-[420px] overflow-hidden rounded-[32px] border border-neutral-200 bg-white shadow">
        <TopBar title={title} right={right} />
        <div className="pb-20">{children}</div>
        <BottomNav />
      </div>
    </div>
  );
}

export function TopBar({
  title,
  right,
}: {
  title: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="sticky top-0 z-10 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="text-sm font-semibold text-neutral-900">{title}</div>
        {right ? <div>{right}</div> : <Badge>Owner</Badge>}
      </div>
    </div>
  );
}

function NavItem({
  label,
  to,
  active,
}: {
  label: string;
  to: string;
  active?: boolean;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "flex flex-col items-center gap-1 rounded-xl px-3 py-2 text-xs transition",
        active ? "bg-neutral-100 text-neutral-900" : "text-neutral-500 hover:bg-neutral-50"
      )}
    >
      <div className={cn("h-2 w-2 rounded-full", active ? "bg-neutral-900" : "bg-neutral-300")} />
      {label}
    </Link>
  );
}

export function BottomNav() {
  const location = useLocation();
  
  return (
    <div className="fixed inset-x-0 bottom-4 mx-auto w-full max-w-[420px] px-4">
      <div className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-white px-2 py-2 shadow">
        <NavItem label="Home" to="/" active={location.pathname === "/"} />
        <NavItem label="Loads" to="/offers" active={location.pathname === "/offers"} />
        <NavItem label="Track" to="/tracking" active={location.pathname === "/tracking"} />
        <NavItem label="Messages" to="/chat" active={location.pathname === "/chat"} />
        <NavItem label="Account" to="/account" active={location.pathname === "/account"} />
      </div>
    </div>
  );
}
