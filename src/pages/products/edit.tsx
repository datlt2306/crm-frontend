import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, DatePicker, Select, notification } from "antd";
import { useEffect } from "react";
import dayjs from "dayjs";

export const SemesterstEdit = () => {
  const { formProps, form, queryResult, saveButtonProps } = useForm();
  const [api, contextHolder] = notification.useNotification();

  // Đổ dữ liệu vào form khi load
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

  // Tự động set ngày kết thúc sau 90 ngày
  const handleStartDateChange = (date: dayjs.Dayjs | null) => {
    if (date) {
      const endDate = date.add(90, "day");
      form.setFieldsValue({ endDate });
    }
  };

  const handleFinish = async (values: any) => {
    // Validate FE: Ngày kết thúc phải > ngày bắt đầu
    if (
      values.startDate &&
      values.endDate &&
      !dayjs(values.endDate).isAfter(dayjs(values.startDate), "day")
    ) {
      api.error({
        message: "Lỗi ngày tháng",
        description: "Ngày kết thúc phải lớn hơn ngày bắt đầu",
      });
      return; 
    }

    const payload = {
      ...values,
      startDate: values.startDate?.toISOString(),
      endDate: values.endDate?.toISOString(),
      blocks: (values.blocks || "")
        .split(",")
        .map((b: any) => b.trim())
        .filter(Boolean)
        .map((name: any) => ({ name })),
    };

    formProps?.onFinish?.(payload);
  };

  return (
    <>
      {contextHolder}
      <Edit title="Chỉnh sửa Kỳ học" saveButtonProps={saveButtonProps} canDelete={false} headerButtons={[]} >
        <Form {...formProps} form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            name="name"
            label="Tên học kỳ"
            rules={[{ required: true, message: "Vui lòng nhập tên học kỳ" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="startDate"
            label="Ngày bắt đầu"
            rules={[{ required: true, message: "Vui lòng chọn ngày bắt đầu" }]}
          >
            <DatePicker style={{ width: "100%" }} onChange={handleStartDateChange} />
          </Form.Item>
          <Form.Item
            name="endDate"
            label="Ngày kết thúc"
            rules={[{ required: true, message: "Vui lòng chọn ngày kết thúc" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="status"
            label="Trạng thái"
            rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
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
            rules={[{ required: true, message: "Vui lòng nhập ít nhất 1 block" }]}
          >
            <Input placeholder="Block 1, Block 2" />
          </Form.Item>
        </Form>
      </Edit>
    </>
  );
};
