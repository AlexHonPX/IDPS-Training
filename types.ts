
export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Quiz {
  question: string;
  options: QuizOption[];
  explanation: string;
}

export interface DiagramNode {
  label: string;
  type: 'component' | 'network' | 'action' | 'threat';
  description?: string;
}

export interface ContentBlock {
  type: 'text' | 'list' | 'diagram' | 'comparison' | 'alert' | 'simulation' | 'video';
  title?: string;
  content?: string | string[];
  // For diagrams (simplified flow representation)
  diagramNodes?: DiagramNode[];
  // For comparison
  comparisonLeft?: { title: string; points: string[] };
  comparisonRight?: { title: string; points: string[] };
  // For simulation
  simulationId?: string;
  // For video
  videoUrl?: string;
}

export interface Module {
  id: string;
  title: string;
  shortTitle: string;
  duration: string; // e.g., "10 min"
  sections: ContentBlock[];
  quiz?: Quiz;
}

export interface CourseData {
  title: string;
  author: string;
  modules: Module[];
}
