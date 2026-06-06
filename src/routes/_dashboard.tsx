import { createFileRoute, Outlet } from "@tanstack/react-router";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { DashboardSearch } from "@/layouts/dashboard-layout/DashboardSearch";
import { DashboardSidebar } from "@/layouts/dashboard-layout/DashboardSidebar";

export const Route = createFileRoute("/_dashboard")({
  component: RootComponent,
});

function RootComponent() {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <header className="sticky top-0 flex h-16 shrink-0 items-center justify-center border-b bg-background px-4">
          <SidebarTrigger className="absolute left-4 -ml-1" />
          <DashboardSearch />
        </header>
        <main className="w-full">
          <div className="px-8 pt-8 pb-4">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
