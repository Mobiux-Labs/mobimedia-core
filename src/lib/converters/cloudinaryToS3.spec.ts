import test from 'ava';

import convertCloudinaryToS3 from './CloudinaryToS3';

// Test for a valid URL with a original structure
test('Converts a valid Cloudinary URL to a valid S3 URL', (t) => {
  const cloudinaryUrl =
    'https://res.cloudinary.com/cloudName/image/upload/v1676229010/testDir/test.jpg';
  const s3PublicUrl = 'https://s3HostedMedia.mydomain.com';
  const s3CloudinaryPath = '/cloudinary/res/cloudName/image/upload';

  const result = convertCloudinaryToS3(
    cloudinaryUrl,
    s3PublicUrl,
    s3CloudinaryPath
  );

  t.is(
    result,
    'https://s3HostedMedia.mydomain.com/cloudinary/res/cloudName/image/upload/testDir/test/1676229010.jpg'
  );
});

// Test for a valid URL with default transformation structure
test('Converts a valid Cloudinary URL with default transformation to a valid S3 URL', (t) => {
  const cloudinaryUrl =
    'https://res.cloudinary.com/cloudName/image/upload/c_fill,f_auto,g_auto,w_640/v1673089681/testDir/test.jpg';
  const s3PublicUrl = 'https://s3HostedMedia.mydomain.com';
  const s3CloudinaryPath = '/cloudinary/res/cloudName/image/upload';

  const result = convertCloudinaryToS3(
    cloudinaryUrl,
    s3PublicUrl,
    s3CloudinaryPath
  );

  t.is(
    result,
    'https://s3HostedMedia.mydomain.com/cloudinary/res/cloudName/image/upload/testDir/test/1673089681.jpg'
  );
});

// Test for a valid URL with / in transformations
test('Converts a valid Cloudinary URL with / in transformations to a valid S3 URL', (t) => {
  const cloudinaryUrl =
    'https://res.cloudinary.com/dxivtqnri/image/upload/c_fill,f_auto,g_auto/w_640/v1673089681/testDir/test.jpg';
  const s3PublicUrl = 'https://s3HostedMedia.mydomain.com';
  const s3CloudinaryPath = '/cloudinary/res/cloudName/image/upload';

  const result = convertCloudinaryToS3(
    cloudinaryUrl,
    s3PublicUrl,
    s3CloudinaryPath
  );

  t.is(
    result,
    'https://s3HostedMedia.mydomain.com/cloudinary/res/cloudName/image/upload/testDir/test/1673089681.jpg'
  );
});

// Test for version not present in URL
test('Throws an error for Cloudinary URL without a version', (t) => {
  const cloudinaryUrl =
    'https://res.cloudinary.com/cloudName/image/upload/c_fill,f_auto,g_auto/w_640/test/test.jpg';
  const s3PublicUrl = 'https://s3HostedMedia.mydomain.com';
  const s3CloudinaryPath = '/cloudinary/res/cloudName/image/upload';

  t.throws(() => {
    convertCloudinaryToS3(cloudinaryUrl, s3PublicUrl, s3CloudinaryPath);
  }, { instanceOf: Error, message: 'URL Conversion Failed due to media version not present.' });
});

// Test for URL without extension
test('Throws an error for Cloudinary URL without an extension', (t) => {
  const cloudinaryUrl =
    'https://res.cloudinary.com/cloudName/image/upload/v1676229010/test';
  const s3PublicUrl = 'https://s3HostedMedia.mydomain.com';
  const s3CloudinaryPath = '/cloudinary/res/cloudName/image/upload';

  t.throws(() => {
    convertCloudinaryToS3(cloudinaryUrl, s3PublicUrl, s3CloudinaryPath);
  }, { instanceOf: Error, message: 'Media extension not found in URL.' });
});
