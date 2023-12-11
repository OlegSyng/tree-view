import { FC, useEffect, useState } from "react";
import { IFile, ExtensionType } from "../types";
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
import { useSearchContext } from "../hooks/useSearchContext";
import { useAuthContext } from "../hooks/useAuthContext";

interface ITreeViewProps {
  data: IFile;
}

const renderIcon = (extension: ExtensionType, isOpenFolder: boolean) => {
  let icon = null;
  switch (extension) {
    case "dir":
      icon = isOpenFolder ? (
        <FolderOpenIcon className="w-4 h-4 text-slate-500" />
      ) : (
        <FolderIcon className="w-4 h-4" />
      );
      break;
    case "css":
      icon = <CssIcon className="w-4 h-4" />;
      break;
    case "html":
      icon = <HtmlIcon className="w-4 h-4" />;
      break;
    case "js":
      icon = <JsIcon className="w-4 h-4" />;
      break;
    case "tsx":
      icon = <ReactIcon className="w-4 h-4" />;
      break;
    case "ts":
      icon = <TsIcon className="w-4 h-4" />;
      break;
    case "json":
      icon = <BracketIcon className="w-4 h-4" />;
      break;
    case "svg":
      icon = <SvgIcon className="w-4 h-4" />;
      break;
    case "md":
      icon = <InfoIcon className="w-4 h-4" />;
      break;
    default:
      icon = null;
      break;
  }
  return icon;
};

function renderDropDownIcon(children: IFile[], auth: number) {
  let isRender = false;
  for (const child of children) {
    if (child.authLevel <= auth) {
      isRender = true;
      break;
    }
  }
  return isRender 
}

export const TreeView: FC<ITreeViewProps> = ({ data }) => {
  const [isOpenFolder, setIsOpenFolder] = useState(false);
  const { searchItem } = useSearchContext()
  const { authLevel } = useAuthContext()

  useEffect(() => {
    function recursiveOpenFolder(searchFile: IFile) {
      const isDirectChild = data.children.some((child) => child.name === searchFile.name);
      if (isDirectChild) {
        setIsOpenFolder(true);
        return
      }
      for (const child of data.children) {
        if (child.children  .length) {
          recursiveOpenFolder(child);
        }
      }
    }
    if (searchItem) {
      recursiveOpenFolder(searchItem);
    }
  }, [searchItem, data]);
 
  if (!data || data.authLevel > authLevel) return null;

  function handleClickOpenFolder() {
    setIsOpenFolder((prev) => !prev);
  }

  const isSearchItem = searchItem?.name === data.name;

  return (
    <li className={`flex items-center flex-wrap space-x-3 ${isSearchItem && 'bg-slate-100'}`}>
      {renderDropDownIcon(data.children, authLevel) ? (
        <button
          type="button"
          onClick={handleClickOpenFolder}
          className="p-1.5 rounded-full hover:bg-slate-100 focus:ring-1 focus:outline-none focus:ring-slate-200"
        >
          <ChevronRightIcon
            className={`w-3 h-3 transition-transform ${
              isOpenFolder && "rotate-90"
            }`}
          />
        </button>
      ) : (
        <span className="w-6 h-6"></span>
      )}
      {renderIcon(data.extension, isOpenFolder)}
      <span>{data.name}</span>
      {isOpenFolder && (
        <ul className="w-full space-y-2 py-2 text-left text-gray-500 dark:text-gray-400">
          {data.children.map((file) => (
            <TreeView key={file.id} data={file} />
          ))}
        </ul>
      )}
    </li>
  );
};
