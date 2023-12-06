# @mobimedia/core

Optimize your images on the fly with MobiMedia.ai. This is a SDK for converting and appending image optimization parameters to the image src making it optimized as per the client devices.

## Installation

```bash
npm install @mobimedia/core
```

## Usage for S3

```js
import { MobiMediaConfig } from "@mobimedia/core";

const s3Transformer = MobiMediaConfig("test.mobimedia.ai")
const src = s3Transformer.url("https://s3HostedMedia.mydomain.com/test.png", {
  w: 100,
});
// => https://test.mobimedia.ai/test.png?quality=70&format=webp&w=100
```

## Usage for Cloudinary URL Conversion to S3

```js
import { MobiMediaConfig } from "@mobimedia/core";

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
// => https://test.mobimedia.ai/cloudinary/res/cloudName/image/upload/test/test/1674128459.jpg?quality=70&format=webp&w=100
```

## `MobiMediaConfig` Options

The `MobiMediaConfig` function provides options for configuring the MobiMedia.ai image optimization service. It takes the following parameters:

### `subDomain` (required)

Type: `string`

The `subDomain` parameter is a required string that represents the subdomain of the MobiMedia.ai service. This is a crucial configuration as it defines the specific MobiMedia.ai instance to be used for image optimization.

### `convertCloudinaryToS3Url` (optional)

Type: `{ s3PublicUrl: string, s3CloudinaryPath: string }`

Default: `{ s3PublicUrl: '', s3CloudinaryPath: '' }`

The `convertCloudinaryToS3Url` parameter is an optional object that allows configuring settings related to converting Cloudinary URLs to S3 URLs. It has the following properties:

* `s3PublicUrl`: A string representing the public URL of the S3 bucket where the images will be stored.

* `s3CloudinaryPath`: A string representing the path within the S3 bucket where the converted images will be stored.

## Image `url` Supported Options

| URL Arg | Type | Description |
|---|----|---|
|`w`|Number|Max width of the image.|
|`h`|Number|Max height of the image.|
|`quality`|Number, 0-100|Image quality.|
|`resize`|String, "w,h"|A comma separated string of the target width and height in pixels. Crops the image.|
|`crop_strategy`|String, "smart", "entropy", "attention"|There are 3 automatic cropping strategies for use with `resize`: <ul><li>`attention`: good results, ~70% slower</li><li>`entropy`: mediocre results, ~30% slower</li><li>`smart`: best results, ~50% slower</li>|
|`gravity`|String|Alternative to `crop_strategy`. Crops are made from the center of the image by default, passing one of "north", "northeast", "east", "southeast", "south", "southwest", "west", "northwest" or "center" will crop from that edge.|
|`fit`|String, "w,h"|A comma separated string of the target maximum width and height. Does not crop the image.|
|`crop`|Boolean\|String, "x,y,w,h"|Crop an image by percentages x-offset, y-offset, width and height (x,y,w,h). Percentages are used so that you don’t need to recalculate the cropping when transforming the image in other ways such as resizing it. You can crop by pixel values too by appending `px` to the values. `crop=160px,160px,788px,788px` takes a 788 by 788 pixel square starting at 160 by 160.|
|`zoom`|Number|Zooms the image by the specified amount for high DPI displays. `zoom=2` produces an image twice the size specified in `w`, `h`, `fit` or `resize`. The quality is automatically reduced to keep file sizes roughly equivalent to the non-zoomed image unless the `quality` argument is passed.|
|`webp`|Boolean, 1|Load WebP format.|
|`lb`|String, "w,h"|Add letterboxing effect to images, by scaling them to width, height while maintaining the aspect ratio and filling the rest with black or `background`.|
|`background`|String|Add background color via name (red) or hex value (%23ff0000). Don't forget to escape # as `%23`.|

Feel free to raise any issues on our [Github Issues](https://github.com/Mobiux-Labs/mobimedia-core/issues) page if you find any.

## License

This project is licensed under the MIT License - see the [LICENSE.md](/LICENSE) file for details.
