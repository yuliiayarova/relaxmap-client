'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import css from './HeroBlock.module.css';

export default function HeroSearchForm() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedQuery = query.trim();
    const searchParams = new URLSearchParams();

    if (trimmedQuery) {
      searchParams.set('search', trimmedQuery);
    }

    const params = searchParams.toString();
    router.push(params ? `/locations?${params}` : '/locations');
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label} htmlFor="hero-search">
        Пошук місця для відпочинку
      </label>
      <input
        className={css.input}
        id="hero-search"
        name="search"
        type="search"
        value={query}
        onChange={event => setQuery(event.target.value)}
        placeholder="Введіть назву, тип або регіон..."
        autoComplete="off"
      />
      <button className={css.button} type="submit">
        Знайти місце
      </button>
    </form>
  );
}
