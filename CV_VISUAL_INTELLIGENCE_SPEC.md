# Visual Intelligence: Computer Vision for Art & Design Analysis

## 1. Objective
To extract semantic and aesthetic metadata from creative works (UI/UX design, Illustration, Photography) to power the "Narrative Engineering" and "Market Alignment" engines.

## 2. Core Computer Vision Tasks
*   **Style Embedding:** Using Contrastive Language-Image Pre-training (CLIP) to map visual work into a semantic space (e.g., "Minimalist," "Industrial," "Cyberpunk").
*   **Color Theory Analysis:** Extracting dominant palettes and analyzing them against psychological impact (e.g., "High-trust Blue," "Energetic Orange").
*   **Compositional Analysis:** Detecting layout balance, Rule of Thirds adherence, and visual hierarchy using Saliency Maps.
*   **Technical Quality Assessment:** Identifying artifacts, resolution issues, or inconsistent padding in UI designs.

## 3. Tech Stack
*   **Framework:** PyTorch / Hugging Face Transformers
*   **Models:** CLIP (ViT-L/14) for style, ResNet50 for feature extraction, DeepLabV3 for segmentation.
*   **Processing:** OpenCV & Pillow.
*   **Vector Storage:** Integration with the project's pgvector/Pinecone hub.