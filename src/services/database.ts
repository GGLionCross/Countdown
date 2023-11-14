// React
import { Dispatch, SetStateAction } from 'react';

import { database } from './firebase';
import { onValue, push, ref, set } from 'firebase/database';
import { getUid } from './auth';
import { uploadBackgroundImage } from './storage';

export interface ViewSchema<B extends File | string, T extends Date | string> {
    name: string;
    background: B | null;
    backgroundName: string | null;
    overlayOpacity: number; // Initial opacity for the overlay
    fontFamily: string;
    fontSize: number;
    fontFormats: string[];
    fontColor: string;
    targetTime: T;
    startTime: T;
    publicMode: boolean;
}

export const saveView = async (
    viewId: string | null,
    viewObj: ViewSchema<File, Date>
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
            let backgroundName = null;
            let backgroundURL = null;
            if (vId && viewObj.background) {
                const response = await uploadBackgroundImage(
                    uid,
                    vId,
                    viewObj.background
                );
                backgroundName = response.backgroundName;
                backgroundURL = response.backgroundURL;
            }

            const viewData: ViewSchema<string, string> = {
                name: viewObj.name,
                background: backgroundURL,
                backgroundName: backgroundName,
                overlayOpacity: viewObj.overlayOpacity,
                fontFamily: viewObj.fontFamily,
                fontSize: viewObj.fontSize,
                fontFormats: viewObj.fontFormats,
                fontColor: viewObj.fontColor,
                targetTime: viewObj.targetTime.toISOString(),
                startTime: viewObj.startTime.toISOString(),
                publicMode: viewObj.publicMode,
            };

            if (saveViewRef) {
                await set(saveViewRef, viewData);
            }
        }
    }
};

export function subscribeToViews(
    setViews: Dispatch<SetStateAction<ViewSchema<string, string> | null>>
) {
    const uid = getUid();
    const viewsRef = ref(database, `countdown/views/${uid}`);
    const unsubscribe = onValue(
        viewsRef,
        snapshot => {
            if (snapshot.exists()) {
                setViews(snapshot.val());
            } else {
                setViews(null);
            }
        },
        {
            // If you only want to fetch data once and not listen for changes
            // onlyOnce: true,
        }
    );
    return { viewsRef, unsubscribe };
}
