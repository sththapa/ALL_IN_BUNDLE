export interface CheatSheetEntry {
  index: number;
  code: string;
  title: string | null;
  category: string | null;
  previewImageUrl: string | null;
  isLocked: boolean;
}

// Exact filenames from cheatsheets(1).zip.
const CHEAT_SHEET_DATA = [
  {
    "title": "20 Thai Mistakes Foreigners Make",
    "category": "Culture & Etiquette",
    "filename": "20 Thai Mistakes Foreigners Make.png"
  },
  {
    "title": "7-Eleven Survival Guide",
    "category": "Shopping & Money",
    "filename": "7-Eleven Thai Survival Cheat Sheet.png"
  },
  {
    "title": "Thai Money & Prices",
    "category": "Shopping & Money",
    "filename": "Money Prices Thailand Travel Cheat Sheet.png"
  },
  {
    "title": "Emergency Thai Phrases",
    "category": "Health & Safety",
    "filename": "NepThai Emergency Phrase Cheat Sheet.png"
  },
  {
    "title": "Shopping & Bargaining",
    "category": "Shopping & Money",
    "filename": "NepThai Shopping Bargaining Cheat Sheet.png"
  },
  {
    "title": "Thai Food & Allergy Communication",
    "category": "Food & Dining",
    "filename": "NepThai Thai Food Allergy Cheat Sheet.png"
  },
  {
    "title": "Essential Thai Questions",
    "category": "Everyday Thai",
    "filename": "NepThai Thai Questions Travel Cheat Sheet.png"
  },
  {
    "title": "Thailand Taxi Survival Phrases",
    "category": "Transportation",
    "filename": "NepThai Thailand Taxi Phrase Cheat Sheet.png"
  },
  {
    "title": "Thai ATM & Banking",
    "category": "Shopping & Money",
    "filename": "Thai ATM Banking Cheat Sheet.png"
  },
  {
    "title": "Thai Café Ordering",
    "category": "Food & Dining",
    "filename": "Thai Café Ordering Cheat Sheet.png"
  },
  {
    "title": "Thai Condo Rental",
    "category": "Accommodation & Daily Life",
    "filename": "Thai Condo Rental Pocket Cheat Sheet.png"
  },
  {
    "title": "Thai Dating & Friendship",
    "category": "Culture & Etiquette",
    "filename": "Thai Dating Friendship Cheat Sheet.png"
  },
  {
    "title": "Essential Thai Food Phrases",
    "category": "Food & Dining",
    "filename": "Thai Food Phrase Cheat Sheet.png"
  },
  {
    "title": "Thai Greetings & Travel Language",
    "category": "Everyday Thai",
    "filename": "Thai Greetings and Travel Language Guide.png"
  },
  {
    "title": "Haircut & Beauty Salon",
    "category": "Accommodation & Daily Life",
    "filename": "Thai Haircut Beauty Salon Cheat Sheet.png"
  },
  {
    "title": "Thai Hotel Survival Phrases",
    "category": "Accommodation & Daily Life",
    "filename": "Thai Hotel Phrase Cheat Sheet.png"
  },
  {
    "title": "Essential Thai Massage Phrases",
    "category": "Accommodation & Daily Life",
    "filename": "Thai Massage Phrases Infographic.png"
  },
  {
    "title": "Motorbike Taxi & Grab",
    "category": "Transportation",
    "filename": "Thai Motorbike Taxi Grab Cheat Sheet.png"
  },
  {
    "title": "Thai Numbers",
    "category": "Everyday Thai",
    "filename": "Thai Numbers Travel Learning Poster.png"
  },
  {
    "title": "Thai Pharmacy & Illness",
    "category": "Health & Safety",
    "filename": "Thai Pharmacy Illness Cheat Sheet.png"
  },
  {
    "title": "Thai Polite Particles",
    "category": "Everyday Thai",
    "filename": "Thai Polite Particles Cheat Sheet.png"
  },
  {
    "title": "Common Thai Replies",
    "category": "Everyday Thai",
    "filename": "Thai Reply Cheat Sheet Infographic.png"
  },
  {
    "title": "Restaurant Problem-Solving",
    "category": "Food & Dining",
    "filename": "Thai Restaurant Problem-Solving Cheat Sheet.png"
  },
  {
    "title": "Thai Temple Etiquette",
    "category": "Culture & Etiquette",
    "filename": "Thai Temple Etiquette Cheat Sheet.png"
  },
  {
    "title": "Asking for Travel Directions",
    "category": "Transportation",
    "filename": "Thai Travel Directions Cheat Sheet.png"
  },
  {
    "title": "Thailand Airport Survival Phrases",
    "category": "Travel & Arrival",
    "filename": "Thailand Airport Phrase Cheat Sheet.png"
  },
  {
    "title": "Essential Airport Thai",
    "category": "Travel & Arrival",
    "filename": "Thailand Airport Thai Phrase Cheatsheet.png"
  },
  {
    "title": "Making Appointments in Thai",
    "category": "Accommodation & Daily Life",
    "filename": "Thailand Appointment Phrase Cheat Sheet.png"
  },
  {
    "title": "Clothes Shopping in Thailand",
    "category": "Shopping & Money",
    "filename": "Thailand Clothes Shopping Cheat Sheet.png"
  },
  {
    "title": "Immigration & Visa Extension",
    "category": "Travel & Arrival",
    "filename": "Thailand Immigration Visa Extension Cheat Sheet.png"
  },
  {
    "title": "Thailand Island Hopping",
    "category": "Travel & Arrival",
    "filename": "Thailand Island Hopping Cheat Sheet.png"
  },
  {
    "title": "Thailand Laundry Survival Guide",
    "category": "Accommodation & Daily Life",
    "filename": "Thailand Laundry Care Cheat Sheet.png"
  },
  {
    "title": "Lost Items & Police Reports",
    "category": "Health & Safety",
    "filename": "Thailand Lost Items Police Report Cheat Sheet.png"
  },
  {
    "title": "Thai Massage: Booking, Types & Prices",
    "category": "Accommodation & Daily Life",
    "filename": "101.png"
  },
  {
    "title": "Thailand Restroom Survival Guide",
    "category": "Accommodation & Daily Life",
    "filename": "Thailand Restroom Survival Cheat Sheet.png"
  },
  {
    "title": "Thailand Shopping Survival Guide",
    "category": "Shopping & Money",
    "filename": "Thailand Shopping Survival Cheat Sheet.png"
  },
  {
    "title": "SIM Cards & Mobile Internet",
    "category": "Travel & Arrival",
    "filename": "Thailand SIM Card Mobile Internet Cheat Sheet.png"
  },
  {
    "title": "Thailand Street Food Survival",
    "category": "Food & Dining",
    "filename": "Thailand Street Food Survival Cheat Sheet.png"
  },
  {
    "title": "Thai Supermarket Essentials",
    "category": "Shopping & Money",
    "filename": "Thailand Supermarket Thai Cheat Sheet.png"
  },
  {
    "title": "Tickets & Tourist Attractions",
    "category": "Travel & Arrival",
    "filename": "Thailand Survival Cheat Sheet Tickets Attractions.png"
  },
  {
    "title": "Thailand Train & Bus Survival",
    "category": "Transportation",
    "filename": "Thailand Train Bus Survival Cheat Sheet.png"
  },
  {
    "title": "Thailand Public Transit Phrases",
    "category": "Transportation",
    "filename": "Thailand Transit Phrase Cheat Sheet.png"
  }
];

export const CHEAT_SHEET_COUNT = CHEAT_SHEET_DATA.length;

export const CHEAT_SHEETS: CheatSheetEntry[] = CHEAT_SHEET_DATA.map(
  (sheet, idx) => {
    const number = idx + 1;
    return {
      index: number,
      code: `Sheet ${String(number).padStart(2, "0")}`,
      title: sheet.title,
      category: sheet.category,
      previewImageUrl: `${import.meta.env.BASE_URL}cheatsheets/${encodeURIComponent(sheet.filename)}`,
      isLocked: true,
    };
  }
);

export function getCheatSheetCategories(sheets: CheatSheetEntry[]): string[] {
  const unique = new Set<string>();
  for (const sheet of sheets) {
    if (sheet.category && sheet.category.trim().length > 0) {
      unique.add(sheet.category.trim());
    }
  }
  return Array.from(unique);
}
