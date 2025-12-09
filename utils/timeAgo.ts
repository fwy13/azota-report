export default function timeAgo(isoDate: Date) {
  const past = new Date(isoDate) as unknown as number;
  const now = new Date() as unknown as number;
  const diffMs = now - past;

  const sec = Math.floor(diffMs / 1000);
  const min = Math.floor(sec / 60);
  const hour = Math.floor(min / 60);
  const day = Math.floor(hour / 24);

  if (day > 0) return `${day} ngày trước`;
  if (hour > 0) return `${hour} giờ trước`;
  if (min > 0) return `${min} phút trước`;
  return `${sec} giây trước`;
}
