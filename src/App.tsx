import { Routes, Route } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { HomePage } from "./routes/HomePage";
import { WishlistPage } from "./routes/WishlistPage";
import { NudgesPage } from "./routes/NudgesPage";
import { CartPage } from "./routes/CartPage";
import { ConfirmationPage } from "./routes/ConfirmationPage";
import { CategoriesPage } from "./routes/CategoriesPage";

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/nudges" element={<NudgesPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Route>
    </Routes>
  );
}
