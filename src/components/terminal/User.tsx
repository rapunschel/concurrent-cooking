export function User({ user }: { user: string }) {
  return (
    <p className="user">
      <a className="user"
        href={`https://github.com/${user}`}
        onClick={(e) => e.stopPropagation()}
      >
        {user}
      </a>
    </p>
  );
}
