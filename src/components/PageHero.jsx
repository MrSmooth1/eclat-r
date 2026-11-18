/** Bannière claire des pages intérieures. */
export default function PageHero({ eyebrow, title, children }) {
  return (
    <section className="subhero">
      <div className="container">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {children && <div className="subhero__lead">{children}</div>}
      </div>
    </section>
  );
}
