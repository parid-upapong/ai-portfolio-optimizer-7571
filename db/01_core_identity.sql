-- Users and Professional Profiles
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    headline TEXT, -- AI-optimized headline
    bio_raw TEXT,
    bio_narrative TEXT, -- AI-transformed narrative bio
    avatar_url TEXT,
    website_url TEXT,
    location TEXT,
    industry_focus TEXT[],
    years_of_experience INTEGER,
    searchable_vector vector(1536) -- Embedding of the overall professional persona
);

CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL,
    category TEXT CHECK (category IN ('Technical', 'Creative', 'Soft', 'Tool')),
    is_verified BOOLEAN DEFAULT false
);

CREATE TABLE user_skills (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    skill_id UUID REFERENCES skills(id) ON DELETE CASCADE,
    proficiency_level INTEGER CHECK (proficiency_level BETWEEN 1 AND 5),
    years_of_experience INTEGER,
    PRIMARY KEY (user_id, skill_id)
);