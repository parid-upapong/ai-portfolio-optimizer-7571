-- Enable pgvector extension for semantic search and AI matching
CREATE EXTENSION IF NOT EXISTS vector;

-- Enable uuid-ossp for secure, non-sequential identifiers
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";