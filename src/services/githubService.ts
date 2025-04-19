import axios from 'axios';
import { GithubRepo } from '../types';

const GITHUB_API_URL = 'https://api.github.com';

export const fetchUserRepositories = async (username: string): Promise<GithubRepo[]> => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/users/${username}/repos`, {
      params: {
        sort: 'updated',
        per_page: 10,
      },
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    throw error;
  }
};

export const fetchRepositoryDetails = async (username: string, repoName: string): Promise<GithubRepo> => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/repos/${username}/${repoName}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching repository details:', error);
    throw error;
  }
};

export const fetchRepositoryLanguages = async (username: string, repoName: string): Promise<Record<string, number>> => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/repos/${username}/${repoName}/languages`);
    return response.data;
  } catch (error) {
    console.error('Error fetching repository languages:', error);
    throw error;
  }
};

export const searchRepositories = async (query: string): Promise<GithubRepo[]> => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/search/repositories`, {
      params: {
        q: query,
        sort: 'stars',
        order: 'desc',
        per_page: 10
      }
    });
    
    return response.data.items;
  } catch (error) {
    console.error('Error searching repositories:', error);
    throw error;
  }
};