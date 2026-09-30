export const styles = {
  GLASS_CARD: 'border-white/5 bg-black/20 backdrop-blur-md',
  GLASS_CARD_STRONG: 'border-white/10 bg-black/30 backdrop-blur-md',
  INTERACTIVE_CARD:
    'transition-all duration-300 hover:-translate-y-1 hover:border-teal-400/50 hover:shadow-[0_0_25px_rgba(102,252,241,0.15)]',

  ACCENT_BADGE:
    'border-teal-500/30 bg-teal-500/10 text-teal-400 uppercase text-xs tracking-wider',
  RARITY_BADGE:
    'border-teal-400/20 bg-teal-400/10 px-2.5 py-1 text-xs font-semibold text-teal-400',
  MISSABLE_BADGE:
    'border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-400',

  SECTION_TITLE: 'mb-6 text-2xl font-bold tracking-tight text-zinc-100',

  INPUT:
    'bg-black/20 text-zinc-100 transition-all duration-300 hover:border-teal-400/50 placeholder:text-zinc-500',
} as const;
