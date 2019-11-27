import { message } from "antd";
import apis from "../services/pageServices";

const initData = { list: [] };

export default {
  namespace: "namesapce",
  state: initData,
  effects: {
    // 获取列表
    *getList({ payload }, { call, put }) {
      const { data = [], errCode } = yield call(apis.getList, payload);
      if (errCode === 0) {
        yield put({ type: "saveList", payload: data });
      }
    },
    // 新增
    *Add({ payload }, { call }) {
      const { errCode } = yield call(apis.apiName, payload);
      if (errCode === 0) {
        message.success("");
      }
      return errCode;
    }
  },
  reducers: {
    saveList: (state, { payload }) => ({
      ...state,
      list: payload
    }),
    updateState: (state, { payload }) => ({ ...state, ...payload }),
    clearData: () => ({ ...initData })
  }
};
