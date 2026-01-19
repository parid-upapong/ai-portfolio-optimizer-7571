import cv2
import numpy as np
from sklearn.cluster import KMeans

class DesignAnalyzer:
    """
    Performs low-level visual analysis: Color Palettes and Composition.
    """
    def __init__(self, n_colors=5):
        self.n_colors = n_colors

    def extract_color_palette(self, image_path):
        """Extracts dominant colors and returns HEX codes."""
        image = cv2.imread(image_path)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        image = cv2.resize(image, (200, 200), interpolation=cv2.INTER_AREA)
        
        pixels = image.reshape(-1, 3)
        kmeans = KMeans(n_clusters=self.n_colors, n_init=10)
        kmeans.fit(pixels)
        
        colors = kmeans.cluster_centers_.astype(int)
        hex_colors = [f"#{c[0]:02x}{c[1]:02x}{c[2]:02x}" for c in colors]
        
        return hex_colors

    def analyze_composition(self, image_path):
        """
        Detects visual complexity and 'Rule of Thirds' focus areas 
        using Saliency Mapping.
        """
        image = cv2.imread(image_path)
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        
        # Use Static Saliency Fine Grained
        saliency = cv2.saliency.StaticSaliencyFineGrained_create()
        success, saliency_map = saliency.computeSaliency(gray)
        saliency_map = (saliency_map * 255).astype("uint8")
        
        # Calculate visual weight distribution
        h, w = saliency_map.shape
        sections = {
            "top_left": np.sum(saliency_map[0:h//3, 0:w//3]),
            "center": np.sum(saliency_map[h//3:2*h//3, w//3:2*w//3]),
            "bottom_right": np.sum(saliency_map[2*h//3:h, 2*w//3:w])
        }
        
        total_weight = sum(sections.values())
        return {k: v / total_weight for k, v in sections.items()}