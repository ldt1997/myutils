import { post, get } from "utils/request";

/** 接口描述
 *@param {string} param
 */
const apiName = ({ param }) => post(`/path`, { param });

export default { apiName };
