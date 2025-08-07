import React from "react";
import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Select, Switch } from "antd";

export const UserCreate: React.FC = () => {
  const { formProps, saveButtonProps } = useForm({ resource: "users" });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Tên"
          name="name"
          rules={[
            { required: true, message: "Vui lòng nhập tên" },
            // { min: 2, message: "Tên phải có ít nhất 2 ký tự" },
            // { max: 50, message: "Tên không được quá 50 ký tự" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email" },
            { type: "email", message: "Email không hợp lệ" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Vai trò"
          name="role"
          rules={[
            { required: true, message: "Vui lòng chọn vai trò" }
          ]}
        >
          <Select
            options={[
              { value: "GV", label: "Giảng viên" },
              { value: "CNBM", label: "CNBM" },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Trạng thái"
          name="isActive"
          valuePropName="checked"
          initialValue={true}
        >
          <Switch checkedChildren="Hoạt động" unCheckedChildren="Ngừng" />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[
            {
              message:
                "Số điện thoại không hợp lệ. Phải có 10 chữ số và bắt đầu bằng 0",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Create>
  );
};

export default UserCreate;
