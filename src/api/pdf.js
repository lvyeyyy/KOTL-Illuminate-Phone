import pdf_request from '../utils/pdf-request'
import store from '../store'

/**
 * 获取用户印章图片
 * @returns {Promise}
 */
export function getStampImg() {
    return pdf_request({
        url: store.state.settings.pdfServerUrl + '/ess/stampParser/getStampImg',
        method: 'get'
    })
}
/**
 * 用户初始化接口
 * @param pin 用户签名pin码{string}
 * @returns {Promise}
 */
export function initAppUserNegotiate(pin) {
    return pdf_request({
        url: store.state.settings.pdfClientUrl + '/initAppUserNegotiate',
        method: 'post',
        data: { pin: pin }
    })
}
/**
 * 用户初始化状态检查接口
 * @returns {Promise}
 */
export function checkAppUserInited() {
    return pdf_request({
        url: store.state.settings.pdfClientUrl + '/checkAppUserInited',
        method: 'get'
    })
}
/**
 * 协同签章开启接口
 * @param pin 用户签名pin码
 * @returns {Promise}
 */
export function signPdfPretreatment(pin) {
    return pdf_request({
        url: store.state.settings.pdfClientUrl + '/signPdfPretreatment',
        method: 'post',
        data: { pin: pin }
    })
}
