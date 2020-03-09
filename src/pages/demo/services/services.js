import { post, get } from "utils/request";

/** 接口描述
 *@param {string} param
 */
const apiName = ({ param }) => post(`/path1`, { param });

export default { apiName };
