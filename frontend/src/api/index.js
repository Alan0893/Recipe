// Importing necessary modules
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const useAuth = () => {
	const [user, setUser] = useState(null);
	const auth = getAuth();

	// Subscribe to user on mount
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);	// User is signed in
			} else {
				setUser(null);	// User is signed out
			}
		});

		// Cleanup subscription on unmount
		return () => unsubscribe();
	}, [auth]);

	return [user, setUser];
};