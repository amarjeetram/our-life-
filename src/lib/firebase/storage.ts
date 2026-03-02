import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "./config";

// Upload image to Firebase Storage and return download URL
export async function uploadImage(file: File, path: string): Promise<string> {
    const storageRef = ref(storage, `blog-images/${path}`);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    return url;
}

// Delete image from Firebase Storage
export async function deleteImage(url: string): Promise<void> {
    const storageRef = ref(storage, url);
    await deleteObject(storageRef);
}
