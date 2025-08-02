import React from "react";
import {
  List,
  useTable,
  EditButton,
  DeleteButton,
  CreateButton,
} from "@refinedev/antd";
import { Table, Button } from "antd";
import useNotification from "antd/es/notification/useNotification";

interface IUser {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive?: boolean;
  phone?: string;
}

export const UserList: React.FC = () => {
  const [notificationApi] = useNotification();

  // Lấy role từ localStorage
  const userStr =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  let role: string | null = null;
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      role = user?.data?.role;
    } catch (e) {
      role = null;
    }
  }

  const { tableProps } = useTable<IUser>({ resource: "users/all" });

  const handleNotCNBM = () => {
    notificationApi.open({
      type: "error",
      message: "Bạn không phải là CNBM",
    });
  };

  
  return (
    <List title="Danh Sách Giảng Viên"
      headerButtons={
        role === "CNBM" ? (
          <CreateButton />
        ) : (
          <Button onClick={handleNotCNBM}>Tạo mới</Button>
        )
      }
    >
      <Table
        {...tableProps}
        rowKey="id"
        columns={[
          
          {
            title: "Họ và Tên",
            dataIndex: "name",
          },
          {
            title: "Email",
            dataIndex: "email",
          },
          {
            title: "Vai trò",
            dataIndex: "role",
          },
          {
            title: "Trạng thái",
            dataIndex: "isActive",
            render: (value: boolean) => (value ? "Hoạt động" : "Ngừng"),
          },
          {
            title: "Số điện thoại",
            dataIndex: "phone",
          },
          {
            title: "Actions",
            dataIndex: "actions",
            render: (_: any, record: IUser) =>
              role === "CNBM" ? (
                <div style={{ display: "flex", gap: 8 }}>
                  <EditButton recordItemId={record.id} />
                  <DeleteButton recordItemId={record.id} />
                </div>
              ) : null,
          },
        ]}
      />
    </List>
  );
};

export default UserList;
