# Gift Wrapper

------------------------

## Summary

An application to create gift wraps with a specific pattern and box dimensions provided.

---

### User Stories:
- as a user, I will provide the box dimensions, provide the pattern, specify the DPI to print, and get a pdf as a result.

- as a user, I'm expecting to get the pdf as a link; so I can communicate it easily.
---

### Tech used:
 - Nodejs <= 14
 - Expressjs including express-file upload, morgan
 - AWS SDK S3
 - Canvas
---

### Using the app:

 - download the repo, then enter the folder and `npm i`
 - copy the .env.example keys to .env and add the AWS credentials.
 - [How to create AWS cred.](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-your-credentials.html)
 - Run the app by ``` npm run start ```, it should be running on `port 3000`, as per node defaults.
 - check the configuration for the box dimensions and the extra width and length `config/box.js`
 - check the configuration for the image required DPI `config/image.js`   
 - confirm that the AWS bucket is publicly available otherwise the link will not be available.
 - [How to edit public access for S3 buckets](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/block-public-access-bucket.html)
 - use this endpoint to upload the pattern.

   ```curl --location --request POST 'http://localhost:3000/pdfs/pattern'   --form 'pattern=@"~/img.png"'```


 - use this endpoint to check what is uploaded in the bucket.

`curl --location --request GET 'http://localhost:3000/pdfs'`

----

### Project structure:

 - `config` as the name implies, includes the settings and data for the BOX, IMAGE and GENERATED PDF.
 - `Controllers/Pdf` includes 2 functions related to the endpoints mentioned above.
 - `helpers` include unit conversion, to get over the cm2inch difference.
 - `providedAssets` includes the image and pdf from the quest.
 - `routes` as the name implies shows the routes to the above endpoints.
 - `services` includes 3 services,
    - `ImageProcessor` [How it works](https://github.com/hamza-mostafa/giftwrapper#how-image-processor-works)
    - `S3` acts as adapter to fetch data and upload from S3.
    - `Box` holds the box calculations and extraction of required dimensions converting 3D surface to 2D surface.
    - `FileManager` used to clean the data from the tmp folder.
   - `tmp` where the generated files is saved, if the function is invoked.

---
#### How Image processor works
 - after converting the 3d surface to 2d surface with the box service.
 - The image processor creates 2 canvas one to define the PDF width and length, to create the match for the box.
 - The second is for the DPI to match what is required, and to repeat pattern.
 - Once, both are created, the image canvas is fitted into the pdf canvas, so that the DPI can match the required,
 - Finally, the merged canvas is buffered and streamed to AWS.

---
#### Notes:
 - There is an option to record the files on the machine.  However, this has been commented out to save time.
   And can be used whenever required.
 - The FileManager cleans the data directly after the upload, this is done in S3 service file, if file saving is required, please make sure to update the FileManager. Or if it is required just for temp time, please make sure to uncomment the File Manager.
 - Box calculations are held in the service folder/box.
 - Console.log have been added in all steps to measure the speed in a simple way.
 - As the wrapper cannot be exact, and the extra is not known, 2 fields for the extra width and length that can be added to the wrapper, if exact is required, just replace it with 0.