import axios from "axios";
import { addQueryArg } from "./commons";
import { prepareFinalObject } from "../ui-redux/screen-configuration/actions";
import createStore from "../ui-redux/store";

const { store } = createStore();

export const getToken = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
  return userInfo.session_id;
};

let axiosInstances = {
  instanceOne: axios.create({
    baseURL:
      process.env.REACT_APP_JAVA_REST || window.location.origin,
    headers: {
      "Content-Type": "application/json"
    }
  }),
  instanceTwo: axios.create({
    baseURL:
      process.env.REACT_APP_NODE_REST ||  window.location.origin,
    headers: {
      "Content-Type": "application/json"
    }
  })
};

const wrapRequestBody = requestBody => {
  return requestBody;
};

export const httpRequest = async ({
  method = "post",
  endPoint,
  queryObject = [],
  requestBody = {},
  instance = "instanceOne",
  hasSpinner = true,
  contentType = "application/x-www-form-urlencoded",
  headers = {}
}) => {
  if (hasSpinner) {
    store.dispatch(prepareFinalObject("spinner", true));
  }
  let apiError = "Api Error";

  var headerConfig = {
    headers
  };
  const session_id = getToken();
  if (contentType) {
    switch (contentType) {
      case "application/x-www-form-urlencoded":
        var params = new URLSearchParams();
        headerConfig.headers["Content-Type"] = contentType;
        if (session_id) {
          params.append("session.id", session_id);
          params.append("session_id", session_id);
        }
        for (var variable in requestBody) {
          if (requestBody.hasOwnProperty(variable)) {
            params.append(variable, requestBody[variable]);
          }
        }
        requestBody = params;
        break;
      default:
        requestBody.session_id = session_id;
        headers["session_id"] = session_id;
        requestBody["session.id"] = session_id;
    }
  }

  endPoint = addQueryArg(endPoint, queryObject);
  var response;
  try {
    switch (method) {
      case "post":
        response = await axiosInstances[instance].post(
          endPoint,
          wrapRequestBody(requestBody),
          headerConfig
        );
        break;
      default:
        response = await axiosInstances[instance].get(endPoint, headerConfig);
    }
    const responseStatus = parseInt(response.status, 10);
    if (hasSpinner) {
      store.dispatch(prepareFinalObject("spinner", false));
    }
    if (responseStatus === 200 || responseStatus === 201) {
      return response.data;
    }
  } catch (error) {
    const { status } = error.response;
    if (status === 401) {
      window.localStorage.clear();
      window.location.reload();
      //alert("Somthing went wrong!");
    }
    if (hasSpinner) {
      store.dispatch(prepareFinalObject("spinner", false));
    }
  }
  if (hasSpinner) {
    store.dispatch(prepareFinalObject("spinner", false));
  }
  return apiError;
};
