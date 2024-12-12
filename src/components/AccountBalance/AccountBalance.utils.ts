const formatAmount = (value: number | null | undefined) => {
  if (value === null || value === undefined) return "— ";

  const formatter = new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const normalizeSpaces = (str: string) => str.replace(/\u202F/g, " ");

  const absAmount = Math.abs(value);
  const sign = value < 0 ? "- " : "";

  // Milliards (1,00 G€ à 999,99 G€)
  if (absAmount >= 1_000_000_000) {
    const formatted = formatter.format(
      Math.floor((absAmount / 1_000_000_000) * 100) / 100
    );
    return normalizeSpaces(`${sign}${formatted} G`);
  }

  // Millions (1,00 M€ à 999,99 M€)
  if (absAmount >= 1_000_000) {
    const formatted = formatter.format(
      Math.floor((absAmount / 1_000_000) * 100) / 100
    );
    return normalizeSpaces(`${sign}${formatted} M`);
  }

  // Milliers (100,00 k€ à 999,99 k€)
  if (absAmount >= 100_000) {
    const formatted = formatter.format(
      Math.floor((absAmount / 1_000) * 100) / 100
    );
    return normalizeSpaces(`${sign}${formatted} k`);
  }

  // Euros (0,00 € à 99 999,99 €)
  return normalizeSpaces(`${sign}${formatter.format(absAmount)} `);
};

export { formatAmount };
