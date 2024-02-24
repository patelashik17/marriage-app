import axios from "axios";
import { PayloadType, modalPayload, password } from "../Interface/Interface";

export const UserCount = async (payload: PayloadType) => {
  const url = "https://marriage-portal-api.onrender.com/usersCounts";
  try {
    const response = await axios.post(url, payload);

    if (response && response.status === 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const userDetail = async (payload: PayloadType) => {
  const url = "http://localhost:3000/listUsers";

  try {
    const response = await axios.post(url, payload);

    if (response && response.status === 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const Approve = async (payload: modalPayload) => {
  const url = "https://marriage-portal-api.onrender.com/approve";

  try {
    const response = await axios.post(url, JSON.stringify(payload), {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (response && response.status === 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const Reject = async (payload: modalPayload) => {
  const url = "https://marriage-portal-api.onrender.com/reject";

  try {
    const response = await axios.post(url, JSON.stringify(payload), {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (response && response.status === 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const registration = async (payload: any) => {
  const url = "http://localhost:3000/registration";

  try {
    const response = await axios.post(url, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response && response.status === 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const DownloadData = async (payload: PayloadType) => {
  const url = "https://marriage-portal-api.onrender.com/download";

  try {
    const response = await axios.post(url, JSON.stringify(payload), {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (response && response.status === 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const shortByDate = async (payload: PayloadType) => {
  const url = "https://marriage-portal-api.onrender.com/shortByDate";

  try {
    const response = await axios.post(url, JSON.stringify(payload), {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (response && response.status === 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updateUser = async (payload: any) => {
  const url = "https://marriage-portal-api.onrender.com/updateUserDetails";

  try {
    const response = await axios.patch(url, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response && response.status === 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const setPassword = async (setPassword: string, payload: password) => {
  const url = `https://marriage-portal-api.onrender.com/setPassword?setPasswordToken=${setPassword}`;

  try {
    const response = await axios.post(url, JSON.stringify(payload), {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (response && response.status === 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updateUserDetails = async (payload: PayloadType) => {
  const url = `https://marriage-portal-api.onrender.com/userDetails`;

  try {
    const response = await axios.post(url, JSON.stringify(payload), {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (response && response.status === 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};
