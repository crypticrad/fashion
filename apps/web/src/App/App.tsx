import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppProps as Props } from './App.interface';
import cn from './App.module.scss';
import { AppProviders } from '@/components/AppProviders';
import { Body } from '@/components/Typography/Body';

const AdminLayout = lazy(() =>
  import('@/layouts/AdminLayout').then((module) => ({
    default: module.AdminLayout
  }))
);
const AuthLayout = lazy(() =>
  import('@/layouts/AuthLayout').then((module) => ({
    default: module.AuthLayout
  }))
);
const StorefrontLayout = lazy(() =>
  import('@/layouts/StorefrontLayout').then((module) => ({
    default: module.StorefrontLayout
  }))
);
const AdminProductsPage = lazy(() =>
  import('@/pages/AdminProductsPage').then((module) => ({
    default: module.AdminProductsPage
  }))
);
const AdminUploadPage = lazy(() =>
  import('@/pages/AdminUploadPage').then((module) => ({
    default: module.AdminUploadPage
  }))
);
const AdminUsersPage = lazy(() =>
  import('@/pages/AdminUsersPage').then((module) => ({
    default: module.AdminUsersPage
  }))
);
const CartPage = lazy(() =>
  import('@/pages/CartPage').then((module) => ({ default: module.CartPage }))
);
const CatalogPage = lazy(() =>
  import('@/pages/CatalogPage').then((module) => ({
    default: module.CatalogPage
  }))
);
const HomePage = lazy(() =>
  import('@/pages/HomePage').then((module) => ({ default: module.HomePage }))
);
const LoginPage = lazy(() =>
  import('@/pages/LoginPage').then((module) => ({ default: module.LoginPage }))
);
const NotFoundPage = lazy(() =>
  import('@/pages/NotFoundPage').then((module) => ({
    default: module.NotFoundPage
  }))
);
const ProductPage = lazy(() =>
  import('@/pages/ProductPage').then((module) => ({
    default: module.ProductPage
  }))
);

export const App = (_props: Props) => (
  <div className={cn.app}>
    <AppProviders>
      <BrowserRouter>
        <Suspense fallback={<Body className="p-6">Loading…</Body>}>
          <Routes>
            <Route element={<StorefrontLayout />}>
              <Route index element={<HomePage />} />
              <Route path="catalog" element={<CatalogPage />} />
              <Route path="catalog/:id" element={<ProductPage />} />
              <Route path="cart" element={<CartPage />} />
            </Route>

            <Route element={<AuthLayout />}>
              <Route path="login" element={<LoginPage />} />
            </Route>

            <Route path="admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="products" replace />} />
              <Route path="products" element={<AdminProductsPage />} />
              <Route path="upload" element={<AdminUploadPage />} />
              <Route path="users" element={<AdminUsersPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AppProviders>
  </div>
);
