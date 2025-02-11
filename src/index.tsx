import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import { useRoutes } from 'hookrouter';

import * as Sentry from '@sentry/react';

import * as serviceWorker from './serviceWorker';
import { checkRequiredEnvVars } from './checkRequiredEnvVars';
import { DAPP_VERSION } from './web3/constants';
import { Providers } from './context';
import { Updaters } from './updaters';
import { Layout } from './components/layout/Layout';
import { Home } from './components/pages/Home';
import { Swap } from './components/pages/Swap';
import { Mint } from './components/pages/Mint';
import { Earn } from './components/pages/Earn';
import { Save } from './components/pages/Save';
import { Calculator } from './components/pages/Calculator';
import { Redeem } from './components/pages/Redeem';
import { NotFound } from './components/pages/NotFound';
import { FAQ } from './components/pages/FAQ';
import { Analytics } from './components/pages/Analytics';
import { PoolPage } from './components/pages/Earn/Pool';
import { AdminPage } from './components/pages/Earn/Admin';

checkRequiredEnvVars();

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  release: `mStable-app@${DAPP_VERSION}`,
});

const routes = {
  '/': () => <Home />,
  '/mint': () => <Mint />,
  '/earn': () => <Earn />,
  // '/earn/vault': () => <VaultPage />,
  '/earn/admin': () => <AdminPage />,
  '/earn/:slugOrAddress': ({ slugOrAddress }: { slugOrAddress?: string }) => (
    <PoolPage slugOrAddress={slugOrAddress} />
  ),
  '/earn/:slugOrAddress/:userAddress': ({
    slugOrAddress,
    userAddress,
  }: {
    slugOrAddress?: string;
    userAddress?: string;
  }) => <PoolPage slugOrAddress={slugOrAddress} userAddress={userAddress} />,
  '/save': () => <Save />,
  '/save/calculator': () => <Calculator />,
  '/swap': () => <Swap />,
  '/redeem': () => <Redeem />,
  '/faq': () => <FAQ />,
  '/analytics': () => <Analytics />,
};

const Root: FC<{}> = () => {
  const routeResult = useRoutes(routes);
  return (
    <Providers>
      <Updaters />
      <Layout>{routeResult || <NotFound />}</Layout>
    </Providers>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
