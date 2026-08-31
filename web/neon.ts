import { defineConfig } from "@neon/config/v1";

export default defineConfig({
  auth: true,
  dataApi: true,
  branch: (branch) => {
    if (branch.exists) return {};
    return {
      postgres: {
        computeSettings: {
          autoscalingLimitMinCu: 0.25, // Scale to zero when idle ($0)
          autoscalingLimitMaxCu: 1,
          suspendTimeout: "5m",
        },
      },
    };
  },
});
