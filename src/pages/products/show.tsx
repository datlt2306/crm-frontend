import {  Show, TextField } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography } from "antd";

const { Title } = Typography;

export const SemestersShow = () => {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;


  const record = data?.data;

  return (
    <Show isLoading={isLoading} canDelete={false}>
      <Title level={5}>{"ID"}</Title>
      <TextField value={record?.id} />
      <Title level={5}>{"Name"}</Title>
      <TextField value={record?.name} />
      <Title level={5}>{"Description"}</Title>
      <TextField value={record?.description} />
      <Title level={5}>{"StartDate"}</Title>
      <TextField value={record?.startDate} />
      <Title level={5}>{"EndDate"}</Title>
      <TextField value={record?.endDate} />
      <Title level={5}>{"Status"}</Title>
      <TextField value={record?.status} />
      <Title level={5}>{"Blocks"}</Title>
     <TextField value={record?.blocks?.map((block: any) => block.name).join(", ")} />  
  </Show>
  );
};
