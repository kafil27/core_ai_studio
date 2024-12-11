import { storage } from './firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Upload a file
export const uploadFile = async (file, userId, contentId) => {
  const fileRef = ref(storage, `content/${userId}/${contentId}`);
  await uploadBytes(fileRef, file);
  return getDownloadURL(fileRef);
};

// Download a file
export const downloadFile = async (filePath) => {
  const fileRef = ref(storage, filePath);
  return getDownloadURL(fileRef);
}; 