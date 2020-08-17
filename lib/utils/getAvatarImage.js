// This is a util to get an avatar from url https://pravatar.cc/
const endpointRandomPhotoService = 'https://i.pravatar.cc';
const photosAvailableCount = 70;

const getRandomNumber = maxNum => Math.floor(Math.random() * maxNum + 1);
// This is a util to get a random avatar
const getRandomAvatarPhoto = ({ size = '70px' }) => {
  const photoNumber = getRandomNumber(photosAvailableCount);
  return `${endpointRandomPhotoService}/${size}?img=${photoNumber}`;
};

// Pravatar can send back the same avatar for a given id
const getUserAvatarUUID = ({ size = '70px', userId }) =>
  `https://i.pravatar.cc/${size}?u=${userId}`;

export { getRandomNumber, getUserAvatarUUID, getRandomAvatarPhoto };
