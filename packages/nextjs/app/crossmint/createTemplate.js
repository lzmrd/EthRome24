const myApiKey = "sk_staging_5vYiDyB7oZ6m4PjngihVTRSqJuKFRjV6v9zRmWxPx2odVHHyBij8q5WXPwbWirDk8oSQNeSsoTTnM8iNcHCDUEDKmpunqcgWYsdGFYC47QLkfHMn6R66v6xc9u3m5N1ce1ZHAQLVBTAykXMRnbHTJthgYDcV2Cvn9oqTyWJss5o3AGvjkaHj6RvT8Yo3CS6UAuQoi7XXEdyAPmYBLc2677QN"; // Replace with your API key

const templateParams = {
    credentials: {
        type: "crossmint:5fe6040e-07a1-48bb-97a3-b588a7e927d2:CourseCompletionCertificate", // Adjust the type to match your usage
        encryption: "none",
        storage: "crossmint",
    },
    metadata: {
        name: "Course Completion Certificate",
        description: "Credentials issued for course completion",
        imageUrl: "https://picsum.photos/400",
    },
    chain: "polygon-amoy",
};

const options = {
    method: "POST",
    headers: {
        "X-API-KEY": myApiKey,
        "Content-Type": "application/json",
    },
    body: JSON.stringify(templateParams),
};

fetch("https://staging.crossmint.com/api/v1-alpha1/credentials/templates/", options)
    .then((response) => response.json())
    .then((response) => console.log(JSON.stringify(response)))
    .catch((err) => console.error(err));
