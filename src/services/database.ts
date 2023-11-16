// React
import { Dispatch, SetStateAction } from 'react';

import { database } from './firebase';
import {
    DatabaseReference,
    equalTo,
    onValue,
    orderByChild,
    push,
    Query,
    query,
    ref,
    remove,
    set,
} from 'firebase/database';
import { getUid } from './auth';
import { deleteBackgroundImage, uploadBackgroundImage } from './storage';

export interface ViewSchema<B extends File | string, T extends Date | string> {
    ownerId: string;
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
    timeFormat: string;
    publicMode: boolean;
}

export const deleteView = async (
    viewId: string | null,
    publicMode: boolean
) => {
    const baseUrl = 'countdown/views';
    const viewRef = ref(database, `${baseUrl}/${viewId}`);
    await remove(viewRef);
    if (viewId) {
        await deleteBackgroundImage(viewId, publicMode);
    }
};

export const saveView = async (
    viewId: string | null,
    viewObj: ViewSchema<File, Date>
) => {
    const baseUrl = 'countdown/views';

    // Generate a new viewId if it doesn't currently exist
    let vId = viewId;
    let saveViewRef = null;
    if (vId === null) {
        const viewRef = ref(database, `${baseUrl}`);
        saveViewRef = push(viewRef);
        vId = saveViewRef.key;
    } else {
        saveViewRef = ref(database, `${baseUrl}/${vId}`);
    }

    // Get Background Download URL
    let backgroundName = null;
    let backgroundURL = null;
    if (vId && viewObj.background) {
        const response = await uploadBackgroundImage(
            vId,
            viewObj.background,
            viewObj.publicMode
        );
        backgroundName = response.backgroundName;
        backgroundURL = response.backgroundURL;
    }

    const uid = getUid();
    if (uid) {
        const viewData: ViewSchema<string, string> = {
            ownerId: uid,
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
            timeFormat: viewObj.timeFormat,
            publicMode: viewObj.publicMode,
        };

        if (saveViewRef) {
            await set(saveViewRef, viewData);
        }
    }
};

export function subscribeToAllViews(
    setViews: Dispatch<SetStateAction<ViewSchema<string, string> | null>>
) {
    const viewsRef = ref(database, `countdown/views/`);
    const unsubscribe = unsubscribeToViews(viewsRef, setViews);
    return { viewsRef, unsubscribe };
}

export function subscribeToUserViews(
    setViews: Dispatch<SetStateAction<ViewSchema<string, string> | null>>
) {
    const baseUrl = 'countdown/views';
    const uid = getUid();
    const viewsRef = query(
        ref(database, baseUrl),
        orderByChild('ownerId'),
        equalTo(uid || '')
    );
    const unsubscribe = unsubscribeToViews(viewsRef, setViews);
    return { viewsRef, unsubscribe };

    return { viewsRef, unsubscribe };
}

const unsubscribeToViews = (
    viewsRef: DatabaseReference | Query,
    setViews: Dispatch<SetStateAction<ViewSchema<string, string> | null>>
) =>
    onValue(
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
