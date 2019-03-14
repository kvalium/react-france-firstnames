import React from 'react'

const About = () => (
  <div>
    <h1>A propos de Meliamo</h1>

    <h2>Pile technique</h2>
    <p>
      Meliamo utilise un back-end lié à une base de données MongoDB contenant les données relatives aux prénoms 
      (année, nombre, sexe, département) et un cluster ElasticSearch stockant tous les prénoms. C'est ce cache qui est interrogé lors
      de la recherche du prénom sur la page d'accueil et permet d'obtenir des résultats très rapides. 
      Le back-end expose une instance GraphQL utilisée pour toutes les opérations de recherche de données.
    </p>
    <p>
      Le front-end utilise React et la librairie Appolo pour la communication avec le back-end.
    </p>

    <h2>Données</h2>
    <p>Les données des prénoms proviennent du fichier des prénoms fourni par l'INSEE.</p>
    <p>
      Le fichier des prénoms contient des données sur les prénoms attribués aux enfants nés en France entre 1900 et 2016. 
      Ces données sont disponibles au niveau France et par département.
    </p>
    <p>
      Le fichier des prénoms est établi à partir des seuls bulletins de naissance des personnes nées en France y compris 
      les départements d’outre-mer (Dom). En conséquence, l’exhaustivité n’est pas garantie sur toute la période, 
      notamment pour les années antérieures à 1946. Les utilisateurs pourront donc constater des écarts avec le 
      nombre annuel des naissances évalué par l'Insee. Ces écarts, importants en début de période, vont en s’amenuisant. 
      Après 1946, ils sont peu significatifs.
    </p>
    <p>
      Les informations contenues dans le fichier des prénoms sont basées sur les bulletins d'état-civil transmis à l’Insee 
      par les officiers d’état-civil des communes. Ces bulletins sont eux-mêmes établis à partir des déclarations des parents. 
      L'Insee ne peut garantir que le fichier des prénoms soit exempt d'omissions ou d'erreurs.
    </p>
    <p><a target="_blank" rel="noopener noreferrer" href="https://www.insee.fr/fr/statistiques/2540004#documentation">Plus d'informations</a></p>
  </div>
)

export default About