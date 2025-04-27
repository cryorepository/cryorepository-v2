/**
 * Decodes a URL query parameter and removes the "query=" prefix.
 * 
 * @param query - The query string to decode.
 * @returns The decoded string with "query=" removed.
 */
export const decodeParams = (query: string): string => {
  const decodedToken = decodeURIComponent(query);
  return decodedToken.replace(/^query=/, "");
};