// React Imports
import { useState, useEffect } from 'react';

// Firebase Imports
import {
    GoogleAuthProvider,
    signInWithCredential,
    onAuthStateChanged,
    User
} from "firebase/auth";
import {
    ref,
    get, set, update,
    serverTimestamp
} from 'firebase/database';

// Local Imports
import { auth, database } from "./firebase";

// Share success handlers between sign-in methods
const signInWithGoogleToken = async (token: string | undefined) => {
    const credential = GoogleAuthProvider.credential(token);
    const result = await signInWithCredential(auth, credential);

    // Safe navigation in case credential is null
    //? const token = credential?.accessToken;

    if (result) {
        // The signed-in user info.
        const user = result.user;
        const userRef = ref(database, 'users/' + user.uid);

        get(userRef).then((snapshot) => {
            if (snapshot.exists()) {
                // User exists within the 'users' table
                console.log(`Returning user <${user.email}> logged in.`);

                // User data to be updated in our table
                const userData = {
                    pfp_url: user.photoURL, // User's profile picture URL
                };

                update(userRef, userData);

            } else {
                // User does not exist in the 'users' table, so create a new record
                console.log(`New user <${user.email}> logged in.`);

                // User data to be saved in our table
                const userData = {
                    email: user.email, // User's email address
                    pfp_url: user.photoURL, // User's profile picture URL
                    joined: serverTimestamp(), // Use Firebase server timestamp
                };

                set(userRef, userData);
            }
        }); // End of get(userRef).then()
    }
}

const useAuth = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Use the existing auth instance from firebase.ts
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setIsLoading(false);
        });

        return unsubscribe;
    }, []);

    return { currentUser, isLoading };
}

export { signInWithGoogleToken, useAuth }
