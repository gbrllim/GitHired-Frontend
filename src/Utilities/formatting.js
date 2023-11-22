const getLastUpdatedText = (updatedAt) => {
  const updatedDate = new Date(updatedAt);
  const currDate = new Date();

  const minutesAgo = Math.floor((currDate - updatedDate) / (1000 * 60));
  const hoursAgo = Math.floor(minutesAgo / 60);
  const daysAgo = Math.floor(hoursAgo / 24);

  if (minutesAgo < 60) {
    return `Last updated: ${minutesAgo} minutes ago`;
  } else if (hoursAgo < 24) {
    return `Last updated: ${hoursAgo} hours ago`;
  } else {
    return `Last updated: ${daysAgo} days ago`;
  }
};

export { getLastUpdatedText };
