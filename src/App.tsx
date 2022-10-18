import { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { DAppProvider } from '@usedapp/core';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ApplicationRoutes from './routes';

import config from './config/dapp.config';

const App: React.FC = (): ReactElement => {
  return (
    <DAppProvider config={config}>
      <BrowserRouter>
        <ApplicationRoutes />
      </BrowserRouter>
      <ToastContainer />
    </DAppProvider>
  );
};

export default App;
