declare module "react-photo-album" {
  import * as React from "react";

  export type Photo = {
    src: string;
    width: number;
    height: number;
    alt?: string;
    [key: string]: unknown;
  };

  export type RenderPhotoProps = {
    photo: Photo;
    layout?: unknown;
    wrapperStyle?: React.CSSProperties;
    imageProps?: React.ImgHTMLAttributes<HTMLImageElement> &
      Record<string, unknown>;
  };

  export interface PhotoAlbumProps {
    photos: Photo[];
    layout?: string;
    renderPhoto?: (props: RenderPhotoProps) => React.ReactElement | null;
    targetRowHeight?: number;
    [key: string]: unknown;
  }

  const PhotoAlbum: React.FC<PhotoAlbumProps>;
  export default PhotoAlbum;
}
