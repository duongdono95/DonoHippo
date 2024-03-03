interface FeaturedItem {
  name: string;
  href: string;
  imageSrc: string;
}

interface ProductCategory {
  label: string;
  value: 'ui_kits' | 'icons';
  featured: FeaturedItem[];
}