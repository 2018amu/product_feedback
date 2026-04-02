const requests: Record<string, { count: number; startTime: number }> = {};

export const feedbackLimiter = (req: any, res: any, next: any) => {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();

  if (!requests[ip]) {
    requests[ip] = { count: 1, startTime: now };
    return next();
  }

  const elapsed = now - requests[ip].startTime;

  // 1 hour window
  if (elapsed < 60 * 60 * 1000) {
    if (requests[ip].count >= 5) {
      return res.status(429).json({
        message: "Too many submissions. Please try again after 1 hour.",
      });
    }
    requests[ip].count++;
  } else {
    // reset after 1 hour
    requests[ip] = { count: 1, startTime: now };
  }

  next();
};