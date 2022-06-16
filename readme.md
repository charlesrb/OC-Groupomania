# Groupomania - Réseau social d'entreprise

## Prérequis :

- Frontend: Vue.js
- Backend: Node.js (avec Express.js)
- ORM: Prisma
- Database: MySQL

## Installation :

Clonez ce projet depuis GitHub
```
    $ git clone https://github.com/charlesrb/OC-Groupomania.git
```
### Backend

1. Ouvrez un terminal et allez dans le dossier backend
```
    $ cd backend
```
2. Configurez les variables d'environnement en renommant le fichier `config/example.env` en `.env`.

3. Générez la base de données
```
    $ npm prisma db push
    $ npm prisma db generate
```
Si nécessaire, vous trouverez la structure de la base de données à la racine du projet.

4. Lancez le serveur
```
    $ npm start
```
### Frontend

1. Ouvrez un terminal et allez dans le dossier frontend
```
    $ cd frontend
```
2. Installez les dépendances
```
    $ npm install
```
3. Lancez le serveur
```
    $ npm run serve
```

