export const isCollectionHelper = (element) => {
  const isNativeNode = typeof element.type === 'string';
  const hasNoDisplayName = !element.type.displayName;

  if (isNativeNode || hasNoDisplayName) {
    return false;
  }

  return !!element.type.displayName.match(/^ReactCollectionHelper/);
};
