import { baseApi } from "../../api/baseApi";

export type TEmployeeSummaryResult = {
  totalEmployees: number;
  activeEmployees: number;
  inactiveEmployees: number;
};

export type TEmployeeSummaryResponse = {
  success: boolean;
  message: string;
  result: TEmployeeSummaryResult;
};

export type TEmployerSummaryResult = {
  totalEmployers: number;
  activeEmployers: number;
  inactiveEmployers: number;
};

export type TEmployerSummaryResponse = {
  success: boolean;
  message: string;
  result: TEmployerSummaryResult;
};

export type TOverviewStatsResult = {
  totalJobs: number;
  activeJobs: number;
  totalUsers: number;
};

export type TOverviewStatsResponse = {
  success: boolean;
  message: string;
  result: TOverviewStatsResult;
};

const recruiterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployeeSummary: builder.query<TEmployeeSummaryResponse, void>({
      query: () => ({
        url: "admin/employee-summary",
        method: "GET",
      }),
      providesTags: ["recruiters"],
    }),
    getEmployerSummary: builder.query<TEmployerSummaryResponse, void>({
      query: () => ({
        url: "admin/employer-summary",
        method: "GET",
      }),
      providesTags: ["recruiters"],
    }),
    getOverviewStats: builder.query<TOverviewStatsResponse, void>({
      query: () => ({
        url: "admin/overview-stats",
        method: "GET",
      }),
      providesTags: ["recruiters"],
    }),
  }),
});

export const {
  useGetEmployeeSummaryQuery,
  useGetEmployerSummaryQuery,
  useGetOverviewStatsQuery,
} = recruiterApi;
