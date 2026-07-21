import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  addDoc,
  where
} from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "./firebaseConfig";
import {
  HeroContent,
  AboutContent,
  WhyChooseUsItem,
  ServiceItem,
  WaterContent,
  SocialActivityItem,
  CommitteeMember,
  StatItem,
  GalleryItem,
  NewsItem,
  TestimonialItem,
  FAQItem,
  ContactInfo,
  SEOMetadata,
  ContactMessage,
  AwardItem
} from "../types";
import * as seed from "../constants/seedData";

// Singleton Document IDs in the "website_content" collection
const CONTENT_COLLECTION = "website_content";
const HERO_DOC = "hero";
const ABOUT_DOC = "about";
const WATER_DOC = "water_section";
const CONTACT_DOC = "contact_info";
const SEO_DOC = "seo_metadata";

// COLLECTION NAMES
export const COLLECTIONS = {
  WHY_CHOOSE_US: "why_choose_us",
  SERVICES: "services",
  SOCIAL_ACTIVITIES: "social_activities",
  EXECUTIVE_COMMITTEE: "executive_committee",
  STATISTICS: "statistics",
  GALLERY: "gallery",
  NEWS: "news",
  TESTIMONIALS: "testimonials",
  FAQS: "faqs",
  CONTACT_MESSAGES: "contact_messages",
  AWARDS: "awards"
};

// ----------------------------------------------------
// SINGLETON FETCH & SAVE HELPERS WITH SEED FALLBACKS
// ----------------------------------------------------

export async function getHeroContent(): Promise<HeroContent> {
  try {
    const docRef = doc(db, CONTENT_COLLECTION, HERO_DOC);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as HeroContent;
    }
    return seed.DEFAULT_HERO;
  } catch (error) {
    console.warn("Falling back to default Hero content due to Firestore error:", error);
    return seed.DEFAULT_HERO;
  }
}

export async function saveHeroContent(content: HeroContent): Promise<void> {
  const path = `${CONTENT_COLLECTION}/${HERO_DOC}`;
  try {
    const docRef = doc(db, CONTENT_COLLECTION, HERO_DOC);
    await setDoc(docRef, { ...content });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function getAboutContent(): Promise<AboutContent> {
  try {
    const docRef = doc(db, CONTENT_COLLECTION, ABOUT_DOC);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as AboutContent;
    }
    return seed.DEFAULT_ABOUT;
  } catch (error) {
    console.warn("Falling back to default About content due to Firestore error:", error);
    return seed.DEFAULT_ABOUT;
  }
}

export async function saveAboutContent(content: AboutContent): Promise<void> {
  const path = `${CONTENT_COLLECTION}/${ABOUT_DOC}`;
  try {
    const docRef = doc(db, CONTENT_COLLECTION, ABOUT_DOC);
    await setDoc(docRef, { ...content });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function getWaterContent(): Promise<WaterContent> {
  try {
    const docRef = doc(db, CONTENT_COLLECTION, WATER_DOC);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as WaterContent;
    }
    return seed.DEFAULT_WATER;
  } catch (error) {
    console.warn("Falling back to default Water content due to Firestore error:", error);
    return seed.DEFAULT_WATER;
  }
}

export async function saveWaterContent(content: WaterContent): Promise<void> {
  const path = `${CONTENT_COLLECTION}/${WATER_DOC}`;
  try {
    const docRef = doc(db, CONTENT_COLLECTION, WATER_DOC);
    await setDoc(docRef, { ...content });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function getContactInfo(): Promise<ContactInfo> {
  try {
    const docRef = doc(db, CONTENT_COLLECTION, CONTACT_DOC);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as ContactInfo;
    }
    return seed.DEFAULT_CONTACT;
  } catch (error) {
    console.warn("Falling back to default Contact Info due to Firestore error:", error);
    return seed.DEFAULT_CONTACT;
  }
}

export async function saveContactInfo(content: ContactInfo): Promise<void> {
  const path = `${CONTENT_COLLECTION}/${CONTACT_DOC}`;
  try {
    const docRef = doc(db, CONTENT_COLLECTION, CONTACT_DOC);
    await setDoc(docRef, { ...content });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function getSEOMetadata(): Promise<SEOMetadata> {
  try {
    const docRef = doc(db, CONTENT_COLLECTION, SEO_DOC);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as SEOMetadata;
    }
    return seed.DEFAULT_SEO;
  } catch (error) {
    console.warn("Falling back to default SEO due to Firestore error:", error);
    return seed.DEFAULT_SEO;
  }
}

export async function saveSEOMetadata(content: SEOMetadata): Promise<void> {
  const path = `${CONTENT_COLLECTION}/${SEO_DOC}`;
  try {
    const docRef = doc(db, CONTENT_COLLECTION, SEO_DOC);
    await setDoc(docRef, { ...content });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// ----------------------------------------------------
// LIST-BASED CRUD METHODS WITH FALLBACKS
// ----------------------------------------------------

export async function getListItems<T extends { id: string; order?: number; date?: string }>(
  collectionName: string,
  defaultSeed: T[]
): Promise<T[]> {
  try {
    const colRef = collection(db, collectionName);
    // Try sorting by order if available, or else just get
    const snap = await getDocs(colRef);
    
    if (!snap.empty) {
      const items: T[] = [];
      snap.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as unknown as T);
      });
      
      // Sort in-memory to be safe and consistent
      if (items[0] && "order" in items[0]) {
        items.sort((a, b) => (a.order || 0) - (b.order || 0));
      } else if (items[0] && "date" in items[0]) {
        items.sort((a, b) => new Date(b.date || "").getTime() - new Date(a.date || "").getTime());
      }
      return items;
    }
    return defaultSeed;
  } catch (error) {
    console.warn(`Falling back to default list for ${collectionName} due to Firestore error:`, error);
    return defaultSeed;
  }
}

export async function saveListItem<T extends { id: string }>(
  collectionName: string,
  item: T
): Promise<void> {
  const path = `${collectionName}/${item.id}`;
  try {
    const docRef = doc(db, collectionName, item.id);
    const { id, ...data } = item; // don't write id in payload itself if we want
    await setDoc(docRef, { ...data }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function deleteListItem(collectionName: string, itemId: string): Promise<void> {
  const path = `${collectionName}/${itemId}`;
  try {
    const docRef = doc(db, collectionName, itemId);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// ----------------------------------------------------
// CONTACT MESSAGES API
// ----------------------------------------------------

export async function submitContactMessage(message: Omit<ContactMessage, "id" | "date" | "status">): Promise<void> {
  const collectionName = COLLECTIONS.CONTACT_MESSAGES;
  try {
    const colRef = collection(db, collectionName);
    await addDoc(colRef, {
      ...message,
      date: new Date().toISOString(),
      status: "new"
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, collectionName);
  }
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  const collectionName = COLLECTIONS.CONTACT_MESSAGES;
  try {
    const colRef = collection(db, collectionName);
    const snap = await getDocs(colRef);
    const messages: ContactMessage[] = [];
    snap.forEach((doc) => {
      messages.push({ id: doc.id, ...doc.data() } as ContactMessage);
    });
    // Sort by date descending
    messages.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return messages;
  } catch (error) {
    console.warn("Could not retrieve contact messages:", error);
    return [];
  }
}

export async function updateContactMessageStatus(id: string, status: "new" | "read" | "replied"): Promise<void> {
  const path = `${COLLECTIONS.CONTACT_MESSAGES}/${id}`;
  try {
    const docRef = doc(db, COLLECTIONS.CONTACT_MESSAGES, id);
    await updateDoc(docRef, { status });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function deleteContactMessage(id: string): Promise<void> {
  const path = `${COLLECTIONS.CONTACT_MESSAGES}/${id}`;
  try {
    const docRef = doc(db, COLLECTIONS.CONTACT_MESSAGES, id);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// ----------------------------------------------------
// DATABASE INITIALIZATION & SEEDING UTILITY
// ----------------------------------------------------

export async function initializeDatabaseWithSeedData(): Promise<void> {
  try {
    console.log("Starting Firestore database seeding with Bengali default content...");

    // 1. Seed Singletons
    await saveHeroContent(seed.DEFAULT_HERO);
    await saveAboutContent(seed.DEFAULT_ABOUT);
    await saveWaterContent(seed.DEFAULT_WATER);
    await saveContactInfo(seed.DEFAULT_CONTACT);
    await saveSEOMetadata(seed.DEFAULT_SEO);

    // 2. Seed why_choose_us
    for (const item of seed.DEFAULT_WHY_CHOOSE_US) {
      await saveListItem(COLLECTIONS.WHY_CHOOSE_US, item);
    }

    // 3. Seed services
    for (const item of seed.DEFAULT_SERVICES) {
      await saveListItem(COLLECTIONS.SERVICES, item);
    }

    // 4. Seed social_activities
    for (const item of seed.DEFAULT_SOCIAL_ACTIVITIES) {
      await saveListItem(COLLECTIONS.SOCIAL_ACTIVITIES, item);
    }

    // 5. Seed executive_committee
    for (const item of seed.DEFAULT_COMMITTEE) {
      await saveListItem(COLLECTIONS.EXECUTIVE_COMMITTEE, item);
    }

    // 6. Seed statistics
    for (const item of seed.DEFAULT_STATS) {
      await saveListItem(COLLECTIONS.STATISTICS, item);
    }

    // 7. Seed gallery
    for (const item of seed.DEFAULT_GALLERY) {
      await saveListItem(COLLECTIONS.GALLERY, item);
    }

    // 8. Seed news
    for (const item of seed.DEFAULT_NEWS) {
      await saveListItem(COLLECTIONS.NEWS, item);
    }

    // 9. Seed testimonials
    for (const item of seed.DEFAULT_TESTIMONIALS) {
      await saveListItem(COLLECTIONS.TESTIMONIALS, item);
    }

    // 10. Seed FAQs
    for (const item of seed.DEFAULT_FAQ) {
      await saveListItem(COLLECTIONS.FAQS, item);
    }

    // 11. Seed Awards
    for (const item of seed.DEFAULT_AWARDS) {
      await saveListItem(COLLECTIONS.AWARDS, item);
    }

    console.log("Firestore database successfully seeded!");
  } catch (error) {
    console.error("Seeding operation failed:", error);
    throw error;
  }
}

export async function getAllContent() {
  try {
    const [
      hero,
      about,
      water,
      contact,
      seo,
      whyChooseUs,
      services,
      social,
      committee,
      stats,
      gallery,
      news,
      faqs,
      awards
    ] = await Promise.all([
      getHeroContent(),
      getAboutContent(),
      getWaterContent(),
      getContactInfo(),
      getSEOMetadata(),
      getListItems<WhyChooseUsItem>(COLLECTIONS.WHY_CHOOSE_US, seed.DEFAULT_WHY_CHOOSE_US),
      getListItems<ServiceItem>(COLLECTIONS.SERVICES, seed.DEFAULT_SERVICES),
      getListItems<SocialActivityItem>(COLLECTIONS.SOCIAL_ACTIVITIES, seed.DEFAULT_SOCIAL_ACTIVITIES),
      getListItems<CommitteeMember>(COLLECTIONS.EXECUTIVE_COMMITTEE, seed.DEFAULT_COMMITTEE),
      getListItems<StatItem>(COLLECTIONS.STATISTICS, seed.DEFAULT_STATS),
      getListItems<GalleryItem>(COLLECTIONS.GALLERY, seed.DEFAULT_GALLERY),
      getListItems<NewsItem>(COLLECTIONS.NEWS, seed.DEFAULT_NEWS),
      getListItems<FAQItem>(COLLECTIONS.FAQS, seed.DEFAULT_FAQ),
      getListItems<AwardItem>(COLLECTIONS.AWARDS, seed.DEFAULT_AWARDS)
    ]);

    return {
      hero,
      about,
      water,
      contact,
      seo,
      whyChooseUs,
      services,
      social,
      committee,
      stats,
      gallery,
      news,
      faqs,
      awards
    };
  } catch (err) {
    console.error("Error loading all content from Firestore:", err);
    throw err;
  }
}

