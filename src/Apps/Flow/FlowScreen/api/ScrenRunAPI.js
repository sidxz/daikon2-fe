import AxiosWithAuth from "../../../../Shared/Axios/AxiosWithAuth";

const axiosWithAuth = new AxiosWithAuth();

const ScreenRunAPI = {
  create: (screenRun) =>
    axiosWithAuth.post(
      `/v2/screen/${screenRun.screenId}/screen-run`,
      screenRun
    ),
  update: (screenRun) =>
    axiosWithAuth.put(
      `/v2/screen/${screenRun.screenId}/screen-run/${screenRun.id}`,
      screenRun
    ),
  delete: (screenId, hitId) =>
    axiosWithAuth.delete(`/v2/screen/${screenId}/screen-run/${hitId}`),
};

export default ScreenRunAPI;
