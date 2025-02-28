interface Item {
  name: string;
  description?: string;
  ingredients: string[];
  image?: File;
}

interface Section {
  name: string;
  items: Item[];
}

interface Menu {
  name: string;
  description?: string;
  location?: string;
  contact?: string;
  sections: Section[];
}
