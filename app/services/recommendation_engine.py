import openai
from .vector_service import VectorService
from sqlalchemy.orm import Session

class RecommendationEngine:
    def __init__(self, db: Session):
        self.vector_service = VectorService(db)

    async def generate_smart_recommendations(self, user_id: str, top_k: int = 3):
        # 1. Get User Context
        user_vector = self.vector_service.get_user_embedding(user_id)
        if not user_vector:
            return {"error": "User profile not indexed for AI recommendations."}

        # 2. Semantic Matching (Vector Search)
        matches = self.vector_service.find_similar_jobs(user_vector, limit=top_k)

        # 3. AI Reasoning (LLM Analysis)
        # We pass the top matches to the LLM to generate "Why" and "Gap Analysis"
        job_summaries = [f"{m.title} at {m.company_name}" for m in matches]
        
        prompt = f"""
        System: You are a Senior Portfolio Strategist.
        User Context: Portfolio focuses on the projects represented by this vector.
        Top Job Matches: {job_summaries}
        
        Task: 
        1. Explain why these jobs match the user's current portfolio.
        2. Identify 3 specific skill gaps.
        3. Suggest one strategic project to increase match probability.
        Format: JSON
        """
        
        response = await openai.chat.completions.create(
            model="gpt-4-turbo-preview",
            messages=[{"role": "user", "content": prompt}],
            response_format={ "type": "json_object" }
        )
        
        ai_insight = response.choices[0].message.content
        
        return {
            "matches": [
                {
                    "job_id": str(m.id),
                    "job_title": m.title,
                    "company": m.company_name,
                    "score": round(m.similarity, 4)
                } for m in matches
            ],
            "ai_strategy": ai_insight
        }