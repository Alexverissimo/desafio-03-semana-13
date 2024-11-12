import { useEffect, useState } from "react";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

interface AxiosConfigRequest {
  axiosInstance: AxiosInstance;
  method: 'get' | 'post' | 'put' | 'delete';
  url: any;
  otherConfig?: AxiosRequestConfig;
}

interface ApiResponse {
  name:string,
  login:string,
  avatar_url:string,
  location:string,
  bio:string
}

export default function useAxios(configRequest: AxiosConfigRequest): [ApiResponse | null, boolean, string | null] {
  const { axiosInstance, method, url, otherConfig = {} } = configRequest;

  const [dataList, setDataList] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: AxiosResponse<ApiResponse> = await axiosInstance[method](url, {
          ...otherConfig
        });
        setDataList(res.data);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return [dataList, loading, error];
}
