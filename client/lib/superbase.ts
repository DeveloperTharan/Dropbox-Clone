import { createClient } from "@supabase/supabase-js";

export const superbase = createClient(
  "https://jesoevjidwgpigqviixl.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Implc29ldmppZHdncGlncXZpaXhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUwNjkzOTQsImV4cCI6MjAzMDY0NTM5NH0.NdY2hWhNheiPsDXj4ScpQxp4zoxNt65EPXwuJtSkGkI"
);
