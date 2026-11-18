import {
  Building2, CalendarCheck, ClipboardCheck, Clock, Gem, Handshake, Home, KeyRound,
  MapPin, ShieldCheck, Sparkles, SprayCan, Users,
} from 'lucide-react';

// Icônes référencées par leur nom dans les fichiers de données.
const icons = {
  Building2, CalendarCheck, ClipboardCheck, Clock, Gem, Handshake, Home, KeyRound,
  MapPin, ShieldCheck, Sparkles, SprayCan, Users,
};

export default function Icon({ name, size = 22, ...props }) {
  const Cmp = icons[name] ?? Sparkles;
  return <Cmp size={size} strokeWidth={1.5} aria-hidden="true" focusable="false" {...props} />;
}
