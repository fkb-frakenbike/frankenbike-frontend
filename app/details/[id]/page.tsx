'use client';
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from '../../lib/axios'; // adapte ton chemin
import CardDetailsPage, { DetailsProps } from "../../components/detailsForm";

export default function ProjectDetailsWrapper() {
  const params = useParams();

  // Gestion du cas où params.id est un tableau ou une string
  const id = params.id;


  const [project, setProject] = useState<DetailsProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Param id reçu :", id);

    if (!id || !/^\d+$/.test(id)) {
      setError("ID de projet invalide");
      setLoading(false);
      return;
    }

    api.get(`/api/projects/${id}`)
      .then(res => {
        setProject({
          img: "/bikeCustom.png",
          title: res.data.title,
          text: res.data.description,
          comment: "Commentaire statique pour l’instant",
        });
      })
      .catch(() => setError("Erreur lors du chargement du projet"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!project) return <p>Aucun projet trouvé.</p>;

  return <CardDetailsPage {...project} />;
}
