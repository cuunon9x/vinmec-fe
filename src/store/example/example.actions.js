import * as constants from "../constants/example";

export function getListProductAction(payload) {
  return {
    type: constants.GET_LIST_PRODUCT_REQUEST_START,
    payload,
  };
}
