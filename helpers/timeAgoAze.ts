export function timeAgoAze(pastTime: string): string {
  const now = new Date();
  const past = new Date(pastTime);

  const diffMs = now.getTime() - past.getTime();

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return `${years} il`;
  if (months > 0) return `${months} ay`;
  if (days > 0) return `${days} gün`;
  if (hours > 0) return `${hours} saat`;
  if (minutes > 0) return `${minutes} dəqiqə`;
  return `${seconds} saniyə`;
}
