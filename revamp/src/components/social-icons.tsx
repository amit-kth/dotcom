/* ============================================================================
   SocialIcons  —  the four-plus-one brand marks
   ----------------------------------------------------------------------------
   Hand-drawn paths rather than an icon package: `lucide-react` (the only icon
   set this project installs) does not ship brand logos, and a social row made
   of generic circles reads worse than no social row at all.

   Each is a single path on a 24x24 grid, filled with currentColor, so the
   button's hover colour is the only thing that has to be styled.

   These are trademarks of their owners and are used only to link to Kriscent's
   own profiles, which is the conventional use.
   ========================================================================== */

type IconProps = { className?: string };

export function LinkedInIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C21.3 8.65 22 11 22 14.1V21h-4v-6.1c0-1.46-.03-3.34-2.03-3.34-2.03 0-2.34 1.58-2.34 3.23V21h-4V9Z" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.2c2.67 0 2.99.01 4.04.06 1.05.05 1.77.21 2.4.46.65.25 1.2.59 1.75 1.14.55.55.89 1.1 1.14 1.75.25.63.41 1.35.46 2.4.05 1.05.06 1.37.06 4.04s-.01 2.99-.06 4.04c-.05 1.05-.21 1.77-.46 2.4-.25.65-.59 1.2-1.14 1.75-.55.55-1.1.89-1.75 1.14-.63.25-1.35.41-2.4.46-1.05.05-1.37.06-4.04.06s-2.99-.01-4.04-.06c-1.05-.05-1.77-.21-2.4-.46a4.8 4.8 0 0 1-1.75-1.14 4.8 4.8 0 0 1-1.14-1.75c-.25-.63-.41-1.35-.46-2.4C2.21 14.99 2.2 14.67 2.2 12s.01-2.99.06-4.04c.05-1.05.21-1.77.46-2.4.25-.65.59-1.2 1.14-1.75A4.8 4.8 0 0 1 5.61 2.67c.63-.25 1.35-.41 2.4-.46C9.01 2.21 9.33 2.2 12 2.2Zm0 1.8c-2.62 0-2.92.01-3.95.06-.79.04-1.22.17-1.5.28-.38.15-.65.32-.94.61-.29.29-.46.56-.61.94-.11.28-.24.71-.28 1.5-.05 1.03-.06 1.33-.06 3.95s.01 2.92.06 3.95c.04.79.17 1.22.28 1.5.15.38.32.65.61.94.29.29.56.46.94.61.28.11.71.24 1.5.28 1.03.05 1.33.06 3.95.06s2.92-.01 3.95-.06c.79-.04 1.22-.17 1.5-.28.38-.15.65-.32.94-.61.29-.29.46-.56.61-.94.11-.28.24-.71.28-1.5.05-1.03.06-1.33.06-3.95s-.01-2.92-.06-3.95c-.04-.79-.17-1.22-.28-1.5a2.6 2.6 0 0 0-.61-.94 2.6 2.6 0 0 0-.94-.61c-.28-.11-.71-.24-1.5-.28-1.03-.05-1.33-.06-3.95-.06Zm0 3.06a4.94 4.94 0 1 1 0 9.88 4.94 4.94 0 0 1 0-9.88Zm0 8.14a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Zm6.28-8.35a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0Z" />
    </svg>
  );
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.87.24-1.46 1.5-1.46h1.6V4.44c-.28-.04-1.23-.12-2.34-.12-2.3 0-3.88 1.4-3.88 3.98V10.5H7.5v3h2.88V21h3.12Z" />
    </svg>
  );
}

export function XIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.2 3h3.3l-7.2 8.23L21.8 21h-6.6l-5.17-6.76L3.99 21H.68l7.7-8.8L.5 3h6.77l4.67 6.18L17.2 3Zm-1.16 16.05h1.83L6.06 4.84H4.1l11.94 14.21Z" />
    </svg>
  );
}

export function YouTubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77C22 15.2 22 12 22 12s0-3.2-.4-4.8ZM10 15.28V8.72L15.5 12 10 15.28Z" />
    </svg>
  );
}

export const SOCIAL_ICONS = {
  LinkedIn: LinkedInIcon,
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
  X: XIcon,
  YouTube: YouTubeIcon,
} as const;
