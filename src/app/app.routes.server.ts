import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'post/:id',
    renderMode: RenderMode.Server // This tells Angular NOT to prerender it at build time
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
