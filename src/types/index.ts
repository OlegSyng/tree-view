export type AuthLevel = 'admin' | 'user' | 'guest';

export type ExtensionType = 'svg' | 'tsx' | 'css' | 'ts' | 'js' | 'json' | 'html' | 'md';

type DocumentBase  = {
    id: number;
    name: string;
    parentId: number | null;
    authLevel: AuthLevel;
    level: number;
}

export interface File extends DocumentBase {
    extension: ExtensionType;
}

export interface Directory extends DocumentBase {
    children: DataItems;
}

export type DataItems = (File | Directory)[];

export type Data = {
    items : DataItems
}

export type DocumentType = 'file' | 'directory' | 'unknown';

export type Nullable<T> = T | null;