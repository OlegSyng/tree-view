import { FC } from "react";
import gitHubLogo from "../assets/github-mark.svg?url";
import MenuIcon from "../assets/menu.svg?react";
import UserIcon from "../assets/user.svg?react";
import { useClickAwayListener } from "../hooks/useClickAwayListener";
import { useAuthContext } from "../hooks/useAuthContext";
import { AuthLevel } from "../types";

const classesUserMenu = "block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white "

export const Header: FC = () => {
  const { authLevel, setAuthLevel } = useAuthContext();
  const {
    ref: menuRef,
    isOpen: isMenuOpen,
    setIsOpen: setMenuOpen,
  } = useClickAwayListener(false);
  const {
    ref: userMenuRef,
    isOpen: isUserMenuOpen,
    setIsOpen: setUserMenuOpen,
  } = useClickAwayListener(false);

  function handleMenuClick() {
    setMenuOpen((prevState) => !prevState);
  }

  function handleUserClick() {
    setUserMenuOpen((prevState) => !prevState);
  }

  function handleClickPlan(plan: AuthLevel) {
    if (plan === authLevel) return;
    setAuthLevel(plan);
    setUserMenuOpen(false);
  }

  return (
    <nav className="bg-white sticky top-0 z-20 border-gray-200 dark:bg-gray-900 dark:border-gray-700 shadow">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/OlegSyng"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={gitHubLogo} className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            OlegSyng
          </span>
        </a>
        <button
          onClick={handleMenuClick}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open main menu</span>
          <MenuIcon className="w-4 h-4" />
        </button>
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto`}
          ref={menuRef}
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li className="relative">
              <button
                className="flex items-center text-white py-2 px-8 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleUserClick}
              >
                <UserIcon className="w-4 h-4 mr-4" />
                <span>User</span>
              </button>
              <div
                ref={userMenuRef}
                className={`${
                  isUserMenuOpen ? "block" : "hidden"
                } absolute z-10 md:right-0 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
              >
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-400">
                  <li>
                    <button
                      className={`${classesUserMenu} ${authLevel === 'user' ? 'bg-gray-100 text-blue-700' : ''}`}
                      onClick={() => handleClickPlan('user')}    
                    >
                      Basic Plan
                    </button>
                  </li>
                  <li>
                    <button 
                      className={`${classesUserMenu} ${authLevel === 'admin' ? 'bg-gray-100 text-blue-700' : ''}`}
                      onClick={() => handleClickPlan('admin')}
                    >
                      Admin Plan
                    </button>
                  </li>
                </ul>
                <div className="py-1">
                  <button 
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    onClick={() => handleClickPlan('guest')}
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
