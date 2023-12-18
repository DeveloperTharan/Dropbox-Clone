export type FileType = {
  id: string;
  timestamp: Date;
  userID: string;
  filename: string;
  downlodeURL: string;
  size: number;
  isArchived: boolean;
  isFavorite: boolean;
  isSigned: boolean;
  type: string;
}
