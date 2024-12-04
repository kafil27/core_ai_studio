import { storage } from './firebase';

// Upload a file
export const uploadFile = (file, userId) => {
  const storageRef = storage.ref();
  const fileRef = storageRef.child(`${userId}/${file.name}`);
  return fileRef.put(file);
};

// Download a file
export const downloadFile = (filePath) => {
  const fileRef = storage.ref(filePath);
  return fileRef.getDownloadURL();
}; 