// Navigation Configuration
// Centralized navigation structure to avoid manual updates in multiple places

export const navigation = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'fa-chart-line',
    badge: { text: '4', color: 'primary' },
    submenu: [
      { id: 'dashboard-ecommerce', label: 'E-Commerce', href: '/' },
      { id: 'dashboard-finance', label: 'Finance', href: '/pages/dashboards/finance.html' },
      { id: 'dashboard-sales', label: 'Sales', href: '/pages/dashboards/sales.html' },
      { id: 'dashboard-influencer', label: 'Influencer', href: '/pages/dashboards/influencer.html' }
    ]
  },
  {
    id: 'ui-elements',
    label: 'UI Elements',
    icon: 'fa-palette',
    submenu: [
      { id: 'cards', label: 'Cards', href: '/pages/ui-elements/cards.html' },
      { id: 'general', label: 'General', href: '/pages/ui-elements/general.html' },
      { id: 'typography', label: 'Typography', href: '/pages/ui-elements/typography.html' }
    ]
  },
  {
    id: 'charts',
    label: 'Charts',
    icon: 'fa-chart-pie',
    href: '/pages/charts/index.html'
  },
  {
    id: 'forms',
    label: 'Forms',
    icon: 'fa-wpforms',
    iconPrefix: 'fab',
    badge: { text: '6', color: 'success' },
    submenu: [
      { id: 'form-elements', label: 'Form Elements', href: '/pages/form-elements.html' },
      { id: 'form-validation', label: 'Form Validation', href: '/pages/form-validation.html' },
      { id: 'multiselect', label: 'Multiselect', href: '/pages/multiselect.html' }
    ]
  },
  {
    id: 'tables',
    label: 'Tables',
    icon: 'fa-table',
    submenu: [
      { id: 'general-tables', label: 'General Tables', href: '/pages/tables/general-tables.html' },
      { id: 'data-tables', label: 'Data Tables', href: '/pages/tables/data-tables.html' }
    ]
  },
  {
    divider: true,
    label: 'Features'
  },
  {
    id: 'ecommerce',
    label: 'E-Commerce',
    icon: 'fa-shopping-cart',
    submenu: [
      { id: 'products', label: 'Products', href: '/pages/ecommerce/products.html' },
      { id: 'product-single', label: 'Product Details', href: '/pages/ecommerce/product-single.html' },
      { id: 'checkout', label: 'Checkout', href: '/pages/ecommerce/checkout.html' }
    ]
  },
  {
    id: 'influencer',
    label: 'Influencer',
    icon: 'fa-users',
    submenu: [
      { id: 'influencer-finder', label: 'Influencer Finder', href: '/pages/apps/influencer-finder.html' },
      { id: 'influencer-profile', label: 'Influencer Profile', href: '/pages/apps/influencer-profile.html' }
    ]
  },
  {
    id: 'pages',
    label: 'Pages',
    icon: 'fa-file',
    submenu: [
      { id: 'blank-page', label: 'Blank Page', href: '/pages/misc/blank-page.html' },
      { id: 'login', label: 'Login', href: '/pages/auth/login.html' },
      { id: 'signup', label: 'Sign Up', href: '/pages/auth/signup.html' },
      { id: 'forgot-password', label: 'Forgot Password', href: '/pages/auth/forgot-password.html' },
      { id: '404', label: '404 page', href: '/pages/misc/404.html' }
    ]
  },
  {
    id: 'apps',
    label: 'Apps',
    icon: 'fa-rocket',
    badge: { text: 'New', color: 'danger' },
    submenu: [
      { id: 'calendar', label: 'Calendar', href: '/pages/calendar.html' },
      { id: 'chat', label: 'Chat', href: '/pages/chat.html' }
    ]
  },
  {
    id: 'email',
    label: 'Email',
    icon: 'fa-envelope',
    submenu: [
      { id: 'inbox', label: 'Inbox', href: '/pages/email/inbox.html' },
      { id: 'compose', label: 'Compose', href: '/pages/email/compose.html' },
      { id: 'details', label: 'Email Details', href: '/pages/email/details.html' }
    ]
  }
];

// Helper function to find active menu
export function findActiveMenu(currentPath) {
  for (const item of navigation) {
    if (item.href === currentPath) {
      return { menu: item.id, page: null };
    }
    if (item.submenu) {
      for (const subitem of item.submenu) {
        if (subitem.href === currentPath) {
          return { menu: item.id, page: subitem.id };
        }
      }
    }
  }
  return { menu: null, page: null };
}