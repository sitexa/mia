import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { UploadFS } from 'meteor/jalik:ufs';
import { PicturesStore } from 'api/collections';
import * as _ from 'lodash';
import { DEFAULT_PICTURE_URL } from 'api/models';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';

@Injectable()
export class PictureService {
  constructor(private platform: Platform,
              private camera: Camera,
              private crop: Crop) {
  }

  //todo check and debug here
  upload(blob: File): Promise<any> {
    console.log("step5:upload blob:" + blob.name);
    return new Promise((resolve, reject) => {
      const metadata: any = _.pick(blob, 'name', 'type', 'size');

      if (!metadata.name) {
        metadata.name = DEFAULT_PICTURE_URL;
      }

      const upload = new UploadFS.Uploader({
        data: blob,
        file: metadata,
        store: PicturesStore,
        onComplete: resolve,
        onError: reject
      });

      upload.start();
    });
  }


  getPicture(camera: boolean, crop: boolean): Promise<File> {
    if (!this.platform.is('cordova')) {
      return new Promise((resolve, reject) => {
        //TODO: add javascript image crop
        if (camera === true) {
          reject(new Error("Can't access the camera on Browser"));
        } else {
          try {
            console.log("step2:browser:getPicture");
            UploadFS.selectFile((file: File) => {
              console.log("step2:browser:getPicture:UploadFS:selectFile:" + file.name);
              resolve(file);
            });
          } catch (e) {
            reject(e);
          }
        }
      });
    }

    //todo: step2,take picture by camera
    return this.camera.getPicture(<CameraOptions>{
      destinationType: 1,//image file URI
      quality: 50,
      correctOrientation: true,
      saveToPhotoAlbum: true,
      sourceType: camera ? 1 : 0, //from camera
      mediaType: 2 //picture and video
    })
      .then((fileURI) => {
        console.log("step2:camera:fileURI:" + fileURI);
        return crop ? this.crop.crop(fileURI, {quality: 50}) : fileURI;
      })
      .then((croppedFileURI) => {
        console.log("step2:camera:croppedFileURI:" + croppedFileURI);
        return this.convertURLtoBlob(croppedFileURI);
      });
  }

  convertURLtoBlob(url: string, options = {}): Promise<File> {
    console.log("step2:converURLtoBlob:url=" + url);
    return new Promise((resolve, reject) => {

      try {
        console.log("step2:converURLtoBlob:Promise:try:");
        const image = document.createElement('img');

        image.onload = () => {
          try {
            console.log("step2:converURLtoBlob:image.onload:");
            const dataURI = this.convertImageToDataURI(image, options);
            console.log("step2:converURLtoBlob:dataURI:" + dataURI);
            const blob = this.convertDataURIToBlob(dataURI);
            const pathname = (new URL(url)).pathname;
            const filename = pathname.substring(pathname.lastIndexOf('/') + 1);
            console.log("step2 pathname:" + pathname);
            console.log("step2 filename:" + filename);
            const file = new File([blob], filename);
            console.log("step2:converURLtoBlob:file:" + file.name);
            resolve(file);
          }
          catch (e) {
            console.log("step2:converURLtoBlob:error:" + e.toString());
            reject(e);
          }
        };

        image.src = url;

      } catch (e) {
        console.log("step2:converURLtoBlob:Promise:catch:" + e.toString());
      }
    });
  }

  convertImageToDataURI(image: HTMLImageElement, {MAX_WIDTH = 400, MAX_HEIGHT = 400} = {}): string {
    console.log("step2:convertImageToDataURI:");
    // Create an empty canvas element
    const canvas = document.createElement('canvas');

    var width = image.width, height = image.height;

    if (width > height) {
      if (width > MAX_WIDTH) {
        height *= MAX_WIDTH / width;
        width = MAX_WIDTH;
      }
    } else {
      if (height > MAX_HEIGHT) {
        width *= MAX_HEIGHT / height;
        height = MAX_HEIGHT;
      }
    }

    canvas.width = width;
    canvas.height = height;

    // Copy the image contents to the canvas
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, width, height);

    // Get the data-URL formatted image
    // Firefox supports PNG and JPEG. You could check image.src to
    // guess the original format, but be aware the using 'image/jpg'
    // will re-encode the image.
    const dataURL = canvas.toDataURL('image/png');
    console.log("step2:convertImageToDataURI:dataURL:" + dataURL);
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
  }

  convertDataURIToBlob(dataURI): Blob {
    const binary = atob(dataURI);

    // Write the bytes of the string to a typed array
    const charCodes = Object.keys(binary)
      .map<number>(Number)
      .map<number>(binary.charCodeAt.bind(binary));

    // Build blob with typed array
    return new Blob([new Uint8Array(charCodes)], {type: 'image/jpeg'});
  }
}
