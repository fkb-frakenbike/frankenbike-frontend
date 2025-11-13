
export default function Mentionslegales(){
  return (
       <div className="fkb-bg min-h-screen flex flex-col items-center justify-start pt-32 px-6 sm:px-8 md:px-12">
      <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-center">
        Mentions Légales
      </h1>
      <div className="max-w-full sm:max-w-3xl text-left space-y-4 px-4 sm:px-0 text-white text-sm sm:text-base md:text-lg leading-relaxed">
        <p>
          <strong>Éditeur du site</strong><br />
          Ce site est édité par l’équipe FKB Frankenbike
        </p>
        <p>
          <strong>Adresse :</strong> Paris
        </p>
       <div>
        <p><strong>Hébergement</strong></p>
        <p>Le site Frankenbike est hébergé par :</p>
        <ul className="list-disc list-inside">
            <li>Backend : Google Cloud Platform (GCP)</li>
            <li>
            Frontend : Vercel Inc.<br />
            Adresse : 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis<br />
            Site web : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">https://vercel.com</a>
            </li>
        </ul>
        </div>

        <p>
          <strong>Propriété intellectuelle</strong><br />
          Les contenus, textes et images présents sur le site Frankenbike sont la propriété de leurs auteurs, sauf mention contraire. Toute reproduction totale ou partielle sans autorisation est interdite.
        </p>
        <p>
          <strong>Protection des données personnelles</strong><br />
          Aucune donnée personnelle collectée n’est cédée à des tiers. Les données liées à la connexion sont utilisées uniquement dans le cadre du fonctionnement du site (authentification, sécurité). Les utilisateurs peuvent exercer leur droit de consultation, rectification ou suppression en contactant l’équipe via l’adresse fournie.
        </p>
        <p>
          <strong>Cookies</strong><br />
          Le site utilise des cookies techniques strictement nécessaires pour l’authentification. Aucune donnée de tracking n’est exploitée.
        </p>
        <p>
          <strong>Responsabilité</strong><br />
          Frankenbike décline toute responsabilité liée au contenu des liens externes ou des éventuelles interruptions de service.
        </p>
      </div>
    </div>
  );
}
