'use client'

import { Button } from "@/components/ui/button"
import { deleteImage } from "../actions"
import { toast } from "@/components/ui/use-toast"
import { FC, FormEvent } from "react"

interface DeleteImageProps {
  imageKey:any,
}

const DeleteImage: FC<DeleteImageProps> = ({imageKey}) => {
  const handleDeleteImage = async (e: FormEvent) => {
    e.preventDefault();
      const actionRes = await deleteImage(imageKey);
      if (actionRes.success) {
        toast({
          description: "Imagem apagada com sucesso",
        });
      } else {
        toast({
          variant: "destructive",
          description: "Ops... ocorreu um erro",
        });
      }
  }

  return(
    <form 
      onSubmit={handleDeleteImage}
    >
      <Button variant="destructive">
        Confirmar
      </Button>
    </form>
  )
}

export default DeleteImage;


  
