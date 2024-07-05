'use client';

import { toast } from "@/components/ui/use-toast";
import { uploadImage } from "../actions";
import { ToastAction } from "@/components/ui/toast";

const UploadImages = () => {
  async function handleSubmit(formData: FormData) {
    const actionResponse = await uploadImage(formData)
    if (actionResponse.success) {
      toast({
        description: "Imagem enviada com sucesso",
      })
    }else{
      toast({
        variant: "destructive",
        description: "Ops..." + actionResponse.message ?? '',
      })
    }
  }
  return (
    <div className="flex justify-center">
      <form action={handleSubmit}>
        <input type="file" name="image" id="image" />
        <button className="text-white bg-[#375184] rounded-md px-3 py-2 ml-3">Enviar imagem</button>
      </form>
    </div>
  );
}

export default UploadImages;