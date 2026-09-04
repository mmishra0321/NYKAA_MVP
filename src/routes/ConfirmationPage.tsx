import { Navigate } from "react-router-dom";
import { ConfirmationPanel } from "../components/confirm/ConfirmationPanel";
import { useConfidenceToCart } from "../context";

export function ConfirmationPage() {
  const { state } = useConfidenceToCart();
  const { cart, products, justConfirmed } = state;

  if (!justConfirmed || cart.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  return (
    <section className="px-4 py-6">
      <ConfirmationPanel lines={cart} products={products} />
    </section>
  );
}
