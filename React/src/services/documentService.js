import api from './api';

export const getDocumentText = async (docId) => {
  try {
    const response = await api.get(`/document/text/${docId}`);
    return response.data;
  } catch (err) {
    console.error("Error fetching document comparison data:", err);
    throw err;
  }
};