import { cdnImage, cdnSrcSet } from "../lib/image.ts";

type ImgProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
  /** How wide the image shows on screen, e.g. "(min-width: 768px) 33vw, 100vw". */
  sizes?: string;
};

// Responsive, CDN-resized image with explicit dimensions (no layout shift) and lazy loading by default.
export default function Img({ src, alt, className, priority = false, width = 1000, height = 700, sizes }: ImgProps) {
  const srcSet = cdnSrcSet(src, width);
  return (
    <img
      src={cdnImage(src, width)}
      srcSet={srcSet}
      sizes={srcSet ? (sizes ?? `(min-width: ${width}px) ${width}px, 100vw`) : undefined}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={className}
    />
  );
}
