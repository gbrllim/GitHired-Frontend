// Utility to store header constructor for bearer token

const bearerToken = (token) => {
  const output = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return output;
};

export { bearerToken };
