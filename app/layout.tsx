import * as React from 'react';
import { AppProvider } from '@toolpad/core/nextjs';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TuneIcon from '@mui/icons-material/Tune';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';
import StoreIcon from '@mui/icons-material/Store';
import BarChartIcon from '@mui/icons-material/BarChart';
import EventIcon from '@mui/icons-material/Event';
import LinearProgress from '@mui/material/LinearProgress'
import type { Navigation } from '@toolpad/core/AppProvider';

import theme from '../theme';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: '',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'shopppingEvents',
    title: 'Shopping Events',
    icon: <ShoppingCartIcon />,
  },
  {
    segment: 'settings',
    title: 'Settings',
    icon: <TuneIcon />,
    children: [
      {
        segment: 'products',
        title: 'Products',
        icon: <InventoryIcon />,
      },
      {
        segment: 'users',
        title: 'Users',
        icon: <PeopleIcon />,
      },
      {
        segment: 'stores',
        title: 'Stores',
        icon: <StoreIcon />,
      },
    ],
  },
  {
    segment: 'usageHistory',
    title: 'Usage History',
    icon: <BarChartIcon />,
  },
  {
    segment: 'register',
    title: 'Register New Event',
    icon: <EventIcon />,
  },
];

const BRANDING = {
  title: 'Consumer Life Management',
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-toolpad-color-scheme="light" suppressHydrationWarning>
      <body>
        
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <React.Suspense fallback={<LinearProgress />}>
            <AppProvider
              navigation={NAVIGATION}
              branding={BRANDING}
              
              theme={theme}
            >
              {props.children}
            </AppProvider>
            </React.Suspense>
          </AppRouterCacheProvider>
        
      </body>
    </html>
  );
}
