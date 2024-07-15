import Image from "next/image";
import { ListObjectsV2Command } from '@aws-sdk/client-s3';
import { s3Client } from "@/lib/s3client";
import DeleteImage from "./delete-image";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose, DialogTrigger } from "@/components/ui/dialog";

export default async function ImageGallery() {
  const objectListParams = new ListObjectsV2Command({
    Bucket: 'lgdev-photos-upload'
  });

  const objectList = await s3Client.send(objectListParams);

  objectList.Contents?.sort((a: any, b: any) => {
    return (
      new Date(b.LastModified).getTime() - new Date(a.LastModified).getTime()
    );
  });

  const imageList = objectList.Contents?.map(object => object);
  const formatSize = (size: any) => {
    const sizeInMB = (size / (1024 * 1024)).toFixed(2);
    return +sizeInMB > 1 ? `${sizeInMB} MB` : `${sizeInMB} KB`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center gap-6 mt-6">
      {imageList?.map((image, index) => (
        <div key={index} className="p-2 m-auto group overflow-hidden rounded-md w-[280px] h-[280px] relative transition hover:transform hover:scale-105 bg-white shadow-md hover:shadow-lg">
          <Image src={`https://lgdev-photos-upload.s3.sa-east-1.amazonaws.com/${image.Key}`} width={268} height={268} className="h-full w-full object-cover" alt="Imagem" />
          <span className="absolute bottom-3 right-3 px-2 bg-[#375184] rounded-xl text-white">{formatSize(image.Size)}</span>

          <Dialog>
            <DialogTrigger asChild>
              <div className="absolute bg-gray-800 bg-opacity-60 group-hover:visible invisible flex items-center justify-center inset-0">
                <Button>
                  <Trash2 size={15} />
                </Button>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Deseja mesmo deletar essa imagem?</DialogTitle>
                <DialogDescription>
                  Ao confirmar você estará deletando a imagem para sempre.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex justify-start">
                <DeleteImage imageKey={image.Key ?? ''} />
                <DialogClose asChild>
                  <Button variant="outline">Cancelar</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      ))}
    </div>
  );
}
