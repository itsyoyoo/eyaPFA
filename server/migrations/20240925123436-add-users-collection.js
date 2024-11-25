module.exports = {
  async up(db, client) {
    await db.createCollection('users'); // Create the 'users' collection

    // Create the indexes based on your schema
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    await db.collection('users').createIndex({ matricule: 1 }, { unique: true });

    // Optionally, you can insert initial user data if needed
    await db.collection('users').insertMany([
      { 
        email: "john@example.com", 
        password: "hashed_password_here", 
        username: "john_doe", 
        lastname: "Doe", 
        grade: "A", 
        matricule: "123456", 
        placeOfWork: "Company A" 
      },
      { 
        email: "jane@example.com", 
        password: "hashed_password_here",
        username: "jane_doe", 
        lastname: "Doe", 
        grade: "B", 
        matricule: "654321", 
        placeOfWork: "Company B" 
      }
    ]);
  },

  async down(db, client) {
    await db.collection('users').drop(); 
  },
};
