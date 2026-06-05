import {
  AtomIcon,
  BoxIcon,
  CircuitBoardIcon,
  CodeXmlIcon,
  FlaskConicalIcon,
  FormInputIcon,
  GaugeIcon,
  GlobeIcon,
  LayoutDashboardIcon,
  PuzzleIcon,
  RouteIcon,
  ShieldCheckIcon,
  WebhookIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavPrimary } from "./NavPrimary";
import { SubscribeForm } from "./SubscribeForm";

const data = {
  navPrimary: [
    { title: "Dashboard", url: "/", icon: LayoutDashboardIcon },
    {
      title: "Fundamentals",
      url: "/fundamentals",
      icon: CodeXmlIcon,
    },
    { title: "Hooks & Effects", url: "/hooks-effects", icon: WebhookIcon },
    { title: "Routing", url: "/routing", icon: RouteIcon },
    {
      title: "Forms & Validation",
      url: "/forms-validation",
      icon: FormInputIcon,
    },
    { title: "State Management", url: "/state-management", icon: BoxIcon },
    { title: "Data Fetching", url: "/data-fetching", icon: GlobeIcon },
    { title: "UI Patterns", url: "/ui-patterns", icon: PuzzleIcon },
    { title: "Performance", url: "/performance", icon: GaugeIcon },
    { title: "Security", url: "/security", icon: ShieldCheckIcon },
    { title: "Testing", url: "/testing", icon: FlaskConicalIcon },
    { title: "Architecture", url: "/architecture", icon: CircuitBoardIcon },
  ],
};

export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <AtomIcon className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">React Lab</span>
                  <span className="">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavPrimary items={data.navPrimary} />
      </SidebarContent>
      <SidebarFooter>
        <SubscribeForm />
      </SidebarFooter>
    </Sidebar>
  );
}
