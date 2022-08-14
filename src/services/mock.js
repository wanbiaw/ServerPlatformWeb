import {request,METHOD} from "@/utils/request";
import {GET_HTTP_MOCK,SAVE_HTTP_MOCK,DEL_HTTP_MOCK} from "@/services/api"

/**
 * HttpMock信息获取
 * @returns {Promise<AxiosResponse<T>>}
 * @param params
 */
export async function getHttpMock(params) {
    return request(GET_HTTP_MOCK, METHOD.GET, params)
}

export async function saveHttpMock(params) {
    return request(SAVE_HTTP_MOCK, METHOD.POST,params)
}

export async function delHttpMock(params) {
    return request(DEL_HTTP_MOCK, METHOD.POST,params)
}

export default {}
