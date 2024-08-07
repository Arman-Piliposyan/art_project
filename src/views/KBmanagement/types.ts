export interface IFilesColumn {
  id: 'fileRealName' | 'commitStatus';
  align?: 'center' | 'right' | 'left';
  minWidth?: number;
  label: string;
}
export type StatusType = 'Processing' | 'Completed' | 'Pending' | 'Failed';

export interface IFile {
  commitStatus: StatusType;
  fileRealName: string;
  documentId: string;
}

export interface IDocument {
  commitStatus: StatusType;
  fileRealName: string;
  documentId: string;
  fileName: string;
}

export interface IFolder {
  documents: IDocument[];
  groupName: string;
  groupId: string;
}

export interface ISubUrl {
  subUrl: string;
  id: number;
}

export interface IFileChunk {
  content: string;
  id: string;
}

export interface IFileChunksData {
  totalResults: number;
  chunks: IFileChunk[];
  currentPage: number;
  totalPages: number;
}
