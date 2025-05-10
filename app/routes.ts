import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.jsx'),
  route('auth', 'routes/auth.jsx'),
] satisfies RouteConfig;
