const BASE_URL = "https://dfr66lds-3001.asse.devtunnels.ms"; //base url BE local
// const BASE_URL = ""; //base url BE port

export async function loginUser(email, password) {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/users/login`, {
      // buat variable BASE_URL dengan value url backendnya dan sesuaikan endpointnya
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const { meta } = await response.json();
      throw new Error(meta.message);
    }

    const data = await response.json();
    return data.data.token;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function registerUser(
  firstName,
  lastName,
  email,
  phone,
  password
) {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/users/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, phone, password }),
    });

    if (!response.ok) {
      const { meta } = await response.json();

      throw new Error(meta.message);
    }
    const data = await response.json();
    return data; // Misalnya, pesan sukses dari back-end
  } catch (error) {
    throw new Error(error);
  }
}

// Fungsi untuk fetch data profil
export async function getUserProfile(token) {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `Bearer ${token}`, // Menggunakan token untuk autentikasi
        "ngrok-skip-browser-warning": "true",
      },
    });

    if (!response.ok) {
      const { meta } = await response.json();
      throw new Error(meta.message); // Menangani pesan error dari backend
    }

    const data = await response.json();
    return data; // Mengembalikan data profil pengguna
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateProfile(email, phone, firstName, lastName, token) {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/users`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `Bearer ${token}`,
      },
      body: JSON.stringify({ firstName, lastName, email, phone }),
    });

    if (!response.ok) {
      const { meta } = await response.json();
      throw new Error(meta.message); // Menangani pesan error dari backend
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}
export async function predictOutcome({
  type,
  name,
  age,
  state,
  semester,
  average_cgpa,
  final_cgpa,
  token,
}) {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/predictions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `Bearer ${token}`,
      },
      body: JSON.stringify({
        type,
        name,
        age,
        state,
        semester,
        average_cgpa,
        final_cgpa,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Unknown error occurred");
    }

    const data = await response.json();
    return [data, null];
  } catch (error) {
    return [null, error];
  }
}

export async function resultPrediction(token, param) {
  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/predictions?data=${param}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
}

export async function loginAdmin(email, password) {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/admins/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.log(error);
      const { meta } = error;
      throw new Error(meta.message);
    }
    const data = await response.json();
    return [data.data.token, null];
  } catch (err) {
    return [null, err];
  }
}

export async function registerAdmin(payload) {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/admins`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return [null, null];
  } catch (err) {
    return [null, err];
  }
}

export async function validateAdmin(payload) {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/admins/verify`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return [null, null];
  } catch (err) {
    return [null, err];
  }
}

export async function resultAnalytics(token) {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/predictions/analytics`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
}

export async function bulkUploadPrediction(payload, token) {
  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/predictions/bulk/anatomy`,
      {
        method: "POST",
        body: payload,
        headers: { "x-access-token": `Bearer ${token}` },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return [null, null];
  } catch (err) {
    return [null, err];
  }
}

export async function deletePrediction(token, payload) {
  console.log(payload);
  try {
    const response = await fetch(`${BASE_URL}/api/v1/predictions/admin`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return [null, null];
  } catch (err) {
    return [null, err];
  }
}

export async function forgotPassword(email) {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/admins/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return [null, null];
  } catch (err) {
    console.log(err);
    return [null, err];
  }
}

export async function verifyPassword(password, email) {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/admins/verify-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return [null, null];
  } catch (err) {
    return [null, err];
  }
}
