import { baseApi } from "../../api/baseApi";

export type TUser = {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  profileImage: string | null;
};

export type TSubscription = {
  id: string;
  userId: string;
  plan: "MONTHLY" | "YEARLY" | string;
  status: "PENDING" | "ACTIVE" | "REJECTED" | string;
  startDate: string | null;
  endDate: string | null;
  paymentMethod: string;
  phoneNumber: string;
  transactionId: string;
  proofImage: string[];
  amount: number;
  adminId: string | null;
  adminNote: string | null;
  verifiedAt: string | null;
  createdAt: string;
  updatedAt: string;
  user: TUser | null;
};

export type TSubscriptionsQueryParams = {
  limit?: number;
  page?: number;
  sortOrder?: "asc" | "desc";
  searchTerm?: string;
  status?: string;
  sortBy?: string;
};

export type TSubscriptionsResponse = {
  success: boolean;
  message: string;
  result: {
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
    data: TSubscription[];
  };
};

export type TUpdateSubscriptionStatusRequest = {
  id: string;
  status: "ACTIVE" | "REJECTED" | string;
  adminNote: string;
};

const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubscriptions: builder.query<TSubscriptionsResponse, TSubscriptionsQueryParams | void>({
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
          url: "admin/subscriptions",
          method: "GET",
          params: queryParams,
        };
      },
      providesTags: ["subscriptions"],
    }),
    updateSubscriptionStatus: builder.mutation<{ success: boolean; message: string }, TUpdateSubscriptionStatusRequest>({
      query: ({ id, ...body }) => ({
        url: `admin/subscriptions/${id}/status`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["subscriptions"],
    }),
    getTotalEarnings: builder.query<{ success: boolean; result: { totalEarnings: number } }, void>({
      query: () => ({
        url: "admin/total-earning",
        method: "GET",
      }),
      providesTags: ["subscriptions"],
    }),
  }),
});

export const { useGetSubscriptionsQuery, useUpdateSubscriptionStatusMutation, useGetTotalEarningsQuery } = subscriptionApi;
