export interface ConsensusReachedData {
  tripTitle: string;
  dates: {
    from: string;
    to: string;
    duration: string;
    range: string;
  };
  experiences: Array<{
    title: string;
    description: string;
    tags: string[];
    thumbnail: string;
  }>;
  costEstimate: {
    perPerson: string;
    breakdown: {
      flight: string;
      stay: string;
      localTransport: string;
    };
  };
}