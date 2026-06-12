'use client';
import { useState } from 'react';
import css from './FilterPanel.module.css';
import CustomSelect from '@/shared/ui/Select/Select';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getCategoriesTypes,
  getRegionsCategories,
} from '@/lib/api/client/categoriesApi';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

const sortByList = [
  { value: '', label: 'Стандартно' },
  { value: 'popular', label: 'За популярністю' },
  { value: 'rate', label: 'За рейтингом' },
  { value: 'newest', label: 'Новіші спочатку' },
];

export default function FilterPanel() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const [query, setQuery] = useState(searchParams.get('search') || '');

  const filters = {
    search: searchParams.get('search') || undefined,
    region: searchParams.get('region') || undefined,
    locationType: searchParams.get('locationType') || undefined,
    sortBy: searchParams.get('sortBy') || undefined,
  };

  const { data: regions } = useQuery({
    queryKey: ['regions'],
    queryFn: getRegionsCategories,
  });
  const { data: types } = useQuery({
    queryKey: ['regionTypes'],
    queryFn: getCategoriesTypes,
  });

  const updateSearchParams = useDebouncedCallback((text: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());

    if (text) {
      currentParams.set('search', text);
    } else {
      currentParams.delete('search');
    }

    router.push(`${pathname}?${currentParams.toString()}`, { scroll: false });
    queryClient.invalidateQueries({ queryKey: ['locations'] });
  }, 600);

  const updateURLParams = (search: string, value: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    if (value.trim() !== '') {
      currentParams.set(search, value);
    } else {
      currentParams.delete(search);
    }

    router.push(`${pathname}?${currentParams.toString()}`, { scroll: false });
    queryClient.invalidateQueries({ queryKey: ['locations'] });
  };

  const handleSearchChange = (value: string) => {
    setQuery(value);
    updateSearchParams(value);
  };

  return (
    <div className={css.filtersDiv}>
      <input
        type="text"
        value={query}
        onChange={(e) => handleSearchChange(e.target.value)}
        className={css.input}
        placeholder="Пошук"
      ></input>
      <div className={css.sortingDivs}>
        <div className={css.secondDiv}>
          <CustomSelect
            options={[{ value: '', label: 'Всі регіони' }].concat(
              regions?.data?.map((reg) => {
                return { value: reg.slug, label: reg.region };
              }) ?? [],
            )}
            placeholder="Регіон"
            onChange={(value) => updateURLParams('region', value)}
            initialValue={
              filters.region
                ? {
                    value: filters.region,
                    label:
                      regions?.data?.find((r) => r.slug === filters.region)
                        ?.region || 'Завантаження...',
                  }
                : null
            }
          />
          <CustomSelect
            options={[{ value: '', label: 'Всі типи' }].concat(
              types?.data?.map((type) => {
                return { value: type.slug, label: type.type };
              }) ?? [],
            )}
            placeholder="Тип локації"
            onChange={(value) => updateURLParams('locationType', value)}
            initialValue={
              filters.locationType
                ? {
                    value: filters.locationType,
                    label:
                      types?.data?.find((r) => r.slug === filters.locationType)
                        ?.type || 'Завантаження...',
                  }
                : null
            }
          />
        </div>
        <div className={css.thirdDiv}>
          <CustomSelect
            options={sortByList}
            placeholder="Сортування"
            onChange={(value) => updateURLParams('sortBy', value)}
            initialValue={
              filters.sortBy
                ? {
                    value: filters.sortBy,
                    label:
                      sortByList.find((r) => r.value === filters.sortBy)
                        ?.label || 'Завантаження...',
                  }
                : null
            }
          />
        </div>
      </div>
    </div>
  );
}
