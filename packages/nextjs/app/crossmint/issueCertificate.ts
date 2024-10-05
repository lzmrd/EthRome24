const templateId = "a653aa39-2085-4315-9728-ce16e3177a72";
const apiKey = "sk_staging_5vYiDyB7oZ6m4PjngihVTRSqJuKFRjV6v9zRmWxPx2odVHHyBij8q5WXPwbWirDk8oSQNeSsoTTnM8iNcHCDUEDKmpunqcgWYsdGFYC47QLkfHMn6R66v6xc9u3m5N1ce1ZHAQLVBTAykXMRnbHTJthgYDcV2Cvn9oqTyWJss5o3AGvjkaHj6RvT8Yo3CS6UAuQoi7XXEdyAPmYBLc2677QN";

if (!apiKey) {
    throw new Error("API Key is not defined");
}

export async function issueCourseCompletionCertificate(userEmail: string, course: string, grade: string, expiresAt: string) {
    const credentialParams = {
        recipient: `email:${userEmail}:polygon-amoy`,
        credential: {
            subject: {
                course: course,
            },
            grade: grade,
            expiresAt: expiresAt,
        },
    };

    const options = {
        method: "POST",
        headers: {
            "X-API-KEY": apiKey,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentialParams),
    };

    try {
        const response = await fetch(`https://staging.crossmint.com/api/v1-alpha1/credentials/templates/${templateId}/vcs`, options);
        const result = await response.json();
        console.log("Certificate issued successfully:", result);
    } catch (error) {
        console.error("Error issuing certificate:", error);
    }
}

