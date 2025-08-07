import React from "react";
import { KanbanBoard, KanbanBoardContainer } from "./list/board";
import { DragEndEvent } from "@dnd-kit/core";
import { KanbanColumn, KanbanColumnSkeleton } from "./list/column";
import { HttpError, useList, useNavigation, useUpdate } from "@refinedev/core";
import { ProjectCardMemo, ProjectCardSkeleton } from "./list/card";
import { KanbanItem } from "./list/item";
import { KanbanAddCardButton } from "../components/button";
import { IStage, ITask } from "@/types/Task";

const TasksListPage = ({ children }: React.PropsWithChildren) => {
  const { data: tasks, isLoading: isLoadingTasks } = useList<ITask, HttpError>({
    resource: "activities",
    // pagination: { current: 1, pageSize: 100 }
  })

  const { data: stages, isLoading: isLoadingStages } = useList<
    IStage,
    HttpError
  >({
    resource: "stages",
  });

  console.log("tasks", tasks);
  console.log("stages", stages);

  const [localTasks, setLocalTasks] = React.useState<ITask[] | undefined>(
    undefined
  );

  React.useEffect(() => {
    if (tasks?.data) {
      setLocalTasks(tasks.data);
    }
  }, [tasks?.data]);

  const taskStages = React.useMemo(() => {
    if (!localTasks || !stages?.data)
      return {
        stages: [],
      };

    const unassignedStage = localTasks.filter((task) => !task.stageId);

    // prepare unassigned stage
    const grouped = stages.data.map((stage) => ({
      ...stage,
      tasks: localTasks.filter((task) => task.stageId === stage.id),
    }));

    return {
      unassignedStage,
      columns: grouped,
    };
  }, [localTasks, stages]);

  console.log("taskStages", taskStages);

  const { replace } = useNavigation();

  const { mutate } = useUpdate({
    resource: "activities",
  });

  const handleOnDragEnd = (event: DragEndEvent) => {
    // Handle the drag end event here
    const stageId = event.over?.id as string;
    const taskId = event.active.id as string;
    const taskStageId = event.active.data.current?.stageId;

    if (taskStageId === stageId) {
      return;
    }

    // Cập nhật localTasks để re-render UI trước
    setLocalTasks((prev) =>
      prev?.map((task) =>
        task.id === taskId ? { ...task, stageId: stageId } : task
      )
    );

    mutate({
      id: taskId,
      values: {
        stageId,
      },
    });
  };

  const handleAddCard = (args: { stageId: number | string }) => {
    const path =
      args.stageId === "unassigned"
        ? "/activities/new"
        : `/activities/new?stageId=${args.stageId}`;

    replace(path);
  };

  const isLoading = isLoadingTasks || isLoadingStages;

  if (isLoading) return <PageSkeleton />;

  return (
    <>
      <KanbanBoardContainer>
        <KanbanBoard onDragEnd={handleOnDragEnd}>
          <KanbanColumn
            id={"unassigned"}
            title={"unassigned"}
            count={taskStages.unassignedStage?.length || 0}
            onAddClick={() => handleAddCard({ stageId: "unassigned" })}
          >
            {taskStages.unassignedStage?.map((task) => {
              return (
                <KanbanItem
                  key={task.id}
                  id={task.id}
                  data={{ ...task, stageId: "unassigned" }}
                >
                  <ProjectCardMemo
                    {...task}
                    dueDate={task.startTime || undefined}
                  />
                </KanbanItem>
              );
            })}
            {!taskStages.unassignedStage?.length && (
              <KanbanAddCardButton
                onClick={() =>
                  handleAddCard({
                    stageId: stages?.data[0].id || "",
                  })
                }
              />
            )}
          </KanbanColumn>
          {taskStages.columns?.map((column) => {
            return (
              <KanbanColumn
                key={column.id}
                id={column.id}
                title={column.title}
                count={column.tasks.length}
                onAddClick={() => handleAddCard({ stageId: column.id })}
              >
                {isLoading && <ProjectCardSkeleton />}
                {!isLoading &&
                  column.tasks.map((task) => {
                    return (
                      <KanbanItem key={task.id} id={task.id} data={task}>
                        <ProjectCardMemo
                          {...task}
                          dueDate={task.startTime || undefined}
                        />
                      </KanbanItem>
                    );
                  })}
                {!column.tasks.length && (
                  <KanbanAddCardButton
                    onClick={() =>
                      handleAddCard({
                        stageId: column.id,
                      })
                    }
                  />
                )}
              </KanbanColumn>
            );
          })}
        </KanbanBoard>
      </KanbanBoardContainer>
      {children}
    </>
  );
};

const PageSkeleton = () => {
  const columnCount = 6;
  const itemCount = 4;

  return (
    <KanbanBoardContainer>
      {Array.from({ length: columnCount }).map((_, index) => {
        return (
          <KanbanColumnSkeleton key={index}>
            {Array.from({ length: itemCount }).map((_, index) => {
              return <ProjectCardSkeleton key={index} />;
            })}
          </KanbanColumnSkeleton>
        );
      })}
    </KanbanBoardContainer>
  );
};

export default TasksListPage;
