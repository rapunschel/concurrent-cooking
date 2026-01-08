import type React from "react";
import { Form, type NavigateFunction } from "react-router";

import { useEffect, useState } from "react";

export function SearchCommand({
  props,
}: {
  props: {
    q: string;
    navigate: NavigateFunction;
    isSearchActive: boolean;
    setSearchActive: any;
  };
}) {
  const { q, navigate, isSearchActive, setSearchActive } = props;
  const [closedByUser, setClosedByUser] = useState(false);
  const showSearch = !closedByUser && (isSearchActive || Boolean(q));

  useEffect(() => {
    const input = document.getElementById("q") as HTMLInputElement | null;
    if (input) {
      input.value = q;
    }
  }, [q]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = (event.currentTarget.q as HTMLInputElement).value.trim();
    navigate(`?q=${encodeURIComponent(query)}`);
    const input = document.getElementById("q") as HTMLInputElement;
    input.blur();
  };

  const openSearch = () => {
    setClosedByUser(false);
    setSearchActive(true);
  };

  const closeSearch = () => {
    setClosedByUser(true);
    setSearchActive(false);
  };

  return (
    <>
      {showSearch ? (
        <>
          <Form id="search-form" role="search" tabIndex={0} onSubmit={onSubmit}>
            <label htmlFor="q">search:&nbsp;</label>
            <input
              type="search"
              id="q"
              name="q"
              aria-label="Search recipe"
              defaultValue={q}
              autoFocus={isSearchActive}
            />
            <button type="button" onClick={closeSearch}>
              X
            </button>
          </Form>
        </>
      ) : (
        <button type="button" onClick={openSearch}>
          search
        </button>
      )}
    </>
  );
}
