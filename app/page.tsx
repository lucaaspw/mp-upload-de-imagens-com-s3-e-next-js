import ImageGallery from "./_components/image-gallery";
import UploadImages from "./_components/upload-images";

export default function Home() {
  return (
    <div className="relative">
      <header className="flex justify-center pt-16">
        <div className="flex flex-col items-center border-b-[1px] border-b-slate-300 px-20 pb-4">
          <h1 className="text-6xl text-[#375184] font-bold mb-3">Foto Upload</h1>
          <p className="text-[#636363] text-base">Galeria de fotos com <strong>Next.js, upload de imagens</strong> e <strong>S3</strong></p>
        </div>
      </header>
      <div className="max-w-[900px] mt-12 mx-auto mb-12">
        <UploadImages/>
        <div className="mt-9">
          <h3 className="text-center text-3xl font-bold text-[#375184]">Galeria de fotos de Gatos</h3>
          <ImageGallery/>
        </div>

      </div>
      <footer className="bg-[#375184] h-[55px]">

      </footer>
    </div>
  );
}
