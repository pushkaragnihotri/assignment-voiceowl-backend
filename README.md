# VoiceOwl Backend Assignment

Minimal backend service that accepts an audio file URL, mocks a transcription, and stores the result in MongoDB.
Built with **Node.js**, **TypeScript**, **Express**, and **Mongoose**.

---

## Tech Stack

- Node.js + TypeScript
- Express
- MongoDB (via MongoMemoryServer)
- Joi (request validation)
- Dotenv (environment variables)

---

## Setup

Clone the repo and install dependencies:

```sh
npm install
```

Run in dev mode:

```sh
npm run dev
```

Build and run:

```sh
npm run build && npm start
```

## API Endpoints

1. **Health Check**

    ```sh
    curl http://localhost:3000/health
    ```

    Response:

    ```json
    { "status": "ok" }
    ```

2. **Create Transcription**

    ```sh
    curl -X POST http://localhost:3000/transcription \
      -H "Content-Type: application/json" \
      -d '{"audioUrl":"https://example.com/sample.mp3"}'
    ```

    Response (201):

    ```json
    {
      "_id": "68d3e958f60cc64bc3907567",
      "audioUrl": "https://example.com/sample.mp3",
      "transcription": "mock transcription of audio-data-from-https://exampl...",
      "status": "completed",
      "createdAt": "2025-09-24T12:51:36.612Z"
    }
    ```

3. **List Transcriptions**

    Fetch all (default max 50):

    ```sh
    curl http://localhost:3000/transcription
    ```

    Response (200):

    ```json
    [
      {
        "_id": "68d3e958f60cc64bc3907567",
        "audioUrl": "https://example.com/sample.mp3",
        "transcription": "mock transcription of audio-data-from-https://exampl...",
        "status": "completed",
        "createdAt": "2025-09-24T12:51:36.612Z",
        "updatedAt": "2025-09-24T12:51:36.627Z"
      }
    ]
    ```

    With filters:

    ```sh
    curl "http://localhost:3000/transcription?status=completed&limit=5&skip=0"
    ```

---

## Project Structure

```txt
src/
  app.ts              # Express app setup
  index.ts            # Entry point
  config.ts           # Config/env vars
  db/                 # DB connection (MongoMemoryServer / MongoDB)
  models/             # Mongoose models
  services/           # Business logic
  controllers/        # Route handlers
  routes/             # Express routes
  middleware/         # Error handling & validation
  validation/         # Joi schemas
  utils/              # Helpers (async handler, errors)
```

---

## Assumptions

- Audio download & transcription are mocked.
- In production, MONGO_URI would point to a real MongoDB.
- No frontend implemented (per decision).

---

## Possible Improvements

- Replace mocks with real audio download + transcription.
- Add authentication/authorization.
- Add pagination metadata (total count, next/prev links).
- Integration/unit tests (Jest).
- Dockerize for easier setup.
