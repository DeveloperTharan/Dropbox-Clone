import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useOpenRenameModel } from "@/hooks/file/use-open";
import { useArchiveFile } from "@/query/file/api/use-archive-file";
import { useHandleFavoriteFile } from "@/query/file/api/use-handlefavorit-file";
import { FileType } from "@/types/file-type";

import { PenSquare, Star, StarOff, Trash } from "lucide-react";

type Props = {
  file: FileType;
  children: React.ReactNode;
};

export const FileMenu = ({ file, children }: Props) => {
  const { onOpen } = useOpenRenameModel();

  const archiveMutation = useArchiveFile(file.folderId);
  const handleFavoriteMutation = useHandleFavoriteFile(file.folderId);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="w-32 truncate">
            {file.fileName}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex flex-row gap-x-1 justify-start items-center my-1 w-full"
            onClick={() => onOpen(file.id, file.folderId)}
          >
            <PenSquare className="h-4 w-4" />
            <span className="text-sm">Rename</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex flex-row gap-x-1 justify-start items-center my-1 w-full"
            onClick={() => handleFavoriteMutation.mutate({ id: file.id })}
            disabled={handleFavoriteMutation.isPending}
          >
            {!file.favorite ? (
              <>
                <Star className="h-4 w-4" />
                <span className="text-sm">Add to Favorite</span>
              </>
            ) : (
              <>
                <StarOff className="h-4 w-4" />
                <span className="text-sm">Remove from Favorite</span>
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex flex-row gap-x-1 justify-start items-center my-1 w-full"
            onClick={() => archiveMutation.mutate({ id: file.id })}
            disabled={archiveMutation.isPending}
          >
            <Trash className="h-4 w-4" />
            <span className="text-sm">Trash</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
