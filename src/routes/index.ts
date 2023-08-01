import { lazy } from 'react';

const Contact = lazy(() => import('../pages/Contact'));
const ContactDetail = lazy(() => import('../pages/ContactDetail'));

const coreRoutes = [
  {
    path: '/contact',
    title: 'Contact',
    component: Contact,
  },
  {
    path: '/contact/:id',
    title: 'ContactDetail',
    component: ContactDetail,
  },
];

const routes = [...coreRoutes];
export default routes;
