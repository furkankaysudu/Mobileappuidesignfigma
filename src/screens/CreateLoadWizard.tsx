import React, { useMemo, useState } from "react";
import { MobileFrame } from "../ui/shell";
import {
  Badge,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Input,
  Segmented,
  Select,
  Stepper,
  Textarea,
  cn,
} from "../ui/primitives";

type Mode = "quick" | "advanced";

const STEPS_QUICK = ["Pickup", "Drop-off", "Load", "Plan", "Review"];
const STEPS_ADV = ["Pickup", "Drop-off", "Load", "Plan", "Vehicle", "Handling", "Pricing", "Review"];

export function CreateLoadWizard() {
  const [mode, setMode] = useState<Mode>("quick");
  const steps = mode === "quick" ? STEPS_QUICK : STEPS_ADV;
  const [step, setStep] = useState(0);

  // UI-only form state (no backend)
  const [form, setForm] = useState({
    pickupLocation: "Berlin, DE",
    pickupDate: "2026-02-03",
    pickupFrom: "10:00",
    pickupTo: "12:00",
    dropLocation: "Hamburg, DE",
    dropDate: "2026-02-03",
    dropFrom: "14:00",
    dropTo: "18:00",
    loadType: "General goods",
    weight: "800",
    volume: "",
    quantity: "10",
    planType: "recommended" as "negotiate" | "recommended" | "shared",
    vehicleType: "Box truck",
    reqs: { reefer: false, liftgate: false, tarp: false },
    loadingMethod: "Dock",
    notes: "",
    pricingMode: "fixed" as "fixed" | "quotes",
    price: "420",
    payment: "Card",
  });

  const set = (k: string, v: any) => setForm((p) => ({ ...p, [k]: v }));
  const toggleReq = (k: "reefer" | "liftgate" | "tarp") =>
    setForm((p) => ({ ...p, reqs: { ...p.reqs, [k]: !p.reqs[k] } }));

  const canGoNext = true; // UI-only; add validation later
  const atEnd = step === steps.length - 1;

  const title = useMemo(() => (mode === "quick" ? "Quick Post" : "Advanced Post"), [mode]);

  return (
    <MobileFrame
      title="Create Load"
      right={<Badge>{title}</Badge>}
    >
      <Stepper steps={steps} current={step} />

      <div className="p-4 grid gap-3">
        {/* Mode switch (UI-only) */}
        <Card>
          <div className="p-3">
            <Segmented
              options={[
                { label: "Quick Post", value: "quick" },
                { label: "Advanced", value: "advanced" },
              ]}
              value={mode}
              onChange={(v) => {
                const next = v as Mode;
                setMode(next);
                setStep(0);
              }}
            />
            <div className="mt-2 text-xs text-neutral-500">
              Quick Post uses smart defaults. Advanced lets you specify vehicle, handling, and pricing details.
            </div>
          </div>
        </Card>

        {steps[step] === "Pickup" && (
          <Section title="Pickup details" subtitle="Where and when the driver should pick up">
            <Input
              label="Pickup location"
              value={form.pickupLocation}
              onChange={(e) => set("pickupLocation", e.target.value)}
              placeholder="Search address or city"
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Pickup date"
                type="date"
                value={form.pickupDate}
                onChange={(e) => set("pickupDate", e.target.value)}
              />
              <div className="grid grid-cols-2 gap-2">
                <Input
                  label="From"
                  type="time"
                  value={form.pickupFrom}
                  onChange={(e) => set("pickupFrom", e.target.value)}
                />
                <Input
                  label="To"
                  type="time"
                  value={form.pickupTo}
                  onChange={(e) => set("pickupTo", e.target.value)}
                />
              </div>
            </div>
          </Section>
        )}

        {steps[step] === "Drop-off" && (
          <Section title="Drop-off details" subtitle="Where and when the delivery should happen">
            <Input
              label="Drop-off location"
              value={form.dropLocation}
              onChange={(e) => set("dropLocation", e.target.value)}
              placeholder="Search address or city"
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Delivery date"
                type="date"
                value={form.dropDate}
                onChange={(e) => set("dropDate", e.target.value)}
              />
              <div className="grid grid-cols-2 gap-2">
                <Input
                  label="From"
                  type="time"
                  value={form.dropFrom}
                  onChange={(e) => set("dropFrom", e.target.value)}
                />
                <Input
                  label="To"
                  type="time"
                  value={form.dropTo}
                  onChange={(e) => set("dropTo", e.target.value)}
                />
              </div>
            </div>
          </Section>
        )}

        {steps[step] === "Load" && (
          <Section title="Load details" subtitle="Basic cargo information">
            <Select
              label="Load type"
              value={form.loadType}
              onChange={(e) => set("loadType", e.target.value)}
            >
              <option>General goods</option>
              <option>Furniture</option>
              <option>Food (non-refrigerated)</option>
              <option>Refrigerated</option>
              <option>Construction materials</option>
            </Select>

            <div className="grid grid-cols-3 gap-3">
              <Input
                label="Weight (kg)"
                value={form.weight}
                onChange={(e) => set("weight", e.target.value)}
                placeholder="e.g. 800"
              />
              <Input
                label="Volume (m³)"
                value={form.volume}
                onChange={(e) => set("volume", e.target.value)}
                placeholder="optional"
              />
              <Input
                label="Quantity"
                value={form.quantity}
                onChange={(e) => set("quantity", e.target.value)}
                placeholder="e.g. 10"
              />
            </div>

            <AdvancedBlock>
              <div className="grid grid-cols-2 gap-3">
                <Select label="Packaging">
                  <option>Pallets</option>
                  <option>Boxes</option>
                  <option>Loose</option>
                </Select>
                <Select label="Stackable?">
                  <option>Yes</option>
                  <option>No</option>
                </Select>
              </div>
            </AdvancedBlock>
          </Section>
        )}

        {steps[step] === "Plan" && (
          <Section title="Choose your plan" subtitle="Select how you'd like to work with drivers">
            <div className="grid gap-3">
              <PlanCard
                selected={form.planType === "negotiate"}
                onClick={() => set("planType", "negotiate")}
                icon="💬"
                title="Negotiate the price with the driver"
                description="Chat with drivers and agree on a price that works for both parties"
              />
              <PlanCard
                selected={form.planType === "recommended"}
                onClick={() => set("planType", "recommended")}
                icon="✅"
                title="Recommended price"
                description="We'll suggest the best market price based on distance and load specifications"
                badge="Popular"
              />
              <PlanCard
                selected={form.planType === "shared"}
                onClick={() => set("planType", "shared")}
                icon="🚛"
                title="Share the vehicle"
                description="Best for small loads. Split costs with other shipments on the same route"
                badge="Save money"
              />
            </div>
          </Section>
        )}

        {steps[step] === "Vehicle" && (
          <Section title="Vehicle preferences" subtitle="Help us match the right driver">
            <Select
              label="Vehicle type"
              value={form.vehicleType}
              onChange={(e) => set("vehicleType", e.target.value)}
            >
              <option>Sprinter / Van</option>
              <option>Box truck</option>
              <option>Flatbed</option>
              <option>Trailer</option>
            </Select>

            <div>
              <div className="mb-2 text-xs font-medium text-neutral-700">Special requirements</div>
              <div className="flex flex-wrap gap-2">
                <Chip selected={form.reqs.reefer} onClick={() => toggleReq("reefer")}>Refrigerated</Chip>
                <Chip selected={form.reqs.liftgate} onClick={() => toggleReq("liftgate")}>Liftgate</Chip>
                <Chip selected={form.reqs.tarp} onClick={() => toggleReq("tarp")}>Tarp</Chip>
              </div>
              <div className="mt-2 text-xs text-neutral-500">
                Tip: pick only what's required — fewer constraints improves matching.
              </div>
            </div>
          </Section>
        )}

        {steps[step] === "Handling" && (
          <Section title="Handling & instructions" subtitle="Anything the driver should know">
            <Select
              label="Loading method"
              value={form.loadingMethod}
              onChange={(e) => set("loadingMethod", e.target.value)}
            >
              <option>Dock</option>
              <option>Forklift</option>
              <option>Hand load</option>
              <option>Curbside</option>
            </Select>
            <Textarea
              label="Special notes"
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              placeholder="Gate codes, contact person, fragile notes…"
            />
            <UploadStub />
          </Section>
        )}

        {steps[step] === "Pricing" && (
          <Section title="Pricing" subtitle="Set a price or request quotes">
            <Segmented
              options={[
                { label: "Set price", value: "fixed" },
                { label: "Request quotes", value: "quotes" },
              ]}
              value={form.pricingMode}
              onChange={(v) => set("pricingMode", v as any)}
            />

            {form.pricingMode === "fixed" ? (
              <Input
                label="Offer price (€)"
                value={form.price}
                onChange={(e) => set("price", e.target.value)}
                hint="Drivers see this as a fixed offer."
              />
            ) : (
              <Card className="p-4 bg-neutral-50">
                <div className="text-sm font-semibold text-neutral-900">Quote mode</div>
                <div className="mt-1 text-xs text-neutral-600">
                  Drivers will send offers. You can compare and accept the best one.
                </div>
              </Card>
            )}

            <Select
              label="Payment method"
              value={form.payment}
              onChange={(e) => set("payment", e.target.value)}
            >
              <option>Card</option>
              <option>Invoice</option>
              <option>Wallet</option>
            </Select>

            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">Estimated market range</div>
                <Badge tone="warning">UI-only</Badge>
              </div>
              <div className="mt-1 text-xs text-neutral-500">€390 – €470 based on distance and specs</div>
            </Card>
          </Section>
        )}

        {steps[step] === "Review" && (
          <Section title="Review & post" subtitle="Check everything before publishing">
            <Card>
              <CardHeader title="Route" subtitle="Pickup → Drop-off" right={<Button variant="ghost" size="sm">Edit</Button>} />
              <Divider />
              <div className="p-4 text-sm text-neutral-800 grid gap-2">
                <Row k="Pickup" v={`${form.pickupLocation} • ${form.pickupDate} ${form.pickupFrom}-${form.pickupTo}`} />
                <Row k="Drop-off" v={`${form.dropLocation} • ${form.dropDate} ${form.dropFrom}-${form.dropTo}`} />
              </div>
            </Card>

            <Card>
              <CardHeader title="Load" subtitle="Cargo details" right={<Button variant="ghost" size="sm">Edit</Button>} />
              <Divider />
              <div className="p-4 text-sm text-neutral-800 grid gap-2">
                <Row k="Type" v={form.loadType} />
                <Row k="Weight" v={`${form.weight} kg`} />
                <Row k="Quantity" v={form.quantity} />
              </div>
            </Card>

            <Card>
              <CardHeader title="Plan" subtitle="How you'll work with drivers" right={<Button variant="ghost" size="sm">Edit</Button>} />
              <Divider />
              <div className="p-4 text-sm text-neutral-800 grid gap-2">
                <Row 
                  k="Plan type" 
                  v={
                    form.planType === "negotiate" 
                      ? "Negotiate with driver" 
                      : form.planType === "recommended" 
                      ? "Recommended price" 
                      : "Shared vehicle"
                  } 
                />
              </div>
            </Card>

            {mode === "advanced" && (
              <Card>
                <CardHeader title="Vehicle & handling" subtitle="Requirements and notes" right={<Button variant="ghost" size="sm">Edit</Button>} />
                <Divider />
                <div className="p-4 text-sm text-neutral-800 grid gap-2">
                  <Row k="Vehicle" v={form.vehicleType} />
                  <Row
                    k="Requirements"
                    v={[
                      form.reqs.reefer ? "Reefer" : null,
                      form.reqs.liftgate ? "Liftgate" : null,
                      form.reqs.tarp ? "Tarp" : null,
                    ].filter(Boolean).join(", ") || "None"}
                  />
                  <Row k="Loading" v={form.loadingMethod} />
                  <Row k="Notes" v={form.notes || "—"} />
                </div>
              </Card>
            )}

            <Card>
              <CardHeader title="Pricing" subtitle="How you'll pay" right={<Button variant="ghost" size="sm">Edit</Button>} />
              <Divider />
              <div className="p-4 text-sm text-neutral-800 grid gap-2">
                <Row k="Mode" v={form.pricingMode === "fixed" ? "Fixed price" : "Request quotes"} />
                <Row k="Price" v={form.pricingMode === "fixed" ? `€${form.price}` : "Driver offers"} />
                <Row k="Payment" v={form.payment} />
              </div>
            </Card>

            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-xs text-neutral-600">
              By posting, you agree to the platform terms. (UI-only placeholder)
            </div>
          </Section>
        )}
      </div>

      {/* Sticky footer actions */}
      <div className="fixed inset-x-0 bottom-[84px] mx-auto w-full max-w-[420px] px-4">
        <div className="rounded-2xl border border-neutral-200 bg-white p-2 shadow">
          <div className="flex gap-2">
            <Button
              className="flex-1"
              variant="secondary"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
            >
              Back
            </Button>

            <Button
              className={cn("flex-[1.2]")}
              onClick={() => {
                if (atEnd) return;
                if (canGoNext) setStep((s) => Math.min(steps.length - 1, s + 1));
              }}
            >
              {atEnd ? "Post Load" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </MobileFrame>
  );
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader title={title} subtitle={subtitle} />
      <Divider />
      <div className="p-4 grid gap-3">{children}</div>
    </Card>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="text-neutral-500 text-xs">{k}</div>
      <div className="text-neutral-900 text-sm text-right">{v}</div>
    </div>
  );
}

function AdvancedBlock({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-3">
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="flex w-full items-center justify-between text-sm font-medium"
      >
        Advanced specs
        <span className="text-neutral-500 text-xs">{open ? "Hide" : "Show"}</span>
      </button>
      {open ? <div className="mt-3 grid gap-3">{children}</div> : null}
    </div>
  );
}

function UploadStub() {
  return (
    <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-4">
      <div className="text-sm font-semibold text-neutral-900">Upload (optional)</div>
      <div className="mt-1 text-xs text-neutral-500">Add a photo or document for drivers.</div>
      <div className="mt-3">
        <Button variant="secondary" className="w-full">Choose file</Button>
      </div>
    </div>
  );
}

function PlanCard({
  selected,
  onClick,
  icon,
  title,
  description,
  badge,
}: {
  selected: boolean;
  onClick: () => void;
  icon: string;
  title: string;
  description: string;
  badge?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-2xl border-2 p-4 text-left transition-all cursor-pointer",
        selected
          ? "border-emerald-500 bg-emerald-50 shadow-sm"
          : "border-neutral-200 bg-white hover:border-neutral-300"
      )}
    >
      <div className="flex items-start gap-3">
        <div className="text-2xl">{icon}</div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <div className={cn(
              "text-sm font-semibold",
              selected ? "text-emerald-900" : "text-neutral-900"
            )}>
              {title}
            </div>
            {badge && (
              <Badge
                className="text-xs"
                tone={badge === "Popular" ? "success" : "warning"}
              >
                {badge}
              </Badge>
            )}
          </div>
          <div className={cn(
            "mt-1 text-xs",
            selected ? "text-emerald-700" : "text-neutral-500"
          )}>
            {description}
          </div>
        </div>
        {selected && (
          <div className="text-emerald-600 text-lg">✓</div>
        )}
      </div>
    </button>
  );
}