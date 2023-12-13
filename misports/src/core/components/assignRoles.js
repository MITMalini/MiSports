// assignRoles.js
const admin = require('firebase-admin');
const serviceAccount = require('./path-to-your-firebase-adminsdk-json-file.json'); // Replace with your service account JSON

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const assignUserRole = async (uid, role) => {
  try {
    await admin.auth().setCustomUserClaims(uid, { role });
    console.log(`Role "${role}" assigned to user with UID: ${uid}`);
  } catch (error) {
    console.error('Error assigning role:', error);
  }
};

// Example usage
assignUserRole('user_uid_here', 'hr'); // Replace with the actual UID and role

// Run the script using: node assignRoles.js
