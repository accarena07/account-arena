import type { SellerListing, SellerListingTab } from "../types";

export const sellerListings: SellerListing[] = [
  {
    id: 1,
    title: "Mythic Glory | 250 Skins | All Heroes",
    game: "Mobile Legends",
    level: "Level 80",
    price: "Rp 1.500.000",
    status: "Active",
    statusKind: "active",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBRD4wuYwoRj7MqlKl4a5Afz6yv9QEKmFQFdy5qED5W21gUX1wlbedM6txU6wpuhKgKBZeUEE2CEpVZOVvinebCMQQf_4a4ibCBCOev0tLTla95lRVo4niUZ-i35VS7uxnDKv9KuoPwrVsTQEch-nl7Eh2iMvc9YlYEE-7ZmXXrCUJedrEXHpyAFJ-ajS_H3jJ5Vjh9g4xO7S9CgcQI55TFMQXl1LtvO5645ZPxYxcAXH82h6eGkqDhz_AX9LudYIvo3mjdgaVVoA",
  },
  {
    id: 2,
    title: "Immortal 3 | Prime Vandal | Reaver Knife",
    game: "VALORANT",
    level: "Level 142",
    price: "Rp 2.100.000",
    status: "Sold",
    statusKind: "sold",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCf4Lolu7AaB5TUEdIMRZ4h_DQI6WzNEQrQxsZEBCk1JzY7DWzfzJKETqdXyhkebHh1pqdHT9Vpe6bodaSRk0euMGEbZMI6xp41f9vhHtszvWKIGf8kgKhpt07cBRewLawS07jV98_xjPbM3Rj0JIqV6fKXpwUdMG7JF1EztlnrChl_Fhs-ee2OZHRshfGHP8ukzZvY-L8VgPo2hIadBsrzw-ZZQlTqeHMUj4s3AMvgYcIY5kdpN6S9lQd7hMdqEvSTcaeoRtT8Tw",
  },
  {
    id: 3,
    title: "AR 60 | C6 Raiden | 15x 5-Star Weapons",
    game: "Genshin Impact",
    level: "Asia Server",
    price: "Rp 3.800.000",
    status: "Draft",
    statusKind: "draft",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDXSU_g8hdwk_O6PMbzrBwRxJ45D-AjTy4iY1Lve93ORqADtDVcW3zKi1uKXOvL0kO5pZY6PSazIsOP-1d0T-baxWb1aqg0BWhqk-gWnBaG5MX6jkHlrQATaAzvPilqj-g51WFQqowKaEG6mFAre1dVtgjtCT5g4_jVGnbdFuwMt_0lfDRYrll6jtPzNvNfKV_iynDxoNRApRWZyV4jL_xn9N7NYWBGDZwp7OHmxXXX6EaiW-xOjrz0kmjEqi1qn80C8hddqoQF_Q",
  },
];

export const sellerListingTabs: SellerListingTab[] = [
  { label: "All Listings", count: 24, active: true },
  { label: "Active", count: 12 },
  { label: "Sold Out", count: 8 },
  { label: "Drafts", count: 4 },
];
