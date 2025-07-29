import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  QueryConstraint,
  onSnapshot,
  Unsubscribe,
  increment,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore';
import { db } from './firebase';
import { User, Question, Answer, Project, Workshop, Activity, LeaderboardEntry } from './types';

// Users Collection
export const createUser = async (userData: Omit<User, 'id'>): Promise<string> => {
  const docRef = await addDoc(collection(db, 'users'), userData);
  return docRef.id;
};

export const getUser = async (userId: string): Promise<User | null> => {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as User : null;
};

export const updateUser = async (userId: string, updates: Partial<User>): Promise<void> => {
  const docRef = doc(db, 'users', userId);
  await updateDoc(docRef, { ...updates, updatedAt: new Date() });
};

export const getLeaderboard = async (limitCount: number = 10): Promise<LeaderboardEntry[]> => {
  const q = query(
    collection(db, 'users'),
    orderBy('points', 'desc'),
    limit(limitCount)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc, index) => ({
    userId: doc.id,
    user: { id: doc.id, ...doc.data() } as User,
    points: doc.data().points,
    rank: index + 1
  }));
};

// Questions Collection
export const createQuestion = async (questionData: Omit<Question, 'id'>): Promise<string> => {
  const docRef = await addDoc(collection(db, 'questions'), questionData);
  return docRef.id;
};

export const getQuestion = async (questionId: string): Promise<Question | null> => {
  const docRef = doc(db, 'questions', questionId);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return null;
  
  const questionData = { id: docSnap.id, ...docSnap.data() } as Question;
  // Fetch author info
  const author = await getUser(questionData.authorId);
  if (author) questionData.author = author;
  
  return questionData;
};

export const getQuestions = async (filters?: {
  tags?: string[];
  difficulty?: string;
  isAnswered?: boolean;
  limitCount?: number;
}): Promise<Question[]> => {
  const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc')];
  
  if (filters?.tags && filters.tags.length > 0) {
    constraints.push(where('tags', 'array-contains-any', filters.tags));
  }
  
  if (filters?.difficulty) {
    constraints.push(where('difficulty', '==', filters.difficulty));
  }
  
  if (filters?.isAnswered !== undefined) {
    constraints.push(where('isAnswered', '==', filters.isAnswered));
  }
  
  if (filters?.limitCount) {
    constraints.push(limit(filters.limitCount));
  }
  
  const q = query(collection(db, 'questions'), ...constraints);
  const querySnapshot = await getDocs(q);
  
  const questions = await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const questionData = { id: doc.id, ...doc.data() } as Question;
      // Fetch author info
      const author = await getUser(questionData.authorId);
      if (author) questionData.author = author;
      return questionData;
    })
  );
  
  return questions;
};

export const updateQuestion = async (questionId: string, updates: Partial<Question>): Promise<void> => {
  const docRef = doc(db, 'questions', questionId);
  await updateDoc(docRef, { ...updates, updatedAt: new Date() });
};

export const incrementQuestionViews = async (questionId: string): Promise<void> => {
  const docRef = doc(db, 'questions', questionId);
  await updateDoc(docRef, { views: increment(1) });
};

// Answers Collection
export const createAnswer = async (answerData: Omit<Answer, 'id'>): Promise<string> => {
  const docRef = await addDoc(collection(db, 'answers'), answerData);
  
  // Increment answer count on question
  const questionRef = doc(db, 'questions', answerData.questionId);
  await updateDoc(questionRef, { answers: increment(1) });
  
  return docRef.id;
};

export const getAnswersForQuestion = async (questionId: string): Promise<Answer[]> => {
  const q = query(
    collection(db, 'answers'),
    where('questionId', '==', questionId),
    orderBy('votes', 'desc'),
    orderBy('createdAt', 'asc')
  );
  const querySnapshot = await getDocs(q);
  
  const answers = await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const answerData = { id: doc.id, ...doc.data() } as Answer;
      // Fetch author info
      const author = await getUser(answerData.authorId);
      if (author) answerData.author = author;
      return answerData;
    })
  );
  
  return answers;
};

// Projects Collection
export const createProject = async (projectData: Omit<Project, 'id'>): Promise<string> => {
  const docRef = await addDoc(collection(db, 'projects'), projectData);
  return docRef.id;
};

export const getProjects = async (filters?: {
  tags?: string[];
  authorId?: string;
  limitCount?: number;
}): Promise<Project[]> => {
  const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc')];
  
  if (filters?.tags && filters.tags.length > 0) {
    constraints.push(where('tags', 'array-contains-any', filters.tags));
  }
  
  if (filters?.authorId) {
    constraints.push(where('authorId', '==', filters.authorId));
  }
  
  if (filters?.limitCount) {
    constraints.push(limit(filters.limitCount));
  }
  
  const q = query(collection(db, 'projects'), ...constraints);
  const querySnapshot = await getDocs(q);
  
  const projects = await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const projectData = { id: doc.id, ...doc.data() } as Project;
      // Fetch author info
      const author = await getUser(projectData.authorId);
      if (author) projectData.author = author;
      return projectData;
    })
  );
  
  return projects;
};

// Workshops Collection
export const createWorkshop = async (workshopData: Omit<Workshop, 'id'>): Promise<string> => {
  const docRef = await addDoc(collection(db, 'workshops'), workshopData);
  return docRef.id;
};

export const getWorkshops = async (filters?: {
  upcoming?: boolean;
  limitCount?: number;
}): Promise<Workshop[]> => {
  const constraints: QueryConstraint[] = [];
  
  if (filters?.upcoming) {
    constraints.push(where('date', '>', new Date()));
    constraints.push(orderBy('date', 'asc'));
  } else {
    constraints.push(orderBy('date', 'desc'));
  }
  
  if (filters?.limitCount) {
    constraints.push(limit(filters.limitCount));
  }
  
  const q = query(collection(db, 'workshops'), ...constraints);
  const querySnapshot = await getDocs(q);
  
  const workshops = await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const workshopData = { id: doc.id, ...doc.data() } as Workshop;
      // Fetch instructor info
      const instructor = await getUser(workshopData.instructorId);
      if (instructor) workshopData.instructor = instructor;
      return workshopData;
    })
  );
  
  return workshops;
};

export const joinWorkshop = async (workshopId: string, userId: string): Promise<void> => {
  const docRef = doc(db, 'workshops', workshopId);
  await updateDoc(docRef, {
    attendees: arrayUnion(userId)
  });
};

export const leaveWorkshop = async (workshopId: string, userId: string): Promise<void> => {
  const docRef = doc(db, 'workshops', workshopId);
  await updateDoc(docRef, {
    attendees: arrayRemove(userId)
  });
};

// Activities Collection
export const createActivity = async (activityData: Omit<Activity, 'id'>): Promise<string> => {
  const docRef = await addDoc(collection(db, 'activities'), activityData);
  
  // Update user points
  const userRef = doc(db, 'users', activityData.userId);
  await updateDoc(userRef, {
    points: increment(activityData.points),
    updatedAt: new Date()
  });
  
  return docRef.id;
};

export const getUserActivities = async (userId: string, limitCount: number = 10): Promise<Activity[]> => {
  const q = query(
    collection(db, 'activities'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc'),
    limit(limitCount)
  );
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Activity[];
};

// Real-time subscriptions
export const subscribeToQuestions = (
  callback: (questions: Question[]) => void,
  filters?: { tags?: string[]; difficulty?: string; limitCount?: number }
): Unsubscribe => {
  const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc')];
  
  if (filters?.tags && filters.tags.length > 0) {
    constraints.push(where('tags', 'array-contains-any', filters.tags));
  }
  
  if (filters?.difficulty) {
    constraints.push(where('difficulty', '==', filters.difficulty));
  }
  
  if (filters?.limitCount) {
    constraints.push(limit(filters.limitCount));
  }
  
  const q = query(collection(db, 'questions'), ...constraints);
  
  return onSnapshot(q, async (snapshot) => {
    const questions = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const questionData = { id: doc.id, ...doc.data() } as Question;
        const author = await getUser(questionData.authorId);
        if (author) questionData.author = author;
        return questionData;
      })
    );
    callback(questions);
  });
};

export const subscribeToLeaderboard = (
  callback: (leaderboard: LeaderboardEntry[]) => void,
  limitCount: number = 10
): Unsubscribe => {
  const q = query(
    collection(db, 'users'),
    orderBy('points', 'desc'),
    limit(limitCount)
  );
  
  return onSnapshot(q, (snapshot) => {
    const leaderboard = snapshot.docs.map((doc, index) => ({
      userId: doc.id,
      user: { id: doc.id, ...doc.data() } as User,
      points: doc.data().points,
      rank: index + 1
    }));
    callback(leaderboard);
  });
};