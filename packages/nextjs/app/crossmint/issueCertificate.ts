// Define the necessary details for issuing the certificate
const userEmail = "user@email.com"; // Replace with recipient email
const templateId = "crossmint:5fe6040e-07a1-48bb-97a3-b588a7e927d2:CourseCompletionCertificate"; // Replace with your template ID from Crossmint
const apiKey = "sk_staging_5vYiDyB7oZ6m4PjngihVTRSqJuKFRjV6v9zRmWxPx2odVHHyBij8q5WXPwbWirDk8oSQNeSsoTTnM8iNcHCDUEDKmpunqcgWYsdGFYC47QLkfHMn6R66v6xc9u3m5N1ce1ZHAQLVBTAykXMRnbHTJthgYDcV2Cvn9oqTyWJss5o3AGvjkaHj6RvT8Yo3CS6UAuQoi7XXEdyAPmYBLc2677QN"//process.env.NEXT_PUBLIC_CROSSMINT_API_KEY; // Replace with your Crossmint API key

if (!apiKey) {
    throw new Error("API Key is not defined");
}

// Define the credential parameters
const credentialParams = {
    recipient: `email:${userEmail}:polygon-amoy`, // Use the email and the blockchain of choice
    credential: {
        subject: {
            course: "Blockchain 101", // Replace with the course name
            grade: "A",               // Replace with the grade or other achievement info
        },
        expiresAt: "2034-02-02", // Optional expiration date
    },
};

// Define the fetch options with headers and body
const options = {
    method: "POST",
    headers: {
        "X-API-KEY": apiKey,  // API key is passed in the headers
        "Content-Type": "application/json",
    },
    body: JSON.stringify(credentialParams),  // Stringify the credential parameters
};

// Call the Crossmint API to issue the certificate
async function issueCourseCompletionCertificate() {
    try {
        const response = await fetch(`https://staging.crossmint.com/api/v1-alpha1/credentials/templates/${templateId}/vcs`, options);
        const result = await response.json();
        
        console.log("Certificate issued successfully:", result);
    } catch (error) {
        console.error("Error issuing certificate:", error);
    }
}

// Run the function to issue the certificate
issueCourseCompletionCertificate();
