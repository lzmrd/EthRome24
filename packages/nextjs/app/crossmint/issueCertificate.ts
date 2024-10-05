import { CrossmintClient } from 'crossmint';

const client = new CrossmintClient({
  apiKey: process.env.CROSSMINT_API_KEY,
  clientId: process.env.CROSSMINT_CLIENT_ID,
});

const issueCertificate = async () => {
  try {
    const credential = {
      recipient: {
        email: "student@example.com" // Puoi anche usare l'indirizzo del wallet
      },
      type: "CourseCompletionCertificate",
      subject: {
        course: "Blockchain Basics",
        grade: "A"
      },
      templateId: "crossmint:5fe6040e-07a1-48bb-97a3-b588a7e927d2:CourseCompletionCertificate",
      expirationDate: "2030-01-01T00:00:00Z" // opzionale
    };

    const response = await client.issueCredential(credential);
    console.log('Certificato emesso con successo:', response);
  } catch (error) {
    console.error('Errore nell\'emissione del certificato:', error);
  }
};

issueCertificate();
