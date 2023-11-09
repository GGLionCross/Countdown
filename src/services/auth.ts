// React
import { useState, useEffect } from 'react';

// Firebase
import { auth } from './firebase';
import {
    onAuthStateChanged,
    User,
    UserCredential,
    signOut
} from "firebase/auth";
import {
    ref,
    get, set, update,
    serverTimestamp
} from 'firebase/database';

// Local Imports
import { database } from "./firebase";

// Hook for observing authentication changes in app
export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true); // Useful for loading states

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        // Cleanup subscription
        return unsubscribe;
    }, []);

    return { user, loading };
}

// Share success handlers between sign-in methods
export const handleAuthResponse = (response: UserCredential) => {
    // The signed-in user info.
    const user = response.user;
    const userRef = ref(database, 'users/' + user.uid);

    get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
            // User exists within the 'users' table
            console.log(`Returning user <${user.email}> logged in.`);
            console.log(snapshot);

            // If user has changed their profile pic, update the URL
            if (snapshot.val().photoURL != user.photoURL) {
                // User data to be updated in our table
                const userData = {
                    photoURL: user.photoURL, // User's profile picture URL
                };

                update(userRef, userData);
            }

        } else {
            // User does not exist in the 'users' table, so create a new record
            console.log(`New user <${user.email}> logged in.`);

            // User data to be saved in our table
            const userData = {
                email: user.email, // User's email address
                photoURL: user.photoURL, // User's profile picture URL
                joined: serverTimestamp(), // Use Firebase server timestamp
            };

            set(userRef, userData);
        }
    }); // End of get(userRef).then()
}

export const handleSignOut = () => {
    signOut(auth).catch((error) => {
        console.error('Error signing out: ', error);
    });
}