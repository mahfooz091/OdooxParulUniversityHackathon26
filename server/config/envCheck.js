/**
 * Validates critical environment variables required for secure server operation.
 */
export const validateEnv = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  const errors = [];
  const warnings = [];

  // MONGO_URI validation
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    const msg = 'MONGO_URI is missing from environment variables.';
    if (isProduction) errors.push(msg);
    else warnings.push(msg);
  } else if (!mongoUri.startsWith('mongodb://') && !mongoUri.startsWith('mongodb+srv://')) {
    const msg = 'MONGO_URI must begin with mongodb:// or mongodb+srv://';
    if (isProduction) errors.push(msg);
    else warnings.push(msg);
  }

  // JWT_SECRET validation
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    const msg = 'JWT_SECRET is missing from environment variables.';
    if (isProduction) errors.push(msg);
    else warnings.push(msg);
  } else if (jwtSecret.length < 32) {
    const msg = 'JWT_SECRET should be at least 32 characters long for production security.';
    if (isProduction) errors.push(msg);
    else warnings.push(msg);
  }

  if (warnings.length > 0) {
    console.warn('⚠️ Environment warnings:', warnings.join(' | '));
  }

  if (errors.length > 0) {
    console.error('❌ Critical environment configuration errors:\n' + errors.map((e) => `  - ${e}`).join('\n'));
    if (isProduction) {
      throw new Error(`Production environment configuration failed: ${errors.join('; ')}`);
    }
  }

  return { isValid: errors.length === 0, errors, warnings };
};
