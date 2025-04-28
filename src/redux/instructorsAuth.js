import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { clearTokens, setTokens } from "./slice/authSlice";

export const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_GLOBAL_URL}`,
        prepareHeaders: (headers, { getState }) => {
            const { accessToken } = getState().auth;
            if (accessToken) {
                headers.set('Authorization', `Bearer ${accessToken} type=access`);
            }
            return headers;
        },
    })(args, api, extraOptions);

    if (result?.error?.status === 401) {
        const refreshToken = api.getState().auth.refreshToken;
        console.log(refreshToken);
        if (refreshToken) {
            const refreshResponse = await fetch(`${import.meta.env.VITE_API_GLOBAL_URL}/partner/auth/refresh-token`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${refreshToken} type=refresh` },
            });

            if (refreshResponse.ok) {
                const { accessToken: newAccessToken } = await refreshResponse.json();
                api.dispatch(setTokens({ accessToken: newAccessToken }));

                result = await fetchBaseQuery({
                    baseUrl: `${import.meta.env.VITE_API_GLOBAL_URL}`,
                    prepareHeaders: (headers) => {
                        headers.set('Authorization', `Bearer ${newAccessToken} type=access`);
                        return headers;
                    },
                })(args, api, extraOptions);
            } else {
                api.dispatch(clearTokens());
            }
        } else {
            api.dispatch(clearTokens());
        }
    }

    return result;
};