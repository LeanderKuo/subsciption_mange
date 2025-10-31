Build with Brandfetch
Brand Search API
Match brand names to their domain and logo

​
🔍 Overview
The Brand Search API provides fast querying of brands. It lets you search by brand names and match them to their corresponding URLs, enabling you to create rich autocomplete experiences like the one on Brandfetch.
​
⚖️ Guidelines
​

1. Rate Limit
   Brand Search API is free to use and we don’t ask for any attribution.
   We offer a fair use base rate limit of 500,000 requests per month, with 200 requests per 5 minutes per IP address, which is designed to cover most small to medium applications. The rate limit should allow for roughly 30 search-sessions in a 5-minute period and is intended to discourage abuse. Use a debounce strategy inbetween keystrokes.
   If your usage approaches the monthly limit, we may reach out to discuss an upgrade to a paid, unlimited tier.
   For enterprises, we provide custom solutions, including SLA agreements, custom terms, and flexible caching options to ensure optimal performance at scale. These plans are tailored to meet the needs of high-volume users.
   Feel free to contact us to discuss the right plan for your use case.
   ​
2. Authentication
   Every request must include your unique clientID.
   To use Brand Search API, you must include your clientId with every request. Adding your clientId provides reliable access, supports fair usage, and keeps consistent performance across all requests.
   How to get your client ID:
   Register as a developer: Create a free account and access your clientId from the developer portal.
   Authenticate your requests: Include your clientId in each request as shown in the example below:

Copy

Ask AI
curl --request GET \ --url
"https://api.brandfetch.io/v2/search/{query}?c={your-client-id-here}"
​ 3. Hotlinking
We require Brand Search API to be directly embedded in your user-facing applications (e.g. in the user’s browser).
The API should be used directly as is, with all data fetched live and not altered or persisted. Your users should make requests to the API directly from their browsers.
The logo image URLs provided by the Brand Search API must be hotlinked. Other data, such as brand names, should not be cached and should be used exclusively for building an autocomplete experience. Image URLs expire after 24 hours and must be refetched.
For more information on the API’s availability, see our uptime status. We can provide custom SLAs for enterprise customers.
If your use case requires more flexibility, please contact us for a custom setup.
​ 4. Replicating Brandfetch
You cannot replicate the core user experience of Brandfetch.
The best way to ensure that your application doesn’t violate this guideline is by integrating Brandfetch into an existing app that offers more value than just the Brandfetch integration.
Some examples:
✅ The Pitch integration helps their users autocomplete brand names to streamline logo search within Pitch’s editor. Without this integration, the app still has a lot of value to its users.
🚫 An unofficial Brand Search API that allows users to autocomplete brands. Without the API, the app has no content and no value to users.
If you’re unsure about your use case, please contact us.
​
🔌 React integration
The example below shows how to seamlessly integrate Brand Search API with React.
React integration
Try out the React integration on CodeSandbox
​
📚 API reference
Explore the full API Reference for comprehensive documentation and examples.
API Reference
Access the Brand Search API reference documentation
Logos are the property of their respective trademark owners. Logo usage must comply with the principles of “fair use,” which allow referencing a brand without endorsement, misrepresentation, or alteration. If you’re unsure, consult a legal professional.
