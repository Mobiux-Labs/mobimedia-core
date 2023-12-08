export default function convertCloudinaryToS3(
  cloudinaryUrl: string,
  s3PublicUrl: string,
  s3CloudinaryPath: string
) {
  // Not covering cases for <version>/<transformation> in URL struct as it's
  // not a formal Cloudinary structure
  // Not covering cases for incorrect extension media
  // Throwing errors on media version or extension not found in URL.

  // Regex for 'v' followed by exactly 10 digits
  const regex = /^v\d{10}$/;

  const url = new URL(cloudinaryUrl);
  const splitPaths = url.pathname.split('/');

  const versionIdx = splitPaths.findIndex((path) => regex.test(path));
  if (versionIdx === -1) {
    throw new Error('URL Conversion Failed due to media version not present.');
  }

  const dirPathArr = splitPaths.slice(versionIdx + 1);
  const mediaName = dirPathArr.splice(dirPathArr.length - 1)[0]; // Remove & store media name
  const mediaSplit = mediaName.split('.');

  if (mediaSplit.length === 1) {
    throw new Error('Media extension not found in URL.');
  }

  // Split media name and extension
  const mediaExt = mediaSplit.splice(mediaSplit.length - 1)[0]; // Get extension

  // Combining modified dirPath, modified media as dir, version with extension
  const filePath = `${dirPathArr.length ? '/' : ''}${dirPathArr.join(
    '/'
  )}/${mediaSplit.join('.')}/${splitPaths[versionIdx].substring(
    1
  )}.${mediaExt}`;

  return s3PublicUrl + s3CloudinaryPath + filePath;
}
