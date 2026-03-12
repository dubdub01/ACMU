# Où mettre les images du site

Toutes les images statiques du site se placent dans le dossier **`public/`**.  
Les chemins dans le code commencent par **`/`** (sans `public`).

## Structure recommandée

```
public/
├── images/
│   ├── logo-acmu.jpg          # Logo du site (navigation)
│   ├── hero/
│   │   └── centre-medical.jpg # Image de la bannière d'accueil
│   └── praticiens/            # Photos des praticiens
│       ├── dupont.jpg
│       ├── martin.jpg
│       └── ...
├── favicon.ico
└── ...
```

## Utilisation

### Logo et images générales
- **Logo** : `public/images/logo-acmu.jpg` → chemin : `/images/logo-acmu.jpg`
- **Hero accueil** : `public/images/hero/centre-medical.jpg` → `/images/hero/centre-medical.jpg`

### Photos des praticiens
1. Déposez les fichiers dans **`public/images/praticiens/`**  
   Exemple : `public/images/praticiens/dr-dupont.jpg`
2. Dans l’admin, pour la fiche du praticien, indiquez le **chemin** :  
   `/images/praticiens/dr-dupont.jpg`

Le champ "Photo (URL)" du formulaire admin accepte soit :
- un **chemin** commençant par `/` (fichier dans `public/`) ;
- ou une **URL externe** (https://...).

## Formats conseillés
- **Format** : JPG, PNG ou WebP
- **Taille** : environ 400×400 px ou plus pour les photos de praticiens (le site les redimensionne si besoin)
- **Poids** : privilégier des images < 500 Ko pour le web

## En production
Sur O2Switch (ou autre hébergeur), les fichiers dans `public/` sont servis tels quels.  
Pensez à déployer le contenu de `public/images/` avec le reste du site.
