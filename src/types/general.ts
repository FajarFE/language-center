export interface Navbar {
  title?: string;
  image: string;
  links: {
    href: string;
    label: string;
  }[];
}

export interface Footer {
  image: string;
  socialMedia: {
    icon: React.ComponentType;
    href: string;
  }[];
  numberHp: number;
  section: {
    title: string;
    link: {
      href: string;
      label: string;
    }[];
  }[];
}
