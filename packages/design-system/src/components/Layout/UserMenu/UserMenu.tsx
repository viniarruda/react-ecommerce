import { Button, Text, Stack } from "../../Atoms";
import type { UserMenuProps } from "./types";

export function UserMenu({
  user,
  onLogout,
  isOpen,
  onToggle,
  onClose,
  LinkComponent,
  menuRef,
}: UserMenuProps) {
  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <LinkComponent href="/login">
          <Button variant="ghost" size="sm">
            Sign In
          </Button>
        </LinkComponent>
        <LinkComponent href="/register">
          <Button variant="solid" size="sm">
            Sign Up
          </Button>
        </LinkComponent>
      </div>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={onToggle}
        className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
          <span className="text-white font-medium text-sm">
            {user.firstName?.[0] || ""}
            {user.lastName?.[0] || ""}
          </span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          <div className="px-4 py-3 border-b border-gray-200">
            <Text size="sm" weight="medium" className="text-gray-900">
              {user.firstName || ""} {user.lastName || ""}
            </Text>
            <Text size="xs" className="text-gray-500">
              {user.email}
            </Text>
          </div>

          <Stack className="py-2">
            <LinkComponent
              href="/account"
              className="px-4 py-2 hover:bg-gray-50 transition-colors"
              onClick={onClose}
            >
              <Text size="sm">My Account</Text>
            </LinkComponent>
            <LinkComponent
              href="/account/orders"
              className="px-4 py-2 hover:bg-gray-50 transition-colors"
              onClick={onClose}
            >
              <Text size="sm">My Orders</Text>
            </LinkComponent>
            <LinkComponent
              href="/cart"
              className="px-4 py-2 hover:bg-gray-50 transition-colors"
              onClick={onClose}
            >
              <Text size="sm">Cart</Text>
            </LinkComponent>
          </Stack>

          <div className="border-t border-gray-200 pt-2">
            <button
              onClick={() => {
                onClose();
                onLogout?.();
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors"
            >
              <Text size="sm" className="text-red-600">
                Sign Out
              </Text>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

