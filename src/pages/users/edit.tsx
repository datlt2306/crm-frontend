import React, { useEffect, useState } from "react";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select, Switch, Space } from "antd";

export const UserEdit: React.FC = () => {
    const { formProps, saveButtonProps, form, queryResult } = useForm({ resource: "users" });

    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        const recordRole = queryResult?.data?.data?.role;
        if (recordRole) {
            setRole(recordRole);
        }
    }, [queryResult?.data?.data]);

    const isCNBM = role === "CNBM";
    const isGV = role === "GV";

    return (
        <Edit title="Chỉnh sửa thông tin giảng viên"
            saveButtonProps={saveButtonProps}
            canDelete={false}
            headerButtons={[]}
        >
            <Form {...formProps} layout="vertical" form={form}>
                <Form.Item label="Tên" name="name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
                    <Input />
                </Form.Item>

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

                <Form.Item label="Số điện thoại" name="phone">
                    <Input />
                </Form.Item>
            </Form>
        </Edit>
    );
};

export default UserEdit;
