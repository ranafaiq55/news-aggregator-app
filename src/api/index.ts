import { fetchFromNewsAPI } from './sources/newsapi';
import { fetchFromGuardian } from './sources/guardian';
import { fetchFromNYT } from './sources/nyt';
import { type Article, type ArticleFilters } from './types';

export const getAggregatedArticles = async (filters: ArticleFilters): Promise<Article[]> => {
  const selectedSources = filters.sources ?? ['NewsAPI', 'Guardian', 'NYT'];

  const tasks: Promise<Article[]>[] = [];
  if (selectedSources.includes('NewsAPI')) tasks.push(fetchFromNewsAPI(filters));
  if (selectedSources.includes('Guardian')) tasks.push(fetchFromGuardian(filters));
  if (selectedSources.includes('NYT')) tasks.push(fetchFromNYT(filters));

  const results = await Promise.all(tasks);
  return results.flat();
};
