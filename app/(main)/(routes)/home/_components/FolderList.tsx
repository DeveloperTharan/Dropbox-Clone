"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebase.config";
import { useAuth } from "@clerk/nextjs";
import { query, collection, where, getDocs } from "firebase/firestore";

function FolderList() {
  const [folders, setFolders] = useState<Array<any>>([]);
  const { userId } = useAuth();
  useEffect(() => {
    const getFiles = async () => {
      try {
        const q = query(
          collection(db, "Folder"),
          where("userId", "==", userId)
        );
        const querySnapshot = await getDocs(q);
        const fetchedFolders = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFolders(fetchedFolders);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (userId) {
      getFiles();
    }
  }, [userId]);
  return <div>FolderList</div>;
}

export default FolderList;
