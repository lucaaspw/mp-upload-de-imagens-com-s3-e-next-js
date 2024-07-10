"use server";
import { DeleteObjectCommand, ListObjectsCommand, PutObjectCommand } from "@aws-sdk/client-s3";
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
      success: false,
      message: 'Formato inválido, necessário ser do tipo imagem'
    }
  }
  if(image.size > 2 * 1024 * 1024){
    return {
      success: false,
      message: 'Arquivo muito grande maior que (2mb)',
    }
  }

  if(await toManyImages()){
    return{
      success: false,
      message: "Sua aplicação atingiu o número máximo de imagens. Delete alguma para proceguir."
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

async function toManyImages() {
  const listObjectsParams = new ListObjectsCommand({
    Bucket: 'lgdev-photos-upload'
  })

  const objects = await s3Client.send(listObjectsParams)

  if((objects.Contents?.length ?? 0) > 15){
    return true;
  }else{
    return false;
  }
}

export async function deleteImage(key: string){
  const deleteObjectParams = new DeleteObjectCommand({
    Bucket: 'lgdev-photos-upload',
    Key: key
  })
  try{
    await s3Client.send(deleteObjectParams)
    revalidatePath('/');
    return{
      success: true,
    };
  } catch(e){
    console.log("Erro:", e)
    return {
      success: false,
    }
  }
}