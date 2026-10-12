import { baseApi } from "../../api/baseApi";

export type TLoginRequest = {
  email: string;
  password: string;
};

export type TLoginResponse = {
  success: boolean;
  message: string;
  result: {
    userId: string;
    role: string;
    accessToken: string;
    isProfileComplete: boolean;
  };
};

export type TChangePasswordRequest = {
  oldPassword: string;
  newPassword: string;
};

export type TChangePasswordResponse = {
  success: boolean;
  message: string;
};

export type TForgotPasswordRequest = {
  email: string;
};

export type TForgotPasswordResponse = {
  success: boolean;
  message: string;
  result: string; // OTP code (dev only — not used in prod)
};

export type TVerifyForgotOtpRequest = {
  email: string;
  otp: string;
};

export type TVerifyForgotOtpResponse = {
  success: boolean;
  message: string;
  result?: {
    forgetToken: string;
  } | null;
};

export type TResetPasswordRequest = {
  newPassword: string;
  token: string;
};

export type TResetPasswordResponse = {
  success: boolean;
  message: string;
};

export type TUserProfile = {
  id: string;
  email: string;
  fullName: string;
  role: string;
  phoneNumber?: string | null;
  city?: string | null;
  neighborhood?: string | null;
  bio?: string | null;
  profileImage?: string | null;
  designation?: string[];
  skills?: string[];
  availabilityStart?: string | null;
  availabilityEnd?: string | null;
  cv?: string | null;
  contactPerson?: string | null;
  createdAt: string;
  isSubscribed: boolean;
  subscriptionExpireAt?: string | null;
  subscriptionStatus?: string | null;
};

export type TGetMeResponse = {
  success: boolean;
  message: string;
  result: TUserProfile;
};

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<TLoginResponse, TLoginRequest>({
      query: (userInfo) => ({
        url: "auth/login",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["user"],
    }),
    loginWithGoogle: builder.mutation({
      query: (userInfo) => {
        console.log({ userInfo });
        return {
          url: "google-login",
          method: "POST",
          body: userInfo,
        };
      },
      invalidatesTags: ["user"],
    }),
    forgotPassword: builder.mutation<TForgotPasswordResponse, TForgotPasswordRequest>({
      query: (body) => ({
        url: "auth/send-forgot-otp",
        method: "POST",
        body,
      }),
    }),
    updateUser: builder.mutation<{ success: boolean; message: string; result?: unknown }, FormData>({
      query: (formData) => {
        return {
          url: "auth/me/update",
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["user"],
    }),
    register: builder.mutation({
      query: (userInfo) => {
        return {
          url: "register",
          method: "POST",
          body: userInfo,
        };
      },
    }),
    otp: builder.mutation({
      query: (userInfo) => {
        return {
          url: "users/verify-otp",
          method: "POST",
          body: userInfo,
        };
      },
    }),
    verifyForgotOtp: builder.mutation<
      TVerifyForgotOtpResponse,
      TVerifyForgotOtpRequest
    >({
      query: (body) => ({
        url: "auth/verify-forgot-otp",
        method: "POST",
        body,
      }),
    }),
    getMe: builder.query<TGetMeResponse, void>({
      query: () => ({
        url: "auth/me",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    changePassword: builder.mutation<TChangePasswordResponse, TChangePasswordRequest>({
      query: (body) => ({
        url: "auth/change-pass",
        method: "PATCH",
        body,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useLoginMutation,
  useLoginWithGoogleMutation,
  useForgotPasswordMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useOtpMutation,
  useGetMeQuery,
  useChangePasswordMutation,
  useVerifyForgotOtpMutation,
} = authApi;
