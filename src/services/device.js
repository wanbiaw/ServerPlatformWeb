import {request, METHOD} from "@/utils/request";
import {DEVICE} from "@/services/api";

/**
 * device信息获取
 * @returns {Promise<AxiosResponse<T>>}
 * @param params
 */
export async function getDevice(params) {
    return request(DEVICE, METHOD.POST, params)
}

export default {}
