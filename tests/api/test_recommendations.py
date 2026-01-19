import pytest
from fastapi.testclient import TestClient
from app.main import app # Assuming FastAPI entry point

client = TestClient(app)

def test_get_job_matches_authenticated():
    user_id = "550e8400-e29b-41d4-a716-446655440000"
    response = client.post(
        "/api/v1/recommendations/match",
        json={"user_id": user_id, "target_role": "Senior Product Designer"}
    )
    
    assert response.status_code == 200
    data = response.json()
    
    assert "matches" in data
    assert isinstance(data["matches"], list)
    if len(data["matches"]) > 0:
        assert "match_score" in data["matches"][0]
        assert data["matches"][0]["match_score"] >= 0.0
        assert data["matches"][0]["match_score"] <= 1.0

def test_skill_gap_analysis_logic():
    response = client.get("/api/v1/analytics/skill-gap/550e8400-e29b-41d4-a716-446655440000")
    assert response.status_code == 200
    assert "missing_skills" in response.json()