"use server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "@/lib/s3client";
import { revalidatePath } from "next/cache";

export async function uploadImage(formData: FormData) {
  const image = formData.get('image') as File;
  if(!image.size){
    return {
      success: false,
      message: 'Necessário adicionar um arquivo.'
    }
  }
  if(!image.type.startsWith('image/')){
    return {
      sucess: false,
      message: 'Formato inválido, necessário ser do tipo imagem'
    }
  }
  const arrayBuffer = await image.arrayBuffer();
  const imageBuffer = Buffer.from(arrayBuffer) 

  const putObjectParams = new PutObjectCommand({
    Bucket: 'lgdev-photos-upload',
    Key: image.name,
    Body: imageBuffer,
    ContentType: 'image/jpeg'
  })
  try{
    await s3Client.send(putObjectParams);
    revalidatePath('/')
    return {
      success: true,
    }
  } catch (e) {
    return{
      sucess: false,
      message: 'Algo deu errado :/'
    }
  }
}