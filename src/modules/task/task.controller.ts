import { entities } from "../../config/constants";
import taskService from "./task.service";
import {
  sendFetchResponse,
  sendSingleFetchResponse,
  sendErrorResponse,
  sendCreateResponse,
  sendUpdateResponse,
  sendDeletionResponse
} from "../../utils/responseHandler";
import { TypeController } from "../../types/requestResponse";
//

export const getTasks: TypeController = async (req, res) => {
  try {
    const result = await taskService.getTasks(req.query);
    sendFetchResponse({ res, result, entity: entities.task });
  } catch (error) {
    console.error(error);
    sendErrorResponse({
      res,
      error,
      entity: entities.task,
    });
  }
};

export const getSingleTask: TypeController = async (req, res) => {
  try {
    const result = await taskService.getSingleTask(req.params.id);
    sendSingleFetchResponse({ res, result, entity: entities.task });
  } catch (error) {
    console.error(error);
    sendErrorResponse({
      res,
      error,
      entity: entities.task,
    });
  }
};

export const createTask: TypeController = async (req, res) => {
  try {
    const result = await taskService.createTask(req.body);
    console.log(`--log-- `+JSON.stringify(result))
    sendCreateResponse({ res, result, entity: entities.task });
  } catch (error) {
    console.error(error);
    sendErrorResponse({
      res,
      error,
      entity: entities.task,
    });
  }
};

export const updateTask: TypeController = async (req, res) => {
  try {
    const result = await taskService.updateTask({
      id: req.params.id,
      data: req.body,
    });
    sendUpdateResponse({ res, result, entity: entities.task });
  } catch (error) {
    console.error(error);
    sendErrorResponse({
      res,
      error,
      entity: entities.task,
    });
  }
};
// 

export const deleteTask: TypeController = async (req, res) => {
  try {
    const result = await taskService.deleteTask(req.params.id);
    sendDeletionResponse({ res, result, entity: entities.task });
  } catch (error) {
    console.error(error);
    sendErrorResponse({
      res,
      error,
      entity: entities.task,
    });
  }
};

export default {
  getTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask,
};
