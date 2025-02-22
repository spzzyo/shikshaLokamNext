import { User, Tooltip, Chip } from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EditIcon } from "../icons/table/edit-icon";
import { EyeIcon } from "../icons/table/eye-icon";
import { users } from "./data";

interface Props {
  user: (typeof users)[number];
  columnKey: string | React.Key;
}

export const RenderCell = ({ user, columnKey }: Props) => {
  // @ts-ignore
  const cellValue = user[columnKey];
  switch (columnKey) {
    case "name":
      return (
        <div    className="cursor-pointer hover:bg-blue-100 transition-colors"
>

        <User
        avatarProps={{
          src: user.avatar,
        }}
        name={cellValue}
        >
          {user.email}
        </User>
          </div>
      );
    case "details":
      return (
        <div>
          <div>
            <span>{cellValue}</span>
          </div>
          <div>
            <div style={{ marginRight: "10px" }}> Grade: {user.grade}</div>
            <div style={{ marginRight: "10px" }}> Section: {user.section}</div>
            <div style={{ marginRight: "10px" }}> Age: {user.age}</div>
            <div > Email: {user.email}</div>

          </div>
        </div>
      );
    case "status":
      return (
        <Chip
          size="sm"
          variant="flat"
          color={
            cellValue === "active"
              ? "success"
              : cellValue === "paused"
              ? "danger"
              : "warning"
          }
        >
          <span className="capitalize text-xs">{cellValue}</span>
        </Chip>
      );

      case "contact":
        return (
          <div>
            <div>
              <span>{cellValue}</span>
            </div>
            <div>
              <div style={{ marginRight: "10px" }}> Phone: {user.phone}</div>
              <div > Email: {user.email}</div>
  
            </div>
          </div>
        );
    default:
      return cellValue;
  }
};
