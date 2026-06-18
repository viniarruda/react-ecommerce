import { Heading } from "../../Atoms";
import type { LogoProps } from "./types";

export function Logo({
  LinkComponent,
  name = "React Shop",
  abbrev = "R",
  logoUrl,
}: LogoProps) {
  return (
    <LinkComponent href="/" className="flex items-center gap-2">
      <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
        {logoUrl ? (
          <img src={logoUrl} alt={name} className="w-full h-full object-contain" />
        ) : (
          <span className="text-white font-bold text-xl">{abbrev[0]}</span>
        )}
      </div>
      <Heading as="h1" size="lg" className="text-gray-900 dark:text-white whitespace-nowrap">
        {name}
      </Heading>
    </LinkComponent>
  );
}

