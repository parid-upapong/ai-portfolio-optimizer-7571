import numpy as np
from sqlalchemy import text
from sqlalchemy.orm import Session
from pgvector.sqlalchemy import Vector

class VectorService:
    """Service to handle semantic search using pgvector."""
    
    def __init__(self, db: Session):
        self.db = db

    def find_similar_jobs(self, user_embedding: List[float], limit: int = 5):
        """
        Queries the job_listings table for jobs that semantically match 
        the user's portfolio embedding.
        """
        # Using cosine distance (<=>) for similarity
        query = text("""
            SELECT id, title, company_name, description, 
                   1 - (embedding <=> :user_emb) as similarity
            FROM job_listings
            ORDER BY similarity DESC
            LIMIT :limit
        """)
        
        result = self.db.execute(query, {
            "user_emb": np.array(user_embedding),
            "limit": limit
        })
        
        return result.fetchall()

    def get_user_embedding(self, user_id: str):
        """Retrieves the pre-calculated user profile embedding."""
        query = text("SELECT profile_embedding FROM user_profiles WHERE user_id = :uid")
        result = self.db.execute(query, {"uid": user_id}).fetchone()
        return result[0] if result else None