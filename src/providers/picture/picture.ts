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
        if (camera === true) {
          reject(new Error("Can't access the camera on Browser"));
        } else {
          try {
            UploadFS.selectFile((file: File) => {
              resolve(file);
            });
          } catch (e) {
            reject(e);
          }
        }
      });
    }

    return this.camera.getPicture(<CameraOptions>{
      destinationType: 1,//image file URI
      quality: 50,
      correctOrientation: true,
      saveToPhotoAlbum: false,
      sourceType: camera ? 1 : 0, //from camera
      mediaType: 2 //picture and video
    })
      .then((fileURI) => {
        return crop ? this.crop.crop(fileURI, {quality: 50}) : fileURI;
      })
      .then((croppedFileURI) => {
        return this.convertURLtoBlob(croppedFileURI);
      });
  }

  convertURLtoBlob(url: string, options = {}): Promise<File> {
    return new Promise((resolve, reject) => {
      const image = document.createElement('img');
      image.onload = () => {
        try {
          const dataURI = this.convertImageToDataURI(image, options);
          const blob = this.convertDataURIToBlob(dataURI);
          const pathname = (new URL(url)).pathname;
          const filename = pathname.substring(pathname.lastIndexOf('/') + 1);
          const file = new File([blob], filename);
          resolve(file);
        }
        catch (e) {
          reject(e);
        }
      };
      image.src = url.substring(7);
    });
  }

  convertImageToDataURI(image: HTMLImageElement, {MAX_WIDTH = 400, MAX_HEIGHT = 400} = {}): string {
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

  /**
   * Another version of convertDataURIToBlob. Cannot work.
   * @param dataURI
   * @returns {Blob}
   */
  dataURItoBlob(dataURI): Blob {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    const byteString = window.atob(dataURI);

    // separate out the mime component
    const mimeString = 'image/jpeg';

    // write the bytes of the string to an ArrayBuffer
    const ab = new ArrayBuffer(byteString.length);

    // create a view into the buffer
    const ia = new Uint8Array(ab);

    // set the bytes of the buffer to the correct values
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    const blob = new Blob([ab], {type: mimeString});
    return blob;
  }
}
