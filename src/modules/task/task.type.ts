
import { IDType } from "../../types/requestResponse";


export interface ITask {
  title: string;
  shortDescription?: string;
  description: string;
  startDate: Date;
  dueDate: Date;
  isCompleted?: boolean;
  completionPercentage?: number;
  rewardCoins?: number;
}

// Update the interface to use IDType
export interface ITaskUpdatePayload {
  id: IDType;
  data: Partial<ITask>;
}
