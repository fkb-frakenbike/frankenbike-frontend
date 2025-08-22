'use client'
import Image from "next/image";
import CommentBox from "../CommentComponent"; 

export type DetailsProps = {
  img: string;
  title: string;
  text: string; // biographie ou description longue
  comment?: string;
};



export default function CardDetailsPage({ img, title, text, comment }: DetailsProps) {
  return (
    <>
      <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-[#2C0857] to-purple-400 p-6 relative">
        {/* Côté gauche : image + titre */}
        <div className="md:w-1/2 flex flex-col items-center justify-center mb-8 md:mb-0">
          <div
            className="
              mt-12 md:mt-0
              w-52 h-32
              md:w-[350px] md:h-[220px]
              lg:w-[449px] lg:h-[283px]
              xl:w-[449px] xl:h-[283px]
              2xl:w-[449px] 2xl:h-[283px]
              rounded-[30px] overflow-hidden shadow-xl bg-white
            "
          >
            <Image
              src={img}
              alt={title}
              width={576}
              height={320}
              className="object-cover w-full h-full"
              priority
            />
          </div>
          <h1 className="mt-4 text-lg md:text-3xl font-bold text-white drop-shadow text-center">{title}</h1>
        </div>

        {/* Côté droit : biographie/texte + commentaire */}
        <div className="md:w-1/2 flex flex-col items-center justify-center relative space-y-6">
          <div className="bg-white/90 rounded-2xl shadow-lg p-6 md:p-10 max-w-xl w-full">
            <h2 className="text-base md:text-xl font-semibold text-purple-900 mb-4">Biographie</h2>
            <p className="text-gray-800 text-sm md:text-lg whitespace-pre-line">{text}</p>
          </div>

          {comment && (
            <div
              className="
                hidden md:block
                border-2 border-white
                bg-white/80
                rounded-xl
                shadow-lg
                p-4
                max-w-sm
                self-end
              "
            >
              <p className="text-purple-900 text-base md:text-lg">{comment}</p>
            </div>
          )}

          {/* Section CommentBox intégrée ici */}
          <div className="w-full max-w-xl">
           
          </div>
        </div>
      </div>
    </>
  );
}
