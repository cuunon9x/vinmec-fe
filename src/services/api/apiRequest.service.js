import axios from "axios";
import qs from "qs";
import { CANCEL } from "redux-saga";
import { optionsError } from "./toast.service";
import { toast } from "react-toastify";
// import jwt_decode from "jwt-decode";
import { history } from "../../index";
import ROUTES from "../../utils/routers.constant";
// import moment from "moment";

const CancelToken = axios.CancelToken;

let apiUrl = process.env.REACT_APP_API_URL;

const api = axios.create({
  // withCredentials: true,
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => {
    return qs.stringify(params, { indices: false });
  },
});

export function setHeaderToken(token) {
  api.defaults.headers.common.Authorization = token ? `Bearer ${token}` : "";
}

// Implement request cancel
export function get(url, config = {}) {
  let cancel;
  const defaultConfig = {
    ...config,
    cancelToken: new CancelToken((c) => (cancel = c)),
  };
  const request = api
    .get(url, defaultConfig)
    .then(mapData)
    .catch(mapErrorCallAPI);
  request[CANCEL] = () => cancel();
  return request;
}

export function getParams(url, params = null) {
  return api
    .get(url, {
      params: params,
    })
    .then(mapData)
    .catch(mapErrorCallAPI);
}

// tslint:disable-next-line:no-any
function post(url, body, config = {}) {
  let cancel;
  const defaultConfig = {
    ...config,
    cancelToken: new CancelToken((c) => (cancel = c)),
  };
  const request = api
    .post(url, body, defaultConfig)
    .then(mapData)
    .catch(mapErrorCallAPI);
  request[CANCEL] = () => cancel();
  return request;
}

// tslint:disable-next-line:no-any
function put(url, body, config = {}) {
  let cancel;
  const defaultConfig = {
    ...config,
    cancelToken: new CancelToken((c) => (cancel = c)),
  };
  const request = api
    .put(url, body, defaultConfig)
    .then(mapData)
    .catch(mapErrorCallAPI);
  request[CANCEL] = () => cancel();
  return request;
}

// tslint:disable-next-line:no-any
export function patch(url, body, config = {}) {
  let cancel;
  const defaultConfig = {
    ...config,
    cancelToken: new CancelToken((c) => (cancel = c)),
  };
  const request = api
    .patch(url, body, defaultConfig)
    .then(mapData)
    .catch(mapErrorCallAPI);
  request[CANCEL] = () => cancel();
  return request;
}

// tslint:disable-next-line:no-any
export function patchPassword(url, body, config = {}) {
  let cancel;
  const defaultConfig = {
    ...config,
    cancelToken: new CancelToken((c) => (cancel = c)),
  };
  const request = api
    .patch(url, body, defaultConfig)
    .then(() => {
      return "Success";
    })
    .catch(mapErrorCallAPI);
  request[CANCEL] = () => cancel();
  return request;
}

export function _delete(url, config = {}) {
  let cancel;
  const defaultConfig = {
    ...config,
    cancelToken: new CancelToken((c) => (cancel = c)),
  };
  const request = api
    .delete(url, defaultConfig)
    .then(mapData)
    .catch(mapErrorCallAPI);
  request[CANCEL] = () => cancel();
  return request;
}

export function postFormData(url, body) {
  const formData = new FormData();
  Object.keys(body).forEach((key) => {
    formData.append(key, body[key]);
  });
  return api
    .post(url, formData, {
      headers: { "content-type": "multipart/form-data" },
    })
    .then(mapData)
    .catch(mapErrorCallAPI);
}

export function createData(url, data, config = {}) {
  let cancel;
  // const defaultConfig = {
  //   ...config,
  //   cancelToken: new CancelToken((c) => (cancel = c)),
  // };
  const request = api.post(url, data).then(mapData).catch(mapErrorCallAPI);
  request[CANCEL] = () => cancel();
  return request;
}

function mapData(res) {
  return res?.data || res;
}

function mapErrorCallAPI(err) {
  // const token = jwt_decode(localStorage.getItem(AUTH_TOKEN));
  if (err) {
    if (err.response?.data?.type === "BAD_REQUEST") {
      toast(err.response?.data?.description, optionsError);
    } else if (err.response?.data?.type === "NOT_FOUND") {
      toast(err.response?.data?.error, optionsError);
    } else {
      toast("Some thing went wrong!", optionsError);
    }
    if (
      !err?.request?.responseURL?.includes("login") &&
      err.response &&
      err.response.status === 403
    ) {
      history.push(ROUTES.NOT_FOUND.USE_ROLE);
    }
    if (
      err?.request?.responseURL?.includes("login") &&
      err.response &&
      err.response.status === 403
    ) {
      history.push("/auth");
    }
  }
  throw err;
}

export function deleteAPI(url, params = null) {
  return api
    .delete(url, {
      params: params,
    })
    .then(mapData)
    .catch(mapErrorCallAPI);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get,
  getParams,
  post,
  postFormData,
  patch,
  put,
  deleteAPI,
  _delete,
};
