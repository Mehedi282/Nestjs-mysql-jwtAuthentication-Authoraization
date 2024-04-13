import { Injectable, BadRequestException } from "@nestjs/common";
import axios from 'axios';

@Injectable()
export class MultipleImageUploadService {
  async uploadImagesToImgBB(photos: Express.Multer.File[]) {
    const uploadedUrls: string[] = [];
    try {
      const apiKey = '8bb82efe2ee527f88e6bf32695479f60'; // Replace this with your ImgBB API key
      const uploadPromises = photos.map(async (photo) => {
        const formData = new FormData();
        formData.append('image', photo.buffer.toString('base64'));

        const response = await axios.post('https://api.imgbb.com/1/upload?key=' + apiKey, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        const imageUrl = response.data.data.url;
        uploadedUrls.push(imageUrl);
      });

      await Promise.all(uploadPromises);
    } catch (error) {
      throw new BadRequestException('Failed to upload images to ImgBB');
    }
    return uploadedUrls;
  }
}
