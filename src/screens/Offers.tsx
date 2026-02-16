import React from "react";
import { MobileFrame } from "../ui/shell";
import { Badge, Button, Card, CardHeader, Divider } from "../ui/primitives";

const offers = [
  { name: "Alex M.", rating: 4.8, vehicle: "Box truck", price: 420, eta: "25 min", trips: 182 },
  { name: "Nina K.", rating: 4.9, vehicle: "Sprinter", price: 390, eta: "40 min", trips: 96 },
  { name: "Sam R.", rating: 4.6, vehicle: "Box truck", price: 410, eta: "30 min", trips: 64 },
];

export function Offers() {
  return (
    <MobileFrame title="Driver Offers" right={<Badge tone="warning">Bidding</Badge>}>
      <div className="p-4 grid gap-3">
        <Card>
          <CardHeader title="Berlin → Hamburg" subtitle="Pickup today 10:00–12:00" />
          <Divider />
          <div className="p-4 text-xs text-neutral-500">
            Compare offers. Accept one to lock the booking. (UI-only)
          </div>
        </Card>

        {offers.map((o) => (
          <Card key={o.name}>
            <CardHeader
              title={o.name}
              subtitle={`${o.vehicle} • ${o.trips} trips`}
              right={<Badge tone="success">€{o.price}</Badge>}
            />
            <Divider />
            <div className="p-4 flex items-center justify-between gap-3">
              <div className="text-sm text-neutral-700">
                ⭐ {o.rating} <span className="text-neutral-400">•</span> ETA {o.eta}
              </div>
              <div className="flex gap-2">
                <Button variant="secondary">Message</Button>
                <Button>Accept</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </MobileFrame>
  );
}
