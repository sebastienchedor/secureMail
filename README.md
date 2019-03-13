# Bienvenue sur le projet SecureMail

## Installation préalable
- Une base de donnée MYSQL
- Docker

### Configuration MYSQL (obligatoire)
- Allez dans le répertoire *config* et accédez au fichier *config_database*
- Mettez à jour les paramètres *databaseHost*, *databaseName*, *databaseUser*, *databasePassword* pour qu'il correspondent à votre base.
- Créez une table dans votre base dont le nom correspond à *databaseName*

### Configuration du serveur (facultatif)
- Changez le port dans le fichier *config/config_database*.
Par défaut, il s'agit du port *15263*.
- Changez l'host (non utilisé). Le champ *address* doit être cohérent, il est utilisé par le frontend.

## Lancement
Exécutez le script *docker_run.sh*

## Description de l'application
L'application est accessible sur à l'url  
- *http://serveur:port*  
ou  
- *http://serveur:port/index.html*

Elle contient deux onglets :

- Un onglet Read Mail qui permet de demande un token et de lire les mails
- Un onglet Send Mail qui permet d'envoyer un mail

### Send Mail
Pour envoyer un mail, il suffit de remplir les 5 champs demandés :

- Le champ *From* doit être une adresse mail : c'est l'expéditeur du mail
- Le champ *Send to* doit être une adresse mail : c'est le destinataire du mail, c'est à cette adresse que sera envoyée le mail initial
- Le champ *Send verification to* doit être une adresse mail : c'est l'adresse à laquelle sera envoyé le token de vérification
- Le champ *Subject* doit être une chaîne de caractère : c'est le sujet du mail
- Le champ *Content* est un texte libre. Ici tous les retours à la ligne seront convertis en balises *<br/>*

Cette page est réinitialisé si le mail est envoyé avec succès

### Read Mail
Pour accéder à un mail il faut suivre la procédure suivante :

- Entrer l'id du mail dans le chmpa *Mail ID*. Cet id est accessible dans le premier mail envoyé.
- Demander un token. Ceci envoie un mail à l'adresse spécifiée dans le champ de vérification.
- Récupérer le token reçu par mail et le mettre dans le champs *Token*
- Demander le mail en appuyant sur le bouton *Display mail*.

## Évolutions possibles
- Mise en place d'un jeu de test
- Fonctionnement plus automatisé du déploiement de la base de donnée
- Correction des adresses d'accès dans les mails (ici, on utilise localhost)
- Amélioration de l'architecture du code (surtout front) afin d'éviter la trop grande répétition lors de la transmission des variables (source d'erreur)
- Remplacement de l'id du mail par un token (faille de sécurité, ici c'est 1, 2, 3, ...)
