'use client';

import CardDetailsPage from "../components/detailsForm";
import CommentBox from "../components/CommentComponent";

export default function Home() {
  return (
    <>
      <CardDetailsPage 
      img="/bikeCustom.png"
      title="Mon tt nouveau tiger bike"
      text="Voici la biographie ou la description longue du post. Tu peux mettre autant de texte que tu veux ici, 
      il s'affichera dans l'encadré à droite."/>
     
    </>
    
  );
}
