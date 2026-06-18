import React from "react";
import type { Preview, Decorator } from "@storybook/react";
import "@react-shop/design-system/src/styles/global.css";

// Minimal anchor-based LinkComponent used as a fallback for all stories.
// Components that accept a LinkComponent prop (Logo, CartIcon, Navigation, etc.)
// will automatically receive this via the global args below.
const MockLink: React.ComponentType<{
  href: string;
  className?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}> = ({ href, className, target, rel, onClick, children }) => (
  <a href={href} className={className} target={target} rel={rel} onClick={onClick}>
    {children}
  </a>
);

const preview: Preview = {
  // Global args are merged into every story's args automatically,
  // so components with a LinkComponent prop will always have a working one.
  args: {
    LinkComponent: MockLink,
  },
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#1a1a1a" },
      ],
    },
  },
};

export default preview;
