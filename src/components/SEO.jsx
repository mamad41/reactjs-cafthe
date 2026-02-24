import { useEffect } from 'react';

const SEO = ({ title, description, image, type = "website" }) => {
    const siteName = "CafThé | Torréfaction Artisanale";
    const fullTitle = `${title} | ${siteName}`;

    useEffect(() => {
        // 1. Mise à jour du Titre
        document.title = fullTitle;

        // 2. Mise à jour de la Meta Description
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.name = "description";
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute("content", description || "Découvrez nos cafés et thés d'exception.");

        // 3. Mise à jour des balises Open Graph (Réseaux Sociaux)
        const ogTags = [
            { property: 'og:title', content: fullTitle },
            { property: 'og:description', content: description },
            { property: 'og:type', content: type },
            { property: 'og:image', content: image || '/default-og-image.jpg' }
        ];

        ogTags.forEach(tag => {
            let element = document.querySelector(`meta[property="${tag.property}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute('property', tag.property);
                document.head.appendChild(element);
            }
            element.setAttribute('content', tag.content);
        });

    }, [fullTitle, description, image, type]);

    return null; // Ce composant ne rend rien visuellement
};

export default SEO;