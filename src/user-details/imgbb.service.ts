// imgbb.service.ts

import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ImgbbService {
  async uploadImage(image: Buffer): Promise<string> {
    const blob = new Blob([image], { type: 'image/jpeg' });
    const formData = new FormData();
    formData.append('image', blob, 'image.jpg');

    const response = await axios.post('https://api.imgbb.com/1/upload?key=8bb82efe2ee527f88e6bf32695479f60', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const imageUrl = response.data.data.url;
    const uniqueUrl = `${imageUrl}?timestamp=${Date.now()}`;

    return uniqueUrl;
  }
}
