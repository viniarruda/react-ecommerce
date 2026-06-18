import { Container, Flex } from "../../Atoms";
import type { HeaderProps } from "./types";

export function Header({
  LogoComponent,
  SearchBarComponent,
  NavigationComponent,
  CartIconComponent,
  UserMenuComponent,
  MobileMenuComponent,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-800">
      <Container>
        <Flex className="h-16 items-center justify-between gap-4">
          {/* Logo */}
          {LogoComponent}

          {/* Desktop Navigation */}
          {NavigationComponent}

          {/* Search Bar (hidden on mobile) */}
          <div className="hidden md:flex flex-1 max-w-md">
            {SearchBarComponent}
          </div>

          {/* Right Actions */}
          <Flex className="items-center gap-2">
            {/* Cart Icon */}
            {CartIconComponent}

            {/* Desktop User Menu */}
            <div className="hidden lg:block">{UserMenuComponent}</div>

            {/* Mobile Menu */}
            {MobileMenuComponent}
          </Flex>
        </Flex>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">{SearchBarComponent}</div>
      </Container>
    </header>
  );
}
