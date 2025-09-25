export interface ConsensusSummary {
  end_date: string | null;
  budget_max: number | null;
  budget_min: number | null;
  must_haves: string[];
  start_date: string | null;
  preferred_places: string[];
  travel_preferences: string[];
}

export interface ConsensusCandidate {
  image: string;
  budget: 'budget' | 'mid-range' | 'luxury';
  best_time: string[];
  image_url: string;
  place_name: string;
  why_it_matches: string[];
}

export interface Consensus {
  status: 'multiple_candidates' | 'single_candidate' | 'no_candidates' | 'consensus_reached';
  summary: ConsensusSummary;
  trip_id: string;
  candidates: ConsensusCandidate[];
}

export type BudgetRange = 'budget' | 'mid-range' | 'luxury';

export type ConsensusStatus = 'multiple_candidates' | 'single_candidate' | 'no_candidates' | 'consensus_reached';
