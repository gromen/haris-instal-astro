/**
 * Site configuration - single source of truth for contact data
 */

export const siteConfig = {
  name: "Haris Instal",

  contact: {
    phone: {
      display: "+48 791 334 999",
      href: "tel:+48791334999",
    },
    email: {
      primary: "haris.instal@onet.pl",
      secondary: "kontakt@haris-instal.pl",
      noreply: "noreply@haris-instal.pl",
    },
  },

  address: {
    street: "ul. Szkolna 17",
    city: "Ostrów Mazowiecka",
    full: "ul. Szkolna 17, Ostrów Mazowiecka",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2426.8!2d21.8954!3d52.8031!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sul.%20Szkolna%2017%2C%20Ostr%C3%B3w%20Mazowiecka!5e0!3m2!1spl!2spl!4v1234567890",
  },

  hours: {
    weekdays: "8:00-18:00",
    saturday: "9:00-14:00",
    sunday: "Zamknięte",
    emergency: "24/7",
  },

  social: {
    facebook: "https://www.facebook.com/profile.php?id=61556174463531", // Update with real URL
  },
} as const;

export type SiteConfig = typeof siteConfig;
