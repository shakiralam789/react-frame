// components/UserTableDesign.jsx
import React, { useState } from "react";
import { Table, Tbody, TCell, Thead, Trow } from "@/components/table/Table";
import TableDropdown, {
  TableDropdownItem,
} from "@/components/table/TableDropdown";
import Pagination from "@/components/Pagination";
import PopUp from "@/components/PopUp";

const UserTableDesign = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [info, setInfo] = useState({});

  const users = [
    {
      id: 1,
      name: "MD Aminul Islam",
      phone: "01773840939",
      role: "AM",
      collections: 4500,
      date: "5 / 02 / 2025",
      status: "Pending",
    },
    {
      id: 2,
      name: "SK Sofikul Islam",
      phone: "01773840939",
      role: "FM",
      collections: 4500,
      date: "5 / 02 / 2025",
      status: "Pending",
    },
    {
      id: 3,
      name: "GM Motiur Rahman",
      phone: "01773840939",
      role: "FM",
      collections: 4500,
      date: "5 / 02 / 2025",
      status: "Running",
    },
    {
      id: 4,
      name: "Sheikh Rasel Aman",
      phone: "01773840939",
      role: "FM",
      collections: 4500,
      date: "5 / 02 / 2025",
      status: "Pending",
    },
    {
      id: 5,
      name: "MD Bablur Rahman",
      phone: "01773840939",
      role: "FM",
      collections: 4500,
      date: "5 / 02 / 2025",
      status: "Pending",
    },
    {
      id: 6,
      name: "MST Kanij Fatima",
      phone: "01773840939",
      role: "AM",
      collections: 4500,
      date: "5 / 02 / 2025",
      status: "Pending",
    },
    {
      id: 7,
      name: "MD Mojid Molla",
      phone: "01773840939",
      role: "AM",
      collections: 4500,
      date: "5 / 02 / 2025",
      status: "Pending",
    },
    {
      id: 8,
      name: "Rehana Begum",
      phone: "01773840939",
      role: "AM",
      collections: 4500,
      date: "5 / 02 / 2025",
      status: "Pending",
    },
    {
      id: 9,
      name: "MD Abu Hasan",
      phone: "01773840939",
      role: "FM",
      collections: 4500,
      date: "5 / 02 / 2025",
      status: "Pending",
    },
    {
      id: 10,
      name: "Pritom Mondal",
      phone: "01773840939",
      role: "FM",
      collections: 4500,
      date: "5 / 02 / 2025",
      status: "Complete",
    },
  ];

  const renderStatusBadge = (status) => {
    if (status === "Pending") {
      return (
        <div className="flex items-center">
          <div className="text-amber-500 bg-amber-50 flex items-center px-2 py-1 rounded-full">
            <svg
              className="w-4 h-4 mr-1"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M12 6V12L16 14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span>Pending</span>
          </div>
        </div>
      );
    } else if (status === "Running") {
      return (
        <div className="flex items-center">
          <div className="text-indigo-500 bg-indigo-50 flex items-center px-2 py-1 rounded-full">
            <svg
              className="w-4 h-4 mr-1"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 12H18L15 21L9 3L6 12H2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Running</span>
          </div>
        </div>
      );
    } else if (status === "Complete") {
      return (
        <div className="flex items-center">
          <div className="text-green-500 bg-green-50 flex items-center px-2 py-1 rounded-full">
            <svg
              className="w-4 h-4 mr-1"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 6L9 17L4 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Complete</span>
          </div>
        </div>
      );
    }
  };

  function openPopUp(info) {
    setInfo(info);
    setIsOpen(true);
  }

  return (
    <>
      <Table>
        <Thead>
          <TCell role="header">Image</TCell>
          <TCell role="header">User Name</TCell>
          <TCell role="header">Phone Number</TCell>
          <TCell role="header">Role</TCell>
          <TCell role="header">Collections</TCell>
          <TCell role="header">Date</TCell>
          <TCell role="header">Status</TCell>
          <TCell role="header" className="text-center">
            Action
          </TCell>
        </Thead>
        <Tbody>
          {users &&
            users.length > 0 &&
            users.map((user, index) => (
              <Trow key={user.id}>
                <TCell>
                  <div className="size-7 2xl:size-9 rounded-full overflow-hidden bg-gray-100">
                    {/* Placeholder avatar - in a real app, use Next.js Image component */}
                    <div className="h-full w-full flex items-center justify-center bg-gray-200">
                      {/* {index === 0 && (
                        <img src="/api/placeholder/48/48" alt="Avatar" className="h-full w-full object-cover" />
                      )}
                      {index === 1 && (
                        <img src="/api/placeholder/48/48" alt="Avatar" className="h-full w-full object-cover" />
                      )}
                      {index === 2 && (
                        <img src="/api/placeholder/48/48" alt="Avatar" className="h-full w-full object-cover" />
                      )}
                      {index > 2 && (
                        <img src="/api/placeholder/48/48" alt="Avatar" className="h-full w-full object-cover" />
                      )} */}
                    </div>
                  </div>
                </TCell>
                <TCell>{user.name}</TCell>
                <TCell>{user.phone}</TCell>
                <TCell>{user.role}</TCell>
                <TCell>{user.collections}</TCell>
                <TCell>{user.date}</TCell>
                <TCell>{renderStatusBadge(user.status)}</TCell>
                <TCell className="text-center">
                  <TableDropdown>
                    <TableDropdownItem>View</TableDropdownItem>
                    <TableDropdownItem href={`/users/edit/${user.id}`}>
                      Edit
                    </TableDropdownItem>
                    <TableDropdownItem
                      onClick={() =>
                        openPopUp({
                          title: "Are you sure you want to Delete?",
                          method: "post",
                          route: `/users/${user.id}`,
                        })
                      }
                    >
                      Delete
                    </TableDropdownItem>
                  </TableDropdown>
                </TCell>
              </Trow>
            ))}
        </Tbody>
      </Table>
      <div>
        <Pagination />
      </div>
      <PopUp info={info} show={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default UserTableDesign;
