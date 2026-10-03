import { cdnImage } from "./image.ts";

// Official Imperial Palace logo (1254x1254, transparent: black wordmark + gold flower).
export const LOGO_URL = 'https://hercules-cdn.com/file_In72XlrUsnNamC72DdnGy1s0';

// Small, compressed copy for the header and footer (the original is far larger than needed).
export const LOGO_IMAGE = cdnImage(LOGO_URL, 600, 85);

// Kept for older imports.
export const HEADER_LOGO_URL = LOGO_IMAGE;

// Gold flower emblem only, used as the browser tab icon.
export const FAVICON_URL = 'https://hercules-cdn.com/file_UsZCZsMoa2Wxfdrc0QxbthIR';
