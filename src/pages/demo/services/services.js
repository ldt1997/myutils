import { post, get } from "@cbd/fetch-web";

/** 接口描述
 *@param {string} param
 */
const apiName = ({ param }) => post(`/path`, { param });

export default { apiName };
