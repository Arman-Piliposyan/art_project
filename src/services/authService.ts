import createAxiosInstance from '../api/axios';

type loginPostType = {
  password: string;
  email: string;
};

type registrationPostType = {
  confirmPassword: string;
  password: string;
  email: string;
  name: string;
};

export const loginPost = async (data: loginPostType) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await createAxiosInstance().post('/identity/sign-in', {
      ...data,
      isTop: true,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const refreshTokenPost = async (refreshToken: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const { data } = await createAxiosInstance().post('/identity/refresh-tokens/use', {
      refreshToken,
    });
    return data.accessToken;
  } catch (error) {
    throw error;
  }
};

export const logOut = async (accessToken: string, refreshToken: string | null) => {
  // eslint-disable-next-line no-useless-catch
  try {
    if (refreshToken) {
      await createAxiosInstance().post('/identity/refresh-tokens/revoke', {
        refreshToken,
      });
    }
    await createAxiosInstance().post('/identity/access-tokens/revoke', {
      accessToken,
    });
  } catch (error) {
    throw error;
  }
};

export const registrationPost = async (data: registrationPostType) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await createAxiosInstance().post('/organization/organizations', {
      ...data,
      isTop: true,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const confirmUserEmail = async ({ userId, token }: { userId: string; token: string }) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await createAxiosInstance().post(
      `/identity/user/confirm-email?userId=${userId}&token=${token}`,
    );
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export const resendConfirmEmail = async (email: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    await createAxiosInstance().post('/identity/resend-confirmation-email', {
      email,
    });
  } catch (error) {
    throw error.response.data;
  }
};

export const forgotPasswordPost = async (email: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    await createAxiosInstance().post('/identity/forgot-password', {
      email,
    });
  } catch (error) {
    throw error.response.data;
  }
};

export const resetPasswordPost = async (data: {
  confirmPassword: string;
  password: string;
  userId: string;
  token: string;
}) => {
  // eslint-disable-next-line no-useless-catch
  try {
    await createAxiosInstance().post('/identity/reset-password', data);
  } catch (error) {
    throw error.response.data;
  }
};
