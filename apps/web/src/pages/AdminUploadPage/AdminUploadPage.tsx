import { UploadForm } from '@/features/admin/UploadForm';
import { AdminUploadPageProps as Props } from './AdminUploadPage.interface';
import cn from './AdminUploadPage.module.scss';

export const AdminUploadPage = (_props: Props) => (
  <main className={cn.adminUploadPage}>
    <UploadForm />
  </main>
);
