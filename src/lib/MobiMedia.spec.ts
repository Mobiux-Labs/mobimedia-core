import test from 'ava';

import { MobiMediaConfig } from './MobiMedia';

test('URL directly from S3', (t) => {
  const s3 = MobiMediaConfig('test.mobimedia.ai');
  const src = s3.url('https://s3HostedMedia.mydomain.com/test.png', {
    h: 100,
    w: 100,
  });
  t.is(
    src,
    'https://test.mobimedia.ai/test.png?quality=70&format=webp&h=100&w=100'
  );
});

test('URL directly from Cloudinary (Cloudinary as storage)', (t) => {
  const cloudinary = MobiMediaConfig('test-cloudinary.mobimedia.ai');
  const src = cloudinary.url(
    'https://res.cloudinary.com/cloudName/image/upload/c_fill,f_auto,g_auto,w_640/v1674128459/test.jpg'
  );
  t.is(
    src,
    'https://test-cloudinary.mobimedia.ai/cloudName/image/upload/c_fill,f_auto,g_auto,w_640/v1674128459/test.jpg'
  );
});

test('Get Cloudinary URL and transform it to S3 (fetch from S3 - Cloudinary Backup)', (t) => {
  const s3 = MobiMediaConfig('test.mobimedia.ai', {
    s3PublicUrl: 'https://s3HostedMedia.mydomain.com',
    s3CloudinaryPath: '/cloudinary/res/cloudName/image/upload',
  });

  const src = s3.url(
    'https://cloudinaryHostedMedia.mydomain.com/cloudName/image/upload/c_fill,f_auto,g_auto,w_640/v1674128459/test/test.jpg',
    {
      w: 100,
    }
  );
  t.is(
    src,
    'https://test.mobimedia.ai/cloudinary/res/cloudName/image/upload/test/test/1674128459.jpg?quality=70&format=webp&w=100'
  );
});

// Test case for MobiMediaConfig with an invalid subdomain
test('MobiMediaConfig throws an error for an invalid subdomain', (t) => {
  const subDomain = '';
  t.throws(
    () => {
      MobiMediaConfig(subDomain);
    },
    { instanceOf: Error, message: 'subDomain not configured.' }
  );
});

// Test case for MobiMediaConfig with subdomain containing 'http'
test('MobiMediaConfig throws an error for subdomain containing http', (t) => {
  const subDomain = 'http://test.mobimedia.ai';
  t.throws(
    () => {
      MobiMediaConfig(subDomain);
    },
    {
      instanceOf: Error,
      message: 'SubDomain should not include http or https.',
    }
  );
});
