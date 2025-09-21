export const validateConfig = (config: Record<string, any>): Record<string, any> => {
  const requiredEnvVars = ['JWT_SECRET', 'DATABASE_URL'];
  const missingVars = requiredEnvVars.filter(varName => !config[varName]);
  
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
  
  return config;
};

export const configValidation = {
  validate: validateConfig,
};