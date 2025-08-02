import {
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import type { BaseRecord } from "@refinedev/core";
import { Space, Table } from "antd";

export const SemestersList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List title="Học Kỳ">
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="name" title={"Học Kỳ"} />
        <Table.Column dataIndex="description" title={"Mô tả"} />
        <Table.Column dataIndex="startDate" title={"Ngày bắt đầu"} />
        <Table.Column dataIndex="endDate" title={"Ngày kết thúc"} />
        <Table.Column dataIndex="status" title={"Trạng thái"} />
        <Table.Column
          title={"Hành động"}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
