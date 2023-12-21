import { FC } from "react";
import ChevronRightIcon from "../assets/chevron-right.svg?react";
import FolderIcon from "../assets/folder.svg?react";
import FolderOpenIcon from "../assets/folder-open.svg?react";
import CssIcon from "../assets/css3.svg?react";
import HtmlIcon from "../assets/html5.svg?react";
import JsIcon from "../assets/js.svg?react";
import ReactIcon from "../assets/react.svg?react";
import TsIcon from "../assets/ts.svg?react";
import BracketIcon from "../assets/bracket.svg?react";
import SvgIcon from "../assets/sun.svg?react";
import InfoIcon from "../assets/info.svg?react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useParentControl } from "../hooks/useParentControl";
import { authPermitsHandler } from "../utils";
import { File, Directory } from "../types";

interface ITreeViewProps {
  data: File | Directory;
}

const fileIcon = {
  css: CssIcon,
  html: HtmlIcon,
  js: JsIcon,
  tsx: ReactIcon,
  ts: TsIcon,
  json: BracketIcon,
  svg: SvgIcon,
  md: InfoIcon
}

export const TreeView: FC<ITreeViewProps> = ({ data }) => {
  const { authLevel } = useAuthContext()
  const { isOpen, setIsOpen, isEmpty, isSearchItem, docType } = useParentControl(false, data)

  const handleClickOpenFolder = () => {
    setIsOpen((prev) => !prev);
  }

  const FileIcon = docType === 'file' && fileIcon[(data as File).extension] || InfoIcon;
  const DirectoryIcon = isOpen ? FolderOpenIcon : FolderIcon;

  if (!authPermitsHandler(authLevel, data)) return null;

  return (
    <li className={`flex items-center flex-wrap space-x-3 ${isSearchItem ? 'bg-slate-100' : ''}`}>
      {docType === 'directory' && !isEmpty ? <button
        type="button"
        onClick={handleClickOpenFolder}
        className="p-1.5 rounded-full hover:bg-slate-100 focus:ring-1 focus:outline-none focus:ring-slate-200"
      >
        <ChevronRightIcon
          className={`w-3 h-3 transition-transform ${
            isOpen ? "rotate-90" : ''
          }`}
        />
      </button> : <span className="w-6 h-6" />}
      {docType === 'file' ? <FileIcon className="w-4 h-4" /> : <DirectoryIcon className="w-4 h-4" />}
      <span>{data.name}</span> 
      {docType === 'directory' && (
        <ul className={`w-full space-y-2 py-2 text-left text-gray-500 dark:text-gray-400 ${isOpen ? 'block' : 'hidden'}`}>
          {(data as Directory).children.map((item) => (
            <TreeView key={item.id} data={item} />
          ))}
        </ul>
      )}
    </li>
  );
};
