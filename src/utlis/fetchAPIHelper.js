const fetchAPIHelper = async (url, method, payload = null) => {
  try {
    const options = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };
    if (payload) {
      options.body = JSON.stringify(payload);
    }

    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: "Request successful",
        data: data,
      };
    } else {
      return {
        success: false,
        message: `Failed to ${method} data: ${response.statusText}`,
        data: data,
      };
    }
  } catch (error) {
    console.error("Error:", error);
    return {
      success: false,
      message: `Error: ${error.message}`,
    };
  }
};

export default fetchAPIHelper;
