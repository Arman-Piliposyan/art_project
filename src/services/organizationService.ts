import createAxiosInstance from '../api/axios';

type InviteUserDataType = { emailText: string; email: string; role: string };

export const getOrganizationData = (organizationId: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().get(`/organization/organizations/${organizationId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateOrganizationInfo = ({
  organizationId,
  name,
}: {
  organizationId: string;
  name: string;
}) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().put(`/organization/organizations`, {
      organizationId: organizationId,
      name,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getOrganizationUserData = (OrganizationId: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().get('identity/organization/users', {
      params: { OrganizationId, Results: 1000 },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateUserActivity = async ({ isActive, userId }: { isActive: boolean; userId: string }) => {
  // eslint-disable-next-line no-useless-catch
  try {
    await createAxiosInstance().post(`identity/user-activation`, {
      isActive,
      userId,
    });
  } catch (error) {
    throw error;
  }
};

export const inviteUser = async ({
  inviteUserData,
  organizationId,
}: {
  inviteUserData: InviteUserDataType;
  organizationId: string;
}) => {
  // eslint-disable-next-line no-useless-catch
  try {
    await createAxiosInstance().post(`/identity/invite/user`, {
      ...inviteUserData,
      organizationId,
    });
  } catch (error) {
    throw error;
  }
};

export const getUserRoles = () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().get('/identity/roles');
    return response;
  } catch (error) {
    throw error;
  }
};

export const saveDomains = (data: string[]) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = createAxiosInstance().put('/organization/organizations/domains', { domains: data });
    return response;
  } catch (error) {
    throw error;
  }
};
