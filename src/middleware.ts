import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames. /projects is included so that the
  // short, shareable URL redirects to the visitor's language (default: /pl).
  matcher: ['/', '/(pl|en)/:path*', '/projects', '/projects/:path*']
};
