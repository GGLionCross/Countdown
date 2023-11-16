import { storage } from './firebase';
import { getUid } from './auth';
import {
    deleteObject,
    getDownloadURL,
    ref,
    uploadBytes,
} from 'firebase/storage';

export const uploadBackgroundImage = async (
    viewId: string,
    background: File,
    publicMode: boolean
) => {
    const uid = getUid();
    const publicString = publicMode ? 'public' : 'private';
    const storageRef = ref(
        storage,
        `countdownBG/${uid}/${publicString}/${viewId}/background`
    );
    const snapshot = await uploadBytes(storageRef, background);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return {
        backgroundName: background.name,
        backgroundURL: downloadURL,
    };
};

export const deleteBackgroundImage = async (
    viewId: string,
    publicMode: boolean
) => {
    const uid = getUid();
    const publicString = publicMode ? 'public' : 'private';
    const storageRef = ref(
        storage,
        `countdownBG/${uid}/${publicString}/${viewId}/background`
    );
    await deleteObject(storageRef);
};
