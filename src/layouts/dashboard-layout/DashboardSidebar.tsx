import {
  CreditCardIcon,
  GalleryVerticalEnd,
  LayoutDashboardIcon,
  PackageIcon,
  SettingsIcon,
  ShoppingCartIcon,
  UsersIcon,
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
    { title: "Orders", url: "/orders", icon: ShoppingCartIcon },
    { title: "Products", url: "/products", icon: PackageIcon },
    { title: "Employees", url: "/store/employees", icon: UsersIcon },
    { title: "Store Settings", url: "/store/settings", icon: SettingsIcon },
    { title: "Payments", url: "/payments", icon: CreditCardIcon },
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
              {/** biome-ignore lint/a11y/useValidAnchor: <explanation> */}
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
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
