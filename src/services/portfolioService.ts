import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  updateDoc, 
  deleteDoc,
  orderBy,
  limit,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Portfolio, PortfolioSection, PortfolioTemplate } from '../types';

// Portfolio Templates
export const getPortfolioTemplates = async (): Promise<PortfolioTemplate[]> => {
  try {
    const templatesRef = collection(db, 'templates');
    const snapshot = await getDocs(templatesRef);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as PortfolioTemplate));
  } catch (error) {
    console.error('Error fetching portfolio templates:', error);
    throw error;
  }
};

export const getTemplateById = async (templateId: string): Promise<PortfolioTemplate | null> => {
  try {
    const templateDoc = await getDoc(doc(db, 'templates', templateId));
    
    if (!templateDoc.exists()) {
      return null;
    }
    
    return {
      id: templateDoc.id,
      ...templateDoc.data()
    } as PortfolioTemplate;
  } catch (error) {
    console.error('Error fetching template:', error);
    throw error;
  }
};

// User Portfolios
export const createPortfolio = async (
  userId: string, 
  templateId: string, 
  name: string
): Promise<Portfolio> => {
  try {
    const portfolioRef = doc(collection(db, 'portfolios'));
    const slug = `${name.toLowerCase().replace(/\s+/g, '-')}-${portfolioRef.id.substring(0, 8)}`;
    
    const defaultSections: PortfolioSection[] = [
      {
        id: 'hero',
        type: 'hero',
        title: 'Hero',
        content: {
          headline: 'Hello, I am a Developer',
          subheadline: 'I build amazing web applications',
          ctaText: 'View My Work',
          ctaLink: '#projects'
        },
        order: 0,
        isVisible: true
      },
      {
        id: 'about',
        type: 'about',
        title: 'About Me',
        content: {
          bio: 'I am a passionate developer with experience in web technologies.',
          imageUrl: ''
        },
        order: 1,
        isVisible: true
      },
      {
        id: 'skills',
        type: 'skills',
        title: 'Skills',
        content: {
          skills: ['JavaScript', 'React', 'CSS', 'HTML']
        },
        order: 2,
        isVisible: true
      },
      {
        id: 'projects',
        type: 'projects',
        title: 'Projects',
        content: {
          projects: []
        },
        order: 3,
        isVisible: true
      },
      {
        id: 'contact',
        type: 'contact',
        title: 'Contact',
        content: {
          email: '',
          phone: '',
          message: 'Feel free to reach out to me!'
        },
        order: 4,
        isVisible: true
      }
    ];
    
    const newPortfolio: Portfolio = {
      id: portfolioRef.id,
      userId,
      name,
      slug,
      templateId,
      sections: defaultSections,
      seo: {
        title: name,
        description: 'My professional portfolio',
        keywords: ['portfolio', 'developer', 'projects']
      },
      socialLinks: {},
      createdAt: Date.now(),
      updatedAt: Date.now(),
      isPublished: false
    };
    
    await setDoc(portfolioRef, newPortfolio);
    return newPortfolio;
  } catch (error) {
    console.error('Error creating portfolio:', error);
    throw error;
  }
};

export const getUserPortfolios = async (userId: string): Promise<Portfolio[]> => {
  try {
    const portfoliosRef = collection(db, 'portfolios');
    const q = query(
      portfoliosRef, 
      where('userId', '==', userId),
      orderBy('updatedAt', 'desc')
    );
    
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Portfolio));
  } catch (error) {
    console.error('Error fetching user portfolios:', error);
    throw error;
  }
};

export const getPortfolioById = async (portfolioId: string): Promise<Portfolio | null> => {
  try {
    const portfolioDoc = await getDoc(doc(db, 'portfolios', portfolioId));
    
    if (!portfolioDoc.exists()) {
      return null;
    }
    
    return {
      id: portfolioDoc.id,
      ...portfolioDoc.data()
    } as Portfolio;
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    throw error;
  }
};

export const getPortfolioBySlug = async (slug: string): Promise<Portfolio | null> => {
  try {
    const portfoliosRef = collection(db, 'portfolios');
    const q = query(portfoliosRef, where('slug', '==', slug), limit(1));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      return null;
    }
    
    return {
      id: snapshot.docs[0].id,
      ...snapshot.docs[0].data()
    } as Portfolio;
  } catch (error) {
    console.error('Error fetching portfolio by slug:', error);
    throw error;
  }
};

export const updatePortfolio = async (
  portfolioId: string, 
  data: Partial<Portfolio>
): Promise<void> => {
  try {
    const portfolioRef = doc(db, 'portfolios', portfolioId);
    
    await updateDoc(portfolioRef, {
      ...data,
      updatedAt: Date.now()
    });
  } catch (error) {
    console.error('Error updating portfolio:', error);
    throw error;
  }
};

export const updatePortfolioSection = async (
  portfolioId: string,
  sectionId: string,
  data: Partial<PortfolioSection>
): Promise<void> => {
  try {
    const portfolioRef = doc(db, 'portfolios', portfolioId);
    const portfolio = await getPortfolioById(portfolioId);
    
    if (!portfolio) {
      throw new Error('Portfolio not found');
    }
    
    const updatedSections = portfolio.sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          ...data
        };
      }
      return section;
    });
    
    await updateDoc(portfolioRef, {
      sections: updatedSections,
      updatedAt: Date.now()
    });
  } catch (error) {
    console.error('Error updating portfolio section:', error);
    throw error;
  }
};

export const deletePortfolio = async (portfolioId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'portfolios', portfolioId));
  } catch (error) {
    console.error('Error deleting portfolio:', error);
    throw error;
  }
};

export const publishPortfolio = async (portfolioId: string): Promise<void> => {
  try {
    const portfolioRef = doc(db, 'portfolios', portfolioId);
    
    await updateDoc(portfolioRef, {
      isPublished: true,
      publishedAt: Date.now(),
      updatedAt: Date.now()
    });
  } catch (error) {
    console.error('Error publishing portfolio:', error);
    throw error;
  }
};

export const unpublishPortfolio = async (portfolioId: string): Promise<void> => {
  try {
    const portfolioRef = doc(db, 'portfolios', portfolioId);
    
    await updateDoc(portfolioRef, {
      isPublished: false,
      updatedAt: Date.now()
    });
  } catch (error) {
    console.error('Error unpublishing portfolio:', error);
    throw error;
  }
};