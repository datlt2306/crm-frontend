export interface ITask {
  id: string;
  name: string;
  type: string;
  description: string;
  priority: "low" | "medium" | "high" | "urgent";
  stageId: string;
  startTime: string;
  endTime: string;
  location: string;
  onlineLink: string;
  mandatory: boolean;
  category: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  status: string;
  participants: Participant[];
  files: FileAttachment[];
  feedbacks: Feedback[];
}

export interface Participant {
  id: string;
  user: User;
  role: string;
  status: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
}

export interface FileAttachment {
  id: string;
  fileUrl: string;
  fileName: string;
}

export interface Feedback {
  id: string;
  user: User;
  content: string;
  submittedAt: string;
}

export interface IStage {
  id: string;
  title: string;
}

export interface TaskFormValues {
  title?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  estimate?: string;
  semesterId?: string;
  assignees?: string[];
  priority?: string;
  link?: string;
  file?: any;
}

export interface ISemester {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  status: string;
  blocks: Block[];
}

export interface Block {
  id: string;
  name: string;
}
