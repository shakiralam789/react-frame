"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  UserIcon,
  ClockIcon,
  EnvelopeIcon,
  CheckCircleIcon,
  DocumentIcon,
  DocumentTextIcon,
  CubeIcon,
  ClipboardDocumentListIcon,
  CogIcon,
  ChevronRightIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import HomeIcon from "@/components/icons/HomeIcon";
import UsersIcon from "@/components/icons/UsersIcon";
import DPSIcon from "@/components/icons/DPSIcon";
import Image from "next/image";

// Map of icon names to their components
const IconMap = {
  home: HomeIcon,
  user: UserIcon,
  dps: DPSIcon,
  clock: ClockIcon,
  mail: EnvelopeIcon,
  users: UsersIcon,
  check: CheckCircleIcon,
  document: DocumentIcon,
  form: DocumentTextIcon,
  cube: CubeIcon,
  clipboard: ClipboardDocumentListIcon,
  settings: CogIcon,
  dashboard: HomeIcon,
  components: HomeIcon,
};

// Main SidebarMenu Component
const SidebarMenu = ({ menuItems, isCollapsed, toggleCollapse }) => {
  const router = useRouter();
  const pathname = usePathname(); // Next.js 13+ way to get current path
  const [activeItem, setActiveItem] = useState("");
  const [openMenus, setOpenMenus] = useState({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  const sidebarRef = useRef(null);
  const menuRefs = useRef({});
  const flyoutRefs = useRef({});
  const prevCollapsedStateRef = useRef(isCollapsed);

  // Handle client-side initialization
  useEffect(() => {
    setIsBrowser(true);
    setWindowWidth(window.innerWidth);
  }, []);

  // Handle window resize events - only on client side
  useEffect(() => {
    if (!isBrowser) return;

    const handleResize = () => {
      setWindowWidth(window.innerWidth);

      // Auto-collapse sidebar on small screens
      if (window.innerWidth < 768 && !isCollapsed) {
        toggleCollapse();
      }

      // Update flyout positions if any are open and sidebar is collapsed
      if (isCollapsed && Object.keys(openMenus).length > 0) {
        setTimeout(() => {
          Object.keys(openMenus).forEach((menuId) => {
            updateFlyoutPosition(menuId);
          });
        }, 10);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isCollapsed, openMenus, toggleCollapse, isBrowser]);

  // Handle document click outside of menu to close flyouts
  useEffect(() => {
    if (!isBrowser) return;

    const handleClickOutside = (event) => {
      // Only process outside clicks when sidebar is collapsed
      if (!isCollapsed) return;

      // Check if click is outside of sidebar and all flyouts
      const isOutsideSidebar =
        sidebarRef.current && !sidebarRef.current.contains(event.target);

      // Check if the click is inside any flyout
      let isInsideFlyout = false;
      Object.values(flyoutRefs.current).forEach((ref) => {
        if (ref && ref.contains(event.target)) {
          isInsideFlyout = true;
        }
      });

      if (isOutsideSidebar && !isInsideFlyout) {
        // Close all menus on outside click
        setOpenMenus({});
      }

      // Close mobile menu when clicking outside
      if (
        windowWidth < 768 &&
        isMobileMenuOpen &&
        isOutsideSidebar &&
        !isInsideFlyout
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCollapsed, isMobileMenuOpen, windowWidth, isBrowser]);

  // Update active item when route changes
  useEffect(() => {
    if (!isBrowser) return;

    // First try to get it from the usePathname hook
    const currentPathname =
      pathname || router.pathname || window.location.pathname;
    setActiveItem(currentPathname);

    // When route changes, expand parent menus of the active item
    const expandParentMenus = (items, path, parentPath = "") => {
      for (const item of items) {
        // Check if this is the active item
        if (item.link === path) {
          // Found the path, return the parent path
          return parentPath;
        }

        // Check children if they exist
        if (item.children && item.children.length > 0) {
          const childParentPath = expandParentMenus(
            item.children,
            path,
            item.title
          );
          if (childParentPath) {
            // If returning from a successful child search, open this menu
            setOpenMenus((prev) => ({
              ...prev,
              [`${item.title}-0`]: { isOpen: true },
            }));

            return parentPath; // Continue up the chain
          }
        }
      }
      return null; // Path not found in this branch
    };

    expandParentMenus(menuItems, currentPathname);
  }, [pathname, router, menuItems, isBrowser]);

  // Monitor sidebar collapse state changes
  useEffect(() => {
    if (!isBrowser) return;

    // Check if the collapse state has changed
    if (prevCollapsedStateRef.current !== isCollapsed) {
      // If transitioning from expanded to collapsed and we have open menus
      if (isCollapsed && Object.keys(openMenus).length > 0) {
        // Schedule position updates for all open menus
        setTimeout(() => {
          Object.keys(openMenus).forEach((menuId) => {
            updateFlyoutPosition(menuId);
          });
        }, 10); // Small delay to ensure DOM has updated
      }
      // Update the previous state reference
      prevCollapsedStateRef.current = isCollapsed;
    }
  }, [isCollapsed, openMenus, isBrowser]);

  const handleScroll = () => {
    // Only update positions when sidebar is collapsed and we have open menus
    if (!isCollapsed || Object.keys(openMenus).length === 0) return;

    // For each open menu, update its flyout position
    Object.keys(openMenus).forEach((menuId) => {
      updateFlyoutPosition(menuId);
    });
  };

  // Update flyout positions when sidebar scrolls
  useEffect(() => {
    if (!isBrowser) return;

    const navElement = sidebarRef.current?.querySelector("nav");
    if (!navElement) return;
    navElement.addEventListener("scroll", handleScroll);
    return () => {
      navElement.removeEventListener("scroll", handleScroll);
    };
  }, [openMenus, isCollapsed, isBrowser]);

  // Function to update a flyout's position based on its parent
  const updateFlyoutPosition = (menuId) => {
    if (!isBrowser) return;

    const menuRef = menuRefs.current[menuId];
    const flyoutRef = flyoutRefs.current[menuId];

    if (!menuRef || !flyoutRef || !isCollapsed) return;

    const menuRect = menuRef.getBoundingClientRect();
    const sidebarRect = sidebarRef.current.getBoundingClientRect();

    // Calculate top position relative to viewport
    let topPosition = menuRect.top;

    // Check if the flyout would go off the bottom of the screen
    const flyoutHeight = flyoutRef.offsetHeight;
    const viewportHeight = window.innerHeight;
    if (topPosition + flyoutHeight > viewportHeight) {
      // Position flyout from the bottom if it would go off screen
      topPosition = Math.max(viewportHeight - flyoutHeight, 0);
    }

    // Position flyout next to the menu item
    flyoutRef.style.top = `${topPosition}px`;
    flyoutRef.style.left = `${63 + 5}px`; // 5px gap
  };

  // Toggle a menu open/closed and close other menus
  const toggleMenu = (menuId, parentId = null) => {
    setOpenMenus((prevState) => {
      const newState = { ...prevState };

      // If this menu is already open, close it
      if (newState[menuId]) {
        delete newState[menuId];
        return newState;
      }

      // Close all menus except parents of this menu
      Object.keys(newState).forEach((key) => {
        // Keep parent menus open (if this is a child menu)
        if (parentId && key === parentId) {
          return;
        }
        // Keep parent of parent open (for deeper nesting)
        if (newState[key]?.parentId && newState[key].parentId === parentId) {
          return;
        }
        // Close any unrelated menus
        delete newState[key];
      });

      // Open this menu
      newState[menuId] = { isOpen: true, parentId };

      // Schedule position update for the next tick
      if (isBrowser && isCollapsed) {
        setTimeout(() => updateFlyoutPosition(menuId), 0);
      }

      return newState;
    });
  };

  // Check if a menu is open
  const isMenuOpen = (menuId) => {
    return openMenus[menuId]?.isOpen || false;
  };

  // Toggle mobile menu sidebar
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Recursive function to check if an item is active (includes path matching)
  const isItemActive = (item, path) => {
    // Exact match
    if (item.link === path) return true;

    // When path is a sub-path of the item link (to handle nested routes)
    if (
      item.link &&
      path.startsWith(item.link) &&
      // Only match if it's a complete segment match or the root
      (path === item.link ||
        path.charAt(item.link.length) === "/" ||
        item.link === "/")
    )
      return true;

    // Check children
    if (item.children && item.children.length > 0) {
      return item.children.some((child) => isItemActive(child, path));
    }

    return false;
  };

  // Recursive function to render menu items
  const renderMenuItem = (item, level = 0, parentId = null) => {
    const hasChildren = item.children && item.children.length > 0;
    const menuId = `${item.title}-${level}`;
    const Icon = item.icon ? IconMap[item.icon.toLowerCase()] || "" : "";

    // Check if this item or any of its children is active
    const isCurrentActive = isItemActive(item, activeItem);
    const isOpen = isMenuOpen(menuId);

    const paddingLeft =
      level > 0 && level < 2 && (!isCollapsed || windowWidth < 768)
        ? `${level * 12 + 12}px`
        : "0px";

    // Base classes for menu items
    const baseClasses = `
      flex items-center justify-between w-full py-2.5 2xl:py-3 px-3 rounded-md mb-1
      transition-all duration-300 ease-in-out
      ${
        isCurrentActive
          ? "bg-primary-light text-primary-purple font-medium"
          : "text-gray-icon hover:bg-gray-100"
      }
    `;

    // Store ref to menu item for position calculations
    const setMenuRef = (element) => {
      menuRefs.current[menuId] = element;
    };

    // Store ref to flyout for position calculations
    const setFlyoutRef = (element) => {
      flyoutRefs.current[menuId] = element;
    };

    return (
      <div key={menuId} className="relative" style={{ paddingLeft }}>
        {/* Menu Item Button or Link */}
        {hasChildren ? (
          <button
            ref={setMenuRef}
            className={baseClasses}
            onClick={() => toggleMenu(menuId, parentId)}
          >
            <div className="flex items-center">
              {/* {level > 0 && <ArrowRight className="absolute left-0 top-1/2 -translate-y-1/2" />} */}
              {Icon && (
                <Icon
                  className={`w-3.5 2xl:w-4 mr-3 ${
                    isCollapsed ? "md:mx-auto" : "mr-3"
                  }`}
                />
              )}
              {(!isCollapsed ||
                (isBrowser && windowWidth < 768 && isMobileMenuOpen)) && (
                <span className="font-medium truncate">{item.title}</span>
              )}
            </div>
            {(!isCollapsed ||
              (isBrowser && windowWidth < 768 && isMobileMenuOpen)) &&
              hasChildren && (
                <div
                  className="ml-2 transition-transform duration-300"
                  style={{
                    transform: isOpen ? "rotate(90deg)" : "rotate(0)",
                  }}
                >
                  <ChevronRightIcon
                    strokeWidth={2}
                    className="size-3 2xl:size-3.5"
                  />
                </div>
              )}
          </button>
        ) : (
          <Link
            ref={setMenuRef}
            href={item.link || "#"}
            className={baseClasses}
          >
            <div className="flex items-center">
              {/* {level > 0 && <ArrowRight className="absolute left-0 top-1/2 -translate-y-1/2" />} */}
              {Icon && (
                <Icon
                  className={`w-3.5 2xl:w-4 mr-3 ${
                    isCollapsed ? "md:mx-auto" : "mr-3"
                  }`}
                />
              )}
              {(!isCollapsed ||
                (isBrowser && windowWidth < 768 && isMobileMenuOpen)) && (
                <span className="font-medium truncate">{item.title}</span>
              )}
            </div>
          </Link>
        )}

        {/* Submenu for expanded sidebar */}
        {hasChildren &&
          (!isCollapsed ||
            (isBrowser && windowWidth < 768 && isMobileMenuOpen)) && (
            <div
              className={`overflow-hidden transition-all duration-300 pl-2
                      ${
                        isOpen
                          ? "max-h-[1000px] opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
            >
              {item.children.map((child) =>
                renderMenuItem(child, level + 1, menuId)
              )}
            </div>
          )}

        {/* Flyout submenu for collapsed sidebar (only on desktop) */}
        {hasChildren && isCollapsed && isBrowser && windowWidth >= 768 && (
          <div
            ref={setFlyoutRef}
            className={`fixed bg-white rounded-md shadow-lg border border-gray-100 z-50
                      transition-all duration-200 min-w-56
                      ${
                        isOpen
                          ? "opacity-100 visible"
                          : "opacity-0 invisible pointer-events-none"
                      }`}
            // Position will be set dynamically via JS
          >
            <div className="p-2">
              <div className="px-3 py-2 font-semibold text-gray-500 border-b border-gray-100 mb-2">
                {item.title}
              </div>
              {item.children.map((child, idx) => {
                const childId = `${child.title}-${level + 1}-${idx}`;
                const hasGrandchildren =
                  child.children && child.children.length > 0;

                if (hasGrandchildren) {
                  // For nested menus in flyout
                  return (
                    <div key={childId} className="mb-2">
                      <button
                        onClick={() => toggleMenu(childId, menuId)}
                        className={`flex items-center justify-between w-full px-3 py-2 rounded-md
                                  ${
                                    isMenuOpen(childId) ||
                                    isItemActive(child, activeItem)
                                      ? "bg-primary-light text-primary-purple"
                                      : "text-gray-700 hover:bg-gray-50"
                                  }`}
                      >
                        <span>{child.title}</span>
                        <ChevronRightIcon
                          className={`h-3 w-3 transition-transform duration-200 ${
                            isMenuOpen(childId) ? "rotate-90" : ""
                          }`}
                        />
                      </button>

                      <div
                        className={`pl-3 overflow-hidden transition-all duration-200
                                  ${
                                    isMenuOpen(childId)
                                      ? "max-h-48 mt-1"
                                      : "max-h-0"
                                  }`}
                      >
                        {child.children.map((grandchild, gcIdx) => (
                          <Link
                            key={`${grandchild.title}-${gcIdx}`}
                            href={grandchild.link || "#"}
                            className={`block px-3 py-1.5 rounded-md mb-1
                                      ${
                                        activeItem === grandchild.link
                                          ? "bg-primary-light text-primary-purple"
                                          : "text-gray-600 hover:bg-gray-50"
                                      }`}
                          >
                            {grandchild.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                } else {
                  // For regular items in flyout
                  return (
                    <Link
                      key={childId}
                      href={child.link || "#"}
                      className={`block px-3 py-2 rounded-md mb-1
                                ${
                                  isItemActive(child, activeItem)
                                    ? "bg-primary-light text-primary-purple"
                                    : "text-gray-700 hover:bg-gray-50"
                                }`}
                    >
                      {child.title}
                    </Link>
                  );
                }
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render only browser-dependent mobile menu elements when on client
  const renderMobileElements = () => {
    if (!isBrowser) return null;

    return (
      <>
        {/* Mobile Menu Toggle Button - Only visible on small screens */}
        {windowWidth < 768 && (
          <button
            onClick={toggleMobileMenu}
            className="md:hidden fixed top-2 left-4 bg-white rounded-md shadow-md p-2"
          >
            <Bars3Icon className="size-5 2xl:size-6 text-gray-700" />
          </button>
        )}

        {/* Mobile Overlay */}
        {windowWidth < 768 && isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleMobileMenu}
          ></div>
        )}
      </>
    );
  };

  return (
    <>
      {renderMobileElements()}

      <div
        ref={sidebarRef}
        className={`z-10 font-16 bg-white h-screen border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col
                  ${
                    isCollapsed && isBrowser && windowWidth >= 768
                      ? "w-16"
                      : "w-[200px] 2xl:w-[230px]"
                  }
                  ${
                    isBrowser && windowWidth < 768
                      ? `fixed left-0 top-0 z-50 ${
                          isMobileMenuOpen
                            ? "translate-x-0"
                            : "-translate-x-full"
                        }`
                      : "relative translate-x-0"
                  }`}
      >
        {/* Logo */}
        <div className="header-height relative px-4 py-2 flex items-center justify-center border-b border-gray-200">
          <Link
            href={"/dashboard"}
            className="flex items-center justify-center"
          >
            <div className="shrink-0 size-10 bg-gray-300 rounded-full flex items-center">
              {/* <Image
                src={"/images/auth-logo.png"}
                height={50}
                width={50}
                alt="logo"
              /> */}
            </div>
            {/* {(!isCollapsed || (isBrowser && windowWidth < 768)) && (
              <span className="ml-3 font-semibold font-24 text-gray-text truncate">
                AppName
              </span>
            )} */}
          </Link>

          {/* Toggle Collapse Button - Only visible on desktop */}
          {isBrowser && windowWidth >= 768 && (
            <button
              className="bg-white border rounded-full size-5 flex items-center justify-center absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 text-gray-icon hover:text-gray-text z-10 shadow-sm"
              onClick={toggleCollapse}
            >
              <ChevronRightIcon
                className={`size-3.5 transition-transform duration-300 ${
                  isCollapsed ? "rotate-180" : ""
                }`}
              />
            </button>
          )}
        </div>

        {/* Menu Items */}
        <div className="flex-1 relative overflow-hidden">
          <nav className="absolute inset-0 overflow-y-auto overflow-x-hidden px-2 py-2">
            {menuItems.map((item) => renderMenuItem(item))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default SidebarMenu;
