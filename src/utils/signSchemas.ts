export async function createSchemas(): Promise<{ reportSchemaId: string; rewardSchemaId: string }> {
  return {
    reportSchemaId: 'schema-report-v1',
    rewardSchemaId: 'schema-reward-v1',
  }
}
