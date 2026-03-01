# Implémentation d’un endpoint Webhook Sendcloud en NestJS (Mode Debug)

## Objectif

Créer un endpoint webhook en NestJS qui enregistre **exactement et brut** tout ce qui est reçu.

⚠️ Ne PAS implémenter la vérification de signature pour le moment.
⚠️ Ne PAS ajouter de logique métier.
⚠️ Ne PAS rejeter les requêtes.

Le but est uniquement d’observer et logger les données reçues.

---

## Route

POST /shipping/webhook

---

## Exigences obligatoires

### 1. Capturer le raw body

Configurer NestJS (Express adapter) pour permettre l’accès au body brut (raw body).

Le raw body doit être conservé exactement tel qu’il est reçu.

---

### 2. Logger les informations suivantes

À chaque requête reçue, enregistrer une structure de log contenant :

{
"received_at": "ISO timestamp",
"headers": { ... },
"raw_body": "string brut exact",
"parsed_body": { ... }
}

- `received_at` = date ISO actuelle
- `headers` = tous les headers reçus
- `raw_body` = body brut exact
- `parsed_body` = body JSON parsé

---

### 3. Réponse HTTP

Toujours retourner HTTP 200 rapidement.

Aucune validation.
Aucune vérification de signature.
Aucun rejet.

---

## À fournir

- Configuration complète du main.ts pour activer le raw body
- Controller NestJS complet
- Exemple de service de log (console.log structuré ou mock de stockage)
- Code propre et minimal

---

## Contraintes

- Aucune logique métier
- Aucune vérification HMAC
- Code simple et lisible
- Compatible avec future activation de la signature
