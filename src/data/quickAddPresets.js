export const QUICK_ADD_GROUPS = [
  {
    id: "food",
    label: "Food",
    icon: "🍔",
    presets: [
      { id: "coffee", label: "☕ Coffee", title: "Coffee", amount: 150, category: "Food" },
      { id: "breakfast", label: "🥐 Breakfast", title: "Breakfast", amount: 120, category: "Food" },
      { id: "lunch", label: "🍱 Lunch", title: "Lunch", amount: 300, category: "Food" },
      { id: "dinner", label: "🍽 Dinner", title: "Dinner", amount: 450, category: "Food" },
      { id: "snacks", label: "🍿 Snacks", title: "Snacks", amount: 80, category: "Food" },
      { id: "restaurant", label: "🍕 Restaurant", title: "Restaurant", amount: 650, category: "Food" }
    ]
  },
  {
    id: "transport",
    label: "Transport",
    icon: "🚗",
    presets: [
      { id: "cab", label: "🚕 Cab", title: "Cab ride", amount: 250, category: "Transport" },
      { id: "auto", label: "🛺 Auto", title: "Auto ride", amount: 80, category: "Transport" },
      { id: "metro", label: "🚇 Metro", title: "Metro ticket", amount: 50, category: "Transport" },
      { id: "fuel", label: "⛽ Fuel", title: "Fuel refill", amount: 2000, category: "Transport" },
      { id: "parking", label: "🅿️ Parking", title: "Parking fee", amount: 100, category: "Transport" },
      { id: "bus", label: "🚌 Bus", title: "Bus fare", amount: 35, category: "Transport" }
    ]
  },
  {
    id: "shopping",
    label: "Shopping",
    icon: "🛍",
    presets: [
      { id: "groceries", label: "🛒 Groceries", title: "Groceries", amount: 800, category: "Shopping" },
      { id: "clothes", label: "👕 Clothes", title: "Clothes", amount: 1500, category: "Shopping" },
      { id: "amazon", label: "📦 Amazon", title: "Amazon order", amount: 500, category: "Shopping" },
      { id: "pharmacy", label: "💊 Pharmacy", title: "Pharmacy", amount: 350, category: "Shopping" },
      { id: "electronics", label: "🎧 Gadgets", title: "Electronics", amount: 2500, category: "Shopping" }
    ]
  },
  {
    id: "entertainment",
    label: "Fun",
    icon: "🎮",
    presets: [
      { id: "movie", label: "🎬 Movie", title: "Movie tickets", amount: 300, category: "Entertainment" },
      { id: "netflix", label: "📺 Netflix", title: "Netflix", amount: 199, category: "Entertainment" },
      { id: "spotify", label: "🎵 Spotify", title: "Spotify", amount: 119, category: "Entertainment" },
      { id: "gaming", label: "🎮 Gaming", title: "Gaming", amount: 499, category: "Entertainment" },
      { id: "concert", label: "🎤 Concert", title: "Concert", amount: 1200, category: "Entertainment" }
    ]
  },
  {
    id: "bills",
    label: "Bills",
    icon: "💡",
    presets: [
      { id: "electricity", label: "⚡ Electricity", title: "Electricity bill", amount: 1200, category: "Bills" },
      { id: "internet", label: "🌐 Internet", title: "Internet bill", amount: 599, category: "Bills" },
      { id: "mobile", label: "📱 Mobile", title: "Mobile recharge", amount: 299, category: "Bills" },
      { id: "rent", label: "🏠 Rent", title: "Monthly rent", amount: 15000, category: "Bills" },
      { id: "water", label: "💧 Water", title: "Water bill", amount: 400, category: "Bills" }
    ]
  },
  {
    id: "health",
    label: "Health",
    icon: "❤️",
    presets: [
      { id: "gym", label: "🏋️ Gym", title: "Gym membership", amount: 1500, category: "Health" },
      { id: "medicine", label: "💉 Medicine", title: "Medicine", amount: 250, category: "Health" },
      { id: "doctor", label: "🩺 Doctor", title: "Doctor visit", amount: 800, category: "Health" },
      { id: "yoga", label: "🧘 Yoga", title: "Yoga class", amount: 500, category: "Health" }
    ]
  },
  {
    id: "education",
    label: "Study",
    icon: "📚",
    presets: [
      { id: "books", label: "📖 Books", title: "Books", amount: 450, category: "Education" },
      { id: "course", label: "🎓 Course", title: "Online course", amount: 999, category: "Education" },
      { id: "stationery", label: "✏️ Stationery", title: "Stationery", amount: 200, category: "Education" }
    ]
  },
  {
    id: "other",
    label: "Other",
    icon: "📦",
    presets: [
      { id: "gift", label: "🎁 Gift", title: "Gift", amount: 500, category: "Other" },
      { id: "donation", label: "🤝 Donation", title: "Donation", amount: 300, category: "Other" },
      { id: "salary", label: "💰 Salary", title: "Salary credited", amount: 50000, category: "Salary" },
      { id: "freelance", label: "💼 Freelance", title: "Freelance income", amount: 8000, category: "Salary" }
    ]
  }
];

export const ALL_QUICK_PRESETS = QUICK_ADD_GROUPS.flatMap((g) => g.presets);

export const QUICK_ADD_TABS = [
  { id: "all", label: "All", icon: "⚡" },
  { id: "recent", label: "Recent", icon: "🕐" },
  ...QUICK_ADD_GROUPS.map((g) => ({ id: g.id, label: g.label, icon: g.icon }))
];
