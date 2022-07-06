const userProperties = {
  login: { type: 'string' },
  id: { type: 'integer' },
  node_id: { type: 'string' },
  avatar_url: { type: 'string' },
  gravatar_id: { type: 'string' },
  url: { type: 'string' },
  html_url: { type: 'string' },
  followers_url: { type: 'string' },
  following_url: { type: 'string' },
  gists_url: { type: 'string' },
  starred_url: { type: 'string' },
  subscriptions_url: { type: 'string' },
  organizations_url: { type: 'string' },
  repos_url: { type: 'string' },
  events_url: { type: 'string' },
  received_events_url: { type: 'string' },
  type: { type: 'string' }
};
const userSchema = {
  type: 'object',
  properties: userProperties
};

const issueSchema = {
  type: 'object',
  required: false,
  properties: {
    url: { type: 'string' },
    repository_url: { type: 'string' },
    labels_url: { type: 'string' },
    comments_url: { type: 'string' },
    events_url: { type: 'string' },
    html_url: { type: 'string' },
    id: { type: 'integer' },
    number: { type: 'integer' },
    title: { type: 'string' },
    user: userSchema
  }
};

const PRSchema = {
  type: 'object',
  required: false,
  properties: {
    url: { type: 'string' },
    id: { type: 'integer' },
    node_id: { type: 'string' },
    html_url: { type: 'string' },
    diff_url: { type: 'string' },
    patch_url: { type: 'string' },
    issue_url: { type: 'string' },
    number: { type: 'integer' },
    state: { type: 'string' },
    locked: { type: 'boolean' },
    title: { type: 'string' },
    user: userSchema
  }
};

const eventsSchema = {
  type: 'object',
  properties: {
    status: { type: 'integer' },
    data: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          type: { type: 'string' },
          actor: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
              login: { type: 'string' },
              display_login: { type: 'string' },
              gravatar_id: { type: 'string' },
              url: { type: 'string' },
              avatar_url: { type: 'string' }
            }
          },
          repo: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
              name: { type: 'string' },
              url: { type: 'string' }
            }
          },
          payload: {
            type: 'object',
            patternProperties: {
              push_id: {
                type: 'integer',
                required: false
              },
              size: { type: 'integer', required: false },
              distinct_size: { type: 'integer', required: false },
              ref: { type: 'string', required: false },
              head: { type: 'string', required: false },
              before: { type: 'string', required: false },
              commits: {
                type: 'array',
                required: false,
                items: {
                  type: 'object',
                  properties: {
                    sha: { type: 'string' },
                    author: {
                      type: 'object',
                      properties: {
                        name: { type: 'string' },
                        email: { type: 'string' }
                      }
                    },
                    message: { type: 'string' },
                    distinct: { type: 'boolean' },
                    url: { type: 'string' }
                  }
                }
              },
              action: { type: 'string', required: false },
              ref_type: { type: 'string', required: false },
              master_branch: { type: 'string', required: false },
              description: { type: 'string', required: false },
              pusher_type: { type: 'string', required: false },
              issue: issueSchema,
              labels: {
                type: 'array',
                required: false,
                items: {
                  type: 'object',
                  required: false,
                  properties: {
                    id: { type: 'integer' },
                    node_id: { type: 'string' },
                    url: { type: 'string' },
                    name: { type: 'string' },
                    color: { type: 'string' },
                    default: { type: 'boolean' },
                    description: { type: 'string' }

                  }
                }
              },
              state: { type: 'string', required: false },
              locked: { type: 'boolean', required: false },
              assignee: {
                type: 'object',
                required: false,
                properties: userProperties
              },
              assignees: {
                type: 'array',
                required: false,
                items: { type: 'object', required: false, properties: userProperties }
              },
              milestone: { type: 'object', required: false },
              comment: { type: 'integer', required: false },
              created_at: { type: 'string', required: false },
              updated_at: { type: 'string', required: false },
              closed_at: { type: 'string', required: false },
              author_association: { type: 'string', required: false },
              active_lock_reason: { type: 'object', required: false },
              body: { type: 'string', required: false },
              reactions: {
                type: 'object',
                required: false,
                properties: {
                  url: { type: 'string' },
                  total_count: { type: 'integer' },
                  '+1': { type: 'integer' },
                  '-1': { type: 'integer' },
                  laugh: { type: 'integer' },
                  confused: { type: 'integer' },
                  heart: { type: 'integer' },
                  rocket: { type: 'integer' },
                  eyes: { type: 'integer' }
                }
              },
              timeline_url: { type: 'string', required: false },
              performed_via_github_app: { type: 'object', required: false },
              state_reason: { type: 'string', required: false },
              pull_request: PRSchema
            }
          },
          public: { type: 'boolean' },
          created_at: { type: 'string' }
        }
      }
    },
    required: ['status', 'data']
  }
};
exports.listPublicEventsSchema = eventsSchema;
