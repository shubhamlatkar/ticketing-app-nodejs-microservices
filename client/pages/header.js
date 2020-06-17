import Link from "next/link";
export default ({ currentUser }) => {
  const links = [
    !currentUser && { label: "Sign Up", href: "/auth/signup" },
    !currentUser && { label: "Sign In", href: "/auth/signup" },
    currentUser && { label: "Sign Up", href: "/auth/signup" }
  ]
    .filter(link => link)
    .map(({ label, href }) => (
      <li key={href} className="nav-item">
        <Link href={href}>
          <button className="nav-link">{label}</button>
        </Link>
      </li>
    ));

  return (
    <nav className="navbar navbar-dark bg-dark">
      <Link href="/">
        <h1 className="navbar-brand">Heading</h1>
      </Link>
      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center text-light">{links}</ul>
      </div>
    </nav>
  );
};
