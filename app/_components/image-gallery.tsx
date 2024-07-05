import Image from "next/image";
import {ListObjectsV2Command} from '@aws-sdk/client-s3';
import { s3Client } from "@/lib/s3client";

export default async function ImageGallery() {
  
  const objectListParams = new ListObjectsV2Command({
    Bucket: 'lgdev-photos-upload'
  });

  const objectList = await s3Client.send(objectListParams);

  objectList.Contents?.sort((a: any, b: any) => {
    return (
      new Date(b.LastModified).getTime() - new Date(a.LastModified).getTime()
    );
  })
  
  const imageList = objectList.Contents?.map(object => object)
  return (
    <div className="grid grid-cols-3 gap-6 mt-6">
      { imageList?.map((image, index) => (
        <div key={index} className="p-2 overflow-hidden rounded-md w-[280px] h-[280px] relative transition hover:transform hover:scale-105 bg-white shadow-md hover:shadow-lg">
          <Image src={`https://lgdev-photos-upload.s3.sa-east-1.amazonaws.com/${image.Key}`} width={268} height={268} className="h-full w-full object-cover" alt="Imagem" />
          <span className="absolute bottom-3 right-3 px-2 bg-[#375184] rounded-xl text-white">{image.Size}</span>
        </div>
      ))}

    </div>
  );
}