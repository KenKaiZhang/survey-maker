export const dataUrlToBinary = (dataUrl: string) => {
  const binaryData = dataUrl.split(",")[1];
  const byteCharacters = atob(binaryData);
  const byteArrays = new Uint8Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteArrays[i] = byteCharacters.charCodeAt(i);
  }
  return new Blob([byteArrays], { type: "image/jpeg" });
};
