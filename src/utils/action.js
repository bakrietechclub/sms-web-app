import api from './api';

const loginAction = async ({ email, password }) => {
  const { status, message, data: token } = await api.login({ email, password });

  if (status !== 'success') {
    return { status, message, data: null };
  } else {
    const { accessToken, refreshToken } = token;

    api.putAccessToken(accessToken);
    api.putRefreshToken(refreshToken);

    const { data } = await api.getOwnProfile();
    return { data };
  }
};

const logoutAction = () => {
  api.deleteToken();
};

export { loginAction, logoutAction };
