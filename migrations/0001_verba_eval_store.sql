CREATE TABLE IF NOT EXISTS eval_entries (
  id TEXT PRIMARY KEY,
  saved_at TEXT NOT NULL,
  session_id TEXT NOT NULL,
  language_label TEXT NOT NULL,
  source_language TEXT NOT NULL,
  output_language TEXT NOT NULL,
  audio_name TEXT NOT NULL,
  original_text TEXT NOT NULL,
  corrected_text TEXT NOT NULL,
  processed_output TEXT NOT NULL,
  note TEXT NOT NULL,
  delta_chars INTEGER NOT NULL DEFAULT 0,
  flagged_segments INTEGER NOT NULL DEFAULT 0,
  transcription_model TEXT NOT NULL,
  provider TEXT NOT NULL,
  model TEXT NOT NULL,
  inference_preset TEXT NOT NULL,
  prompt_version TEXT NOT NULL,
  latency_ms INTEGER,
  ratings_json TEXT NOT NULL DEFAULT '{}',
  error_tags_json TEXT NOT NULL DEFAULT '[]'
);

CREATE INDEX IF NOT EXISTS idx_eval_entries_saved_at ON eval_entries(saved_at DESC);
CREATE INDEX IF NOT EXISTS idx_eval_entries_session_id ON eval_entries(session_id);
CREATE INDEX IF NOT EXISTS idx_eval_entries_provider ON eval_entries(provider);

CREATE TABLE IF NOT EXISTS draft_runs (
  id TEXT PRIMARY KEY,
  saved_at TEXT NOT NULL,
  session_id TEXT NOT NULL,
  audio_name TEXT NOT NULL,
  source_language TEXT NOT NULL,
  output_language TEXT NOT NULL,
  mode TEXT NOT NULL,
  preset TEXT NOT NULL,
  provider TEXT NOT NULL,
  model TEXT NOT NULL,
  prompt_version TEXT NOT NULL,
  latency_ms INTEGER,
  usage_estimate_json TEXT NOT NULL DEFAULT '{}',
  register_label TEXT NOT NULL,
  tone_label TEXT NOT NULL,
  transcript TEXT NOT NULL,
  corrected_transcript TEXT NOT NULL,
  output_text TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_draft_runs_saved_at ON draft_runs(saved_at DESC);
CREATE INDEX IF NOT EXISTS idx_draft_runs_session_id ON draft_runs(session_id);
CREATE INDEX IF NOT EXISTS idx_draft_runs_provider ON draft_runs(provider);
