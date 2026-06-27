import "dotenv/config";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { app, startDb } from "./server/server.js";
import { errorHandler } from "./server/middleware/errorHandler.js";

async function startServer() {
  try {
    const PORT = process.env.PORT || 3000;

    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is required");
    }

    await startDb();

    // Vite middleware for development
    if (process.env.NODE_ENV !== "production") {
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
    } else {
      const distPath = path.join(process.cwd(), "dist");
      app.use(express.static(distPath));
      app.get("*", (req, res) => {
        res.sendFile(path.join(distPath, "index.html"));
      });
    }

    app.use(errorHandler);

    app.listen(Number(PORT), "0.0.0.0", () => {
      console.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

startServer();
