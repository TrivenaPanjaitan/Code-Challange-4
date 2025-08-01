import api from './api';

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('files', file);

  const response = await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  // Kembalikan URL file yang diupload
  return response.data[0].url;
};
