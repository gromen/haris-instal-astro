import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const maintenanceMode = import.meta.env.MAINTENANCE_MODE === 'true';
  const { pathname } = context.url;

  // Skip maintenance mode for:
  // - /admin (DecapCMS)
  // - /maintenance page itself
  // - Static assets
  const skipPaths = ['/admin', '/maintenance', '/_astro', '/images', '/favicon'];
  const shouldSkip = skipPaths.some(path => pathname.startsWith(path));

  if (maintenanceMode && !shouldSkip) {
    return context.redirect('/maintenance', 302);
  }

  return next();
});
