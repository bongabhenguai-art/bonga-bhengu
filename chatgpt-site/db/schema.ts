import {sqliteTable,text,integer,index,uniqueIndex} from 'drizzle-orm/sqlite-core';
export const designerWorkspaces=sqliteTable('designer_workspaces',{userId:text('user_id').primaryKey(),payload:text('payload').notNull(),revision:integer('revision').notNull().default(1),updatedAt:text('updated_at').notNull()});
export const designerStorefronts=sqliteTable('designer_storefronts',{userId:text('user_id').primaryKey(),slug:text('slug').notNull().unique(),publicData:text('public_data').notNull(),publishedAt:text('published_at').notNull(),isHome:integer('is_home').notNull().default(0)});
export const designerEnquiries=sqliteTable('designer_enquiries',{id:text('id').primaryKey(),userId:text('user_id').notNull(),payload:text('payload').notNull(),createdAt:text('created_at').notNull(),senderHash:text('sender_hash').notNull()},table=>[index('idx_enquiry_user_date').on(table.userId,table.createdAt),index('idx_enquiry_sender_date').on(table.senderHash,table.createdAt)]);
export const designerExecutions=sqliteTable('designer_executions',{id:text('id').primaryKey(),userId:text('user_id').notNull(),report:text('report').notNull(),createdAt:text('created_at').notNull()},table=>[index('idx_execution_user_date').on(table.userId,table.createdAt)]);

export const designerMedia=sqliteTable('designer_media',{id:text('id').primaryKey(),userId:text('user_id').notNull(),objectKey:text('object_key').notNull().unique(),name:text('name').notNull(),contentType:text('content_type').notNull(),size:integer('size').notNull(),createdAt:text('created_at').notNull()},table=>[index('idx_media_user_date').on(table.userId,table.createdAt)]);

export const studioRooms=sqliteTable('studio_rooms',{id:text('id').primaryKey(),userId:text('user_id').notNull(),tokens:text('tokens').notNull(),expiresAt:text('expires_at').notNull()},table=>[index('idx_studio_owner').on(table.userId)]);
export const studioSignals=sqliteTable('studio_signals',{id:integer('id').primaryKey({autoIncrement:true}),roomId:text('room_id').notNull(),slot:integer('slot').notNull(),sender:text('sender').notNull(),payload:text('payload').notNull(),createdAt:text('created_at').notNull()},table=>[index('idx_signal_room_sender_id').on(table.roomId,table.sender,table.id)]);
export const businessBook=sqliteTable('business_book',{id:text('id').primaryKey(),userId:text('user_id').notNull(),kind:text('kind').notNull(),payload:text('payload').notNull(),updatedAt:text('updated_at').notNull()},table=>[index('idx_book_user_updated').on(table.userId,table.updatedAt)]);

export const packageRequests=sqliteTable('package_requests',{userId:text('user_id').primaryKey(),tier:text('tier').notNull(),createdAt:text('created_at').notNull()});

export const studioCampaigns=sqliteTable('studio_campaigns',{id:text('id').primaryKey(),userId:text('user_id').notNull(),payload:text('payload').notNull(),status:text('status').notNull(),createdAt:text('created_at').notNull(),updatedAt:text('updated_at').notNull()},table=>[index('idx_campaign_user_updated').on(table.userId,table.updatedAt)]);

export const systemRuns=sqliteTable('system_runs',{id:text('id').primaryKey(),userId:text('user_id').notNull(),report:text('report').notNull(),createdAt:text('created_at').notNull()},table=>[index('idx_system_run_user_date').on(table.userId,table.createdAt)]);

export const studioJobs=sqliteTable('studio_jobs',{id:text('id').notNull(),userId:text('user_id').notNull(),payload:text('payload').notNull(),revision:integer('revision').notNull(),updatedAt:text('updated_at').notNull()},table=>[index('idx_studio_job_user').on(table.userId),uniqueIndex('idx_studio_job_identity').on(table.userId,table.id)]);

export const educationWorkspaces=sqliteTable('education_workspaces',{userId:text('user_id').primaryKey(),payload:text('payload').notNull(),revision:integer('revision').notNull().default(1),updatedAt:text('updated_at').notNull()});
export const builderProjects=sqliteTable('builder_projects',{id:text('id').notNull(),userId:text('user_id').notNull(),name:text('name').notNull(),payload:text('payload').notNull(),revision:integer('revision').notNull().default(1),updatedAt:text('updated_at').notNull()},table=>[uniqueIndex('idx_builder_project_identity').on(table.userId,table.id),index('idx_builder_project_user_updated').on(table.userId,table.updatedAt)]);
export const builderPublications=sqliteTable('builder_publications',{projectId:text('project_id').primaryKey(),userId:text('user_id').notNull(),payload:text('payload').notNull(),projectRevision:integer('project_revision').notNull(),revision:integer('revision').notNull().default(1),isPublished:integer('is_published').notNull().default(0),updatedAt:text('updated_at').notNull()},table=>[index('idx_builder_publication_user').on(table.userId)]);

export const backendRequestLimits=sqliteTable('backend_request_limits',{userId:text('user_id').notNull(),scope:text('scope').notNull(),windowStart:integer('window_start').notNull(),used:integer('used').notNull()},table=>[uniqueIndex('idx_backend_request_user_scope').on(table.userId,table.scope)]);
export const backendWorkflowLocks=sqliteTable('backend_workflow_locks',{userId:text('user_id').primaryKey(),token:text('token').notNull(),expiresAt:integer('expires_at').notNull()});

export const zuxuruRecords=sqliteTable('zuxuru_records',{id:text('id').primaryKey(),owner:text('owner').notNull(),kind:text('kind').notNull(),data:text('data').notNull(),createdAt:text('created_at').notNull(),updatedAt:text('updated_at').notNull()},table=>[index('idx_zuxuru_owner_kind_updated').on(table.owner,table.kind,table.updatedAt)]);
