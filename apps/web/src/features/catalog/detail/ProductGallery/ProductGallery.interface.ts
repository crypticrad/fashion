export interface GalleryImage {
  id: string;
  /** Product photo. Falls back to a neutral placeholder tile when absent. */
  image?: string;
}

export interface ProductGalleryProps {
  images: GalleryImage[];
  /** Accessible label / alt for the active image. */
  name: string;
}
