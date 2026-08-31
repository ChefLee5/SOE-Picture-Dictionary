-- ==============================================================================
-- Sound of Essentials (SOE) - Neon PostgreSQL Schema
-- ==============================================================================

-- 1. Submissions / Leads Table
CREATE TABLE IF NOT EXISTS soe_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    kind VARCHAR(50) NOT NULL CHECK (kind IN ('interest', 'partnership', 'newsletter')),
    name VARCHAR(120) NOT NULL,
    email VARCHAR(255) NOT NULL,
    organization_name VARCHAR(255),
    message TEXT,
    source_path VARCHAR(500),
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_soe_submissions_email ON soe_submissions(email);
CREATE INDEX IF NOT EXISTS idx_soe_submissions_created_at ON soe_submissions(created_at DESC);

-- 2. User Progress / Quest Tracker (Optional - for future quest completion sync)
CREATE TABLE IF NOT EXISTS user_quest_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id VARCHAR(255) NOT NULL,
    land_id VARCHAR(50) NOT NULL,
    completed_activities INT DEFAULT 0,
    badges_earned JSONB DEFAULT '[]'::jsonb,
    last_visited_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_user_land UNIQUE (user_id, land_id)
);
