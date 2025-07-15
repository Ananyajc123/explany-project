import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, insertShopSchema, insertWasteItemSchema, 
  insertBookSchema, insertTransactionSchema, insertPointRedemptionSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Users
  app.get("/api/users/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const user = await storage.getUser(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });

  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: "Invalid user data", error });
    }
  });

  app.put("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const user = await storage.updateUser(id, updates);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(400).json({ message: "Invalid update data", error });
    }
  });

  // Shops
  app.get("/api/shops", async (req, res) => {
    const shops = await storage.getShops();
    res.json(shops);
  });

  app.get("/api/shops/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const shop = await storage.getShop(id);
    if (shop) {
      res.json(shop);
    } else {
      res.status(404).json({ message: "Shop not found" });
    }
  });

  app.post("/api/shops", async (req, res) => {
    try {
      const shopData = insertShopSchema.parse(req.body);
      const shop = await storage.createShop(shopData);
      res.status(201).json(shop);
    } catch (error) {
      res.status(400).json({ message: "Invalid shop data", error });
    }
  });

  // Waste Categories
  app.get("/api/waste-categories", async (req, res) => {
    const categories = await storage.getWasteCategories();
    res.json(categories);
  });

  // Waste Items
  app.get("/api/waste-items/user/:userId", async (req, res) => {
    const userId = parseInt(req.params.userId);
    const items = await storage.getWasteItemsByUser(userId);
    res.json(items);
  });

  app.get("/api/waste-items/shop/:shopId", async (req, res) => {
    const shopId = parseInt(req.params.shopId);
    const items = await storage.getWasteItemsByShop(shopId);
    res.json(items);
  });

  app.post("/api/waste-items", async (req, res) => {
    try {
      const itemData = insertWasteItemSchema.parse(req.body);
      const item = await storage.createWasteItem(itemData);
      
      // Update user points
      if (item.userId) {
        const user = await storage.getUser(item.userId);
        if (user) {
          await storage.updateUser(item.userId, {
            points: (user.points || 0) + item.pointsEarned,
            totalEarned: (parseFloat(user.totalEarned || "0") + (item.pointsEarned * 0.1)).toFixed(2),
          });
        }
      }

      res.status(201).json(item);
    } catch (error) {
      res.status(400).json({ message: "Invalid waste item data", error });
    }
  });

  app.put("/api/waste-items/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const item = await storage.updateWasteItem(id, updates);
      if (item) {
        res.json(item);
      } else {
        res.status(404).json({ message: "Waste item not found" });
      }
    } catch (error) {
      res.status(400).json({ message: "Invalid update data", error });
    }
  });

  // Books
  app.get("/api/books", async (req, res) => {
    const { category } = req.query;
    if (category) {
      const books = await storage.getBooksByCategory(category as string);
      res.json(books);
    } else {
      const books = await storage.getBooks();
      res.json(books);
    }
  });

  app.get("/api/books/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const book = await storage.getBook(id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  });

  app.post("/api/books", async (req, res) => {
    try {
      const bookData = insertBookSchema.parse(req.body);
      const book = await storage.createBook(bookData);
      res.status(201).json(book);
    } catch (error) {
      res.status(400).json({ message: "Invalid book data", error });
    }
  });

  // Transactions
  app.get("/api/transactions/user/:userId", async (req, res) => {
    const userId = parseInt(req.params.userId);
    const transactions = await storage.getTransactionsByUser(userId);
    res.json(transactions);
  });

  app.post("/api/transactions", async (req, res) => {
    try {
      const transactionData = insertTransactionSchema.parse(req.body);
      const transaction = await storage.createTransaction(transactionData);
      res.status(201).json(transaction);
    } catch (error) {
      res.status(400).json({ message: "Invalid transaction data", error });
    }
  });

  // Point Redemptions
  app.get("/api/point-redemptions/user/:userId", async (req, res) => {
    const userId = parseInt(req.params.userId);
    const redemptions = await storage.getPointRedemptionsByUser(userId);
    res.json(redemptions);
  });

  app.post("/api/point-redemptions", async (req, res) => {
    try {
      const redemptionData = insertPointRedemptionSchema.parse(req.body);
      const redemption = await storage.createPointRedemption(redemptionData);
      
      // Update user points
      if (redemption.userId) {
        const user = await storage.getUser(redemption.userId);
        if (user) {
          await storage.updateUser(redemption.userId, {
            points: (user.points || 0) - redemption.pointsUsed,
          });
        }
      }

      res.status(201).json(redemption);
    } catch (error) {
      res.status(400).json({ message: "Invalid redemption data", error });
    }
  });

  // Scan waste endpoint (AI simulation)
  app.post("/api/scan-waste", async (req, res) => {
    const { imageData } = req.body;
    
    // Simulate AI recognition
    const categories = await storage.getWasteCategories();
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    
    res.json({
      category: randomCategory,
      confidence: Math.random() * 0.3 + 0.7, // 70-100% confidence
      suggestions: [
        "Make sure the item is clean",
        "Remove any labels if possible",
        "Separate different materials"
      ]
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
