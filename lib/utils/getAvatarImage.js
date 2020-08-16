// This is a util to get an avatar from url https://pravatar.cc/
const endpointRandomPhotoService = 'https://i.pravatar.cc';
const photosAvailableCount = 70;

const getRandomNumber = maxNum => Math.floor(Math.random() * maxNum + 1);
// This is a util to get a random avatar
const getRandomAvatarPhoto = (size = 80) => {
  const photoNumber = getRandomNumber(photosAvailableCount);
  return `${endpointRandomPhotoService}/${size}?img=${photoNumber}`;
};

// Pravatar can send back the same avatar for a given id
const getUserAvatarUUID = ({ size = 70, userId }) =>
  `https://i.pravatar.cc/${size}?u=${userId}`;

export default getRandomAvatarPhoto;
export { getRandomNumber, getUserAvatarUUID };
