export type AuthLevel = 1 | 2 | 3;

export type ExtensionType = 'dir' | 'svg' | 'tsx' | 'css' | 'ts' | 'js' | 'json' | 'html' | 'md';

export interface IFile {
    id: number;
    name: string;
    extension: ExtensionType;
    parentId: number | null;
    authLevel: AuthLevel;
    level: number;
    children: IFile[];
}

export type IFileData = {
    items : IFile[];
}