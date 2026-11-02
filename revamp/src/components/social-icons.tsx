/* ============================================================================
   SocialIcons ,  the four-plus-one brand marks
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
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C21.3 8.65 22 11 22 14.1V21h-4v-6.1c0-1.46-.03-3.34-2.03-3.34-2.03 0-2.34 1.58-2.34 3.23V21h-4V9Z" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2.2c2.67 0 2.99.01 4.04.06 1.05.05 1.77.21 2.4.46.65.25 1.2.59 1.75 1.14.55.55.89 1.1 1.14 1.75.25.63.41 1.35.46 2.4.05 1.05.06 1.37.06 4.04s-.01 2.99-.06 4.04c-.05 1.05-.21 1.77-.46 2.4-.25.65-.59 1.2-1.14 1.75-.55.55-1.1.89-1.75 1.14-.63.25-1.35.41-2.4.46-1.05.05-1.37.06-4.04.06s-2.99-.01-4.04-.06c-1.05-.05-1.77-.21-2.4-.46a4.8 4.8 0 0 1-1.75-1.14 4.8 4.8 0 0 1-1.14-1.75c-.25-.63-.41-1.35-.46-2.4C2.21 14.99 2.2 14.67 2.2 12s.01-2.99.06-4.04c.05-1.05.21-1.77.46-2.4.25-.65.59-1.2 1.14-1.75A4.8 4.8 0 0 1 5.61 2.67c.63-.25 1.35-.41 2.4-.46C9.01 2.21 9.33 2.2 12 2.2Zm0 1.8c-2.62 0-2.92.01-3.95.06-.79.04-1.22.17-1.5.28-.38.15-.65.32-.94.61-.29.29-.46.56-.61.94-.11.28-.24.71-.28 1.5-.05 1.03-.06 1.33-.06 3.95s.01 2.92.06 3.95c.04.79.17 1.22.28 1.5.15.38.32.65.61.94.29.29.56.46.94.61.28.11.71.24 1.5.28 1.03.05 1.33.06 3.95.06s2.92-.01 3.95-.06c.79-.04 1.22-.17 1.5-.28.38-.15.65-.32.94-.61.29-.29.46-.56.61-.94.11-.28.24-.71.28-1.5.05-1.03.06-1.33.06-3.95s-.01-2.92-.06-3.95c-.04-.79-.17-1.22-.28-1.5a2.6 2.6 0 0 0-.61-.94 2.6 2.6 0 0 0-.94-.61c-.28-.11-.71-.24-1.5-.28-1.03-.05-1.33-.06-3.95-.06Zm0 3.06a4.94 4.94 0 1 1 0 9.88 4.94 4.94 0 0 1 0-9.88Zm0 8.14a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Zm6.28-8.35a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0Z" />
    </svg>
  );
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.87.24-1.46 1.5-1.46h1.6V4.44c-.28-.04-1.23-.12-2.34-.12-2.3 0-3.88 1.4-3.88 3.98V10.5H7.5v3h2.88V21h3.12Z" />
    </svg>
  );
}

export function XIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.2 3h3.3l-7.2 8.23L21.8 21h-6.6l-5.17-6.76L3.99 21H.68l7.7-8.8L.5 3h6.77l4.67 6.18L17.2 3Zm-1.16 16.05h1.83L6.06 4.84H4.1l11.94 14.21Z" />
    </svg>
  );
}

export function YouTubeIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
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

/** WhatsApp brand mark, used only for the WhatsApp chat link. */
export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.52 3.48A11.91 11.91 0 0 0 12.05 0C5.47 0 .11 5.35.1 11.94c0 2.1.55 4.16 1.6 5.97L0 24l6.26-1.64a11.95 11.95 0 0 0 5.78 1.47h.01c6.59 0 11.95-5.35 11.95-11.94a11.88 11.88 0 0 0-3.48-8.41ZM12.05 21.8a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.72.97.99-3.62-.24-.37a9.87 9.87 0 0 1-1.52-5.25c0-5.47 4.45-9.92 9.93-9.92a9.85 9.85 0 0 1 7.02 2.91 9.86 9.86 0 0 1 2.9 7.02c0 5.47-4.45 9.92-9.96 9.85Zm5.45-7.43c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.53.07-.8.37-.28.3-1.05 1.02-1.05 2.49s1.07 2.89 1.22 3.09c.15.2 2.11 3.22 5.11 4.52.71.31 1.27.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.77-.73 2.02-1.43.25-.7.25-1.3.17-1.43-.07-.12-.27-.2-.57-.35Z" />
    </svg>
  );
}
