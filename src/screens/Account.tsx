import React from "react";
import { MobileFrame } from "../ui/shell";
import { Button, Card, CardHeader, Divider } from "../ui/primitives";

export function Account() {
  return (
    <MobileFrame title="Account">
      <div className="p-4 grid gap-3">
        <Card>
          <CardHeader 
            title="Profile" 
            subtitle="Manage your account settings"
          />
          <Divider />
          <div className="p-4 grid gap-3">
            <Button variant="secondary">Edit Profile</Button>
            <Button variant="secondary">Payment Methods</Button>
            <Button variant="secondary">Documents</Button>
            <Button variant="secondary">Settings</Button>
          </div>
        </Card>

        <Card>
          <CardHeader 
            title="Statistics" 
            subtitle="Your activity overview"
          />
          <Divider />
          <div className="p-4 grid grid-cols-2 gap-3 text-center">
            <div className="rounded-xl bg-neutral-50 p-3">
              <div className="text-2xl font-semibold text-neutral-900">42</div>
              <div className="mt-1 text-xs text-neutral-500">Total Loads</div>
            </div>
            <div className="rounded-xl bg-neutral-50 p-3">
              <div className="text-2xl font-semibold text-neutral-900">€18.2k</div>
              <div className="mt-1 text-xs text-neutral-500">Total Spent</div>
            </div>
            <div className="rounded-xl bg-neutral-50 p-3">
              <div className="text-2xl font-semibold text-neutral-900">4.9</div>
              <div className="mt-1 text-xs text-neutral-500">Rating</div>
            </div>
            <div className="rounded-xl bg-neutral-50 p-3">
              <div className="text-2xl font-semibold text-neutral-900">98%</div>
              <div className="mt-1 text-xs text-neutral-500">On-time</div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-4 grid gap-3">
            <Button variant="secondary">Help & Support</Button>
            <Button variant="secondary">Terms & Privacy</Button>
            <Button variant="danger">Logout</Button>
          </div>
        </Card>
      </div>
    </MobileFrame>
  );
}
