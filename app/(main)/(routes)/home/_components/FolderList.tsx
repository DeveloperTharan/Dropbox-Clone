import React from "react";
import Image from "next/image";
import { auth } from "@clerk/nextjs";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase.config";

type FolderType = {
  name: string;
  id: string;
  userId: string;
};

export const FolderList = async () => {
  const { userId } = auth();

  const folderRes = await getDocs(
    query(collection(db, "Folder"), where("userId", "==", userId))
  );

  const skeletonFolder: FolderType[] = folderRes.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
    userId: doc.data().userId,
  }))

  const stringhandler = (string: string, n: number) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };

  return (
    <div className="mt-7">
      <div className="flex justify-between items-center">
        <h1 className="text-md font-semibold ms-1">Folders</h1>
        <h2 className="text-md font-semibold text-blue-600">View All</h2>
      </div>
      <div className="mt-4 ms-1 flex flex-wrap justify-normal items-center gap-x-6">
        {skeletonFolder?.map((folder) => (
          <div key={folder?.id} className="flex flex-col justify-center items-center text-center">
            <Image src={"/folder-icon.svg"} alt={"folder"} width={70} height={70} />
            <h2 className="text-sm">{stringhandler(`${folder.name}`, 5)}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};
