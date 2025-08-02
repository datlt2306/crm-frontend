import React from "react";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select, Switch, Space, Button } from "antd";
import { DeleteButton, SaveButton, ListButton } from "@refinedev/antd";
import { useEffect, useState } from "react";

export const UserEdit: React.FC = () => {
    const { formProps, saveButtonProps, form, queryResult } = useForm({ resource: "users" });

    const [isCNBM, setIsCNBM] = useState(false);

    useEffect(() => {
        const role = queryResult?.data?.data?.role;
        if (role === "CNBM") {
            setIsCNBM(true);
        }
    }, [queryResult?.data?.data]);

    return (
        <Edit
            saveButtonProps={saveButtonProps}
            canDelete={false} // ẩn mặc định nút delete
            headerButtons={({ defaultButtons }) => (
                <Space>
                    <ListButton />
                    {isCNBM && (
                        <>
                            <SaveButton {...saveButtonProps} />
                            <DeleteButton resource="users" recordItemId={queryResult?.data?.data?.id} />
                        </>
                    )}
                </Space>
            )}
        >
            <Form {...formProps} layout="vertical">
                <Form.Item label="Tên" name="name" rules={[{ required: true }]}> <Input /> </Form.Item>
                <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}> <Input /> </Form.Item>
                <Form.Item label="Vai trò" name="role" rules={[{ required: true }]}>
                    <Select
                        options={[
                            { value: "GV", label: "Giảng viên" },
                            { value: "CNBM", label: "CNBM" },
                        ]}
                    />
                </Form.Item>
                <Form.Item label="Trạng thái" name="isActive" valuePropName="checked">
                    <Switch checkedChildren="Hoạt động" unCheckedChildren="Ngừng" />
                </Form.Item>
                <Form.Item label="Số điện thoại" name="phone"> <Input /> </Form.Item>
            </Form>
        </Edit>
    );
};

export default UserEdit;
