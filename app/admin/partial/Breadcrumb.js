"use client";
import React, { useMemo, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import Button from "@/components/form/Button";

// Route mappings for automatic breadcrumb generation
const ROUTE_MAPPINGS = {
  "/": "Home",
  "/dashboard": "Dashboard",
  "/users": "User List",
  "/users/create": "Create User",
  "/dps": "DPS List",
  "/dps/create": "DPS Create",
};

// Dynamic segment indicators - these are segments that should keep their ID
const DYNAMIC_SEGMENTS = ["edit", "show","profile", "details"];

/**
 * Smart Breadcrumb Component
 */
export default function Breadcrumb({ items, className = "", Icon, backBtn=true,children }) {
  const pathnameFromHook = usePathname();
  const [pathname, setPathname] = useState(null);
  
  // Only use pathname after component has mounted on client
  useEffect(() => {
    setPathname(pathnameFromHook);
  }, [pathnameFromHook]);

  // Generate breadcrumb items based on current path or provided items
  const breadcrumbItems = useMemo(() => {
    // If items are provided, use them
    if (items && items.length > 0) {
      return [...items];
    }

    // Otherwise generate from current path
    const result = [];

    if (pathname) {
      // Split path into segments
      const segments = pathname.split("/").filter(Boolean);

      // Build paths and handle dynamic segments
      let currentPath = "";

      for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];
        currentPath += `/${segment}`;

        // Check if this segment is a dynamic segment (like 'edit')
        const isDynamicSegment = DYNAMIC_SEGMENTS.includes(segment);

        // Check if there's a next segment that could be an ID (numeric or non-numeric)
        const nextSegment = i + 1 < segments.length ? segments[i + 1] : null;
        
        // Modified this line to accept any value after a dynamic segment
        const hasIdAfterDynamic = isDynamicSegment && nextSegment;

        if (isDynamicSegment && hasIdAfterDynamic) {
          // This is a dynamic segment followed by an ID
          // For cases like /users/edit/1 or /users/edit/ds

          // 1. Find the parent resource path (e.g., /users)
          const parentPath = currentPath.split("/").slice(0, -1).join("/");

          // 2. Add the parent resource breadcrumb if it exists and isn't already added
          if (parentPath && !result.some((item) => item.href === parentPath)) {
            const parentLabel =
              ROUTE_MAPPINGS[parentPath] ||
              formatLabel(parentPath.split("/").pop());

            result.push({
              label: parentLabel,
              href: parentPath,
            });
          }

          // 3. Format label for the action (edit, view, etc.)
          const actionLabel = formatLabel(segment);

          // 4. Add the action with the FULL path including ID
          const fullPath = `${currentPath}/${nextSegment}`;

          result.push({
            label: ROUTE_MAPPINGS[currentPath] || actionLabel,
            href: fullPath, // Keep the ID in the path
          });

          // 5. Add the ID as the final segment
          result.push({
            label: nextSegment,
            href: fullPath,
          });

          // Skip the next segment (ID) since we've already processed it
          i++;
          currentPath = fullPath;
        } else if (ROUTE_MAPPINGS[currentPath]) {
          // Standard mapped route
          result.push({
            label: ROUTE_MAPPINGS[currentPath],
            href: currentPath,
          });
        } else {
          // Unmapped route - format the segment
          result.push({
            label: formatLabel(segment),
            href: currentPath,
          });
        }
      }

      // Remove href from the last item (current page)
      if (result.length > 0) {
        const lastItem = { ...result[result.length - 1] };
        delete lastItem.href;
        result[result.length - 1] = lastItem;
      }
    }

    return result;
  }, [pathname, items]);

  // Don't render anything until we're on the client and have pathname
  if (breadcrumbItems.length === 0 || pathname === null) return null;

  return (
    <nav
      className={`flex items-center uppercase flex-wrap justify-between font-14 mb-4 2xl:mb-6 ${className}`}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;

          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRightIcon
                  className="flex-shrink-0 size-4 text-gray-400 mx-1"
                  aria-hidden="true"
                />
              )}

              {isLast || !item.href ? (
                <span
                  className="whitespace-nowrap text-gray-700 font-medium"
                  aria-current="page"
                >
                  {index === 0 ? (
                    <span className="flex items-center">
                      {Icon ? (
                        <Icon className="size-4 2xl:size-5 mr-1"/>
                      ) : (
                        <HomeIcon className="size-4 2xl:size-5 mr-1" />
                      )}
                      <span>{item.label}</span>
                    </span>
                  ) : (
                    item.label
                  )}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="whitespace-nowrap text-gray-500 hover:text-gray-700 flex items-center"
                >
                  {index === 0 ? (
                    <span className="flex items-center">
                      {Icon ? (
                        <Icon className="size-4 2xl:size-5 mr-1"/>
                      ) : (
                        <HomeIcon className="size-4 2xl:size-5 mr-1" />
                      )}
                      <span>{item.label}</span>
                    </span>
                  ) : (
                    item.label
                  )}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
        <div className="flex flex-wrap items-center gap-2">
          {children}
        {/* back button */}
        {backBtn && breadcrumbItems.length > 1 && (
          <Button
            variant="stroke"
            href={(() => {
              const path = pathname || "";
              if (
                DYNAMIC_SEGMENTS.some((segment) => path.includes(`/${segment}/`))
              ) {
                const segments = path.split("/");
                const dynamicSegmentIndex = segments.findIndex((seg) =>
                  DYNAMIC_SEGMENTS.includes(seg)
                );

                if (dynamicSegmentIndex > 0) {
                  return segments.slice(0, dynamicSegmentIndex).join("/");
                }
              }

              return breadcrumbItems[breadcrumbItems.length - 2]?.href || "/";
            })()}
            className="px-2 pl-1 py-1"
          >
            <ChevronLeftIcon
              className="flex-shrink-0 size-3.5 2xl:size-4"
              aria-hidden="true"
              strokeWidth={2}
            />
            <span className="font-medium">Back</span>
          </Button>
        )}
        </div>

    </nav>
  );
}

function formatLabel(text) {
  return text.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}