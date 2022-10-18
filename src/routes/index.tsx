import { Routes, Route } from 'react-router-dom';

import InvestPage from '../views';
import AdminPage from '../views/admin';

const routes = [
  {
    path: '/',
    element: <InvestPage />,
  },
  {
    path: '/admin',
    element: <AdminPage />,
  },
];

const ApplicationRoutes: React.FC = () => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={route.path + index} {...route} />
      ))}
    </Routes>
  );
};

export default ApplicationRoutes;
