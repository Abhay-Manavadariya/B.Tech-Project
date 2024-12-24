import axiosApi from './BaseUrl';

export const EquipmentListApi = async () => {
  const response = await axiosApi.get('api/getAllPumpName');
  return response.data;
};
