-- Example Query: Find top 3 projects matching a specific Job Description
-- This uses cosine distance to find the most relevant project narratives 
-- for a specific job posting.

WITH current_job AS (
    SELECT job_embedding 
    FROM job_postings 
    WHERE id = 'target-job-uuid-here'
)
SELECT 
    p.title, 
    pn.generated_content,
    1 - (pn.embedding <=> cj.job_embedding) AS similarity_score
FROM 
    project_narratives pn
JOIN 
    projects p ON pn.project_id = p.id
CROSS JOIN 
    current_job cj
WHERE 
    p.user_id = 'target-user-uuid-here'
ORDER BY 
    similarity_score DESC
LIMIT 3;