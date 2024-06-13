export interface MovieTypeWithExtras {
    title: string;
    year: number;
    cast?: (string)[] | null;
    genres?: (string)[] | null;
    href: string;
    extract: string;
    thumbnail: string;
    thumbnail_width: number;
    thumbnail_height: number;
    id: number;
    rating?: number;
    isFavorite?: boolean
  }
  