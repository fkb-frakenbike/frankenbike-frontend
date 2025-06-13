"use client"

import { motion } from "motion/react"
import { useState } from "react"

const slides = [
  {
    color: "bg-gradient-to-r from-blue-500 to-blue-600",
    title: "Slide 1",
    text: "Ceci est la première slide. Lorem ipsum dolor sit amet.",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    likes: 250,
    comments: 20,
  },
  {
    color: "bg-gradient-to-r from-pink-500 to-pink-600",
    title: "Slide 2",
    text: "Voici la deuxième slide. Pellentesque habitant morbi.",
    img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    likes: 180,
    comments: 12,
  },
  {
    color: "bg-gradient-to-r from-green-400 to-green-600",
    title: "Slide 3",
    text: "Encore une autre slide, très stylée !",
    img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    likes: 320,
    comments: 35,
  },
  {
    color: "bg-gradient-to-r from-yellow-400 to-yellow-600",
    title: "Slide 4",
    text: "La dernière slide, merci d'avoir regardé !",
    img: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=400&q=80",
    likes: 99,
    comments: 8,
  }
]

export default function CardSlider() {
  const [selected, setSelected] = useState(0)

  const prev = (selected - 1 + slides.length) % slides.length
  const next = (selected + 1) % slides.length

  return (
    <div className="flex justify-center items-center h-screen w-full bg-gray-100 relative px-2">
      {/* Flèche gauche : visible seulement à partir de sm */}
      <button
        className={`hidden sm:flex absolute left-2 sm:left-8 z-30 items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full ${slides[selected].color} shadow-md top-1/2 -translate-y-1/2`}
        onClick={() => setSelected((prev) => (prev - 1 + slides.length) % slides.length)}
        aria-label="Précédent"
      >
        <ArrowLeft className="w-6 h-6 text-white" />
      </button>

      {/* Slider */}
      {/* Mobile: horizontal scroll, Desktop: carousel animé */}
      <div
        className="
          relative
          w-full
          max-w-xs
          sm:max-w-xl
          h-[420px]
          flex
          sm:block
          overflow-x-auto
          sm:overflow-visible
          scrollbar-hide
          gap-4
          sm:-translate-x-40
          sm:gap-0
          snap-x
          snap-mandatory
        "
      >
        {/* Mobile: toutes les cartes, Desktop: seulement 3 cartes animées */}
        <div className="flex sm:hidden h-full gap-4">
          {slides.map((slide, idx) => (
            <div
              key={idx}
              className={`flex-shrink-0 w-64 h-full ${slide.color} rounded-xl shadow-xl flex flex-col overflow-hidden snap-center`}
            >
            
              {/* Image */}
              <div className="relative w-full h-40">
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="object-cover w-full h-full rounded-t-xl"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between px-4 py-3">
                <div>
                  <h5 className="mb-1 text-base font-semibold text-white drop-shadow">{slide.title}</h5>
                  <p className="text-sm font-light text-white/90">{slide.text}</p>
                </div>
                {/* Barre d'actions */}
                <div className="flex items-center justify-between gap-2 mt-4">
                  <div className="flex items-center bg-white/90 rounded-full px-3 py-1 gap-2 min-w-[70px]">
                    <img src="/svgSite/coeur.png" alt="Like" className="w-5 h-5" />
                    <span className="font-bold text-black text-base">{slide.likes}</span>
                  </div>
                  <div className="flex items-center bg-white/90 rounded-full px-3 py-1 gap-2 min-w-[70px]">
                    <img src="/svgSite/commentaire.png" alt="Commentaire" className="w-5 h-5" />
                    <span className="font-bold text-black text-base">{slide.comments}</span>
                  </div>
                  <div className="flex items-center bg-white/90 rounded-full px-2 py-1 gap-2 min-w-[36px]">
                    <img src="/svgSite/enregistrer.png" alt="Enregistrer" className="w-5 h-5 mx-auto" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Desktop: carousel animé */}
        <div className="hidden sm:block relative w-full h-full">
          {[prev, selected, next].map((idx, i) => {
            const offset = i - 1
            const isActive = idx === selected
            return (
              <motion.div
                key={idx}
                initial={false}
                animate={{
                  scale: isActive ? 1 : 0.88,
                  x: offset * 90,
                  opacity: isActive ? 1 : 0.7,
                  zIndex: isActive ? 20 : 10,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`absolute top-0 left-1/2 -translate-x-1/2 w-80 h-full ${slides[idx].color} rounded-xl shadow-xl flex flex-col overflow-hidden`}
                style={{
                  pointerEvents: isActive ? "auto" : "none",
                  boxShadow: isActive
                    ? "0 8px 32px rgba(0,0,0,0.18)"
                    : "0 2px 10px rgba(0,0,0,0.10)",
                }}
              >
                {/* Image */}
                <div className="relative w-full h-48">
                  <img
                    src={slides[idx].img}
                    alt={slides[idx].title}
                    className="object-cover w-full h-full rounded-t-xl"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between px-6 py-6">
                  <div>
                    <h5 className="mb-1 text-xl font-semibold text-white drop-shadow">{slides[idx].title}</h5>
                    <p className="text-base font-light text-white/90">{slides[idx].text}</p>
                  </div>
                  {/* Barre d'actions */}
                  <div className="flex items-center justify-between gap-2 mt-4">
                    <div className="flex items-center bg-white/90 rounded-full px-3 py-1 gap-2 min-w-[70px]">
                      <img src="/svgSite/like.png" alt="Like" className="w-5 h-5" />
                      <span className="font-bold text-black text-base">{slides[idx].likes}</span>
                    </div>
                    <div className="flex items-center bg-white/90 rounded-full px-3 py-1 gap-2 min-w-[70px]">
                      <img src="/svgSite/comment.png" alt="Commentaire" className="w-5 h-5" />
                      <span className="font-bold text-black text-base">{slides[idx].comments}</span>
                    </div>
                    <div className="flex items-center bg-white/90 rounded-full px-2 py-1 gap-2 min-w-[36px]">
                      <img src="/svgSite/save.png" alt="Enregistrer" className="w-5 h-5 mx-auto" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Flèche droite : visible seulement à partir de sm */}
      <button
        className={`hidden sm:flex absolute right-2 sm:right-8 z-30 items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full ${slides[selected].color} shadow-md top-1/2 -translate-y-1/2`}
        onClick={() => setSelected((prev) => (prev + 1) % slides.length)}
        aria-label="Suivant"
      >
        <ArrowRight className="w-6 h-6 text-white" />
      </button>
    </div>
  )
}

function ArrowLeft({ className = "" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  )
}
function ArrowRight({ className = "" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}