import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import auth from "../Auth/AuthProvider";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase/config";
// import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { createUser } = UserAuth();
  const [user, setUser] = useState({});
  // const { dispatch } = useAuthContext();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);

    try {
      // sign up user
      const res = await createUser(email, password);

      if (!res) {
        throw new Error("Could not complete signup");
      }
      // add display name to user
      await updateProfile(auth.currentUser, {
        displayName: displayName,
      })
        .then(() => {
          const name = displayName.split(" ");
          setDoc(doc(db, "Accounts", auth.currentUser.uid), {
            fname: name[0],
            lname: name[1],
            email: email,
            uid: auth.currentUser.uid,
          });
        })
        .catch((error) => {
          console.log(error.message);
        });
      await auth.currentUser
        .reload()
        .then(() => {
          console.log("Successfully reloaded");
        })
        .catch(() => {
          console.log("Unable to reload");
        });
      // dispatch({ type: "LOGIN", payload: res.user });
      setIsPending(false);
      setError(null);
    } catch (error) {
      setError(error.message);
      console.log(error.message);
      setIsPending(false);
    }
  };

  return { error, isPending, signup, user };
};
