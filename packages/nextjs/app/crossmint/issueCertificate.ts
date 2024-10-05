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
        //const response = await fetch(`https://staging.crossmint.com/api/v1-alpha1/credentials/templates/${templateId}/vcs`, options);
        const result = JSON.stringify({
            id: '96ac6b61-a0e7-463d-853b-b520e65683bb',
            onChain: {
                status: 'pending',
                chain: 'polygon-amoy', contractAddress: '0x7421A2D732Ab41A714Dd0aCC6834FAA0Da329910'
            }, credentialId: 'urn:uuid:8fd81a01-f2b6-4376-a638-4f63d6b895a0',
            actionId: '96ac6b61-a0e7-463d-853b-b520e65683bb'
        })//await response.json();
        return result;
    } catch (error) {
    }
}

