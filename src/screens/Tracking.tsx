import React from "react";
import { MobileFrame } from "../ui/shell";
import { Badge, Button, Card, CardHeader, Divider } from "../ui/primitives";

const steps = [
  { label: "Assigned", done: true },
  { label: "En route to pickup", done: true },
  { label: "Loaded", done: true },
  { label: "In transit", done: false, current: true },
  { label: "Delivered", done: false },
];

export function Tracking() {
  return (
    <MobileFrame title="Tracking" right={<Badge tone="warning">In transit</Badge>}>
      <div className="p-4 grid gap-3">
        <Card>
          <CardHeader title="Shipment #1245" subtitle="Berlin → Hamburg" right={<Button size="sm" variant="secondary">Support</Button>} />
          <Divider />
          <div className="p-4 grid gap-3">
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
              <div className="text-sm font-semibold">Map placeholder</div>
              <div className="mt-1 text-xs text-neutral-500">Use a real map later — this is UI-only.</div>
              <div className="mt-3 h-28 rounded-xl bg-white border border-neutral-200" />
            </div>

            <div className="grid gap-2">
              {steps.map((s) => (
                <div key={s.label} className="flex items-center gap-3">
                  <div
                    className={[
                      "h-2.5 w-2.5 rounded-full",
                      s.done ? "bg-neutral-900" : s.current ? "bg-neutral-500" : "bg-neutral-200",
                    ].join(" ")}
                  />
                  <div className="text-sm text-neutral-800">{s.label}</div>
                  {s.current ? <Badge>Now</Badge> : null}
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Button className="flex-1" variant="secondary">Call driver</Button>
              <Button className="flex-1">Message</Button>
            </div>
          </div>
        </Card>
      </div>
    </MobileFrame>
  );
}
