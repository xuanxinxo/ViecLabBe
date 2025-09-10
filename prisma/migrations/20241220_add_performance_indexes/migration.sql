-- Add performance indexes for better query performance

-- Job indexes
CREATE INDEX idx_job_posted_date ON "Job"("postedDate" DESC);
CREATE INDEX idx_job_status ON "Job"("status");
CREATE INDEX idx_job_type ON "Job"("type");
CREATE INDEX idx_job_location ON "Job"("location");
CREATE INDEX idx_job_company ON "Job"("company");
CREATE INDEX idx_job_title ON "Job"("title");

-- News indexes
CREATE INDEX idx_news_date ON "news"("date" DESC);
CREATE INDEX idx_news_title ON "news"("title");

-- Hiring indexes
CREATE INDEX idx_hiring_posted_date ON "Hiring"("postedDate" DESC);
CREATE INDEX idx_hiring_type ON "Hiring"("type");
CREATE INDEX idx_hiring_location ON "Hiring"("location");
CREATE INDEX idx_hiring_company ON "Hiring"("company");
CREATE INDEX idx_hiring_title ON "Hiring"("title");

-- NewJob indexes
CREATE INDEX idx_newjob_created_at ON "NewJob"("createdAt" DESC);
CREATE INDEX idx_newjob_type ON "NewJob"("type");
CREATE INDEX idx_newjob_location ON "NewJob"("location");
CREATE INDEX idx_newjob_company ON "NewJob"("company");
CREATE INDEX idx_newjob_title ON "NewJob"("title");
CREATE INDEX idx_newjob_status ON "NewJob"("status");

-- Application indexes
CREATE INDEX idx_application_created_at ON "Application"("createdAt" DESC);
CREATE INDEX idx_application_email ON "Application"("email");
CREATE INDEX idx_application_job_id ON "Application"("jobId");
CREATE INDEX idx_application_hiring_id ON "Application"("hiringId");

-- User indexes
CREATE INDEX idx_user_email ON "User"("email");
CREATE INDEX idx_user_role ON "User"("role");
CREATE INDEX idx_user_created_at ON "User"("createdAt" DESC);
