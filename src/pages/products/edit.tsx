import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, DatePicker, Select } from "antd";
import { useEffect } from "react";
import dayjs from "dayjs";

export const SemesterstEdit = () => {
  const { formProps, form, queryResult, saveButtonProps } = useForm();

  // đổ dữ liệu vào form khi submit
  useEffect(() => {
    const record = queryResult?.data?.data;
    if (record) {
      form.setFieldsValue({
        ...record,
        startDate: record.startDate ? dayjs(record.startDate) : null,
        endDate: record.endDate ? dayjs(record.endDate) : null,
        blocks: Array.isArray(record.blocks)
          ? record.blocks.map((b: any) => b.name).join(", ")
          : "",
      });
    }
  }, [queryResult?.data?.data, form]);

  // Tự động tính ngày kết thúc sau 90 ngày từ ngày bắt đầu
  const handleStartDateChange = (date: dayjs.Dayjs | null) => {
    if (date) {
      const endDate = date.add(90, "day");
      form.setFieldsValue({ endDate });
    }
  };

  const handleFinish = async () => {
    const values = form.getFieldsValue(true);

    const payload = {
      ...values,
      startDate: values.startDate?.toISOString(),
      endDate: values.endDate?.toISOString(),
      status: values.status,
      blocks: (values.blocks || "")
        .split(",")
        .map((b: any) => b.trim())
        .filter(Boolean)
        .map((name: any) => ({ name })),
    };

    return formProps?.onFinish?.(payload);
  };

  return (
    <Edit saveButtonProps={saveButtonProps} canDelete={false}>
      <Form {...formProps} form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item name="name" label="Tên học kỳ" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Mô tả" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="startDate"
          label="Ngày bắt đầu"
          rules={[{ required: true }]}
        >
          <DatePicker
            style={{ width: "100%" }}
            onChange={handleStartDateChange}
          />
        </Form.Item>
        <Form.Item
          name="endDate"
          label="Ngày kết thúc"
          rules={[{ required: true }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="status"
          label="Trạng thái"
          rules={[{ required: true }]}
        >
          <Select
            options={[
              { label: "Ongoing", value: "Ongoing" },
              { label: "Completed", value: "Completed" },
              { label: "Upcoming", value: "Upcoming" },
            ]}
            placeholder="Chọn trạng thái"
          />
        </Form.Item>
        <Form.Item
          name="blocks"
          label="Blocks (phân cách bằng dấu phẩy)"
          rules={[{ required: true }]}
        >
          <Input placeholder="Block 1, Block 2" />
        </Form.Item>
      </Form>
    </Edit>
  );
};
