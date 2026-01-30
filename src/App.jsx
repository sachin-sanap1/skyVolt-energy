
// import React, { Suspense } from "react";
// import { Routes, Route } from "react-router-dom";

// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

// /* ================= CONTEXT ================= */
// import { CartProvider } from "./context/CartContext";

// /* ================= LAZY PAGES ================= */
// const Home = React.lazy(() => import("./pages/Home"));
// const About = React.lazy(() => import("./pages/About"));
// const Contact = React.lazy(() => import("./pages/Contact"));
// const Login = React.lazy(() => import("./pages/Login"));
// const Signup = React.lazy(() => import("./pages/Signup"));
// const AdminDashboard = React.lazy(() => import("./pages/AdminDashboard"));
// const ClientDashboard = React.lazy(() => import("./pages/ClientDashboard"));
// const PageNotFound = React.lazy(() => import("./pages/PageNotFound"));
// const EditProfile = React.lazy(() => import("./pages/EditProfile"));
// const ProtectedRoute = React.lazy(() => import("./auth/ProtectedRoute"));

// /* ================= E-COMMERCE PAGES ================= */
// const Products = React.lazy(() => import("./pages/Products"));
// const Cart = React.lazy(() => import("./pages/Cart"));
// const Checkout = React.lazy(() => import("./pages/Checkout"));

// /* ================= AUTH PAGES ================= */
// import ForgotPassword from "./pages/ForgotPassword";
// import VerifyOtp from "./pages/VerifyOtp";
// import ResetPassword from "./pages/ResetPassword";
// import AccessDenied from "./pages/AccessDenied";
// import PricingPlans from "./Client/PricingPlans";
// import ClientRoute from "./ClientRoute";
// import WindEnergyPage from "./pages/WindEnergyPage";
// function App() {
//   return (
//     <Suspense fallback={<div style={{ padding: 30 }}>Loading...</div>}>

//       <CartProvider>
//         <Navbar />
//         <Routes>
//           {/* ================= PUBLIC ROUTES ================= */}
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/verify-otp" element={<VerifyOtp />} />
//           <Route path="/reset-password" element={<ResetPassword />} />
//           <Route path="/pricing" element={<PricingPlans />} />
//           <Route path="/wind" element={<WindEnergyPage />} />

//           {/* ================= E-COMMERCE ROUTES ================= */}
//           <Route path="/products" element={<Products />} />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/checkout" element={<Checkout />} />

//           {/* ================= ADMIN ONLY ================= */}
//           <Route
//             path="/admin-dashboard"
//             element={
//               <ProtectedRoute allow={["admin"]}>
//                 <AdminDashboard />
//               </ProtectedRoute>
//             }
//           />

//           {/* ================= CLIENT ONLY ================= */}
//           <Route
//             path="/client-dashboard"
//             element={
//               <ClientRoute>
//                 <ClientDashboard />
//               </ClientRoute>
//             }
//           />

//           {/* ================= ANY LOGGED-IN USER ================= */}
//           <Route
//             path="/edit-profile"
//             element={
//               <ProtectedRoute>
//                 <EditProfile />
//               </ProtectedRoute>
//             }
//           />

//           <Route path="/access-denied" element={<AccessDenied />} />

//           {/* ================= 404 ================= */}
//           <Route path="*" element={<PageNotFound />} />
//         </Routes>

//         <Footer />
//       </CartProvider>
//     </Suspense>
//   );
// }

// export default App;


import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

/* ================= CONTEXT ================= */
import { CartProvider } from "./context/CartContext";

/* ================= LAZY PAGES ================= */
const Home = React.lazy(() => import("./pages/Home"));
const About = React.lazy(() => import("./pages/About"));
const Contact = React.lazy(() => import("./pages/Contact"));
const Login = React.lazy(() => import("./pages/Login"));
const Signup = React.lazy(() => import("./pages/Signup"));
const AdminDashboard = React.lazy(() => import("./pages/AdminDashboard"));
const ClientDashboard = React.lazy(() => import("./pages/ClientDashboard"));
const PageNotFound = React.lazy(() => import("./pages/PageNotFound"));
const EditProfile = React.lazy(() => import("./pages/EditProfile"));
const ProtectedRoute = React.lazy(() => import("./auth/ProtectedRoute"));

/* ================= E-COMMERCE PAGES ================= */
const Products = React.lazy(() => import("./pages/Products"));
const ProductDetails = React.lazy(() => import("./pages/ProductDetails"));
const Cart = React.lazy(() => import("./pages/Cart"));
const Checkout = React.lazy(() => import("./pages/Checkout"));
const Payment = React.lazy(() => import("./pages/Payment"));
const OrderSuccess = React.lazy(() => import("./pages/OrderSuccess"));
const Orders = React.lazy(() => import("./pages/Orders"));
const OrderTracking = React.lazy(() => import("./pages/OrderTracking"));
const ReturnRequest = React.lazy(() => import("./pages/ReturnRequest"));

/* ================= AUTH PAGES ================= */
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOtp from "./pages/VerifyOtp";
import ResetPassword from "./pages/ResetPassword";
import AccessDenied from "./pages/AccessDenied";

/* ================= CLIENT ================= */
import PricingPlans from "./Client/PricingPlans";
import ClientRoute from "./ClientRoute";

/* ================= DOMAIN PAGES ================= */
import WindEnergyPage from "./pages/WindEnergyPage";

function App() {
  return (
    <Suspense fallback={<div style={{ padding: 30 }}>Loading...</div>}>

      <CartProvider>
        <Navbar />

        <Routes>
          {/* ================= PUBLIC ROUTES ================= */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/pricing" element={<PricingPlans />} />
          <Route path="/wind" element={<WindEnergyPage />} />

          {/* ================= E-COMMERCE ROUTES ================= */}
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />

          {/* Checkout → Payment → Success */}
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order-success"
            element={
              <ProtectedRoute>
                <OrderSuccess />
              </ProtectedRoute>
            }
          />

          {/* Orders & Returns */}
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order-tracking/:orderId"
            element={
              <ProtectedRoute>
                <OrderTracking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/return/:orderId"
            element={
              <ProtectedRoute>
                <ReturnRequest />
              </ProtectedRoute>
            }
          />

          {/* ================= ADMIN ONLY ================= */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute allow={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* ================= CLIENT ONLY ================= */}
          <Route
            path="/client-dashboard"
            element={
              <ClientRoute>
                <ClientDashboard />
              </ClientRoute>
            }
          />

          {/* ================= ANY LOGGED-IN USER ================= */}
          <Route
            path="/edit-profile"
            element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            }
          />

          <Route path="/access-denied" element={<AccessDenied />} />

          {/* ================= 404 ================= */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>

        <Footer />
      </CartProvider>
    </Suspense>
  );
}

export default App;
