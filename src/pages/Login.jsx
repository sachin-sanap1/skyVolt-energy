// import { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from "../auth/AuthContext";
// import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
// import { db } from "../../firebase";

// const ADMIN_EMAIL = "admin@skyvolt.com";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const { login, user, loading } = useAuth();
//   const navigate = useNavigate();

//   /* 🔐 STEP 1: LOGIN ONLY */
//   const handleLogin = async () => {
//     setError("");
//     const success = await login(email, password);
//     if (!success) {
//       setError("Invalid email or password");
//     }
//   };

//   /* 🚀 STEP 2: REDIRECT AFTER AUTH */
//   useEffect(() => {
//     if (loading || !user) return;

//     const routeUser = async () => {
//       // 🛡️ ADMIN ACCESS
//       if (user.email.toLowerCase() === ADMIN_EMAIL) {
//         navigate("/admin-dashboard", { replace: true });
//         return;
//       }

//       // 👤 CLIENT ACCESS (Firestore email validation)
//       const userRef = doc(db, "users", user.uid);
//       const snap = await getDoc(userRef);

//       if (!snap.exists()) {
//         setError("You are not authorized to access the client dashboard");
//         return;
//       }

//       // Optional: update last login
//       await updateDoc(userRef, {
//         lastLogin: serverTimestamp(),
//       });

//       navigate("/client-dashboard", { replace: true });
//     };

//     routeUser();
//   }, [user, loading, navigate]);

//   /* ================= UI ================= */
//   return (
//     <div className="auth-bg min-vh-100 d-flex justify-content-center align-items-center">
//       <div className="auth-card p-4 shadow-lg" style={{ width: 380 }}>
//         <h3 className="text-center mb-4">Welcome Back</h3>

//         <input
//           className="form-control mb-3"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           className="form-control mb-2"
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button
//           className="btn btn-primary w-100"
//           onClick={handleLogin}
//           disabled={loading}
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>

//         {error && (
//           <p className="text-danger text-center mt-3">{error}</p>
//         )}

//         <p className="text-center mt-4">
//           New user? <Link to="/signup">Signup</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;


import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const ADMIN_EMAIL = "admin@skyvolt.com";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, user, loading } = useAuth();
  const navigate = useNavigate();

  /* ================= LOGIN ================= */
  const handleLogin = async () => {
    setError("");
    const success = await login(email, password);
    if (!success) {
      setError("Invalid email or password");
    }
  };

  /* ================= ROLE ROUTING ================= */
  useEffect(() => {
    if (loading || !user) return;

    const routeUser = async () => {
      // 🔐 ADMIN
      if (user.email.toLowerCase() === ADMIN_EMAIL) {
        navigate("/admin-dashboard", { replace: true });
        return;
      }

      // 👤 CHECK CLIENT IN FIRESTORE
      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);

      if (snap.exists()) {
        // ✅ CLIENT USER
        await updateDoc(userRef, {
          lastLogin: serverTimestamp(),
        });

        navigate("/client-dashboard", { replace: true });
      } else {
        // 🛒 NORMAL USER / BUYER
        navigate("/cart", { replace: true });
      }
    };

    routeUser();
  }, [user, loading, navigate]);

  /* ================= UI ================= */
  return (
    <div className="auth-bg min-vh-100 d-flex justify-content-center align-items-center">
      <div className="auth-card p-4 shadow-lg" style={{ width: 380 }}>
        <h3 className="text-center mb-4">Welcome Back</h3>

        <input
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="form-control mb-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="btn btn-primary w-100"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && (
          <p className="text-danger text-center mt-3">{error}</p>
        )}

        <p className="text-center mt-4">
          New user? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
