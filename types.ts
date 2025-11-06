
import { z } from 'zod';

// CourseOutline Schema and Type
export const CourseOutlineSchema = z.object({
  title: z.string(),
  duration_minutes: z.number().positive(),
  learning_outcomes: z.array(z.string()).min(3).max(5),
  modules: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      minutes: z.number().positive(),
      summary: z.string(),
      key_points: z.array(z.string()),
    })
  ),
});
export type CourseOutline = z.infer<typeof CourseOutlineSchema>;

// CheckpointPlan Schema and Type
export const CheckpointPlanSchema = z.object({
  total_minutes: z.number().positive(),
  checkpoints: z.array(
    z.object({
      module_id: z.string(),
      at_minute: z.number().positive(),
      task_type: z.enum(['Do', 'Reflect', 'Apply']),
      instruction: z.string(),
      expected_output: z.string().optional(),
    })
  ),
});
export type CheckpointPlan = z.infer<typeof CheckpointPlanSchema>;

// Quiz Schema and Type
export const QuizSchema = z.object({
  questions: z.array(
    z.object({
      id: z.string(),
      prompt: z.string(),
      options: z.array(z.string()).length(4),
      correct_index: z.number().min(0).max(3),
      rationale: z.string().optional(),
      module_ref: z.string().optional(),
    })
  ),
});
export type Quiz = z.infer<typeof QuizSchema>;
