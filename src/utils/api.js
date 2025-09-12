const api = (() => {
  const { VITE_API_PROTOCOL, VITE_API_HOST, VITE_API_PORT } = import.meta.env;
  const BASE_URL = `${VITE_API_PROTOCOL}://${VITE_API_HOST}:${VITE_API_PORT}`;

  console.log('API Base URL:', BASE_URL);

  function putAccessToken(token) {
    localStorage.setItem('accessToken', token);
  }

  function getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  function putRefreshToken(token) {
    return localStorage.setItem('refreshToken', token);
  }

  function getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  function deleteToken() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  async function _fetchWithAuth(url, options = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }

  async function login({ email, password }) {
    const response = await fetch(`${BASE_URL}/authentications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return responseJson;
  }

  async function refreshToken() {
    const response = await _fetchWithAuth(`${BASE_URL}/authentications`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refreshToken: `${getRefreshToken()}`,
      }),
    });

    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }
    putAccessToken(data.accessToken);
  }

  async function getOwnProfile() {
    const response = await _fetchWithAuth(`${BASE_URL}/users/me`);
    const responseJson = await response.json();
    return responseJson;
  }

  // RESEARCH
  async function addResearchPotential({
    regenciesId,
    partnershipResearchTypeId,
    instituteName,
    instituteProfile,
    contactName,
    contactPhoneNumber,
    contactPosition,
    contactEmail,
    contactStatus,
    analysisStrength,
    analysisWeakness,
    analysisOpportunities,
    analysisChallenge,
    documentUrl,
  }) {
    const response = await _fetchWithAuth(`${BASE_URL}/research/potential`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        regenciesId,
        partnershipResearchTypeId,
        instituteName,
        instituteProfile,
        contactName,
        contactPhoneNumber,
        contactPosition,
        contactEmail,
        contactStatus,
        analysisStrength,
        analysisWeakness,
        analysisOpportunities,
        analysisChallenge,
        documentUrl,
      }),
    });

    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function getResearchPotentialById({ id }) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/research/potential/${id}`
    );

    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function getResearchPotential() {
    const response = await _fetchWithAuth(`${BASE_URL}/research/potential`);

    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function deleteResearchPotentialById({ id }) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/research/potential/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return message;
  }

  async function updateResearchPotentialById({
    id,
    regenciesId,
    partnershipResearchTypeId,
    instituteName,
    instituteProfile,
    contactName,
    contactPhoneNumber,
    contactPosition,
    contactEmail,
    contactStatus,
    analysisStrength,
    analysisWeakness,
    analysisOpportunities,
    analysisChallenge,
    documentUrl,
  }) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/research/potential/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          regenciesId,
          partnershipResearchTypeId,
          instituteName,
          instituteProfile,
          contactName,
          contactPhoneNumber,
          contactPosition,
          contactEmail,
          contactStatus,
          analysisStrength,
          analysisWeakness,
          analysisOpportunities,
          analysisChallenge,
          documentUrl,
        }),
      }
    );

    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function addAudience({
    partnershipResearchId,
    instituteDivision,
    audiencesDate,
    audiencesTime,
    audiencesType,
    audiencesStatus,
    audiencesLocation,
    documentUrl,
    audiencesNote,
  }) {
    const response = await _fetchWithAuth(`${BASE_URL}/research/potential`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        partnershipResearchId,
        instituteDivision,
        audiencesDate,
        audiencesTime,
        audiencesType,
        audiencesStatus,
        audiencesLocation,
        documentUrl,
        audiencesNote,
      }),
    });

    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function getAudienceById({ id }) {
    const response = await _fetchWithAuth(`${BASE_URL}/audiences/${id}`);

    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function getAudiences() {
    const response = await _fetchWithAuth(`${BASE_URL}/audiences`);

    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function deleteAudienceById({ id }) {
    const response = await _fetchWithAuth(`${BASE_URL}/audiences/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return message;
  }

  async function updateAudienceById({ id, payload }) {
    const response = await _fetchWithAuth(`${BASE_URL}/audiences/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function addGroup({ partnershipResearchId, groupUrl }) {
    const response = await _fetchWithAuth(`${BASE_URL}/groups`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        partnershipResearchId,
        groupUrl,
      }),
    });

    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function getGroupById({ id }) {
    const response = await _fetchWithAuth(`${BASE_URL}/groups/${id}`);

    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function getGroups() {
    const response = await _fetchWithAuth(`${BASE_URL}/groups`);

    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function deleteGroupById({ id }) {
    const response = await _fetchWithAuth(`${BASE_URL}/groups/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return message;
  }

  async function updateGroupById({ id, groupUrl }) {
    const response = await _fetchWithAuth(`${BASE_URL}/groups/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        groupUrl,
      }),
    });

    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function addContact({
    groupId,
    contactFullName,
    contactPosition,
    contactPhoneNumber,
    contactEmail,
    contactStatusJoined,
    contactStatusActive,
  }) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/groups/${groupId}/contact`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contactFullName,
          contactPosition,
          contactPhoneNumber,
          contactEmail,
          contactStatusJoined,
          contactStatusActive,
        }),
      }
    );

    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function getContactById({ groupId, contactId }) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/groups/${groupId}/contact/${contactId}`
    );

    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function deleteContactById({ groupsId, contactId }) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/groups/${groupsId}/contact/${contactId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return message;
  }

  async function updateContactById({ groupId, contactId, payload }) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/groups/${groupId}/contact/${contactId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function addMou({
    partnershipResearchId,
    partnershipStatusId,
    partnershipLetterNumberId,
    mouPartnershipDetail,
    mouPartnerLetterNumber,
    mouPartnerName,
    mouBcfName,
    mouSignatureDate,
    mouTimePeriod,
    mouDueDate,
    mouDocumentUrl,
    mouNote,
  }) {
    const response = await _fetchWithAuth(`${BASE_URL}/partnerships/mou`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        partnershipResearchId,
        partnershipStatusId,
        partnershipLetterNumberId,
        mouPartnershipDetail,
        mouPartnerLetterNumber,
        mouPartnerName,
        mouBcfName,
        mouSignatureDate,
        mouTimePeriod,
        mouDueDate,
        mouDocumentUrl,
        mouNote,
      }),
    });

    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function getMouById({ id }) {
    const response = await _fetchWithAuth(`${BASE_URL}/partnerships/mou/${id}`);

    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function getMou({ id }) {
    const response = await _fetchWithAuth(`${BASE_URL}/partnerships/mou`);

    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function deleteMouById({ id }) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/partnerships/mou/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return message;
  }

  async function updateMouById({ id, payload }) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/partnerships/mou/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  return {
    // USER (AUTH)
    putAccessToken,
    getAccessToken,
    putRefreshToken,
    getRefreshToken,
    refreshToken,
    deleteToken,
    login,
    getOwnProfile,
    // RESEARCH
    addResearchPotential,
    getResearchPotentialById,
    getResearchPotential,
    deleteResearchPotentialById,
    updateResearchPotentialById,
    // AUDIENCES
    addAudience,
    getAudienceById,
    getAudiences,
    deleteAudienceById,
    updateAudienceById,
    // GROUPS
    addGroup,
    getGroupById,
    getGroups,
    deleteGroupById,
    updateGroupById,
    // GROUP CONTACTS
    addContact,
    getContactById,
    deleteContactById,
    updateContactById,
    // PARTNERSHIPS

    // MOU
    addMou,
    getMouById,
    getMou,
    deleteMouById,
    updateMouById,
    // PKS
  };
})();

export default api;
