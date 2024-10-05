interface Credential {
    id: string;
    type: string[];  // Aggiungi il campo type
    credentialSubject: {
        course: string;
        grade: string;
    };
    onChain: {
        status: string;
        chain: string;
        contractAddress: string;
    };
    credentialId: string;
    actionId: string;
}

// Esempio di credenziale aggiornata
const credential: Credential = {
    id: '3fcee066-3ed1-4184-a31d-b57cd742c455',
    type: ["VerifiableCredential", "CourseCompletionCertificate"],  // Aggiungi il tipo di credenziale
    credentialSubject: {
        course: "Blockchain 101",
        grade: "A",
    },
    onChain: {
        status: 'pending',
        chain: 'polygon-amoy',
        contractAddress: '0x7421A2D732Ab41A714Dd0aCC6834FAA0Da329910',
    },
    credentialId: 'urn:uuid:2c7e53e0-0180-48d4-a29a-491d86aeb73e',
    actionId: '3fcee066-3ed1-4184-a31d-b57cd742c455',
};

interface CredentialVerificationResponse {
    success: boolean;
    message: string;
    [key: string]: any;  // Per eventuali campi aggiuntivi nella risposta
}

// Funzione per verificare una credenziale
async function verifyCredential(credential: Credential): Promise<CredentialVerificationResponse> {
    const apiKey = "YOUR_API_KEY";  // Inserisci qui la tua API Key

    // Opzioni per la richiesta API
    const options: RequestInit = {
        method: "POST",
        headers: {
            "X-API-KEY": apiKey,  // Chiave API per l'autenticazione
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ credential: credential }),  // Passa la credenziale nel corpo della richiesta
    };

    try {
        // Chiamata API per verificare la credenziale
        const response = await fetch("https://staging.crossmint.com/api/v1-alpha1/credentials/verification/verify", options);
        
        // Gestione degli errori di risposta
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        // Risposta della verifica
        const responseData: CredentialVerificationResponse = await response.json();
        console.log(JSON.stringify(responseData));  // Stampa la risposta per il debugging
        return responseData;  // Ritorna i dati della risposta
    } catch (error) {
        console.error("Error verifying credential:", error);  // Gestione degli errori
        throw error;
    }
}


verifyCredential(credential).then(response => {
    console.log("Verification result:", response);  // Risultato della verifica
}).catch(err => {
    console.error("Verification failed:", err);  // Gestione degli errori in fase di verifica
});
