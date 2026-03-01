# Webhook NestJS — Mode Brut Total (Debug)

## Objectif

Créer un endpoint webhook qui affiche exactement ce qui est reçu,
sans modification, sans ajout de champs, sans logique métier.

Je veux voir le webhook Sendcloud pur, incluant les headers.

---

## Exigences

### Route
POST /shipping/webhook

---

### Comportement obligatoire

1. Ne PAS modifier le body.
2. Ne PAS ajouter de champs.
3. Ne PAS faire de validation.
4. Ne PAS vérifier la signature.
5. Ne PAS transformer les données.
6. Ne PAS filtrer les headers.

---

### Ce que le serveur doit afficher

À chaque requête reçue, logger :

- req.headers (complets)
- raw body EXACT tel que reçu
- rien d’autre

Le body doit être récupéré en version brute (raw body),
pas uniquement via @Body().

---

### Réponse HTTP

Toujours retourner :
HTTP 200

Sans condition.

---

## Important

Le but est d’obtenir :

- Le webhook Sendcloud tel qu’il est envoyé
- Voir si le header `Sendcloud-Signature` est présent
- Voir le contenu exact du body
- Aucun artifice
- Aucun enrichissement

Code propre, minimal, et clair.