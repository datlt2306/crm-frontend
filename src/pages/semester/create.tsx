import { Create, useForm } from "@refinedev/antd";
import { DatePicker, Form, Input, Select, notification } from "antd";
import dayjs from "dayjs";

export const SemestersCreate = () => {
  const { formProps, form, saveButtonProps } = useForm({
    warnWhenUnsavedChanges: false,
  });

  const [api, contextHolder] = notification.useNotification();

  const handleStartDateChange = (date: any) => {
    if (date) {
      const endDate = dayjs(date).add(90, "day");
      form.setFieldsValue({ endDate });
    }
  };

  const handleFinish = async (values: any) => {
    // Validate FE trước khi gửi BE
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

    // Gửi request nếu hợp lệ
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
      <Create saveButtonProps={saveButtonProps}>
        <Form {...formProps} form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            label="Tên học kỳ"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên học kỳ" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Ngày bắt đầu"
            name="startDate"
            rules={[{ required: true, message: "Vui lòng chọn ngày bắt đầu" }]}
          >
            <DatePicker style={{ width: "100%" }} onChange={handleStartDateChange} />
          </Form.Item>

          <Form.Item
            label="Ngày kết thúc"
            name="endDate"
            rules={[{ required: true, message: "Vui lòng chọn ngày kết thúc" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Trạng thái"
            name="status"
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
            label="Blocks (phân cách bằng dấu phẩy)"
            name="blocks"
            rules={[{ required: true, message: "Vui lòng nhập ít nhất 1 block" }]}
          >
            <Input placeholder="Block 1, Block 2" />
          </Form.Item>
        </Form>
      </Create>
    </>
  );
};
