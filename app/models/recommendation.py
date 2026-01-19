from pydantic import BaseModel
from typing import List, Optional
from uuid import UUID

class RecommendationRequest(BaseModel):
    user_id: UUID
    target_role: Optional[str] = None
    top_k: int = 5

class JobMatch(BaseModel):
    job_id: UUID
    company_name: str
    job_title: str
    match_score: float
    reasoning: str

class SkillGapAnalysis(BaseModel):
    missing_skills: List[str]
    suggested_projects: List[str]
    narrative_adjustment: str

class RecommendationResponse(BaseModel):
    matches: List[JobMatch]
    gap_analysis: SkillGapAnalysis