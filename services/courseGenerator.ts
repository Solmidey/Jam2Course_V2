import { CourseOutline, CheckpointPlan, Quiz } from '../types';

type MockPost =
  | { type: 'heading'; content: string }
  | { type: 'text'; content: string }
  | { type: 'list'; items: string[] }
  | { type: 'qa'; question: string; answer: string };

type MockJamThread = {
  title: string;
  posts: MockPost[];
};

// Mock data similar to a fetched Jam thread
const mockJamThread: MockJamThread = {
  title: 'From Jam to Course: Foundations of Consistent Content',
  posts: [
    { type: 'heading', content: 'The Core Idea' },
    {
      type: 'text',
      content: 'Consistency is key in content creation. It builds trust and sets expectations.',
    },
    { type: 'list', items: ['Brand voice', 'Publishing schedule', 'Visual identity'] },
    { type: 'heading', content: 'Defining Your Brand Voice' },
    {
      type: 'text',
      content: 'Your brand voice is your personality. Is it formal, playful, or authoritative? Document it.',
    },
    { type: 'qa', question: 'How to start?', answer: 'Start with a simple "we are/we are not" list.' },
    { type: 'heading', content: 'Planning a Schedule' },
    {
      type: 'text',
      content: 'A content calendar is non-negotiable. Use tools like Notion, Asana, or even a simple spreadsheet.',
    },
    { type: 'list', items: ['Weekly themes', 'Content pillars', 'Repurposing strategy'] },
    { type: 'heading', content: 'Visuals and Templates' },
    {
      type: 'text',
      content: 'Templates save time and ensure visual consistency. Use Canva or Figma to create a set of reusable designs.',
    },
    {
      type: 'qa',
      question: 'What about video?',
      answer: 'Create a standard intro/outro and use consistent on-screen graphics.',
    },
    { type: 'heading', content: 'Measuring Success' },
    {
      type: 'text',
      content: 'Track metrics that matter. Engagement rate, follower growth, and conversion rates are good starts. Use platform analytics.',
    },
    { type: 'list', items: ['Set KPIs', 'Regularly review analytics', 'A/B test your content'] },
  ],
};

// Mock implementation of outline_from_thread
const outline_from_thread = (thread: MockJamThread, targetMinutes: number): CourseOutline => {
  return {
    title: thread.title,
    duration_minutes: targetMinutes,
    learning_outcomes: [
      'Understand the core principles of content consistency.',
      'Develop a clear and documented brand voice.',
      'Create a sustainable content calendar and scheduling process.',
      'Implement visual templates to streamline content production.',
      'Identify key metrics for measuring content success.',
    ],
    modules: [
      {
        id: 'mod1',
        title: 'The "Why" of Consistency',
        minutes: 10,
        summary:
          'This module covers the fundamental importance of consistency in building an audience and brand trust.',
        key_points: ['Builds audience trust', 'Sets clear expectations', 'Drives brand recognition'],
      },
      {
        id: 'mod2',
        title: 'Finding Your Brand Voice',
        minutes: 15,
        summary: 'Learn how to define, document, and apply a unique brand voice across all your content.',
        key_points: ['Define your personality', 'Use "we are/we are not" lists', 'Ensure team alignment'],
      },
      {
        id: 'mod3',
        title: 'Strategic Scheduling',
        minutes: 15,
        summary: 'Discover how to create and manage a content calendar that aligns with your goals and resources.',
        key_points: ['Use a content calendar tool', 'Establish content pillars', 'Plan for repurposing'],
      },
      {
        id: 'mod4',
        title: 'Mastering Visual Identity',
        minutes: 10,
        summary: 'Explore the role of visual consistency and how to create efficient workflows using templates.',
        key_points: ['Create reusable templates', 'Maintain consistent branding', 'Standardize video elements'],
      },
      {
        id: 'mod5',
        title: 'Analytics and Improvement',
        minutes: 10,
        summary:
          'Learn how to track performance, understand your audience, and continuously improve your content strategy.',
        key_points: ['Track engagement and growth', 'Set clear KPIs', 'Use A/B testing'],
      },
    ],
  };
};

// Mock implementation of checkpoint_tasks
const checkpoint_tasks = (outline: CourseOutline): CheckpointPlan => {
  const checkpoints: CheckpointPlan['checkpoints'] = [];
  let cumulativeMinutes = 0;

  outline.modules.forEach(module => {
    const taskType = ['Do', 'Reflect', 'Apply'][(parseInt(module.id.slice(-1), 10) - 1) % 3] as 'Do' | 'Reflect' | 'Apply';
    const checkpointMinute = cumulativeMinutes + Math.round(module.minutes * 0.8);
    let instruction = '';
    switch (taskType) {
      case 'Do':
        instruction = `Draft 3 "we are/we are not" statements for a sample brand based on module "${module.title}".`;
        break;
      case 'Reflect':
        instruction = 'Think about a brand you admire. What are three elements that make their content feel consistent?';
        break;
      case 'Apply':
        instruction = `Outline a one-week content calendar for a fictional company using the concept of content pillars from module "${module.title}".`;
        break;
    }

    checkpoints.push({
      module_id: module.id,
      at_minute: checkpointMinute,
      task_type: taskType,
      instruction,
    });
    cumulativeMinutes += module.minutes;
  });

  return { total_minutes: outline.duration_minutes, checkpoints };
};

const shuffle = <T,>(items: T[]): T[] => {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

// Mock implementation of quiz_gen
const quiz_gen = (outline: CourseOutline, questions: number): Quiz => {
  const quizQuestions: Quiz['questions'] = [];
  const allKeyPoints = outline.modules.flatMap(m => m.key_points);

  const questionTotal = Math.max(1, questions);

  for (let i = 0; i < questionTotal; i += 1) {
    const module = outline.modules[i % outline.modules.length];
    const correctAnswer = module.key_points[0] ?? `Correct answer for ${module.title}`;

    const distractors = Array.from(
      new Set(
        allKeyPoints
          .filter(point => point !== correctAnswer)
          .map(point => point.trim())
      )
    )
      .filter(Boolean)
      .slice(0, 6);

    const optionsPool = shuffle([correctAnswer, ...distractors]).slice(0, 4);
    const options = optionsPool.length === 4 ? optionsPool : [correctAnswer, 'Option A', 'Option B', 'Option C'];
    const correct_index = options.indexOf(correctAnswer);

    quizQuestions.push({
      id: `q${i + 1}`,
      prompt: `According to the module "${module.title}", what is a key element of its focus?`,
      options,
      correct_index: correct_index >= 0 ? correct_index : 0,
      rationale: `${correctAnswer} is a core concept discussed in the module on ${module.title}.`,
      module_ref: module.id,
    });
  }

  return { questions: quizQuestions };
};

// Main service function to orchestrate the generation
export const generateCourse = (threadUrl: string, targetMinutes: number = 60, questionCount: number = 5) => {
  console.log(`Generating course for ${threadUrl}`);

  const outline = outline_from_thread(mockJamThread, targetMinutes);
  const checkpoints = checkpoint_tasks(outline);
  const quiz = quiz_gen(outline, questionCount);

  return {
    outline,
    checkpoints,
    quiz,
  };
};
