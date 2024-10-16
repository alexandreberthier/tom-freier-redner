import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useCentralStore } from '@/stores/central';

type LanguageKey = 'de' | 'en';

interface RouteMeta extends Record<string, any> {
  title?: { [key in LanguageKey]: string };
  metaTags?: { [key in LanguageKey]: string };
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: {
          de: 'Freier Redner für Hochzeiten, Trauerfeiern und Kinderwillkommensfeste | Tom Salzlechner',
          en: 'Freelance Speaker for Weddings, Funerals, and Celebrations | Tom Salzlechner'
        },
        metaTags: {
          de: 'Freier Redner für Hochzeiten, Trauerfeiern, Kinderwillkommensfeste und Lebensfeiern. Individuelle Zeremonien für besondere Anlässe.',
          en: 'Freelance speaker for weddings, funerals, naming ceremonies, and life celebrations. Tailored ceremonies for your special moments.'
        }
      }
    },
    {
      path: '/uebermich',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
      meta: {
        title: {
          de: 'Über mich | Tom Salzlechner',
          en: 'About me | Tom Salzlechner'
        },
        metaTags: {
          de: 'Lerne mehr über Tom Salzlechner, freier Redner für Hochzeiten, Trauerfeiern und Kinderwillkommensfeste.',
          en: 'Learn more about Tom Salzlechner, freelance speaker for weddings, funerals, and naming ceremonies.'
        }
      }
    },
    {
      path: '/hochzeit',
      name: 'wedding',
      component: () => import('@/views/WeddingView.vue'),
      meta: {
        title: {
          de: 'Hochzeit | Tom Salzlechner - Freier Redner',
          en: 'Wedding | Tom Salzlechner - Freelance Speaker'
        },
        metaTags: {
          de: 'Individuelle Hochzeitszeremonien in Salzburg und Umgebung. Persönlich und einzigartig.',
          en: 'Personalized wedding ceremonies in Salzburg and surroundings. Unique and tailored.'
        }
      }
    },
    {
      path: '/willkommensfest',
      name: 'child-celebration',
      component: () => import('@/views/ChildCelebrationView.vue'),
      meta: {
        title: {
          de: 'Kinderwillkommensfest | Tom Salzlechner',
          en: 'Child Naming Ceremony | Tom Salzlechner'
        },
        metaTags: {
          de: 'Individuelle Willkommensfeiern für Kinder und Familien.',
          en: 'Tailored naming ceremonies for children and families.'
        }
      }
    },
    {
      path: '/lebens-und-trauerfeier',
      name: 'celebrations',
      component: () => import('@/views/FuneralView.vue'),
      meta: {
        title: {
          de: 'Lebensfeier und Trauerfeier | Tom Salzlechner',
          en: 'Funeral and Life Celebration | Tom Salzlechner'
        },
        metaTags: {
          de: 'Persönliche und würdevolle Abschiedszeremonien in Salzburg.',
          en: 'Personal and dignified farewell ceremonies in Salzburg.'
        }
      }
    },
    {
      path: '/impressum',
      name: 'imprint',
      component: () => import('@/views/ImprintView.vue'),
      meta: {
        title: {
          de: 'Impressum | Tom Salzlechner',
          en: 'Imprint | Tom Salzlechner'
        },
        metaTags: {
          de: 'Impressum der Webseite von Tom Salzlechner.',
          en: 'Imprint for the website of Tom Salzlechner.'
        }
      }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      const element = document.querySelector(to.hash);
      if (element) {
        return {
          el: element,
          behavior: 'smooth'
        };
      }
    } else {
      return { top: 0, left: 0, behavior: "smooth" }
    }
  },
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

// Verwende den Central Store für die Sprache
router.afterEach((to) => {
  const store = useCentralStore();
  const currentLang = store.currentLanguage as LanguageKey;

  // Setze den Titel basierend auf der Sprache
  const meta = to.meta as RouteMeta;
  if (meta.title && meta.title[currentLang]) {
    document.title = meta.title[currentLang];
  }

  // Setze die Meta-Beschreibung basierend auf der Sprache, falls `metaTags` definiert ist
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription && meta.metaTags && meta.metaTags[currentLang]) {
    metaDescription.setAttribute('content', meta.metaTags[currentLang]);
  }

  // Aktualisiere das 'lang' Attribut im <html> Tag
  document.documentElement.lang = currentLang;
});

export default router;
