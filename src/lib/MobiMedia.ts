import convertCloudinaryToS3 from './converters/CloudinaryToS3';

/**
 * MobiMediaConfig function needs to be instantiated initially with subdomain
 * and other options.
 *
 * Once done, then call url function with original src with transformation options
 * to receive the converted and modified URL.
 *
 * ### Example
 * ```js
 * import { MobiMediaConfig } from "@mobimedia/core";
 * const s3Transformer = MobiMediaConfig("test.mobimedia.ai");
 * const src = s3Transformer.url("https://s3HostedMedia.mydomain.com/test.png", {
 *   w: 100,
 * });
 * // => https://test.mobimedia.ai/test.png?quality=70&format=webp&w=100
 * ```
 *
 * @returns Returns a `url` function which can be further called to get src.
 */
export const MobiMediaConfig = (
  subDomain: string,
  convertCloudinaryToS3Url = { s3PublicUrl: '', s3CloudinaryPath: '' }
) => {
  const init = () => {
    if (!subDomain) {
      throw new Error('subDomain not configured.');
    }
    if (subDomain.match('http')) {
      throw new Error('SubDomain should not include http or https.');
    }
  };

  const _CLOUDINARY_URL = 'cloudinary.com';

  const _getDefaultOptions = (
    url: string,
    customOptions: Record<string, string>,
    isConvertCloudinaryToS3: boolean
  ) => {
    // For cases where users pass Cloudinary URL and don't want to convert to S3
    if (url.includes(_CLOUDINARY_URL) && !isConvertCloudinaryToS3)
      return customOptions;

    return {
      quality: '70',
      format: 'webp',
      ...customOptions,
    };
  };

  const url = (mediaUrl: string, transformOptions = {}): string => {
    const { s3PublicUrl, s3CloudinaryPath } = convertCloudinaryToS3Url;
    const isConvertCloudinaryToS3 = Boolean(s3PublicUrl && s3CloudinaryPath);

    const s3Url: string =
      isConvertCloudinaryToS3 &&
      convertCloudinaryToS3(mediaUrl, s3PublicUrl, s3CloudinaryPath);

    const transformUrl: URL = new URL(s3Url || mediaUrl);
    transformUrl.host = subDomain;

    // Adding defaults to URL and letting them being overridden by user options
    const options: Record<string, string> = _getDefaultOptions(
      mediaUrl,
      transformOptions,
      isConvertCloudinaryToS3
    );
    if (Object.keys(options).length !== 0) {
      transformUrl.search = `?${new URLSearchParams(options)}`;
    }
    return transformUrl.href;
  };

  init(); // Initialize this function
  return { url };
};
