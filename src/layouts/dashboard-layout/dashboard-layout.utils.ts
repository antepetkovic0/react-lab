export function isSidebarItemActive(url: string, pathname: string) {
  if (url === "/") {
    return pathname === "/";
  }

  return pathname === url || pathname.startsWith(`${url}/`);
}
