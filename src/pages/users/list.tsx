import React from "react";
import {
  List,
  useTable,
  EditButton,
  DeleteButton,
  CreateButton,
} from "@refinedev/antd";
import { Table } from "antd";

interface IUser {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive?: boolean;
  phone?: string;
}

export const UserList: React.FC = () => {
  // Lấy user từ localStorage
  const userStr =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;

  let role: string | null = null;
  let userId: string | null = null;

  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      role = user?.data?.role;
      userId = user?.data?.id;
    } catch (e) {
      role = null;
    }
  }

  // Nếu role là CNBM -> get all, nếu là GV -> chỉ lấy 1 user
  const resourceName = role === "CNBM" ? "users/all" : `users/${userId}`;

  const { tableProps } = useTable<IUser>({
    resource: resourceName,
    syncWithLocation: false,
  });

  // Nếu GV thì tableProps.dataSource sẽ chỉ là 1 object -> convert thành mảng để Table không lỗi
  const fixedDataSource =
    role === "GV" && tableProps.dataSource
      ? Array.isArray(tableProps.dataSource)
        ? tableProps.dataSource
        : [tableProps.dataSource]
      : tableProps.dataSource;

  return (
    <List
      title="Danh Sách Giảng Viên"
      headerButtons={role === "CNBM" ? [<CreateButton key="create">Tạo mới</CreateButton>] : []}
    >
      <Table
        {...tableProps}
        dataSource={fixedDataSource}
        rowKey="id"
        columns={[
          { title: "Họ và Tên", dataIndex: "name" },
          { title: "Email", dataIndex: "email" },
          { title: "Vai trò", dataIndex: "role" },
          {
            title: "Trạng thái",
            dataIndex: "isActive",
            render: (value: boolean) => (value ? "Hoạt động" : "Ngừng"),
          },
          { title: "Số điện thoại", dataIndex: "phone" },
          {
            title: "Actions",
            dataIndex: "actions",
            render: (_: any, record: IUser) => {
              if (role === "CNBM") {
                return (
                  <div style={{ display: "flex", gap: 8 }}>
                    <EditButton recordItemId={record.id} />
                    <DeleteButton recordItemId={record.id} />
                  </div>
                );
              }

              if (role === "GV") {
                return (
                  <div style={{ display: "flex", gap: 8 }}>
                    <EditButton recordItemId={record.id}>Chỉnh sửa</EditButton>
                  </div>
                );
              }

              return null;
            },
          },
        ]}
      />
    </List>
  );
};

export default UserList;
