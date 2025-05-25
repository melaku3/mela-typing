export type Language = "en" | "am"

export const i18n = {
  en: {
    // Common Actions
    signIn: "Sign In",
    signOut: "Sign Out",
    save: "Save",
    cancel: "Cancel",
    confirm: "Confirm",
    delete: "Delete",
    edit: "Edit",
    close: "Close",
    loading: "Loading...",
    continue: "Continue",
    back: "Back",
    next: "Next",
    previous: "Previous",

    // Navigation
    home: "Home",
    dashboard: "Dashboard",
    explore: "Explore",
    typing: "Typing",
    settings: "Settings",
    profile: "Profile",
    lessons: "Lessons",
    progress: "Progress",

    // Authentication
    welcomeBack: "Welcome Back",
    signInToContinue: "Sign in to continue your typing journey",
    continueWithGoogle: "Continue with Google",
    authRequired: "Authentication Required",
    pleaseSignIn: "Please sign in to access this feature",
    secureSignIn: "Secure sign-in powered by Google OAuth",

    // Dashboard & Progress
    yourProgress: "Your Progress",
    currentLevel: "Current Level",
    totalLessons: "Total Lessons",
    averageWpm: "Average WPM",
    accuracy: "Accuracy",
    timeSpent: "Time Spent",
    recentActivity: "Recent Activity",
    noActivityYet: "No activity yet",
    startFirstLesson: "Start your first lesson to see progress here",
    lessonCompleted: "Lesson Completed",

    // Typing Interface
    startTyping: "Start Typing",
    currentWpm: "Current WPM",
    mistakesCount: "Mistakes",
    wordsTyped: "Words Typed",
    timeElapsed: "Time Elapsed",
    lessonComplete: "Lesson Complete!",
    wellDone: "Well Done!",
    tryAgain: "Try Again",
    nextLesson: "Next Lesson",
    finalSpeed: "Final Speed",

    // Lessons & Content
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
    difficulty: "Difficulty",
    duration: "Duration",
    words: "words",
    minutes: "minutes",
    searchLessons: "Search lessons...",
    noLessonsFound: "No lessons found",
    filterByDifficulty: "Filter by difficulty",
    allLevels: "All Levels",
    exploreLessons: "Explore Lessons",

    // Settings
    languageSettings: "Language Settings",
    chooseLanguage: "Choose your preferred language",
    audioSettings: "Audio Settings",
    enableBackgroundMusic: "Enable background music",
    enableSoundEffects: "Enable sound effects",
    themeSettings: "Theme Settings",
    appearance: "Appearance",
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
    systemMode: "System Mode",
    settingsSaved: "Settings saved successfully",

    // Ethiopian Content
    ethiopianHistory: "Ethiopian History",
    ancientCivilizations: "Ancient Civilizations",
    modernEthiopia: "Modern Ethiopia",
    culturalHeritage: "Cultural Heritage",
    famousPersonalities: "Famous Personalities",
    kingdomOfAksum: "The Kingdom of Aksum",
    battleOfAdwa: "The Battle of Adwa",
    emperorHaileSelassie: "Emperor Haile Selassie",
    lucyDinkinesh: "Lucy - Dinkinesh",

    // Errors & Messages
    somethingWentWrong: "Something went wrong",
    tryAgainLater: "Please try again later",
    connectionError: "Connection error",
    notFound: "Page not found",
    unauthorized: "Unauthorized access",
    pageNotFound: "The page you're looking for doesn't exist",

    // Units & Time
    wpm: "WPM",
    percent: "%",
    seconds: "seconds",
    hours: "hours",
    today: "Today",
    yesterday: "Yesterday",
    thisWeek: "This Week",
    thisMonth: "This Month",
    ago: "ago",

    // Menu & Interface
    menu: "Menu",
    theme: "Theme",
    language: "Language",
    backToHome: "Back to Home",
    goHome: "Go Home",
  },
  am: {
    // Common Actions
    signIn: "ግባ",
    signOut: "ውጣ",
    save: "አስቀምጥ",
    cancel: "ሰርዝ",
    confirm: "አረጋግጥ",
    delete: "ሰርዝ",
    edit: "አርም",
    close: "ዝጋ",
    loading: "በመጫን ላይ...",
    continue: "ቀጥል",
    back: "ተመለስ",
    next: "ቀጣይ",
    previous: "ቀዳሚ",

    // Navigation
    home: "ቤት",
    dashboard: "ዳሽቦርድ",
    explore: "ዳስስ",
    typing: "መተየብ",
    settings: "ቅንብሮች",
    profile: "መገለጫ",
    lessons: "ትምህርቶች",
    progress: "እድገት",

    // Authentication
    welcomeBack: "እንኳን ደህና መጡ",
    signInToContinue: "የመተየብ ጉዞዎን ለመቀጠል ይግቡ",
    continueWithGoogle: "በGoogle ቀጥል",
    authRequired: "ማረጋገጫ ያስፈልጋል",
    pleaseSignIn: "ይህንን ባህሪ ለመጠቀም እባክዎ ይግቡ",
    secureSignIn: "በGoogle OAuth የተጠበቀ መግቢያ",

    // Dashboard & Progress
    yourProgress: "የእርስዎ እድገት",
    currentLevel: "የአሁኑ ደረጃ",
    totalLessons: "ጠቅላላ ትምህርቶች",
    averageWpm: "አማካይ ቃላት በደቂቃ",
    accuracy: "ትክክለኛነት",
    timeSpent: "የተሰራበት ጊዜ",
    recentActivity: "የቅርብ ጊዜ እንቅስቃሴ",
    noActivityYet: "ገና ምንም እንቅስቃሴ የለም",
    startFirstLesson: "እድገትዎን እዚህ ለማየት የመጀመሪያ ትምህርትዎን ይጀምሩ",
    lessonCompleted: "ትምህርት ተጠናቅቋል",

    // Typing Interface
    startTyping: "መተየብ ጀምር",
    currentWpm: "የአሁኑ ቃላት በደቂቃ",
    mistakesCount: "ስህተቶች",
    wordsTyped: "የተተየቡ ቃላት",
    timeElapsed: "የተሰራበት ጊዜ",
    lessonComplete: "ትምህርት ተጠናቅቋል!",
    wellDone: "በጣም ጥሩ!",
    tryAgain: "እንደገና ሞክር",
    nextLesson: "ቀጣይ ትምህርት",
    finalSpeed: "የመጨረሻ ፍጥነት",

    // Lessons & Content
    beginner: "ጀማሪ",
    intermediate: "መካከለኛ",
    advanced: "የላቀ",
    difficulty: "ከባድነት",
    duration: "ቆይታ",
    words: "ቃላት",
    minutes: "ደቂቃዎች",
    searchLessons: "ትምህርቶችን ፈልግ...",
    noLessonsFound: "ምንም ትምህርቶች አልተገኙም",
    filterByDifficulty: "በከባድነት ደረጃ አጣራ",
    allLevels: "ሁሉም ደረጃዎች",
    exploreLessons: "ትምህርቶችን ዳስስ",

    // Settings
    languageSettings: "የቋንቋ ቅንብሮች",
    chooseLanguage: "የሚመርጡትን ቋንቋ ይምረጡ",
    audioSettings: "የድምጽ ቅንብሮች",
    enableBackgroundMusic: "የጀርባ ሙዚቃን አንቃ",
    enableSoundEffects: "የድምጽ ተጽእኖዎችን አንቃ",
    themeSettings: "የገጽታ ቅንብሮች",
    appearance: "መልክ",
    lightMode: "ብሩህ ሁነታ",
    darkMode: "ጨለማ ሁነታ",
    systemMode: "የስርዓት ሁነታ",
    settingsSaved: "ቅንብሮች በተሳካ ሁኔታ ተቀምጠዋል",

    // Ethiopian Content
    ethiopianHistory: "የኢትዮጵያ ታሪክ",
    ancientCivilizations: "ጥንታዊ ሥልጣኔዎች",
    modernEthiopia: "ዘመናዊ ኢትዮጵያ",
    culturalHeritage: "የባህል ቅርስ",
    famousPersonalities: "ታዋቂ ሰዎች",
    kingdomOfAksum: "የአክሱም መንግሥት",
    battleOfAdwa: "የዓድዋ ጦርነት",
    emperorHaileSelassie: "ንጉሠ ነገሥት ኃይለ ሥላሴ",
    lucyDinkinesh: "ሉሲ - ድንቅነሽ",

    // Errors & Messages
    somethingWentWrong: "የሆነ ችግር ተፈጥሯል",
    tryAgainLater: "እባክዎ በኋላ እንደገና ይሞክሩ",
    connectionError: "የግንኙነት ስህተት",
    notFound: "ገጽ አልተገኘም",
    unauthorized: "ያልተፈቀደ መዳረሻ",
    pageNotFound: "የሚፈልጉት ገጽ አልተገኘም",

    // Units & Time
    wpm: "ቃላት በደቂቃ",
    percent: "%",
    seconds: "ሰከንዶች",
    hours: "ሰዓቶች",
    today: "ዛሬ",
    yesterday: "ትናንት",
    thisWeek: "በዚህ ሳምንት",
    thisMonth: "በዚህ ወር",
    ago: "በፊት",

    // Menu & Interface
    menu: "ዝርዝር",
    theme: "ገጽታ",
    language: "ቋንቋ",
    backToHome: "ወደ ቤት ተመለስ",
    goHome: "ወደ ቤት ሂድ",
  },
} as const

export type TranslationKeys = Record<keyof typeof i18n.en, string>

export function getTranslations(language: Language): TranslationKeys {
  return i18n[language]
}
  