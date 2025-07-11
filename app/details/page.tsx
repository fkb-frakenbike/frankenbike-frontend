'use client';

import CardDetailsPage from "../detailsForm";

export default function Home() {
  return (
    <>
      <CardDetailsPage 
      img="/bikeCustom.png"
      title="Titre de la carte"
      text="Voici la biographie ou la description longue du post. Tu peux mettre autant de texte que tu veux ici, 
      il s'affichera dans l'encadré à droite."/>
    </>
  );
}
