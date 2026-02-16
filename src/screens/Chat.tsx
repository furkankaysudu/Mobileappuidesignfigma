import React from "react";
import { MobileFrame } from "../ui/shell";
import { Button, Card, Input } from "../ui/primitives";

export function Chat() {
  return (
    <MobileFrame title="Chat" right={<Button size="sm" variant="secondary">Call</Button>}>
      <div className="p-4">
        <Card className="p-4">
          <div className="grid gap-2">
            <Bubble from="driver" text="Hi, I'm 15 minutes away from pickup." />
            <Bubble from="me" text="Great — loading dock is Gate B." />
            <Bubble from="driver" text="Perfect. Any paperwork needed?" />
            <Bubble from="me" text="Just take a photo of POD at delivery." />
          </div>
        </Card>

        <div className="mt-3 flex gap-2">
          <Input className="flex-1" placeholder="Write a message…" />
          <Button>Send</Button>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <Button variant="secondary" size="sm">Any delay?</Button>
          <Button variant="secondary" size="sm">Arrived at pickup?</Button>
          <Button variant="secondary" size="sm">ETA to delivery?</Button>
        </div>
      </div>
    </MobileFrame>
  );
}

function Bubble({ from, text }: { from: "me" | "driver"; text: string }) {
  const mine = from === "me";
  return (
    <div className={mine ? "flex justify-end" : "flex justify-start"}>
      <div
        className={[
          "max-w-[80%] rounded-2xl px-3 py-2 text-sm",
          mine ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-900",
        ].join(" ")}
      >
        {text}
      </div>
    </div>
  );
}
