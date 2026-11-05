import { useState } from 'react';
import { Button, ColorPicker, InputNumber, Select, Upload, message } from 'antd';
import type { UploadFile } from 'antd';
import { Body } from '@/components/Typography/Body';
import { Icon } from '@/components/Icon';
import { CreateProductFormProps as Props } from './CreateProductForm.interface';

const GENDERS = ['MALE', 'FEMALE', 'UNISEX', 'OTHERS'] as const;
const SIZES = ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl'] as const;

const fieldLabelClass =
  'body-extrasmall-semibold text-black/50 uppercase tracking-[0.08em]';

export const CreateProductForm = (props: Props) => {
  const { brands } = props;

  const [colors, setColors] = useState<string[]>([]);
  const [pickerColor, setPickerColor] = useState('#000000');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const addColor = () => {
    if (!colors.includes(pickerColor)) {
      setColors((prev) => [...prev, pickerColor]);
    }
  };

  const removeColor = (hex: string) => {
    setColors((prev) => prev.filter((c) => c !== hex));
  };

  const saveProduct = () => {
    // TODO(API): validate and submit this form, including the image upload.
    void message.info('Create product API integration is pending.');
  };

  return (
    <div className="flex flex-col gap-5.5">
      <div className="flex justify-end gap-3">
        <Button size="large" className="rounded-full! px-6!">
          Discard
        </Button>
        <Button type="primary" size="large" className="rounded-full! px-6.5!" onClick={saveProduct}>
          Save Product
        </Button>
      </div>

      <div className="grid grid-cols-[1.7fr_1fr] items-start gap-5.5">
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
                  min={0}
                  precision={2}
                  prefix="$"
                  placeholder="0.00"
                  size="large"
                  className="mt-2 w-full"
                />
              </div>
              <div>
                <label htmlFor="brand" className={fieldLabelClass}>
                  Brand
                </label>
                <Select
                  id="brand"
                  size="large"
                  placeholder="Select a brand"
                  className="mt-2 w-full"
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
                  size="large"
                  placeholder="Select genders"
                  className="mt-2 w-full"
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
                  size="large"
                  placeholder="Select sizes"
                  className="mt-2 w-full"
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
                <div className="mt-3 flex flex-wrap gap-3">
                  {colors.map((hex) => (
                    <button
                      key={hex}
                      type="button"
                      onClick={() => removeColor(hex)}
                      aria-label={`Remove ${hex}`}
                      className="flex size-9 items-center justify-center rounded-full border border-black/20"
                      style={{ backgroundColor: hex }}
                    >
                      <Icon
                        iconType="trash filled"
                        width={14}
                        height={14}
                        className="text-white mix-blend-difference"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-[20px] border border-black/7 bg-white p-6">
          <Body type="normal" weight="bold" color="#000" className="mb-4">
            Product Image
          </Body>
          <Upload.Dragger
            fileList={fileList}
            onChange={({ fileList: next }) => setFileList(next)}
            beforeUpload={() => false}
            maxCount={1}
            accept="image/*"
          >
            <Icon iconType="tag filled" className="mx-auto mb-2 text-black/40" />
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
