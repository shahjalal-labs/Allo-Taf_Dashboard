export type TTopJob = {
  id: string;
  title: string;
  businessName: string;
  city: string;
  neighborhood: string;
  visibilityEndDate: string;
  applicantCount: number;
  createdAt: string;
};

export type TTopJobsResponse = {
  success: boolean;
  message: string;
  result: TTopJob[];
};

import { baseApi } from "../../api/baseApi";

export type TJobSummaryResult = {
  totalJobs: number;
  activeJobs: number;
  totalApplications: number;
};

export type TJobSummaryResponse = {
  success: boolean;
  message: string;
  result: TJobSummaryResult;
};

export type TEmployer = {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  profileImage: string;
};

export type TJob = {
  id: string;
  title: string;
  description: string;
  skills: string[];
  visibilityStartDate: string;
  visibilityEndDate: string;
  city: string;
  neighborhood: string;
  remuneration: number;
  whatsApp: string;
  businessName: string;
  urgencyLevel: string;
  work_hours: number;
  employerId: string;
  createdAt: string;
  updatedAt: string;
  employer: TEmployer;
  applicantCount: number;
};

export type TJobsQueryParams = {
  limit?: number;
  page?: number;
  sortOrder?: "asc" | "desc";
  searchTerm?: string;
  status?: string;
  sortBy?: string;
};

export type TJobsResponse = {
  success: boolean;
  message: string;
  result: {
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
    data: TJob[];
  };
};

export type TApplicant = {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  profileImage: string | null;
  skills: string[];
  designation: string[];
  city: string;
  neighborhood: string;
};

export type TRecentApplicant = {
  id: string;
  jobId: string;
  applicantId: string;
  status: string;
  appliedAt: string;
  updatedAt: string;
  applicant: TApplicant;
};

export type TJobDetailsResult = {
  id: string;
  title: string;
  description: string;
  skills: string[];
  visibilityStartDate: string;
  visibilityEndDate: string;
  city: string;
  neighborhood: string;
  remuneration: number;
  whatsApp: string;
  businessName: string;
  urgencyLevel: string;
  work_hours: number;
  employerId: string;
  createdAt: string;
  updatedAt: string;
  employer: TEmployer & { bio?: string; city?: string; neighborhood?: string };
  applicantStats: {
    total: number;
  };
  recentApplicants: TRecentApplicant[];
};

export type TJobDetailsResponse = {
  success: boolean;
  message: string;
  result: TJobDetailsResult;
};

const jobApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getJobSummary: builder.query<TJobSummaryResponse, void>({
      query: () => ({
        url: "admin/job-summary",
        method: "GET",
      }),
      providesTags: ["jobs"],
    }),
    getJobs: builder.query<TJobsResponse, TJobsQueryParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params) {
          Object.entries(params).forEach(([key, val]) => {
            if (val !== undefined && val !== null && val !== "") {
              queryParams.append(key, String(val));
            }
          });
        }
        return {
          url: "admin/jobs",
          method: "GET",
          params: queryParams,
        };
      },
      providesTags: ["jobs"],
    }),
    deleteJob: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `admin/jobs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["jobs"],
    }),
    getJobDetails: builder.query<TJobDetailsResponse, string>({
      query: (id) => ({
        url: `admin/jobs/${id}`,
        method: "GET",
      }),
      providesTags: ["jobs"],
    }),
    getTopJobs: builder.query<TTopJobsResponse, void>({
      query: () => ({
        url: "admin/top-jobs",
        method: "GET",
      }),
      providesTags: ["jobs"],
    }),
  }),
});

export const {
  useGetJobSummaryQuery,
  useGetJobsQuery,
  useDeleteJobMutation,
  useGetJobDetailsQuery,
  useGetTopJobsQuery,
} = jobApi;
