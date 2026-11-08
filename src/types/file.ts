export interface FileEntry {
  name: string;
  path: string;
  isDirectory: boolean;
  sizeBytes: number;
  permissions: string;
  owner: string;
  group: string;
  modifiedAt: string;
}

