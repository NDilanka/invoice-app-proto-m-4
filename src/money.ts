export type Line = { amount: number };

function fractionDigits(currency: string): number {
  try {
    return new Intl.NumberFormat('en', { style: 'currency', currency }).resolvedOptions()
      .maximumFractionDigits ?? 2;
  } catch {
    return 2;
  }
}

export function formatTotal(lines: Line[], currency: string): string {
  const digits = fractionDigits(currency);
  const factor = 10 ** digits;
  const minor = lines.reduce((total, line) => total + Math.round(line.amount * factor), 0);
  const sign = minor < 0 ? '-' : '';
  const abs = String(Math.abs(minor)).padStart(digits + 1, '0');
  if (digits === 0) return sign + abs;
  return `${sign}${abs.slice(0, -digits)}.${abs.slice(-digits)}`;
}
