import torch
from PIL import Image
from transformers import CLIPProcessor, CLIPModel
import numpy as np

class StyleEngine:
    """
    Analyzes the semantic style of an artwork/design using CLIP.
    Maps images to descriptive labels to build the 'Narrative'.
    """
    def __init__(self, model_name="openai/clip-vit-base-patch32"):
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.model = CLIPModel.from_pretrained(model_name).to(self.device)
        self.processor = CLIPProcessor.from_pretrained(model_name)
        
        # Predefined style archetypes for market alignment
        self.style_tags = [
            "minimalist and clean", "vibrant and energetic", 
            "dark and moody", "corporate and professional", 
            "brutalist and raw", "playful and organic",
            "high-tech and futuristic", "vintage and nostalgic"
        ]

    def analyze_style(self, image_path):
        image = Image.open(image_path).convert("RGB")
        
        inputs = self.processor(
            text=self.style_tags, 
            images=image, 
            return_tensors="pt", 
            padding=True
        ).to(self.device)

        outputs = self.model(**inputs)
        logits_per_image = outputs.logits_per_image 
        probs = logits_per_image.softmax(dim=1) 
        
        # Map probabilities to tags
        results = {
            self.style_tags[i]: float(probs[0][i]) 
            for i in range(len(self.style_tags))
        }
        
        return dict(sorted(results.items(), key=lambda item: item[1], reverse=True))

    def get_image_embedding(self, image_path):
        """Generates a vector for similarity search in the Vector Database."""
        image = Image.open(image_path).convert("RGB")
        inputs = self.processor(images=image, return_tensors="pt").to(self.device)
        with torch.no_grad():
            image_features = self.model.get_image_features(**inputs)
        return image_features.cpu().numpy().tolist()