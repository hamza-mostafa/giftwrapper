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
 - copy the .env.example and add the AWS credentials.
 - check the configuration for the box dimensions and the extra width and height `config/box.js`
 - check the configuration for the image required DPI `config/image.js`   
 - confirm that the AWS bucket is publicly available otherwise the link will not be available.
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
    - `ImageProcessor` which is the application purpose and includes 2 Canvas one to formulate
      the pdf dimensions, and the other to create the DPI including the image repetition pattern, 
      finally a stream is sent directly to AWS S3.
    - `S3` acts as adapter to fetch data and upload from S3.
    - `Box` holds the box calculations and extraction of required dimensions.
    - `FileManager` used to clean the data from the tmp folder.
   - `tmp` where the generated files is saved, if the function is invoked.

---

#### Notes:
 - There is an option to record the files on the machine.  However, this has been commented out to save time.
   And can be used whenever required.
 - The FileManager cleans the data directly after the upload, this is done in S3 service file, if file saving is required, please make sure to update the FileManager. Or if it is required just for temp time, please make sure to uncomment the File Manager.
 - Box calculations are held in the service folder/box.
 - Console.log have been added in all steps to measure the speed in a simple way.