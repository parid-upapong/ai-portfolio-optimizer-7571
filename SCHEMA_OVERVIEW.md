# Database Schema Design: AI-Powered Career Partner

## 1. Design Philosophy
The database is designed to move beyond simple CRUD operations. It is optimized for:
*   **Semantic Matching:** Using `pgvector` to store embeddings for projects, skills, and job descriptions.
*   **Narrative Versioning:** Supporting multiple AI-generated "stories" for the same project to target different industries.
*   **Visual Intelligence Metadata:** Storing complex JSON structures from Computer Vision analysis (color palettes, style tags, composition scores).
*   **Performance:** Utilizing indexing on relational keys and HNSW (Hierarchical Navigable Small World) indexes for vector similarity searches.

## 2. Core Modules
1.  **Identity & Profile:** User data, professional summary, and social links.
2.  **Taxonomy (Skills & Industry):** A normalized structure for skills to prevent "tag bloat."
3.  **Portfolio & Narrative:** The heart of the system—projects, media, and the AI-generated impact narratives.
4.  **AI Intelligence Layer:** Vector embeddings and CV analysis results.
5.  **Job Strategy & Matching:** External job listings and the scoring mechanism that links them to the creator's assets.