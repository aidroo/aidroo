export function getCloudinaryPublicId(url) {
  // Split the URL by '/' and '.' and retrieve the relevant part
  const parts = url.split('/');
  const lastPart = parts[parts.length - 1]; // Get the last part of the URL (e.g., l8blwja5ggrpubzkestn.png)
  
  // Remove the file extension from the last part
  return lastPart.split('.')[0];
}
 
