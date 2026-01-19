-- Projects and AI Narrative Engineering
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    slug TEXT NOT NULL,
    role_played TEXT,
    client_name TEXT,
    start_date DATE,
    end_date DATE,
    is_featured BOOLEAN DEFAULT false,
    raw_description TEXT, -- Original user input
    impact_metrics JSONB, -- Quantitative results (e.g., "Increased conversion by 20%")
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE project_narratives (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    tone_target TEXT, -- e.g., "Corporate", "Startup", "Artistic"
    industry_context TEXT, -- The specific industry this version is optimized for
    generated_content TEXT NOT NULL, -- The AI-engineered story
    embedding vector(1536), -- Vector for matching this specific project narrative to jobs
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE project_media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    media_url TEXT NOT NULL,
    media_type TEXT, -- 'image', 'video', 'pdf'
    cv_analysis_json JSONB, -- Output from Visual Intelligence (colors, style, objects)
    display_order INTEGER DEFAULT 0
);

CREATE TABLE project_skills (
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    skill_id UUID REFERENCES skills(id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, skill_id)
);