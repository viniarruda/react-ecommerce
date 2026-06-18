import { Badge } from "../../Atoms";
import type { CartIconProps } from "./types";

export function CartIcon({ itemCount = 0, LinkComponent }: CartIconProps) {
  return (
    <LinkComponent href="/cart" className="relative">
      <div className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-700 dark:text-gray-200">
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
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
        {itemCount > 0 && (
          <div className="absolute -top-1 -right-1">
            <Badge
              variant="solid"
              className="bg-primary-600 text-white px-1.5 py-0.5 text-xs"
            >
              {itemCount > 99 ? "99+" : itemCount}
            </Badge>
          </div>
        )}
      </div>
    </LinkComponent>
  );
}

