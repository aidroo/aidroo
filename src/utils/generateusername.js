export function generateUsername(length = 8) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let username = "";

  for (let i = 0; i < length; i++) {
    username += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return username.toLocaleLowerCase();
}
export function generateEmail(username) {
  const domains = ["aidroo.com"];

  const domain = domains[Math.floor(Math.random() * domains.length)];

  return `${username}@${domain}`;
}
