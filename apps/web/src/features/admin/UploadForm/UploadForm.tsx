import { useMemo, useState } from 'react';
import classNames from 'classnames';
import { Button, Table, Upload, message } from 'antd';
import type { UploadProps } from 'antd';
import { motion } from 'motion/react';
import { Body } from '@/components/Typography/Body';
import { Icon } from '@/components/Icon';
import { parse } from 'csv-parse/sync';
import {
  ProductImportRow,
  UploadFormProps as Props
} from './UploadForm.interface';

const EXPECTED_HEADERS = [
  'name',
  'description',
  'brand_id',
  'gender',
  'color',
  'size',
  'price',
  'style',
  'category'
] as const;

const parseProducts = (text: string): ProductImportRow[] =>
  (
    parse(text, {
      columns: true,
      skip_empty_lines: true,
      trim: true
    }) as Record<string, string>[]
  ).map(
    (row) =>
      ({
        ...row,
        brand_id: Number(row.brand_id),
        gender: row.gender?.split('|') ?? [],
        color: row.color?.split('|') ?? [],
        size: row.size?.split('|') ?? []
      }) as ProductImportRow
  );

export const UploadForm = (_props: Props) => {
  const [parsed, setParsed] = useState<{
    fileName: string;
    rows: ProductImportRow[];
  } | null>(null);
  const importing = false;

  const headers = useMemo(
    () => (parsed?.rows[0] ? Object.keys(parsed.rows[0]) : []),
    [parsed]
  );

  const missingHeaders = useMemo(
    () => EXPECTED_HEADERS.filter((header) => !headers.includes(header)),
    [headers]
  );

  const columns = useMemo(
    () =>
      headers.map((header) => ({
        title: header,
        dataIndex: header,
        key: header,
        ellipsis: true,
        render: (value: unknown) =>
          Array.isArray(value) ? value.join(', ') : String(value ?? '')
      })),
    [headers]
  );

  const dataSource = useMemo(
    () =>
      (parsed?.rows ?? []).map((row, index) => ({
        key: String(index),
        ...row
      })),
    [parsed]
  );

  const beforeUpload: UploadProps['beforeUpload'] = (file) => {
    const isCsv =
      file.type === 'text/csv' || file.name.toLowerCase().endsWith('.csv');
    if (!isCsv) {
      message.error('Please upload a .csv file.');
      return Upload.LIST_IGNORE;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const rows = parseProducts(String(reader.result ?? ''));

      if (!rows.length) {
        message.error('The file appears to be empty.');
        return;
      }
      setParsed({ fileName: file.name, rows });
    };
    reader.readAsText(file);

    return false;
  };

  const reset = () => setParsed(null);

  const onImport = () => {
    if (!parsed?.rows) return;
    // TODO(API): send validated rows to the bulk-product endpoint.
    void message.info('Bulk import API integration is pending.');
  };

  const canImport =
    !!parsed && parsed.rows.length > 0 && !missingHeaders.length;

  return (
    <div className="flex flex-col gap-5.5">
      <div className="rounded-[20px] border border-black/7 bg-white p-7">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <Body type="large" weight="bold" color="#000">
              Bulk Product Import
            </Body>
            <Body type="small" color="rgba(0,0,0,0.5)" className="mt-1">
              Upload a CSV with the following headers:
            </Body>
            <div className="mt-3 flex flex-wrap gap-2">
              {EXPECTED_HEADERS.map((header) => (
                <span
                  key={header}
                  className="rounded-md bg-[#F0F0F0] px-2.5 py-1 font-mono text-xs text-black/70"
                >
                  {header}
                </span>
              ))}
            </div>
          </div>
        </div>

        <Upload.Dragger
          beforeUpload={beforeUpload}
          showUploadList={false}
          accept=".csv,text/csv"
          maxCount={1}
        >
          <Icon
            iconType="upload outlined"
            width={28}
            height={28}
            className="mx-auto mb-2 text-black/40"
          />
          <Body type="small" weight="semibold" color="#000">
            Drop your CSV here or click to browse
          </Body>
          <Body type="extrasmall" color="rgba(0,0,0,0.4)">
            .csv · up to 10MB
          </Body>
        </Upload.Dragger>
      </div>

      {parsed && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="rounded-[20px] border border-black/7 bg-white p-7"
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
            <div className="min-w-0">
              <Body type="normal" weight="bold" color="#000">
                Preview — {parsed.fileName}
              </Body>
              <Body type="small" color="rgba(0,0,0,0.5)" className="mt-0.5">
                {parsed.rows.length} row{parsed.rows.length === 1 ? '' : 's'}{' '}
                detected
              </Body>
            </div>

            <div className="flex items-center gap-3">
              <Button onClick={reset}>Clear</Button>
              <Button
                type="primary"
                loading={importing}
                disabled={!canImport}
                onClick={onImport}
                className="rounded-full! px-6!"
              >
                Upload {parsed.rows.length} Products
              </Button>
            </div>
          </div>

          {missingHeaders.length > 0 && (
            <div
              className={classNames(
                'mb-4 rounded-xl border border-[#E5484D]/30 bg-[#FBE9EA] px-4 py-3'
              )}
            >
              <Body type="small" weight="semibold" color="#E5484D">
                Missing required columns: {missingHeaders.join(', ')}
              </Body>
            </div>
          )}

          <Table
            columns={columns}
            dataSource={dataSource}
            size="small"
            scroll={{ x: 'max-content' }}
            pagination={{ pageSize: 8, showSizeChanger: false }}
          />
        </motion.div>
      )}
    </div>
  );
};
