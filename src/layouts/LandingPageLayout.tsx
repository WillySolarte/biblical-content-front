import { Outlet } from "react-router-dom";

export default function LandingPageLayout() {
  return (
    <div className="min-h-screen bg-#FAF8F5">
      <Outlet />
    </div>
  );
}
