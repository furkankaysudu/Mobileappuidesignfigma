import { createBrowserRouter } from "react-router";
import { Dashboard } from "./screens/Dashboard";
import { CreateLoadWizard } from "./screens/CreateLoadWizard";
import { Offers } from "./screens/Offers";
import { Tracking } from "./screens/Tracking";
import { Chat } from "./screens/Chat";
import { Account } from "./screens/Account";
import { UXFlow } from "./screens/UXFlow";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Dashboard,
  },
  {
    path: "/create",
    Component: CreateLoadWizard,
  },
  {
    path: "/offers",
    Component: Offers,
  },
  {
    path: "/tracking",
    Component: Tracking,
  },
  {
    path: "/chat",
    Component: Chat,
  },
  {
    path: "/account",
    Component: Account,
  },
  {
    path: "/ux-flow",
    Component: UXFlow,
  },
]);