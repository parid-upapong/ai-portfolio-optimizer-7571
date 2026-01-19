-- Job Analysis and Strategic Matching
CREATE TABLE job_postings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_url TEXT,
    company_name TEXT NOT NULL,
    job_title TEXT NOT NULL,
    job_description_raw TEXT NOT NULL,
    requirements_extracted TEXT[],
    salary_range_min NUMERIC,
    salary_range_max NUMERIC,
    job_embedding vector(1536), -- Vector representation of the job requirements
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE matching_scores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    job_id UUID REFERENCES job_postings(id) ON DELETE CASCADE,
    overall_match_score DECIMAL(5,2), -- 0 to 100
    skills_gap_analysis JSONB, -- Skills the user is missing vs job requirements
    strategic_advice TEXT, -- AI generated advice on how to pivot the portfolio for this job
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for semantic similarity search
-- Using HNSW for high-performance approximate nearest neighbor search
CREATE INDEX ON job_postings USING hnsw (job_embedding vector_cosine_ops);
CREATE INDEX ON project_narratives USING hnsw (embedding vector_cosine_ops);