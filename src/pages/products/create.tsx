import { Create, useForm } from "@refinedev/antd";
import { DatePicker, Form, Input, Select } from "antd";
import dayjs from "dayjs"; 

export const SemestersCreate = () => {
  const { formProps, form, saveButtonProps, onFinish } = useForm({
    warnWhenUnsavedChanges: false, // tắt cảnh báo mỗi khi không tạo mới
  });

  //  Tự động tính ngày kết thúc sau 90 ngày từ ngày bắt đầu
  const handleStartDateChange = (date: any) => {
    if (date) {
      const endDate = dayjs(date).add(90, "day");
      form.setFieldsValue({ endDate });
    }
  };

  const handleFinish = async () => {
    const values = form.getFieldsValue(true);

    // xử lý khi submit
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

    return onFinish?.(payload);
  };

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item name="name" label="Tên học kỳ" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Mô tả" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="startDate" label="Ngày bắt đầu" rules={[{ required: true }]}>
          <DatePicker
            style={{ width: "100%" }}
            onChange={handleStartDateChange}
          />
        </Form.Item>
        <Form.Item name="endDate" label="Ngày kết thúc" rules={[{ required: true }]}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="status" label="Trạng thái" rules={[{ required: true }]}>
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
    </Create>
  );
};
