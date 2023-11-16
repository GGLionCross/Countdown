import { storage } from './firebase';
import {
    deleteObject,
    getDownloadURL,
    ref,
    uploadBytes,
} from 'firebase/storage';

export const uploadBackgroundImage = async (
    viewId: string,
    background: File
) => {
    const storageRef = ref(storage, `countdownBG/${viewId}/background`);
    const snapshot = await uploadBytes(storageRef, background);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return {
        backgroundName: background.name,
        backgroundURL: downloadURL,
    };
};

// TODO: Add deleteBackgroundImage for deleteView
export const deleteBackgroundImage = async (viewId: string) => {
    const storageRef = ref(storage, `countdownBG/${viewId}/background`);
    await deleteObject(storageRef);
};
