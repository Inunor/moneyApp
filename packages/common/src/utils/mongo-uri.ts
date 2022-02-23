export const replaceMongoURICredentials = (
  mongoURI: string,
  username: string,
  password: string
): string => {
  return mongoURI
    .replace('<username>', username)
    .replace('<password>', password);
};
