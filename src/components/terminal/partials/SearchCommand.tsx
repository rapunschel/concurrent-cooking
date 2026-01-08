import type React from "react";
import { Form, type NavigateFunction } from "react-router";

import { useEffect } from "react";

export function SearchCommand({
  props,
}: {
  props: {
    q: string;
    navigate: NavigateFunction;
    isSearchActive: Boolean;
    onClick: any;
  };
}) {
  const { q, navigate, isSearchActive, onClick } = props;

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

  return (
    <>
      {isSearchActive ? (
        <>
          <Form id="search-form" role="search" tabIndex={0} onSubmit={onSubmit}>
            <label htmlFor="q">search:&nbsp;</label>
            <input
              type="search"
              id="q"
              name="q"
              aria-label="Search recipe"
              defaultValue={q}
              autoFocus
            />
            <button type="button" onClick={onClick}>
              X
            </button>
          </Form>
        </>
      ) : (
        <button type="button" onClick={onClick}>
          search
        </button>
      )}
    </>
  );
}
