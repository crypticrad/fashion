import { useState } from 'react';
import {
  Button,
  ColorPicker,
  InputNumber,
  Select,
  Upload,
  message
} from 'antd';
import type { UploadFile } from 'antd';
import { Body } from '@/components/Typography/Body';
import { Icon } from '@/components/Icon';
import { CreateProductFormProps as Props } from './CreateProductForm.interface';

const GENDERS = ['MALE', 'FEMALE', 'UNISEX', 'OTHERS'] as const;
const SIZES = ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl'] as const;

const fieldLabelClass =
  'block body-extrasmall-semibold text-black/50 uppercase tracking-[0.08em]';

export const CreateProductForm = (props: Props) => {
  const {
    brands,
    initialValues,
    submitLabel = 'Save Product',
    onSubmit,
    onDiscard
  } = props;

  const [name, setName] = useState(initialValues?.name ?? '');
  const [description, setDescription] = useState(
    initialValues?.description ?? ''
  );
  const [price, setPrice] = useState<number | null>(
    initialValues?.price ?? null
  );
  const [brandId, setBrandId] = useState<number | undefined>(
    initialValues?.brand_id
  );
  const [genders, setGenders] = useState<string[]>(initialValues?.gender ?? []);
  const [sizes, setSizes] = useState<string[]>(initialValues?.size ?? []);
  const [colors, setColors] = useState<string[]>(initialValues?.color ?? []);
  const [pickerColor, setPickerColor] = useState('#000000');
  const [fileList, setFileList] = useState<UploadFile[]>(
    initialValues?.product_image
      ? [
          {
            uid: '-1',
            name: 'Current image',
            status: 'done',
            url: initialValues.product_image
          }
        ]
      : []
  );

  const addColor = () => {
    if (!colors.includes(pickerColor)) {
      setColors((prev) => [...prev, pickerColor]);
    }
  };

  const removeColor = (hex: string) => {
    setColors((prev) => prev.filter((c) => c !== hex));
  };

  const saveProduct = () => {
    if (!name.trim() || price === null || brandId === undefined) {
      void message.error('Product name, price and brand are required.');
      return;
    }

    onSubmit({
      name: name.trim(),
      description: description.trim(),
      price,
      brand_id: brandId,
      gender: genders,
      size: sizes,
      color: colors,
      image: fileList[0]?.originFileObj
    });
  };

  return (
    <div className="flex flex-col gap-5.5 h-[75vh] overflow-hidden">
      <div className="flex justify-end gap-3">
        <Button
          size="large"
          className="rounded-full! px-6!"
          onClick={onDiscard}
        >
          Discard
        </Button>
        <Button
          type="primary"
          size="large"
          className="rounded-full! px-6.5!"
          onClick={saveProduct}
        >
          {submitLabel}
        </Button>
      </div>

      <div className="grid grid-cols-[1.7fr_1fr] items-start gap-5.5 overflow-scroll">
        <div className="rounded-[20px] border border-black/7 bg-white p-7">
          <Body type="large" weight="bold" color="#000" className="mb-5.5">
            Product Details
          </Body>

          <div className="flex flex-col gap-5">
            <div>
              <label htmlFor="name" className={fieldLabelClass}>
                Product Name
              </label>
              <input
                id="name"
                name="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="e.g. T-shirt with Tape Details"
                className="mt-2 w-full rounded-xl bg-[#F0F0F0] px-4 py-3.5 text-sm outline-none"
              />
            </div>

            <div>
              <label htmlFor="description" className={fieldLabelClass}>
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Describe the product, materials, and fit..."
                className="mt-2 w-full resize-y rounded-xl bg-[#F0F0F0] px-4 py-3.5 text-sm outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="price" className={fieldLabelClass}>
                  Price
                </label>
                <InputNumber
                  id="price"
                  name="price"
                  value={price}
                  onChange={(value) => setPrice(value)}
                  min={0}
                  precision={2}
                  prefix="$"
                  placeholder="0.00"
                  size="large"
                  className="mt-2! w-full!"
                />
              </div>
              <div>
                <label htmlFor="brand" className={fieldLabelClass}>
                  Brand
                </label>
                <Select
                  id="brand"
                  value={brandId}
                  onChange={setBrandId}
                  size="large"
                  placeholder="Select a brand"
                  className="mt-2! w-full"
                  options={brands.map((brand) => ({
                    label: brand.brand_name,
                    value: brand.id
                  }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="gender" className={fieldLabelClass}>
                  Gender
                </label>
                <Select
                  id="gender"
                  mode="multiple"
                  value={genders}
                  onChange={setGenders}
                  size="large"
                  placeholder="Select genders"
                  className="mt-2! w-full"
                  options={GENDERS.map((gender) => ({
                    label: gender.charAt(0) + gender.slice(1).toLowerCase(),
                    value: gender
                  }))}
                />
              </div>
              <div>
                <label htmlFor="size" className={fieldLabelClass}>
                  Sizes
                </label>
                <Select
                  id="size"
                  mode="multiple"
                  value={sizes}
                  onChange={setSizes}
                  size="large"
                  placeholder="Select sizes"
                  className="mt-2! w-full"
                  options={SIZES.map((size) => ({
                    label: size.toUpperCase(),
                    value: size
                  }))}
                />
              </div>
            </div>

            <div>
              <span className={fieldLabelClass}>Colors</span>
              <div className="mt-2 flex items-center gap-3">
                <ColorPicker
                  value={pickerColor}
                  onChange={(value) => setPickerColor(value.toHexString())}
                />
                <Button onClick={addColor}>Add Color</Button>
              </div>
              {colors.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {colors.map((hex) => (
                    <button
                      key={hex}
                      type="button"
                      onClick={() => removeColor(hex)}
                      aria-label={`Remove ${hex}`}
                      title={`Remove ${hex}`}
                      className="group relative size-8 overflow-hidden rounded-full border border-black/15"
                      style={{ backgroundColor: hex }}
                    >
                      <span className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 transition-opacity group-hover:opacity-100">
                        <Icon
                          iconType="trash filled"
                          width={14}
                          height={14}
                          className="text-white"
                        />
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-[20px] border border-black/7 bg-white p-6 h-full flex flex-col">
          <Body type="normal" weight="bold" color="#000" className="mb-4">
            Product Image
          </Body>
          <Upload.Dragger
            fileList={fileList}
            onChange={({ fileList: next }) => setFileList(next)}
            beforeUpload={() => false}
            maxCount={1}
            accept="image/*"
            className="h-full"
          >
            <Icon
              iconType="tag filled"
              className="mx-auto mb-2 text-black/40"
            />
            <Body type="small" weight="semibold" color="#000">
              Drop image here
            </Body>
            <Body type="extrasmall" color="rgba(0,0,0,0.4)">
              PNG / JPG · up to 5MB
            </Body>
          </Upload.Dragger>
        </div>
      </div>
    </div>
  );
};
