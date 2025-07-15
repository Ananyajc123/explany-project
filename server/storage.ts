import { 
  users, shops, wasteCategories, wasteItems, books, transactions, pointRedemptions,
  type User, type InsertUser, type Shop, type InsertShop, 
  type WasteCategory, type InsertWasteCategory, type WasteItem, type InsertWasteItem,
  type Book, type InsertBook, type Transaction, type InsertTransaction,
  type PointRedemption, type InsertPointRedemption
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User | undefined>;
  
  // Shops
  getShop(id: number): Promise<Shop | undefined>;
  getShops(): Promise<Shop[]>;
  getShopsByLocation(latitude: number, longitude: number, radius: number): Promise<Shop[]>;
  createShop(shop: InsertShop): Promise<Shop>;
  updateShop(id: number, updates: Partial<Shop>): Promise<Shop | undefined>;
  
  // Waste Categories
  getWasteCategories(): Promise<WasteCategory[]>;
  getWasteCategory(id: number): Promise<WasteCategory | undefined>;
  createWasteCategory(category: InsertWasteCategory): Promise<WasteCategory>;
  
  // Waste Items
  getWasteItem(id: number): Promise<WasteItem | undefined>;
  getWasteItemsByUser(userId: number): Promise<WasteItem[]>;
  getWasteItemsByShop(shopId: number): Promise<WasteItem[]>;
  createWasteItem(item: InsertWasteItem): Promise<WasteItem>;
  updateWasteItem(id: number, updates: Partial<WasteItem>): Promise<WasteItem | undefined>;
  
  // Books
  getBook(id: number): Promise<Book | undefined>;
  getBooks(): Promise<Book[]>;
  getBooksByCategory(category: string): Promise<Book[]>;
  getBooksBySeller(sellerId: number): Promise<Book[]>;
  createBook(book: InsertBook): Promise<Book>;
  updateBook(id: number, updates: Partial<Book>): Promise<Book | undefined>;
  
  // Transactions
  getTransaction(id: number): Promise<Transaction | undefined>;
  getTransactionsByUser(userId: number): Promise<Transaction[]>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  
  // Point Redemptions
  getPointRedemption(id: number): Promise<PointRedemption | undefined>;
  getPointRedemptionsByUser(userId: number): Promise<PointRedemption[]>;
  createPointRedemption(redemption: InsertPointRedemption): Promise<PointRedemption>;
  updatePointRedemption(id: number, updates: Partial<PointRedemption>): Promise<PointRedemption | undefined>;
}

export class DatabaseStorage implements IStorage {
  constructor() {
    this.seedData();
  }

  private async seedData() {
    try {
      // Check if data already exists
      const existingCategories = await db.select().from(wasteCategories).limit(1);
      if (existingCategories.length > 0) {
        return; // Data already seeded
      }

      // Seed waste categories
      const categories = [
        { name: 'Plastic Bottles', pointsPerKg: 50, description: 'PET bottles, water bottles', icon: 'bottle', color: 'blue' },
        { name: 'Plastic Bags', pointsPerKg: 30, description: 'Shopping bags, garbage bags', icon: 'bag', color: 'green' },
        { name: 'E-Waste', pointsPerKg: 100, description: 'Electronics, batteries, phones', icon: 'electronics', color: 'purple' },
        { name: 'Paper/Cardboard', pointsPerKg: 25, description: 'Newspapers, boxes, magazines', icon: 'paper', color: 'orange' },
        { name: 'Metal Cans', pointsPerKg: 75, description: 'Aluminum cans, tin cans', icon: 'can', color: 'red' },
      ];

      await db.insert(wasteCategories).values(categories);

      // Seed sample user
      await db.insert(users).values({
        username: 'john_doe',
        email: 'john@example.com',
        phone: '+91-9876543210',
        location: 'Rural Village, State',
        points: 245,
        totalEarned: "1250.00",
        co2Saved: "125.50",
        isShopOwner: false,
      });

      // Seed sample shop
      await db.insert(shops).values({
        name: 'Village General Store',
        address: '123 Main Street, Rural Village',
        phone: '+91-9876543211',
        latitude: "23.5204",
        longitude: "87.3119",
        ownerId: null,
        isActive: true,
        pointsDistributed: 5000,
      });
    } catch (error) {
      console.error('Error seeding data:', error);
    }
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set(updates)
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  // Shops
  async getShop(id: number): Promise<Shop | undefined> {
    const [shop] = await db.select().from(shops).where(eq(shops.id, id));
    return shop || undefined;
  }

  async getShops(): Promise<Shop[]> {
    return await db.select().from(shops);
  }

  async getShopsByLocation(latitude: number, longitude: number, radius: number): Promise<Shop[]> {
    const allShops = await db.select().from(shops);
    return allShops.filter(shop => 
      shop.latitude && shop.longitude && shop.isActive
    );
  }

  async createShop(insertShop: InsertShop): Promise<Shop> {
    const [shop] = await db
      .insert(shops)
      .values(insertShop)
      .returning();
    return shop;
  }

  async updateShop(id: number, updates: Partial<Shop>): Promise<Shop | undefined> {
    const [shop] = await db
      .update(shops)
      .set(updates)
      .where(eq(shops.id, id))
      .returning();
    return shop || undefined;
  }

  // Waste Categories
  async getWasteCategories(): Promise<WasteCategory[]> {
    return await db.select().from(wasteCategories);
  }

  async getWasteCategory(id: number): Promise<WasteCategory | undefined> {
    const [category] = await db.select().from(wasteCategories).where(eq(wasteCategories.id, id));
    return category || undefined;
  }

  async createWasteCategory(insertCategory: InsertWasteCategory): Promise<WasteCategory> {
    const [category] = await db
      .insert(wasteCategories)
      .values(insertCategory)
      .returning();
    return category;
  }

  // Waste Items
  async getWasteItem(id: number): Promise<WasteItem | undefined> {
    const [item] = await db.select().from(wasteItems).where(eq(wasteItems.id, id));
    return item || undefined;
  }

  async getWasteItemsByUser(userId: number): Promise<WasteItem[]> {
    return await db.select().from(wasteItems).where(eq(wasteItems.userId, userId));
  }

  async getWasteItemsByShop(shopId: number): Promise<WasteItem[]> {
    return await db.select().from(wasteItems).where(eq(wasteItems.shopId, shopId));
  }

  async createWasteItem(insertItem: InsertWasteItem): Promise<WasteItem> {
    const [item] = await db
      .insert(wasteItems)
      .values(insertItem)
      .returning();
    return item;
  }

  async updateWasteItem(id: number, updates: Partial<WasteItem>): Promise<WasteItem | undefined> {
    const [item] = await db
      .update(wasteItems)
      .set(updates)
      .where(eq(wasteItems.id, id))
      .returning();
    return item || undefined;
  }

  // Books
  async getBook(id: number): Promise<Book | undefined> {
    const [book] = await db.select().from(books).where(eq(books.id, id));
    return book || undefined;
  }

  async getBooks(): Promise<Book[]> {
    return await db.select().from(books).where(eq(books.isAvailable, true));
  }

  async getBooksByCategory(category: string): Promise<Book[]> {
    return await db.select().from(books).where(eq(books.category, category));
  }

  async getBooksBySeller(sellerId: number): Promise<Book[]> {
    return await db.select().from(books).where(eq(books.sellerId, sellerId));
  }

  async createBook(insertBook: InsertBook): Promise<Book> {
    const [book] = await db
      .insert(books)
      .values(insertBook)
      .returning();
    return book;
  }

  async updateBook(id: number, updates: Partial<Book>): Promise<Book | undefined> {
    const [book] = await db
      .update(books)
      .set(updates)
      .where(eq(books.id, id))
      .returning();
    return book || undefined;
  }

  // Transactions
  async getTransaction(id: number): Promise<Transaction | undefined> {
    const [transaction] = await db.select().from(transactions).where(eq(transactions.id, id));
    return transaction || undefined;
  }

  async getTransactionsByUser(userId: number): Promise<Transaction[]> {
    return await db.select().from(transactions).where(eq(transactions.userId, userId));
  }

  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const [transaction] = await db
      .insert(transactions)
      .values(insertTransaction)
      .returning();
    return transaction;
  }

  // Point Redemptions
  async getPointRedemption(id: number): Promise<PointRedemption | undefined> {
    const [redemption] = await db.select().from(pointRedemptions).where(eq(pointRedemptions.id, id));
    return redemption || undefined;
  }

  async getPointRedemptionsByUser(userId: number): Promise<PointRedemption[]> {
    return await db.select().from(pointRedemptions).where(eq(pointRedemptions.userId, userId));
  }

  async createPointRedemption(insertRedemption: InsertPointRedemption): Promise<PointRedemption> {
    const [redemption] = await db
      .insert(pointRedemptions)
      .values(insertRedemption)
      .returning();
    return redemption;
  }

  async updatePointRedemption(id: number, updates: Partial<PointRedemption>): Promise<PointRedemption | undefined> {
    const [redemption] = await db
      .update(pointRedemptions)
      .set(updates)
      .where(eq(pointRedemptions.id, id))
      .returning();
    return redemption || undefined;
  }
}

export const storage = new DatabaseStorage();
