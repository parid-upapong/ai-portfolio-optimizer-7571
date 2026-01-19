-- Tracking Visitor Engagement for Portfolio Optimization
CREATE TABLE portfolio_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    visitor_id TEXT, -- Anonymous session tracking
    event_type TEXT, -- 'view', 'click', 'scroll_depth', 'resume_download'
    referrer_domain TEXT,
    device_type TEXT,
    stay_duration_seconds INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ai_feedback_loop (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_type TEXT, -- 'narrative', 'match_score'
    entity_id UUID NOT NULL,
    user_feedback_score INTEGER CHECK (user_feedback_score BETWEEN -1 AND 1), -- -1 (bad), 1 (good)
    user_comments TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);