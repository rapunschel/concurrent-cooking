export function User({ user }: { user: string }) {
  return (
    <p>
      <a
        href={`https://github.com/${user}`}
        onClick={(e) => e.stopPropagation()}
      >
        {user}
      </a>
    </p>
  );
}
