type ImgProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
};

// Image with explicit dimensions (prevents layout shift) and lazy loading by default.
export default function Img({ src, alt, className, priority = false, width = 1000, height = 700 }: ImgProps) {
  return (
    <img
      src={src}
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
