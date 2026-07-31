// Literal Type + Union
type UserRole = "admin" | "user" | "guest";

let role: UserRole = "admin"; // ✅ Valid
// role = "superadmin"; // ❌ Error!

// Multiple Primitive Types
type ProductID = string | number;
let id: ProductID = 101; // ✅ Valid
id = "PROD-101";         // ✅ Valid


()