import {request,METHOD} from "@/utils/request";
import {HTTP_MOCK} from '@/services/api';

/**
 * http_mock信息获取
 * @returns {Promise<AxiosResponse<T>>}
 * @param params
 */
export async function getHttpMock(params) {
    return request(HTTP_MOCK, METHOD.POST, params)
}

export default {
    getHttpMock
}