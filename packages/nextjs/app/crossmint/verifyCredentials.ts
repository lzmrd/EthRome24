interface CredentialVerificationResponse {
    success: boolean;
    message: string;
    [key: string]: any;  // For any additional fields in the response
}

interface Credential {
    unencryptedCredential: object;  // Define this according to your credential structure
}

async function verifyCredential(credential: Credential) {
    //const apiKey: string | undefined = process.env.NEXT_PUBLIC_CROSSMINT_API_KEY //"sk_staging_5vYiDyB7oZ6m4PjngihVTRSqJuKFRjV6v9zRmWxPx2odVHHyBij8q5WXPwbWirDk8oSQNeSsoTTnM8iNcHCDUEDKmpunqcgWYsdGFYC47QLkfHMn6R66v6xc9u3m5N1ce1ZHAQLVBTAykXMRnbHTJthgYDcV2Cvn9oqTyWJss5o3AGvjkaHj6RvT8Yo3CS6UAuQoi7XXEdyAPmYBLc2677QN"//;

    // if (!apiKey) {
    //     throw new Error("Missing API Key");
    // }

    const options: RequestInit = {
        method: "POST",
        headers: {
            "X-API-KEY": "sk_staging_5vYiDyB7oZ6m4PjngihVTRSqJuKFRjV6v9zRmWxPx2odVHHyBij8q5WXPwbWirDk8oSQNeSsoTTnM8iNcHCDUEDKmpunqcgWYsdGFYC47QLkfHMn6R66v6xc9u3m5N1ce1ZHAQLVBTAykXMRnbHTJthgYDcV2Cvn9oqTyWJss5o3AGvjkaHj6RvT8Yo3CS6UAuQoi7XXEdyAPmYBLc2677QN",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ credential: credential.unencryptedCredential }),
    };

    try {
        const response = await fetch("https://staging.crossmint.com/api/v1-alpha1/credentials/verification/verify", options);
        
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const responseData: CredentialVerificationResponse = await response.json();
        console.log(JSON.stringify(responseData));
        return responseData;
    } catch (error) {
        console.error("Error verifying credential:", error);
        throw error;
    }
}
