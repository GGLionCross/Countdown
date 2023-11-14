import { storage } from './firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export const uploadBackgroundImage = async (
    uid: string,
    viewId: string,
    background: File
) => {
    const storageRef = ref(storage, `countdownBG/${uid}/${viewId}/background`);
    const snapshot = await uploadBytes(storageRef, background);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return {
        backgroundName: background.name,
        backgroundURL: downloadURL,
    };
};
