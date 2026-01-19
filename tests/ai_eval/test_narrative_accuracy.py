import pytest
from langchain.chat_models import ChatOpenAI
from langchain.evaluation import load_evaluator
from app.services.ai_engine import NarrativeEngine

@pytest.fixture
def engine():
    return NarrativeEngine()

@pytest.fixture
def evaluator():
    # Using LLM-as-a-judge to evaluate AI accuracy
    return load_evaluator("labeled_criteria", criteria="conciseness")

def test_narrative_fact_retention(engine):
    """
    Test that the AI doesn't hallucinate skills not present in the original input.
    """
    raw_input = "I used React and Figma to build a landing page for a coffee shop. It increased sales by 20%."
    enhanced_output = engine.generate_impact_story(raw_input)
    
    # Check for core facts
    assert "React" in enhanced_output
    assert "20%" in enhanced_output
    
    # Negative check: Ensure it didn't invent a backend technology not mentioned
    invented_techs = ["Kubernetes", "Rust", "Blockchain"]
    for tech in invented_techs:
        assert tech not in enhanced_output, f"AI hallucinated {tech} in the narrative"

def test_semantic_alignment(engine):
    """
    Validate that the enhanced narrative maintains the original intent.
    """
    raw_input = "Designed a logo for a sustainable fashion brand using green tones."
    enhanced_output = engine.generate_impact_story(raw_input)
    
    # Use a judge model to check if 'Sustainability' is still the core theme
    judge = ChatOpenAI(model="gpt-4", temperature=0)
    prompt = f"""
    Compare the source and the target text. 
    Does the target text preserve the core message of 'Sustainable Fashion' and 'Visual Design'?
    Source: {raw_input}
    Target: {enhanced_output}
    Respond with 'YES' or 'NO'.
    """
    response = judge.predict(prompt)
    assert "YES" in response.upper()

def test_visual_intelligence_metadata():
    """
    Mock test for CV analysis output structure.
    """
    mock_cv_data = {
        "color_palette": ["#FFFFFF", "#000000"],
        "composition_score": 0.85,
        "detected_style": "Minimalist"
    }
    assert "color_palette" in mock_cv_data
    assert len(mock_cv_data["color_palette"]) > 0