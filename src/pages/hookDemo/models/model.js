import { message } from "antd";
// TODO： change path
import apis from "../services/pageServices";

const initData = {
  // TODO： change initData
  list: []
};

export default {
  // TODO： change namespace
  namespace: "pageModel",
  state: initData,
  effects: {
    // TODO： define effect func
    *add({ payload }, { call }) {
      const { errCode, data } = yield call(apis.add, payload);
      if (errCode === 0) {
        yield put({
          type: "dump",
          payload: {
            list: data || []
          }
        });
      }
    }
  },
  reducers: {
    dump: (state, { payload }) => ({
      ...state,
      ...payload
    }),
    clearData: () => ({ ...initData })
  }
};
