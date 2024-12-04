const functions = require('firebase-functions');
const admin = require('firebase-admin');
const fetch = require('node-fetch');

admin.initializeApp();

exports.processAIRequest = functions.database.ref('/requests/{requestId}')
  .onCreate(async (snapshot, context) => {
    const requestData = snapshot.val();
    const { userId, requestData: data } = requestData;

    try {
      // Make API call to AI model
      const response = await fetch('https://api.example.com/ai', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.AI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();

      // Update Realtime Database with response
      await admin.database().ref(`/responses/${context.params.requestId}`).set(responseData);

      // Notify user about the completion
      await admin.firestore().collection('users').doc(userId).update({
        notifications: admin.firestore.FieldValue.arrayUnion({
          message: 'Your AI request has been processed.',
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
        })
      });
    } catch (error) {
      console.error('Error processing AI request:', error);
    }
  }); 