'use client';

import { useState } from "react";
import InputField from '../InputField/InputField';

export default function ComponentForm() {
  // Etat pour plusieurs fichiers
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Handle upload multiple files
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedImages(Array.from(files));
    }
  };

  // Soumission formulaire
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();

    // Ajout de tous les fichiers dans formData (clé "images")
    selectedImages.forEach(image => {
      formData.append('images', image);
    });

    formData.append('title', title);
    formData.append('description', description);

    // Envoie le formData via fetch, axios, etc.
    // await api.post("/yourUpload", formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full md:flex-row md:gap-8 md:items-start"
    >
      {/* Partie gauche : Title + Description */}
      <div className="flex flex-col gap-4 flex-1">
     <InputField
  label="Title"
  type="text"
  id="title"
  name="title"
  required
  value={title}
  onChange={e => setTitle(e.target.value)}
  className="w-full max-w-[600px] h-36 md:h-40 rounded-none border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
/>

<InputField
  label="Description"
  type="text"
  id="description"
  name="description"
  required
  value={description}
  onChange={e => setDescription(e.target.value)}
  className="w-full max-w-[600px] h-36 md:h-40 rounded-none border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
/>


      </div>

      {/* Partie droite : Upload + bouton */}
      <div className="flex flex-col gap-4 w-full md:w-1/3 mt-10">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="block w-full border border-gray-300 rounded bg-white p-2"
          style={{ minWidth: 120, minHeight: 32 }}
        />

        {selectedImages.length > 0 && (
          <div className="text-white ml-2 max-h-48 overflow-auto">
            {selectedImages.map((file, index) => (
              <p key={index}>{file.name}</p>
            ))}
          </div>
        )}

        <button
          type="submit"
          className="flex w-full justify-center rounded-full border border-white bg-transparent px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Envoyer
        </button>
      </div>
    </form>
  );
}
