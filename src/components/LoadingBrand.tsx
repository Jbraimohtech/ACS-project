import "./LoadingBrand.css";

interface LoadingBrandProps {
  inline?: boolean;
  label?: string;
}

const LoadingBrand = ({ inline = false, label = "Loading" }: LoadingBrandProps) => {
  return (
    <div
      className={`brand-loading ${inline ? "brand-loading-inline" : ""}`.trim()}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className="brand-loading-ring">
        <div className="novaLogoIcon brand-loading-logo" />
      </div>
    </div>
  );
};

export default LoadingBrand;
