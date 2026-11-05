import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Pagination } from 'antd';
import { CatalogPaginationProps as Props } from './CatalogPagination.interface';

/**
 * Catalog pagination — antd Pagination wired to the `page` URL search param.
 * Changing the page preserves every other active filter in the query string.
 */
export const CatalogPagination = ({ total, pageSize = 9 }: Props) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  const current = Number(searchParams.get('page') ?? 1);

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page <= 1) {
      params.delete('page');
    } else {
      params.set('page', String(page));
    }
    const query = params.toString();
    navigate(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <Pagination
      align="center"
      current={current}
      total={total}
      pageSize={pageSize}
      showSizeChanger={false}
      onChange={goToPage}
    />
  );
};
