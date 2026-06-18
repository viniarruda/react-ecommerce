import { Button, Text, Stack, Divider } from "../../Atoms";
import { cn } from "../../../lib/utils";
import type { MobileMenuProps } from "./types";

export function MobileMenu({
  user,
  onLogout,
  isOpen,
  onToggle,
  onClose,
  navLinks,
  currentPath,
  LinkComponent,
}: MobileMenuProps) {
  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={onToggle}
        className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 lg:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <Text size="lg" weight="semibold">
                Menu
              </Text>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* User Section */}
          {user ? (
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-lg">
                    {user.firstName?.[0] || ""}
                    {user.lastName?.[0] || ""}
                  </span>
                </div>
                <div>
                  <Text size="sm" weight="medium">
                    {user.firstName || ""} {user.lastName || ""}
                  </Text>
                  <Text size="xs" className="text-gray-500">
                    {user.email}
                  </Text>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 border-b border-gray-200">
              <Stack className="gap-2">
                <LinkComponent href="/login" onClick={onClose}>
                  <Button variant="outline" size="md" fullWidth>
                    Sign In
                  </Button>
                </LinkComponent>
                <LinkComponent href="/register" onClick={onClose}>
                  <Button variant="solid" size="md" fullWidth>
                    Sign Up
                  </Button>
                </LinkComponent>
              </Stack>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-4">
            <Stack className="gap-1">
              {navLinks.map((link) => {
                const isActive =
                  currentPath === link.href ||
                  (link.href !== "/" && currentPath.startsWith(link.href));

                return (
                  <LinkComponent
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-4 py-3 rounded-lg transition-colors",
                      isActive
                        ? "bg-primary-50 text-primary-600"
                        : "hover:bg-gray-50"
                    )}
                    onClick={onClose}
                  >
                    <Text size="md" weight={isActive ? "medium" : "normal"}>
                      {link.label}
                    </Text>
                  </LinkComponent>
                );
              })}

              {user && (
                <>
                  <Divider className="my-2" />
                  <LinkComponent
                    href="/account"
                    className="px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={onClose}
                  >
                    <Text size="md">My Account</Text>
                  </LinkComponent>
                  <LinkComponent
                    href="/account/orders"
                    className="px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={onClose}
                  >
                    <Text size="md">My Orders</Text>
                  </LinkComponent>
                  <LinkComponent
                    href="/cart"
                    className="px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={onClose}
                  >
                    <Text size="md">Cart</Text>
                  </LinkComponent>
                </>
              )}
            </Stack>
          </nav>

          {/* Logout Button */}
          {user && (
            <div className="p-4 border-t border-gray-200">
              <Button
                variant="outline"
                size="md"
                fullWidth
                onClick={() => {
                  onClose();
                  onLogout?.();
                }}
                className="text-red-600 border-red-600 hover:bg-red-50"
              >
                Sign Out
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
