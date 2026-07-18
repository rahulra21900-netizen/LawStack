export function generateAvatar(name: string): string {
  const encodedName = encodeURIComponent(name);
  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodedName}`;
}
