import { File, Directory, AuthLevel } from "../types";


export const recursiveSearch = (node: File | Directory, search: string, authLevel: AuthLevel): boolean => {
    if (!authPermitsHandler(authLevel, node)) return false;
    if (node.name.toLowerCase().includes(search)) {
        return true;
    }
    if ('children' in node) {
        for (const child of node.children) {
            const result = recursiveSearch(child, search, authLevel)
            if (result) return true
        }
    }
    return false;
}

export const authPermitsHandler = (authLevel: string, data: File | Directory): boolean => {
    if ((data.authLevel !== 'guest' && authLevel === 'guest' && data.authLevel === 'user') ||
        (data.authLevel !== 'guest' && authLevel === 'user' && data.authLevel === 'admin')) return false;
    return true;
}
