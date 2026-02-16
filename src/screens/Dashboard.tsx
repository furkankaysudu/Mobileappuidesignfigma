import React from "react";
import { MobileFrame } from "../ui/shell";
import { Button, Card, CardHeader, Badge, Divider } from "../ui/primitives";
import { Link } from "react-router";

export function Dashboard() {
  return (
    <MobileFrame
      title="Dashboard"
      right={
        <Link to="/ux-flow">
          <Button size="sm" variant="secondary">UX Flow</Button>
        </Link>
      }
    >
      <div className="p-4">
        <div className="sticky top-[52px] z-[1] -mx-4 px-4 py-2 bg-white/80 backdrop-blur border-b border-neutral-200">
          <Link to="/create">
            <Button className="w-full" size="lg">
              + Post a Load
            </Button>
          </Link>
        </div>

        <div className="mt-4 grid gap-3">
          <Card>
            <CardHeader
              title="Active Loads"
              subtitle="Your currently open or booked loads"
              right={<Badge tone="success">3 Active</Badge>}
            />
            <Divider />
            <div className="p-4 grid gap-3">
              <LoadRow
                title="Berlin → Hamburg"
                meta="Pickup today 10:00–12:00"
                status="Bidding"
              />
              <LoadRow
                title="Munich → Stuttgart"
                meta="Pickup Feb 5 • Refrigerated"
                status="Assigned"
              />
              <LoadRow
                title="Leipzig → Dresden"
                meta="In transit • ETA 16:40"
                status="In transit"
              />
              <Button variant="ghost" className="w-full">View all loads</Button>
            </div>
          </Card>

          <Card>
            <CardHeader title="Quick Actions" subtitle="Jump right in" />
            <div className="p-4 grid grid-cols-2 gap-3">
              <Link to="/tracking">
                <Button variant="secondary" className="w-full">Track shipment</Button>
              </Link>
              <Link to="/chat">
                <Button variant="secondary" className="w-full">Messages</Button>
              </Link>
              <Link to="/create">
                <Button variant="secondary" className="w-full">Repost load</Button>
              </Link>
              <Button variant="secondary">Invoices</Button>
            </div>
          </Card>

          <Card>
            <CardHeader title="Notifications" subtitle="Most recent updates" />
            <div className="p-4 grid gap-2 text-sm">
              <Notif text="Driver Alex offered €420 for Berlin → Hamburg." />
              <Notif text="Shipment #1245 marked Loaded." />
              <Notif text="New message from Driver Nina." />
            </div>
          </Card>
        </div>
      </div>
    </MobileFrame>
  );
}

function LoadRow({ title, meta, status }: { title: string; meta: string; status: string }) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-xl border border-neutral-200 bg-white p-3">
      <div>
        <div className="text-sm font-semibold text-neutral-900">{title}</div>
        <div className="mt-1 text-xs text-neutral-500">{meta}</div>
      </div>
      <Badge tone={status === "Assigned" ? "success" : status === "In transit" ? "warning" : "neutral"}>
        {status}
      </Badge>
    </div>
  );
}

function Notif({ text }: { text: string }) {
  return (
    <div className="rounded-xl bg-neutral-50 p-3 text-neutral-700">
      {text}
    </div>
  );
}