const userPermissions = "63"; // Assume this value is retrieved from somewhere
const permisoInt = Number("63"); // Convert Permission B to integer
const PERMISSION_B = 63; // Binary representation for Permission B
// Check if the user has Permission B
const hasPermissionB = (permisoInt & PERMISSION_B) === PERMISSION_B;

if (hasPermissionB) {
    console.log("User has Permission B");
} else {
    console.log("User does NOT have Permission B");
}