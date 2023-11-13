import { database } from './firebase';
import { ref, push, set } from 'firebase/database';
import { getUid } from './auth';
import { uploadBackgroundImage } from './storage';

export interface SaveViewSchema {
    name: string;
    background: File | null;
    overlayOpacity: number; // Initial opacity for the overlay
    fontFamily: string;
    fontSize: number;
    fontFormats: string[];
    fontColor: string;
    targetTime: Date;
    startTime: Date;
}

export const saveView = async (
    viewId: string | null,
    viewObj: SaveViewSchema
) => {
    const baseUrl = 'countdown/views';
    // We shouldn't be pushing views with no names to the database
    if (viewObj.name.trim() !== '') {
        const uid = getUid();
        if (uid) {
            // Generate a new viewId if it doesn't currently exist
            let vId = viewId;
            let saveViewRef = null;
            if (vId === null) {
                const viewRef = ref(database, `${baseUrl}/${uid}`);
                saveViewRef = push(viewRef);
                vId = saveViewRef.key;
            } else {
                saveViewRef = ref(database, `${baseUrl}/${uid}/${vId}`);
            }

            // Get Background Download URL
            let backgroundURL = null;
            if (vId && viewObj.background) {
                backgroundURL = await uploadBackgroundImage(
                    uid,
                    vId,
                    viewObj.background
                );
            }

            const viewData = {
                name: viewObj.name,
                background: backgroundURL,
                overlayOpacity: viewObj.overlayOpacity,
                fontFamily: viewObj.fontFamily,
                fontSize: viewObj.fontSize,
                fontFormats: viewObj.fontFormats,
                fontColor: viewObj.fontColor,
                targetTime: viewObj.targetTime
                    ? viewObj.targetTime.toISOString()
                    : null,
                startTime: viewObj.startTime
                    ? viewObj.startTime.toISOString()
                    : null,
            };

            if (saveViewRef) {
                await set(saveViewRef, viewData);
            }
        }
    }
};
