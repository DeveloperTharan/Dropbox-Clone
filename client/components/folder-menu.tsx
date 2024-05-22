import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { CiTrash } from "react-icons/ci";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { useOpenRenameModel } from "@/hooks/folder/use-open";
import { useArchiveFolder } from "@/query/folder/api/use-archive-folder";

type Props = {
  id: string;
  name: string;
  children: React.ReactNode;
};

export const FolderMenu = ({ id, name, children }: Props) => {
  const { onOpen } = useOpenRenameModel();

  const archiveMutation = useArchiveFolder();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex flex-row gap-x-1 justify-start items-center my-1 w-full"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              onOpen(id);
            }}
          >
            <HiOutlinePencilSquare className="w-4 h-4" />
            <span className="ml-2">Rename</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex flex-row gap-x-1 justify-start items-center my-1 w-full"
            onClick={() => archiveMutation.mutate({ folderId: id })}
          >
            <CiTrash className="w-4 h-4" />
            <span className="ml-2">Trash</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
