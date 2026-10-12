import { baseApi } from "../../api/baseApi";

export type TUser = {
  id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  role: "EMPLOYEE" | "EMPLOYER" | string;
  status: "Active" | "Inactive" | string;
  profileImage: string | null;
  city: string | null;
  neighborhood: string | null;
  bio: string | null;
  designation: string[];
  skills: string[];
  isSubscribed: boolean;
  subscriptionExpireAt: string | null;
  createdAt: string;
};

export type TUsersQueryParams = {
  searchTerm?: string;
  sortBy?: string;
  limit?: number;
  role?: "EMPLOYEE" | "EMPLOYER" | string;
  sortOrder?: "asc" | "desc";
  status?: string;
  page?: number;
};

export type TUsersResponse = {
  success: boolean;
  message: string;
  result: {
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
    data: TUser[];
  };
};

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<TUsersResponse, TUsersQueryParams | void>({
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
          url: "admin/users",
          method: "GET",
          params: queryParams,
        };
      },
      providesTags: ["user"],
    }),
  }),
});

export const { useGetUsersQuery } = userApi;
