export default function Spinner({ size = "h-5 w-5" }) {
  return <span className={`inline-block ${size} animate-spin rounded-full border-2 border-current border-t-transparent`} />;
}
