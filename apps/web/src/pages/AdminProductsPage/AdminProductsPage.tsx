import { useState } from 'react';
import { Modal, message } from 'antd';
import { CreateProductForm } from '@/features/admin/CreateProductForm';
import type { ProductFormValues } from '@/features/admin/CreateProductForm';
import { ProductsTable } from '@/features/admin/ProductsTable';
import type { AdminProduct } from '@/features/admin/ProductsTable';
import { ADMIN_BRANDS, ADMIN_PRODUCTS } from '@/features/admin/products.data';
import { Heading } from '@/components/Typography/Heading';
import { AdminProductsPageProps as Props } from './AdminProductsPage.interface';
import cn from './AdminProductsPage.module.scss';

interface ProductDialog {
  open: boolean;
  /** Product being updated; undefined when creating a new one. */
  product?: AdminProduct;
}

export const AdminProductsPage = (_props: Props) => {
  // TODO(API): load products/brands from the Custom API instead of fixtures.
  const [products, setProducts] = useState<AdminProduct[]>(ADMIN_PRODUCTS);
  const [dialog, setDialog] = useState<ProductDialog>({ open: false });
  const [modal, modalContextHolder] = Modal.useModal();

  const editing = dialog.product;

  // Keep `product` while closing so the title doesn't flip mid-animation.
  const closeDialog = () => setDialog((prev) => ({ ...prev, open: false }));

  const saveProduct = (values: ProductFormValues) => {
    const { image, ...fields } = values;
    const product_image = image
      ? URL.createObjectURL(image)
      : (editing?.product_image ?? '');

    // TODO(API): POST /products (create) or PATCH /products/:id (update),
    // sent as multipart so the image file is included.
    if (editing) {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === editing.id
            ? { ...product, ...fields, product_image }
            : product
        )
      );
    } else {
      setProducts((prev) => [
        {
          id: Math.max(0, ...prev.map((product) => product.id)) + 1,
          style: '',
          category: '',
          ...fields,
          product_image
        },
        ...prev
      ]);
    }

    void message.success(editing ? 'Product updated.' : 'Product created.');
    closeDialog();
  };

  const deleteProduct = (product: AdminProduct) =>
    modal.confirm({
      title: 'Delete product?',
      content: `"${product.name}" will be permanently removed from the catalog.`,
      okText: 'Delete',
      okButtonProps: { danger: true },
      onOk: () => {
        // TODO(API): DELETE /products/:id
        setProducts((prev) => prev.filter((item) => item.id !== product.id));
        void message.success('Product deleted.');
      }
    });

  return (
    <main className={cn.adminProductsPage}>
      <ProductsTable
        products={products}
        brands={ADMIN_BRANDS}
        onAdd={() => setDialog({ open: true })}
        onEdit={(product) => setDialog({ open: true, product })}
        onDelete={deleteProduct}
      />

      <Modal
        open={dialog.open}
        onCancel={closeDialog}
        footer={null}
        width={1040}
        centered
        destroyOnHidden
        title={
          <Heading type="h4" className="uppercase">
            {editing ? 'Update Product' : 'Create Product'}
          </Heading>
        }
        classNames={{ container: 'bg-[#F4F4F4]!', header: 'bg-transparent!' }}
      >
        <CreateProductForm
          key={editing?.id ?? 'new'}
          brands={ADMIN_BRANDS}
          initialValues={editing}
          submitLabel={editing ? 'Update Product' : 'Save Product'}
          onSubmit={saveProduct}
          onDiscard={closeDialog}
        />
      </Modal>

      {modalContextHolder}
    </main>
  );
};
