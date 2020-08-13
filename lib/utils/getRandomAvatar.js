// this is a util to get a  random avatar in cards
const endpointRandomPhotoService = 'https://i.pravatar.cc';
const photosAvailableCount = 70;

export const getRandomNumber = maxNum => Math.floor(Math.random() * maxNum + 1);

const getRandomAvatarPhoto = (size = 80) => {
  const photoNumber = getRandomNumber(photosAvailableCount);
  return `${endpointRandomPhotoService}/${size}?img=${photoNumber}`;
};

export default getRandomAvatarPhoto;
