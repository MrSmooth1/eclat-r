import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

/**
 * Bouton réutilisable.
 * variant : gold (défaut) | ghost | dark | light-outline
 * Rendu : <Link> si `to`, <a> si `href`, sinon <button>.
 */
export default function Button({
  to, href, state, variant = 'gold', arrow = false, icon: IconCmp, block = false,
  className = '', children, ...props
}) {
  const cls = ['btn', `btn--${variant}`, block && 'btn--block', className].filter(Boolean).join(' ');
  const content = (
    <>
      {IconCmp && <IconCmp size={18} strokeWidth={1.6} aria-hidden="true" />}
      <span>{children}</span>
      {arrow && <ArrowRight size={17} strokeWidth={1.6} aria-hidden="true" className="btn__arrow" />}
    </>
  );
  if (to) return <Link to={to} state={state} className={cls} {...props}>{content}</Link>;
  if (href) return <a href={href} className={cls} {...props}>{content}</a>;
  return <button type="button" className={cls} {...props}>{content}</button>;
}
