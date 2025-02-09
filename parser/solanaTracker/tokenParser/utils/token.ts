export function parseTokenInfo(token: any) {
  if (!token) {
    return {
      name: null,
      symbol: null,
      mint: null,
      uri: null,
      hasFileMetaData: null,
      createdOn: null,
      description: null,
      image: null,
      twitter: null,
      website: null,
    };
  }
  const {
    name,
    symbol,
    mint,
    uri,
    hasFileMetaData,
    createdOn,
    description,
    image,
    twitter,
    website,
  } = token;

  return {
    name,
    symbol,
    mint,
    uri,
    hasFileMetaData,
    createdOn,
    description,
    image,
    twitter,
    website,
  };
}
