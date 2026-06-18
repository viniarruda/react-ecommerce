import { Text } from "../../Atoms";
import { cn } from "../../../lib/utils";
import type { NavigationProps } from "./types";

export function Navigation({ links, currentPath, LinkComponent }: NavigationProps) {
  return (
    <nav className="hidden lg:flex items-center gap-8">
      {links.map((link) => {
        const isActive =
          currentPath === link.href ||
          (link.href !== "/" && currentPath.startsWith(link.href));

        return (
          <LinkComponent
            key={link.href}
            href={link.href}
            className={cn(
              "transition-colors relative pb-1",
              isActive ? "text-primary-600" : "text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400"
            )}
          >
            <Text size="md" weight="medium">
              {link.label}
            </Text>
            {isActive && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-full" />
            )}
          </LinkComponent>
        );
      })}
    </nav>
  );
}

