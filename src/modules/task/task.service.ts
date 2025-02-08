import { entities } from "../../config/constants";
import Task from "./task.model";
import { IDType, QueryParams } from "../../types/requestResponse";
import {
  ITask,
  ITaskUpdatePayload,
} from "./task.type";
import getSearchAndPagination from "../../utils/queryHandler";
//
const createTask = async (data: ITask) =>
  await Task.create(data);
//
const getSingleTask = async (id: IDType) => Task.findById(id);
//
const updateTask = async ({ id, data }: ITaskUpdatePayload) =>
  await Task.findByIdAndUpdate(id, data, { new: true });
//
const deleteTask = async (id: IDType) =>
  await Task.findByIdAndDelete(id);
//
async function getTasks(query: QueryParams) {
  try {
    const {
      currentPage,
      viewLimit,
      viewSkip,
      sortBy,
      sortOrder,
      filterConditions,
      sortConditions,
    } = getSearchAndPagination({ query, entity: entities.task });

    const fetchResult = await Task.find(filterConditions)
      .sort(sortConditions)
      .skip(viewSkip)
      .limit(viewLimit);

    const total = await Task.countDocuments(filterConditions);
    return {
      meta: {
        total,
        limit: viewLimit,
        page: currentPage,
        skip: viewSkip,
        sortBy,
        sortOrder,
      },
      data: fetchResult,
    };
  } catch (error) {
    return error;
  }
}

export default {
  createTask,
  updateTask,
  getSingleTask,
  deleteTask,
  getTasks,
};
