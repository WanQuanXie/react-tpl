import { lazy } from 'react';

const Home = lazy(() => import('@/pages/home'));

const routes = [
  {
    path: '/',
    exact: true,
    title: '首页',
    component: Home,
  },
];

export default routes;
