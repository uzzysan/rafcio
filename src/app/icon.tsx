import { ImageResponse } from 'next/og';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    <svg width="64" height="64" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" rx="18" fill="#281C2D"/><path d="M11 34V18a7 7 0 0 1 7-7h16M86 11h16a7 7 0 0 1 7 7v16M109 86v16a7 7 0 0 1-7 7H86M34 109H18a7 7 0 0 1-7-7V86" fill="none" stroke="#B18A57" strokeWidth="2" strokeLinecap="round"/><path d="M57 96V52h8l16 25 16-25h8v44h-9V69L84 88h-6L66 69v27Z" fill="#B18A57"/><path d="M20 98h34v-5H31V65h16l23 33h13L58 63c11-4 17-12 17-23 0-16-12-24-31-24H20v5h3v72h-3Zm11-42V25h13c14 0 22 5 22 15s-8 16-22 16Z" fill="#F4EFE5" fillRule="evenodd"/><path d="M54 65 65 82" fill="none" stroke="#281C2D" strokeWidth="3" strokeLinecap="round"/><circle cx="59.5" cy="73.5" r="2.3" fill="#B18A57"/></svg>,
    size,
  );
}
