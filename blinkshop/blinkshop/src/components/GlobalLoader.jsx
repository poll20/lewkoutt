import { useLoading } from "./LoadingContext";

const GlobalLoader = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        width: "100vw",
        height: "100vh",
        background: "transparent",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* CSS spinner */}
      <div
        style={{
          width: "40px",
          height: "40px",
          border: "4px solid #ccc",
          borderTopColor: "#000",
          borderRadius: "50%",
          animation: "spin 0.7s linear infinite",
        }}
      ></div>

      {/* Inline @keyframes */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default GlobalLoader;
