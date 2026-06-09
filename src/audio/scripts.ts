export type SectionId = 'hero' | 'problem' | 'solution' | 'outcomes' | 'cta';

export interface SectionScript {
  id: SectionId;
  title: string;
  transcript: string;
  durationSec: number;
}

export const SECTION_ORDER: SectionId[] = ['hero', 'problem', 'solution', 'outcomes', 'cta'];

export const SCRIPTS: Record<SectionId, SectionScript> = {
  hero: {
    id: 'hero',
    title: 'Chapter 01 · The Opening',
    durationSec: 32,
    transcript:
      "An era is being written. Right now, at universities across India, your students are using AI — with or without your guidance. They aren't waiting for permission. They're building habits, forming dependencies, and arriving at outcomes you didn't design. The question isn't whether AI reaches Acharya Institute of Technology. It already has. The question is whether Acharya Institute of Technology shapes what that looks like — or inherits someone else's answer.",
  },
  problem: {
    id: 'problem',
    title: 'Chapter 02 · The Chasm',
    durationSec: 52,
    transcript:
      "Your faculty spend four to six hours a day on tasks a system could handle in minutes. That's not inefficiency. That's infrastructure debt, compounding every semester — pulling your best people away from the work only they can do. Fifty percent of your students are already using AI tools you didn't authorize. They're not rogue. They're adaptive. But without structure, they're building on sand. The chasm isn't a future threat. You're standing in it. Every week you wait, the gap between where you are and where the institution needs to be gets wider. The cost of staying isn't zero. It's compounding.",
  },
  solution: {
    id: 'solution',
    title: 'Chapter 03 · The Architecture',
    durationSec: 50,
    transcript:
      "Smartslate isn't software you buy and deploy. It's a transformation you architect — and then you own it. Three pillars. Polaris re-engineers how your institution operates: admissions, faculty load, compliance — automated, auditable, running in the background while your people focus forward. Nova rebuilds how your faculty teach. AI-augmented curriculum design. Adaptive delivery. Assessment that actually reflects mastery. Constellation makes every student's learning path personal — and measurable — for the first time. This isn't a feature list. It's a new operating model for a university that intends to lead.",
  },
  outcomes: {
    id: 'outcomes',
    title: 'Chapter 04 · By the Numbers',
    durationSec: 65,
    transcript:
      "Here's what the numbers say — and you can hold us to these. Seventy percent of your operational overhead: automated. That's not a rounding-error improvement. That's your institution running on a fundamentally different cost structure. Two hundred hours per faculty member, recovered every year. Not saved. Returned. To curriculum. To mentorship. To the craft of teaching that drew your people to this work in the first place. Eighty percent of your graduating students, AI-certified. Not participants in a workshop — genuinely certified. Before they leave your campus. Nine months to full return on investment. At the realistic scenario, we're guaranteeing it. These aren't projections from a sales deck. This is the contract we're willing to sign.",
  },
  cta: {
    id: 'cta',
    title: 'Chapter 05 · The Decision',
    durationSec: 50,
    transcript:
      "The infrastructure is ready. The playbook is proven. The team is here. Institutions that move this year set the standard for AI-native higher education in India. That standard becomes the benchmark every institution that follows will be measured against. Institutions that wait don't stand still. They fall behind a standard they had no hand in writing. Acharya Institute of Technology has always been first. This is that moment. The window is open. Begin the conversation.",
  },
};
