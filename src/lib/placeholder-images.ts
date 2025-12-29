import data from './placeholder-images.json';

export type Ratio = "portrait" | "landscape" | "square";

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  ratio?: Ratio;
};

export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages;
