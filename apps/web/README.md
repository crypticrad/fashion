# Fashion React

Vite + React port of the Fashion/SHOP.CO Next.js application. It includes the storefront, catalog and product detail, cart, login, and admin routes with the original Tailwind styling and local fixtures.

## Development

```bash
yarn
yarn dev
```

Set `VITE_BRAND` in a local `.env` file to override the default `SHOP.CO` brand name.

## Routes

- `/`, `/catalog`, `/catalog/:id`, `/cart`
- `/login`
- `/admin/products`, `/admin/upload`, `/admin/users`

## API status

API integration is intentionally deferred. Search the source for `TODO(API)` to find each integration boundary. Until the Custom API contract is available, catalog, product, cart, brand, and user data use fixtures; login, create-product, bulk-import, and newsletter actions show local placeholder behavior.

## Checks

```bash
yarn lint
yarn build
```
