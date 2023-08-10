export const fileToDataUrl = (file: any, callback: any) => {
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result;
      callback(dataUrl);
    };
    reader.readAsDataURL(file);
  }
};
