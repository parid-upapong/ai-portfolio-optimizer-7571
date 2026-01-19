from .style_engine import StyleEngine
from .design_analyzer import DesignAnalyzer

class VisualIntelligencePipeline:
    def __init__(self):
        self.style_engine = StyleEngine()
        self.design_analyzer = DesignAnalyzer()

    def process_portfolio_item(self, image_path):
        """
        The main entry point for the CV backend.
        Aggregates visual data to be sent to the LLM Narrative Engine.
        """
        # 1. Semantic Style Analysis
        style_scores = self.style_engine.analyze_style(image_path)
        primary_style = list(style_scores.keys())[0]
        
        # 2. Visual Embedding for Vector DB
        vector_embedding = self.style_engine.get_image_embedding(image_path)
        
        # 3. Technical Design Analysis
        colors = self.design_analyzer.extract_color_palette(image_path)
        composition = self.design_analyzer.analyze_composition(image_path)
        
        return {
            "metadata": {
                "primary_style": primary_style,
                "style_distribution": style_scores,
                "palette": colors,
                "visual_hierarchy": composition
            },
            "vector": vector_embedding
        }

# Example Usage:
# pipeline = VisualIntelligencePipeline()
# insight = pipeline.process_portfolio_item("user_upload.png")
# print(f"Detected Style: {insight['metadata']['primary_style']}")